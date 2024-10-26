import { pipe } from "../common/fp/pipe";
import { paramDefaults, paramRange } from "../params";
import * as Sqrl from "squirrelly";

const objKeys = <T extends object>(obj: T): (keyof T)[] => {
  const result: (keyof T)[] = [];

  for (const key in obj) {
    result.push(key);
  }

  return result;
};

const objEntries = <T extends object>(obj: T): [keyof T, T[keyof T]][] =>
  objKeys(obj).map((key) => [key, obj[key]]);

const objEntriesMapValue =
  <K, R>(func: (input: K) => R) =>
  <T>(x: [T, K][]): [T, R][] =>
    x.map(([key, value]) => [key, func(value)]);

const formatNumberFloat = (num: number): string => {
  return `${num.toFixed(1)}f`;
};

const template = `namespace Percupuff
{
    struct Params
    {
{{@each(it.params) => param}}
        float {{param}};
{{/each}}
    }

    Params createParams()
    {
        Params p;

{{@each(it.defaults) => d}}
        p.{{d[0]}} = {{d[1]}};
{{/each}}

        return p;
    }

    processor ParamsProcessor
    {
{{@each(it.details) => p}}
        input event float {{p.name}} [[ name: "{{p.name}}", min: {{p.min}}, max: {{p.max}}, init: {{p.init}}, step: {{p.step}} ]];
{{/each}}

        output event Params paramsOut;

        Params params = createParams();

        void update() {
            paramsOut <- params;
        }

{{@each(it.params) => param}}
        event {{param}} (float f) { params.{{param}} = f; update(); }
{{/each}}
    }
}
`;

const result = Sqrl.render(template, {
  params: objKeys(paramDefaults),
  defaults: pipe(
    paramDefaults,
    objEntries,
    objEntriesMapValue(formatNumberFloat)
  ),
  details: pipe(paramDefaults, objKeys, (params) =>
    params.map((param) => ({
      name: param,
      min: paramRange[param][0],
      max: paramRange[param][1],
      step: paramRange[param][2],
      init: paramDefaults[param],
    }))
  ),
});
console.log(result);

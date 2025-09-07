import { Param, paramDefaults, paramRange, paramToEndpointId } from "../params";
import * as Sqrl from "squirrelly";

const objKeys = <T extends object>(obj: T): (keyof T)[] => {
  const result: (keyof T)[] = [];

  for (const key in obj) {
    result.push(key);
  }

  return result;
};

const formatNumberFloat = (num: number): string => {
  return `${num.toFixed(1)}f`;
};

const template = `// The view is currently the source of truth for the parameters. They are
// defined in \`view/src/params.ts\` and exported using the \`build-params\`
// command that outputs the structure below.

// This approach keeps managing parameters for this project manageable and
// makes it relatively easy to use them in the Cmajor code.

namespace Percupuff
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

type ParamEntry = [string, number];

const getConsolidatedParams = (): string[] => {
  const allParams = objKeys(paramDefaults);
  const consolidatedParams = new Set<string>();
  const seenGroupParams = new Set<string>();

  for (const param of allParams) {
    const endpointId = paramToEndpointId(param as Param);
    if (endpointId === param) {
      consolidatedParams.add(param);
    } else if (!seenGroupParams.has(endpointId)) {
      consolidatedParams.add(endpointId);
      seenGroupParams.add(endpointId);
    }
  }

  return Array.from(consolidatedParams);
};

const getDefaultsForConsolidatedParams = (): ParamEntry[] => {
  const defaults: ParamEntry[] = [];
  const seenGroupParams = new Set<string>();

  for (const param of objKeys(paramDefaults)) {
    const endpointId = paramToEndpointId(param as Param);
    const value = paramDefaults[param as Param];

    if (endpointId === param) {
      defaults.push([param, value]);
    } else if (!seenGroupParams.has(endpointId)) {
      defaults.push([endpointId, value]);
      seenGroupParams.add(endpointId);
    }
  }

  return defaults;
};

const result = Sqrl.render(template, {
  params: getConsolidatedParams(),
  defaults: getDefaultsForConsolidatedParams().map(
    ([param, value]) => [param, formatNumberFloat(value)] as [string, string]
  ),
  details: (() => {
    const detailsMap = new Map<
      string,
      {
        name: string;
        min: number;
        max: number;
        step: number;
        init: number;
      }
    >();

    for (const param of objKeys(paramDefaults)) {
      const endpointId = paramToEndpointId(param as Param);
      if (!detailsMap.has(endpointId)) {
        detailsMap.set(endpointId, {
          name: endpointId,
          min: paramRange[param as Param][0],
          max: paramRange[param as Param][1],
          step: paramRange[param as Param][2],
          init: paramDefaults[param as Param],
        });
      }
    }

    return Array.from(detailsMap.values());
  })(),
});

console.log(result);

import { describe, it, expect, vi } from "vitest";
import * as Sqrl from "squirrelly";
import {
  objKeys,
  formatNumberFloat,
  getConsolidatedParams,
  getDefaultsForConsolidatedParams,
} from "./ParamBuilder";

// Mock the params module
vi.mock("../params", () => ({
  paramDefaults: {
    mainLevel: 10,
    kick1Decay: 25,
    kick1Level: 50,
    kick1Panning: 0,
    kick1Velocity: 100,
    kick1Midi: 35,
    hihat1Level: 50,
    hihat1Panning: 0,
    hihat1Velocity: 100,
    hihat1Midi: 42,
    hihat2Level: 50,
    hihat2Panning: 0,
    hihat2Velocity: 100,
    hihat2Midi: 44,
    bongo1Level: 50,
    bongo1Panning: 0,
    bongo1Velocity: 100,
    bongo1Midi: 60,
    bongo2Level: 50,
    bongo2Panning: 0,
    bongo2Velocity: 100,
    bongo2Midi: 61,
  },
  paramRange: {
    mainLevel: [0, 100, 1],
    kick1Decay: [15, 60, 1],
    kick1Level: [0, 100, 1],
    kick1Panning: [-100, 100, 5],
    kick1Velocity: [0, 100, 1],
    kick1Midi: [0, 127, 1],
    hihat1Level: [0, 100, 1],
    hihat1Panning: [-100, 100, 5],
    hihat1Velocity: [0, 100, 1],
    hihat1Midi: [0, 127, 1],
    hihat2Level: [0, 100, 1],
    hihat2Panning: [-100, 100, 5],
    hihat2Velocity: [0, 100, 1],
    hihat2Midi: [0, 127, 1],
    bongo1Level: [0, 100, 1],
    bongo1Panning: [-100, 100, 5],
    bongo1Velocity: [0, 100, 1],
    bongo1Midi: [0, 127, 1],
    bongo2Level: [0, 100, 1],
    bongo2Panning: [-100, 100, 5],
    bongo2Velocity: [0, 100, 1],
    bongo2Midi: [0, 127, 1],
  },
  paramToEndpointId: (param: string) => {
    const match = param.match(
      /^(hihat|bongo|wood|crash)\d+(Level|Panning|Velocity)$/
    );
    if (match) {
      return `${match[1]}${match[2]}`;
    }
    if (param === "claves1Level") {
      return "woodLevel";
    }
    if (param === "claves1Panning") {
      return "woodPanning";
    }
    if (param === "claves1Velocity") {
      return "woodVelocity";
    }
    return param;
  },
}));

describe("ParamBuilder", () => {
  describe("objKeys", () => {
    it("should return all keys of an object", () => {
      const testObj = { a: 1, b: 2, c: 3 };
      const result = objKeys(testObj);
      expect(result).toEqual(["a", "b", "c"]);
    });

    it("should return empty array for empty object", () => {
      const testObj = {};
      const result = objKeys(testObj);
      expect(result).toEqual([]);
    });

    it("should work with objects with string keys", () => {
      const testObj = { key1: "value1", key2: "value2" };
      const result = objKeys(testObj);
      expect(result).toEqual(["key1", "key2"]);
    });
  });

  describe("formatNumberFloat", () => {
    it("should format integer as float with .1f suffix", () => {
      expect(formatNumberFloat(10)).toBe("10.0f");
    });

    it("should format decimal as float with .1f suffix", () => {
      expect(formatNumberFloat(10.5)).toBe("10.5f");
    });

    it("should format zero as float", () => {
      expect(formatNumberFloat(0)).toBe("0.0f");
    });

    it("should format negative numbers", () => {
      expect(formatNumberFloat(-5.7)).toBe("-5.7f");
    });

    it("should round to one decimal place", () => {
      expect(formatNumberFloat(10.123)).toBe("10.1f");
    });
  });

  describe("getConsolidatedParams", () => {
    it("should return individual params that don't match grouping pattern", () => {
      const result = getConsolidatedParams();

      expect(result).toContain("mainLevel");
      expect(result).toContain("kick1Decay");
      expect(result).toContain("kick1Level");
      expect(result).toContain("kick1Panning");
      expect(result).toContain("kick1Velocity");
      expect(result).toContain("kick1Midi");
    });

    it("should consolidate grouped parameters", () => {
      const result = getConsolidatedParams();

      // Should have consolidated hihat parameters
      expect(result).toContain("hihatLevel");
      expect(result).toContain("hihatPanning");
      expect(result).toContain("hihatVelocity");

      // Should have consolidated bongo parameters
      expect(result).toContain("bongoLevel");
      expect(result).toContain("bongoPanning");
      expect(result).toContain("bongoVelocity");
    });

    it("should not include individual grouped params when consolidated", () => {
      const result = getConsolidatedParams();

      // Individual hihat params should not be in the result
      expect(result).not.toContain("hihat1Level");
      expect(result).not.toContain("hihat2Level");
      expect(result).not.toContain("hihat1Panning");
      expect(result).not.toContain("hihat2Panning");

      // Individual bongo params should not be in the result
      expect(result).not.toContain("bongo1Level");
      expect(result).not.toContain("bongo2Level");
    });

    it("should return all params including consolidated ones", () => {
      const result = getConsolidatedParams();
      expect(result.length).toBeGreaterThan(0);
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("getDefaultsForConsolidatedParams", () => {
    it("should return defaults for individual params", () => {
      const result = getDefaultsForConsolidatedParams();

      const mainLevelEntry = result.find(([param]) => param === "mainLevel");
      expect(mainLevelEntry).toEqual(["mainLevel", 10]);

      const kick1DecayEntry = result.find(([param]) => param === "kick1Decay");
      expect(kick1DecayEntry).toEqual(["kick1Decay", 25]);
    });

    it("should return defaults for consolidated grouped params", () => {
      const result = getDefaultsForConsolidatedParams();

      const hihatLevelEntry = result.find(([param]) => param === "hihatLevel");
      expect(hihatLevelEntry).toEqual(["hihatLevel", 50]);

      const bongoLevelEntry = result.find(([param]) => param === "bongoLevel");
      expect(bongoLevelEntry).toEqual(["bongoLevel", 50]);
    });

    it("should not include individual grouped param defaults when consolidated", () => {
      const result = getDefaultsForConsolidatedParams();

      // Individual hihat params should not be in the result
      expect(result.find(([param]) => param === "hihat1Level")).toBeUndefined();
      expect(result.find(([param]) => param === "hihat2Level")).toBeUndefined();

      // Individual bongo params should not be in the result
      expect(result.find(([param]) => param === "bongo1Level")).toBeUndefined();
      expect(result.find(([param]) => param === "bongo2Level")).toBeUndefined();
    });

    it("should return array of parameter default pairs", () => {
      const result = getDefaultsForConsolidatedParams();
      expect(result.length).toBeGreaterThan(0);
      expect(Array.isArray(result)).toBe(true);

      // Verify each entry is a [string, number] pair
      result.forEach(([param, value]) => {
        expect(typeof param).toBe("string");
        expect(typeof value).toBe("number");
      });
    });
  });

  describe("template rendering", () => {
    it("should render template with correct structure", () => {
      const template = `// Test template
{{@each(it.params) => param}}
        float {{param}};
{{/each}}

{{@each(it.defaults) => d}}
        p.{{d[0]}} = {{d[1]}};
{{/each}}

{{@each(it.details) => p}}
        input event float {{p.name}} [[ name: "{{p.name}}", min: {{p.min}}, max: {{p.max}}, init: {{p.init}}, step: {{p.step}} ]];
{{/each}}`;

      const mockParamRange = {
        mainLevel: [0, 100, 1],
        kick1Decay: [15, 60, 1],
        kick1Level: [0, 100, 1],
        kick1Panning: [-100, 100, 5],
        kick1Velocity: [0, 100, 1],
        kick1Midi: [0, 127, 1],
        hihatLevel: [0, 100, 1],
        hihatPanning: [-100, 100, 5],
        hihatVelocity: [0, 100, 1],
        hihat1Midi: [0, 127, 1],
        hihat2Midi: [0, 127, 1],
        bongoLevel: [0, 100, 1],
        bongoPanning: [-100, 100, 5],
        bongoVelocity: [0, 100, 1],
        bongo1Midi: [0, 127, 1],
        bongo2Midi: [0, 127, 1],
      };

      const params = getConsolidatedParams();
      const defaults = getDefaultsForConsolidatedParams().map(
        ([param, value]) =>
          [param, formatNumberFloat(value)] as [string, string]
      );

      const details = params.map((param) => ({
        name: param,
        min: mockParamRange[param as keyof typeof mockParamRange]?.[0] ?? 0,
        max: mockParamRange[param as keyof typeof mockParamRange]?.[1] ?? 100,
        step: mockParamRange[param as keyof typeof mockParamRange]?.[2] ?? 1,
        init: 50, // Use a consistent test value
      }));

      const result = Sqrl.render(template, {
        params,
        defaults,
        details,
      });

      expect(result).toContain("float mainLevel;");
      expect(result).toContain("float kick1Decay;");
      expect(result).toContain("float hihatLevel;");
      expect(result).toContain("float bongoLevel;");

      expect(result).toContain("p.mainLevel = 10.0f;");
      expect(result).toContain("p.kick1Decay = 25.0f;");
      expect(result).toContain("p.hihatLevel = 50.0f;");
      expect(result).toContain("p.bongoLevel = 50.0f;");

      expect(result).toContain(
        'input event float mainLevel [[ name: "mainLevel", min: 0, max: 100, init: 50, step: 1 ]];'
      );
      expect(result).toContain(
        'input event float kick1Decay [[ name: "kick1Decay", min: 15, max: 60, init: 50, step: 1 ]];'
      );
    });
  });
});

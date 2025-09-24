import { describe, it, expect } from "vitest";
import { HSL } from "./hsl";

describe("HSL", () => {
  describe("constructor", () => {
    it("should create HSL with valid values", () => {
      const hsl = HSL(180, 50, 75);
      expect(hsl.h).toBe(180);
      expect(hsl.s).toBe(50);
      expect(hsl.l).toBe(75);
    });

    it("should wrap hue values greater than 360", () => {
      const hsl = HSL(450, 50, 75);
      expect(hsl.h).toBe(90);
    });

    it("should wrap negative hue values", () => {
      const hsl = HSL(-90, 50, 75);
      expect(hsl.h).toBe(270);
    });

    it("should handle extreme negative hue values", () => {
      const hsl = HSL(-32843784, 50, 75);
      expect(hsl.h).toBe(96);
    });

    it("should clamp saturation to 0-100 range", () => {
      const hsl1 = HSL(180, -10, 75);
      expect(hsl1.s).toBe(0);

      const hsl2 = HSL(180, 150, 75);
      expect(hsl2.s).toBe(100);
    });

    it("should clamp lightness to 0-100 range", () => {
      const hsl1 = HSL(180, 50, -5);
      expect(hsl1.l).toBe(0);

      const hsl2 = HSL(180, 50, 105);
      expect(hsl2.l).toBe(100);
    });

    it("should handle edge case values", () => {
      const hsl = HSL(0, 0, 0);
      expect(hsl.h).toBe(0);
      expect(hsl.s).toBe(0);
      expect(hsl.l).toBe(0);
    });
  });

  describe("toString", () => {
    it("should format HSL values correctly", () => {
      const hsl = HSL(180, 50, 75);
      expect(hsl.toString()).toBe("hsl(180, 50%, 75%)");
    });

    it("should format with wrapped hue values", () => {
      const hsl = HSL(450, 50, 75);
      expect(hsl.toString()).toBe("hsl(90, 50%, 75%)");
    });

    it("should format with clamped values", () => {
      const hsl = HSL(180, 150, 105);
      expect(hsl.toString()).toBe("hsl(180, 100%, 100%)");
    });

    it("should format edge cases", () => {
      const hsl = HSL(0, 0, 0);
      expect(hsl.toString()).toBe("hsl(0, 0%, 0%)");
    });
  });

  describe("setHue", () => {
    it("should create new HSL with updated hue", () => {
      const original = HSL(180, 50, 75);
      const updated = original.setHue(270);

      expect(updated.h).toBe(270);
      expect(updated.s).toBe(50);
      expect(updated.l).toBe(75);
    });

    it("should wrap hue values", () => {
      const original = HSL(180, 50, 75);
      const updated = original.setHue(450);

      expect(updated.h).toBe(90);
    });

    it("should handle negative hue values", () => {
      const original = HSL(180, 50, 75);
      const updated = original.setHue(-90);

      expect(updated.h).toBe(270);
    });

    it("should not mutate original object", () => {
      const original = HSL(180, 50, 75);
      const updated = original.setHue(270);

      expect(original.h).toBe(180);
      expect(updated.h).toBe(270);
    });
  });

  describe("setSaturation", () => {
    it("should create new HSL with updated saturation", () => {
      const original = HSL(180, 50, 75);
      const updated = original.setSaturation(80);

      expect(updated.h).toBe(180);
      expect(updated.s).toBe(80);
      expect(updated.l).toBe(75);
    });

    it("should clamp saturation values", () => {
      const original = HSL(180, 50, 75);

      const updated1 = original.setSaturation(-10);
      expect(updated1.s).toBe(0);

      const updated2 = original.setSaturation(150);
      expect(updated2.s).toBe(100);
    });

    it("should not mutate original object", () => {
      const original = HSL(180, 50, 75);
      const updated = original.setSaturation(80);

      expect(original.s).toBe(50);
      expect(updated.s).toBe(80);
    });
  });

  describe("setLightness", () => {
    it("should create new HSL with updated lightness", () => {
      const original = HSL(180, 50, 75);
      const updated = original.setLightness(25);

      expect(updated.h).toBe(180);
      expect(updated.s).toBe(50);
      expect(updated.l).toBe(25);
    });

    it("should clamp lightness values", () => {
      const original = HSL(180, 50, 75);

      const updated1 = original.setLightness(-5);
      expect(updated1.l).toBe(0);

      const updated2 = original.setLightness(105);
      expect(updated2.l).toBe(100);
    });

    it("should not mutate original object", () => {
      const original = HSL(180, 50, 75);
      const updated = original.setLightness(25);

      expect(original.l).toBe(75);
      expect(updated.l).toBe(25);
    });
  });

  describe("method chaining", () => {
    it("should support method chaining", () => {
      const hsl = HSL(0, 0, 0).setHue(180).setSaturation(50).setLightness(75);

      expect(hsl.h).toBe(180);
      expect(hsl.s).toBe(50);
      expect(hsl.l).toBe(75);
    });

    it("should work with complex chaining", () => {
      const hsl = HSL(360, 100, 100)
        .setHue(90)
        .setSaturation(25)
        .setLightness(50)
        .setHue(270)
        .setSaturation(75);

      expect(hsl.h).toBe(270);
      expect(hsl.s).toBe(75);
      expect(hsl.l).toBe(50);
    });
  });

  describe("immutability", () => {
    it("should create new objects for each method call", () => {
      const hsl1 = HSL(180, 50, 75);
      const hsl2 = hsl1.setHue(270);
      const hsl3 = hsl2.setSaturation(80);
      const hsl4 = hsl3.setLightness(25);

      expect(hsl1).not.toBe(hsl2);
      expect(hsl2).not.toBe(hsl3);
      expect(hsl3).not.toBe(hsl4);

      expect(hsl1.h).toBe(180);
      expect(hsl2.h).toBe(270);
      expect(hsl3.h).toBe(270);
      expect(hsl4.h).toBe(270);
    });
  });
});

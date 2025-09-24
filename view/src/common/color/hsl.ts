export type HSL = {
  h: number;
  s: number;
  l: number;
  toString: () => string;
  setHue: (h: number) => HSL;
  setSaturation: (s: number) => HSL;
  setLightness: (l: number) => HSL;
};

const clamp = (min: number, max: number) => (value: number) => {
  return Math.min(Math.max(value, min), max);
};

const clampPercentage = clamp(0, 100);

const normalizeHue = (h: number): number => {
  h = h % 360;
  return h < 0 ? h + 360 : h;
};

export const HSL = (h: number, s: number, l: number): HSL => ({
  h: normalizeHue(h),
  s: clampPercentage(s),
  l: clampPercentage(l),
  toString() {
    return `hsl(${this.h}, ${this.s}%, ${this.l}%)`;
  },
  setHue(h) {
    return HSL(h, this.s, this.l);
  },
  setSaturation(s) {
    return HSL(this.h, s, this.l);
  },
  setLightness(l) {
    return HSL(this.h, this.s, l);
  },
});

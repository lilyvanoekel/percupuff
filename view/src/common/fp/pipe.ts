type Pipe = {
  <A extends any[], B>(ab: (...args: A) => B): (...args: A) => B;
  <A extends any[], B, C>(ab: (...args: A) => B, bc: (b: B) => C): (
    ...args: A
  ) => C;
  <A extends any[], B, C, D>(
    ab: (...args: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D
  ): (...args: A) => D;
  <A extends any[], B, C, D, E>(
    ab: (...args: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E
  ): (...args: A) => E;
  <A extends any[], B, C, D, E, F>(
    ab: (...args: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F
  ): (...args: A) => F;
  <A extends any[], B, C, D, E, F, G>(
    ab: (...args: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G
  ): (...args: A) => G;
  <A extends any[], B, C, D, E, F, G, H>(
    ab: (...args: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H
  ): (...args: A) => H;
  <A extends any[], B, C, D, E, F, G, H, I>(
    ab: (...args: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I
  ): (...args: A) => I;
};

type AnyFunction = (...args: any[]) => any;
export const pipe: Pipe =
  (fn1: AnyFunction, ...fns: AnyFunction[]) =>
  (...args: any[]) =>
    fns.reduce((result, fn) => fn(result), fn1(...args));

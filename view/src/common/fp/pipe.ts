type Pipe = {
  <A, B>(arg: A, ab: (arg: A) => B): B;
  <A, B, C>(arg: A, ab: (arg: A) => B, bc: (b: B) => C): C;
  <A, B, C, D>(arg: A, ab: (arg: A) => B, bc: (b: B) => C, cd: (c: C) => D): D;
  <A, B, C, D, E>(
    arg: A,
    ab: (arg: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E
  ): E;
  <A, B, C, D, E, F>(
    arg: A,
    ab: (arg: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F
  ): F;
  <A, B, C, D, E, F, G>(
    arg: A,
    ab: (arg: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G
  ): G;
  <A, B, C, D, E, F, G, H>(
    arg: A,
    ab: (arg: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H
  ): H;
  <A, B, C, D, E, F, G, H, I>(
    arg: A,
    ab: (arg: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I
  ): I;
};

type AnyFunction = (...args: any[]) => any;
export const pipe: Pipe = (arg: any, fn1: AnyFunction, ...fns: AnyFunction[]) =>
  fns.reduce((result, fn) => fn(result), fn1(arg));

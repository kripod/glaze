import { List } from 'ts-toolbelt';

const defaultSteps = [-1, -0.5, 0, +1, +2, +3, +4, +5, +6] as const;

export function modularScale<T extends number>(
  ratio: number,
  steps: T[],
): { readonly [key in T]: string };

export function modularScale(
  ratio: number,
): { readonly [key in List.UnionOf<typeof defaultSteps>]: string };

export function modularScale(
  ratio: number,
  steps: readonly number[] = defaultSteps,
): { [key: number]: string } {
  const tokens: { [key: number]: string } = {};
  steps.forEach((step) => {
    // Rounding to 3 decimal places
    tokens[step] = `${Math.round(ratio ** step * 1e3) / 1e3}rem`;
  });
  return tokens;
}

// TODO: Look for an alternative better than a lookup table
type Negate<T extends number> = number &
  // prettier-ignore
  [
    0,  -1,  -2,  -3,  -4,  -5,  -6,  -7,  -8,  -9, -10,
       -11, -12, -13, -14, -15, -16, -17, -18, -19, -20,
       -21, -22, -23, -24, -25, -26, -27, -28, -29, -30,
       -31, -32, -33, -34, -35, -36, -37, -38, -39, -40,
       -41, -42, -43, -44, -45, -46, -47, -48, -49, -50,
       -51, -52, -53, -54, -55, -56, -57, -58, -59, -60,
       -61, -62, -63, -64,
  ][T];

export function symmetricScale<T extends string | number>(
  nonNegativeTokens: { [key in T]: string | number },
): {
  readonly [key in
    | T
    | Negate<Extract<T, number>>
    | (T extends '1px' ? '-1px' : never)]: string | number;
} {
  return Object.entries(nonNegativeTokens).reduce(
    (tokens, [key, value]) => {
      // eslint-disable-next-line no-param-reassign
      if (key !== '0') tokens[`-${key}` as keyof typeof tokens] = `-${value}`;
      return tokens;
    },
    { ...nonNegativeTokens } as {
      [key in
        | T
        | Negate<Extract<T, number>>
        | (T extends '1px' ? '-1px' : never)]: string | number;
    },
  );
}

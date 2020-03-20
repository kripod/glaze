// eslint-disable-next-line import/prefer-default-export
export function modularScale(
  ratio: number,
  steps = [-1, -0.5, 0, +1, +2, +3, +4, +5, +6],
): {
  [key: number]: string;
} {
  const result: { [key: number]: string } = {};
  steps.forEach((step) => {
    // Rounding to 3 decimal places
    result[step] = `${Math.round(ratio ** step * 1e3) / 1e3}rem`;
  });
  return result;
}

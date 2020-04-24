/**
 * Returns an object created by key-value entries for properties and methods.
 * @param entries An array that contains key-value entries for properties and methods.
 */
export function fromEntries<T extends readonly [PropertyKey, unknown]>(
  entries: readonly T[],
): { [key in T[0]]: T extends readonly [key, infer V] ? V : never } {
  return entries.reduce((object, [key, value]) => {
    // eslint-disable-next-line no-param-reassign
    object[key] = value;
    return object;
  }, {} as any); // eslint-disable-line @typescript-eslint/no-explicit-any
}

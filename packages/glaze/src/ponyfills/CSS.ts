/**
 * Escapes a string for use as part of a selector.
 * @param ident Identifier to be serialized. Control characters and non-letter first symbols are not supported.
 */
// eslint-disable-next-line import/prefer-default-export
export function escape(ident: string): string {
  // Source: https://www.w3.org/TR/cssom-1/#serialize-an-identifier
  return ident.replace(/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~]/g, '\\$&');
}

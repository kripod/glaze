/**
 * Escapes a string for use as part of a selector.
 * @param ident Identifier to be serialized. Control characters and non-letter first symbols are not supported.
 */
// eslint-disable-next-line import/prefer-default-export
export function escape(ident: string): string {
  // Source: https://www.w3.org/TR/cssom-1/#serialize-an-identifier
  return ident.replace(
    /**
     * // Generated with https://github.com/mathiasbynens/regenerate
     * new RegExp(
     *   regenerate()
     *     .addRange(0x20, 0x7e)
     *     .remove('-', '_')
     *     .removeRange('0', '9')
     *     .removeRange('A', 'Z')
     *     .removeRange('a', 'z')
     *     .toString(),
     *   'g',
     * )
     */
    /[ -,./:-@[-^`{-~]/g,
    '\\$&',
  );
}

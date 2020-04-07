export default function escapeIdent(ident: string): string {
  // TODO: Replace with `CSS.escape` when widely supported by browsers
  // Source: https://www.w3.org/TR/cssom-1/#serialize-an-identifier
  // Control characters and non-letter first symbols are not supported
  return ident.replace(/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~]/g, '\\$&');
}

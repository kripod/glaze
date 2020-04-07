export default function escapeIdent(ident: string): string {
  // TODO: Replace with `CSS.escape` when widely supported by browsers
  return ident.replace(/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~]/g, '\\$&');
}

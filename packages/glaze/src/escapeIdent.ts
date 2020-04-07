export default function escapeIdent(identTail: string): string {
  // TODO: Replace with `CSS.escape` when widely supported by browsers
  return identTail.replace(/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~]/g, '\\$&');
}

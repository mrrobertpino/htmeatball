// Keep library insertions outside HTML syntax and raw-text content.
function htmlProtectedRanges(code) {
  const ranges = [];
  const tokens = /<!--[\s\S]*?(?:-->|$)|<(script|style|textarea|title)\b(?:"[^"]*"|'[^']*'|[^'">])*?>[\s\S]*?(?:<\/\1\s*>|$)|<\/?[a-zA-Z][\w:-]*(?:"[^"]*"|'[^']*'|[^'">])*?(?:>|$)|<![^>]*(?:>|$)|&(?:#\d+|#x[\da-f]+|[a-z][\da-z]*);/gi;
  for (const match of code.matchAll(tokens)) ranges.push([match.index, match.index + match[0].length]);
  return ranges;
}
function safeHTMLPosition(code, position) {
  position = Math.max(0, Math.min(code.length, position));
  for (const [start, end] of htmlProtectedRanges(code)) {
    if (position > start && position < end) return position - start < end - position ? start : end;
  }
  return position;
}
function safeHTMLSelection(code, start, end) {
  return !htmlProtectedRanges(code).some(([a, b]) => (start > a && start < b) || (end > a && end < b));
}
if (typeof module !== 'undefined') module.exports = { htmlProtectedRanges, safeHTMLPosition, safeHTMLSelection };

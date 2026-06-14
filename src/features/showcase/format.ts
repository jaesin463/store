export function fmtNumber(n: number) {
  return n >= 1000 ? (n / 1000).toFixed(1) + "k" : n.toString();
}

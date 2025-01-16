export function getRandomFloatAsString(
  min: number,
  max: number,
  decimals: number
): string {
  const str = (Math.random() * (max - min) + min).toFixed(decimals);
  return str;
}

export function generateSKU(
  productSlug: string,
  colour: string,
  productSize: string
) {
  const firstTwo = colour.slice(0, 2).toUpperCase();
  const last = colour.slice(-1).toUpperCase();
  const size = productSize.toUpperCase();

  return `${productSlug}-${firstTwo}${last}-${size}`;
}

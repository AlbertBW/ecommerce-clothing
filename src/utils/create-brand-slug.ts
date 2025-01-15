export function createBrandSlug(brand: string) {
  return brand.toLowerCase().replace(/ /g, "-");
}

import { selectAllSizes } from "@/data-access/sizes.access";

export async function getAllSizes() {
  const sizes = await selectAllSizes();

  return sizes;
}

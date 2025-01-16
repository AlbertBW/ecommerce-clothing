import { selectLatestProductDetails } from "@/data-access/products.access";

export async function getLatestProductDetails() {
  return await selectLatestProductDetails(3);
}

import { CategoryId } from "@/lib/types";
import { generateRandomString } from "./generate-random-string";

export function createProductSlug({
  brandCode,
  productTitleCode,
  categoryId,
  collection,
}: {
  brandCode: string;
  productTitleCode: string;
  categoryId: CategoryId;
  collection: string;
}) {
  const categoryCode = categoryId.toString().padStart(2, "0");
  const collectionCode = collection.charAt(0).toUpperCase();
  const uniqueString = generateRandomString(6);

  return `${brandCode}-${productTitleCode}-${collectionCode}${categoryCode}-${uniqueString}`;
}

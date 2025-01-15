import { CategoryId } from "@/lib/types";
import { generateRandomString } from "./generate-random-string";

export function createProductSlug({
  brandCode,
  productTitleCode,
  categoryId,
  gender,
}: {
  brandCode: string;
  productTitleCode: string;
  categoryId: CategoryId;
  gender: string;
}) {
  const categoryCode = categoryId.toString().padStart(2, "0");
  const genderCode = gender.charAt(0).toUpperCase();
  const uniqueString = generateRandomString(6);

  return `${brandCode}-${productTitleCode}-${genderCode}${categoryCode}-${uniqueString}`;
}

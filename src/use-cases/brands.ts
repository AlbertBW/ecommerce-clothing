import { COLLECTION_COMBINATIONS } from "@/lib/constants";
import { getCategoryBySlug } from "./categories";
import { selectBrandArrayByCollectionAndCategory } from "@/data-access/brands.access";

export async function getBrandsByCollectionAndCategory({
  collection,
  categoryName,
}: {
  collection: string;
  categoryName: string;
}) {
  const collectionCombo =
    COLLECTION_COMBINATIONS[`${collection}` as "men" | "women"];

  const categoryParent = await getCategoryBySlug(categoryName);

  const brands = selectBrandArrayByCollectionAndCategory({
    collections: collectionCombo,
    categoryId: categoryParent.id,
  });

  return brands;
}

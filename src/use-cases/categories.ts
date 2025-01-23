import { selectRecursiveCategoriesByCollection } from "@/data-access/categories.access";
import { Collection } from "@/db/schema";
import { COLLECTION_COMBINATIONS } from "@/lib/constants";

export async function getCategoriesRecursiveByCollection(
  collections: Collection[]
) {
  return await selectRecursiveCategoriesByCollection(collections);
}

export async function getHeaderMenuCollections() {
  const men = COLLECTION_COMBINATIONS["mens"];
  const women = COLLECTION_COMBINATIONS["womens"];

  const womenCategories = await getCategoriesRecursiveByCollection(men);
  const menCategories = await getCategoriesRecursiveByCollection(women);

  const categories = [
    { collection: "women", categories: womenCategories },
    { collection: "men", categories: menCategories },
  ];

  return categories;
}

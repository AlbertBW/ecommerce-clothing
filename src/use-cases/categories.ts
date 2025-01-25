import {
  selectCategoryByName,
  selectRecursiveCategoriesByCollection,
  selectSubcategoriesByCollectionAndParentId,
} from "@/data-access/categories.access";
import { Collection } from "@/db/schema";
import { COLLECTION_COMBINATIONS } from "@/lib/constants";
import { NotFoundError } from "./errors";

export async function getCategoriesRecursiveByCollection(
  collections: Collection[]
) {
  const categories = await selectRecursiveCategoriesByCollection(collections);

  if (!categories || categories.length === 0) {
    throw new NotFoundError("Categories not found");
  }

  return categories;
}

export async function getCategoryByName(name: string) {
  const captialisedName = name.charAt(0).toUpperCase() + name.slice(1);

  const category = await selectCategoryByName(captialisedName);

  if (!category) {
    throw new NotFoundError("Category not found");
  }

  return category;
}

export async function getHeaderMenuCollectionsWithCategories() {
  const men = COLLECTION_COMBINATIONS["men"];
  const women = COLLECTION_COMBINATIONS["women"];

  const [menCategories, womenCategories] = await Promise.all([
    await getCategoriesRecursiveByCollection(men),
    await getCategoriesRecursiveByCollection(women),
  ]);

  if (
    !menCategories ||
    !womenCategories ||
    menCategories.length === 0 ||
    womenCategories.length === 0
  ) {
    throw new NotFoundError("Categories not found");
  }

  const categories = [
    { collection: "women", categories: womenCategories },
    { collection: "men", categories: menCategories },
  ];

  return categories;
}

export async function getSubcategoriesByCollectionAndCategoryId({
  collection,
  categoryName,
}: {
  collection: string;
  categoryName: string;
}) {
  const collectionCombo =
    COLLECTION_COMBINATIONS[`${collection}` as "men" | "women"];

  const categoryParent = await getCategoryByName(categoryName);

  const categories = await selectSubcategoriesByCollectionAndParentId({
    collections: collectionCombo,
    categoryId: categoryParent.id,
  });

  if (!categories || categories.length === 0) {
    throw new NotFoundError("Categories not found");
  }

  return categories;
}

import {
  selectAllCategories,
  selectCategoryBySlug,
  selectRecursiveCategoriesByCollection,
  selectSubcategoriesByCollectionAndParentId,
} from "@/data-access/categories.access";
import { selectBrandArrayByCollectionAndCategory } from "@/data-access/brands.access";
import { selectAllSizes } from "@/data-access/sizes.access";
import { selectProductColoursByCollectionAndParentId } from "@/data-access/colours.access";
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

export async function getCategoryBySlug(name: string) {
  const category = await selectCategoryBySlug(name);

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

export async function getSidebarMenuItemsData({
  collection,
  categoryName,
}: {
  collection: string | string[] | undefined;
  categoryName: string | string[] | undefined;
}) {
  const collectionCombo =
    COLLECTION_COMBINATIONS[`${collection}` as "men" | "women"];
  const categoryParent =
    categoryName !== "all" && categoryName && !Array.isArray(categoryName)
      ? await getCategoryBySlug(categoryName)
      : null;

  return {
    getSubcategories: () =>
      selectSubcategoriesByCollectionAndParentId({
        collections: collectionCombo,
        categoryId: categoryName ? categoryParent?.id : undefined,
      }),
    getProductColours: () =>
      selectProductColoursByCollectionAndParentId({
        collections: collectionCombo,
        categoryId: categoryName ? categoryParent?.id : undefined,
      }),
    getBrandsByCollectionAndCategory: () =>
      selectBrandArrayByCollectionAndCategory({
        collections: collectionCombo,
        categoryId: categoryName ? categoryParent?.id : undefined,
      }),
    getAllSizes: () => selectAllSizes(),
    getAllCategories: () => selectAllCategories(),
  };
}

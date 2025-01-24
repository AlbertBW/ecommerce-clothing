import {
  selectLatestProductDetails,
  selectProductDetailsByCollection,
} from "@/data-access/products.access";
import { allCollections, Collection } from "@/db/schema";
import { getCategoriesRecursiveByCollection } from "./categories";
import { COLLECTION_COMBINATIONS } from "@/lib/constants";
import { ProductDetails } from "@/lib/types";

export function getCollectionParams() {
  return allCollections;
}
export async function getLatestProductDetails() {
  return await selectLatestProductDetails(6);
}

export async function getProductsByCollection(
  collection: Collection[],
  filters: string | string[] | undefined
) {
  return await selectProductDetailsByCollection(collection, filters);
}

export async function collectionHomePage(gender: string) {
  return "data " + gender;
}

export async function getProductsByCollectionAndCategory(
  collection: Collection[],
  category: string[],
  filters: string | string[] | undefined
) {
  const products: ProductDetails[] = [];
  return products;
}

export async function getProductListPageData({
  collection,
  categories,
  filters,
}: {
  collection: string;
  categories: string[];
  filters: string | string[] | undefined;
}) {
  const collectionCombo =
    COLLECTION_COMBINATIONS[`${collection}` as "men" | "women"];

  const [products, categoryTree] = await Promise.all([
    categories[0] === "all"
      ? getProductsByCollection(collectionCombo, filters)
      : getProductsByCollectionAndCategory(
          collectionCombo,
          categories,
          filters
        ),
    getCategoriesRecursiveByCollection(collectionCombo),
  ]);

  return { products, categoryTree };
}

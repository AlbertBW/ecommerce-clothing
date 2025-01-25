import {
  selectLatestProductDetails,
  selectProductDetailsByCollection,
} from "@/data-access/products.access";
import { allCollections, Collection } from "@/db/schema";
import { COLLECTION_COMBINATIONS } from "@/lib/constants";
import { ProductDetails } from "@/lib/types";

export function getCollectionParams() {
  return allCollections;
}
export async function getLatestProductDetails() {
  return await selectLatestProductDetails(6);
}

export async function getProductsByCollection(
  collection: Collection[]
  // orderBy: string | string[] | undefined
) {
  return await selectProductDetailsByCollection(collection);
}

export async function collectionHomePage(gender: string) {
  return "data " + gender;
}

export async function getProductsByCollectionAndCategory(
  collection: Collection[],
  category: string[],
  orderBy: string | string[] | undefined
) {
  console.log(collection, category, orderBy);
  const products: ProductDetails[] = [];
  return products;
}

export async function getProductListPageData({
  collection,
  categories,
  orderBy,
}: // page = "1",
// brand,
// colour,
// size,
// price,
{
  collection: string;
  categories: string[];
  orderBy: string | string[] | undefined;
  page: string | string[] | undefined;
  brand: string | string[] | undefined;
  colour: string | string[] | undefined;
  size: string | string[] | undefined;
  price: string | string[] | undefined;
}) {
  const collectionCombo =
    COLLECTION_COMBINATIONS[`${collection}` as "men" | "women"];

  const products =
    categories[0] === "all"
      ? getProductsByCollection(collectionCombo)
      : getProductsByCollectionAndCategory(
          collectionCombo,
          categories,
          orderBy
        );

  return await products;
}

import {
  selectLatestProductDetails,
  selectProductDetailsByCollection,
  selectProductListDetails,
} from "@/data-access/products.access";
import { allCollections, Collection } from "@/db/schema";
import { COLLECTION_COMBINATIONS } from "@/lib/constants";
import { ProductDetails } from "@/lib/types";
import { selectSizeArrayBySlugArray } from "@/data-access/sizes.access";
import { normaliseArrayParam } from "@/utils/normalise-array-param";
import { selectColoursBySlugArray } from "@/data-access/colours.access";
import { selectBrandArrayBySlugArray } from "@/data-access/brands.access";
import { selectCategoryArrayBySlugArray } from "@/data-access/categories.access";

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
  const products: ProductDetails[] = [];
  return products;
}

export async function getProductListDetails({
  collection,
  category,
  subcategory,
  orderBy,
  page = "1",
  brand,
  colour,
  size,
  price,
}: {
  collection: string;
  category: string;
  subcategory: string | string[] | undefined;
  orderBy: string | string[] | undefined;
  page: string | string[] | undefined;
  brand: string | string[] | undefined;
  colour: string | string[] | undefined;
  size: string | string[] | undefined;
  price: string | string[] | undefined;
}) {
  const collectionCombo =
    COLLECTION_COMBINATIONS[`${collection}` as "men" | "women"];
  const pageNumber = parseInt(page as string);

  const subcategories = normaliseArrayParam(subcategory);
  const brands = normaliseArrayParam(brand);
  const colours = normaliseArrayParam(colour);
  const sizes = normaliseArrayParam(size);

  const [subcategoryArray, brandArray, colourArray, sizeArray] =
    await Promise.all([
      subcategories ? selectCategoryArrayBySlugArray(subcategories) : null,
      brands ? selectBrandArrayBySlugArray(brands) : null,
      colours ? selectColoursBySlugArray(colours) : null,
      sizes ? selectSizeArrayBySlugArray(sizes) : null,
    ]);

  const subcategoryIdArray = subcategoryArray
    ? subcategoryArray.map((sub) => sub.id)
    : null;
  const brandIdArray = brandArray ? brandArray.map((brand) => brand.id) : null;
  const colourIdArray = colourArray
    ? colourArray.map((colour) => colour.id)
    : null;
  const sizeIdArray = sizeArray ? sizeArray.map((size) => size.id) : null;

  const [minPrice, maxPrice] = price
    ? (price as string).split("-").map((num) => Number(num) * 100)
    : [null, null];

  const products = await selectProductListDetails({
    brandIdArray,
    collection: collectionCombo,
    colourIdArray,
    orderBy,
    page: pageNumber,
    minPrice,
    maxPrice,
    sizeIdArray,
    subcategoryIdArray,
  });

  return products;
}

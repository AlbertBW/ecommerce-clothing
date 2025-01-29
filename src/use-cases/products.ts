import {
  selectLatestProductDetails,
  selectProductListDetails,
} from "@/data-access/products.access";
import { allCollections } from "@/db/schema";
import { COLLECTION_COMBINATIONS } from "@/lib/constants";
import { selectSizeArrayBySlugArray } from "@/data-access/sizes.access";
import { normaliseArrayParam } from "@/utils/normalise-array-param";
import {
  selectColoursBySlugArray,
  selectProductColoursByCollectionAndParentId,
} from "@/data-access/colours.access";
import { selectBrandArrayBySlugArray } from "@/data-access/brands.access";
import {
  selectCategoryArrayBySlugArray,
  selectCategoryByParentId,
} from "@/data-access/categories.access";
import { getCategoryBySlug } from "./categories";

export function getCollectionParams() {
  return allCollections;
}
export async function getLatestProductDetails() {
  return await selectLatestProductDetails(6);
}

export async function getProductColours({
  collection,
  categoryName,
}: {
  collection: string;
  categoryName: string;
}) {
  const collectionCombo =
    COLLECTION_COMBINATIONS[`${collection}` as "men" | "women"];

  const categoryParent = await getCategoryBySlug(categoryName);

  const productColours = selectProductColoursByCollectionAndParentId({
    collections: collectionCombo,
    categoryId: categoryParent.id,
  });

  return productColours;
}

export async function collectionHomePage(gender: string) {
  return "data " + gender;
}

export async function getProductListDetails({
  collection,
  categorySlug,
  subcategorySlug,
  orderBy,
  page = "1",
  brandSlug,
  colourSlug,
  sizeSlug,
  price,
}: {
  collection: string;
  categorySlug: string;
  subcategorySlug: string | string[] | undefined;
  orderBy: string | string[] | undefined;
  page: string | string[] | undefined;
  brandSlug: string | string[] | undefined;
  colourSlug: string | string[] | undefined;
  sizeSlug: string | string[] | undefined;
  price: string | string[] | undefined;
}) {
  const collectionCombo =
    COLLECTION_COMBINATIONS[`${collection}` as "men" | "women"];
  const pageNumber = parseInt(page as string);

  const subcategories = normaliseArrayParam(subcategorySlug);
  const brands = normaliseArrayParam(brandSlug);
  const colours = normaliseArrayParam(colourSlug);
  const sizes = normaliseArrayParam(sizeSlug);

  const category = !subcategories
    ? await getCategoryBySlug(categorySlug)
    : null;

  const [subcategoryArray, brandArray, colourArray, sizeArray] =
    await Promise.all([
      subcategories
        ? selectCategoryArrayBySlugArray(subcategories)
        : category
        ? selectCategoryByParentId(category.id)
        : null,
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

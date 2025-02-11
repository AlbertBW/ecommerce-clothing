import {
  selectLatestProductDetails,
  selectProductDetails,
  selectProductDetailsBySearch,
  selectProductListDetails,
} from "@/data-access/products.access";
import { allCollections } from "@/db/schema";
import {
  COLLECTION_COMBINATIONS,
  PRODUCTS_PER_PAGE_STORE,
} from "@/lib/constants";
import { selectSizeArrayBySlugArray } from "@/data-access/sizes.access";
import { normaliseArrayParam } from "@/utils/normalise-array-param";
import { selectColoursBySlugArray } from "@/data-access/colours.access";
import { selectBrandArrayBySlugArray } from "@/data-access/brands.access";
import {
  selectCategoryArrayBySlugArray,
  selectCategoryByParentId,
} from "@/data-access/categories.access";
import { getCategoryBySlug } from "./categories";
import { NotFoundError } from "./errors";
import { ValidationError } from "zod-validation-error";

export function getCollectionParams() {
  return allCollections;
}

export async function getProductDetailsById(id: string) {
  const productId = parseInt(id);

  if (isNaN(productId)) {
    throw new ValidationError("Invalid product ID");
  }

  const product = await selectProductDetails(productId);

  if (!product) {
    throw new NotFoundError("Product not found");
  }

  return product;
}

export async function getLatestProductDetails() {
  return await selectLatestProductDetails(6);
}

export async function collectionHomePage(gender: string) {
  return "data " + gender;
}

export async function getProductListDetails({
  collection,
  categorySlug,
  subcategorySlug,
  sortBy,
  page = "1",
  brandSlug,
  colourSlug,
  sizeSlug,
  price,
  productsPerPage,
}: {
  collection: string | string[] | undefined;
  categorySlug: string | string[] | undefined;
  subcategorySlug: string | string[] | undefined;
  sortBy: string | string[] | undefined;
  page: string | string[] | undefined;
  brandSlug: string | string[] | undefined;
  colourSlug: string | string[] | undefined;
  sizeSlug: string | string[] | undefined;
  price: string | string[] | undefined;
  productsPerPage: number;
}) {
  const collectionCombo =
    COLLECTION_COMBINATIONS[`${collection}` as "men" | "women"];
  const pageNumber = parseInt(page as string);

  const subcategories = normaliseArrayParam(subcategorySlug);
  const brands = normaliseArrayParam(brandSlug);
  const colours = normaliseArrayParam(colourSlug);
  const sizes = normaliseArrayParam(sizeSlug);

  const category =
    !subcategories && categorySlug !== "all"
      ? await getCategoryBySlug(categorySlug as string)
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
    sortBy,
    page: pageNumber,
    minPrice,
    maxPrice,
    sizeIdArray,
    subcategoryIdArray,
    productsPerPage,
  });

  return products;
}

export async function getProductDetailsBySearch({
  search,
  page = "1",
}: {
  search: string | string[];
  page: string;
}) {
  const searchArray =
    typeof search === "string"
      ? search.split(" ").filter(Boolean)
      : Array.isArray(search)
      ? search
      : [];

  const pageNumber = parseInt(page);

  if (isNaN(pageNumber)) {
    throw new ValidationError("Invalid page number");
  }

  return selectProductDetailsBySearch(
    searchArray,
    pageNumber,
    PRODUCTS_PER_PAGE_STORE
  );
}

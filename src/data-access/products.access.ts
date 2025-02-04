import { db } from "@/db";
import {
  categories,
  Collection,
  NewProduct,
  products,
  productVariants,
  UpdatedProduct,
} from "@/db/schema";
import { PRODUCTS_PER_PAGE } from "@/lib/constants";
import { ProductId } from "@/lib/types";
import { asc, desc, eq, gte, lte, sql } from "drizzle-orm";

export async function selectProduct(productId: ProductId) {
  return await db.query.products.findFirst({
    where: eq(products.id, productId),
  });
}

export async function selectProductDetails(productId: ProductId) {
  return await db.query.products.findFirst({
    where: eq(products.id, productId),
    with: {
      productVariants: { with: { colour: true, size: true } },
      productRating: true,
      brand: true,
      category: { with: { parentCategory: true } },
    },
  });
}

export async function selectLatestProductDetails(limit?: number) {
  return await db.query.products.findMany({
    with: {
      productVariants: { with: { colour: true, size: true } },
      productRating: true,
      brand: true,
      category: true,
    },
    orderBy: products.createdAt,
    limit: limit,
  });
}

export async function selectProductDetailsByCollection(
  collection: Collection[]
  // orderBy?: string | string[]
) {
  return await db.query.products.findMany({
    with: {
      productVariants: {
        with: {
          colour: true,
          size: true,
        },
      },
      productRating: true,
      brand: true,
      category: true,
    },
    where: (products, { exists, and, eq, inArray }) =>
      exists(
        db
          .select()
          .from(categories)
          .where(
            and(
              eq(categories.id, products.categoryId),
              inArray(categories.collection, collection)
            )
          )
      ),
  });
}

export async function selectProductListDetails({
  collection,
  subcategoryIdArray,
  colourIdArray,
  sizeIdArray,
  brandIdArray,
  page,
  sortBy,
  minPrice,
  maxPrice,
}: {
  collection: Collection[];
  subcategoryIdArray: number[] | null;
  colourIdArray: number[] | null;
  sizeIdArray: number[] | null;
  brandIdArray: number[] | null;
  page: number;
  sortBy: string | string[] | undefined;
  minPrice: number | null;
  maxPrice: number | null;
}) {
  const productsPerPage = PRODUCTS_PER_PAGE;
  const offset = (page - 1) * productsPerPage;

  type OrderByKey = "popular" | "new" | "priceAsc" | "priceDesc";

  // Define the type for the values of orderByMapping
  type OrderByValue = ReturnType<typeof desc> | ReturnType<typeof asc>;

  // Set the orderBy conditions based on the search params
  const orderByConditions: OrderByValue[] = [];

  // Define the mapping for the orderBy conditions
  const orderByMapping: { [key in OrderByKey]: OrderByValue } = {
    popular: desc(sql<number>`SUM(${productVariants.sold})`),
    new: desc(products.createdAt),
    priceAsc: asc(sql<number>`MIN(${productVariants.price})`),
    priceDesc: desc(sql<number>`MIN(${productVariants.price})`),
  };

  // Add the orderBy condition to the orderByConditions array
  if (sortBy && orderByMapping[sortBy as OrderByKey]) {
    orderByConditions.push(orderByMapping[sortBy as OrderByKey]);
  }

  const allProducts = await db.query.products.findMany({
    where: (products, { exists, and, eq, inArray }) =>
      and(
        // Category and collection filter
        subcategoryIdArray
          ? inArray(products.categoryId, subcategoryIdArray)
          : undefined,
        exists(
          db
            .select()
            .from(categories)
            .where(
              and(
                eq(categories.id, products.categoryId),
                collection
                  ? inArray(categories.collection, collection)
                  : undefined
              )
            )
        ),

        // Color filter
        colourIdArray
          ? exists(
              db
                .select()
                .from(productVariants)
                .where(
                  and(
                    inArray(productVariants.colourId, colourIdArray),
                    eq(productVariants.productId, products.id)
                  )
                )
            )
          : undefined,

        // Size filter
        sizeIdArray
          ? exists(
              db
                .select()
                .from(productVariants)
                .where(
                  and(
                    inArray(productVariants.sizeId, sizeIdArray),
                    eq(productVariants.productId, products.id)
                  )
                )
            )
          : undefined,

        // Brand filter
        brandIdArray ? inArray(products.brandId, brandIdArray) : undefined,

        // Price range filter
        minPrice || maxPrice
          ? exists(
              db
                .select()
                .from(productVariants)
                .where(
                  and(
                    minPrice ? gte(productVariants.price, minPrice) : undefined,
                    maxPrice ? lte(productVariants.price, maxPrice) : undefined,
                    eq(productVariants.productId, products.id)
                  )
                )
            )
          : undefined
      ),
    with: {
      productVariants: {
        with: {
          colour: true,
          size: true,
        },
        orderBy: orderByConditions,
      },
      productRating: true,
      brand: true,
      category: { with: { parentCategory: true } },
    },
    limit: productsPerPage,
    offset: offset,
  });

  return allProducts;
}

export async function insertProduct(newProduct: NewProduct) {
  return await db.insert(products).values(newProduct).returning();
}

export async function updateProduct(
  productId: ProductId,
  updatedProduct: UpdatedProduct
) {
  return await db
    .update(products)
    .set(updatedProduct)
    .where(eq(products.id, productId))
    .returning();
}

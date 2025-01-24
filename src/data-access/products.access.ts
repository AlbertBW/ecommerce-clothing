import { db } from "@/db";
import {
  categories,
  Collection,
  NewProduct,
  products,
  UpdatedProduct,
} from "@/db/schema";
import { ProductId } from "@/lib/types";
import { eq } from "drizzle-orm";

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
      category: true,
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
  collection: Collection[],
  filters?: string | string[]
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

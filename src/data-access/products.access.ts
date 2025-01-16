import { db } from "@/db";
import { NewProduct, products, UpdatedProduct } from "@/db/schema";
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
    },
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

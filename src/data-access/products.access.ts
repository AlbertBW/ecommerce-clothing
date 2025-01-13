import { db } from "@/db";
import { NewProduct, ProductId, products, UpdatedProduct } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getProduct(productId: ProductId) {
  return await db.query.products.findFirst({
    where: eq(products.id, productId),
  });
}

export async function getProductDetails(productId: ProductId) {
  return await db.query.products.findFirst({
    where: eq(products.id, productId),
    with: { productVariants: { with: { colour: true, size: true } } },
  });
}

export async function createProduct(newProduct: NewProduct) {
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

import { db } from "@/db";
import {
  NewProductVariant,
  ProductVariantId,
  productVariants,
  UpdatedProductVariant,
} from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getProductVariant(productVariantId: ProductVariantId) {
  return await db.query.productVariants.findFirst({
    where: eq(productVariants.id, productVariantId),
  });
}

export async function createProductVariant(
  newProductVariant: NewProductVariant
) {
  return await db.insert(productVariants).values(newProductVariant).returning();
}

export async function updateProduct(
  productVariantId: ProductVariantId,
  updatedProductVariant: UpdatedProductVariant
) {
  return await db
    .update(productVariants)
    .set(updatedProductVariant)
    .where(eq(productVariants.id, productVariantId))
    .returning();
}

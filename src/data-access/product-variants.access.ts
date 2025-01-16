import { db } from "@/db";
import {
  NewProductVariant,
  productVariants,
  UpdatedProductVariant,
} from "@/db/schema";
import { ProductVariantId } from "@/lib/types";
import { eq } from "drizzle-orm";

export async function selectProductVariant(productVariantId: ProductVariantId) {
  return await db.query.productVariants.findFirst({
    where: eq(productVariants.id, productVariantId),
  });
}

export async function insertProductVariant(
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

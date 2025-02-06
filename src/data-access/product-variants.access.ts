import { db } from "@/db";
import {
  NewProductVariant,
  productVariants,
  UpdatedProductVariant,
} from "@/db/schema";
import { ProductVariantId } from "@/lib/types";
import { eq, inArray } from "drizzle-orm";

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

export async function selectProductVariantsByProductIdArray({
  productIds,
  limit,
}: {
  productIds: ProductVariantId[];
  limit?: number;
}) {
  return await db.query.productVariants.findMany({
    where: inArray(productVariants.id, productIds),
    with: { product: { with: { brand: true } }, colour: true, size: true },
    limit: limit ?? undefined,
  });
}

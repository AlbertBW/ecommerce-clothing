import {
  categories,
  Collection,
  colours,
  products,
  productVariants,
} from "@/db/schema";
import { db } from "@/db";
import { inArray, eq, and } from "drizzle-orm";

export async function selectProductColoursByCollectionAndParentId({
  collections,
  categoryId,
}: {
  collections: Collection[];
  categoryId: number;
}) {
  console.log("collections", collections, categoryId);
  return await db
    .selectDistinct({
      id: colours.id,
      name: colours.name,
    })
    .from(colours)
    .leftJoin(productVariants, eq(productVariants.colourId, colours.id))
    .leftJoin(products, eq(products.id, productVariants.productId))
    .leftJoin(categories, eq(categories.id, products.categoryId))
    .where(
      and(
        eq(categories.parentId, categoryId),
        inArray(categories.collection, collections)
      )
    )
    .orderBy(colours.name);
}

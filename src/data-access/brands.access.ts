import { db } from "@/db";
import { brands, categories, Collection, products } from "@/db/schema";
import { and, eq, inArray } from "drizzle-orm";

export async function selectBrandArrayBySlugArray(slugs: string[]) {
  return await db.query.brands.findMany({
    where: inArray(brands.slug, slugs),
  });
}

export async function selectBrandArrayByCollectionAndCategory({
  collections,
  categoryId,
}: {
  collections: Collection[];
  categoryId: number;
}) {
  return await db
    .selectDistinct({
      id: brands.id,
      name: brands.name,
      slug: brands.slug,
    })
    .from(brands)
    .leftJoin(products, eq(products.brandId, brands.id))
    .leftJoin(categories, eq(categories.id, products.categoryId))
    .where(
      and(
        eq(categories.parentId, categoryId),
        inArray(categories.collection, collections)
      )
    )
    .orderBy(brands.name);
}

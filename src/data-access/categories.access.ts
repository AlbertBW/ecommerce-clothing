import { db } from "@/db";
import {
  UpdatedCategory,
  NewCategory,
  Collection,
  categories,
} from "@/db/schema";
import { CategoryId } from "@/lib/types";
import { and, eq, inArray, isNotNull, isNull } from "drizzle-orm";

export async function selectAllCategories() {
  return await db.query.categories.findMany({
    where: isNull(categories.parentId),
  });
}

export async function selectCategoryBySlug(slug: string) {
  return await db.query.categories.findFirst({
    where: eq(categories.slug, slug),
  });
}

export async function selectCategoryArrayBySlugArray(slugs: string[]) {
  return await db.query.categories.findMany({
    where: inArray(categories.slug, slugs),
  });
}

export async function selectCategoryByParentId(parentId: number) {
  return await db.query.categories.findMany({
    where: eq(categories.parentId, parentId),
  });
}
export async function selectCategoriesWithSubcategoriesByCollection(
  collections: Collection[]
) {
  return await db.query.categories.findMany({
    where: and(
      inArray(categories.collection, collections),
      isNull(categories.parentId)
    ),
    with: {
      subcategories: { where: inArray(categories.collection, collections) },
    },
  });
}

export async function selectRecursiveCategoriesByCollection(
  collections: Collection[]
) {
  return await db.query.categories.findMany({
    where: and(
      isNull(categories.parentId),
      inArray(categories.collection, collections)
    ),
    with: {
      subcategories: {
        where: inArray(categories.collection, collections),
        with: {
          subcategories: {
            where: inArray(categories.collection, collections),
            with: {
              subcategories: {},
            },
          },
        },
      },
    },
    orderBy: [categories.displayOrder, categories.name],
  });
}

export async function selectSubcategoriesByCollectionAndParentId({
  collections,
  categoryId,
}: {
  collections?: Collection[];
  categoryId?: number;
}) {
  return await db.query.categories.findMany({
    where: and(
      categoryId ? eq(categories.parentId, categoryId) : undefined,
      collections ? inArray(categories.collection, collections) : undefined,
      isNotNull(categories.parentId)
    ),

    orderBy: [categories.displayOrder, categories.name],
  });
}

export async function selectCategoryById(categoryId: CategoryId) {
  return await db.query.categories.findFirst({
    where: eq(categories.id, categoryId),
  });
}

export async function insertCategory(newCategory: NewCategory) {
  return await db.insert(categories).values(newCategory).returning();
}

export async function updateCategory(
  categoryId: CategoryId,
  updatedCategory: UpdatedCategory
) {
  return await db
    .update(categories)
    .set(updatedCategory)
    .where(eq(categories.id, categoryId))
    .returning();
}

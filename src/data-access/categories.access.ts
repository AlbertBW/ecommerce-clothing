import { db } from "@/db";
import {
  UpdatedCategory,
  NewCategory,
  Collection,
  categories,
} from "@/db/schema";
import { CategoryId } from "@/lib/types";
import { and, eq, inArray, isNull } from "drizzle-orm";

export async function selectAllCategories() {
  return await db.query.categories.findMany();
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

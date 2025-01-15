import { db } from "@/db";
import { categories, UpdatedCategory, NewCategory } from "@/db/schema";
import { CategoryId } from "@/lib/types";
import { eq } from "drizzle-orm";

export async function getAllCategories() {
  return await db.query.categories.findMany();
}

export async function getCategoryById(categoryId: CategoryId) {
  return await db.query.categories.findFirst({
    where: eq(categories.id, categoryId),
  });
}

export async function createCategory(newCategory: NewCategory) {
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

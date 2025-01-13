import { db } from "@/db";
import { NewSize, SizeId, sizes, UpdatedSize } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getAllSizes() {
  return await db.query.sizes.findMany();
}

export async function getSizeById(sizeId: SizeId) {
  return await db.query.sizes.findFirst({ where: eq(sizes.id, sizeId) });
}

export async function createSize(newSize: NewSize) {
  return await db.insert(sizes).values(newSize).returning();
}

export async function updateSize(sizeId: number, updatedSize: UpdatedSize) {
  return await db
    .update(sizes)
    .set(updatedSize)
    .where(eq(sizes.id, sizeId))
    .returning();
}

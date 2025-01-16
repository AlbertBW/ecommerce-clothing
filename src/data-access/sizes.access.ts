import { db } from "@/db";
import { NewSize, sizes, UpdatedSize } from "@/db/schema";
import { SizeId } from "@/lib/types";
import { eq } from "drizzle-orm";

export async function selectAllSizes() {
  return await db.query.sizes.findMany();
}

export async function selectSizeById(sizeId: SizeId) {
  return await db.query.sizes.findFirst({ where: eq(sizes.id, sizeId) });
}

export async function insertSize(newSize: NewSize) {
  return await db.insert(sizes).values(newSize).returning();
}

export async function updateSize(sizeId: number, updatedSize: UpdatedSize) {
  return await db
    .update(sizes)
    .set(updatedSize)
    .where(eq(sizes.id, sizeId))
    .returning();
}

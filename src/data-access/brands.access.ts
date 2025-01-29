import { db } from "@/db";
import { brands } from "@/db/schema";
import { inArray } from "drizzle-orm";

export async function selectBrandArrayBySlugArray(slugs: string[]) {
  return await db.query.brands.findMany({
    where: inArray(brands.name, slugs),
  });
}

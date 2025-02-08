import { db } from "@/db";
import { addresses } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function selectUserAddresses(userId: string) {
  return await db.query.addresses.findMany({
    where: eq(addresses.userId, userId),
  });
}

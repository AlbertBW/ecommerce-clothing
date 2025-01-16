import { db } from "@/db";
import { NewWishlist, wishlists } from "@/db/schema";
import { UserId, WishlistId } from "@/lib/types";
import { eq } from "drizzle-orm";

export async function selectWishlistById(wishlistId: WishlistId) {
  return await db.query.wishlists.findFirst({
    where: eq(wishlists.id, wishlistId),
  });
}

export async function selectWishlistByUserId(userId: UserId) {
  return await db.query.wishlists.findFirst({
    where: eq(wishlists.userId, userId),
  });
}

export async function insertWishlist(newWishlist: NewWishlist) {
  const wishlist = await db.insert(wishlists).values(newWishlist).returning();
  return wishlist[0];
}

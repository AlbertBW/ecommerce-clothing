import { db } from "@/db";
import { NewWishlist, wishlistItems, wishlists } from "@/db/schema";
import { ProductVariantId, UserId, WishlistId } from "@/lib/types";
import { and, eq } from "drizzle-orm";

export async function selectWishlistById(wishlistId: WishlistId) {
  return await db.query.wishlists.findFirst({
    where: eq(wishlists.id, wishlistId),
  });
}

export async function selectWishlistByUserId(userId: UserId) {
  return await db.query.wishlists.findFirst({
    where: eq(wishlists.userId, userId),
    with: { wishlistItems: true },
  });
}

export async function selectWishlistWithWishlistItems(userId: UserId) {
  return await db.query.wishlists.findFirst({
    where: eq(wishlists.userId, userId),
    with: { wishlistItems: true },
  });
}

export async function insertWishlist(newWishlist: NewWishlist) {
  const wishlist = await db.insert(wishlists).values(newWishlist).returning();
  return wishlist[0];
}

export async function selectWishlistItemByProductAndId(
  productId: ProductVariantId,
  wishlistId: WishlistId
) {
  return await db.query.wishlistItems.findFirst({
    where: and(
      eq(wishlistItems.productVariantId, productId),
      eq(wishlistItems.wishlistId, wishlistId)
    ),
  });
}

export async function insertWishlistItem(
  productId: ProductVariantId,
  wishlistId: WishlistId
) {
  return await db
    .insert(wishlistItems)
    .values({ productVariantId: productId, wishlistId })
    .returning();
}

export async function deleteWishlistItem(
  productVariantId: ProductVariantId,
  wishlistId: WishlistId
) {
  return await db
    .delete(wishlistItems)
    .where(
      and(
        eq(wishlistItems.productVariantId, productVariantId),
        eq(wishlistItems.wishlistId, wishlistId)
      )
    )
    .returning();
}

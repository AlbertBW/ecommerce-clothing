import {
  insertWishlist,
  selectWishlistByUserId,
} from "@/data-access/wishlists.access";
import { UserId } from "@/lib/types";

export async function getOrCreateWishlist(userId: UserId) {
  const userWishlist = await selectWishlistByUserId(userId);

  if (userWishlist) return userWishlist;

  const newWishlist = await insertWishlist({ userId });

  if (!newWishlist) {
    throw new Error("failed creating Wishlist");
  }

  return newWishlist;
}

import { auth } from "@/auth";
import { deleteCartItem, selectCartByUserId } from "@/data-access/carts.access";
import {
  deleteWishlistItem,
  insertWishlist,
  insertWishlistItem,
  selectWishlistByUserId,
  selectWishlistItemByProductAndId,
  selectWishlistWithWishlistItems,
} from "@/data-access/wishlists.access";
import { ProductVariantId, UseCaseReturnType, UserId } from "@/lib/types";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";

export async function getOrCreateWishlist(userId: UserId) {
  const userWishlist = await selectWishlistByUserId(userId);

  if (userWishlist) return userWishlist;

  const newWishlist = await insertWishlist({ userId });

  if (!newWishlist) {
    throw new Error("failed creating Wishlist");
  }

  return newWishlist;
}

export async function addToWishlist(
  productVariantId: ProductVariantId
): Promise<UseCaseReturnType> {
  const session = await auth();

  if (!session || !session.user.id) {
    throw new AuthError("not authenticated");
  }

  const wishlist = await selectWishlistByUserId(session.user.id);

  if (!wishlist) {
    throw new Error("failed to get wishlist");
  }

  const existing = await selectWishlistItemByProductAndId(
    productVariantId,
    wishlist.id
  );

  if (existing) {
    return { success: false, message: "already in wishlist" };
  }

  const wishlistItem = await insertWishlistItem({
    productVariantId,
    wishlistId: wishlist.id,
  });

  if (!wishlistItem[0]) {
    return { success: false, message: "failed to add to wishlist" };
  }

  revalidatePath("/account/wishlist");
  return { success: true, message: null };
}

export async function removeFromWishlist(
  productId: ProductVariantId
): Promise<UseCaseReturnType> {
  const session = await auth();

  if (!session || !session.user.id) {
    throw new AuthError("not authenticated");
  }

  const wishlist = await selectWishlistByUserId(session.user.id);

  if (!wishlist) {
    throw new Error("failed to get wishlist");
  }

  const existing = await selectWishlistItemByProductAndId(
    productId,
    wishlist.id
  );

  if (!existing) {
    return { success: false, message: "Item not in wishlist" };
  }

  const deleted = await deleteWishlistItem(productId, wishlist.id);

  if (!deleted[0]) {
    return { success: false, message: "failed to remove from wishlist" };
  }

  revalidatePath("/account/wishlist");
  return { success: true, message: null };
}

export async function getWishlistItems(userId: UserId) {
  const wishlist = await selectWishlistWithWishlistItems(userId);

  if (!wishlist) {
    throw new Error("failed to get wishlist");
  }

  return wishlist.wishlistItems;
}

export async function moveToWishlist(
  productVariantId: ProductVariantId
): Promise<UseCaseReturnType> {
  const session = await auth();

  if (!session || !session.user.id) {
    throw new AuthError("not authenticated");
  }

  const [wishlist, cart] = await Promise.all([
    await selectWishlistByUserId(session.user.id),
    await selectCartByUserId(session.user.id),
  ]);

  if (!wishlist) {
    throw new Error("failed to get wishlist");
  }

  if (!cart) {
    throw new Error("failed to get cart");
  }

  const existing = await selectWishlistItemByProductAndId(
    productVariantId,
    wishlist.id
  );

  if (existing) {
    return { success: false, message: "already in wishlist" };
  }
  console.log("productVariantId", productVariantId);

  const wishlistItem = await insertWishlistItem({
    productVariantId,
    wishlistId: wishlist.id,
  });

  if (!wishlistItem[0]) {
    return { success: false, message: "failed to add to wishlist" };
  }

  const deleted = await deleteCartItem(productVariantId, cart.id);

  if (!deleted[0]) {
    return { success: false, message: "failed to remove from cart" };
  }

  revalidatePath("/cart");
  return { success: true, message: null };
}

import { auth } from "@/auth";
import { deleteCartItem, selectCartByUserId } from "@/data-access/carts.access";
import { selectProductVariantsByProductIdArray } from "@/data-access/product-variants.access";
import {
  deleteWishlistItem,
  insertWishlist,
  insertWishlistItem,
  insertWishlistItemArray,
  selectWishlistByUserId,
  selectWishlistItemByProductAndId,
  selectWishlistWithWishlistItems,
} from "@/data-access/wishlists.access";
import { NewWishlistItem } from "@/db/schema";
import { ProductVariantId, UseCaseReturnType, UserId } from "@/lib/types";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { removeOutOfStockCartItemsDb } from "./carts";

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

export async function addArrayToWishlist(
  productVariantIds: ProductVariantId[]
): Promise<UseCaseReturnType> {
  const session = await auth();

  if (!session || !session.user.id) {
    throw new AuthError("not authenticated");
  }

  const wishlist = await selectWishlistByUserId(session.user.id);

  if (!wishlist) {
    throw new Error("failed to get wishlist");
  }

  const newItems = productVariantIds.filter(
    (id) =>
      !wishlist.wishlistItems.map((item) => item.productVariantId).includes(id)
  );

  if (newItems.length === 0) {
    return { success: false, message: "items already in wishlist" };
  }

  const NewWishlistItems: NewWishlistItem[] = newItems.map(
    (productVariantId) => ({
      productVariantId,
      wishlistId: wishlist.id,
    })
  );

  await insertWishlistItemArray(NewWishlistItems);

  // Remove from cart
  await removeOutOfStockCartItemsDb(session.user.id, productVariantIds);

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

export async function getWishlistProductDetails(
  userId: UserId,
  limit?: number
) {
  const wishlistItems = await getWishlistItems(userId);

  const productIds = wishlistItems.map((item) => item.productVariantId);
  const count = productIds.length;

  const products = await selectProductVariantsByProductIdArray({
    productIds,
    limit: limit,
  });

  return { products, count };
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

  const wishlistItem = await insertWishlistItem({
    productVariantId,
    wishlistId: wishlist.id,
  });

  if (!wishlistItem[0]) {
    return { success: false, message: "failed to add to wishlist" };
  }

  await deleteCartItem(productVariantId, cart.id);

  revalidatePath("/cart");
  return { success: true, message: null };
}

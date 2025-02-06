"use server";

import { ProductVariantId } from "@/lib/types";
import { addToWishlist, removeFromWishlist } from "@/use-cases/wishlists";

export async function addToWishlistAction(productId: ProductVariantId) {
  return await addToWishlist(productId);
}

export async function removeFromWishlistAction(productId: ProductVariantId) {
  return await removeFromWishlist(productId);
}

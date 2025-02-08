"use server";

import { ProductVariantId } from "@/lib/types";
import {
  addArrayToWishlist,
  addToWishlist,
  moveToWishlist,
  removeFromWishlist,
} from "@/use-cases/wishlists";

export async function addToWishlistAction(productId: ProductVariantId) {
  return await addToWishlist(productId);
}

export async function removeFromWishlistAction(productId: ProductVariantId) {
  return await removeFromWishlist(productId);
}

export async function moveToWishlistAction(productVariantId: ProductVariantId) {
  return await moveToWishlist(productVariantId);
}

export async function addProductsToWishlistAction(
  productIds: ProductVariantId[]
) {
  return await addArrayToWishlist(productIds);
}

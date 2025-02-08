"use server";

import {
  addToCart,
  clearCart,
  removeCartItem,
  removeOutOfStockCartItems,
  updateQuantity,
} from "@/use-cases/carts";
import { ProductVariantId } from "@/lib/types";

export async function addToCartAction(
  productVariantId: ProductVariantId,
  quantity: number
) {
  await addToCart(productVariantId, quantity);
}

export async function removeCartItemAction(productVariantId: ProductVariantId) {
  await removeCartItem(productVariantId);
}

export async function clearCartAction() {
  await clearCart();
}

export async function updateQuantityAction({
  productVariantId,
  quantity,
}: {
  quantity: number;
  productVariantId: ProductVariantId;
}) {
  return await updateQuantity({ productVariantId, quantity });
}

export async function removeOutOfStockCartItemsAction(
  productVariantIds: ProductVariantId[]
) {
  return await removeOutOfStockCartItems(productVariantIds);
}

"use server";

import {
  addToCart,
  clearCart,
  removeCartItem,
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
  await updateQuantity({ productVariantId, quantity });
}

"use server";

import { auth } from "@/auth";
import { addToCart, clearCartDb, removeCartItemDb } from "@/use-cases/carts";
import { clearCartCookies, removeCartItemCookies } from "./cookie.action";
import { ProductVariantId } from "@/lib/types";

export async function addToCartAction(
  productId: ProductVariantId,
  quantity: number
) {
  await addToCart(productId, quantity);
}

export async function removeCartItemAction(productId: ProductVariantId) {
  const session = await auth();
  if (!session || !session.user.id) {
    await removeCartItemCookies(productId);
  } else {
    await removeCartItemDb(session.user.id, productId);
  }
}

export async function clearCartAction() {
  const session = await auth();
  if (!session || !session.user.id) {
    await clearCartCookies();
  } else {
    await clearCartDb(session.user.id);
  }
}

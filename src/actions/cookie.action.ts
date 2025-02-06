"use server";

import { ProductVariantId } from "@/lib/types";
import { cookies } from "next/headers";

export async function addToCartCookies(
  productId: ProductVariantId,
  quantity: number
) {
  const cookieStore = await cookies();

  if (!cookieStore.has("cart")) {
    cookieStore.set("cart", JSON.stringify([{ id: productId, quantity }]));
  }

  const cart = cookieStore.get("cart");

  if (!cart) {
    throw new Error("failed getting cart");
  }

  const cartContents = JSON.parse(cart.value) as Array<{
    id: number;
    quantity: number;
  }>;

  const existingItemIndex = cartContents.findIndex(
    (item) => item.id === productId
  );

  if (existingItemIndex !== -1) {
    cartContents[existingItemIndex].quantity += 1;
  } else {
    cartContents.push({ id: productId, quantity: quantity || 1 });
  }
  cookieStore.set("cart", JSON.stringify(cartContents));
}

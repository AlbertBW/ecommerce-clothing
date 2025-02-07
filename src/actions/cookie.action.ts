"use server";

import { ProductVariantId } from "@/lib/types";
import { cookies } from "next/headers";

export async function addToCartCookies(
  productId: ProductVariantId,
  quantity: number
) {
  const cookieStore = await cookies();

  if (!cookieStore.has("cart")) {
    cookieStore.set(
      "cart",
      JSON.stringify([{ productVariantId: productId, quantity }])
    );
  }

  const cart = cookieStore.get("cart");

  if (!cart) {
    throw new Error("failed getting cart");
  }

  const cartContents = JSON.parse(cart.value) as Array<{
    productVariantId: number;
    quantity: number;
  }>;

  const existingItemIndex = cartContents.findIndex(
    (item) => item.productVariantId === productId
  );

  if (existingItemIndex !== -1) {
    cartContents[existingItemIndex].quantity += 1;
  } else {
    cartContents.push({ productVariantId: productId, quantity: quantity || 1 });
  }
  cookieStore.set("cart", JSON.stringify(cartContents));
}

export async function clearCartCookies() {
  const cookieStore = await cookies();

  cookieStore.set("cart", JSON.stringify([]));
}

export async function removeCartItemCookies(
  productVariantId: ProductVariantId
) {
  const cookieStore = await cookies();

  const cart = cookieStore.get("cart");

  if (!cart) {
    throw new Error("failed getting cart");
  }

  const cartContents = JSON.parse(cart.value) as Array<{
    productVariantId: number;
    quantity: number;
  }>;

  const existingItemIndex = cartContents.findIndex(
    (item) => item.productVariantId === productVariantId
  );

  if (existingItemIndex !== -1) {
    cartContents.splice(existingItemIndex, 1);
  }

  cookieStore.set("cart", JSON.stringify(cartContents));
}

export async function updateCartItemCookies(
  productVariantId: ProductVariantId,
  quantity: number
) {
  const cookieStore = await cookies();

  const cart = cookieStore.get("cart");

  if (!cart) {
    throw new Error("failed getting cart");
  }

  const cartContents = JSON.parse(cart.value) as Array<{
    productVariantId: number;
    quantity: number;
  }>;

  const existingItemIndex = cartContents.findIndex(
    (item) => item.productVariantId === productVariantId
  );

  if (existingItemIndex !== -1) {
    cartContents[existingItemIndex].quantity = quantity;
  }

  cookieStore.set("cart", JSON.stringify(cartContents));
}

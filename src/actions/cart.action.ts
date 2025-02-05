"use server";

import { addToCart } from "@/use-cases/carts";

export async function addToCartAction(productId: number, quantity: number) {
  await addToCart(productId, quantity);
}

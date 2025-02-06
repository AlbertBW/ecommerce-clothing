"use server";

import { auth } from "@/auth";
import { addToCart, clearCartDb } from "@/use-cases/carts";
import { clearCartCookies } from "./cookie.action";

export async function addToCartAction(productId: number, quantity: number) {
  await addToCart(productId, quantity);
}

export async function clearCartAction() {
  const session = await auth();
  if (!session || !session.user.id) {
    await clearCartCookies();
  } else {
    await clearCartDb(session.user.id);
  }
}

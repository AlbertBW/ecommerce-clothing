import { insertCart, selectCartByUserId } from "@/data-access/carts.access";
import { UserId } from "@/lib/types";

export async function getOrCreateCart(userId: UserId) {
  const userCart = await selectCartByUserId(userId);

  if (userCart) return userCart;

  const newCart = await insertCart({ userId });

  if (!newCart) {
    throw new Error("failed creating cart");
  }

  return newCart;
}

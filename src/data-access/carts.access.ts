import { db } from "@/db";
import { carts, NewCart } from "@/db/schema";
import { CartId, UserId } from "@/lib/types";
import { eq } from "drizzle-orm";

export async function selectCartById(cartId: CartId) {
  return await db.query.carts.findFirst({
    where: eq(carts.id, cartId),
  });
}

export async function selectCartByUserId(userId: UserId) {
  return await db.query.carts.findFirst({
    where: eq(carts.userId, userId),
  });
}

export async function insertCart(newCart: NewCart) {
  const cart = await db.insert(carts).values(newCart).returning();
  return cart[0];
}

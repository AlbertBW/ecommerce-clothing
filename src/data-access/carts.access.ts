import { db } from "@/db";
import { cartItems, carts, NewCart } from "@/db/schema";
import { CartId, ProductVariantId, UserId } from "@/lib/types";
import { and, eq } from "drizzle-orm";

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

export async function selectCartWithCartItems(userId: UserId) {
  return await db.query.carts.findFirst({
    where: eq(carts.userId, userId),
    with: { cartItems: true },
  });
}

export async function insertCartItem(productId: number, cartId: CartId) {
  return await db
    .insert(cartItems)
    .values({
      productVariantId: productId,
      cartId: cartId.toString(),
      quantity: 1,
    })
    .returning();
}

export async function deleteAllCartItems(cartId: CartId) {
  return await db.delete(cartItems).where(eq(cartItems.cartId, cartId));
}

export async function deleteCartItem(
  productVariantId: ProductVariantId,
  cartId: CartId
) {
  return await db
    .delete(cartItems)
    .where(
      and(
        eq(cartItems.productVariantId, productVariantId),
        eq(cartItems.cartId, cartId)
      )
    )
    .returning();
}

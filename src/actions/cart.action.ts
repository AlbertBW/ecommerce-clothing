"use server";

import { auth } from "@/auth";
import {
  addToCart,
  clearCartDb,
  removeCartItemDb,
  updateCartItemDb,
} from "@/use-cases/carts";
import {
  clearCartCookies,
  removeCartItemCookies,
  updateCartItemCookies,
} from "./cookie.action";
import { ProductVariantId } from "@/lib/types";
import { cartItemUpdateSchema } from "@/db/schema";
import { fromZodError } from "zod-validation-error";

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

export async function updateQuantityAction({
  productVariantId,
  quantity,
}: {
  quantity: number;
  productVariantId: ProductVariantId;
}) {
  const session = await auth();
  const { success, error } = cartItemUpdateSchema.safeParse({
    productVariantId,
    quantity,
  });

  if (!success) {
    const validationError = fromZodError(error);
    throw new Error(validationError.message);
  }

  if (!session || !session.user.id) {
    await updateCartItemCookies(productVariantId, quantity);
  } else {
    await updateCartItemDb({
      userId: session.user.id,
      productVariantId,
      quantity,
    });
  }
}

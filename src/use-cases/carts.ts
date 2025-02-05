import { auth } from "@/auth";
import { insertCart, selectCartByUserId } from "@/data-access/carts.access";
import { ProductId, UserId } from "@/lib/types";
import { cookies } from "next/headers";

export async function getOrCreateCart(userId: UserId) {
  const userCart = await selectCartByUserId(userId);

  if (userCart) return userCart;

  const newCart = await insertCart({ userId });

  if (!newCart) {
    throw new Error("failed creating cart");
  }

  return newCart;
}

export async function getCartCookies() {
  const cookieStore = await cookies();

  if (!cookieStore.has("cart")) {
    cookieStore.set("cart", JSON.stringify([]));
  }
  const cart = cookieStore.get("cart");

  if (!cart) {
    throw new Error("failed getting cart");
  }

  const cartContents = JSON.parse(cart.value) as Array<{
    id: number;
    quantity: number;
  }>;

  return { cart: cartContents, cookieStore };
}

export async function addToCart(productId: ProductId, quantity: number) {
  const session = await auth();

  if (!session || !session.user.id) {
    // cookies
    await addToCartCookies(productId, quantity);
  } else {
    // db
    await addToCartDb(productId, quantity, session.user.id);
  }
}

export async function addToCartCookies(productId: ProductId, quantity: number) {
  const { cart, cookieStore } = await getCartCookies();

  const existingItemIndex = cart.findIndex((item) => item.id === productId);

  if (existingItemIndex !== -1) {
    cart[existingItemIndex].quantity += 1;
  } else {
    cart.push({ id: productId, quantity: quantity || 1 });
  }
  cookieStore.set("cart", JSON.stringify(cart));
  console.log("cookies", cookieStore);
}

export async function addToCartDb(
  productId: ProductId,
  quantity: number,
  userId: UserId
) {
  // db
  console.log("db", productId, quantity, userId);
}

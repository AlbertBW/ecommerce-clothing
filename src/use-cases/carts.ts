import { auth } from "@/auth";
import {
  insertCart,
  insertCartItem,
  selectCartByUserId,
  selectCartWithCartItems,
} from "@/data-access/carts.access";
import { selectProductVariantsByProductIdArray } from "@/data-access/product-variants.access";
import {
  deleteWishlistItem,
  selectWishlistByUserId,
} from "@/data-access/wishlists.access";
import { ProductId, ProductVariantId, UserId } from "@/lib/types";
import { revalidatePath } from "next/cache";
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

export async function addToCart(productId: ProductVariantId, quantity: number) {
  const session = await auth();

  if (!session || !session.user.id) {
    await addToCartCookies(productId, quantity);
  } else {
    await addToCartDb(productId, session.user.id);
  }
  revalidatePath("/cart");
}

export async function addToCartCookies(
  productId: ProductVariantId,
  quantity: number
) {
  const { cart, cookieStore } = await getCartCookies();

  const existingItemIndex = cart.findIndex((item) => item.id === productId);

  if (existingItemIndex !== -1) {
    cart[existingItemIndex].quantity += 1;
  } else {
    cart.push({ id: productId, quantity: quantity || 1 });
  }
  cookieStore.set("cart", JSON.stringify(cart));
}

export async function addToCartDb(productId: ProductId, userId: UserId) {
  const [cart, wishlist] = await Promise.all([
    await selectCartWithCartItems(userId),
    await selectWishlistByUserId(userId),
  ]);

  if (!cart) {
    throw new Error("failed getting cart");
  }

  const existingItemInCart = cart.cartItems.find(
    (item) => item.productVariantId === productId
  );

  const existingItemInWishlist = wishlist?.wishlistItems.find(
    (item) => item.productVariantId === productId
  );

  if (existingItemInCart) {
    throw new Error("already in cart");
  }

  await insertCartItem(productId, cart.id);

  if (existingItemInWishlist && wishlist) {
    await deleteWishlistItem(productId, wishlist.id);
  }
}

export async function getHeaderCartItems() {
  const session = await auth();

  if (!session || !session.user.id) {
    return await getCartItemsCookies(3);
  } else {
    return await getCartItemsDb(session.user.id, 3);
  }
}

export async function getCartItemsCookies(limit?: number) {
  const { cart } = await getCartCookies();

  const productIds = cart.map((item) => item.id);
  const count = productIds.length;

  const products = await selectProductVariantsByProductIdArray({
    productIds,
    limit: limit,
  });
  return { products, count };
}

export async function getCartItemsDb(userId: UserId, limit?: number) {
  const userCart = await selectCartWithCartItems(userId);

  if (!userCart) {
    throw new Error("failed getting cart");
  }

  const productIds = userCart.cartItems.map((item) => item.productVariantId);
  const count = productIds.length;

  const products = await selectProductVariantsByProductIdArray({
    productIds,
    limit: limit,
  });

  return { products, count };
}

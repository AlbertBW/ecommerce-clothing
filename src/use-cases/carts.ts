import { addToCartCookies } from "@/actions/cookie.action";
import { auth } from "@/auth";
import {
  deleteAllCartItems,
  deleteCartItem,
  insertCart,
  insertCartItem,
  selectCartByUserId,
  selectCartWithCartItems,
  updateCartItem,
} from "@/data-access/carts.access";
import { selectProductVariantsByProductIdArray } from "@/data-access/product-variants.access";
import {
  deleteWishlistItem,
  selectWishlistByUserId,
} from "@/data-access/wishlists.access";
import { ProductVariantId, UserId } from "@/lib/types";
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

  const cart = cookieStore.get("cart");

  if (!cart) {
    return { cart: [], cookieStore };
  }

  const cartContents = JSON.parse(cart.value) as Array<{
    productVariantId: number;
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

export async function addToCartDb(
  productVariantId: ProductVariantId,
  userId: UserId
) {
  const [cart, wishlist] = await Promise.all([
    await selectCartWithCartItems(userId),
    await selectWishlistByUserId(userId),
  ]);

  if (!cart) {
    throw new Error("failed getting cart");
  }

  const existingItemInCart = cart.cartItems.find(
    (item) => item.productVariantId === productVariantId
  );

  const existingItemInWishlist = wishlist?.wishlistItems.find(
    (item) => item.productVariantId === productVariantId
  );

  if (existingItemInCart) {
    throw new Error("already in cart");
  }

  await insertCartItem({ productVariantId, cartId: cart.id, quantity: 1 });

  if (existingItemInWishlist && wishlist) {
    await deleteWishlistItem(productVariantId, wishlist.id);
  }
}

export async function getCartItems(limit?: number) {
  const session = await auth();

  if (!session || !session.user.id) {
    return await getCartItemsCookies(limit);
  } else {
    return await getCartItemsDb(session.user.id, limit);
  }
}

export async function getCartItemsCookies(limit?: number) {
  const { cart } = await getCartCookies();

  const productIds = cart.map((item) => item.productVariantId);
  const count = productIds.length;

  const products = await selectProductVariantsByProductIdArray({
    productIds,
    limit: limit,
  });
  return { products, count, cart };
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

  return { products, count, cart: userCart.cartItems };
}

export async function clearCartDb(userId: UserId) {
  const userCart = await selectCartByUserId(userId);

  if (!userCart) {
    throw new Error("failed getting cart");
  }

  await deleteAllCartItems(userCart.id);

  revalidatePath("/cart");
}

export async function removeCartItemDb(
  userId: UserId,
  productVariantId: ProductVariantId
) {
  const userCart = await selectCartWithCartItems(userId);

  if (!userCart) {
    throw new Error("failed getting cart");
  }

  await deleteCartItem(productVariantId, userCart.id);

  revalidatePath("/cart");
}

export async function updateCartItemDb({
  userId,
  productVariantId,
  quantity,
}: {
  userId: UserId;
  productVariantId: ProductVariantId;
  quantity: number;
}) {
  const userCart = await selectCartWithCartItems(userId);

  if (!userCart) {
    throw new Error("failed getting cart");
  }

  const existingItem = userCart.cartItems.find(
    (item) => item.productVariantId === productVariantId
  );

  if (!existingItem) {
    throw new Error("item not in cart");
  }

  await updateCartItem({ productVariantId, cartId: userCart.id, quantity });

  revalidatePath("/cart");
}

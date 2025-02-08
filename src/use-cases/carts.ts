import {
  addToCartCookies,
  clearCartCookies,
  removeCartItemCookies,
  removeOutOfStockCartItemsCookies,
  updateCartItemCookies,
} from "@/actions/cookie.action";
import { auth } from "@/auth";
import {
  deleteAllCartItems,
  deleteCartItem,
  deleteCartItemsByArray,
  insertCart,
  insertCartItem,
  selectCartByUserId,
  selectCartWithCartItems,
  updateCartItem,
} from "@/data-access/carts.access";
import {
  selectProductVariant,
  selectProductVariantsByProductIdArray,
} from "@/data-access/product-variants.access";
import {
  deleteWishlistItem,
  selectWishlistByUserId,
} from "@/data-access/wishlists.access";
import { cartItemUpdateSchema } from "@/db/schema";
import { ProductVariantId, UseCaseReturnType, UserId } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { fromZodError } from "zod-validation-error";

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
  "use server";
  const session = await auth();

  if (!session || !session.user.id) {
    return await getCartItemsCookies(limit);
  } else {
    return await getCartItemsDb({ userId: session.user.id, limit });
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

  const outOfStockProducts = products.filter(
    (item) =>
      item.stock < 0 &&
      cart.find((cartItem) => cartItem.productVariantId === item.id)
  );

  return { products, count, cart, outOfStockProducts };
}

export async function getCartItemsDb({
  userId,
  limit,
}: {
  userId: UserId;
  limit?: number;
}) {
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

  const outOfStockProducts = products.filter(
    (item) =>
      item.stock < 0 &&
      userCart.cartItems.find(
        (cartItem) => cartItem.productVariantId === item.id
      )
  );

  return { products, count, cart: userCart.cartItems, outOfStockProducts };
}

export async function clearCart() {
  const session = await auth();
  if (!session || !session.user.id) {
    await clearCartCookies();
  } else {
    await clearCartDb(session.user.id);
  }
}

export async function clearCartDb(userId: UserId) {
  const userCart = await selectCartByUserId(userId);

  if (!userCart) {
    throw new Error("failed getting cart");
  }

  await deleteAllCartItems(userCart.id);

  revalidatePath("/cart");
}

export async function removeCartItem(productVariantId: ProductVariantId) {
  const session = await auth();
  if (!session || !session.user.id) {
    await removeCartItemCookies(productVariantId);
  } else {
    await removeCartItemDb(session.user.id, productVariantId);
  }
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

export async function updateQuantity({
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

  const productVariant = await selectProductVariant(productVariantId);

  if (!productVariant) {
    throw new Error("product variant not found");
  }

  const newQuantity = Math.min(quantity, productVariant.stock);

  if (!session || !session.user.id) {
    await updateCartItemCookies(productVariantId, newQuantity);
  } else {
    await updateCartItemDb({
      userId: session.user.id,
      productVariantId,
      quantity: newQuantity,
    });
  }

  if (quantity > productVariant.stock) {
    return { message: "Quantity exceeds stock" };
  } else {
    return { message: null };
  }
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

export async function removeOutOfStockCartItems(
  productVariantIds: ProductVariantId[]
): Promise<UseCaseReturnType> {
  const session = await auth();

  if (!session || !session.user.id) {
    await removeOutOfStockCartItemsCookies(productVariantIds);
  } else {
    await removeOutOfStockCartItemsDb(session.user.id, productVariantIds);
  }

  return { success: true, message: null };
}

export async function removeOutOfStockCartItemsDb(
  userId: UserId,
  productVariantIds: ProductVariantId[]
) {
  const userCart = await selectCartWithCartItems(userId);

  if (!userCart) {
    throw new Error("failed getting cart");
  }

  await deleteCartItemsByArray(productVariantIds, userCart.id);

  revalidatePath("/cart");
}

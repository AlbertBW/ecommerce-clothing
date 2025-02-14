import { CheckoutForm } from "@/app/(store)/checkout/_components/checkout-form";
import { auth } from "@/auth";
import {
  insertAddress,
  selectAddressById,
} from "@/data-access/addresses.access";
import {
  Address,
  NewAddress,
  NewOrder,
  NewOrderItem,
  addressInsertSchema,
  emailFormSchema,
  orderInsertSchema,
  orderStatusSchema,
} from "@/db/schema";
import { z } from "zod";
import {
  selectProductVariantsByProductIdArray,
  updateProductVariant,
} from "@/data-access/product-variants.access";
import { getCartItemsCookies, getCartItemsDb } from "./carts";
import { SHIPPING_METHODS } from "@/lib/constants";
import { generateRandomString } from "@/utils/generate-random-string";
import {
  insertOrder,
  insertOrderItems,
  selectAllOrders,
  selectOrderById,
  selectOrdersByEmail,
  selectOrdersByUserId,
  selectOrdersCount,
  selectUserOrderByOrderId,
  updateOrderStatus,
} from "@/data-access/orders.access";
import { LineItem, OrderId, SessionCreate } from "@/lib/types";
import { createStripeCheckoutSession } from "@/actions/stripe.action";
import { createStripeRefund, getStripeCheckoutSession } from "./stripe";
import { revalidatePath } from "next/cache";

export async function updateOrderStatusUseCase({
  orderId,
  paymentIntentId,
  status,
}: {
  orderId: string;
  paymentIntentId?: string;
  status: string;
}) {
  const orderIdValidation = z.string().uuid().safeParse(orderId);

  if (!orderIdValidation.success) {
    throw new Error("Invalid order ID");
  }

  const statusValidation = orderStatusSchema.parse(status);

  return await updateOrderStatus({
    orderId: orderIdValidation.data,
    paymentIntentId,
    status: statusValidation,
  });
}

export async function createOrder(
  state: CheckoutForm,
  formData: FormData
): Promise<CheckoutForm> {
  const session = await auth();
  const shippingMethod = z.string().parse(formData.get("shippingMethod"));
  const selectedAddressId = z
    .string()
    .nullable()
    .parse(formData.get("addressId"));

  const emailValidation = emailFormSchema.safeParse(
    session?.user.email ?? formData.get("email") ?? ""
  );

  const address: NewAddress = {
    userId: session?.user.id ?? null,
    name: formData.get("name") as string,
    addressLine1: formData.get("address1") as string,
    addressLine2: formData.get("address2") as string,
    city: formData.get("city") as string,
    county: formData.get("county") as string,
    postcode: formData.get("postcode") as string,
    country: formData.get("country") as string,
    phoneNumber: formData.get("phone") as string,
  };

  let userAddress: Address | undefined = undefined;

  if (!selectedAddressId) {
    const validatedAddress = addressInsertSchema.safeParse(address);

    if (!validatedAddress.success || !emailValidation.success) {
      return {
        data: {
          addressId: selectedAddressId,
          email: session?.user.email ?? (formData.get("email") as string),
          address,
          shippingMethod,
          sessionId: null,
        },
        errors: !validatedAddress.success
          ? validatedAddress.error?.flatten().fieldErrors
          : null,
        emailError: !emailValidation.success
          ? emailValidation.error?.flatten().formErrors
          : null,
      };
    }

    userAddress = (await insertAddress(validatedAddress.data))[0];
  }
  if (!emailValidation.success) {
    return {
      data: {
        addressId: selectedAddressId,
        email: session?.user.email ?? (formData.get("email") as string),
        address,
        shippingMethod,
        sessionId: null,
      },
      errors: null,
      emailError: emailValidation.error?.flatten().formErrors,
    };
  }

  const email = emailValidation.data;
  const orderNumber = generateRandomString();

  const userCart = session?.user.id
    ? await getCartItemsDb({ userId: session.user.id })
    : await getCartItemsCookies();

  const productVariantIds = userCart.products.map((item) => item.id);

  const productVariants = await selectProductVariantsByProductIdArray({
    productIds: productVariantIds,
  });

  productVariants.forEach((productVariant) => {
    if (productVariant.stock < 1) {
      throw new Error(`${productVariant.product.name} is out of stock`);
    }
  });

  const shipping = SHIPPING_METHODS.find(
    (method) => method.name === shippingMethod
  ) ?? {
    price: 0,
    name: "free",
  };

  if (!userAddress && selectedAddressId) {
    userAddress = await selectAddressById(selectedAddressId);
  }

  if (!userAddress) {
    throw new Error("Failed to create address");
  }

  const price = userCart.products.reduce((acc, item) => {
    const quantity = userCart.cart.find(
      (cartItem) => cartItem.productVariantId === item.id
    )?.quantity;
    return acc + item.price * (quantity || 0);
  }, 0);

  const order: NewOrder = {
    userId: session?.user.id ?? null,
    email,
    deliveryAddressId: userAddress.id,
    shippingMethod,
    orderNumber: orderNumber,
    status: "unpaid",
    price: price,
    shippingPrice: shipping.price,
    customerNote: formData.get("customerNote") as string,
  };

  const validatedOrder = orderInsertSchema.safeParse(order);

  if (!validatedOrder.success) {
    throw new Error("Failed to create order");
  }

  const newOrder = (await insertOrder(validatedOrder.data))[0];

  const orderItems: NewOrderItem[] = userCart.products.map((item) => {
    const quantity = userCart.cart.find(
      (cartItem) => cartItem.productVariantId === item.id
    )?.quantity;
    return {
      orderId: newOrder.id,
      productVariantId: item.id,
      quantity: quantity || 0,
      productPrice: item.price,
    };
  });

  const newOrderItems = await insertOrderItems(orderItems);

  if (newOrderItems.length === 0) {
    throw new Error("Failed to create order items");
  }

  const lineItems: LineItem[] = userCart.products.map((item) => {
    const quantity = userCart.cart.find(
      (cartItem) => cartItem.productVariantId === item.id
    )?.quantity;
    return {
      price_data: {
        currency: "gbp",
        unit_amount: item.price,
        product_data: {
          name: `${item.product.name} (ID: ${item.id})`,
          description: item.product.name,
          metadata: {
            product_variant_id: item.id.toString(),
            product_id: item.product.id?.toString(),
          },
        },
      },
      quantity: quantity || 0,
    };
  });

  const sessionCreate: SessionCreate = {
    mode: "payment",
    payment_method_types: ["card"],
    currency: "gbp",
    customer_email: email,
    line_items: lineItems,
    client_reference_id: orderNumber,
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: shipping.price,
            currency: "gbp",
          },
          display_name: shipping.name,
        },
      },
    ],
    metadata: {
      order_id: newOrder.id.toString(),
    },
  };

  const { sessionId } = await createStripeCheckoutSession(sessionCreate);

  return {
    data: {
      addressId: selectedAddressId,
      email,
      address: userAddress,
      shippingMethod,
      sessionId,
    },
    errors: null,
    emailError: null,
  };
}

export async function completeOrder({
  orderId,
  paymentIntentId,
  status,
}: {
  orderId: string;
  paymentIntentId: string;
  status: string;
}) {
  const orderStatus = (
    await updateOrderStatusUseCase({
      orderId,
      paymentIntentId,
      status,
    })
  )[0];

  const customerOrder = await selectOrderById(orderStatus.id);

  if (!customerOrder) {
    throw new Error("Order not found");
  }

  const updatedProductVariants = customerOrder.orderItems.map((item) => {
    return {
      id: item.productVariant.id,
      stock: item.productVariant.stock - item.quantity,
    };
  });

  updatedProductVariants.map(async (productVariant) => {
    await updateProductVariant(productVariant.id, productVariant);
  });
}

export async function getSuccessfulOrder(sessionId: string) {
  const stripeSession = await getStripeCheckoutSession(sessionId);

  const orderId = stripeSession.metadata?.order_id;
  const orderIdValidation = z.string().uuid().safeParse(orderId);

  if (!orderIdValidation.success) {
    throw new Error("Invalid order ID");
  }

  const order = await selectOrderById(orderIdValidation.data);

  if (!order) {
    throw new Error("Order not found");
  }

  return order;
}

export async function getOrders(page: number) {
  const session = await auth();

  if (!session || !session.user.id) {
    throw new Error("User not found");
  }

  return await selectOrdersByUserId(session.user.id, page);
}

export async function getOrderById(orderId: OrderId) {
  const session = await auth();

  if (!session) {
    throw new Error("User not found");
  }

  const order = await selectUserOrderByOrderId(orderId);

  return order;
}

export async function cancelOrder(orderId: OrderId) {
  const session = await auth();

  if (!session) {
    throw new Error("User not found");
  }

  const order = await selectUserOrderByOrderId(orderId);

  if (!order || !order.paymentIntentId) {
    throw new Error("Order not found");
  }

  const refund = await createStripeRefund({
    paymentIntentId: order.paymentIntentId,
  });

  console.log(refund);

  const updatedOrder = await updateOrderStatus({
    orderId,
    status: "cancelled",
  });

  if (!updatedOrder[0]) {
    throw new Error("Failed to cancel order");
  }

  const updatedProductVariants = order.orderItems.map((item) => {
    return {
      id: item.productVariant.id,
      stock: item.productVariant.stock + item.quantity,
    };
  });

  updatedProductVariants.map(async (productVariant) => {
    await updateProductVariant(productVariant.id, productVariant);
  });

  revalidatePath(`/account/orders/${orderId}`);
  return orderId;
}

export async function getAllOrders({
  status,
  sortBy,
  search,
  page = "1",
  productsPerPage,
}: {
  status?: string;
  sortBy?: string;
  search?: string;
  page?: string;
  productsPerPage: number;
}) {
  const pageNumber = parseInt(page);

  const statusValidation = orderStatusSchema.parse(status);

  const sortByValidation = z.string().optional().parse(sortBy);
  const searchValidation = z
    .string()
    .optional()
    .transform((val) => {
      if (!val) return undefined;
      if (z.string().email().safeParse(val).success) return { email: val };
      if (val.length === 10 && /^[A-Za-z0-9]+$/.test(val))
        return { orderNumber: val };
      if (z.string().uuid().safeParse(val).success) return { userId: val };
      return undefined;
    })
    .parse(search);

  console.log(statusValidation, "Order Number");

  if (isNaN(pageNumber)) {
    throw new Error("Invalid page number");
  }

  return await selectAllOrders({
    status: statusValidation,
    sortBy: sortByValidation,
    email: searchValidation?.email,
    orderNumber: searchValidation?.orderNumber,
    userId: searchValidation?.userId,
    page: pageNumber,
    productsPerPage,
  });
}

export async function getGuestOrders(email: string) {
  const validatedEmail = z.string().email().parse(email.replace("%40", "@"));

  const orders = await selectOrdersByEmail(validatedEmail);

  return orders;
}

export async function getAdminSidebarOrdersData() {
  const DAYS_IN_MS = 24 * 60 * 60 * 1000;
  const sevenDaysAgo = new Date(Date.now() - 7 * DAYS_IN_MS);
  const thirtyDaysAgo = new Date(Date.now() - 30 * DAYS_IN_MS);

  const totalOrders = await selectOrdersCount();
  const ordersLast30Days = await selectOrdersCount(thirtyDaysAgo);
  const ordersLast7Days = await selectOrdersCount(sevenDaysAgo);

  return {
    totalOrders: totalOrders[0].count,
    ordersLast30Days: ordersLast30Days[0].count,
    ordersLast7Days: ordersLast7Days[0].count,
  };
}

import { CheckoutForm } from "@/app/(store)/checkout/_components/checkout-form";
import { auth } from "@/auth";
import {
  insertAddress,
  selectAddressById,
} from "@/data-access/addresses.access";
import {
  NewAddress,
  NewOrder,
  NewOrderItem,
  addressInsertSchema,
  emailFormSchema,
  orderInsertSchema,
} from "@/db/schema";
import { z } from "zod";
import {
  selectProductVariantsByProductIdArray,
  updateProductVariant,
} from "@/data-access/product-variants.access";
import { clearCartDb, getCartItemsCookies, getCartItemsDb } from "./carts";
import { SHIPPING_METHODS } from "@/lib/constants";
import { generateRandomString } from "@/utils/generate-random-string";
import {
  insertOrder,
  insertOrderItems,
  selectOrderById,
  updateOrderStatus,
} from "@/data-access/orders.access";
import { clearCartCookies } from "@/actions/cookie.action";
import { LineItem, SessionCreate } from "@/lib/types";
import { createStripeCheckoutSession } from "@/actions/stripe.action";
import { getStripeCheckoutSession } from "./stripe";

export async function updateOrderStatusUseCase({
  orderId,
  status,
}: {
  orderId: string;
  status: string;
}) {
  const orderIdValidation = z.string().uuid().safeParse(orderId);

  if (!orderIdValidation.success) {
    throw new Error("Invalid order ID");
  }

  return await updateOrderStatus({
    orderId: orderIdValidation.data,
    status,
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
    .parse(formData.get("selectedAddressId"));

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

  const validatedAddress = addressInsertSchema.safeParse(address);

  if (!selectedAddressId && !validatedAddress.success) {
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

  if (!emailValidation.success) {
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

  // Address
  let deliveryAddress;
  if (selectedAddressId) {
    deliveryAddress = await selectAddressById(selectedAddressId);
  } else if (validatedAddress.success) {
    [deliveryAddress] = await insertAddress(validatedAddress.data);
  }
  if (!deliveryAddress) {
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
    deliveryAddressId: deliveryAddress.id,
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

  if (session?.user.id === null) {
    await clearCartCookies();
  } else if (session?.user.id) {
    await clearCartDb(session.user.id);
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
      address: deliveryAddress,
      shippingMethod,
      sessionId,
    },
    errors: null,
    emailError: null,
  };
}

export async function completeOrder({
  orderId,
  status,
}: {
  orderId: string;
  status: string;
}) {
  const orderStatus = (
    await updateOrderStatusUseCase({
      orderId,
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

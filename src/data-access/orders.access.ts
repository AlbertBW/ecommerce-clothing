import { db } from "@/db";
import { NewOrder, NewOrderItem, orderItems, orders } from "@/db/schema";
import { OrderId, UserId } from "@/lib/types";
import { asc, desc, eq, or } from "drizzle-orm";

export async function insertOrder(newOrder: NewOrder) {
  return await db.insert(orders).values(newOrder).returning();
}

export async function insertOrderItems(newOrderItems: NewOrderItem[]) {
  return await db.insert(orderItems).values(newOrderItems).returning();
}

export async function updateOrderStatus({
  orderId,
  paymentIntentId,
  status,
}: {
  orderId: OrderId;
  paymentIntentId?: string;
  status: string;
}) {
  return await db
    .update(orders)
    .set({
      status,
      ...(paymentIntentId ? { paymentIntentId } : {}),
    })
    .where(eq(orders.id, orderId))
    .returning();
}

export async function selectOrderById(id: OrderId) {
  return await db.query.orders.findFirst({
    where: eq(orders.id, id),
    with: {
      orderItems: {
        with: {
          productVariant: {
            with: {
              product: { with: { brand: true } },
              size: true,
              colour: true,
            },
          },
        },
      },
      deliveryAddress: true,
    },
  });
}

export async function selectOrdersByUserId(userId: UserId, page: number) {
  return await db.query.orders.findMany({
    where: eq(orders.userId, userId),
    with: {
      orderItems: {
        with: {
          productVariant: {
            with: {
              product: { with: { brand: true } },
              size: true,
              colour: true,
            },
          },
        },
      },
      deliveryAddress: true,
    },
    limit: 10,
    offset: (page - 1) * 10,
    orderBy: desc(orders.createdAt),
  });
}

export async function selectUserOrderByOrderId(orderId: OrderId) {
  return await db.query.orders.findFirst({
    where: eq(orders.id, orderId),
    with: {
      orderItems: {
        with: {
          productVariant: {
            with: {
              product: { with: { brand: true } },
              size: true,
              colour: true,
            },
          },
        },
      },
      deliveryAddress: true,
    },
  });
}

export async function selectAllOrders({
  status,
  sortBy,
  email,
  orderNumber,
  page,
  productsPerPage,
}: {
  status?: string;
  sortBy?: string;
  email?: string;
  orderNumber?: string;
  page: number;
  productsPerPage: number;
}) {
  const offset = (page - 1) * productsPerPage;

  return await db.query.orders.findMany({
    where: or(
      status ? eq(orders.status, status) : undefined,
      email ? eq(orders.email, email) : undefined,
      orderNumber ? eq(orders.orderNumber, orderNumber) : undefined
    ),
    with: {
      deliveryAddress: true,
      orderItems: true,
      user: true,
    },
    orderBy: sortBy === "new" ? asc(orders.createdAt) : desc(orders.createdAt),
    limit: productsPerPage,
    offset,
  });
}

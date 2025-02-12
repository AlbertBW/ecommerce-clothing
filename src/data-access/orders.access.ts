import { db } from "@/db";
import { NewOrder, NewOrderItem, orderItems, orders } from "@/db/schema";
import { OrderId, OrderStatus, UserId } from "@/lib/types";
import { and, asc, desc, eq, or } from "drizzle-orm";

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
  status: OrderStatus;
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
export type OrderWithDetails = Awaited<ReturnType<typeof selectOrderById>>;

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
      user: true,
      shipments: true,
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
  status?: OrderStatus;
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

export async function selectOrdersByEmail(email: string) {
  return await db.query.orders.findMany({
    where: eq(orders.email, email),
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
    },
  });
}

export async function updateOrdersAnonymize(userId: UserId, email: string) {
  await db
    .update(orders)
    .set({ email: null })
    .where(and(eq(orders.email, email), eq(orders.userId, userId)));
}

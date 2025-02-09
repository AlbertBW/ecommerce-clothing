import { db } from "@/db";
import { NewOrder, NewOrderItem, orderItems, orders } from "@/db/schema";
import { OrderNumber } from "@/lib/types";
import { eq } from "drizzle-orm";

export async function insertOrder(newOrder: NewOrder) {
  return await db.insert(orders).values(newOrder).returning();
}

export async function insertOrderItems(newOrderItems: NewOrderItem[]) {
  return await db.insert(orderItems).values(newOrderItems).returning();
}

export async function updateOrderStatus({
  orderNumber,
  status,
}: {
  orderNumber: OrderNumber;
  status: string;
}) {
  return await db
    .update(orders)
    .set({ status: status })
    .where(eq(orders.orderNumber, orderNumber))
    .returning();
}

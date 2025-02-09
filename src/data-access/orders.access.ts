import { db } from "@/db";
import { NewOrder, NewOrderItem, orderItems, orders } from "@/db/schema";

export async function insertOrder(newOrder: NewOrder) {
  return await db.insert(orders).values(newOrder).returning();
}

export async function insertOrderItems(newOrderItems: NewOrderItem[]) {
  return await db.insert(orderItems).values(newOrderItems).returning();
}

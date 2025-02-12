import { db } from "@/db";
import { NewShipment, shipments } from "@/db/schema";

export async function insertShipment(newShipment: NewShipment) {
  return await db.insert(shipments).values(newShipment).returning();
}

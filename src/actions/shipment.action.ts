"use server";
import { OrderId } from "@/lib/types";
import { createShipment } from "@/use-cases/shipment";

export async function createShipmentAction(
  orderId: OrderId,
  formData: FormData
) {
  return await createShipment(orderId, formData);
}

import { insertShipment } from "@/data-access/shipment.access";
import { NewShipment } from "@/db/schema";
import { OrderId } from "@/lib/types";
import { generateRandomString } from "@/utils/generate-random-string";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getOrderById } from "./orders";
import { updateOrderStatus } from "@/data-access/orders.access";

export async function createShipment(orderId: OrderId, formData: FormData) {
  const order = await getOrderById(orderId);
  if (!order) throw new Error("Order not found");

  const weight = formData.get("weight");
  const length = formData.get("length");
  const width = formData.get("width");
  const height = formData.get("height");

  const dimensions = `${length}x${width}x${height}`;
  const validatedDimensions = z.string().parse(dimensions);
  const validatedWeight = z.coerce.number().parse(weight);

  const estimatedDeliveryDate = new Date(
    Date.now() +
      (order.shippingMethod === "standard" ? 5 : 2) * 24 * 60 * 60 * 1000
  );

  console.log(estimatedDeliveryDate);

  const shipment: NewShipment = {
    orderId,
    carrier: "Royal Mail",
    trackingNumber: generateRandomString(),
    dimensions: validatedDimensions,
    weight: validatedWeight,
    estimatedDeliveryDate,
    shippingCost: order.shippingPrice,
    shippingMethod: order?.shippingMethod,
    status: "Dispatched",
  };

  await insertShipment(shipment);
  await updateOrderStatus({ orderId, status: "fulfilled" });

  revalidatePath(`/admin/orders/${orderId}`);
}

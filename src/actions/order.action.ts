"use server";

import { CheckoutForm } from "@/app/(store)/checkout/_components/checkout-form";
import { OrderId } from "@/lib/types";
import { cancelOrder, createOrder } from "@/use-cases/orders";

export async function createOrderAction(
  state: CheckoutForm,
  formData: FormData
) {
  return await createOrder(state, formData);
}

export async function cancelOrderAction(orderId: OrderId) {
  await cancelOrder(orderId);
}

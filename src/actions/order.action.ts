"use server";

import { CheckoutForm } from "@/app/(store)/checkout/_components/checkout-form";
import { createOrder } from "@/use-cases/orders";

export async function createOrderAction(
  state: CheckoutForm,
  formData: FormData
) {
  return await createOrder(state, formData);
}

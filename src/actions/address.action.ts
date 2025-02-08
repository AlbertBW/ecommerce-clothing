"use server";

import { AddressForm } from "@/app/(store)/checkout/_components/address-form";
import { createAddress } from "@/use-cases/addresses";

export async function createAddressAction(
  state: AddressForm,
  formData: FormData
) {
  return await createAddress(state, formData);
}

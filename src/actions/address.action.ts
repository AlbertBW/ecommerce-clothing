"use server";

import { AddressForm, AddressId } from "@/lib/types";
import { createOrUpdateAddress, deleteAddress } from "@/use-cases/addresses";

export async function createOrUpdateAddressAction(
  state: AddressForm,
  formData: FormData
) {
  return await createOrUpdateAddress(state, formData);
}

export async function deleteAddressAction(addressId: AddressId) {
  await deleteAddress(addressId);
}

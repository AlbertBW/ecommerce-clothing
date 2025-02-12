import { auth } from "@/auth";
import {
  insertAddress,
  selectAddressById,
  selectUserAddresses,
  updateAddress,
} from "@/data-access/addresses.access";
import { Address, addressInsertSchema, NewAddress } from "@/db/schema";
import { AddressForm } from "@/lib/types";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function getCheckoutAddresses() {
  const session = await auth();

  if (!session || !session.user.id) {
    return { addresses: null };
  }

  const addresses = await selectUserAddresses(session.user.id);

  return { addresses };
}

export async function getAddresses() {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return [];
  }

  return selectUserAddresses(session.user.id);
}

export async function createOrUpdateAddress(
  state: AddressForm,
  formData: FormData
) {
  const session = await auth();

  if (!session || !session.user.id) {
    throw new AuthError("Not authenticated");
  }

  const addressId = formData.get("id") as string | undefined;

  const address: NewAddress = {
    userId: session?.user.id ?? null,
    name: formData.get("name") as string,
    addressLine1: formData.get("address1") as string,
    addressLine2: formData.get("address2") as string,
    city: formData.get("city") as string,
    county: formData.get("county") as string,
    postcode: formData.get("postcode") as string,
    country: formData.get("country") as string,
    phoneNumber: formData.get("phone") as string,
  };

  const validatedAddress = addressInsertSchema.safeParse(address);

  if (!validatedAddress.success) {
    return {
      success: false,
      errors: validatedAddress.error?.flatten().fieldErrors,
      address,
    };
  }

  let newAddress: Address;
  if (addressId) {
    const validatedAddressId = z.string().uuid().parse(addressId);
    newAddress = (
      await updateAddress(validatedAddressId, validatedAddress.data)
    )[0];
  } else {
    newAddress = (await insertAddress(validatedAddress.data))[0];
  }

  revalidatePath("/account/addresses");

  return {
    success: true,
    address: newAddress,
    errors: null,
  };
}

export async function deleteAddress(addressId: string) {
  const session = await auth();

  if (!session || !session.user.id) {
    throw new AuthError("Not authenticated");
  }

  const address = await selectAddressById(addressId);

  if (!address) {
    throw new Error("Address not found");
  }

  await updateAddress(addressId, { ...address, userId: null });

  revalidatePath("/account/addresses");
}

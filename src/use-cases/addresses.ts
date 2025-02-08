import { AddressForm } from "@/app/(store)/checkout/_components/address-form";
import { auth } from "@/auth";
import { selectUserAddresses } from "@/data-access/addresses.access";
import { addressInsertSchema, NewAddress } from "@/db/schema";
import { AuthError } from "next-auth";

export async function getCheckoutAddresses() {
  const session = await auth();

  if (!session || !session.user.id) {
    return { addresses: null };
  }

  const addresses = await selectUserAddresses(session.user.id);

  return { addresses };
}

export async function createAddress(
  state: AddressForm,
  formData: FormData
): Promise<AddressForm> {
  const session = await auth();

  if (!session || !session.user.id) {
    throw new AuthError("User not authenticated");
  }

  const address: NewAddress = {
    userId: session.user.id,
    name: formData.get("name") as string,
    addressLine1: formData.get("address1") as string,
    addressLine2: formData.get("address2") as string,
    city: formData.get("city") as string,
    county: formData.get("county") as string,
    postcode: formData.get("postcode") as string,
    country: formData.get("country") as string,
    phoneNumber: formData.get("phone") as string,
  };

  const validatedFields = addressInsertSchema.safeParse(address);

  if (!validatedFields.success) {
    return {
      data: address,
      errors: validatedFields.error.format(),
    };
  } else {
    return {
      data: validatedFields.data,
      errors: null,
    };
  }
}

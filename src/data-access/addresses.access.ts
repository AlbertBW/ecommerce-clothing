import { db } from "@/db";
import { addresses, NewAddress, UpdatedAddress } from "@/db/schema";
import { AddressId, UserId } from "@/lib/types";
import { eq } from "drizzle-orm";

export async function selectUserAddresses(userId: UserId) {
  return await db.query.addresses.findMany({
    where: eq(addresses.userId, userId),
  });
}

export async function selectAddressById(addressId: AddressId) {
  return await db.query.addresses.findFirst({
    where: eq(addresses.id, addressId),
  });
}

export async function insertAddress(address: NewAddress) {
  return await db.insert(addresses).values(address).returning();
}

export async function updateAddress(
  addressId: AddressId,
  address: UpdatedAddress
) {
  return await db
    .update(addresses)
    .set(address)
    .where(eq(addresses.id, addressId))
    .returning();
}

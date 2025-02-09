import { auth } from "@/auth";
import { selectUserAddresses } from "@/data-access/addresses.access";

export async function getCheckoutAddresses() {
  const session = await auth();

  if (!session || !session.user.id) {
    return { addresses: null };
  }

  const addresses = await selectUserAddresses(session.user.id);

  return { addresses };
}

import { auth } from "@/auth";
import { getAddresses } from "@/use-cases/addresses";
import { notFound } from "next/navigation";
import AddressCard from "./_components/address-card";
import NewAddress from "./_components/new-address";

export default async function AddressesPage() {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return notFound();
  }

  const addresses = await getAddresses();

  return (
    <div className="flex flex-col md:flex-row items-start justify-around w-full max-w-6xl mx-auto">
      <div className="p-4 flex flex-col gap-12 w-full max-w-screen-lg flex-wrap mx-auto">
        <div className="flex flex-row gap-4 items-center justify-between">
          <h1 className="text-xl">Your addresses</h1>
          <NewAddress />
        </div>

        <div className="flex flex-row flex-wrap gap-4 justify-center">
          {addresses.length > 0 ? (
            addresses.map((address) => (
              <AddressCard key={address.id} address={address} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center gap-4">
              <p>You don&apos;t have any addresses yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

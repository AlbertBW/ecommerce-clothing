import { getAllUsersByRole } from "@/use-cases/user";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export default async function AdminCustomerList({
  page,
  search,
}: {
  page: string | undefined;
  search: string | undefined;
}) {
  const customers = await getAllUsersByRole({
    role: "customer",
    page,
    search,
  });

  return (
    <div>
      <div className="flex items-center justify-between border-b py-2 text-sm px-4">
        <div className="flex items-center">
          <div className="ml-2 min-w-20"></div>
          <p className="ml-2 min-w-40 pr-1">Name</p>
          <p className="ml-2 min-w-40 pr-1">Email</p>
          <p className="ml-2 min-w-32">No. of orders</p>
        </div>
      </div>
      {customers.map((customer) => (
        <div
          key={customer.id}
          className="flex items-center justify-between border-b border-zinc-500 py-2 text-sm px-4"
        >
          <div className="flex items-center">
            <div className="ml-2 min-w-20">
              {customer.image ? (
                <Image
                  src={customer.image}
                  alt="Profile Image"
                  width={48}
                  height={48}
                />
              ) : (
                <UserCircleIcon width={48} height={43} />
              )}
            </div>
            <p className="ml-2 w-40 truncate pr-1">{customer.name}</p>
            <p className="ml-2 w-40 truncate pr-1">{customer.email}</p>
            <p className="ml-2 min-w-32 text-center">
              {customer.orders.length}
            </p>
          </div>
          <div>
            <Link
              href={"/admin/customers/" + customer.id}
              className="text-blue-500"
            >
              View
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

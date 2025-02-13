import { auth } from "@/auth";
import { getUserById } from "@/use-cases/user";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

import { notFound } from "next/navigation";

export default async function CustomersPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();

  if (!session) {
    return notFound();
  }

  if (session.user.role !== "admin" && session.user.role !== "owner") {
    return notFound();
  }

  const { id } = await params;

  const customer = await getUserById(id);

  if (!customer) {
    return notFound();
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="border p-8 rounded-lg mt-4 dark:border-zinc-400 border-zinc-300 shadow-md bg-white dark:bg-gray-800">
        <div className="flex flex-col items-center">
          <p className="text-gray-700 dark:text-gray-300">
            UserID: {customer.id}
          </p>
          {customer.image ? (
            <Image
              src={customer.image}
              width={200}
              height={200}
              alt={`${customer?.name}'s profile picture`}
              className="rounded-full pt-4"
            />
          ) : (
            <div className="flex flex-col items-center">
              <UserCircleIcon
                width={220}
                height={220}
                className="text-gray-500 dark:text-gray-400"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No profile picture
              </p>
            </div>
          )}
        </div>
        <div className="p-4 text-center">
          <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {customer.name}
          </p>
          <p className="text-gray-700 dark:text-gray-300">{customer.email}</p>
          <p className="text-gray-700 dark:text-gray-300">
            Role: {customer.role}
          </p>
        </div>
      </div>

      {customer.orders.length > 0 ? (
        <div className="border p-8 rounded-lg mt-4 dark:border-zinc-400 border-zinc-300 shadow-md bg-white dark:bg-gray-800 w-full max-w-4xl">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              5 Most Recent Orders
            </h3>

            <Link
              href={`/admin/orders?search=${customer.id}`}
              className="text-blue-500 hover:underline dark:text-blue-400"
            >
              View all orders
            </Link>
          </div>

          <div className="space-y-4">
            {customer.orders.map((order) => (
              <div
                key={order.id}
                className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border-b dark:border-zinc-400 border-zinc-300 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="flex flex-col justify-between w-full md:flex-row md:items-center md:space-x-4">
                  <p className="flex flex-col text-gray-700 dark:text-gray-300">
                    <span className="font-semibold">Date:</span>{" "}
                    {order.createdAt.toLocaleDateString()}
                  </p>
                  <p className="flex flex-col text-gray-700 dark:text-gray-300">
                    <span className="font-semibold">Order #:</span>{" "}
                    {order.orderNumber}
                  </p>
                  <p className="flex flex-col text-gray-700 dark:text-gray-300">
                    <span className="font-semibold">Items:</span>{" "}
                    {order.orderItems.length}
                  </p>
                  <p className="flex flex-col text-gray-700 dark:text-gray-300">
                    <span className="font-semibold">Status:</span>{" "}
                    {order.status}
                  </p>
                  <p className="flex flex-col text-gray-700 dark:text-gray-300">
                    <span className="font-semibold">Total:</span> £
                    {(order.price / 100).toFixed(2)}
                  </p>
                </div>
                <Link
                  href={`/admin/orders/${order.id}`}
                  className="text-blue-500 hover:underline px-6 dark:text-blue-400 mt-2 md:mt-0"
                >
                  View
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-700 dark:text-gray-300 text-center mt-12">
          This user has no orders
        </p>
      )}
    </div>
  );
}

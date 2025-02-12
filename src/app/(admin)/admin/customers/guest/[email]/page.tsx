import BackButton from "@/app/_components/back-button";
import { auth } from "@/auth";
import { getGuestOrders } from "@/use-cases/orders";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function GuestPage({
  params,
}: {
  params: Promise<{ email: string }>;
}) {
  const session = await auth();
  const { email } = await params;

  if (!session) {
    return notFound();
  }

  if (session.user.role !== "admin" && session.user.role !== "owner") {
    return notFound();
  }

  const guestOrders = await getGuestOrders(email);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl flex justify-center items-center flex-col">
        <div className="flex flex-row items-center justify-between w-full px-4 my-4">
          <BackButton />
          <h2 className="sm:text-lg font-bold absolute left-1/2 transform -translate-x-1/2">
            Orders using email: {guestOrders[0].email}
          </h2>
        </div>

        <div className="mt-6 p-4 rounded-lg shadow-sm">
          <h3>Orders</h3>

          {guestOrders.map((order) => (
            <div
              key={order.id}
              className="mt-6 p-4 rounded-lg shadow-sm border"
            >
              <div className="space-y-1">
                <div>
                  <div className="flex justify-between">
                    <h3 className="text-lg font-semibold mb-3">
                      Order #{order.orderNumber}
                    </h3>
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="text-blue-500"
                    >
                      View order
                    </Link>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <p>Order Number: {order.orderNumber}</p>
                      <p>Order Date: {order.createdAt.toLocaleString()}</p>
                      <p>Status: {order.status}</p>
                    </div>
                    <div>
                      <p>Price: £{(order.price / 100).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

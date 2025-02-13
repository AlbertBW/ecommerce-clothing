import { PRODUCTS_PER_PAGE_ADMIN } from "@/lib/constants";
import { getAllOrders } from "@/use-cases/orders";
import Link from "next/link";

export default async function AdminOrderList({
  page,
  status,
  sortBy,
  search,
}: {
  page: string | undefined;
  status: string | undefined;
  sortBy: string | undefined;
  search: string | undefined;
}) {
  const orders = await getAllOrders({
    status,
    sortBy,
    search,
    page,
    productsPerPage: PRODUCTS_PER_PAGE_ADMIN,
  });

  if (orders.length === 0) {
    return (
      <div className="pt-0 min-h-[calc(100vh-12rem)] max-h-[calc(100vh-12rem)] mt-2 px-1 md:px-0 md:ml-4 mx-1 sm:mx-4 ">
        <div className="text-center text-lg font-light flex justify-center items-center w-full h-full">
          No orders found
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between border-b py-2 text-sm px-4">
        <div className="flex items-center">
          <div className="ml-2 min-w-32">Order Number</div>
          <p className="ml-2 min-w-52">Email</p>
          <p className="ml-2 min-w-24">Price</p>
          <p className="ml-2 min-w-40">Status</p>
          <p>Order Date</p>
        </div>
      </div>
      {orders.map((order) => (
        <div
          key={order.id}
          className="flex items-center justify-between border-b border-zinc-500 py-2 text-sm px-4"
        >
          <div className="flex items-center">
            <div className="ml-2 min-w-32">
              <Link href={`/admin/orders/${order.id}`}>
                #{order.orderNumber}
              </Link>
            </div>
            <div className="ml-2 min-w-52">
              {order.email === "deleted" ? (
                "Deleted"
              ) : (
                <Link
                  href={`/admin/customers/${
                    order.userId ?? "guest/" + order.email
                  }`}
                  className="text-blue-500"
                >
                  {order.email}
                </Link>
              )}
            </div>
            <p className="ml-2 min-w-24">£{(order.price / 100).toFixed(2)}</p>
            <p className="ml-2 min-w-40">{order.status}</p>
            <p>{order.createdAt.toLocaleString()}</p>
          </div>
          <div>
            <Link href={"/admin/orders/" + order.id} className="text-blue-500">
              View
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

import { auth } from "@/auth";
import { getOrders } from "@/use-cases/orders";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import tshirt from "../../../../../public/t-shirt-white.jpeg";
import { SearchParams } from "@/lib/types";

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { page } = await searchParams;
  const pageNumber = parseInt(page as string, 10);
  const session = await auth();

  if (!session || pageNumber < 1) {
    return notFound();
  }

  const orders = await getOrders(pageNumber);
  return (
    <div className="mx-auto max-w-screen-xl">
      <h3>Your Orders</h3>
      {orders.length == 0 && (
        <div className=" my-4 dark:bg-zinc-900 w-fit mx-auto p-4">
          <p>No orders found</p>
        </div>
      )}
      {orders.map((order) => (
        <div className="w-full my-4 " key={order.id}>
          <section className="flex flex-row border-t-2 border-x-2 dark:border-white text-sm border-black p-4 justify-between items-center rounded-t-md dark:bg-slate-800 bg-slate-300">
            <div className="hidden sm:block">
              <div>Order Date</div>
              <div>{order.createdAt.toLocaleDateString()}</div>
            </div>
            <div className="flex gap-6">
              <div className="hidden md:block">
                <div>Subtotal</div>
                <div>£{(order.price / 100).toFixed(2)}</div>
              </div>
              <div className="hidden md:block">
                <div className="capitalize">
                  Delivery ({order.shippingMethod})
                </div>
                <div>£{(order.shippingPrice / 100).toFixed(2)}</div>
              </div>
              <div className="mr-4 md:mr-0">
                <div>Total Price</div>
                <div>
                  £{((order.price + order.shippingPrice) / 100).toFixed(2)}
                </div>
              </div>
            </div>
            <div>
              <div className="hidden sm:block">Order #{order.orderNumber}</div>
              <div
                className={`${
                  order.status == "paid"
                    ? "text-green-500"
                    : order.status == "unpaid"
                    ? "text-red-500"
                    : order.status == "fulfilled"
                    ? "text-green-500"
                    : ""
                }`}
              >
                Status: {order.status}
              </div>
            </div>
            <div className="text-center">
              <Link
                href={`/account/orders/${order.id}`}
                className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 sm:py-2 sm:px-4 rounded"
              >
                View Order
              </Link>
            </div>
          </section>
          <section className="flex flex-col dark:bg-zinc-950 dark:border-white border-black border-x-2 border-b-2 rounded-b-md p-4">
            {order.orderItems.map((item) => (
              <div key={item.productVariantId} className="flex flex-row my-2">
                <Image
                  src={tshirt}
                  alt={"Product image"}
                  width={100}
                  height={100}
                />
                <div className="flex flex-col m-2 gap-2 capitalize">
                  <p>{item.productVariant.product.brand.name}</p>
                  <Link
                    className="font-medium text-blue-600 dark:text-blue-500  hover:underline"
                    href={`/product/${item.productVariant.id}`}
                  >
                    <p>{item.productVariant.product.name}</p>
                  </Link>
                  <div>
                    Price at purchase: £{(item.productPrice / 100).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>
      ))}
      {/* {totalPages > 1 && <OrdersPagination totalPages={totalPages} />} */}
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { getOrderById } from "@/use-cases/orders";
import { notFound } from "next/navigation";
import tshirt from "../../../../../../public/t-shirt-white.jpeg";
import CancelOrder from "./_components/cancel-order";

export default async function OrderId({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const order = await getOrderById(id);

  if (!order) {
    return notFound();
  }

  const expectedDeliveryDate = new Date(
    order.createdAt.getTime() + 3 * 24 * 60 * 60 * 1000
  );

  return (
    <div className="flex flex-col max-w-screen-lg w-full mx-auto min-h-main">
      <div className="mt-6">
        <Link
          href="/account/orders"
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline flex gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          Back to orders
        </Link>
      </div>
      <section className="mt-4">
        <h1 className="font-bold text-base">Order #{order.orderNumber}</h1>
        <div className="flex gap-1 mb-4 md:mb-0">
          <p>Order Date: {order.createdAt.toDateString()}</p>
        </div>
        <div className="w-full" key={order.id}>
          <section className="flex flex-col md:flex-row border-2 border-slate-700 text-sm p-4 pb-8 justify-between items-start rounded-t-md gap-1 md:gap-0 dark:bg-slate-800 bg-zinc-300">
            <div className="flex flex-col w-full md:w-auto border-b mb-2 pb-2 md:border-0 md:pb-0 md:mb-2">
              <h3 className="font-bold text-base">Delivery Address</h3>
              <div>
                <p>{order.deliveryAddress.addressLine1}</p>
                <p>{order.deliveryAddress.addressLine2}</p>
                <p>{order.deliveryAddress.city}</p>
                <p>{order.deliveryAddress.country}</p>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-base">Subtotal</h3>
              <p>£{(order.price / 100).toFixed(2)}</p>
              <p className="capitalize">Delivery ({order.shippingMethod})</p>
              <p>£{(order.shippingPrice / 100).toFixed(2)}</p>
            </div>
            <div className="w-full md:w-auto border-b mb-2 pb-2 md:border-0 md:pb-0 md:mb-2">
              <h3 className="font-bold text-base">Total Price</h3>
              <p>£{((order.price + order.shippingPrice) / 100).toFixed(2)}</p>
              <p
                className={`${
                  order.status == "paid"
                    ? "text-green-500"
                    : order.status == "unpaid"
                    ? "text-red-500"
                    : order.status == "delivered"
                    ? "text-green-500"
                    : ""
                }`}
              >
                Status: {order.status}
              </p>
              {order.status === "paid" && (
                <p>Delivery by: {expectedDeliveryDate.toDateString()}</p>
              )}
            </div>
            <div className="text-center">
              {order.status === "paid" && <CancelOrder orderId={order.id} />}
              {/* {order.status === "shipped" &&
                originalOrderShipment &&
                originalOrderShipment.estimatedDeliveryDate <
                  oneMonthAfterDelivery && (
                  <div className="">
                    <p className="mb-2">
                      Return by {oneMonthAfterDelivery.toLocaleDateString()}
                    </p>
                    <ReturnOrder orderId={order.id} />
                  </div>
                )} */}

              {order.status === "returned" && (
                <div className="text-red-500">Returned</div>
              )}
            </div>
          </section>
          <section className="flex flex-col dark:bg-zinc-950 border-x-2 border-b-2 border-slate-700 p-4">
            {order.orderItems.map((item) => (
              <div key={item.productVariantId} className="flex flex-row my-2">
                <Image
                  src={tshirt}
                  alt={"Product image"}
                  width={120}
                  height={120}
                />
                <div className="flex flex-col m-2">
                  <div className="capitalize dark:text-zinc-200">
                    {item.productVariant.product.brand.name}
                  </div>
                  <Link
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    href={`/product/${item.productVariant.id}`}
                  >
                    {item.productVariant.product.name}
                  </Link>
                  <div className="dark:text-zinc-500 text-zinc-600">
                    Price at purchase: £{(item.productPrice / 100).toFixed(2)}
                  </div>
                  <div className="dark:text-zinc-300 text-zinc-700">
                    Quantity: {item.quantity}
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>
      </section>
    </div>
  );
}

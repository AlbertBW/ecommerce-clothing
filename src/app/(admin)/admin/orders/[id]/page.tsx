import BackButton from "@/app/_components/back-button";
import { auth } from "@/auth";
import { getOrderById } from "@/use-cases/orders";
import Link from "next/link";
import { notFound } from "next/navigation";
import OrderFulfill from "./_components/order-fulfill";
import OrderReturn from "./_components/order-return";
import OrderCancel from "./_components/order-cancel";

export default async function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();

  if (!session) notFound();

  if (session.user.role !== "admin" && session.user.role !== "owner") {
    notFound();
  }

  const { id } = await params;

  const order = await getOrderById(id);

  if (!order) notFound();

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl flex justify-center items-center flex-col">
        <div className="flex flex-row items-center justify-between w-full px-4 my-4">
          <BackButton />
          <h2 className="sm:text-lg font-bold absolute left-1/2 transform -translate-x-1/2">
            Order #{order.orderNumber}
          </h2>
          {order.status === "paid" && <OrderCancel orderId={order.id} />}
        </div>

        <div className="pt-4 text-xl font-semibold">
          {order.status === "paid" ? (
            <h3 className="text-orange-600">Waiting to be dispatched</h3>
          ) : order.status === "fulfilled" ? (
            <h3 className="text-green-600">Order Fulfilled</h3>
          ) : order.status === "unpaid" ? (
            <h3 className="text-red-600">Incomplete (unpaid)</h3>
          ) : order.status === "cancelled" ? (
            <h3 className="text-red-600">Order Cancelled</h3>
          ) : order.status === "return requested" ? (
            <h3 className="text-orange-600">
              Return Requested (Awaiting return)
            </h3>
          ) : order.status === "returned" ? (
            <h3 className="text-green-600">Order Returned</h3>
          ) : null}
        </div>

        <div className="mt-6 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-3">Order Details</h3>
          <div className="space-y-1">
            <p className="flex">
              <span className="w-40 font-medium">Customer:</span>
              <span>
                <Link
                  href={`/admin/customers/${order.user?.id ?? order.email}`}
                >
                  {order.email}
                </Link>
              </span>
            </p>
            <p className="flex">
              <span className="w-40 font-medium">Status:</span>
              <span>{order.status}</span>
            </p>
            <p className="flex">
              <span className="w-40 font-medium">Price:</span>
              <span>£{(order.price / 100).toFixed(2)}</span>
            </p>
            <p className="flex">
              <span className="w-40 font-medium">Shipping Method:</span>
              <span>{order.shippingMethod}</span>
            </p>
            <p className="flex">
              <span className="w-40 font-medium">Shipping Price:</span>
              <span>£{(order.shippingPrice / 100).toFixed(2)}</span>
            </p>
            <p className="flex">
              <span className="w-40 font-medium">Total Price:</span>
              <span>
                £{((order.price + order.shippingPrice) / 100).toFixed(2)}
              </span>
            </p>
            <p className="flex">
              <span className="w-40 font-medium">Order created:</span>
              <span>{order.createdAt.toLocaleString()}</span>
            </p>
            <p className="flex">
              <span className="w-40 font-medium">Updated at:</span>
              <span>{order.updatedAt.toLocaleString()}</span>
            </p>
            <p className="flex">
              <span className="w-40 font-medium">Customer note:</span>
              <span>{order.customerNote ?? "None"}</span>
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-3">Delivery Address</h3>
          <div className="space-y-1">
            <p className="flex">
              <span className="w-40 font-medium">Name:</span>
              <span>{order.deliveryAddress.name}</span>
            </p>
            <p className="flex">
              <span className="w-40 font-medium">Address Line 1:</span>
              <span>{order.deliveryAddress.addressLine1}</span>
            </p>
            <p className="flex">
              <span className="w-40 font-medium">Address Line 2:</span>
              <span>{order.deliveryAddress.addressLine2}</span>
            </p>
            <p className="flex">
              <span className="w-40 font-medium">City:</span>
              <span>{order.deliveryAddress.city}</span>
            </p>
            <p className="flex">
              <span className="w-40 font-medium">Postcode:</span>
              <span>{order.deliveryAddress.postcode}</span>
            </p>
            <p className="flex">
              <span className="w-40 font-medium">Country:</span>
              <span>{order.deliveryAddress.country}</span>
            </p>
            <p className="flex">
              <span className="w-40 font-medium">Phone:</span>
              <span>{order.deliveryAddress.phoneNumber}</span>
            </p>
          </div>
        </div>

        {order.shipments.length > 0 ? (
          <div className="mt-6 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-3">Shipments</h3>
            {order.shipments.map((shipment) => (
              <div key={shipment.id}>
                <div className="space-y-1">
                  <p className="flex">
                    <span className="w-40 font-medium">Shipment ID:</span>
                    <span>{shipment.id}</span>
                  </p>
                  <p className="flex">
                    <span className="w-40 font-medium">Courier:</span>
                    <span>{shipment.carrier}</span>
                  </p>
                  <p className="flex">
                    <span className="w-40 font-medium">Service:</span>
                    <span>{shipment.shippingMethod}</span>
                  </p>
                  <p className="flex">
                    <span className="w-40 font-medium">Tracking Number:</span>
                    <span>{shipment.trackingNumber}</span>
                  </p>
                  <p className="flex">
                    <span className="w-40 font-medium">Status:</span>
                    <span>{shipment.status}</span>
                  </p>
                  <p className="flex">
                    <span className="w-40 font-medium">Created at:</span>
                    <span>{shipment.createdAt.toLocaleString()}</span>
                  </p>
                  <p className="flex">
                    <span className="w-40 font-medium">Updated at:</span>
                    <span>{shipment.updatedAt.toLocaleString()}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <p>Not yet dispatched</p>
          </div>
        )}

        <div className="pt-4 text-xl font-semibold">
          {order.status === "paid" ? (
            <OrderFulfill order={order} />
          ) : order.status === "return requested" ? (
            <OrderReturn order={order} />
          ) : null}
        </div>

        <div className="mt-6 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-3">Order Items</h3>

          <div>
            <div>
              <div className="flex flex-row items-center justify-between border-b border-zinc-500 py-2 text-sm">
                <div className="flex items-center">
                  <p className="ml-2 w-40 text-sm">SKU</p>
                  <p className="ml-2 min-w-24">Colour</p>
                  <p className="ml-2 min-w-24">Size</p>
                  <p className="ml-2 min-w-24">Quantity</p>
                  <p className="ml-2 min-w-24">Price</p>
                  <p className="ml-2 min-w-24">Total Price</p>
                </div>
                <div></div>
              </div>
            </div>
            {order.orderItems.map((item) => (
              <div key={item.productVariantId}>
                <div className="flex flex-row items-center justify-between border-b border-zinc-500 py-2 text-sm">
                  <div className="flex items-center">
                    <Link
                      href={`/admin/products/${item.productVariant.product.id}`}
                      className="ml-2 w-40 text-sm"
                    >
                      {item.productVariant.sku}
                    </Link>
                    <p className="ml-2 min-w-24">
                      {item.productVariant.colour?.name}
                    </p>
                    <p className="ml-2 min-w-24">
                      {item.productVariant.size?.name}
                    </p>
                    <p className="ml-2 min-w-24">{item.quantity}</p>
                    <p className="ml-2 min-w-24">
                      £{(item.productVariant.price / 100).toFixed(2)}
                    </p>
                    <p className="ml-2 min-w-24">
                      £
                      {(
                        (item.productVariant.price * item.quantity) /
                        100
                      ).toFixed(2)}
                    </p>
                  </div>
                  <div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

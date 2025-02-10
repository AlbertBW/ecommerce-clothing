import { auth } from "@/auth";
import { getSuccessfulOrder } from "@/use-cases/orders";
import { notFound } from "next/navigation";
import Link from "next/link";
import PdfDownload from "./_components/pdfDownload";
import Image from "next/image";
import tshirt from "../../../../../public/t-shirt-white.jpeg";
import ClearCartForm from "./_components/clear-cart-form";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { session_id } = await searchParams;
  if (!session_id || typeof session_id !== "string") notFound();
  const session = await auth();

  const order = await getSuccessfulOrder(session_id);

  return (
    <div
      id="pdf-content"
      className="flex flex-col items-center min-h-[calc(100vh-190px)] rounded-lg max-w-screen-lg mx-auto"
    >
      <ClearCartForm />
      <div className="p-8 flex flex-col justify-center items-center w-full">
        <h3 className="text-2xl font-bold mb-4">Thank you for your order!</h3>
        <div className="flex md:flex-row flex-col border rounded-lg p-1 md:w-2/3 justify-between">
          <div className="dark:bg-zinc-800 rounded-lg bg-zinc-400 p-2 md:w-1/2 text-sm">
            <div className="flex justify-between">
              <p className="text-base font-semibold">
                Order: #{order.orderNumber}
              </p>
            </div>
            <div>
              <p>Order Date: {order.createdAt.toLocaleDateString("en-GB")}</p>
            </div>
            <div className="flex justify-between">
              <p>Subtotal: </p>
              <p>£{order.price / 100}</p>
            </div>
            <div className="flex justify-between">
              <p>Shipping: ({order.shippingMethod})</p>{" "}
              <p>£{order.shippingPrice / 100}</p>
            </div>
            <div className="flex justify-between">
              <p>Total:</p>
              <p>£{(order.price + order.shippingPrice) / 100}</p>
            </div>
          </div>
          <div className="flex md:w-1/2 text-sm">
            <div className="p-2 w-full">
              <h4 className="font-semibold text-base">Delivery Address</h4>
              <p>{order.deliveryAddress.addressLine1}</p>
              <p>{order.deliveryAddress.addressLine2}</p>
              <p>{order.deliveryAddress.city}</p>
              <p>{order.deliveryAddress.county}</p>
              <p>{order.deliveryAddress.postcode}</p>
              <p>{order.deliveryAddress.country}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-wrap justify-center md:w-1/2 m-2">
        {order.orderItems.map((item) => (
          <div
            key={item.productVariantId}
            className="m-1 p-1 bg-white dark:bg-zinc-900 w-full rounded-lg shadow-md"
          >
            <div className="flex flex-row w-full">
              <Image
                src={tshirt}
                alt={item.productVariant?.product?.name || ""}
                width={100}
                height={100}
                className="object-contain"
              />
              <div className="flex flex-col ml-4 capitalize w-full">
                <Link
                  href={`/product/${item.productVariant.product.id}`}
                  className="font-semibold"
                >
                  {item.productVariant?.product?.name?.length > 15
                    ? `${item.productVariant.product.name.slice(0, 15)}...`
                    : item.productVariant.product.name}
                </Link>
                <div className="text-gray-500 dark:text-gray-400">
                  {item.productVariant.product.brand.name}
                </div>
                <div className="text-gray-700 dark:text-gray-400">
                  £{item.productPrice / 100}
                </div>
                <div className="text-gray-700 dark:text-gray-400">
                  Quantity: {item.quantity}
                </div>
              </div>
            </div>
          </div>
        ))}
        {session?.user ? (
          <div className="flex justify-center gap-4 p-4 no-print">
            <Link
              className="text-blue-600 hover:underline"
              href={`/account/orders/${order.id}`}
            >
              View in your orders
            </Link>
            |
            <Link
              className="text-blue-600 hover:underline"
              href={`/account/orders`}
            >
              Go to your orders
            </Link>
          </div>
        ) : (
          <div className="flex justify-center gap-4 p-4 no-print">
            Register or login to view your orders
          </div>
        )}
        <div className="mx-auto no-print">
          <PdfDownload />
        </div>
      </div>
    </div>
  );
}

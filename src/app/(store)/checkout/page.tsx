import BackButton from "@/app/_components/back-button";
import { getCartItems } from "@/use-cases/carts";
import Image from "next/image";
import Link from "next/link";
import tshirt from "../../../../public/t-shirt-white.jpeg";
import { auth } from "@/auth";
import AddOutOfStockToWishlistForm from "../cart/_components/out-of-stock-form";
import UpdateCart from "../cart/_components/update-cart";
import { redirect } from "next/navigation";
import { getCheckoutAddresses } from "@/use-cases/addresses";
import CheckoutForm from "./_components/checkout-form";

export default async function CheckoutPage() {
  const session = await auth();
  const { products, count, cart, outOfStockProducts } = await getCartItems();
  const { addresses } = await getCheckoutAddresses();

  if (products.length === 0) redirect("/cart");

  const outOfStockIds = outOfStockProducts.map((item) => item.id);

  const totalPrice = products.reduce((acc, item) => {
    const quantity = cart.find(
      (cartItem) => cartItem.productVariantId === item.id
    )?.quantity;
    return acc + item.price * (quantity || 0);
  }, 0);

  return (
    <div>
      {count > 0 && (
        <div className="max-w-screen-2xl mx-auto">
          <div>
            <div className="grid grid-cols-3 pt-4 pb-2 justify-between items-center mx-2 md:mx-12">
              <div className="text-sm md:text-base">
                <BackButton />
              </div>
              <p className="text-center md:text-xl w-fit mx-auto">
                Checkout {!session && " as guest"}
              </p>
            </div>

            {/* For products in cart that have gone out of stock */}
            {outOfStockProducts.length > 0 && (
              <section className="flex flex-col mb-4 rounded-lg md:border-2 border-red-500 md:p-4 md:dark:bg-zinc-900 md:bg-zinc-200">
                <p className="font-semibold text-lg text-center my-1">
                  These products are out of stock,
                  {session && " move to wishlist or "}remove from cart to
                  continue
                </p>
                {outOfStockProducts.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between dark:bg-black bg-white my-1 md:m-1 md:px-5 md:p-3 rounded-lg"
                  >
                    <div className="w-full">
                      <div className="flex flex-row w-full">
                        <Image src={tshirt} alt={""} width={100} height={100} />

                        <div className="flex flex-col ml-2 capitalize">
                          <Link
                            className="font-semibold text-blue-600 dark:text-blue-500 hover:underline"
                            href={`/`}
                          >
                            {item.product.name}
                          </Link>
                          <div className="text-zinc-500 text-sm dark:text-zinc-400">
                            {item.product.brand.name}
                          </div>
                          <div className="text-zinc-500 text-sm dark:text-zinc-400">
                            {item.colour?.name} - {item.size?.name}
                          </div>
                          <div className="text-zinc-700 text-sm dark:text-zinc-400">
                            Price: £{(item.price / 100).toFixed(2)}
                          </div>
                          <div>
                            {item.stock > 10 ? (
                              <p className="text-green-600 text-sm">In stock</p>
                            ) : item.stock < 1 ? (
                              <p className="text-red-600 text-sm">
                                Out of stock
                              </p>
                            ) : (
                              <p className="text-yellow-500 text-sm">
                                Low stock
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex justify-around mt-2">
                  {session && (
                    <AddOutOfStockToWishlistForm
                      outOfStockIds={outOfStockIds}
                    />
                  )}
                  {count > 0 && outOfStockProducts.length > 0 && (
                    <UpdateCart productVariantIds={outOfStockIds} />
                  )}
                </div>
              </section>
            )}

            {/* For products in cart that are in stock */}
            {count > 0 && (
              <div className="flex md:flex-row flex-col">
                <section className="flex flex-col md:p-1 w-full md:w-1/2">
                  <h4 className="font-semibold my-2">Products</h4>
                  {products.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between dark:bg-zinc-900 bg-zinc-100 p-2"
                    >
                      <div>
                        <div className="flex flex-row">
                          <Image
                            src={tshirt}
                            alt={"Product image"}
                            width={110}
                            height={0}
                          />

                          <div className="flex flex-col ml-2 capitalize">
                            <Link
                              className="font-semibold text-blue-600 dark:text-blue-500 hover:underline"
                              href={`/`}
                            >
                              {item.product.name}
                            </Link>
                            <div className="text-zinc-500 text-sm dark:text-zinc-400">
                              {item.product.brand.name}
                            </div>
                            <div className="text-zinc-500 text-sm dark:text-zinc-400">
                              {item.colour?.name} - {item.size?.name}
                            </div>
                            <div className="text-zinc-700 text-sm dark:text-zinc-400">
                              £{(item.price / 100).toFixed(2)}
                            </div>
                            <div>
                              {item.stock > 10 ? (
                                <p className="text-green-600 text-sm">
                                  In stock
                                </p>
                              ) : item.stock < 1 ? (
                                <p className="text-red-600 text-sm">
                                  Out of stock
                                </p>
                              ) : (
                                <p className="text-yellow-500 text-sm">
                                  Low stock
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex md:gap-4 gap-6 justify-end items-center">
                        <div className="flex sm:flex-row flex-col justify-end gap-2 mr-2 md:mr-0 items-center transition-colors">
                          <p className="w-16">
                            Qty:{" "}
                            {cart.find(
                              (cartItem) =>
                                cartItem.productVariantId === item.id
                            )?.quantity || 0}
                          </p>
                          <div className="md:w-16 justify-end flex">
                            £
                            {(
                              (item.price *
                                (cart.find(
                                  (cartItem) =>
                                    cartItem.productVariantId === item.id
                                )?.quantity || 0)) /
                              100
                            ).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </section>
                <section className="md:w-1/2 p-4">
                  <h4 className="font-semibold my-2">Shipping Address</h4>

                  <CheckoutForm addresses={addresses} price={totalPrice} />
                  <div className="flex justify-end items-center m-6">
                    {count > 0 && outOfStockProducts.length > 0 && (
                      <UpdateCart productVariantIds={outOfStockIds} />
                    )}
                  </div>
                </section>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

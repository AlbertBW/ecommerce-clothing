import BackButton from "@/app/_components/back-button";
import { getCartItems } from "@/use-cases/carts";
import Image from "next/image";
import Link from "next/link";
import tshirt from "../../../../public/t-shirt-white.jpeg";
import { clearCartAction } from "@/actions/cart.action";
import { SubmitButton } from "@/app/_components/_buttons/submit-button";
import MoveToWishlist from "./_components/move-to-wishlist";
import { auth } from "@/auth";
import DeleteButtonForm from "./_components/delete-button";
import QuantitySelect from "./_components/quantity-select";

export default async function CartPage() {
  const session = await auth();
  const { products, count, cart } = await getCartItems();

  const totalPrice = products.reduce((acc, item) => {
    const quantity = cart.find(
      (cartItem) => cartItem.productVariantId === item.id
    )?.quantity;
    return acc + item.price * (quantity || 0);
  }, 0);

  return (
    <div>
      {count > 0 ? (
        <div className="max-w-screen-md mx-auto">
          <div>
            <div className="grid grid-cols-3 pt-4 pb-2 justify-between items-center mx-2 md:mx-12">
              <div className="text-sm md:text-base">
                <BackButton />
              </div>
              <h1 className="text-center md:text-2xl font-bold w-fit mx-auto">
                Your Cart {count == 0 && " is Empty"}
              </h1>
              <form
                action={clearCartAction}
                className="w-fit ml-auto mr-4 md:mr-0 text-sm md:text-base"
              >
                <SubmitButton text="Clear Cart" pendingText="clearing" />
              </form>
            </div>

            {/* For products in cart that have gone out of stock */}
            {/* {outOfStockProducts.length > 0 && (
              <section className="flex flex-col mb-4 rounded-lg md:border-2 border-red-500 md:p-4 md:dark:bg-zinc-900 md:bg-zinc-200">
                <h1 className="font-semibold text-lg text-center my-1">
                  These products are out of stock and have been removed from
                  your cart
                </h1>
                {outOfStockProducts.map((item, index) => {
                  const image = images.find(
                    (image) => image.name === item.productColour.image
                  );
                  return (
                    <div
                      key={item.id}
                      className="flex justify-between dark:bg-black bg-white my-1 md:m-1 md:px-5 md:p-3 rounded-lg"
                    >
                      <div className="w-full">
                        <div className="flex flex-row w-full">
                          <Image
                            src={image?.image || tshirt}
                            alt={""}
                            width={100}
                            height={100}
                          />

                          <div className="flex flex-col ml-2 capitalize">
                            <Link
                              href={`/${
                                item.productColour.product.gender
                              }/product/${item.productNumber.slice(0, -6)}`}
                              className="font-semibold text-blue-600 dark:text-blue-500 hover:underline"
                            >
                              {item.productColour.product.name}
                            </Link>
                            <div className="text-zinc-500 text-sm dark:text-zinc-400">
                              {item.productColour.product.brand}
                            </div>
                            <div className="text-zinc-500 text-sm dark:text-zinc-400">
                              {item.productColour.colour} - {item.size}
                            </div>
                            <div className="text-zinc-700 text-sm dark:text-zinc-400">
                              Price: {formattedPrice(item.price)}
                            </div>
                            <div>
                              <p className="text-red-600 text-sm">
                                Out of stock
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </section>
            )} */}

            {/* For products in cart that are in stock */}
            {count > 0 && (
              <section className="flex flex-col rounded-lg md:border-2 border-zinc-300 md:p-4 md:dark:bg-zinc-900 md:bg-zinc-200">
                {products.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between dark:bg-black bg-white my-2 md:m-2 md:px-5 md:p-4 rounded-lg"
                  >
                    <div className="w-full">
                      <div className="flex flex-row w-full">
                        <Image
                          src={tshirt}
                          alt={"Product image"}
                          width={100}
                          height={100}
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
                    <div className="flex md:gap-4 gap-6 justify-end items-center">
                      <div className="flex sm:flex-row flex-col justify-end gap-2 mr-2 md:mr-0 items-center transition-colors">
                        <QuantitySelect
                          quantity={
                            cart.find(
                              (cartItem) =>
                                cartItem.productVariantId === item.id
                            )?.quantity || 0
                          }
                          productVariantId={item.id}
                        />
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
                        <div className="flex flex-col justify-center items-center gap-4 ml-2">
                          {session && (
                            <MoveToWishlist productVariantId={item.id} />
                          )}
                          <div>
                            <DeleteButtonForm itemId={item.id} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </section>
            )}
            <div className="flex justify-end items-center m-6">
              <div className="mx-4">
                Total: £{(totalPrice / 100).toFixed(2)}
              </div>

              {count > 0 && (
                <Link
                  href={"/checkout"}
                  className={`bg-blue-500 self-center hover:bg-blue-700 text-white font-bold py-2 md:px-4 px-2 rounded ${
                    false && "pointer-events-none bg-zinc-300"
                  }`}
                >
                  Go to checkout
                </Link>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[calc(100vh-197px)]">
          <div className="my-auto text-xl font-semibold">
            Your cart is empty
          </div>
        </div>
      )}
    </div>
  );
}

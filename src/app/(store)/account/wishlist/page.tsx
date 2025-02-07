import BackButton from "@/app/_components/back-button";
import Image from "next/image";
import Link from "next/link";
import tshirt from "../../../../../public/t-shirt-white.jpeg";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import { getWishlistProductDetails } from "@/use-cases/wishlists";
import AddToCartForm from "./_components/add-to-cart-form";

export default async function WishlistPage() {
  const session = await auth();

  if (!session || !session.user.id) return notFound();

  const { products, count } = await getWishlistProductDetails(session.user.id);

  if (count === 0)
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-197px)]">
        <div className="my-auto text-xl font-semibold">
          Your wishlist is empty
        </div>
      </div>
    );

  return (
    <div className="max-w-screen-md mx-auto">
      <div>
        <div className="grid grid-cols-3 pt-4 pb-2 justify-between items-center mx-2 md:mx-12">
          <div className="text-sm md:text-base">
            <BackButton />
          </div>
          <h1 className="text-center md:text-2xl font-bold w-fit mx-auto">
            Your Wishlist
          </h1>
        </div>

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
                          <p className="text-red-600 text-sm">Out of stock</p>
                        ) : (
                          <p className="text-yellow-500 text-sm">Low stock</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex md:gap-4 gap-6 justify-end items-center w-full">
                  <AddToCartForm productVariantId={item.id} />
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}

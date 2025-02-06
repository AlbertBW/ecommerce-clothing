import Link from "next/link";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import HoverDropdown from "@/app/_components/hover-dropdown";
import DropdownMenu from "./dropdown-menu";

import Image from "next/image";
import tshirt from "../../../../../../public/t-shirt-white.jpeg";
import { getHeaderCartItems } from "@/use-cases/carts";

export default async function ShoppingCart() {
  const { products, count } = await getHeaderCartItems();

  const cartItems = [
    products.map((item) => (
      <div
        key={item.id}
        className="flex justify-between dark:bg-black bg-white md:m-0 md:px-5 md:p-4 rounded-lg"
      >
        <div className="w-full">
          <div className="flex flex-row w-full">
            <div className="w-24 h-24">
              <Image src={tshirt} alt={"Product image"} width={0} height={0} />
            </div>

            <div>
              <Link
                className="font-semibold text-blue-600 dark:text-blue-500 hover:underline"
                href={`/`}
              >
                {item.product.name}
              </Link>
              <div className="text-zinc-500 text-sm dark:text-zinc-400">
                {item.size?.name} {item.colour?.name}
              </div>
            </div>

            <div className="flex flex-col ml-2 capitalize">
              <div className="text-zinc-700 text-sm dark:text-zinc-400">
                £{(item.price / 100).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
    )),
    <p className="text-sm" key={"CartItemCount"}>
      Viewing {count} of 3 items
    </p>,
    <Link href={"/cart"} key={"LinkToCart"}>
      Go to cart
    </Link>,
  ];

  return (
    <HoverDropdown
      trigger={
        <Link href={"/cart"}>
          <ShoppingBagIcon className="size-9 dark:hover:text-zinc-200/70 hover:text-zinc-600/70 transition-colors group-hover:z-10 drop-shadow-lg" />
        </Link>
      }
      dropdown={
        <DropdownMenu
          title="Your Cart"
          listItems={cartItems}
          listClassName="flex flex-col items-center gap-4"
        />
      }
    />
  );
}

import Link from "next/link";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import HoverDropdown from "@/app/_components/hover-dropdown";
import DropdownMenu from "./dropdown-menu";

export default function ShoppingCart() {
  const cartItems = [
    <p key="item1" className="w-64">
      Cart Item
    </p>,
    <p key="item2" className="w-64">
      Cart Item
    </p>,
    <p key="item3" className="w-64">
      Cart Item
    </p>,
    <Link className="hover:opacity-75" key={"cartLink"} href={"/cart"}>
      View cart
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

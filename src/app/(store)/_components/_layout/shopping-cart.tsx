import Link from "next/link";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

export default function ShoppingCart() {
  return (
    <Link href={"/cart"}>
      <ShoppingBagIcon className="size-9 dark:hover:text-white hover:text-zinc-600/70 transition-colors" />
    </Link>
  );
}

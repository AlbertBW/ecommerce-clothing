import Link from "next/link";
import ShoppingBag from "../_icons/shopping-bag";

export default function ShoppingCart() {
  return (
    <div>
      <Link href={"/cart"}>
        <ShoppingBag />
      </Link>
    </div>
  );
}

import { auth } from "@/auth";

import { redirect } from "next/navigation";
import Link from "next/link";
import WishlistHeart from "@/app/_components/_icons/wishlist-heart";

export const accountCategories = [
  { name: "Your Orders", path: "orders" },
  { name: "Your Addresses", path: "addresses" },
  { name: "Manage Account", path: "manage" },
] as const;

export default async function AccountPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const firstName = session?.user?.name?.split(" ")[0];

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-197px)]">
      <h1 className="bold text-2xl capitalize">
        {firstName ? `${firstName}'s Account` : "Your account"}
      </h1>
      <section className="flex flex-col gap-6 pt-24 text-center">
        <Link
          className="flex border-2 rounded-md items-center gap-2 transition-colors delay-0 hover:dark:bg-zinc-900 hover:bg-zinc-200 border-zinc-800 dark:border-zinc-400 justify-center group w-60 h-16"
          href={`/account/wishlist`}
        >
          <WishlistHeart />
          Wishlist
        </Link>
        {accountCategories.map((item, index) => (
          <Link
            className="flex border-2 rounded-md items-center border-zinc-800 transition-colors delay-0 hover:dark:bg-zinc-900 hover:bg-zinc-200 dark:border-zinc-400 justify-center w-60 h-16"
            key={index}
            href={`/account/${item.path}`}
          >
            {item.name}
          </Link>
        ))}
      </section>
    </div>
  );
}

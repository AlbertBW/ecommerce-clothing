import { auth } from "@/auth";

import { redirect } from "next/navigation";
import Link from "next/link";
import WishlistHeart from "@/app/_components/_icons/wishlist-heart";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

const accountCategories = [
  { name: "Your Orders", path: "orders" },
  { name: "Your Addresses", path: "addresses" },
  { name: "Account Details", path: "manage" },
] as const;

export default async function AccountPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-197px)]">
      <div className="border p-8 rounded-lg mt-4 dark:border-zinc-400 border-zinc-300 shadow-md bg-white dark:bg-gray-800">
        <div className="flex flex-col items-center">
          {session.user.image ? (
            <Image
              src={session.user.image}
              width={200}
              height={200}
              alt={`${session.user.name}'s profile picture`}
              className="rounded-full pt-4"
            />
          ) : (
            <div className="flex flex-col items-center">
              <UserCircleIcon
                width={220}
                height={220}
                className="text-gray-500 dark:text-gray-400"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No profile picture
              </p>
            </div>
          )}
        </div>
        <div className="p-4 text-center">
          <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {session.user.name}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            {session.user.email}
          </p>
        </div>
        <section className="flex flex-col gap-6 pt-4 text-center">
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
    </div>
  );
}

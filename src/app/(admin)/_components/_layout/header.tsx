"use client";

import Link from "next/link";
import UserAccount from "./user-account";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const isRoot = pathname === "/admin";
  const isProducts = pathname === "/admin/products";
  const isOrders = pathname === "/admin/orders";
  const isCustomers = pathname === "/admin/customers";

  return (
    <header className="border-b p-2 mx-4 border-zinc-800 text-zinc-400">
      <nav className="flex justify-between text-sm">
        <div className="flex w-full gap-1">
          <Link
            className={`hover:bg-zinc-800 hover:text-white ${
              isRoot && "text-white"
            } p-2 rounded transition-colors`}
            href={"/admin"}
          >
            Overview
          </Link>
          <Link
            className={`hover:bg-zinc-800 hover:text-white ${
              isProducts && "text-white"
            } p-2 rounded transition-colors`}
            href={"/admin/products"}
          >
            Products
          </Link>
          <Link
            className={`hover:bg-zinc-800 hover:text-white ${
              isOrders && "text-white"
            } p-2 rounded transition-colors`}
            href={"/admin/orders"}
          >
            Orders
          </Link>
          <Link
            className={`hover:bg-zinc-800 hover:text-white ${
              isCustomers && "text-white"
            } p-2 rounded transition-colors`}
            href={"/admin/customers"}
          >
            Customers
          </Link>
        </div>
        <Link
          href={"/account"}
          className="w-full flex justify-end items-center"
        >
          <SessionProvider>
            <UserAccount />
          </SessionProvider>
        </Link>
      </nav>
    </header>
  );
}

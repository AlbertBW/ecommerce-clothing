"use client";

import Link from "next/link";
import UserAccount from "./user-account";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const session = useSession();

  const isRoot = pathname === "/admin";
  const isProducts = pathname === "/admin/products";
  const isOrders = pathname === "/admin/orders";
  const isCustomers = pathname === "/admin/customers";
  const isStaff = pathname === "/admin/staff";

  return (
    <header className="border-b p-2 mx-4 border-zinc-800 text-zinc-400">
      <nav className="flex justify-between items-center text-sm">
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
          {session.data?.user.role === "owner" && (
            <Link
              className={`hover:bg-zinc-800 hover:text-white ${
                isStaff && "text-white"
              } p-2 rounded transition-colors`}
              href={"/admin/staff"}
            >
              Staff
            </Link>
          )}
        </div>
        <div className="h-fit flex items-center justify-end">
          <Link
            href={"/"}
            className="w-32 flex items-center justify-center hover:text-white"
          >
            Return to store
          </Link>
          <Link
            href={"/account"}
            className="w-24 flex justify-end items-center"
          >
            <UserAccount />
          </Link>
        </div>
      </nav>
    </header>
  );
}

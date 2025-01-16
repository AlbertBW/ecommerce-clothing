import { COMPANY_NAME } from "@/config";
import Link from "next/link";
import SearchBox from "./_search/search-box";
import ShoppingCart from "./shopping-cart";
import UserAccount from "./user-account";
import { Suspense } from "react";
import { SessionProvider } from "next-auth/react";

export default async function Header() {
  return (
    <header className="flex px-4 md:px-12 lg:px-18 mx-auto justify-between items-center h-16 gap-2">
      <Link href={"/"}>
        <h1 className="font-bold lg:text-2xl">{COMPANY_NAME}</h1>
      </Link>
      <Suspense>
        <SearchBox />
      </Suspense>
      <div className="flex gap-4 md:gap-8 h-full items-center min-w-24">
        <ShoppingCart />
        <SessionProvider>
          <UserAccount />
        </SessionProvider>
      </div>
    </header>
  );
}

import { COMPANY_NAME } from "@/config";
import Link from "next/link";
import SearchBox from "./_search/search-box";
import ShoppingCart from "./shopping-cart";
import UserAccount from "./user-account";
import { auth } from "@/server/auth";
import SignIn from "../../_auth/sign-in";

export default async function Header() {
  const session = await auth();

  return (
    <header className="flex px-4 md:px-12 lg:px-18 mx-auto justify-between items-center h-16 gap-2">
      <Link href={"/"}>
        <h1 className="font-bold lg:text-2xl">{COMPANY_NAME}</h1>
      </Link>
      <SearchBox />
      <div className="flex gap-4 md:gap-8 lg:gap-12 h-full items-center min-w-24">
        <ShoppingCart />
        {session?.user && <UserAccount />}
        {!session?.user && <SignIn />}
      </div>
    </header>
  );
}

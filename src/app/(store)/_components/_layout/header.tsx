import { COMPANY_NAME } from "@/lib/config";
import Link from "next/link";
import SearchBox from "./search-box";
import ShoppingCart from "./shopping-cart";
import UserAccount from "./user-account";
import { auth } from "@/server/auth";
import SignIn from "../_auth/sign-in";

export default async function Header() {
  const session = await auth();

  console.log(session);
  console.log(session?.user);
  return (
    <header className="flex px-24 mx-auto justify-between items-center h-16 gap-2 max-w-screen-[1920px]">
      <Link href={"/"}>
        <h1 className="font-bold text-2xl">{COMPANY_NAME}</h1>
      </Link>
      <SearchBox />
      <div className="flex gap-12 h-full items-center">
        <ShoppingCart />
        {session?.user && <UserAccount />}
        {!session?.user && <SignIn />}
      </div>
    </header>
  );
}

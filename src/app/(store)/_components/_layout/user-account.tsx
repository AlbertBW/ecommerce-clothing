import Link from "next/link";
import UserAvatar from "../_auth/user-avatar";
import HoverDropdown from "@/app/_components/hover-dropdown";
import { SignOut } from "../_auth/sign-out";

export default function UserAccount() {
  return (
    <HoverDropdown
      dropdown={
        <ul className="flex flex-col gap-2 border border-zinc-600 shadow-lg dark:bg-zinc-900 bg-zinc-100 w-52 p-4 text-right rounded-xl">
          <p className="text-left">Albert Wales</p>
          <div className="h-4" />
          <li className="hover:opacity-75">
            <Link href={"/account"}>Your account</Link>
          </li>
          <li className="hover:opacity-75">
            <Link href={"/orders"}>Your Orders</Link>
          </li>
          <li className="hover:opacity-75">
            <Link href={"/account/settings"}>Settings</Link>
          </li>
          <li className="hover:opacity-75">
            <SignOut />
          </li>
        </ul>
      }
    >
      <div className="hover:opacity-80 transition-opacity group flex justify-center items-center">
        <UserAvatar />
      </div>
    </HoverDropdown>
  );
}

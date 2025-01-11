import Link from "next/link";
import UserAvatar from "../_auth/user-avatar";
import HoverDropdown from "@/app/_components/hover-dropdown";
import { SignOut } from "../_auth/sign-out";

export default function UserAccount() {
  return (
    <HoverDropdown dropdown={<UserAccountDropdown />}>
      <div>
        <Link
          href={"/account"}
          className="hover:opacity-80 transition-opacity group"
        >
          <UserAvatar />
        </Link>
      </div>
    </HoverDropdown>
  );
}

function UserAccountDropdown() {
  return (
    <ul className="flex flex-col gap-2 border border-zinc-600 bg-zinc-900 w-52 p-4 text-right rounded-xl">
      <p className="text-left">Albert Wales</p>
      <div className="h-4" />
      <li>
        <Link href={"/account"}>Your account</Link>
      </li>
      <li>
        <Link href={"/orders"}>Your Orders</Link>
      </li>
      <li>
        <Link href={"/account/settings"}>Settings</Link>
      </li>
      <li>
        <SignOut />
      </li>
    </ul>
  );
}

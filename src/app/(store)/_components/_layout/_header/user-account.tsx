import Link from "next/link";
import UserAvatar from "../../_auth/user-avatar";
import HoverDropdown from "@/app/_components/hover-dropdown";
import { SignOut } from "../../_auth/sign-out";
import DropdownMenu from "./dropdown-menu";

export default function UserAccount() {
  const menuItems = [
    <Link key="account" className="hover:opacity-75" href={"/account"}>
      Your account
    </Link>,
    <Link key="orders" className="hover:opacity-75" href={"/orders"}>
      Your Orders
    </Link>,
    <Link
      key="settings"
      className="hover:opacity-75"
      href={"/account/settings"}
    >
      Settings
    </Link>,
    <SignOut key="signout" />,
  ];

  return (
    <HoverDropdown
      trigger={
        <div className="group flex justify-center items-center">
          <div className="relative group-hover:z-10">
            <UserAvatar />
          </div>
        </div>
      }
      dropdown={
        <DropdownMenu
          listClassName="flex flex-col text-right gap-2"
          title="Albert Wales"
          listItems={menuItems}
        />
      }
    />
  );
}

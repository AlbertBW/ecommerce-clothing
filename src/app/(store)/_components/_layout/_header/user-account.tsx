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
      trigger={<UserAvatar />}
      dropdown={
        <DropdownMenu
          title="User's Name"
          listItems={menuItems}
          listClassName="flex flex-col text-right gap-2"
        />
      }
    />
  );
}

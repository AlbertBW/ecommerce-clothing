"use client";
import Link from "next/link";
import UserAvatar, {
  UserAvatarSkeleton,
} from "../../../../_components/_auth/user-avatar";
import HoverDropdown from "@/app/_components/hover-dropdown";
import DropdownMenu from "./dropdown-menu";
import { useSession } from "next-auth/react";
import WishlistHeart from "@/app/_components/_icons/wishlist-heart";

const menuItems = [
  <Link key="account" className="hover:opacity-75" href={"/account"}>
    Your account
  </Link>,
  <Link key="orders" className="hover:opacity-75" href={"/account/orders"}>
    Your Orders
  </Link>,
  <Link
    key="orders"
    className="hover:opacity-75 flex gap-2 justify-end group"
    href={"/account/wishlist"}
  >
    <WishlistHeart />
    Wishlist
  </Link>,
  <Link key="settings" className="hover:opacity-75" href={"/account/settings"}>
    Settings
  </Link>,
  <Link key={"signout"} className="hover:opacity-75" href={"/logout"}>
    Sign Out
  </Link>,
];

export default function UserAccount() {
  const { data: session, status } = useSession();

  if (status === "loading") return <UserAvatarSkeleton />;

  if (status !== "authenticated")
    return (
      <Link href={"/login"} className="text-xs md:text-base">
        Login
      </Link>
    );

  return (
    <HoverDropdown
      trigger={<UserAvatar image={session.user?.image} />}
      dropdown={
        <DropdownMenu
          title={
            `${session.user?.name} ${
              session.user.role === "admin"
                ? "(admin)"
                : session.user.role === "owner"
                ? "(owner)"
                : ""
            }` || "Your account"
          }
          listItems={[
            session.user.role === "admin" ||
              (session.user.role === "owner" && (
                <Link key="admin" className="hover:opacity-75" href={"/admin"}>
                  Admin Dashboard
                </Link>
              )),
            ...menuItems,
          ]}
          listClassName="flex flex-col text-right gap-2"
        />
      }
    />
  );
}

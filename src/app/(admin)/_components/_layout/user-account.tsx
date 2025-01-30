"use client";

import UserAvatar, {
  UserAvatarSkeleton,
} from "@/app/_components/_auth/user-avatar";
import { useSession } from "next-auth/react";
import { notFound } from "next/navigation";

export default function UserAccount() {
  const { data: session, status } = useSession();

  if (status === "loading") return <UserAvatarSkeleton size={30} />;

  if (status !== "authenticated") return notFound();

  return (
    <div className="">
      <UserAvatar image={session.user?.image} size={30} />
    </div>
  );
}

import Image from "next/image";
import { auth } from "@/server/auth";

export default async function UserAvatar() {
  const session = await auth();

  if (!session?.user?.image) return null;

  return (
    <Image
      src={session.user.image}
      alt="User Avatar"
      width={40}
      height={40}
      className="rounded-full border-2"
      priority
    />
  );
}

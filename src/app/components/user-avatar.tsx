import Image from "next/image";
import { auth } from "@/server/auth";

export default async function UserAvatar() {
  const session = await auth();

  if (!session?.user?.image) return null;

  return (
    <div>
      <Image
        src={session.user.image}
        alt="User Avatar"
        width={100}
        height={100}
        className="rounded-full"
        priority
      />
    </div>
  );
}

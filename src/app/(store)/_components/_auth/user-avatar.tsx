import Image from "next/image";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function UserAvatar({ image }: { image?: string | null }) {
  if (!image) return <UserCircleIcon width={43} height={43} />;

  return (
    <div className="w-[43px] h-[43px] flex justify-center items-center">
      <Image
        src={image}
        alt="User Avatar"
        width={40}
        height={40}
        className="rounded-full group-hover:shadow-md shadow-sm border"
      />
    </div>
  );
}

export function UserAvatarSkeleton() {
  return <div className="w-[43px] h-[43px]" />;
}

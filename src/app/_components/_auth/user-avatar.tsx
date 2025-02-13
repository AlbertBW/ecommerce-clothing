import Image from "next/image";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function UserAvatar({
  image,
  size,
}: {
  image?: string | null;
  size?: number;
}) {
  if (!image)
    return (
      <UserCircleIcon
        width={size ? size * 1.2 : 48}
        height={size ? size * 1.075 : 43}
      />
    );

  return (
    <div
      className={`w-[${size ? size * 1.2 : 48}px] h-[${
        size ? size * 1.075 : 43
      }px] flex justify-center items-center`}
    >
      <Image
        src={image}
        alt="User Avatar"
        width={size ?? 40}
        height={size ?? 40}
        className="rounded-full group-hover:shadow-md shadow-sm border"
      />
    </div>
  );
}

export function UserAvatarSkeleton({ size }: { size?: number }) {
  const containerWidth = size ? size * 1.2 : 40;
  const containerHeight = size ? size * 1.075 : 43;

  return (
    <div
      className="bg-gray-200/30 rounded-full animate-pulse"
      style={{
        width: `${containerWidth}px`,
        height: `${containerHeight}px`,
      }}
    />
  );
}

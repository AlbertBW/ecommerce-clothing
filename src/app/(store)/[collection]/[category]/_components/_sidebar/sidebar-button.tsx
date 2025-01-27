"use client";

import useQueryString from "@/hooks/use-query-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SidebarButton({
  filter,
  value,
  text,
}: {
  filter: string;
  value: string;
  text?: string;
}) {
  const createQueryString = useQueryString();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedValue = searchParams.get(filter);

  const handleFilterChange = () => {
    const str = createQueryString({
      [filter]: value,
    });

    router.push(pathname + "?" + str);
  };

  return (
    <button
      className={`${
        selectedValue === value ? "text-blue-500" : "hover:text-blue-400"
      }`}
      onClick={handleFilterChange}
    >
      {text || value}
    </button>
  );
}

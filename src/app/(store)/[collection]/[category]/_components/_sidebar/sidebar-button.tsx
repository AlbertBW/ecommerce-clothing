"use client";

import useQueryString from "@/hooks/use-query-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SidebarButton({
  filter,
  value,
  text,
  paramType = "string",
}: {
  filter: string;
  value: string;
  text?: string;
  paramType?: "string" | "array" | "clear";
}) {
  const {
    createSearchParam,
    createSearchParamArray,
    removeQueryString,
    removeValueFromKey,
  } = useQueryString();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedValues = searchParams.getAll(filter);
  const isSelectedValue = selectedValues.includes(value);

  const handleFilterChange = () => {
    if (paramType === "clear") {
      const str = removeQueryString([filter]);
      router.push(pathname + "?" + str, { scroll: false });
      return;
    }
    if (isSelectedValue === true) {
      const str = removeValueFromKey({ filter, value });

      router.push(pathname + "?" + str, { scroll: false });
      return;
    }

    if (paramType === "array") {
      const str = createSearchParamArray({
        [filter]: [value],
      });

      router.push(pathname + "?" + str, { scroll: false });

      return;
    }

    if (paramType === "string") {
      const str = createSearchParam({
        [filter]: value,
      });

      router.push(pathname + "?" + str, { scroll: false });
    }
  };

  return (
    <button
      className={`${isSelectedValue ? "text-blue-500" : "hover:text-blue-400"}`}
      onClick={handleFilterChange}
    >
      {text || value}
    </button>
  );
}

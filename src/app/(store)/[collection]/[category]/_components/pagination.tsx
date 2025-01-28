"use client";

import useQueryString from "@/hooks/use-query-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Pagination({ totalPages = 1 }: { totalPages: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { createSearchParam } = useQueryString();

  const page = searchParams.get("page") || "1";
  const pageNumber = parseInt(page);

  useEffect(() => {
    if (pageNumber > totalPages) {
      router.replace(
        pathname + "?" + createSearchParam({ page: totalPages.toString() }),
        { scroll: false }
      );
    }
  }, [createSearchParam, pageNumber, pathname, router, totalPages]);

  return (
    <div>
      <div className="w-full flex items-center justify-center">
        <button
          aria-label="Previous"
          disabled={pageNumber === 1}
          onClick={() => {
            router.push(
              pathname +
                "?" +
                createSearchParam({ page: (pageNumber - 1).toString() })
            );
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`size-8 ${
              pageNumber === 1 && "dark:text-zinc-600 text-zinc-300"
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
        <div className="mx-4 w-28 text-center">
          Page {pageNumber} of {totalPages}
        </div>
        <button
          aria-label="Next"
          disabled={pageNumber === totalPages}
          onClick={() => {
            router.push(
              pathname +
                "?" +
                createSearchParam({ page: (pageNumber + 1).toString() })
            );
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`size-8 ${
              pageNumber === totalPages && "dark:text-zinc-600 text-zinc-300"
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

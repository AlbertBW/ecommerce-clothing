"use client";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function useQueryString() {
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (params: Record<string, string>) => {
      const urlParams = new URLSearchParams(searchParams.toString());
      Object.entries(params).forEach(([key, value]) => {
        urlParams.set(key, value);
      });
      return urlParams.toString();
    },
    [searchParams]
  );

  return createQueryString;
}

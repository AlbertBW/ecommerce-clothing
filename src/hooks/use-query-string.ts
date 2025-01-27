import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function useQueryString() {
  const searchParams = useSearchParams();

  const createSearchParam = useCallback(
    (params: Record<string, string>) => {
      const urlParams = new URLSearchParams(searchParams.toString());

      Object.entries(params).forEach(([key, value]) => {
        urlParams.set(key, value);
      });
      return urlParams.toString();
    },
    [searchParams]
  );

  const createSearchParamArray = useCallback(
    (params: Record<string, string[]>) => {
      const urlParams = new URLSearchParams(searchParams.toString());

      Object.entries(params).forEach(([key, values]) => {
        values.forEach((value) => {
          const existingValue = urlParams.get(key);

          if (existingValue) {
            if (!existingValue.includes(value)) {
              urlParams.append(key, value);
            }
          } else {
            urlParams.set(key, value);
          }
        });
      });

      return urlParams.toString();
    },
    [searchParams]
  );

  const removeQueryString = useCallback(
    (params: string[]) => {
      const urlParams = new URLSearchParams(searchParams.toString());

      params.forEach((key) => {
        urlParams.delete(key);
      });

      return urlParams.toString();
    },
    [searchParams]
  );

  const clearQueryByKey = useCallback(
    (key: string) => {
      const urlParams = new URLSearchParams(searchParams.toString());
      urlParams.delete(key);
      return urlParams.toString();
    },
    [searchParams]
  );

  const removeValueFromKey = useCallback(
    ({ filter, value }: { filter: string; value: string }) => {
      const urlParams = new URLSearchParams(searchParams.toString());
      const values = urlParams.getAll(filter);
      const updatedValues = values.filter((v) => v !== value);

      urlParams.delete(filter);

      updatedValues.forEach((v) => {
        urlParams.append(filter, v);
      });

      return urlParams.toString();
    },
    [searchParams]
  );

  return {
    createSearchParam,
    createSearchParamArray,
    removeQueryString,
    clearQueryByKey,
    removeValueFromKey,
  };
}

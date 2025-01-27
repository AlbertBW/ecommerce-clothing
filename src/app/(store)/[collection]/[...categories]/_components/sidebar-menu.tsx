"use client";
import { Category } from "@/db/schema";
import useQueryString from "@/hooks/use-query-string";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function SidebarMenu({
  parentCategoryName,
  collection,
  categories,
  selectedCategory,
}: {
  parentCategoryName: string;
  collection: string;
  categories: Category[];
  selectedCategory: string;
}) {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(210);
  const createQueryString = useQueryString();
  const router = useRouter();
  const pathname = usePathname();

  const handleFilterChange = (filter: string, value: string) => {
    const str = createQueryString({
      [filter]: value,
    });

    router.push(pathname + "?" + str);
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxPrice - 10);
    setMinPrice(value);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minPrice + 10);
    setMaxPrice(value);
  };

  return (
    <nav className="sm:mx-8">
      <div>
        <h4 className="font-bold my-2">{parentCategoryName}</h4>
        <ul className="flex flex-col gap-2 font-light text-sm">
          <li>
            <Link
              className={`${
                selectedCategory === "all"
                  ? "text-blue-500"
                  : "hover:text-blue-400"
              }`}
              href={`/${collection}/${parentCategoryName.toLowerCase()}/all`}
            >
              All
            </Link>
          </li>
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                className={`${
                  selectedCategory === category.slug
                    ? "text-blue-500"
                    : "hover:text-blue-400"
                }`}
                href={`/${collection}/${parentCategoryName.toLowerCase()}/${
                  category.slug
                }`}
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h4 className="font-bold my-2">Colours</h4>
        <ul className="flex flex-col gap-2 font-light text-sm">
          <li>
            <button onClick={() => handleFilterChange("colour", "black")}>
              Black
            </button>
          </li>

          <li>
            <button onClick={() => handleFilterChange("colour", "white")}>
              white
            </button>
          </li>
        </ul>
      </div>

      <div className="mt-6">
        <h4 className="font-bold my-2">Sort by</h4>
        <ul className="flex flex-col gap-2 font-light text-sm">
          <li>
            <button onClick={() => handleFilterChange("sortBy", "popular")}>
              Popular
            </button>
          </li>

          <li>
            <button onClick={() => handleFilterChange("sortBy", "new")}>
              New
            </button>
          </li>

          <li>
            <button onClick={() => handleFilterChange("sortBy", "priceAsc")}>
              Price: Low to High
            </button>
          </li>

          <li>
            <button onClick={() => handleFilterChange("sortBy", "priceDesc")}>
              Price: High to Low
            </button>
          </li>
        </ul>
      </div>

      <div className="mt-6">
        <h4 className="font-bold my-2">Price</h4>
        <div className="flex flex-col gap-2 font-light text-sm">
          <div>
            <div className="flex justify-between mb-4 text-xs">
              <label htmlFor="price-range">
                Price: £{minPrice} - £{maxPrice === 210 ? "200+" : maxPrice}
              </label>
            </div>
            <div className="relative h-2">
              <div className="h-1 bg-gray-200 rounded absolute w-full"></div>
              <input
                type="range"
                className="absolute w-full h-1 bg-transparent pointer-events-none appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-blue-500"
                min="0"
                max="210"
                value={maxPrice}
                step="10"
                onChange={handleMaxPriceChange}
              />
              <input
                type="range"
                className="absolute w-full h-1 bg-transparent pointer-events-none appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-blue-500 z-20"
                min="0"
                max="210"
                value={minPrice}
                step="10"
                onChange={handleMinPriceChange}
              />
            </div>
          </div>
          <div className="mx-auto mt-2">
            <button
              onClick={() =>
                handleFilterChange(
                  "price",
                  `${minPrice}-${maxPrice === 210 ? "max" : maxPrice}`
                )
              }
              className="w-12 h-8 rounded bg-blue-600"
            >
              Go
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

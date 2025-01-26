"use client";
import { Category } from "@/db/schema";
import useQueryString from "@/hooks/use-query-string";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

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
  const createQueryString = useQueryString();
  const router = useRouter();
  const pathname = usePathname();

  const handleFilterChange = (filter: string, value: string) => {
    const str = createQueryString({
      [filter]: value,
    });

    router.push(pathname + "?" + str);
    console.log(pathname);
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
            <button>Popular</button>
          </li>

          <li>
            <button>New</button>
          </li>

          <li>
            <button>Price: Low to High</button>
          </li>

          <li>
            <button>Price: High to Low</button>
          </li>
        </ul>
      </div>

      <div className="mt-6">
        <h4 className="font-bold my-2">Price</h4>
        <ul className="flex flex-col gap-2 font-light text-sm">
          <li>
            <button>Under £20</button>
          </li>

          <li>
            <button>Under £50</button>
          </li>

          <li>
            <button>Under £100</button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

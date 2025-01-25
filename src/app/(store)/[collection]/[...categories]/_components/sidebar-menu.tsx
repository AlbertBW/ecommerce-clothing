import { Category } from "@/db/schema";

import Link from "next/link";

export default async function SidebarMenu({
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
  return (
    <nav className="sticky sm:mx-12">
      <h4 className="underline font-semibold mb-2">{parentCategoryName}</h4>
      <ul className="flex flex-col gap-2">
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
    </nav>
  );
}

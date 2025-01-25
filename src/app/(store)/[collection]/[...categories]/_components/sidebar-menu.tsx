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
      <ul className="flex flex-col gap-2">
        <li>
          <h4 className="underline font-semibold">{parentCategoryName}</h4>
        </li>
        {categories.map((category) => (
          <li key={category.id}>
            <Link
              className={`${
                selectedCategory === category.name.toLowerCase()
                  ? "text-blue-500"
                  : "hover:text-blue-400"
              }`}
              href={`/${collection}/${parentCategoryName}/${category.name.toLowerCase()}`}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

"use client";

import { CollectionGroup } from "@/lib/types";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Fragment } from "react";

export default function CollectionBox({
  collection,
}: {
  collection: CollectionGroup;
}) {
  const params = useParams<{ collection: string; categories: string[] }>();

  const selectedCategory = params.categories ? params.categories[0] : undefined;
  const selectedSubcategory = params.categories
    ? params.categories[1]
    : undefined;

  return (
    <Fragment>
      {collection.categories.map((category) => (
        <div key={category.id} className="flex flex-col sm:w-48 w-full">
          <Link
            href={`/${collection.collection}/${category.slug}`}
            className={`sm:underline dark:hover:text-zinc-400 hover:text-zinc-500 flex justify-center items-center rounded w-full h-16 sm:h-auto hover:bg-zinc-500 sm:hover:bg-transparent  ${
              selectedCategory === category.slug.toLowerCase()
                ? "text-blue-500"
                : ""
            }`}
          >
            {category.name}
          </Link>

          {category.subcategories.map((sub) => (
            <Link
              key={sub.id}
              href={`/${collection.collection}/${category.slug}?category=${sub.slug}`}
              className={`dark:hover:text-zinc-400 hover:text-zinc-500 flex my-1 justify-center items-center rounded border sm:border-0 w-full h-16 sm:h-auto hover:bg-zinc-500 sm:hover:bg-transparent ${
                selectedSubcategory === sub.slug.toLowerCase()
                  ? "text-blue-500"
                  : ""
              }`}
            >
              {sub.name}
            </Link>
          ))}
        </div>
      ))}
    </Fragment>
  );
}

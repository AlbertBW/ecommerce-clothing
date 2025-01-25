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
        <div key={category.id} className="flex flex-col w-48">
          <Link
            href={`/${collection.collection}/${category.slug}/all`}
            className={`underline dark:hover:text-zinc-400 hover:text-zinc-500 ${
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
              href={`/${collection.collection}/${category.slug}/${sub.slug}`}
              className={`dark:hover:text-zinc-400 hover:text-zinc-500 ${
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

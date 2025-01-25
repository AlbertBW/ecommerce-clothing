"use client";

import HoverDropdown from "@/app/_components/hover-dropdown";
import { CollectionGroup } from "@/lib/types";
import Link from "next/link";
import { Fragment, useState } from "react";

export default function CollectionsMenu({
  collections,
}: {
  collections: CollectionGroup[];
}) {
  const [selectedCollection, setSelectedCollection] =
    useState<CollectionGroup>();

  const handleSetCollection = (collection: CollectionGroup | undefined) => {
    setSelectedCollection(collection);
  };

  const menuLinks = (
    <>
      <div className="relative z-30 sm:hidden flex gap-8 md:gap-16">
        {collections.map((c) => (
          <button
            key={c.collection}
            className={`z-20 w-16 p-1 flex sm:hidden justify-center items-center border ${
              selectedCollection?.collection === c.collection
                ? "dark:border-white border-black"
                : "border-transparent"
            }`}
            onMouseEnter={() => handleSetCollection(c)}
          >
            {c.collection.toLocaleUpperCase()}
          </button>
        ))}
      </div>
      <div className="relative z-30 hidden sm:flex gap-8 md:gap-16">
        {collections.map((c) => (
          <Link
            key={c.collection}
            className={`z-20 w-16 p-1 hidden sm:flex justify-center items-center border ${
              selectedCollection?.collection === c.collection
                ? "dark:border-white border-black"
                : "border-transparent"
            }`}
            href={`/${c.collection}`}
            onMouseEnter={() => handleSetCollection(c)}
          >
            {c.collection.toLocaleUpperCase()}
          </Link>
        ))}
      </div>
    </>
  );

  return (
    <div className="flex justify-center items-center h-12 w-full">
      <HoverDropdown
        trigger={menuLinks}
        dropdown={
          <div
            className="fixed"
            onMouseLeave={() => handleSetCollection(undefined)}
            onTouchCancel={() => handleSetCollection(undefined)}
          >
            {/* Background for header */}
            <div className="fixed left-0 right-0 top-0 w-full h-24 dark:bg-black bg-white" />

            {/* Dropdown Menu */}
            <div className="fixed left-0 right-0 top-[6rem] w-full dark:bg-black bg-white flex justify-center items-center">
              <div className="flex flex-col items-center flex-wrap gap-4 md:w-1/2 mt-4 mx-8 h-96">
                {selectedCollection && (
                  <CollectionBox collection={selectedCollection} />
                )}
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
}

export function CollectionBox({ collection }: { collection: CollectionGroup }) {
  console.log(collection);
  return (
    <Fragment>
      {collection.categories.map((category) => (
        <div key={category.id} className="flex flex-col w-48">
          <Link
            className="underline dark:hover:text-zinc-400 hover:text-zinc-500"
            href={`/${
              collection.collection
            }/${category.name.toLocaleLowerCase()}`}
          >
            {category.name}
          </Link>

          {category.subcategories.map((sub) => (
            <Link
              key={sub.id}
              href={`/${
                collection.collection
              }/${category.name.toLocaleLowerCase()}/${sub.name.toLocaleLowerCase()}`}
              className="dark:hover:text-zinc-400 hover:text-zinc-500"
            >
              {sub.name}
            </Link>
          ))}
        </div>
      ))}
    </Fragment>
  );
}

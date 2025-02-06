"use client";

import { CollectionGroup } from "@/lib/types";
import Link from "next/link";
import { useState } from "react";
import CollectionBox from "./collection-box";
import { useParams } from "next/navigation";

export default function CollectionsMenu({
  collections,
}: {
  collections: CollectionGroup[];
}) {
  const params = useParams<{ collection: string; categories: string[] }>();
  const [selectedCollection, setSelectedCollection] =
    useState<CollectionGroup>();

  const selectedCollectionName = params.collection;

  const handleSetCollection = (collection: CollectionGroup | undefined) => {
    setSelectedCollection(collection);
  };

  return (
    <div className="flex justify-center items-center h-12 w-full">
      <div className="relative z-30 hidden sm:flex gap-8 md:gap-16">
        {collections.map((c) => (
          <Link
            key={c.collection}
            className={`z-20 w-16 p-1 hidden sm:flex justify-center items-center rounded ${
              selectedCollection?.collection === c.collection
                ? "dark:bg-zinc-700 border-black"
                : ""
            } ${
              selectedCollectionName === c.collection ? "text-blue-500" : ""
            }`}
            href={`/${c.collection}`}
            onMouseEnter={() => handleSetCollection(c)}
          >
            {c.collection.toLocaleUpperCase()}
          </Link>
        ))}
      </div>

      <div
        className="fixed z-10"
        onMouseLeave={() => handleSetCollection(undefined)}
        onTouchCancel={() => handleSetCollection(undefined)}
      >
        {/* Background for header */}
        {selectedCollection && (
          <div className="fixed left-0 right-0 top-0 w-full h-24 dark:bg-zinc-900 bg-zinc-200" />
        )}

        {/* Dropdown Menu */}
        {selectedCollection && (
          <div className="fixed left-0 right-0 top-[6rem] w-full dark:bg-zinc-900 bg-zinc-200 flex justify-center items-center z-50">
            <div className="flex flex-col items-center flex-wrap gap-4 md:w-1/2 mt-4 mx-8 h-96 z-50">
              {selectedCollection && (
                <CollectionBox collection={selectedCollection} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

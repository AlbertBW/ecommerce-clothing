"use client";

import { CollectionGroup } from "@/lib/types";
import { Fragment, useState } from "react";
import CollectionBox from "./collection-box";

export default function MobileCollectionsMenu({
  collections,
}: {
  collections: CollectionGroup[];
}) {
  const [selectedCollection, setSelectedCollection] =
    useState<CollectionGroup>();

  const handleSetCollection = (collection: CollectionGroup | undefined) => {
    setSelectedCollection((prev) => {
      console.log(
        prev?.collection,
        collection?.collection === collections[0].collection
      );
      if (prev === collection) {
        return undefined;
      }
      return collection;
    });
  };

  return (
    <div>
      <div className="relative z-50 sm:hidden flex flex-col w-full justify-center items-center gap-8 md:gap-16">
        {collections.map((c) => (
          <Fragment key={c.collection}>
            <button
              onClick={() => handleSetCollection(c)}
              key={c.collection}
              className={`z-20 p-1 flex sm:hidden justify-center items-center rounded border w-full h-16 hover:bg-zinc-500`}
            >
              {c.collection.toLocaleUpperCase()}
            </button>
            {selectedCollection &&
              selectedCollection.collection === c.collection && (
                <CollectionBox collection={selectedCollection} />
              )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

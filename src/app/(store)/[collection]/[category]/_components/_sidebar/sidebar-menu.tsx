import { Suspense } from "react";
import RangeInput from "./range-input";
import SidebarButton from "./sidebar-button";
import SubcategoryItems from "./subcategory-items";
import ProductColoursItems from "./product-colours-items";

export default function SidebarMenu({
  collection,
  category,
}: {
  collection: string;
  category: string;
}) {
  return (
    <nav className="hidden sm:block mx-3 sm:mx-8 mb-8 min-w-fit">
      <div>
        <h4 className="font-bold my-2">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </h4>
        <Suspense fallback={<SidebarItemsSkeleton />}>
          <SubcategoryItems collection={collection} categoryName={category} />
        </Suspense>
      </div>

      <div className="mt-6">
        <h4 className="font-bold my-2">Colours</h4>

        <Suspense fallback={<SidebarItemsSkeleton />}>
          <ProductColoursItems
            categoryName={category}
            collection={collection}
          />
        </Suspense>
      </div>

      <div className="mt-6">
        <h4 className="font-bold my-2">Sort by</h4>{" "}
        <ul className="flex flex-col gap-2 font-light text-sm">
          <li>
            <SidebarButton filter="sortBy" value="popular" text="Popular" />
          </li>

          <li>
            <SidebarButton filter="sortBy" value="new" text="New" />
          </li>

          <li>
            <SidebarButton
              filter="sortBy"
              value="priceAsc"
              text="Price: Low to High"
            />
          </li>

          <li>
            <SidebarButton
              filter="sortBy"
              value="priceDesc"
              text="Price: High to Low"
            />
          </li>
        </ul>
      </div>

      <div className="mt-6">
        <h4 className="font-bold my-2">Price</h4>
        <RangeInput />
      </div>
    </nav>
  );
}

function SidebarItemsSkeleton() {
  return (
    <ul className="flex flex-col gap-2 font-light text-sm">
      {Object.keys(Array.from({ length: 4 })).map((_, i) => (
        <li key={i} className="animate-pulse">
          <button
            className={`${
              i === 0
                ? "bg-zinc-500/50"
                : i === 1
                ? "bg-zinc-600/50"
                : i === 2
                ? "bg-zinc-700/50"
                : "bg-zinc-800/50"
            } rounded text-transparent`}
          >
            loading...
          </button>
        </li>
      ))}
    </ul>
  );
}

export const dynamic = "force-dynamic";

import { COLLECTION_PARAMS, ORDER_BY, OrderBy } from "@/lib/constants";
import { notFound } from "next/navigation";
import ProductList, { ProductListSkeleton } from "./_components/product-list";
import { Suspense } from "react";
import SidebarMenu from "./_components/_sidebar/sidebar-menu";
import { SearchParams } from "@/lib/types";

export async function generateStaticParams() {
  return COLLECTION_PARAMS.map((collection) => ({
    collection,
  }));
}

export default async function ProductListPage({
  params,
  searchParams,
}: {
  params: Promise<{ collection: string; category: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const { collection, category } = await params;
  const { subcategory, sortBy, page, brand, colour, size, price } =
    await searchParams;

  if (
    !COLLECTION_PARAMS.includes(collection) ||
    !ORDER_BY.includes(sortBy as OrderBy)
  ) {
    notFound();
  }

  const suspenseKey = `${collection}-${category}-${subcategory}-${sortBy}-${page}-${brand}-${colour}-${size}-${price}`;

  return (
    <div className="flex max-w-screen-2xl mx-auto">
      <SidebarMenu category={category} collection={collection} />
      <section className="flex flex-col w-full max-w-screen-2xl mx-auto overflow-y-visible">
        <Suspense key={suspenseKey} fallback={<ProductListSkeleton />}>
          <ProductList
            collection={collection}
            category={category}
            subcategory={subcategory}
            sortBy={sortBy}
            page={page}
            brand={brand}
            colour={colour}
            size={size}
            price={price}
          />
        </Suspense>
      </section>
    </div>
  );
}

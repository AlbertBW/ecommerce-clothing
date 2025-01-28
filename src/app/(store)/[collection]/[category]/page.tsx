export const dynamic = "force-dynamic";

import { COLLECTION_PARAMS, ORDER_BY, OrderBy } from "@/lib/constants";
import { notFound } from "next/navigation";
import ProductList, { ProductListSkeleton } from "./_components/product-list";
import { Suspense } from "react";
import Pagination from "./_components/pagination";
import SidebarMenu from "./_components/_sidebar/sidebar-menu";

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
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { collection, category } = await params;
  const { subcategory, orderBy, page, brand, colour, size, price } =
    await searchParams;

  if (
    !COLLECTION_PARAMS.includes(collection) ||
    !ORDER_BY.includes(orderBy as OrderBy)
  ) {
    notFound();
  }

  const suspenseKey = `${collection}-${category}-${subcategory}-${orderBy}-${page}-${brand}-${colour}-${size}-${price}`;

  return (
    <div className="flex">
      <SidebarMenu category={category} collection={collection} />
      <section className="flex flex-col w-full max-w-screen-2xl mx-auto">
        <Suspense key={suspenseKey} fallback={<ProductListSkeleton />}>
          <ProductList
            collection={collection}
            category={category}
            subcategory={subcategory}
            orderBy={orderBy}
            page={page}
            brand={brand}
            colour={colour}
            size={size}
            price={price}
          />
        </Suspense>

        <Pagination totalPages={5} />
      </section>
    </div>
  );
}

export const dynamic = "force-dynamic";

import { COLLECTION_PARAMS, ORDER_BY, OrderBy } from "@/lib/constants";
import { notFound } from "next/navigation";
import ProductList from "./_components/product-list";

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

  return (
    <>
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
    </>
  );
}

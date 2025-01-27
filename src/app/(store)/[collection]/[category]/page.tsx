export const dynamic = "force-dynamic";

import { COLLECTION_PARAMS, ORDER_BY, OrderBy } from "@/lib/constants";
import { notFound } from "next/navigation";

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

  console.log(
    collection,
    category,
    subcategory,
    orderBy,
    page,
    brand,
    colour,
    size,
    price
  );

  if (
    !COLLECTION_PARAMS.includes(collection) ||
    !ORDER_BY.includes(orderBy as OrderBy)
  ) {
    notFound();
  }

  return (
    <>
      {/* <Suspense fallback={<div>Loading...</div>}>
        <ProductList
          collection={collection}
          categories={categories}
          orderBy={orderBy}
          page={page}
          brand={brand}
          colour={colour}
          size={size}
          price={price}
        />
      </Suspense> */}
    </>
  );
}

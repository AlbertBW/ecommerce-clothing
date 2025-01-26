export const dynamic = "force-dynamic";

import { COLLECTION_PARAMS, ORDER_BY, OrderBy } from "@/lib/constants";
import { notFound } from "next/navigation";
import SidebarMenu from "./_components/sidebar-menu";
import ProductList from "./_components/product-list";
import { Suspense } from "react";
import { getSubcategoriesAndProductColours } from "@/use-cases/categories";

export async function generateStaticParams() {
  return COLLECTION_PARAMS.map((collection) => ({
    collection,
    category: ["all"],
  }));
}

export default async function ProductListPage({
  params,
  searchParams,
}: {
  params: Promise<{ collection: string; categories: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { collection, categories } = await params;
  const { orderBy, page, brand, colour, size, price } = await searchParams;

  if (
    !COLLECTION_PARAMS.includes(collection) ||
    !ORDER_BY.includes(orderBy as OrderBy)
  ) {
    notFound();
  }

  const parentCategoryName =
    categories[0].charAt(0).toUpperCase() + categories[0].slice(1);

  const { subcategories } = await getSubcategoriesAndProductColours({
    collection,
    parentCategoryName,
  });

  return (
    <div className="flex">
      <SidebarMenu
        categories={subcategories}
        parentCategoryName={parentCategoryName}
        collection={collection}
        selectedCategory={categories[1]}
      />

      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
    </div>
  );
}

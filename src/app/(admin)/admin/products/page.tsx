import { auth } from "@/auth";
import { notFound } from "next/navigation";
import AdminProductList from "./_components/admin-product-list";
import { Suspense } from "react";
import { SearchParams } from "@/lib/types";
import ProductsSidebar from "./_components/products-sidebar";
import AdminContentLayout from "../_components/admin-content-layout";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const session = await auth();

  if (!session) {
    return notFound();
  }

  if (session.user.role !== "admin" && session.user.role !== "owner") {
    return notFound();
  }

  const {
    collection = "all",
    category = "all",
    subcategory,
    sortBy,
    page,
    brand,
    colour,
    size,
    price,
  } = await searchParams;

  const suspenseKey = `${collection}-${category}-${subcategory}-${sortBy}-${page}-${brand}-${colour}-${size}-${price}`;

  return (
    <AdminContentLayout
      sidebar={
        <ProductsSidebar
          collection={collection as string}
          category={category as string}
        />
      }
      content={
        <Suspense key={suspenseKey} fallback={<div>Loading...</div>}>
          <AdminProductList
            collection={collection as string}
            category={category as string}
            subcategory={subcategory}
            sortBy={sortBy}
            page={page}
            brand={brand}
            colour={colour}
            size={size}
            price={price}
          />
        </Suspense>
      }
    />
  );
}

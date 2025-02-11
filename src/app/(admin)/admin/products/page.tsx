import { auth } from "@/auth";
import { notFound } from "next/navigation";
import AdminSidebarMenu from "../_components/_sidebar/admin-sidebar";
import AdminProductList from "./_components/admin-product-list";
import { Suspense } from "react";
import { SearchParams } from "@/lib/types";

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
    <div className="flex">
      <AdminSidebarMenu
        collection={collection as string}
        category={category as string}
      />
      <section className="flex flex-col w-full max-w-screen-2xl mx-auto overflow-y-visible">
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
      </section>
      {/* <Pagination /> */}
    </div>
  );
}

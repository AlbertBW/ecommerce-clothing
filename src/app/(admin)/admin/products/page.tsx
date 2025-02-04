import { auth } from "@/auth";
import { getProductListDetails } from "@/use-cases/products";
import { notFound } from "next/navigation";
import AdminSidebarMenu from "../_components/_sidebar/admin-sidebar";
import AdminProductList from "./_components/admin-product-list";
import { Suspense } from "react";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await auth();

  if (!session) {
    return notFound();
  }

  if (session.user.role !== "admin") {
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

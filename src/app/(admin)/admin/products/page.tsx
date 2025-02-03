import { auth } from "@/auth";
import { getProductListDetails } from "@/use-cases/products";
import { notFound } from "next/navigation";
import AdminSidebarMenu from "../_components/_sidebar/admin-sidebar";

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

  const products = await getProductListDetails({
    collection,
    categorySlug: category,
    subcategorySlug: subcategory,
    sortBy,
    page,
    brandSlug: brand,
    colourSlug: colour,
    sizeSlug: size,
    price,
  });

  return (
    <div className="flex">
      <AdminSidebarMenu
        collection={collection as string}
        category={category as string}
      />
    </div>
  );
}

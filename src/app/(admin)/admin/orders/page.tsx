import { auth } from "@/auth";
import { SearchParams } from "@/lib/types";
import { notFound } from "next/navigation";
import AdminOrderList from "./_components/admin-order-list";
import { Suspense } from "react";
import AdminContentLayout from "../_components/admin-content-layout";
import OrdersSidebar from "./_components/orders-sidebar";

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { page, status, sortBy, search } = await searchParams;
  const session = await auth();

  if (
    !session ||
    (session.user.role !== "admin" && session.user.role !== "owner")
  ) {
    return notFound();
  }

  if (page || status || sortBy || search) {
    if (
      Array.isArray(page) ||
      Array.isArray(status) ||
      Array.isArray(sortBy) ||
      Array.isArray(search)
    ) {
      return notFound();
    }
  }

  const suspenseKey = `${page}`;

  return (
    <AdminContentLayout
      sidebar={<OrdersSidebar />}
      content={
        <Suspense key={suspenseKey} fallback={<div>Loading...</div>}>
          <AdminOrderList
            page={page}
            status={status}
            sortBy={sortBy}
            search={search}
          />
        </Suspense>
      }
    />
  );
}

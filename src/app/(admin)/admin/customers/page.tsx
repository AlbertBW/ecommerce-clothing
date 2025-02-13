import { auth } from "@/auth";
import { notFound } from "next/navigation";
import AdminContentLayout from "../_components/admin-content-layout";
import CustomersSidebar from "./_components/customers-sidebar";
import { Suspense } from "react";
import AdminCustomerList from "./_components/admin-customer-list";
import { SearchParams } from "@/lib/types";

export default async function CustomersPage({
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

  const { page, search } = await searchParams;

  if (Array.isArray(page) || Array.isArray(search)) {
    throw new Error("Search Params are not valid");
  }

  return (
    <AdminContentLayout
      sidebar={<CustomersSidebar />}
      content={
        <Suspense fallback={<div>Loading...</div>}>
          <AdminCustomerList page={page} search={search} />
        </Suspense>
      }
    />
  );
}

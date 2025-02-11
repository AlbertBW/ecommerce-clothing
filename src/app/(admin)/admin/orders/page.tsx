import { auth } from "@/auth";
import { notFound } from "next/navigation";

export default async function OrdersPage() {
  const session = await auth();

  if (!session) {
    return notFound();
  }

  if (session.user.role !== "admin" && session.user.role !== "owner") {
    return notFound();
  }

  return <div>OrdersPage</div>;
}

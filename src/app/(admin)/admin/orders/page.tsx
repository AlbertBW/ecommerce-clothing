import { auth } from "@/auth";
import { notFound } from "next/navigation";

export default async function OrdersPage() {
  const session = await auth();
  console.log(session?.user.role);
  if (!session) {
    return notFound();
  }

  if (session.user.role !== "admin") {
    return notFound();
  }

  return <div>OrdersPage</div>;
}

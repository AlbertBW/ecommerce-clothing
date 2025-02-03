import { auth } from "@/auth";
import { notFound } from "next/navigation";

export default async function ProductsPage() {
  const session = await auth();

  if (!session) {
    return notFound();
  }

  if (session.user.role !== "admin") {
    return notFound();
  }

  return <div>ProductsPage</div>;
}

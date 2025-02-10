import { notFound } from "next/navigation";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { session_id } = await searchParams;

  if (!session_id) notFound();

  return <div>CheckoutSuccess {session_id}</div>;
}

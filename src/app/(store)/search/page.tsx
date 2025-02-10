import { SearchParams } from "@/lib/types";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { product } = await searchParams;

  return <div>{product}</div>;
}

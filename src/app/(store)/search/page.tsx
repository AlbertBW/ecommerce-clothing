import { SearchParams } from "@/lib/types";
import { notFound } from "next/navigation";
import ProductList from "./_components/product-list";
import { Suspense } from "react";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { result } = await searchParams;

  if (!result) notFound();

  const suspenseKey = `${result}`;

  return (
    <div>
      <div className="w-full flex justify-center py-2">
        <h2 className="font-bold text-lg">Search results for {result}</h2>
      </div>
      <Suspense
        fallback={
          <div className="w-full flex justify-center items-center">
            Loading...
          </div>
        }
        key={suspenseKey}
      >
        <ProductList search={result} />
      </Suspense>
    </div>
  );
}

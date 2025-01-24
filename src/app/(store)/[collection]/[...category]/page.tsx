import { COLLECTION_PARAMS, ORDER_BY, OrderBy } from "@/lib/constants";
import { getProductListPageData } from "@/use-cases/products";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return COLLECTION_PARAMS.map((collection) => ({
    collection,
    category: ["all"],
  }));
}

export default async function ProductListPage({
  params,
  searchParams,
}: {
  params: Promise<{ collection: string; category: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const collection = (await params).collection;
  const categories = (await params).category;
  const page = (await searchParams).page;
  const filters = (await searchParams).orderBy;
  const colour = (await searchParams).colour;
  const size = (await searchParams).size;
  const price = (await searchParams).price;

  if (
    !COLLECTION_PARAMS.includes(collection) ||
    !ORDER_BY.includes(filters as OrderBy)
  ) {
    notFound();
  }

  const { products, categoryTree } = await getProductListPageData({
    collection,
    categories,
    filters,
  });

  console.log(products);

  return <></>;
}

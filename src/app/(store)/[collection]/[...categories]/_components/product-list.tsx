import { getProductListPageData } from "@/use-cases/products";

type ProductListProps = {
  collection: string;
  categories: string[];
  orderBy: string | string[] | undefined;
  page: string | string[] | undefined;
  brand: string | string[] | undefined;
  colour: string | string[] | undefined;
  size: string | string[] | undefined;
  price: string | string[] | undefined;
};

export default async function ProductList({
  collection,
  categories,
  orderBy,
  page,
  brand,
  colour,
  size,
  price,
}: ProductListProps) {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  const products = await getProductListPageData({
    collection,
    categories,
    orderBy,
    page,
    brand,
    colour,
    size,
    price,
  });

  console.log("produts", products);
  return <div>ProductList</div>;
}

import { getProductDetailsBySearch } from "@/use-cases/products";
import ProductCardList from "../../[collection]/[category]/_components/product-card-list";

export default async function ProductList({
  search,
}: {
  search: string | string[];
}) {
  const products = await getProductDetailsBySearch({
    search,
    page: "1",
  });

  const loadMoreProducts = async (pageNum: number) => {
    "use server";
    return await getProductDetailsBySearch({
      search,
      page: pageNum.toString(),
    });
  };
  return (
    <ProductCardList
      initialProducts={products}
      loadMoreProducts={loadMoreProducts}
    />
  );
}

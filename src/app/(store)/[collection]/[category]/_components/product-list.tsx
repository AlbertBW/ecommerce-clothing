import { getProductListDetails } from "@/use-cases/products";
import ProductCardList from "./product-card-list";
import { ProductCardSkeleton } from "@/app/_components/product-card";

type ProductListProps = {
  collection: string;
  category: string;
  subcategory: string | string[] | undefined;
  sortBy: string | string[] | undefined;
  page: string | string[] | undefined;
  brand: string | string[] | undefined;
  colour: string | string[] | undefined;
  size: string | string[] | undefined;
  price: string | string[] | undefined;
};

export default async function ProductList({
  collection,
  category,
  subcategory,
  sortBy,
  page,
  brand,
  colour,
  size,
  price,
}: ProductListProps) {
  const initialProducts = await getProductListDetails({
    collection,
    categorySlug: category,
    subcategorySlug: subcategory,
    sortBy,
    page,
    brandSlug: brand,
    colourSlug: colour,
    sizeSlug: size,
    price,
  });

  if (initialProducts.length === 0) {
    return (
      <div className="pt-0 min-h-[calc(100vh-12rem)] max-h-[calc(100vh-12rem)] mt-2 px-1 md:px-0 md:ml-4 mx-1 sm:mx-4 ">
        <div className="text-center text-lg font-light flex justify-center items-center w-full h-full">
          No products found
        </div>
      </div>
    );
  }

  const loadMoreProducts = async (pageNum: number) => {
    "use server";
    return await getProductListDetails({
      collection,
      categorySlug: category,
      subcategorySlug: subcategory,
      sortBy,
      page: pageNum.toString(),
      brandSlug: brand,
      colourSlug: colour,
      sizeSlug: size,
      price,
    });
  };

  return (
    <ProductCardList
      initialProducts={initialProducts}
      loadMoreProducts={loadMoreProducts}
    />
  );
}

export function ProductListSkeleton() {
  return (
    <div className="pt-0 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-2 px-1 md:px-0 md:ml-4 mx-1 sm:mx-4 min-h-[calc(100vh-12rem)] max-h-[calc(100vh-12rem)] -z-50">
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className={`max-w-80 animate-pulse`}>
          <ProductCardSkeleton />
        </div>
      ))}
    </div>
  );
}

import ProductCard, {
  ProductCardSkeleton,
} from "@/app/_components/product-card";
import { getProductListDetails } from "@/use-cases/products";

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
  const products = await getProductListDetails({
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

  if (products.length === 0) {
    return (
      <div className="pt-0 min-h-[calc(100vh-12rem)] max-h-[calc(100vh-12rem)] mt-2 px-1 md:px-0 md:ml-4 mx-1 sm:mx-4 ">
        <div className="text-center text-lg font-light flex justify-center items-center w-full h-full">
          No products found
        </div>
      </div>
    );
  }

  return (
    <div className="pt-0 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-2 px-1 md:px-0 md:ml-4 mx-1 sm:mx-4 min-h-[calc(100vh-12rem)]">
      {products.map((product) => (
        <div key={product.id} className="max-w-80">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
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

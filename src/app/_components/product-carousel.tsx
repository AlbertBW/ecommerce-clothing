import { ProductDetails } from "@/lib/types";
import ProductCard from "./product-card";

export default function ProductCarousel({
  products,
  direction,
}: {
  products: ProductDetails[];
  direction: "right" | "left";
}) {
  return (
    <div className="carousel-container">
      {products.map((product, index) => (
        <div
          key={product.id}
          className={`moving-product move-${direction} delay-${index}`}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}

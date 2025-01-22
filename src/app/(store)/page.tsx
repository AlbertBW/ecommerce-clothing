import { getLatestProductDetails } from "@/use-cases/products";
import ProductCarousel from "../_components/product-carousel";
import Link from "next/link";
import Image from "next/image";
import shirt from "../../../public/t-shirt-white.jpeg";

export default async function Home() {
  // const latestProducts = await getLatestProductDetails();

  return (
    <>
      <div className="min-h-main">Home Page</div>
    </>
  );
}

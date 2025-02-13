import { getProductDetailsById } from "@/use-cases/products";
import Image from "next/image";
import Link from "next/link";
import tshirt from "../../../../../../public/t-shirt-white.jpeg";
import BackButton from "@/app/_components/back-button";
import EditModal from "./_components/edit-modal";
import { getAllCategories, getAllSubcategories } from "@/use-cases/categories";
import { auth } from "@/auth";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();

  if (!session) {
    return notFound();
  }

  if (session.user.role !== "admin" && session.user.role !== "owner") {
    return notFound();
  }

  const { id } = await params;

  const product = await getProductDetailsById(id);
  const categories = getAllCategories();
  const subcategories = getAllSubcategories();

  const colours = Array.from(
    new Set(
      product.productVariants
        .map((v) => v.colour?.name)
        .filter((name): name is string => name !== undefined && name !== null)
    )
  );

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-row items-center justify-between w-full px-4 my-4">
        <BackButton />
        <h1 className="sm:text-lg font-bold absolute left-1/2 transform -translate-x-1/2">
          {product.brand.name} - {product.name}
        </h1>
      </div>

      <Link
        href={`/product/${product.id}`}
        className="text-blue-500 mb-4 underline"
      >
        View in store
      </Link>

      <div className="flex justify-center mb-4">
        <Image src={tshirt} alt="Product name" width={300} height={300} />
      </div>

      <div className="my-4 flex flex-row justify-between items-center px-4 gap-2">
        <h2 className="text-lg font-bold">Product Details</h2>

        <EditModal
          product={product}
          categories={categories}
          subcategories={subcategories}
        />
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-screen-sm">
        <p className="text-gray-900 dark:text-gray-100 mb-2">
          <strong>Brand:</strong> {product.brand.name}
        </p>
        <p className="text-gray-900 dark:text-gray-100 mb-2">
          <strong>Name:</strong> {product.name}
        </p>
        <p className="text-gray-900 dark:text-gray-100 mb-2">
          <strong>Description:</strong> {product.description}
        </p>
        <p className="text-gray-900 dark:text-gray-100 mb-2">
          <strong>Collection:</strong> {product.category.collection}
        </p>
        <p className="text-gray-900 dark:text-gray-100 mb-2">
          <strong>Colours:</strong> {colours.join(", ")}
        </p>
        <p className="text-gray-900 dark:text-gray-100 mb-2">
          <strong>Category:</strong> {product.category.parentCategory?.name}
        </p>
        <p className="text-gray-900 dark:text-gray-100 mb-2">
          <strong>Subcategory:</strong> {product.category.name}
        </p>
        <p className="text-gray-900 dark:text-gray-100 mb-2">
          <strong>Created at:</strong> {product.createdAt.toLocaleDateString()}
        </p>
        <p className="text-gray-900 dark:text-gray-100 mb-2">
          <strong>Total Sold:</strong>{" "}
          {product.productVariants.reduce(
            (total, variant) => total + variant.sold,
            0
          )}
        </p>
        <p className="text-gray-900 dark:text-gray-100 mb-2">
          <strong>Total Stock:</strong>{" "}
          {product.productVariants.reduce(
            (total, variant) => total + variant.stock,
            0
          )}
        </p>
        <p className="text-gray-900 dark:text-gray-100 mb-2">
          <strong>Total Variants:</strong> {product.productVariants.length}
        </p>
      </div>

      <div className="w-full mt-4 border overflow-x-auto">
        <h3 className="text-center font-bold p-2">Variants</h3>

        <div className="min-w-52">
          <div className="flex flex-row items-center justify-between border-b border-zinc-500 py-2 text-sm">
            <div className="flex items-center flex-1"></div>
            <div className="flex items-center flex-1">
              <p className="ml-2 w-64 lg:w-40 border-r text-sm">SKU</p>
              <p className="ml-2 w-32 lg:min-w-32 border-r">Colour</p>
              <p className="ml-2 w-32 lg:min-w-40 border-r">Size</p>
              <p className="ml-2 w-24 lg:min-w-32 border-r">Stock</p>
              <p className="ml-2 w-24 lg:min-w-40 border-r">Sold</p>
              <p className="ml-2 w-24 lg:min-w-40">Price</p>
            </div>
            <div className="w-16"></div>
          </div>
          {product.productVariants.map((variant) => (
            <div
              key={variant.id}
              className="flex flex-row items-center justify-between border-b border-zinc-500 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <div className="flex items-center flex-1">
                <p className="ml-2 w-64 lg:w-40 border-r truncate">
                  {variant.sku}
                </p>
                <p className="ml-2 w-32 lg:min-w-32 border-r truncate">
                  {variant.colour?.name}
                </p>
                <p className="ml-2 w-32 lg:min-w-40 border-r truncate">
                  {variant.size?.name}
                </p>
                <p className="ml-2 w-24 lg:min-w-32 border-r">
                  {variant.stock}
                </p>
                <p className="ml-2 w-24 lg:min-w-40 border-r">{variant.sold}</p>
                <p className="ml-2 w-24 lg:min-w-40">
                  £{(variant.price / 100).toFixed(2)}
                </p>
              </div>
              <div className="w-16 flex justify-center">
                <EditModal
                  variant={variant}
                  categories={categories}
                  subcategories={subcategories}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

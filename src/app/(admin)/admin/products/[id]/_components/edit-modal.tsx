"use client";

import { Category, ProductVariant } from "@/db/schema";
import { ProductDetails } from "@/lib/types";
import { use, useState } from "react";

export default function EditModal({
  product,
  variant,
  categories,
  subcategories,
}: {
  product?: ProductDetails;
  variant?: ProductVariant;
  categories: Promise<Category[]>;
  subcategories: Promise<Category[]>;
}) {
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  const categoryArray = use(categories);
  const subcategoryArray = use(subcategories);
  return (
    <>
      <button
        type="button"
        onClick={() => {
          setShowModal((prev) => !prev);
        }}
        className="rounded bg-blue-600 hover:bg-blue-500 font-semibold text-sm p-2 text-white"
      >
        Edit
      </button>
      {showModal && product ? (
        <form className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="dark:bg-black bg-white p-8 rounded-lg w-96 border">
            <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">
                  Name: {product.name}
                </label>
                <input
                  type="text"
                  defaultValue={product.name}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm dark:bg-zinc-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  defaultValue={product.description}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm dark:bg-zinc-700 resize-none"
                  rows={4}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Category: {product.category?.parentCategory?.name}
                </label>
                <select
                  defaultValue={product.category?.id}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm dark:bg-zinc-700"
                >
                  {categoryArray.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                  <option value="new">+ Create new category</option>
                </select>

                {selectedCategory === "new" && (
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="New category name"
                      className="mt-1 block w-full rounded border-gray-300 shadow-sm dark:bg-zinc-700"
                    />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Subcategory: {product.category?.name}
                </label>
                <select
                  defaultValue={product.category?.id}
                  onChange={(e) => setSelectedSubcategory(e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm dark:bg-zinc-700"
                >
                  {subcategoryArray.map((subcat) => (
                    <option key={subcat.id} value={subcat.id}>
                      {subcat.name}
                    </option>
                  ))}
                  <option value="new">+ Create new subcategory</option>
                </select>

                {selectedSubcategory === "new" && (
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="New subcategory name"
                      className="mt-1 block w-full rounded border-gray-300 shadow-sm dark:bg-zinc-700"
                    />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium">Tags</label>
                {product.tags?.map((tag) => (
                  <div key={tag} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      defaultValue={tag}
                      className="mt-1 block w-full rounded border-gray-300 shadow-sm dark:bg-zinc-700"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        console.log("Remove tag");
                      }}
                      className="mt-1 px-2 py-1 text-red-500 hover:bg-red-100 rounded"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    console.log("Add tag");
                  }}
                  className="mt-2 px-4 py-2 border rounded hover:bg-gray-100 text-sm"
                >
                  + Add Tag
                </button>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded hover:bg-red-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : showModal && variant ? (
        <form className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="dark:bg-black bg-white p-8 rounded-lg w-96 border">
            <h2 className="text-2xl font-bold mb-4">Edit Variant</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">
                  Price: £{(variant.price / 100).toFixed(2)}
                </label>
                <input
                  type="number"
                  defaultValue={variant.price}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm dark:bg-zinc-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Stock: {variant.stock}
                </label>
                <input
                  type="number"
                  defaultValue={variant.stock}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm dark:bg-zinc-700"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded hover:bg-red-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : null}
    </>
  );
}

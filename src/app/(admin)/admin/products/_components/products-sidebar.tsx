import { getSidebarMenuItemsData } from "@/use-cases/categories";
import AdminSidebarMenu from "../../_components/_sidebar/admin-sidebar";
import { COLLECTION_COMBINATIONS } from "@/lib/constants";
import RangeInput from "../../_components/_sidebar/range-input";
import SidebarButton from "../../_components/_sidebar/sidebar-button";
import SidebarSection from "../../_components/_sidebar/sidebar-section";

export default async function ProductsSidebar({
  collection,
  category,
}: {
  collection: string | string[] | undefined;
  category: string | string[] | undefined;
}) {
  const {
    getSubcategories,
    getProductColours,
    getBrandsByCollectionAndCategory,
    getAllSizes,
    getAllCategories,
  } = await getSidebarMenuItemsData({
    collection,
    categoryName: category,
  });

  const allCollections = COLLECTION_COMBINATIONS;

  return (
    <AdminSidebarMenu>
      <div>
        <h4 className="font-bold my-2">Collections</h4>
        <ul className="flex flex-col gap-2 font-light text-sm">
          <li>
            <SidebarButton
              filter="collection"
              value="all"
              text="All"
              paramType="clear"
            />
          </li>
          {Object.keys(allCollections)
            .filter((collection) => collection !== "all")
            .map((collection) => (
              <li key={collection}>
                <SidebarButton
                  filter="collection"
                  value={collection}
                  text={
                    collection.charAt(0).toUpperCase() + collection.slice(1)
                  }
                  paramType="array"
                />
              </li>
            ))}
        </ul>
      </div>

      <SidebarSection
        fetchItems={getAllCategories}
        filter="category"
        heading="Categories"
      />
      <SidebarSection
        fetchItems={getSubcategories}
        filter="subcategory"
        heading="Subcategories"
      />
      <SidebarSection
        fetchItems={getProductColours}
        filter="colour"
        heading="Colours"
      />
      <SidebarSection
        fetchItems={getBrandsByCollectionAndCategory}
        filter="brand"
        heading="Brands"
      />
      <SidebarSection fetchItems={getAllSizes} filter="size" heading="Sizes" />

      <div className="mt-6">
        <h4 className="font-bold my-2">Sort by</h4>
        <ul className="flex flex-col gap-2 font-light text-sm">
          <li>
            <SidebarButton filter="sortBy" value="popular" text="Popular" />
          </li>

          <li>
            <SidebarButton filter="sortBy" value="new" text="New" />
          </li>

          <li>
            <SidebarButton
              filter="sortBy"
              value="priceAsc"
              text="Price: Low to High"
            />
          </li>

          <li>
            <SidebarButton
              filter="sortBy"
              value="priceDesc"
              text="Price: High to Low"
            />
          </li>
        </ul>
      </div>

      <div className="mt-6">
        <h4 className="font-bold my-2">Price</h4>
        <RangeInput />
      </div>
    </AdminSidebarMenu>
  );
}

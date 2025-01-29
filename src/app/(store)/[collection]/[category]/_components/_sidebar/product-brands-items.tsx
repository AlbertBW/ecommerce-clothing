import SidebarButton from "./sidebar-button";
import { getBrandsByCollectionAndCategory } from "@/use-cases/brands";

export default async function ProductBrandsItems({
  collection,
  categoryName,
}: {
  collection: string;
  categoryName: string;
}) {
  const brands = await getBrandsByCollectionAndCategory({
    collection,
    categoryName,
  });
  return (
    <ul className="flex flex-col gap-2 font-light text-sm">
      <li>
        <SidebarButton
          filter="brand"
          value="clear"
          text="All"
          paramType="clear"
        />
      </li>
      {brands.map((brand) => (
        <li key={brand.id}>
          <SidebarButton
            filter="brand"
            value={brand.slug}
            text={brand.name.charAt(0).toUpperCase() + brand.name.slice(1)}
            paramType="array"
          />
        </li>
      ))}
    </ul>
  );
}

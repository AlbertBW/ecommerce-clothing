import { getSubcategories } from "@/use-cases/categories";
import SidebarButton from "./sidebar-button";

export default async function SubcategoryItems({
  categoryName,
  collection,
}: {
  categoryName: string;
  collection: string;
}) {
  const subcategories = await getSubcategories({ categoryName, collection });

  return (
    <ul className="flex flex-col gap-2 font-light text-sm">
      <li>
        <SidebarButton
          filter="category"
          value="all"
          text="All"
          paramType="clear"
        />
      </li>
      {subcategories.map((category) => (
        <li key={category.id}>
          <SidebarButton
            filter="category"
            value={category.slug}
            text={category.name}
            paramType="array"
          />
        </li>
      ))}
    </ul>
  );
}

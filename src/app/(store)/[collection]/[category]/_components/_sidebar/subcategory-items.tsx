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
          filter="subcategory"
          value="all"
          text="All"
          paramType="clear"
        />
      </li>
      {subcategories.map((subcategory) => (
        <li key={subcategory.id}>
          <SidebarButton
            filter="subcategory"
            value={subcategory.slug}
            text={subcategory.name}
            paramType="array"
          />
        </li>
      ))}
    </ul>
  );
}

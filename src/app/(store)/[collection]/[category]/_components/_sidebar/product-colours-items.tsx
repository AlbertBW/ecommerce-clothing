import { getProductColours } from "@/use-cases/categories";
import SidebarButton from "./sidebar-button";

export default async function ProductColoursItems({
  collection,
  categoryName,
}: {
  collection: string;
  categoryName: string;
}) {
  const colours = await getProductColours({ collection, categoryName });
  return (
    <ul className="flex flex-col gap-2 font-light text-sm">
      <li>
        <SidebarButton
          filter="colour"
          value="clear"
          text="All"
          paramType="clear"
        />
      </li>
      {colours.map((colour) => (
        <li key={colour.id}>
          <SidebarButton
            filter="colour"
            value={colour.name}
            text={colour.name.charAt(0).toUpperCase() + colour.name.slice(1)}
            paramType="array"
          />
        </li>
      ))}
    </ul>
  );
}

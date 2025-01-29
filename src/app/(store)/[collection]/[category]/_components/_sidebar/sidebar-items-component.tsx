import SidebarButton from "./sidebar-button";

export type Item = {
  id: number;
  name: string;
  slug?: string;
};

type SidebarItemsProps<T extends Item> = {
  collection: string;
  categoryName: string;
  fetchItems: ({
    collection,
    categoryName,
  }: {
    collection: string;
    categoryName: string;
  }) => Promise<T[]>;
  filter: string;
};

export default async function SidebarItems<T extends Item>({
  collection,
  categoryName,
  fetchItems,
  filter,
}: SidebarItemsProps<T>) {
  const items = await fetchItems({
    collection,
    categoryName,
  });
  return (
    <ul className="styled-scrollbar overflow-y-scroll flex flex-col gap-2 font-light text-sm max-h-80">
      <li>
        <SidebarButton
          filter={filter}
          value="clear"
          text="All"
          paramType="clear"
        />
      </li>
      {items.map((item) => (
        <li key={item.id}>
          <SidebarButton
            filter={filter}
            value={item.slug ?? item.name}
            text={item.name.charAt(0).toUpperCase() + item.name.slice(1)}
            paramType="array"
          />
        </li>
      ))}
    </ul>
  );
}

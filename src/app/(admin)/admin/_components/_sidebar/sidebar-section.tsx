import { Suspense } from "react";
import SidebarItems, { Item } from "./sidebar-items-component";
import { SidebarItemsSkeleton } from "./admin-sidebar";

type SidebarSectionProps<T extends Item> = {
  heading: string;
  filter: string;
  fetchItems: () => Promise<T[]>;
};

export default function SidebarSection<T extends Item>({
  heading,
  filter,
  fetchItems,
}: SidebarSectionProps<T>) {
  return (
    <div className="mt-6">
      <h4 className="font-bold my-2">{heading}</h4>
      <Suspense fallback={<SidebarItemsSkeleton />}>
        <SidebarItems fetchItems={fetchItems} filter={filter} />
      </Suspense>
    </div>
  );
}

import AdminSidebarMenu from "../../_components/_sidebar/admin-sidebar";
import SidebarButton from "../../_components/_sidebar/sidebar-button";
import SearchInput from "./search-input";

const status = [
  { name: "Awaiting delivery", slug: "paid" },
  { name: "Cancelled", slug: "cancelled" },
  { name: "Return requested", slug: "return-requested" },
  { name: "Returned", slug: "returned" },
  { name: "fulfilled", slug: "fulfilled" },
] as const;

export default function OrdersSidebar() {
  return (
    <AdminSidebarMenu>
      <SearchInput />
      <div className="mt-6">
        <h4 className="font-bold my-2">Status</h4>
        <ul className="flex flex-col gap-2 font-light text-sm">
          <li>
            <SidebarButton
              filter="status"
              value="all"
              text="All"
              paramType="clear"
            />
          </li>

          {status.map((s) => (
            <li key={s.slug}>
              <SidebarButton filter="status" value={s.slug} text={s.name} />
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <h4 className="font-bold my-2">Sort by</h4>
        <ul className="flex flex-col gap-2 font-light text-sm">
          <li>
            <SidebarButton filter="sortBy" value="new" text="Newest" />
          </li>

          <li>
            <SidebarButton filter="sortBy" value="old" text="Oldest" />
          </li>
        </ul>
      </div>
    </AdminSidebarMenu>
  );
}

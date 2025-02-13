import { getUserAndSesssionCount } from "@/use-cases/user";
import AdminSidebarMenu from "../../_components/_sidebar/admin-sidebar";
import SearchInput from "../../_components/search-input";

export default async function CustomersSidebar() {
  const { userCount, sessionCount } = await getUserAndSesssionCount();
  return (
    <AdminSidebarMenu>
      <div className="mt-6">
        <h4 className="font-bold my-2">Customers</h4>
        <ul className="flex flex-col gap-1 font-light text-xs">
          <li>Total Customers: {userCount}</li>
          <li>Current Sessions: {sessionCount}</li>
        </ul>
      </div>

      <SearchInput popupText="You can search by name or email address." />
    </AdminSidebarMenu>
  );
}

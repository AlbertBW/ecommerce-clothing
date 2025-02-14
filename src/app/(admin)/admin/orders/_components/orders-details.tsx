import { getAdminSidebarOrdersData } from "@/use-cases/orders";

export default async function OrdersDetails() {
  const { totalOrders, ordersLast30Days, ordersLast7Days } =
    await getAdminSidebarOrdersData();
  return (
    <div className="mt-6">
      <h4 className="font-bold my-2">Orders</h4>
      <ul className="flex flex-col gap-2 font-light text-sm">
        <li>Total: {totalOrders}</li>
        <li>last 30 days: {ordersLast30Days}</li>
        <li>last 7 days: {ordersLast7Days}</li>
      </ul>
    </div>
  );
}

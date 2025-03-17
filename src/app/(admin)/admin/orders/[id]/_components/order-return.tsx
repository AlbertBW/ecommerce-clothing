import { OrderWithDetails } from "@/data-access/orders.access";

export default function OrderReturn({ order }: { order: OrderWithDetails }) {
  console.log(order);
  return <div>OrderReturn</div>;
}

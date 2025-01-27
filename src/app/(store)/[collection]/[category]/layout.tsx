import SidebarMenu from "./_components/_sidebar/sidebar-menu";

export default async function ProductListingLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ collection: string; category: string }>;
}) {
  const { collection, category } = await params;
  return (
    <section className="flex">
      <SidebarMenu category={category} collection={collection} />
      {children}
    </section>
  );
}

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
    <div className="flex">
      <SidebarMenu category={category} collection={collection} />

      <section className="w-full max-w-screen-2xl mx-auto">{children}</section>
    </div>
  );
}

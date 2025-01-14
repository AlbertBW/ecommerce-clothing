import Header from "./_components/_layout/_header/header";
import Footer from "./_components/_layout/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100svh-6.75rem)]">{children}</main>
      <Footer />
    </>
  );
}

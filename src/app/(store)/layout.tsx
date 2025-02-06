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
      <main className="min-h-small sm:min-h-main">{children}</main>
      <Footer />
    </>
  );
}

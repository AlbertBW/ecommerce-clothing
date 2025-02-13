import { SessionProvider } from "next-auth/react";
import Header from "./_components/_layout/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SessionProvider>
        <Header />
      </SessionProvider>
      <main className="min-h-main">{children}</main>
    </>
  );
}

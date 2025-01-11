import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./../globals.css";
import Header from "./_components/_layout/header";
import Footer from "./_components/_layout/footer";
import { AUTHOR_GITHUB, COMPANY_NAME } from "@/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${COMPANY_NAME} - E-Commerce`,
  description: "An e-commerce store for clothes",
  authors: [{ name: "Albert Wales", url: AUTHOR_GITHUB }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-mono antialiased min-h-dvh`}
      >
        <Header />
        <main className="min-h-[calc(100svh-6.75rem)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

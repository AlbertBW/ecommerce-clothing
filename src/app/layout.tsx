import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./_components/_layout/header";
import Footer from "./_components/_layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clothing E-Commerce",
  description: "An e-commerce store for clothes",
  authors: [{ name: "Albert Wales" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-mono antialiased min-h-screen`}
      >
        <Header />
        <main className="min-h-[calc(100vh-3rem)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

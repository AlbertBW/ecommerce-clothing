import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
    <html
      lang="en"
      className={`${geistMono.variable} ${geistSans.variable} h-screen overflow-y-scroll`}
    >
      <body className={`font-mono min-h-dvh h-screen`}>{children}</body>
    </html>
  );
}

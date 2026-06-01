import type { Metadata } from "next";

import "./globals.css";

import { Roboto } from 'next/font/google'

const roboto = Roboto({ weight: ['400', '500'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Soupeed",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased bg-white text-[#0a0a0a]`}>{children}</body>
    </html>
  );
}

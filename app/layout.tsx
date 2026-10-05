import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { RootProviders } from "@/components/providers/RootProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Greenwood School ERP - Admin Portal",
  description: "Enterprise Educational ERP System for Administrators and Staff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased text-slate-900 bg-slate-50 dark:bg-slate-950`}>
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
}
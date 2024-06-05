import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import RequireAuth from "@/components/requireAuth/RequireAuth";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NFT.Storage",
  description: "Future proof every NFT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <Toaster position="top-right" />
        <RequireAuth>
          <Suspense>{children}</Suspense>
        </RequireAuth>
      </body>
    </html>
  );
}

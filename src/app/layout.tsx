import type { Metadata } from "next";

import { Geist, Geist_Mono } from "next/font/google";

import "@/style/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SMK Negeri 1 Kota Tangerang",
  description: "SMK Negeri 1 Kota Tangerang",
};

import Route from "@/components/route/route";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans`}
      >
        <Route>{children}</Route>
      </body>
    </html>
  );
}

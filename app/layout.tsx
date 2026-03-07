import { GameStoreProvider } from "@/components/GameStoreProvider";
import type { Metadata } from "next";
import { Pirata_One, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const displayFont = Pirata_One({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

const bodyFont = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Skull King Score Tracker",
  description: "Mobile-first Skull King score app wireframe built in Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${displayFont.variable} ${bodyFont.variable} antialiased`}>
        <GameStoreProvider>{children}</GameStoreProvider>
      </body>
    </html>
  );
}

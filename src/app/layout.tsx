import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SHE Shop - Kreator Personalizacji Produktów",
  description: "Twórz unikalne, spersonalizowane produkty z naszym zaawansowanym kreatorem. Torby, plecaki, akcesoria w Twoim stylu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Theme accentColor="orange" grayColor="sand" radius="large" scaling="100%">
          {children}
        </Theme>
      </body>
    </html>
  );
}

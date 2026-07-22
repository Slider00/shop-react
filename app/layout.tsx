import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/features/cart/components/cart-drawer";
import { AgeGate } from "@/components/layout/age-gate";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Green Botanics | Premium Cannabis Boutique",
  description: "Boutique exclusiva de flores y extractos de cáñamo premium. Curaduría artesanal +18.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased bg-gradient-premium transition-colors duration-500">
        <Navbar />
        <main className="flex-1 flex flex-col pt-24">
          {children}
        </main>
        <Footer />
        <CartDrawer />
        <AgeGate />
      </body>
    </html>
  );
}

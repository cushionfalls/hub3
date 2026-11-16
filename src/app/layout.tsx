import type { Metadata, Viewport } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Cellucity Hub — Official Tech. Zero Compromise.",
    template: "%s | Cellucity Hub",
  },
  description:
    "Official Insta360, JBL, UGREEN and Anker gear in Nepal. Action cameras, speakers, headphones, chargers and power banks with genuine warranty and same-day delivery in Kathmandu Valley.",
  keywords: [
    "Cellucity Hub",
    "Insta360 Nepal",
    "JBL Nepal",
    "UGREEN Nepal",
    "Anker Nepal",
    "action cameras",
    "power banks",
    "official tech store Nepal",
  ],
  openGraph: {
    title: "Cellucity Hub — Official Tech. Zero Compromise.",
    description:
      "Official cameras, audio and power gear, delivered same-day inside Kathmandu Valley.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${inter.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-paper text-ink antialiased">
        <WishlistProvider>
          <CartProvider>
            <AnnouncementBar />
            <Header />
            <main className="w-full flex-1">{children}</main>
            <Footer />
            <CartDrawer />
          </CartProvider>
        </WishlistProvider>
      </body>
    </html>
  );
}

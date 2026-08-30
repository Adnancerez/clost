import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CountdownBanner } from "@/components/layout/countdown-banner";
import { Header } from "@/components/layout/header";
import { CartDrawer } from "@/components/layout/cart-drawer";
import { SupportWidget } from "@/components/ui/support-widget";
import { WelcomeModal } from "@/components/layout/welcome-modal";
import { ToastContainer } from "@/components/ui/toast";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CLOST — Kullanışlılık İçin Tasarlandı",
  description:
    "Yapısal bütünlüğe tavizsiz bağlılık. Modern brutalist lüks techwear e-ticaret platformu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-surface text-on-surface">
        <CountdownBanner />
        <Header />
        <div className="flex-grow flex flex-col pt-8">{children}</div>
        <CartDrawer />
        <SupportWidget />
        <WelcomeModal />
        <ToastContainer />
        <Footer />
      </body>
    </html>
  );
}

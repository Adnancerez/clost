import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CountdownBanner } from "@/components/layout/countdown-banner";
import { Header } from "@/components/layout/header";
import { NavigationHistoryBar } from "@/components/layout/navigation-history-bar";
import { CartDrawer } from "@/components/layout/cart-drawer";
import { SupportWidget } from "@/components/ui/support-widget";
import { WelcomeModal } from "@/components/layout/welcome-modal";
import { ToastContainer } from "@/components/ui/toast";
import { Footer } from "@/components/layout/footer";
import { PwaProvider } from "@/components/pwa/pwa-provider";

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

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "CLOST — Y2K & Gen-Z Streetwear Archive",
    template: "%s — CLOST",
  },
  description:
    "Y2K, Acubi, Skater ve Harajuku sokak modası arşivi. Oversized silüetler, raw denimler ve özel grafik tasarımlar.",
  applicationName: "CLOST",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "CLOST",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/icons/icon-192.svg",
  },
  manifest: "/manifest.webmanifest",
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
        <PwaProvider>
          <CountdownBanner />
          <Header />
          <div className="flex-grow flex flex-col pt-24">
            <NavigationHistoryBar />
            {children}
          </div>
          <CartDrawer />
          <SupportWidget />
          <WelcomeModal />
          <ToastContainer />
          <Footer />
        </PwaProvider>
      </body>
    </html>
  );
}

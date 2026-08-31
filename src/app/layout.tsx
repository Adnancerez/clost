import type { Metadata, Viewport } from "next";
import "./globals.css";
import { TopAnnouncementTicker } from "@/components/layout/top-announcement-ticker";
import { Header } from "@/components/layout/header";
import { CartDrawer } from "@/components/layout/cart-drawer";
import { SupportWidget } from "@/components/ui/support-widget";
import { WelcomeModal } from "@/components/layout/welcome-modal";
import { FeedbackModal } from "@/components/ui/feedback-modal";
import { FeedbackTrigger } from "@/components/ui/feedback-trigger";
import { ToastContainer } from "@/components/ui/toast";
import { Footer } from "@/components/layout/footer";
import { PwaProvider } from "@/components/pwa/pwa-provider";

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
    "Y2K, Acubi, Skater ve Harajuku sokak modası arşivi. Oversized silüetler, 14.5 oz raw denimler ve özel serigrafi baskılar.",
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
    <html lang="tr" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-surface text-on-surface">
        <PwaProvider>
          {/* 1. Global Infinite Marquee Announcement Ticker (32px / top-0) */}
          <TopAnnouncementTicker />

          {/* 2. Global Rigid Header (56px / top-8) */}
          <Header />

          {/* 3. Main Page Body (Unified 88px top offset across all pages) */}
          <div className="flex-grow flex flex-col pt-[88px]">
            {children}
          </div>

          <CartDrawer />
          <SupportWidget />
          <FeedbackModal />
          <FeedbackTrigger />
          <WelcomeModal />
          <ToastContainer />
          <Footer />
        </PwaProvider>
      </body>
    </html>
  );
}

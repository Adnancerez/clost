"use client";

import React, { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Package, MapPin, User, ShieldCheck, LogOut, ArrowRight, Shield } from "lucide-react";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { useToastStore } from "@/lib/store/useToastStore";
import { InvoiceModal } from "@/components/checkout/invoice-modal";
import { OrdersTab, OrderItem } from "@/components/account/orders-tab";
import { AddressesTab, Address } from "@/components/account/addresses-tab";
import { ProfileTab } from "@/components/account/profile-tab";
import { SecurityTab } from "@/components/account/security-tab";

const emptySubscribe = () => () => {};

export default function AccountPage() {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const { user, isAuthenticated, logout, login } = useAuthStore();
  const { addToast } = useToastStore();

  const [tab, setTab] = useState<"orders" | "addresses" | "profile" | "security">("orders");

  // Fallback state if user not fully populated
  const [name, setName] = useState(user?.name || "Adnan Çerez");
  const [email, setEmail] = useState(user?.email || "musteri@clost.store");
  const [phone, setPhone] = useState(user?.phone || "+90 532 000 00 00");

  // Inline Quick Login state if not authenticated
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);

  // Selected Order for Invoice Modal
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<{
    id: string;
    total: number;
    items: string;
    date: string;
  } | null>(null);

  // Addresses State
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "addr-1",
      title: "Ev Adresim",
      fullName: user?.name || "Adnan Çerez",
      phone: user?.phone || "+90 532 000 00 00",
      city: "İstanbul",
      district: "Kadıköy",
      fullAddress: "Moda Cad. No: 42 Daire: 7",
      isDefault: true,
    },
    {
      id: "addr-2",
      title: "Ofis / Stüdyo",
      fullName: user?.name || "Adnan Çerez",
      phone: user?.phone || "+90 532 000 00 00",
      city: "İstanbul",
      district: "Beşiktaş",
      fullAddress: "Levent Mah. Cömert Sok. No: 12 Kat: 4",
      isDefault: false,
    },
  ]);

  // Orders State
  const [orders] = useState<OrderItem[]>([
    {
      id: "ORD-948201-TR",
      date: "28 Ağustos 2026",
      total: 12500,
      status: "Teslim Edildi",
      tracking: "CL-892401-TR",
      items: "Oversized Technical Parka V.2 (Siyah / M), Raw Denim (32)",
      isDelivered: true,
    },
    {
      id: "ORD-820491-TR",
      date: "14 Ağustos 2026",
      total: 5200,
      status: "Teslim Edildi",
      tracking: "CL-771923-TR",
      items: "Heavyweight Boxy Hoodie 500 GSM (Kömür Gri / L)",
      isDelivered: true,
    },
    {
      id: "ORD-719302-TR",
      date: "02 Temmuz 2026",
      total: 6800,
      status: "Teslim Edildi",
      tracking: "CL-610294-TR",
      items: "Waterproof Shell Jacket 3L (Zeytin Yeşili / M)",
      isDelivered: true,
    },
  ]);

  const handleQuickLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    const res = await login(loginEmail, loginPassword);
    if (res.success) {
      addToast({
        title: "Giriş Başarılı",
        message: "Hesabınıza başarıyla erişildi.",
        type: "success",
      });
    } else {
      setAuthError(res.message || "Giriş yapılamadı.");
    }
  };

  const handleLogout = () => {
    logout();
    addToast({
      title: "Oturum Kapatıldı",
      message: "Güvenli bir şekilde çıkış yaptınız.",
      type: "info",
    });
  };

  if (!isMounted) return null;

  // Unauthenticated Gate
  if (!isAuthenticated) {
    return (
      <main className="flex-grow pb-16 bg-surface-container-low min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full border-2 border-primary bg-surface p-6 md:p-8 shadow-2xl font-label-mono text-xs">
          <div className="border-b border-primary pb-4 mb-6">
            <span className="text-[10px] uppercase text-on-surface-variant block mb-1">
              MÜŞTERİ PANELİ GÜVENLİK KAPISI
            </span>
            <h1 className="font-headline-sm uppercase text-primary text-xl font-bold">
              GİRİŞ YAPIN VEYA KAYDOLUN
            </h1>
            <p className="text-on-surface-variant text-xs mt-1">
              Sipariş geçmişinizi, adreslerinizi ve VIP durumunuzu görüntülemek için giriş yapın.
            </p>
          </div>

          {authError && (
            <div className="mb-4 p-3 bg-red-950 text-red-200 border border-red-800 text-xs">
              {authError}
            </div>
          )}

          <form onSubmit={handleQuickLogin} className="flex flex-col gap-3">
            <div>
              <label className="block uppercase text-primary font-bold mb-1">E-Posta:</label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="musteri@clost.store"
                required
                className="w-full border border-primary p-2.5 bg-surface text-primary"
              />
            </div>
            <div>
              <label className="block uppercase text-primary font-bold mb-1">Şifre:</label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full border border-primary p-2.5 bg-surface text-primary"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-on-primary h-12 flex items-center justify-center uppercase tracking-widest hover:bg-surface-variant hover:text-primary border border-primary transition-colors cursor-pointer font-bold mt-2 gap-2"
            >
              <span>Hesaba Giriş Yap</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Credentials */}
          <div className="mt-6 border-t border-primary/20 pt-4 flex flex-col gap-2">
            <span className="text-[10px] uppercase text-on-surface-variant font-bold">
              HIZLI DEMO HESAPLARI:
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setLoginEmail("musteri@clost.store");
                  setLoginPassword("clost123");
                }}
                className="p-2 border border-primary/40 text-left hover:border-primary hover:bg-surface-variant"
              >
                👤 Demo Müşteri
              </button>
              <button
                type="button"
                onClick={() => {
                  setLoginEmail("admin@clost.store");
                  setLoginPassword("admin123");
                }}
                className="p-2 border border-primary/40 text-left hover:border-primary hover:bg-surface-variant"
              >
                🛡️ Demo Admin
              </button>
            </div>
          </div>

          <div className="mt-6 text-center border-t border-primary/20 pt-4">
            Henüz hesabınız yok mu?{" "}
            <Link href="/register" className="text-primary font-bold underline">
              Kayıt Olun →
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const displayName = user?.name || name;
  const displayEmail = user?.email || email;
  const isAdmin = user?.role === "admin";

  return (
    <main className="flex-grow pb-16 bg-surface-container-low min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Account Header */}
        <header className="py-6 border-b border-primary mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 bg-surface p-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-label-mono text-[10px] uppercase text-on-surface-variant">
                MÜŞTERİ KONTROL PANELİ // {isAdmin ? "ADMIN YETKİSİ" : "STANDART ÜYE"}
              </span>
            </div>
            <h1 className="font-headline-sm uppercase text-primary text-xl md:text-2xl font-bold">
              Hoş Geldiniz, {displayName}
            </h1>
            <p className="font-label-mono text-xs text-on-surface-variant mt-1">
              Üyelik E-Postası: {displayEmail}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 font-label-mono text-xs">
            {isAdmin && (
              <Link
                href="/dev"
                className="bg-emerald-700 text-white px-4 py-2 uppercase hover:bg-emerald-800 transition-colors flex items-center gap-1.5 font-bold"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Dev / Mağaza Paneli</span>
              </Link>
            )}

            <Link
              href="/collections/all"
              className="bg-primary text-on-primary px-4 py-2 uppercase hover:bg-surface-variant hover:text-primary border border-primary transition-colors cursor-pointer"
            >
              Alışverişe Başla
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="border border-red-600 text-red-600 px-3 py-2 uppercase hover:bg-red-50 transition-colors flex items-center gap-1 cursor-pointer font-bold"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Çıkış Yap</span>
            </button>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Navigation Tabs */}
          <aside className="lg:col-span-3">
            <nav className="flex flex-col border border-primary bg-surface divide-y divide-outline-variant font-label-mono text-xs uppercase">
              <button
                type="button"
                onClick={() => setTab("orders")}
                className={`p-4 text-left flex items-center gap-3 transition-colors cursor-pointer ${
                  tab === "orders"
                    ? "bg-primary text-on-primary font-bold"
                    : "hover:bg-surface-variant text-primary"
                }`}
              >
                <Package className="w-4 h-4" />
                <span>Siparişlerim ({orders.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setTab("addresses")}
                className={`p-4 text-left flex items-center gap-3 transition-colors cursor-pointer ${
                  tab === "addresses"
                    ? "bg-primary text-on-primary font-bold"
                    : "hover:bg-surface-variant text-primary"
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>Adreslerim ({addresses.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setTab("profile")}
                className={`p-4 text-left flex items-center gap-3 transition-colors cursor-pointer ${
                  tab === "profile"
                    ? "bg-primary text-on-primary font-bold"
                    : "hover:bg-surface-variant text-primary"
                }`}
              >
                <User className="w-4 h-4" />
                <span>Profil Bilgilerim</span>
              </button>

              <button
                type="button"
                onClick={() => setTab("security")}
                className={`p-4 text-left flex items-center gap-3 transition-colors cursor-pointer ${
                  tab === "security"
                    ? "bg-primary text-on-primary font-bold"
                    : "hover:bg-surface-variant text-primary"
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Güvenlik &amp; Şifre</span>
              </button>
            </nav>
          </aside>

          {/* Right Main Content Area */}
          <section className="lg:col-span-9 border border-primary bg-surface p-6 shadow-sm">
            {tab === "orders" && (
              <OrdersTab
                orders={orders}
                onOpenInvoice={(order) => setSelectedInvoiceOrder(order)}
              />
            )}

            {tab === "addresses" && (
              <AddressesTab
                addresses={addresses}
                setAddresses={setAddresses}
              />
            )}

            {tab === "profile" && (
              <ProfileTab
                name={displayName}
                setName={setName}
                email={displayEmail}
                setEmail={setEmail}
                phone={phone}
                setPhone={setPhone}
              />
            )}

            {tab === "security" && <SecurityTab />}
          </section>
        </div>
      </div>

      {/* Official E-Invoice Modal */}
      {selectedInvoiceOrder && (
        <InvoiceModal
          isOpen={true}
          onClose={() => setSelectedInvoiceOrder(null)}
          orderNumber={selectedInvoiceOrder.id}
          orderDate={selectedInvoiceOrder.date}
          customerName={displayName}
          customerAddress={addresses.find((a) => a.isDefault)?.fullAddress || "Levent Mah. Cömert Sok. No: 12"}
          customerCity="Beşiktaş / İstanbul"
          items={[
            {
              name: selectedInvoiceOrder.items,
              quantity: 1,
              price: selectedInvoiceOrder.total,
            },
          ]}
          totalAmount={selectedInvoiceOrder.total}
          paymentMethod="Kredi Kartı / 256-Bit Güvenli Ödeme"
        />
      )}
    </main>
  );
}

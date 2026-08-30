"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Package, MapPin, User, ShieldCheck } from "lucide-react";
import { InvoiceModal } from "@/components/checkout/invoice-modal";
import { OrdersTab, OrderItem } from "@/components/account/orders-tab";
import { AddressesTab, Address } from "@/components/account/addresses-tab";
import { ProfileTab } from "@/components/account/profile-tab";
import { SecurityTab } from "@/components/account/security-tab";
import { playClickSound } from "@/lib/audio/sound-effects";

export default function AccountPage() {
  const [tab, setTab] = useState<"orders" | "addresses" | "profile" | "security">("orders");
  const [name, setName] = useState("Caner Kaya");
  const [email, setEmail] = useState("caner.k@clost.store");
  const [phone, setPhone] = useState("0532 123 45 67");

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
      fullName: "Caner Kaya",
      phone: "0532 123 45 67",
      city: "İstanbul",
      district: "Beşiktaş",
      fullAddress: "Levent Mah. Cömert Sok. No: 12 Daire: 4",
      isDefault: true,
    },
    {
      id: "addr-2",
      title: "Ofis / Stüdyo",
      fullName: "Caner Kaya",
      phone: "0532 123 45 67",
      city: "İstanbul",
      district: "Şişli",
      fullAddress: "Esentepe Mah. Büyükdere Cad. No: 195 K: 8",
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

  return (
    <main className="flex-grow pt-20 pb-16 bg-surface-container-low min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Account Header */}
        <header className="py-6 border-b border-primary mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 bg-surface p-6">
          <div>
            <span className="font-label-mono text-[10px] uppercase text-on-surface-variant block">
              MÜŞTERİ KONTROL PANELİ // KİMLİK DOĞRULANDI
            </span>
            <h1 className="font-headline-sm uppercase text-primary text-xl md:text-2xl">
              Hoş Geldiniz, {name}
            </h1>
            <p className="font-label-mono text-xs text-on-surface-variant mt-1">
              Üyelik E-Postası: {email}
            </p>
          </div>

          <div className="flex gap-2">
            <Link
              href="/collections/all"
              className="bg-primary text-on-primary px-4 py-2 font-label-mono text-xs uppercase hover:bg-surface-variant hover:text-primary border border-primary transition-colors"
            >
              Alışverişe Başla
            </Link>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Navigation Tabs */}
          <aside className="lg:col-span-3">
            <nav className="flex flex-col border border-primary bg-surface divide-y divide-outline-variant font-label-mono text-xs uppercase">
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setTab("orders");
                }}
                className={`p-4 text-left flex items-center gap-3 transition-colors cursor-pointer ${
                  tab === "orders"
                    ? "bg-primary text-on-primary font-bold"
                    : "hover:bg-surface-variant text-primary"
                }`}
              >
                <Package className="w-4 h-4" />
                <span>Siparişlerim</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setTab("addresses");
                }}
                className={`p-4 text-left flex items-center gap-3 transition-colors cursor-pointer ${
                  tab === "addresses"
                    ? "bg-primary text-on-primary font-bold"
                    : "hover:bg-surface-variant text-primary"
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>Adreslerim</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setTab("profile");
                }}
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
                onClick={() => {
                  playClickSound();
                  setTab("security");
                }}
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
          <section className="lg:col-span-9 border border-primary bg-surface p-6">
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
                name={name}
                setName={setName}
                email={email}
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
          customerName={name}
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

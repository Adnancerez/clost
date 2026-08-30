"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Package, ShieldCheck, Mail, KeyRound, MapPin, Plus, Trash2, CheckCircle2, User, Phone, Printer, Award, RefreshCw } from "lucide-react";
import { InvoiceModal } from "@/components/checkout/invoice-modal";
import { useToastStore } from "@/lib/store/useToastStore";
import { useCartStore } from "@/lib/store/useCartStore";
import { MOCK_PRODUCTS } from "@/lib/shopify/mock-data";
import { playAddCartSound } from "@/lib/audio/sound-effects";

interface Address {
  id: string;
  title: string;
  fullName: string;
  phone: string;
  city: string;
  district: string;
  fullAddress: string;
  isDefault: boolean;
}

export default function AccountPage() {
  const [tab, setTab] = useState<"orders" | "addresses" | "profile" | "security">("orders");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [email, setEmail] = useState("caner.k@voidarchive.com");
  const [password, setPassword] = useState("••••••••");
  const [name, setName] = useState("Caner Kaya");
  const [phone, setPhone] = useState("0532 123 45 67");

  // Selected Order for Invoice Modal
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<{
    id: string;
    total: number;
    items: string;
    date: string;
  } | null>(null);

  // Profile Save Feedback
  const [profileSaved, setProfileSaved] = useState(false);

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
      fullAddress: "Maslak Mah. Büyükdere Cad. No: 193 Plaza Kat: 14",
      isDefault: false,
    },
  ]);

  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddrTitle, setNewAddrTitle] = useState("");
  const [newAddrFull, setNewAddrFull] = useState("");
  const [newAddrCity, setNewAddrCity] = useState("İstanbul");
  const [newAddrDistrict, setNewAddrDistrict] = useState("Kadıköy");

  const { addToast } = useToastStore();
  const { addItem, openCart } = useCartStore();

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddrTitle || !newAddrFull) return;

    const newAddress: Address = {
      id: `addr-${addresses.length + 1}`,
      title: newAddrTitle,
      fullName: name,
      phone: phone,
      city: newAddrCity,
      district: newAddrDistrict,
      fullAddress: newAddrFull,
      isDefault: false,
    };

    setAddresses([...addresses, newAddress]);
    setIsAddingAddress(false);
    setNewAddrTitle("");
    setNewAddrFull("");
    addToast({
      title: "Adres Eklendi",
      message: `"${newAddrTitle}" başarıyla kayıtlı adreslerinize eklendi.`,
      type: "success",
    });
  };

  const handleSetDefaultAddress = (id: string) => {
    setAddresses(
      addresses.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }))
    );
    addToast({
      title: "Varsayılan Adres Güncellendi",
      message: "Seçtiğiniz adres varsayılan teslimat adresi olarak ayarlandı.",
      type: "info",
    });
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter((a) => a.id !== id));
    addToast({
      title: "Adres Silindi",
      message: "Adres kayıtlarınızdan kaldırıldı.",
      type: "warning",
    });
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaved(true);
    addToast({
      title: "Profil Güncellendi",
      message: "Kişisel bilgileriniz başarıyla kaydedildi.",
      type: "success",
    });
    setTimeout(() => setProfileSaved(false), 2500);
  };

  const handleReorder = (order: typeof mockOrders[0]) => {
    playAddCartSound();
    const product = MOCK_PRODUCTS[0]; // fallback to top technical piece
    addItem({
      productId: product.id,
      variantId: `${product.id}-reorder-${order.id}`,
      title: order.items.split("(")[0].trim() || product.title,
      handle: product.handle,
      variantTitle: "M / Siyah",
      selectedOptions: [
        { name: "Beden", value: "M" },
        { name: "Renk", value: "Siyah" },
      ],
      price: order.numericTotal,
      image: product.featuredImage?.url || product.images[0]?.url,
    });

    addToast({
      title: "Sipariş Sepete Eklendi",
      message: `${order.id} nolu siparişinizin ürünleri sepete aktarıldı.`,
      type: "success",
      actionLabel: "Sepeti Aç",
      onAction: () => openCart(),
    });
  };

  const mockOrders = [
    {
      id: "ORD-94218-TR",
      date: "24 Ağustos 2026",
      status: "Kargoya Verildi // Dağıtımda",
      total: "4.500 ₺",
      numericTotal: 4500,
      items: "Oversized Teknik Parka V.2 (M / Siyah)",
    },
    {
      id: "ORD-88123-TR",
      date: "11 Temmuz 2026",
      status: "Teslim Edildi",
      total: "1.850 ₺",
      numericTotal: 1850,
      items: "Asimetrik Denim Pantolon (32 / Siyah)",
    },
  ];

  if (!isLoggedIn) {
    return (
      <main className="flex-grow pt-16 flex flex-col justify-center items-center p-6">
        <div className="border border-primary p-8 bg-surface flex flex-col gap-6 max-w-md w-full">
          <div>
            <h1 className="font-headline-sm uppercase text-primary mb-2 text-lg">
              Müşteri Girişi
            </h1>
            <p className="font-label-mono text-xs text-on-surface-variant">
              Siparişlerinizi, kayıtlı adreslerinizi ve kargo durumunuzu takip etmek için giriş yapın.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsLoggedIn(true);
            }}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-1">
              <label className="font-label-mono text-xs uppercase text-primary flex items-center gap-2">
                <Mail className="w-3.5 h-3.5" /> E-posta
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-POSTA ADRESİNİZ"
                className="border border-primary bg-surface p-3 font-label-mono text-xs uppercase text-primary focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-label-mono text-xs uppercase text-primary flex items-center gap-2">
                <KeyRound className="w-3.5 h-3.5" /> Şifre
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="border border-primary bg-surface p-3 font-label-mono text-xs text-primary focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-on-primary h-12 font-label-mono text-xs uppercase tracking-widest hover:bg-surface-variant hover:text-primary border border-primary transition-colors cursor-pointer mt-2"
            >
              Giriş Yap
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-grow pt-16 flex flex-col">
      {/* Header */}
      <header className="p-6 md:p-12 border-b border-primary bg-surface flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <span className="font-label-mono text-xs uppercase text-on-surface-variant block mb-2">
            MÜŞTERİ PORTALI // GÜVENLİ ERİŞİM
          </span>
          <h1 className="font-display-lg-mobile md:font-display-lg uppercase tracking-tighter text-primary">
            HESABIM
          </h1>
          <div className="flex items-center gap-3 font-label-mono text-xs text-on-surface-variant mt-1">
            <span>Kullanıcı: <strong className="text-primary">{name}</strong> ({email})</span>
            <span>•</span>
            <Link
              href="/vip-kulup"
              className="text-primary font-bold hover:underline flex items-center gap-1"
            >
              <Award className="w-3.5 h-3.5" /> VIP Arşiv Kulübü (2.450 VP) ↗
            </Link>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap border border-primary font-label-mono text-xs uppercase">
          <button
            onClick={() => setTab("orders")}
            className={`px-4 py-2.5 transition-colors cursor-pointer ${
              tab === "orders" ? "bg-primary text-on-primary" : "bg-surface hover:bg-surface-variant"
            }`}
          >
            Siparişlerim ({mockOrders.length})
          </button>
          <button
            onClick={() => setTab("addresses")}
            className={`px-4 py-2.5 transition-colors cursor-pointer border-l border-primary ${
              tab === "addresses" ? "bg-primary text-on-primary" : "bg-surface hover:bg-surface-variant"
            }`}
          >
            Adreslerim ({addresses.length})
          </button>
          <button
            onClick={() => setTab("profile")}
            className={`px-4 py-2.5 transition-colors cursor-pointer border-l border-primary ${
              tab === "profile" ? "bg-primary text-on-primary" : "bg-surface hover:bg-surface-variant"
            }`}
          >
            Profil Bilgileri
          </button>
          <button
            onClick={() => setTab("security")}
            className={`px-4 py-2.5 transition-colors cursor-pointer border-l border-primary ${
              tab === "security" ? "bg-primary text-on-primary" : "bg-surface hover:bg-surface-variant"
            }`}
          >
            Güvenlik
          </button>
        </div>
      </header>

      {/* Main Tab Content Area */}
      <div className="flex-1 p-6 md:p-12 max-w-5xl mx-auto w-full">
        {/* Tab 1: Orders */}
        {tab === "orders" && (
          <div className="flex flex-col gap-6">
            <h2 className="font-headline-sm uppercase text-primary flex items-center gap-2 text-lg">
              <Package className="w-5 h-5" /> Sipariş Geçmişi &amp; Kargo Durumu
            </h2>

            <div className="flex flex-col divide-y divide-primary border border-primary bg-surface">
              {mockOrders.map((order) => (
                <div key={order.id} className="p-6 flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-label-mono text-sm font-bold text-primary">
                        {order.id}
                      </span>
                      <span className="font-label-mono text-[10px] uppercase bg-surface-variant px-2 py-0.5 border border-primary">
                        {order.status}
                      </span>
                    </div>
                    <p className="font-body-md text-sm text-primary">{order.items}</p>
                    <span className="font-label-mono text-xs text-on-surface-variant mt-1 block">
                      Tarih: {order.date}
                    </span>
                  </div>

                  <div className="flex md:flex-col justify-between items-end gap-2">
                    <span className="font-price-lg text-primary">{order.total}</span>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleReorder(order)}
                        className="border border-primary bg-surface px-3 py-1.5 font-label-mono text-xs uppercase hover:bg-primary hover:text-on-primary transition-colors cursor-pointer flex items-center gap-1 font-bold"
                      >
                        <RefreshCw className="w-3.5 h-3.5" /> Tekrar Sipariş Ver
                      </button>
                      <button
                        onClick={() =>
                          setSelectedInvoiceOrder({
                            id: order.id,
                            total: order.numericTotal,
                            items: order.items,
                            date: order.date,
                          })
                        }
                        className="border border-primary px-3 py-1.5 font-label-mono text-xs uppercase hover:bg-surface-variant transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <Printer className="w-3.5 h-3.5" /> Fatura
                      </button>
                      <Link
                        href="/kargo-takip"
                        className="border border-primary bg-primary text-on-primary px-4 py-1.5 font-label-mono text-xs uppercase hover:bg-surface-variant hover:text-primary transition-colors cursor-pointer"
                      >
                        Kargo Takibi
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Addresses */}
        {tab === "addresses" && (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h2 className="font-headline-sm uppercase text-primary flex items-center gap-2 text-lg">
                <MapPin className="w-5 h-5" /> Kayıtlı Teslimat Adreslerim
              </h2>
              <button
                onClick={() => setIsAddingAddress(!isAddingAddress)}
                className="flex items-center gap-1.5 border border-primary px-4 py-2 font-label-mono text-xs uppercase bg-primary text-on-primary hover:bg-surface-variant hover:text-primary transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" /> {isAddingAddress ? "İptal" : "Yeni Adres Ekle"}
              </button>
            </div>

            {/* Add Address Form */}
            {isAddingAddress && (
              <form
                onSubmit={handleAddAddress}
                className="border border-primary p-6 bg-surface-container-low flex flex-col gap-4 animate-in fade-in"
              >
                <h3 className="font-body-md font-bold uppercase text-primary text-sm">
                  Yeni Teslimat Adresi
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="font-label-mono text-xs uppercase text-primary">Adres Başlığı *</label>
                    <input
                      type="text"
                      required
                      value={newAddrTitle}
                      onChange={(e) => setNewAddrTitle(e.target.value)}
                      placeholder="Örn: Evim, Yazlık, Atölye"
                      className="border border-primary bg-surface p-2.5 font-label-mono text-xs text-primary focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-label-mono text-xs uppercase text-primary">İl *</label>
                    <input
                      type="text"
                      required
                      value={newAddrCity}
                      onChange={(e) => setNewAddrCity(e.target.value)}
                      className="border border-primary bg-surface p-2.5 font-label-mono text-xs text-primary focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-label-mono text-xs uppercase text-primary">İlçe *</label>
                    <input
                      type="text"
                      required
                      value={newAddrDistrict}
                      onChange={(e) => setNewAddrDistrict(e.target.value)}
                      className="border border-primary bg-surface p-2.5 font-label-mono text-xs text-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-label-mono text-xs uppercase text-primary">Açık Adres *</label>
                  <textarea
                    required
                    rows={2}
                    value={newAddrFull}
                    onChange={(e) => setNewAddrFull(e.target.value)}
                    placeholder="Mahalle, cadde, bina no, daire..."
                    className="border border-primary bg-surface p-2.5 font-body-md text-sm text-primary focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="self-start bg-primary text-on-primary px-8 py-3 font-label-mono text-xs uppercase hover:bg-surface-variant hover:text-primary border border-primary transition-colors cursor-pointer"
                >
                  Adresi Kaydet
                </button>
              </form>
            )}

            {/* Address Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  className={`p-6 border flex flex-col justify-between gap-4 bg-surface ${
                    addr.isDefault ? "border-2 border-primary" : "border-primary"
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-body-md font-bold uppercase text-primary text-sm">
                        {addr.title}
                      </span>
                      {addr.isDefault && (
                        <span className="font-label-mono text-[10px] uppercase bg-primary text-on-primary px-2 py-0.5">
                          Varsayılan
                        </span>
                      )}
                    </div>
                    <p className="font-body-md text-xs text-primary">{addr.fullName}</p>
                    <p className="font-body-md text-xs text-on-surface-variant mt-1 leading-relaxed">
                      {addr.fullAddress}
                    </p>
                    <p className="font-body-md text-xs text-primary font-bold mt-1">
                      {addr.district} / {addr.city}
                    </p>
                  </div>

                  <div className="flex justify-between items-center border-t border-outline-variant pt-3 font-label-mono text-xs">
                    {!addr.isDefault ? (
                      <button
                        onClick={() => handleSetDefaultAddress(addr.id)}
                        className="text-primary underline hover:opacity-70 cursor-pointer"
                      >
                        Varsayılan Yap
                      </button>
                    ) : (
                      <span className="text-on-surface-variant text-[11px]">Teslimatlarda kullanılır</span>
                    )}

                    <button
                      onClick={() => handleDeleteAddress(addr.id)}
                      className="text-outline hover:text-primary cursor-pointer p-1"
                      aria-label="Adresi sil"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Profile */}
        {tab === "profile" && (
          <div className="border border-primary p-6 md:p-8 bg-surface flex flex-col gap-6 max-w-xl w-full">
            <h2 className="font-headline-sm uppercase text-primary flex items-center gap-2 text-lg">
              <User className="w-5 h-5" /> Profil Bilgileri
            </h2>

            {profileSaved && (
              <p className="font-label-mono text-xs text-primary border border-primary p-3 bg-surface-container-low flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" /> Bilgileriniz başarıyla güncellendi.
              </p>
            )}

            <form onSubmit={handleSaveProfile} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-label-mono text-xs uppercase text-primary">Ad Soyad</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border border-primary bg-surface p-3 font-label-mono text-xs text-primary focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-mono text-xs uppercase text-primary flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> E-Posta Adresi
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-primary bg-surface p-3 font-label-mono text-xs text-primary focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-mono text-xs uppercase text-primary flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" /> Telefon Numarası
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="border border-primary bg-surface p-3 font-label-mono text-xs text-primary focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="self-start bg-primary text-on-primary font-label-mono text-xs px-8 py-3.5 uppercase tracking-widest hover:bg-surface-variant hover:text-primary border border-primary transition-colors cursor-pointer mt-2"
              >
                Bilgileri Güncelle
              </button>
            </form>
          </div>
        )}

        {/* Tab 4: Security */}
        {tab === "security" && (
          <div className="border border-primary p-6 md:p-8 bg-surface flex flex-col gap-6 max-w-xl w-full">
            <h2 className="font-headline-sm uppercase text-primary flex items-center gap-2 text-lg">
              <ShieldCheck className="w-5 h-5" /> Güvenlik &amp; Şifre Değiştirme
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Şifreniz başarıyla güncellendi.");
              }}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-1">
                <label className="font-label-mono text-xs uppercase text-primary">Mevcut Şifre</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="border border-primary bg-surface p-3 font-label-mono text-xs text-primary focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-mono text-xs uppercase text-primary">Yeni Şifre</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="border border-primary bg-surface p-3 font-label-mono text-xs text-primary focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-mono text-xs uppercase text-primary">Yeni Şifre (Tekrar)</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="border border-primary bg-surface p-3 font-label-mono text-xs text-primary focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="self-start bg-primary text-on-primary font-label-mono text-xs px-8 py-3.5 uppercase tracking-widest hover:bg-surface-variant hover:text-primary border border-primary transition-colors cursor-pointer mt-2"
              >
                Şifreyi Değiştir
              </button>
            </form>

            <div className="border-t border-outline-variant pt-4 mt-2">
              <button
                onClick={() => setIsLoggedIn(false)}
                className="text-red-600 font-label-mono text-xs uppercase underline hover:opacity-70 cursor-pointer"
              >
                Oturumu Kapat (Çıkış Yap)
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Invoice Modal */}
      {selectedInvoiceOrder && (
        <InvoiceModal
          isOpen={!!selectedInvoiceOrder}
          onClose={() => setSelectedInvoiceOrder(null)}
          orderNumber={selectedInvoiceOrder.id}
          orderDate={selectedInvoiceOrder.date}
          customerName={name}
          totalAmount={selectedInvoiceOrder.total}
          items={[
            {
              name: selectedInvoiceOrder.items,
              quantity: 1,
              price: selectedInvoiceOrder.total,
            },
          ]}
        />
      )}
    </main>
  );
}

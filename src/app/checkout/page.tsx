"use client";

import React, { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck, Truck, CreditCard, Landmark, PackageCheck, ArrowRight, Tag, Gift } from "lucide-react";
import { useCartStore } from "@/lib/store/useCartStore";

const emptySubscribe = () => () => {};

export default function CheckoutPage() {
  const router = useRouter();
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const { items, getSubtotal, clearCart } = useCartStore();

  // Form State
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("İstanbul");
  const [district, setDistrict] = useState("Beşiktaş");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");

  // Gift options
  const [isGift, setIsGift] = useState(false);
  const [giftNote, setGiftNote] = useState("");

  // Shipping & Payment
  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">("standard");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "bank" | "cod">("card");

  // Card details
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  // Coupon
  const [couponInput, setCouponInput] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");

  const [isProcessing, setIsProcessing] = useState(false);

  if (!isMounted) return null;

  const subtotal = getSubtotal();
  const isFreeShipping = subtotal >= 1500;
  const shippingCost = shippingMethod === "express" ? 150 : isFreeShipping ? 0 : 60;
  const discountAmount = (subtotal * discountPercent) / 100;
  const total = Math.max(0, subtotal - discountAmount + shippingCost);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponInput.trim().toUpperCase();
    if (code === "CLOST10" || code === "VOID10" || code === "HOSGELDIN10") {
      setDiscountPercent(10);
      setCouponApplied(true);
      setCouponError("");
    } else if (code === "CLOST15" || code === "VOID15") {
      setDiscountPercent(15);
      setCouponApplied(true);
      setCouponError("");
    } else if (code === "CLOST20" || code === "VOID20") {
      setDiscountPercent(20);
      setCouponApplied(true);
      setCouponError("");
    } else {
      setCouponError("Geçersiz kupon kodu. Deneyin: CLOST10 veya HOSGELDIN10");
    }
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsProcessing(true);

    const generatedOrderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}-TR`;

    setTimeout(() => {
      clearCart();
      const queryParams = new URLSearchParams({
        orderId: generatedOrderId,
        total: total.toString(),
        name: `${firstName} ${lastName}`,
        isGift: isGift ? "true" : "false",
        giftNote: giftNote,
      });
      router.push(`/checkout/success?${queryParams.toString()}`);
    }, 1200);
  };

  if (items.length === 0) {
    return (
      <main className="flex-grow pt-24 pb-16 px-4 md:px-10 max-w-4xl mx-auto text-center flex flex-col items-center justify-center gap-6">
        <h1 className="font-headline-md uppercase text-primary">Sepetinizde Ürün Bulunmuyor</h1>
        <p className="font-label-mono text-xs uppercase text-on-surface-variant max-w-md">
          Ödeme adımına geçebilmek için lütfen sepetinize en az bir ürün ekleyin.
        </p>
        <Link
          href="/collections/all"
          className="bg-primary text-on-primary font-label-mono text-xs px-8 py-4 uppercase tracking-widest hover:bg-surface-variant hover:text-primary border border-primary transition-colors"
        >
          Koleksiyona Göz At
        </Link>
      </main>
    );
  }

  return (
    <main className="flex-grow pt-16 flex flex-col">
      {/* Header */}
      <header className="p-6 md:p-10 border-b border-primary bg-surface flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <span className="font-label-mono text-xs uppercase text-on-surface-variant block mb-1">
            GÜVENLİ ÖDEME PROTOKOLÜ // 256-BIT SSL
          </span>
          <h1 className="font-display-lg-mobile md:font-display-lg uppercase tracking-tighter text-primary">
            SİPARİŞİ TAMAMLA
          </h1>
        </div>
        <div className="flex items-center gap-2 font-label-mono text-xs text-primary">
          <ShieldCheck className="w-4 h-4 text-primary" />
          <span>Şifrelenmiş Güvenli Ödeme</span>
        </div>
      </header>

      {/* Checkout Content Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-primary max-w-[1920px] mx-auto w-full">
        {/* Left Column: Forms */}
        <form onSubmit={handleCompleteOrder} className="lg:col-span-7 p-6 md:p-12 flex flex-col gap-10 bg-surface">
          {/* 1. İletişim Bilgileri */}
          <div className="flex flex-col gap-4">
            <h2 className="font-headline-sm uppercase text-primary text-lg border-b border-primary pb-2">
              1. İletişim Bilgileri
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-label-mono text-xs uppercase text-primary">E-Posta Adresi *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="adiniz@domain.com"
                  className="border border-primary bg-surface p-3 font-label-mono text-xs text-primary focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-label-mono text-xs uppercase text-primary">Telefon Numarası *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="05XX XXX XX XX"
                  className="border border-primary bg-surface p-3 font-label-mono text-xs text-primary focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* 2. Teslimat Adresi */}
          <div className="flex flex-col gap-4">
            <h2 className="font-headline-sm uppercase text-primary text-lg border-b border-primary pb-2">
              2. Teslimat Adresi
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-label-mono text-xs uppercase text-primary">Ad *</label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Adınız"
                  className="border border-primary bg-surface p-3 font-label-mono text-xs text-primary focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-label-mono text-xs uppercase text-primary">Soyad *</label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Soyadınız"
                  className="border border-primary bg-surface p-3 font-label-mono text-xs text-primary focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-mono text-xs uppercase text-primary">İl *</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="İstanbul"
                  className="border border-primary bg-surface p-3 font-label-mono text-xs text-primary focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-label-mono text-xs uppercase text-primary">İlçe *</label>
                <input
                  type="text"
                  required
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder="Beşiktaş"
                  className="border border-primary bg-surface p-3 font-label-mono text-xs text-primary focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2 flex flex-col gap-1">
                <label className="font-label-mono text-xs uppercase text-primary">Açık Adres (Mahalle, Cadde, No, Daire) *</label>
                <textarea
                  required
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Levent Mah. Cömert Sok. No: 12 D: 4"
                  className="border border-primary bg-surface p-3 font-body-md text-sm text-primary focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-mono text-xs uppercase text-primary">Posta Kodu</label>
                <input
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="34330"
                  className="border border-primary bg-surface p-3 font-label-mono text-xs text-primary focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* 3. Kargo Seçimi */}
          <div className="flex flex-col gap-4">
            <h2 className="font-headline-sm uppercase text-primary text-lg border-b border-primary pb-2">
              3. Kargo Yöntemi
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label
                className={`p-4 border flex items-start gap-3 cursor-pointer transition-colors ${
                  shippingMethod === "standard"
                    ? "border-primary bg-surface-container-low"
                    : "border-outline-variant bg-surface"
                }`}
              >
                <input
                  type="radio"
                  name="shipping"
                  checked={shippingMethod === "standard"}
                  onChange={() => setShippingMethod("standard")}
                  className="mt-1 accent-black cursor-pointer"
                />
                <div>
                  <span className="font-body-md font-bold text-sm uppercase text-primary block">
                    Yurtiçi Kargo (Standart)
                  </span>
                  <span className="font-label-mono text-xs text-on-surface-variant block mt-0.5">
                    1-3 İş Günü Teslimat
                  </span>
                  <span className="font-price-lg text-xs text-primary font-bold mt-1 block">
                    {isFreeShipping ? "ÜCRETSİZ" : "60 ₺"}
                  </span>
                </div>
              </label>

              <label
                className={`p-4 border flex items-start gap-3 cursor-pointer transition-colors ${
                  shippingMethod === "express"
                    ? "border-primary bg-surface-container-low"
                    : "border-outline-variant bg-surface"
                }`}
              >
                <input
                  type="radio"
                  name="shipping"
                  checked={shippingMethod === "express"}
                  onChange={() => setShippingMethod("express")}
                  className="mt-1 accent-black cursor-pointer"
                />
                <div>
                  <span className="font-body-md font-bold text-sm uppercase text-primary block">
                    Express Kurye (Aynı Gün)
                  </span>
                  <span className="font-label-mono text-xs text-on-surface-variant block mt-0.5">
                    İstanbul İçi 24 Saat
                  </span>
                  <span className="font-price-lg text-xs text-primary font-bold mt-1 block">
                    150 ₺
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* 4. Hediye Paketi & Özel Not */}
          <div className="flex flex-col gap-4 border border-primary p-6 bg-surface-container-low">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="giftOption"
                checked={isGift}
                onChange={(e) => setIsGift(e.target.checked)}
                className="w-4 h-4 accent-black cursor-pointer"
              />
              <label htmlFor="giftOption" className="font-body-md font-bold text-sm uppercase text-primary flex items-center gap-2 cursor-pointer select-none">
                <Gift className="w-4 h-4 text-primary" /> Özel Brutalist Hediye Paketi Ekle (Ücretsiz)
              </label>
            </div>

            {isGift && (
              <div className="flex flex-col gap-2 pt-2 animate-in fade-in">
                <label className="font-label-mono text-xs uppercase text-primary">Hediye Kartı Notu</label>
                <textarea
                  rows={2}
                  value={giftNote}
                  onChange={(e) => setGiftNote(e.target.value)}
                  placeholder="Hediye kartına yazılmasını istediğiniz özel mesaj..."
                  className="border border-primary bg-surface p-3 font-body-md text-sm text-primary focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* 5. Ödeme Yöntemi */}
          <div className="flex flex-col gap-4">
            <h2 className="font-headline-sm uppercase text-primary text-lg border-b border-primary pb-2">
              5. Ödeme Yöntemi
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 border border-primary p-1 bg-surface-container-low">
              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`p-3 font-label-mono text-xs uppercase flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                  paymentMethod === "card"
                    ? "bg-primary text-on-primary"
                    : "bg-surface text-primary hover:bg-surface-variant"
                }`}
              >
                <CreditCard className="w-4 h-4" /> Kredi Kartı
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("bank")}
                className={`p-3 font-label-mono text-xs uppercase flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                  paymentMethod === "bank"
                    ? "bg-primary text-on-primary"
                    : "bg-surface text-primary hover:bg-surface-variant"
                }`}
              >
                <Landmark className="w-4 h-4" /> Havale / EFT
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("cod")}
                className={`p-3 font-label-mono text-xs uppercase flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                  paymentMethod === "cod"
                    ? "bg-primary text-on-primary"
                    : "bg-surface text-primary hover:bg-surface-variant"
                }`}
              >
                <Truck className="w-4 h-4" /> Kapıda Ödeme
              </button>
            </div>

            {/* Credit Card Input Form */}
            {paymentMethod === "card" && (
              <div className="p-6 border border-primary bg-surface flex flex-col gap-4 animate-in fade-in">
                <div className="flex flex-col gap-1">
                  <label className="font-label-mono text-xs uppercase text-primary">Kart Numarası *</label>
                  <input
                    type="text"
                    required
                    maxLength={19}
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="XXXX XXXX XXXX XXXX"
                    className="border border-primary bg-surface p-3 font-label-mono text-xs text-primary focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-label-mono text-xs uppercase text-primary">Kart Üzerindeki İsim *</label>
                  <input
                    type="text"
                    required
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    placeholder="AD SOYAD"
                    className="border border-primary bg-surface p-3 font-label-mono text-xs uppercase text-primary focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="font-label-mono text-xs uppercase text-primary">Son Kullanma (AA/YY) *</label>
                    <input
                      type="text"
                      required
                      maxLength={5}
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="12/28"
                      className="border border-primary bg-surface p-3 font-label-mono text-xs text-primary focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-label-mono text-xs uppercase text-primary">CVV / Güvenlik Kodu *</label>
                    <input
                      type="text"
                      required
                      maxLength={4}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      placeholder="XXX"
                      className="border border-primary bg-surface p-3 font-label-mono text-xs text-primary focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "bank" && (
              <div className="p-6 border border-primary bg-surface font-label-mono text-xs leading-relaxed text-on-surface flex flex-col gap-2">
                <span className="font-bold text-primary uppercase">Banka Hesap Bilgileri:</span>
                <p>Alıcı: CLOST TEKSTİL A.Ş.</p>
                <p>Banka: Garanti BBVA</p>
                <p className="font-bold">IBAN: TR42 0006 2000 0001 2345 6789 01</p>
                <p className="text-on-surface-variant text-[11px] mt-2">
                  * Lütfen havale açıklama kısmına sipariş numaranızı yazınız.
                </p>
              </div>
            )}

            {paymentMethod === "cod" && (
              <div className="p-6 border border-primary bg-surface font-label-mono text-xs text-on-surface">
                <p>Teslimat anında kapıda nakit veya kredi kartı ile güvenle ödeme yapabilirsiniz.</p>
                <p className="text-on-surface-variant text-[11px] mt-1">Hizmet bedeli: 30 ₺ sipariş tutarına eklenecektir.</p>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full bg-primary text-on-primary h-16 flex items-center justify-center font-label-mono uppercase tracking-widest hover:bg-surface-variant hover:text-primary border border-primary transition-colors cursor-pointer disabled:opacity-50 text-sm"
          >
            {isProcessing ? "Siparişiniz İşleniyor..." : `Siparişi Onayla & Öde (${total.toLocaleString("tr-TR")} ₺)`}
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </form>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5 p-6 md:p-12 bg-surface-container-low flex flex-col gap-8">
          <div className="flex justify-between items-center border-b border-primary pb-4">
            <h2 className="font-headline-sm uppercase text-primary text-lg">
              Sipariş Özeti ({items.length} Ürün)
            </h2>
            <Link
              href="/collections/all"
              className="font-label-mono text-xs text-on-surface-variant hover:text-primary underline uppercase"
            >
              Düzenle
            </Link>
          </div>

          {/* Items List */}
          <div className="flex flex-col gap-4 divide-y divide-outline-variant max-h-96 overflow-y-auto no-scrollbar pr-1">
            {items.map((item) => (
              <div key={item.variantId} className="flex gap-4 pt-4 first:pt-0">
                <div className="w-16 h-20 flex-shrink-0 bg-surface-variant border border-outline-variant relative overflow-hidden">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="64px"
                      className="object-cover grayscale"
                    />
                  ) : null}
                  <span className="absolute top-0 right-0 bg-primary text-on-primary font-label-mono text-[9px] w-4 h-4 flex items-center justify-center">
                    {item.quantity}
                  </span>
                </div>

                <div className="flex-1 flex flex-col justify-between py-0.5">
                  <div>
                    <h3 className="font-body-md font-bold uppercase text-primary text-xs line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="font-label-mono text-xs text-on-surface-variant mt-0.5">
                      {item.variantTitle}
                    </p>
                  </div>
                  <span className="font-price-lg text-xs text-primary">
                    {(item.price * item.quantity).toLocaleString("tr-TR")} ₺
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Coupon Input Form */}
          <form onSubmit={handleApplyCoupon} className="flex flex-col gap-2 border-t border-b border-primary py-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-4 h-4 text-outline absolute left-3 top-3" />
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="İNDİRİM KUPONU (CLOST10)"
                  className="w-full border border-primary bg-surface pl-9 pr-3 py-2.5 font-label-mono text-xs uppercase text-primary focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="bg-primary text-on-primary px-6 font-label-mono text-xs uppercase hover:bg-surface-variant hover:text-primary border border-primary transition-colors cursor-pointer"
              >
                Uygula
              </button>
            </div>
            {couponApplied && (
              <p className="font-label-mono text-xs text-primary">
                ✓ %{discountPercent} indirim kuponu uygulandı.
              </p>
            )}
            {couponError && (
              <p className="font-label-mono text-xs text-red-600">
                {couponError}
              </p>
            )}
          </form>

          {/* Cost Breakdown */}
          <div className="flex flex-col gap-3 font-label-mono text-xs text-on-surface border-b border-primary pb-6">
            <div className="flex justify-between">
              <span>Ara Toplam</span>
              <span>{subtotal.toLocaleString("tr-TR")} ₺</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-primary font-bold">
                <span>İndirim Tutarı</span>
                <span>-{discountAmount.toLocaleString("tr-TR")} ₺</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Kargo Ücreti</span>
              <span>{shippingCost === 0 ? "ÜCRETSİZ" : `${shippingCost} ₺`}</span>
            </div>
            <div className="flex justify-between text-on-surface-variant text-[11px]">
              <span>KDV (%20)</span>
              <span>Dahil</span>
            </div>
          </div>

          {/* Total Amount */}
          <div className="flex justify-between items-baseline">
            <span className="font-body-lg uppercase font-bold text-primary text-base">
              Toplam Tutar
            </span>
            <span className="font-price-lg text-primary text-2xl font-bold">
              {total.toLocaleString("tr-TR")} ₺
            </span>
          </div>

          <div className="flex items-center gap-2 text-on-surface-variant text-[11px] font-label-mono mt-auto">
            <PackageCheck className="w-4 h-4 text-primary flex-shrink-0" />
            <span>Siparişiniz Yurtiçi Kargo güvencesiyle aynı gün kargolanır.</span>
          </div>
        </div>
      </div>
    </main>
  );
}

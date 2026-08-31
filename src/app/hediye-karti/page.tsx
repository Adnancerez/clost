"use client";

import React, { useState } from "react";
import { Gift, ShoppingBag, ShieldCheck } from "lucide-react";
import { useCartStore } from "@/lib/store/useCartStore";

export default function GiftCardPage() {
  const { addItem, openCart } = useCartStore();
  const [amount, setAmount] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [senderName, setSenderName] = useState("");
  const [giftMessage, setGiftMessage] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const predefinedAmounts = [500, 1000, 2500, 5000];

  const currentAmount = customAmount ? parseFloat(customAmount) || 0 : amount;

  const handleAddToCart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentAmount || currentAmount < 100) {
      alert("Lütfen en az 100 ₺ tutarında bir hediye çeki tutarı belirleyin.");
      return;
    }
    if (!recipientEmail || !recipientName) {
      alert("Lütfen alıcı adı ve e-posta adresini giriniz.");
      return;
    }

    setIsAdding(true);

    const giftCardId = `gift-card-${currentAmount}-${Date.now()}`;

    addItem({
      productId: "prod_gift_card",
      variantId: giftCardId,
      title: `CLOST Dijital Hediye Kartı (${currentAmount.toLocaleString("tr-TR")} ₺)`,
      handle: "hediye-karti",
      variantTitle: `Alıcı: ${recipientName}`,
      selectedOptions: [
        { name: "Tutar", value: `${currentAmount} ₺` },
        { name: "Alıcı", value: recipientName },
      ],
      price: currentAmount,
      image: "/products/sloid-unicorn-zip-hoodie.jpg",
      sku: "CLOST-GIFT-PASS",
    });

    setTimeout(() => {
      setIsAdding(false);
    }, 400);
  };

  return (
    <main className="flex-grow flex flex-col">
      {/* Header */}
      <header className="p-6 md:p-12 border-b border-primary bg-surface flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <span className="font-label-mono text-xs uppercase text-on-surface-variant block mb-2">
            DİJİTAL ARŞİV PASAPORTU // E-HEDİYE ÇEKİ
          </span>
          <h1 className="font-display-lg-mobile md:font-display-lg uppercase tracking-tighter text-primary">
            DİJİTAL HEDİYE KARTI
          </h1>
        </div>
        <p className="font-label-mono text-xs uppercase text-on-surface-variant max-w-xs">
          Tüm koleksiyonda sınırsız geçerli dijital arşiv hediye kartı oluşturun.
        </p>
      </header>

      {/* Main Builder Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-primary max-w-[1920px] mx-auto w-full">
        {/* Left: Live Visual Gift Card Preview */}
        <div className="lg:col-span-6 p-6 md:p-16 bg-surface-container-low flex flex-col items-center justify-center gap-8">
          <div className="w-full max-w-md aspect-[1.6/1] border-2 border-primary bg-primary text-on-primary p-6 md:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden select-none">
            {/* Background Aesthetic Watermark */}
            <div className="absolute -right-8 -bottom-8 font-display-lg text-8xl text-white/5 font-bold pointer-events-none">
              CLOST
            </div>

            <div className="flex justify-between items-start z-10">
              <div>
                <span className="font-label-mono text-[10px] tracking-widest uppercase opacity-80 block">
                  CLOST // DIGITAL GIFT CARD
                </span>
                <span className="font-headline-sm uppercase text-lg font-bold tracking-tight">
                  ARŞİV PASAPORTU
                </span>
              </div>
              <Gift className="w-6 h-6 text-white" />
            </div>

            <div className="z-10 my-auto">
              <span className="font-label-mono text-[11px] uppercase opacity-70 block">
                BAKİYE DEĞERİ
              </span>
              <span className="font-price-lg text-3xl md:text-4xl font-bold tracking-tight">
                {currentAmount.toLocaleString("tr-TR")} ₺
              </span>
            </div>

            <div className="flex justify-between items-end border-t border-white/20 pt-3 z-10 font-label-mono text-[11px]">
              <div>
                <span className="opacity-70 block text-[9px] uppercase">ALICI:</span>
                <span className="font-bold uppercase truncate max-w-[160px] block">
                  {recipientName || "ALICI ADI"}
                </span>
              </div>
              <div className="text-right">
                <span className="opacity-70 block text-[9px] uppercase">KOD ŞABLONU:</span>
                <span className="font-mono text-white/90">VA-GC-••••-••••</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 font-label-mono text-xs text-on-surface-variant max-w-md text-center">
            <ShieldCheck className="w-4 h-4 text-primary flex-shrink-0" />
            <span>
              Dijital kart, sipariş tamamlandıktan hemen sonra alıcının e-posta adresine özel aktivasyon kodu ile teslim edilir.
            </span>
          </div>
        </div>

        {/* Right: Customizer Form */}
        <div className="lg:col-span-6 p-6 md:p-12 bg-surface flex flex-col gap-8">
          <div>
            <h2 className="font-headline-sm uppercase text-primary text-xl">
              Hediye Kartı Detayları
            </h2>
            <p className="font-label-mono text-xs text-on-surface-variant mt-1">
              Tutarı belirleyin ve alıcı bilgilerini girin.
            </p>
          </div>

          <form onSubmit={handleAddToCart} className="flex flex-col gap-6">
            {/* Amount Selection */}
            <div className="flex flex-col gap-2">
              <label className="font-label-mono text-xs uppercase text-primary font-bold">
                Kart Tutarı Seçin *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {predefinedAmounts.map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => {
                      setAmount(val);
                      setCustomAmount("");
                    }}
                    className={`py-3.5 border font-label-mono text-xs uppercase cursor-pointer transition-colors ${
                      amount === val && !customAmount
                        ? "bg-primary text-on-primary border-primary"
                        : "bg-surface text-primary border-primary hover:bg-surface-variant"
                    }`}
                  >
                    {val.toLocaleString("tr-TR")} ₺
                  </button>
                ))}
              </div>

              {/* Custom Amount */}
              <div className="mt-2">
                <input
                  type="number"
                  min={100}
                  step={50}
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                  }}
                  placeholder="FARKLI BİR TUTAR GİRİN (TL)"
                  className="w-full border border-primary bg-surface p-3 font-label-mono text-xs uppercase text-primary focus:outline-none"
                />
              </div>
            </div>

            {/* Recipient Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-outline-variant pt-4">
              <div className="flex flex-col gap-1">
                <label className="font-label-mono text-xs uppercase text-primary">Alıcı Adı Soyadı *</label>
                <input
                  type="text"
                  required
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="Hediyenin İletileceği Kişi"
                  className="border border-primary bg-surface p-3 font-label-mono text-xs text-primary focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-label-mono text-xs uppercase text-primary">Alıcı E-Posta Adresi *</label>
                <input
                  type="email"
                  required
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  placeholder="alici@domain.com"
                  className="border border-primary bg-surface p-3 font-label-mono text-xs text-primary focus:outline-none"
                />
              </div>
            </div>

            {/* Sender & Note */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-label-mono text-xs uppercase text-primary">Gönderen Adı</label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Adınız"
                  className="border border-primary bg-surface p-3 font-label-mono text-xs text-primary focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-label-mono text-xs uppercase text-primary">Özel Hediye Mesajı</label>
                <input
                  type="text"
                  value={giftMessage}
                  onChange={(e) => setGiftMessage(e.target.value)}
                  placeholder="Doğum günün kutlu olsun!"
                  className="border border-primary bg-surface p-3 font-label-mono text-xs text-primary focus:outline-none"
                />
              </div>
            </div>

            {/* Action */}
            <button
              type="submit"
              disabled={isAdding}
              className="w-full bg-primary text-on-primary h-14 flex items-center justify-center font-label-mono uppercase tracking-widest hover:bg-surface-variant hover:text-primary border border-primary transition-colors cursor-pointer text-xs gap-2 mt-2"
            >
              <ShoppingBag className="w-4 h-4" />
              {isAdding ? "Sepete Ekleniyor..." : `Hediye Kartını Sepete Ekle (${currentAmount.toLocaleString("tr-TR")} ₺)`}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

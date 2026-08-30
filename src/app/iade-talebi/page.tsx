"use client";

import React, { useState } from "react";
import Link from "next/link";
import { RotateCcw, PackageCheck, Copy, Check, ShieldCheck } from "lucide-react";
import { playClickSound } from "@/lib/audio/sound-effects";

export default function ReturnsPortalPage() {
  const [orderNumber, setOrderNumber] = useState("ORD-94218-TR");
  const [email, setEmail] = useState("caner.k@voidarchive.com");
  const [isSearched, setIsSearched] = useState(false);

  // Return request form state
  const [actionType, setActionType] = useState<"refund" | "exchange">("exchange");
  const [targetSize, setTargetSize] = useState("L");
  const [reason, setReason] = useState("Beden Uygunsuzluğu (Küçük Geldi)");
  const [notes, setNotes] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [copied, setCopied] = useState(false);

  const returnCode = "VOID-IADE-84920";

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderNumber && email) {
      playClickSound();
      setIsSearched(true);
    }
  };

  const handleSubmitReturn = (e: React.FormEvent) => {
    e.preventDefault();
    playClickSound();
    setIsCompleted(true);
  };

  const handleCopyCode = () => {
    playClickSound();
    navigator.clipboard.writeText(returnCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="flex-grow pt-16 flex flex-col">
      {/* Header */}
      <header className="p-6 md:p-12 border-b border-primary bg-surface flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <span className="font-label-mono text-xs uppercase text-on-surface-variant block mb-2">
            MÜŞTERİ HİZMETLERİ // 14 GÜN KOŞULSUZ DEĞİŞİM &amp; İADE
          </span>
          <h1 className="font-display-lg-mobile md:font-display-lg uppercase tracking-tighter text-primary">
            İADE &amp; DEĞİŞİM PORTALI
          </h1>
        </div>
        <p className="font-label-mono text-xs uppercase text-on-surface-variant max-w-xs">
          Siparişiniz için saniyeler içinde ücretsiz Yurtiçi Kargo iade kodu oluşturun.
        </p>
      </header>

      {/* Main Container */}
      <div className="flex-1 p-6 md:p-12 max-w-4xl mx-auto w-full flex flex-col gap-8">
        {!isSearched ? (
          /* Step 1: Order Lookup */
          <div className="border border-primary bg-surface p-6 md:p-10 flex flex-col gap-6">
            <div>
              <h2 className="font-headline-sm uppercase text-primary text-xl">
                Siparişinizi Sorgulayın
              </h2>
              <p className="font-label-mono text-xs text-on-surface-variant mt-1">
                İade veya değişim başlatmak için sipariş numaranızı ve e-posta adresinizi girin.
              </p>
            </div>

            <form onSubmit={handleSearch} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="font-label-mono text-xs uppercase text-primary">Sipariş Numarası *</label>
                  <input
                    type="text"
                    required
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    placeholder="Örn: ORD-94218-TR"
                    className="border border-primary bg-surface p-3 font-label-mono text-xs text-primary uppercase focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-label-mono text-xs uppercase text-primary">E-Posta Adresi *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ornek@domain.com"
                    className="border border-primary bg-surface p-3 font-label-mono text-xs text-primary focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-primary text-on-primary h-12 font-label-mono text-xs uppercase tracking-widest hover:bg-surface-variant hover:text-primary border border-primary transition-colors cursor-pointer mt-2"
              >
                Siparişi Getir &amp; İade Başlat
              </button>
            </form>
          </div>
        ) : isCompleted ? (
          /* Step 3: Return Code Generated */
          <div className="border-2 border-primary bg-surface p-6 md:p-10 flex flex-col items-center text-center gap-6 animate-in fade-in">
            <div className="w-14 h-14 border border-primary bg-primary text-on-primary flex items-center justify-center">
              <PackageCheck className="w-8 h-8 text-white" />
            </div>

            <div>
              <span className="font-label-mono text-xs uppercase text-on-surface-variant">
                TALEBİNİZ ONAYLANDI // ÜCRETSİZ KARGO KODU
              </span>
              <h2 className="font-headline-sm uppercase text-primary text-2xl mt-1">
                İADE KODUNUZ OLUŞTURULDU
              </h2>
            </div>

            {/* Return Code Box */}
            <div className="w-full max-w-md border-2 border-dashed border-primary p-6 bg-surface-container-low flex flex-col sm:flex-row justify-between items-center gap-4 font-label-mono">
              <div>
                <span className="text-[10px] uppercase text-on-surface-variant block text-left">
                  YURTİÇİ KARGO MÜŞTERİ ANLAŞMA KODU
                </span>
                <span className="text-xl font-bold text-primary tracking-wider">
                  {returnCode}
                </span>
              </div>

              <button
                onClick={handleCopyCode}
                className="bg-primary text-on-primary px-6 py-2.5 text-xs uppercase flex items-center gap-1.5 hover:bg-surface-variant hover:text-primary border border-primary transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-400" /> Kopyalandı
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Kodu Kopyala
                  </>
                )}
              </button>
            </div>

            {/* Step-by-step instructions */}
            <div className="border border-outline-variant p-6 bg-surface-container-low text-left font-label-mono text-xs text-on-surface-variant flex flex-col gap-3 w-full">
              <span className="font-bold uppercase text-primary block">Kargo Gönderim Talimatları:</span>
              <p>1. Ürünü orijinal ambalajında ve fatura/fişi ile birlikte paketleyin.</p>
              <p>2. Size en yakın <strong>Yurtiçi Kargo</strong> şubesine giderek yukarıdaki anlaşma kodunu yetkiliye iletin.</p>
              <p>3. Kargo ücreti tarafımızca karşılanacak olup sizden hiçbir ücret talep edilmeyecektir.</p>
              <p>4. Paket depomuza ulaştığında {actionType === "exchange" ? "yeni bedeniniz aynı gün kargolanacaktır." : "ücret iadeniz 3 iş günü içinde kartınıza yansıtılacaktır."}</p>
            </div>

            <Link
              href="/"
              className="bg-primary text-on-primary px-8 py-3.5 font-label-mono text-xs uppercase hover:bg-surface-variant hover:text-primary border border-primary transition-colors"
            >
              Ana Sayfaya Dön
            </Link>
          </div>
        ) : (
          /* Step 2: Item Selection & Reason */
          <form onSubmit={handleSubmitReturn} className="border border-primary bg-surface p-6 md:p-10 flex flex-col gap-6 animate-in fade-in">
            <div className="flex justify-between items-start border-b border-primary pb-4">
              <div>
                <span className="font-label-mono text-xs uppercase text-on-surface-variant block">
                  SİPARİŞ NO: {orderNumber}
                </span>
                <h2 className="font-headline-sm uppercase text-primary mt-0.5">
                  İade / Değişim Detayları
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setIsSearched(false)}
                className="font-label-mono text-xs text-primary underline hover:opacity-70 cursor-pointer uppercase"
              >
                Siparişi Değiştir
              </button>
            </div>

            {/* Product Card */}
            <div className="p-4 border border-outline-variant bg-surface-container-low flex justify-between items-center font-label-mono text-xs">
              <div>
                <span className="font-bold text-primary uppercase text-sm block">
                  Oversized Teknik Parka V.2
                </span>
                <span className="text-on-surface-variant">Mevcut Beden: M / Siyah • Tutar: 4.500 ₺</span>
              </div>
              <span className="bg-primary text-on-primary px-2.5 py-1 text-[10px] uppercase">
                İadeye Uygun
              </span>
            </div>

            {/* Action Type Toggle */}
            <div className="flex flex-col gap-2">
              <label className="font-label-mono text-xs uppercase text-primary font-bold">
                Talep Türü Seçin *
              </label>
              <div className="grid grid-cols-2 gap-3 font-label-mono text-xs uppercase">
                <button
                  type="button"
                  onClick={() => setActionType("exchange")}
                  className={`p-3 border transition-colors cursor-pointer flex items-center justify-center gap-2 ${
                    actionType === "exchange"
                      ? "border-2 border-primary bg-surface-container-low font-bold"
                      : "border-outline-variant bg-surface hover:border-primary"
                  }`}
                >
                  <RotateCcw className="w-4 h-4" /> Farklı Beden İle Değişim
                </button>
                <button
                  type="button"
                  onClick={() => setActionType("refund")}
                  className={`p-3 border transition-colors cursor-pointer flex items-center justify-center gap-2 ${
                    actionType === "refund"
                      ? "border-2 border-primary bg-surface-container-low font-bold"
                      : "border-outline-variant bg-surface hover:border-primary"
                  }`}
                >
                  Para İadesi (Karta İade)
                </button>
              </div>
            </div>

            {/* Target size selector if exchange */}
            {actionType === "exchange" && (
              <div className="flex flex-col gap-2 border-t border-outline-variant pt-4">
                <label className="font-label-mono text-xs uppercase text-primary">
                  Talep Edilen Yeni Beden *
                </label>
                <div className="flex gap-2">
                  {["S", "L", "XL"].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setTargetSize(s)}
                      className={`w-10 h-10 border border-primary font-label-mono text-xs cursor-pointer ${
                        targetSize === s ? "bg-primary text-on-primary" : "bg-surface hover:bg-surface-variant text-primary"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Reason Selector */}
            <div className="flex flex-col gap-1 border-t border-outline-variant pt-4">
              <label className="font-label-mono text-xs uppercase text-primary">Gerekçe / Neden *</label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="border border-primary bg-surface p-3 font-label-mono text-xs text-primary focus:outline-none"
              >
                <option value="Beden Uygunsuzluğu (Küçük Geldi)">Beden Uygunsuzluğu (Küçük Geldi)</option>
                <option value="Beden Uygunsuzluğu (Büyük Geldi)">Beden Uygunsuzluğu (Büyük Geldi)</option>
                <option value="Farklı Model Tercihi">Farklı Model Tercihi</option>
                <option value="Kusurlu / Hasarlı Ürün">Kusurlu / Hasarlı Ürün</option>
                <option value="Beklentiyi Karşılamadı">Beklentiyi Karşılamadı</option>
              </select>
            </div>

            {/* Note */}
            <div className="flex flex-col gap-1">
              <label className="font-label-mono text-xs uppercase text-primary">Ek Açıklama (İsteğe Bağlı)</label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Varsa eklemek istediğiniz detayları yazabilirsiniz..."
                className="border border-primary bg-surface p-3 font-body-md text-sm text-primary focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="bg-primary text-on-primary h-14 font-label-mono text-xs uppercase tracking-widest hover:bg-surface-variant hover:text-primary border border-primary transition-colors cursor-pointer mt-2"
            >
              İade Kodumu Oluştur
            </button>
          </form>
        )}

        {/* Policy Notice */}
        <div className="border border-outline-variant p-4 bg-surface-container-low flex items-center gap-3 font-label-mono text-xs text-on-surface">
          <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0" />
          <span>
            VOID ARCHIVE siparişlerinde teslimat tarihinden itibaren 14 gün boyunca tüm Türkiye&apos;den ücretsiz iade ve değişim hakkınız mevcuttur.
          </span>
        </div>
      </div>
    </main>
  );
}

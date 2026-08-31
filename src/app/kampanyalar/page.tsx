"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Tag, Copy, Check, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

interface Coupon {
  code: string;
  title: string;
  discount: string;
  minSpend?: string;
  description: string;
  expiry: string;
  badge: string;
}

export default function PromotionsPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const coupons: Coupon[] = [
    {
      code: "HOSGELDIN10",
      title: "Yeni Üyelik & İlk Sipariş Fırsatı",
      discount: "%10 İNDİRİM",
      minSpend: "Alt limitsiz",
      description: "İlk kez sipariş veren tüm müşterilerimiz için tüm koleksiyonda geçerlidir.",
      expiry: "Süresiz",
      badge: "İLK SİPARİŞ",
    },
    {
      code: "VOID15",
      title: "Sonbahar '24 Lansman İndirimi",
      discount: "%15 İNDİRİM",
      minSpend: "Tüm siparişlerde",
      description: "Yeni sezon dış giyim, kargo pantolon ve ağır gramaj polar parçalarda geçerlidir.",
      expiry: "Bu Gece 23:59'a Kadar",
      badge: "GÜNÜN FIRSATI",
    },
    {
      code: "VOID20",
      title: "Büyük Sepet Avantajı",
      discount: "%20 İNDİRİM",
      minSpend: "3.000 ₺ ve üzeri",
      description: "3.000 ₺ ve üzeri alışverişlerinizde sepet toplamına anında %20 indirim uygulanır.",
      expiry: "Sınırlı Kupon",
      badge: "VIP SEPET",
    },
    {
      code: "SET10",
      title: "Lookbook Koleksiyon Seti İndirimi",
      discount: "%10 EK İNDİRİM",
      minSpend: "2 parça ve üzeri",
      description: "Lookbook ve katalog üzerinden seçilen 2 ve üzeri parça alımlarında sepete anında otomatik %10 indirim uygulanır.",
      expiry: "Aktif",
      badge: "KOLEKSİYON SETİ",
    },
  ];

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <main className="flex-grow pt-16 flex flex-col">
      {/* Header */}
      <header className="p-6 md:p-12 border-b border-primary bg-surface flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <span className="font-label-mono text-xs uppercase text-on-surface-variant block mb-2">
            AVANTAJLAR &amp; İNDİRİM KODLARI
          </span>
          <h1 className="font-display-lg-mobile md:font-display-lg uppercase tracking-tighter text-primary">
            KAMPANYALAR &amp; KUPONLAR
          </h1>
        </div>
        <p className="font-label-mono text-xs uppercase text-on-surface-variant max-w-xs">
          Ödeme adımında kullanabileceğiniz tüm aktif indirim kuponları.
        </p>
      </header>

      {/* Free Shipping Banner */}
      <section className="border-b border-primary bg-surface-container-low p-6 md:p-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border border-primary bg-primary text-on-primary flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-headline-sm uppercase text-sm text-primary">
                1.500 ₺ Ve Üzeri Tüm Siparişlerde Kargo Ücretsiz
              </h3>
              <p className="font-label-mono text-xs text-on-surface-variant">
                Kupon gerektirmez, sepette otomatik olarak uygulanır.
              </p>
            </div>
          </div>

          <Link
            href="/collections/all"
            className="bg-primary text-on-primary font-label-mono text-xs px-6 py-2.5 uppercase tracking-widest hover:bg-surface-variant hover:text-primary border border-primary transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            Alışverişe Başla <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* Coupon Cards Grid */}
      <section className="p-6 md:p-12 max-w-[1920px] mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {coupons.map((coupon) => (
            <div
              key={coupon.code}
              className="border border-primary bg-surface p-6 md:p-8 flex flex-col justify-between gap-6 relative"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="font-label-mono text-[10px] uppercase bg-surface-container-low border border-primary px-2.5 py-1 text-primary">
                    {coupon.badge}
                  </span>
                  <span className="font-label-mono text-xs text-on-surface-variant">
                    Geçerlilik: {coupon.expiry}
                  </span>
                </div>

                <div className="flex items-baseline gap-3">
                  <h3 className="font-headline-sm uppercase text-primary text-2xl">
                    {coupon.discount}
                  </h3>
                  <span className="font-label-mono text-xs text-on-surface-variant">
                    ({coupon.minSpend})
                  </span>
                </div>

                <h4 className="font-body-md font-bold uppercase text-primary text-sm mt-1">
                  {coupon.title}
                </h4>

                <p className="font-body-md text-xs text-on-surface-variant mt-2 leading-relaxed">
                  {coupon.description}
                </p>
              </div>

              {/* Copy Coupon Box */}
              <div className="border-t border-outline-variant pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="flex items-center gap-2 font-label-mono">
                  <Tag className="w-4 h-4 text-primary" />
                  <span className="font-bold text-sm text-primary tracking-wider">
                    {coupon.code}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy(coupon.code)}
                  className="w-full sm:w-auto bg-primary text-on-primary px-6 py-2.5 font-label-mono text-xs uppercase flex items-center justify-center gap-1.5 hover:bg-surface-variant hover:text-primary border border-primary transition-colors cursor-pointer"
                >
                  {copiedCode === coupon.code ? (
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
            </div>
          ))}
        </div>

        {/* Info Note */}
        <div className="mt-12 p-4 border border-outline-variant bg-surface-container-low flex items-center gap-3 font-label-mono text-xs text-on-surface">
          <ShieldCheck className="w-4 h-4 text-primary flex-shrink-0" />
          <span>
            Kupon kodları tek bir siparişte birleştirilemez. Ödeme adımında en avantajlı olan kodu kupon alanına girerek kullanabilirsiniz.
          </span>
        </div>
      </section>
    </main>
  );
}

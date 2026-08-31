"use client";

import React, { useState, useMemo } from "react";
import { Search, HelpCircle } from "lucide-react";
import { AccordionItem } from "@/components/ui/accordion";

interface FAQItem {
  category: "kargo" | "iade" | "odeme" | "kumas";
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    category: "kargo",
    question: "Siparişim ne zaman kargoya verilir ve kargo ücreti ne kadar?",
    answer:
      "Hafta içi saat 15:00'e kadar verilen siparişler aynı gün Yurtiçi Kargo'ya teslim edilir. 1.500 ₺ ve üzeri tüm siparişlerde Türkiye geneli kargo tamamen ücretsizdir. 1.500 ₺ altındaki siparişlerde standart kargo ücreti 60 ₺'dir.",
  },
  {
    category: "kargo",
    question: "Kargomu nasıl takip edebilirim?",
    answer:
      "Siparişiniz kargoya verildiğinde e-posta ve SMS ile takip kodunuz paylaşılır. Ayrıca sitemizdeki '/kargo-takip' sayfasından sipariş numaranızı (Örn: ORD-94218-TR) girerek kargonuzun tüm hareketlerini canlı izleyebilirsiniz.",
  },
  {
    category: "iade",
    question: "İade ve değişim süresi ne kadardır?",
    answer:
      "Siparişinizi teslim aldığınız tarihten itibaren 30 gün içerisinde ücretsiz olarak iade veya beden değişimi talebinde bulunabilirsiniz. Ürünlerin kullanılmamış, yıkanmamış ve orijinal etiketlerinin üzerinde olması gerekmektedir.",
  },
  {
    category: "iade",
    question: "İade sürecini nasıl başlatabilirim?",
    answer:
      "Müşteri portalınızdaki sipariş detayından veya sağ alttaki Canlı Destek üzerinden iade talebi oluşturabilirsiniz. Size iletilecek Yurtiçi Kargo iade kodu ile en yakın şubeye ücretsiz teslim edebilirsiniz.",
  },
  {
    category: "odeme",
    question: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
    answer:
      "Tüm bankaların Visa, Mastercard ve Troy kredi/banka kartları (12 aya varan taksit imkanı), Garanti BBVA Havale/EFT ve Kapıda Nakit/Kredi Kartı ile ödeme seçeneklerini destekliyoruz.",
  },
  {
    category: "odeme",
    question: "Ödeme güvenliği nasıl sağlanıyor?",
    answer:
      "Tüm ödemeler 256-Bit SSL şifreleme ve 3D Secure güvenlik protokolü üzerinden gerçekleşmektedir. Kart bilgileriniz kesinlikle sunucularımızda saklanmaz.",
  },
  {
    category: "kumas",
    question: "Ürünlerin kumaş kalitesi ve kalıpları nasıldır?",
    answer:
      "Tüm ürünlerimiz ağır gramajlı (350+ GSM) su geçirmez teknik naylon, yırtılmaz ripstop ve kompakt pamuklu kumaşlardan üretilmektedir. Siluetlerimiz modern brutalist kutu kesim (boxy / oversized) kalıplara sahiptir. Beden seçiminde kararsız kalırsanız ürün sayfasındaki 'Akıllı Bedenimi Bul' sihirbazını kullanabilirsiniz.",
  },
  {
    category: "kumas",
    question: "Teknik mont ve pantolonların bakımı nasıl yapılmalıdır?",
    answer:
      "Su itici ve membranlı teknik kumaşların ömrünü korumak için ürünleri ters çevirerek maksimum 30°C'de hassas programda yıkayınız. Yumuşatıcı ve kurutma makinesi kullanmayınız, sererek kurutunuz.",
  },
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredFaqs = useMemo(() => {
    return FAQS.filter((faq) => {
      const matchesCategory =
        selectedCategory === "all" || faq.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <main className="flex-grow flex flex-col">
      {/* Header */}
      <header className="p-6 md:p-12 border-b border-primary bg-surface flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <span className="font-label-mono text-xs uppercase text-on-surface-variant block mb-2">
            BİLGİ MERKEZİ &amp; DESTEK
          </span>
          <h1 className="font-display-lg-mobile md:font-display-lg uppercase tracking-tighter text-primary">
            SIKÇA SORULAN SORULAR
          </h1>
        </div>
        <p className="font-label-mono text-xs uppercase text-on-surface-variant max-w-xs">
          Kargo, iade, ödeme ve ürün özellikleri hakkında en sık merak edilenler.
        </p>
      </header>

      {/* Search Bar */}
      <section className="border-b border-primary p-6 md:p-8 bg-surface-container-low">
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          <div className="relative">
            <Search className="w-4 h-4 text-outline absolute left-4 top-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="SORULARDA ARAYIN (KARGO, İADE, TAKSİT, KALIP)..."
              className="w-full border border-primary bg-surface pl-11 pr-4 py-3.5 font-label-mono text-xs uppercase text-primary focus:outline-none"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: "Tüm Konular" },
              { id: "kargo", label: "Kargo & Teslimat" },
              { id: "iade", label: "İade & Değişim" },
              { id: "odeme", label: "Ödeme & Güvenlik" },
              { id: "kumas", label: "Kumaş Bakımı & Kalıp" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`font-label-mono text-xs uppercase px-4 py-2 border border-primary transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-primary text-on-primary"
                    : "bg-surface text-primary hover:bg-surface-variant"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Accordions List */}
      <section className="flex-1 p-6 md:p-12 max-w-3xl mx-auto w-full">
        {filteredFaqs.length === 0 ? (
          <div className="py-16 text-center">
            <HelpCircle className="w-12 h-12 text-outline mx-auto mb-3" />
            <p className="font-label-mono uppercase text-on-surface-variant text-xs">
              Aramanıza uygun soru bulunamadı. Lütfen Canlı Destek butonunu kullanarak bizimle iletişime geçin.
            </p>
          </div>
        ) : (
          <div className="flex flex-col border border-primary bg-surface">
            {filteredFaqs.map((faq, idx) => (
              <AccordionItem
                key={idx}
                title={faq.question}
                defaultOpen={idx === 0 && !searchQuery}
              >
                <p className="font-body-md text-sm text-primary leading-relaxed">
                  {faq.answer}
                </p>
              </AccordionItem>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

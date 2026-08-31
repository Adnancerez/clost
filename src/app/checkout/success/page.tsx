"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, PackageCheck, ArrowRight, FileText, Home, Gift, Printer } from "lucide-react";
import { InvoiceModal } from "@/components/checkout/invoice-modal";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "ORD-94218-TR";
  const total = searchParams.get("total") || "4500";
  const name = searchParams.get("name") || "Değerli Müşterimiz";
  const isGift = searchParams.get("isGift") === "true";
  const giftNote = searchParams.get("giftNote");

  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

  const numericTotal = parseFloat(total) || 4500;

  return (
    <div className="flex-1 p-6 md:p-16 max-w-3xl mx-auto w-full flex flex-col items-center text-center gap-8">
      {/* Icon & Heading */}
      <div className="w-16 h-16 border border-primary bg-surface flex items-center justify-center">
        <CheckCircle2 className="w-8 h-8 text-primary" />
      </div>

      <div>
        <span className="font-label-mono text-xs uppercase text-on-surface-variant block mb-2">
          SİPARİŞİNİZ BAŞARIYLA ALINDI
        </span>
        <h1 className="font-display-lg-mobile md:font-headline-md uppercase tracking-tighter text-primary">
          Teşekkür Ederiz, {name}
        </h1>
        <p className="font-body-md text-on-surface-variant text-sm mt-3 max-w-md mx-auto">
          Sipariş onayınız ve takip bilgileriniz e-posta adresinize gönderilmiştir.
        </p>
      </div>

      {/* Order Info Card */}
      <div className="w-full border border-primary p-6 bg-surface-container-low flex flex-col gap-4 text-left font-label-mono text-xs">
        <div className="flex justify-between items-center border-b border-primary pb-3">
          <span className="text-on-surface-variant">SİPARİŞ NUMARASI</span>
          <span className="text-primary font-bold">{orderId}</span>
        </div>
        <div className="flex justify-between items-center border-b border-outline-variant pb-3">
          <span className="text-on-surface-variant">ÖDENEN TUTAR</span>
          <span className="text-primary font-bold text-sm">
            {numericTotal.toLocaleString("tr-TR")} ₺
          </span>
        </div>
        <div className="flex justify-between items-center border-b border-outline-variant pb-3">
          <span className="text-on-surface-variant">KARGO FİRMASI</span>
          <span className="text-primary">Yurtiçi Kargo (Standart)</span>
        </div>
        <div className="flex justify-between items-center border-b border-outline-variant pb-3">
          <span className="text-on-surface-variant">TAHMİNİ TESLİMAT</span>
          <span className="text-primary font-bold">2 - 3 İş Günü</span>
        </div>

        {isGift && (
          <div className="flex flex-col gap-1 pt-1">
            <span className="text-primary font-bold flex items-center gap-1.5">
              <Gift className="w-3.5 h-3.5" /> Özel Hediye Paketi Dahil Edildi
            </span>
            {giftNote && (
              <p className="text-on-surface-variant italic mt-1 bg-surface p-2 border border-outline-variant">
                &quot;{giftNote}&quot;
              </p>
            )}
          </div>
        )}

        {/* Invoice Modal Trigger Button */}
        <div className="border-t border-primary pt-3 flex justify-between items-center">
          <span className="text-on-surface-variant">E-ARŞİV FATURA</span>
          <button
            type="button"
            onClick={() => setIsInvoiceOpen(true)}
            className="flex items-center gap-1.5 text-primary font-bold hover:underline cursor-pointer uppercase"
          >
            <Printer className="w-3.5 h-3.5" /> Faturayı Görüntüle / Yazdır
          </button>
        </div>
      </div>

      {/* Tracking Note */}
      <div className="flex items-center gap-3 border border-outline-variant p-4 bg-surface text-left w-full">
        <PackageCheck className="w-5 h-5 text-primary flex-shrink-0" />
        <div className="flex-1">
          <p className="font-label-mono text-xs text-on-surface">
            Kargonuz paketlendiğinde SMS ve e-posta ile canlı takip kodunuz iletilecektir.
          </p>
          <Link
            href="/kargo-takip"
            className="font-label-mono text-xs text-primary underline mt-1 inline-block uppercase font-bold"
          >
            Canlı Kargo Takibi İçin Tıklayın ↗
          </Link>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
        <Link
          href="/collections/all"
          className="bg-primary text-on-primary font-label-mono text-xs px-8 py-4 uppercase tracking-widest hover:bg-surface-variant hover:text-primary border border-primary transition-colors flex items-center justify-center gap-2"
        >
          <Home className="w-4 h-4" /> Alışverişe Devam Et
        </Link>
        <Link
          href="/account"
          className="bg-transparent text-primary font-label-mono text-xs px-8 py-4 uppercase tracking-widest hover:bg-surface-variant border border-primary transition-colors flex items-center justify-center gap-2"
        >
          <FileText className="w-4 h-4" /> Siparişlerimi Gör <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Invoice Modal */}
      <InvoiceModal
        isOpen={isInvoiceOpen}
        onClose={() => setIsInvoiceOpen(false)}
        orderNumber={orderId}
        customerName={name}
        totalAmount={numericTotal}
        items={[
          {
            name: "Oversized Teknik Parka V.2 (M / Siyah)",
            quantity: 1,
            price: numericTotal,
          },
        ]}
      />
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <main className="flex-grow flex flex-col justify-center">
      <Suspense
        fallback={
          <div className="py-24 text-center font-label-mono text-xs uppercase text-on-surface-variant">
            Sipariş detayları yükleniyor...
          </div>
        }
      >
        <SuccessContent />
      </Suspense>
    </main>
  );
}

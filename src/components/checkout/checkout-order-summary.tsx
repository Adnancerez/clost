"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Tag, ShieldCheck, ArrowRight } from "lucide-react";
import { CartItem } from "@/lib/store/useCartStore";

export interface CheckoutOrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  discountPercent: number;
  shippingCost: number;
  total: number;
  couponInput: string;
  setCouponInput: (val: string) => void;
  couponApplied: boolean;
  couponError: string;
  onApplyCoupon: (e: React.FormEvent) => void;
  isProcessing: boolean;
  onCompleteOrder: (e: React.FormEvent) => void;
}

export function CheckoutOrderSummary({
  items,
  subtotal,
  discountAmount,
  discountPercent,
  shippingCost,
  total,
  couponInput,
  setCouponInput,
  couponApplied,
  couponError,
  onApplyCoupon,
  isProcessing,
  onCompleteOrder,
}: CheckoutOrderSummaryProps) {
  return (
    <div className="lg:col-span-5 flex flex-col gap-6">
      <div className="border border-primary p-6 bg-surface sticky top-24">
        <h2 className="font-headline-sm uppercase text-primary text-base mb-4 border-b border-outline-variant pb-3">
          Sipariş Özeti ({items.length} Parça)
        </h2>

        {/* Items List */}
        <div className="flex flex-col divide-y divide-outline-variant max-h-72 overflow-y-auto no-scrollbar mb-6">
          {items.map((item) => (
            <div key={item.variantId} className="py-3 flex gap-3 items-center">
              <div className="relative w-14 h-16 border border-primary bg-surface-variant flex-shrink-0">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="60px"
                    className="object-cover grayscale"
                  />
                )}
                <span className="absolute -top-1.5 -right-1.5 bg-primary text-on-primary font-label-mono text-[9px] w-4 h-4 flex items-center justify-center">
                  {item.quantity}
                </span>
              </div>
              <div className="flex-1 min-w-0 font-label-mono text-xs">
                <p className="font-bold text-primary truncate uppercase">{item.title}</p>
                <p className="text-on-surface-variant text-[11px] uppercase">
                  {item.variantTitle}
                </p>
                <p className="font-price-lg text-xs mt-1 text-primary">
                  {(item.price * item.quantity).toLocaleString("tr-TR")} ₺
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Coupon Code Input */}
        <form onSubmit={onApplyCoupon} className="mb-6">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
              <input
                type="text"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                placeholder="KUPON KODU (örn: CLOST10)"
                className="w-full bg-surface border border-primary pl-9 pr-3 py-2.5 font-label-mono text-xs focus:outline-none uppercase"
              />
            </div>
            <button
              type="submit"
              className="bg-primary text-on-primary px-4 font-label-mono text-xs uppercase hover:bg-surface-variant hover:text-primary border border-primary transition-colors cursor-pointer"
            >
              Uygula
            </button>
          </div>
          {couponApplied && (
            <p className="font-label-mono text-xs text-green-700 dark:text-green-400 mt-2">
              ✓ %{discountPercent} İndirim kuponu başarıyla uygulandı!
            </p>
          )}
          {couponError && (
            <p className="font-label-mono text-xs text-red-600 mt-2">
              ✕ {couponError}
            </p>
          )}
        </form>

        {/* Pricing Calculation Lines */}
        <div className="flex flex-col gap-2.5 font-label-mono text-xs border-t border-outline-variant pt-4 mb-6">
          <div className="flex justify-between text-on-surface-variant">
            <span>ARA TOPLAM</span>
            <span>{subtotal.toLocaleString("tr-TR")} ₺</span>
          </div>

          {discountAmount > 0 && (
            <div className="flex justify-between text-green-700 dark:text-green-400 font-bold">
              <span>KUPON İNDİRİMİ (%{discountPercent})</span>
              <span>-{discountAmount.toLocaleString("tr-TR")} ₺</span>
            </div>
          )}

          <div className="flex justify-between text-on-surface-variant">
            <span>KARGO ÜCRETİ</span>
            <span>
              {shippingCost === 0 ? (
                <strong className="text-green-600 font-bold">ÜCRETSİZ</strong>
              ) : (
                `${shippingCost.toLocaleString("tr-TR")} ₺`
              )}
            </span>
          </div>

          <div className="flex justify-between items-baseline border-t border-primary pt-3 font-bold text-base">
            <span className="font-headline-sm uppercase text-primary">TOPLAM</span>
            <span className="font-price-lg text-xl text-primary">
              {total.toLocaleString("tr-TR")} ₺
            </span>
          </div>
        </div>

        {/* Order Submit CTA */}
        <button
          type="button"
          onClick={onCompleteOrder}
          disabled={isProcessing || items.length === 0}
          className="w-full bg-primary text-on-primary h-14 flex items-center justify-center gap-2 uppercase tracking-widest font-label-mono text-xs hover:bg-surface-variant hover:text-primary border border-primary transition-colors cursor-pointer disabled:opacity-50 font-bold"
        >
          {isProcessing ? (
            <span>Siparişiniz Doğrulanıyor...</span>
          ) : (
            <>
              <ShieldCheck className="w-4 h-4" />
              <span>Siparişi Onayla ve Öde</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        <p className="font-label-mono text-[10px] text-on-surface-variant text-center mt-3 uppercase tracking-wider">
          Sipariş vererek <Link href="/about" className="underline">Mesafeli Satış Sözleşmesi</Link>&apos;ni kabul etmiş sayılırsınız.
        </p>
      </div>
    </div>
  );
}

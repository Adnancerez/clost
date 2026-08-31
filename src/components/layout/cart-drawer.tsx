"use client";

import React, { useEffect, useSyncExternalStore, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ArrowRight, X } from "lucide-react";
import { useCartStore } from "@/lib/store/useCartStore";
import { useToastStore } from "@/lib/store/useToastStore";

const emptySubscribe = () => () => {};

export function CartDrawer() {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const { addToast } = useToastStore();

  // Prevent background body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeCart();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeCart]);

  // High performance memoized totals
  const { totalQuantity, subtotal, remaining, progress } = useMemo(() => {
    const totalQty = items.reduce((total, item) => total + item.quantity, 0);
    const sub = items.reduce((total, item) => total + item.price * item.quantity, 0);
    const rem = Math.max(0, 1500 - sub);
    const prog = Math.min(100, (sub / 1500) * 100);
    return {
      totalQuantity: totalQty,
      subtotal: sub,
      remaining: rem,
      progress: prog,
    };
  }, [items]);

  if (!isMounted) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-200 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop without expensive blur for 60fps performance */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 bg-black/60 transition-opacity duration-200 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Drawer Panel (GPU accelerated with will-change-transform) */}
      <div
        className={`relative w-full max-w-md bg-surface h-full flex flex-col justify-between border-l border-primary shadow-2xl transition-transform duration-250 ease-out transform-gpu will-change-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-primary flex justify-between items-center bg-surface">
          <div className="flex items-center gap-2">
            <h2 className="font-headline-sm uppercase text-primary text-base md:text-lg font-bold">
              Alışveriş Sepeti
            </h2>
            <span className="font-label-mono text-xs text-on-surface-variant">
              ({totalQuantity} Ürün)
            </span>
          </div>
          <button
            onClick={closeCart}
            aria-label="Sepeti kapat"
            className="p-1 hover:bg-surface-variant transition-colors text-primary cursor-pointer border border-transparent hover:border-primary"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="p-4 border-b border-primary bg-surface-container-low font-label-mono text-xs">
          {remaining > 0 ? (
            <p className="text-on-surface-variant mb-2">
              Ücretsiz kargo için{" "}
              <span className="text-primary font-bold">
                {remaining.toLocaleString("tr-TR")} ₺
              </span>{" "}
              değerinde ürün ekleyin.
            </p>
          ) : (
            <p className="text-green-700 font-bold mb-2 uppercase">
              ✓ Ücretsiz Kargo Kazandınız!
            </p>
          )}
          <div className="w-full bg-surface-variant h-1.5 overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 divide-y divide-outline-variant overscroll-contain">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 gap-3">
              <span className="font-headline-sm text-primary uppercase text-sm font-bold">
                Sepetiniz Boş
              </span>
              <p className="font-body-md text-xs text-on-surface-variant max-w-xs leading-relaxed">
                Koleksiyonumuzdaki minimalist parçaları keşfetmek için alışverişe başlayın.
              </p>
              <Link
                href="/collections/all"
                onClick={closeCart}
                className="mt-2 border border-primary px-6 py-2.5 font-label-mono text-xs uppercase hover:bg-primary hover:text-on-primary transition-colors cursor-pointer"
              >
                Kataloğa Git
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.variantId} className="pt-4 first:pt-0 flex gap-4">
                {/* Product Thumbnail */}
                <div className="w-20 h-24 bg-surface-variant border border-primary relative flex-shrink-0">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="80px"
                      className="object-cover grayscale"
                    />
                  )}
                </div>

                {/* Product Info */}
                <div className="flex-1 flex flex-col justify-between py-0.5">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <Link
                        href={`/products/${item.handle}`}
                        onClick={closeCart}
                        className="font-body-md font-bold uppercase text-xs text-primary hover:underline line-clamp-1"
                      >
                        {item.title}
                      </Link>
                      <button
                        onClick={() => {
                          removeItem(item.variantId);
                          addToast({
                            title: "Ürün Kaldırıldı",
                            message: `${item.title} sepetten çıkarıldı.`,
                            type: "info",
                          });
                        }}
                        aria-label="Ürünü sil"
                        className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer p-0.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="font-label-mono text-[11px] text-on-surface-variant mt-0.5">
                      {item.variantTitle}
                    </p>
                  </div>

                  <div className="flex justify-between items-end">
                    <p className="font-price-lg text-primary text-sm font-bold">
                      {item.price.toLocaleString("tr-TR")} ₺
                    </p>

                    {/* Stepper */}
                    <div className="flex items-center border border-primary h-7">
                      <button
                        onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                        className="w-7 h-full flex items-center justify-center hover:bg-surface-variant transition-colors cursor-pointer font-label-mono text-xs"
                      >
                        -
                      </button>
                      <span className="font-label-mono text-xs w-7 text-center border-l border-r border-primary flex items-center justify-center h-full">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                        className="w-7 h-full flex items-center justify-center hover:bg-surface-variant transition-colors cursor-pointer font-label-mono text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Checkout */}
        {items.length > 0 && (
          <div className="border-t border-primary p-4 bg-surface">
            <div className="flex justify-between items-center mb-2">
              <span className="font-body-lg uppercase font-bold text-primary text-sm">
                Ara Toplam
              </span>
              <span className="font-price-lg text-primary text-base font-bold">
                {subtotal.toLocaleString("tr-TR")} ₺
              </span>
            </div>
            <p className="font-label-mono text-on-surface-variant mb-4 text-xs">
              Kargo ve vergiler ödeme adımında hesaplanır.
            </p>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="w-full bg-primary text-on-primary h-12 flex items-center justify-center font-label-mono uppercase tracking-widest hover:bg-surface-variant hover:text-primary border border-primary transition-colors cursor-pointer text-xs font-bold gap-2"
            >
              <span>Siparişi Tamamla</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

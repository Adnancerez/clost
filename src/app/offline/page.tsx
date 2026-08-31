"use client";

import React, { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePwaStore } from "@/lib/pwa/usePwa";
import { useCartStore } from "@/lib/store/useCartStore";
import { useWishlistStore } from "@/lib/store/useWishlistStore";

const emptySubscribe = () => () => {};

export default function OfflinePage() {
  const router = useRouter();
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const isOnline = usePwaStore((state) => state.isOnline);
  const checkConnectivity = usePwaStore((state) => state.checkConnectivity);
  const { items: cartItems, getSubtotal } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = async () => {
    setIsRetrying(true);
    const online = await checkConnectivity();
    if (online) {
      router.push("/");
    } else {
      setTimeout(() => setIsRetrying(false), 500);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-between max-w-6xl mx-auto px-4 md:px-8 py-10">
      {/* Top Header */}
      <div className="border border-primary p-6 md:p-8 bg-surface-container-low mb-8 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 pb-4 border-b border-primary/20">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-500"></span>
            </span>
            <h1 className="font-headline-md text-2xl md:text-3xl font-bold tracking-tight text-primary uppercase">
              ÇEVRİMDIŞI ARŞİV // OFFLINE
            </h1>
          </div>

          <div className="font-label-mono text-xs px-3 py-1 bg-primary text-white uppercase tracking-widest">
            {isOnline ? "BAĞLANTI YENİDEN KURULDU" : "İNTERNET BAĞLANTISI YOK"}
          </div>
        </div>

        <p className="text-on-surface-variant font-body-md text-sm md:text-base max-w-3xl mb-6">
          Şu anda çevrimdışısınız. Ancak CLOST Service Worker teknolojisi sayesinde daha önce ziyaret ettiğiniz koleksiyonlar, kayıtlı sepetiniz ve favorileriniz yerel bellekte güvenle saklanmaktadır.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleRetry}
            disabled={isRetrying}
            className="px-6 py-3 bg-primary text-white font-label-mono text-xs uppercase tracking-widest hover:bg-surface-variant hover:text-primary border border-primary transition-colors disabled:opacity-50 flex items-center gap-2 cursor-pointer"
          >
            {isRetrying ? (
              <>
                <span className="inline-block w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                KONTROL EDİLİYOR...
              </>
            ) : (
              "YENİDEN BAĞLANMAYI DENE"
            )}
          </button>

          <Link
            href="/"
            className="px-6 py-3 border border-primary text-primary font-label-mono text-xs uppercase tracking-widest hover:bg-surface-variant transition-colors"
          >
            ÖNBELLEKTEKİ ANA SAYFA
          </Link>
        </div>
      </div>

      {/* Main Grid: Cached Cart & Wishlist */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Section 1: Cached Cart */}
        <div className="border border-primary p-6 bg-surface">
          <div className="flex justify-between items-center pb-3 mb-4 border-b border-primary">
            <span className="font-label-mono text-xs font-bold uppercase tracking-wider text-primary">
              YEREL SEPET ÖĞELERİ ({isMounted ? cartItems.length : 0})
            </span>
            <span className="font-price-lg text-sm text-primary">
              {isMounted ? `${getSubtotal().toLocaleString("tr-TR")} ₺` : "—"}
            </span>
          </div>

          {isMounted && cartItems.length > 0 ? (
            <div className="space-y-3 divide-y divide-primary/10">
              {cartItems.map((item) => (
                <div key={item.variantId} className="pt-3 flex gap-3 items-center">
                  <div className="w-14 h-16 bg-surface-variant relative shrink-0 border border-primary/20">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0 font-label-mono text-xs">
                    <p className="font-bold text-primary truncate uppercase">{item.title}</p>
                    <p className="text-on-surface-variant text-[11px]">
                      {item.variantTitle} × {item.quantity}
                    </p>
                  </div>
                  <div className="font-price-lg text-xs font-bold text-primary">
                    {(item.price * item.quantity).toLocaleString("tr-TR")} ₺
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs font-label-mono text-on-surface-variant py-4">
              Kayıtlı çevrimdışı sepet öğesi bulunmuyor.
            </p>
          )}
        </div>

        {/* Section 2: Cached Wishlist */}
        <div className="border border-primary p-6 bg-surface">
          <div className="flex justify-between items-center pb-3 mb-4 border-b border-primary">
            <span className="font-label-mono text-xs font-bold uppercase tracking-wider text-primary">
              KAYITLI FAVORİLER ({isMounted ? wishlistItems.length : 0})
            </span>
            <span className="font-label-mono text-xs text-on-surface-variant uppercase">
              YEREL DEPOLAMA
            </span>
          </div>

          {isMounted && wishlistItems.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {wishlistItems.slice(0, 4).map((product) => {
                const img = product.featuredImage?.url || product.images[0]?.url;
                return (
                  <div
                    key={product.id}
                    className="border border-primary/20 p-2 bg-surface-container-low"
                  >
                    <div className="aspect-[4/5] relative bg-surface-variant mb-2">
                      {img && (
                        <Image
                          src={img}
                          alt={product.title}
                          fill
                          className="object-cover"
                          sizes="150px"
                        />
                      )}
                    </div>
                    <p className="font-label-mono text-[11px] font-bold truncate text-primary uppercase">
                      {product.title}
                    </p>
                    <p className="font-price-lg text-xs text-primary">
                      {product.priceRange.minVariantPrice.amount} ₺
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-xs font-label-mono text-on-surface-variant py-4">
              Kayıtlı çevrimdışı favori ürün bulunmuyor.
            </p>
          )}
        </div>
      </div>

      {/* Section 3: Cached Quick Links */}
      <div className="border-t border-primary pt-6 font-label-mono text-xs">
        <p className="text-on-surface-variant uppercase mb-3 tracking-wider">
          ÖNBELLEKTE BULUNABİLECEK HIZLI BAĞLANTILAR:
        </p>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/"
            className="px-3 py-1.5 border border-primary/40 hover:border-primary hover:bg-surface-variant transition-colors"
          >
            / ANA SAYFA
          </Link>
          <Link
            href="/collections"
            className="px-3 py-1.5 border border-primary/40 hover:border-primary hover:bg-surface-variant transition-colors"
          >
            / KOLEKSİYONLAR
          </Link>
          <Link
            href="/dergi"
            className="px-3 py-1.5 border border-primary/40 hover:border-primary hover:bg-surface-variant transition-colors"
          >
            / DERGİ & MAKALE
          </Link>
          <Link
            href="/lookbook"
            className="px-3 py-1.5 border border-primary/40 hover:border-primary hover:bg-surface-variant transition-colors"
          >
            / LOOKBOOK
          </Link>
        </div>
      </div>
    </div>
  );
}

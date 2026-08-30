"use client";

import React, { useState } from "react";
import Link from "next/link";
import { playClickSound } from "@/lib/audio/sound-effects";
import { useToastStore } from "@/lib/store/useToastStore";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const { addToast } = useToastStore();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      playClickSound();
      setSubscribed(true);
      setEmail("");
      addToast({
        title: "Bültene Kaydoldunuz",
        message: "%10 indirim kodunuz: HOSGELDIN10",
        type: "success",
      });
    }
  };

  return (
    <footer className="w-full py-12 px-4 md:px-10 grid grid-cols-1 md:grid-cols-4 gap-8 bg-surface border-t border-primary mt-auto">
      {/* Brand & Mission */}
      <div className="md:col-span-1">
        <div className="font-headline-sm font-bold text-primary mb-2 uppercase tracking-tighter">
          CLOST
        </div>
        <p className="font-label-mono text-on-surface-variant text-xs max-w-[240px] leading-relaxed">
          © 2026 CLOST.<br />KULLANIŞLILIK İÇİN TASARLANDI.
        </p>
      </div>

      {/* Structured Links */}
      <div className="md:col-span-3 flex flex-col sm:flex-row gap-8 sm:gap-14 justify-end">
        {/* Shopping & Discovery */}
        <div className="flex flex-col gap-2 font-label-mono text-xs">
          <span className="uppercase text-primary font-bold mb-1">Keşfet &amp; Alışveriş</span>
          <Link
            href="/collections/all"
            onClick={playClickSound}
            className="text-on-surface-variant hover:text-primary underline transition-colors"
          >
            Tüm Koleksiyon
          </Link>
          <Link
            href="/kombin-olustur"
            onClick={playClickSound}
            className="text-on-surface-variant hover:text-primary underline transition-colors"
          >
            Kombin Stüdyosu
          </Link>
          <Link
            href="/lookbook"
            onClick={playClickSound}
            className="text-on-surface-variant hover:text-primary underline transition-colors"
          >
            Lookbook Sonbahar &apos;24
          </Link>
          <Link
            href="/materyal-lab"
            onClick={playClickSound}
            className="text-on-surface-variant hover:text-primary underline transition-colors"
          >
            Materyal Laboratuvarı
          </Link>
          <Link
            href="/vip-kulup"
            onClick={playClickSound}
            className="text-on-surface-variant hover:text-primary underline transition-colors"
          >
            VIP Arşiv Kulübü
          </Link>
          <Link
            href="/karsilastir"
            onClick={playClickSound}
            className="text-on-surface-variant hover:text-primary underline transition-colors"
          >
            Ürün Karşılaştırma
          </Link>
          <Link
            href="/hediye-karti"
            onClick={playClickSound}
            className="text-on-surface-variant hover:text-primary underline transition-colors"
          >
            Dijital Hediye Kartı
          </Link>
          <Link
            href="/dergi"
            onClick={playClickSound}
            className="text-on-surface-variant hover:text-primary underline transition-colors"
          >
            Editoryal Dergi
          </Link>
        </div>

        {/* Support & Returns */}
        <div className="flex flex-col gap-2 font-label-mono text-xs">
          <span className="uppercase text-primary font-bold mb-1">Müşteri Destek &amp; İade</span>
          <Link
            href="/kargo-takip"
            onClick={playClickSound}
            className="text-on-surface-variant hover:text-primary underline transition-colors"
          >
            Canlı Kargo Takibi
          </Link>
          <Link
            href="/iade-talebi"
            onClick={playClickSound}
            className="text-on-surface-variant hover:text-primary underline transition-colors font-bold"
          >
            İade &amp; Değişim Portalı
          </Link>
          <Link
            href="/beden-rehberi"
            onClick={playClickSound}
            className="text-on-surface-variant hover:text-primary underline transition-colors"
          >
            Beden &amp; Silüet Rehberi
          </Link>
          <Link
            href="/sss"
            onClick={playClickSound}
            className="text-on-surface-variant hover:text-primary underline transition-colors"
          >
            Sıkça Sorulan Sorular (SSS)
          </Link>
          <Link
            href="/iletisim"
            onClick={playClickSound}
            className="text-on-surface-variant hover:text-primary underline transition-colors"
          >
            Showroom &amp; İletişim
          </Link>
          <Link
            href="/kampanyalar"
            onClick={playClickSound}
            className="text-on-surface-variant hover:text-primary underline transition-colors"
          >
            Aktif Kampanyalar
          </Link>
        </div>

        {/* Legal & Press */}
        <div className="flex flex-col gap-2 font-label-mono text-xs">
          <span className="uppercase text-primary font-bold mb-1">Kurumsal &amp; Medya</span>
          <Link
            href="/about"
            onClick={playClickSound}
            className="text-on-surface-variant hover:text-primary underline transition-colors"
          >
            Manifesto &amp; İlkeler
          </Link>
          <Link
            href="/basin-kiti"
            onClick={playClickSound}
            className="text-on-surface-variant hover:text-primary underline transition-colors font-bold"
          >
            Basın Kiti &amp; Medya
          </Link>
          <Link
            href="/about"
            onClick={playClickSound}
            className="text-on-surface-variant hover:text-primary underline transition-colors"
          >
            Kullanım Koşulları
          </Link>
          <Link
            href="/about"
            onClick={playClickSound}
            className="text-on-surface-variant hover:text-primary underline transition-colors"
          >
            Gizlilik Politikası
          </Link>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-2 w-full sm:w-72">
          <span className="font-label-mono uppercase text-primary font-bold mb-1 text-xs">
            Arşiv E-Bülteni
          </span>
          {subscribed ? (
            <p className="font-label-mono text-xs text-primary uppercase border border-primary p-2">
              ✓ Bültene başarıyla abone oldunuz
            </p>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="flex border-b border-primary focus-within:border-primary transition-colors"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-POSTA ADRESİNİZ"
                className="bg-transparent border-none focus:outline-none font-label-mono text-xs px-0 py-2 w-full text-primary placeholder-on-surface-variant uppercase"
              />
              <button
                type="submit"
                className="font-label-mono text-xs text-primary hover:opacity-70 px-2 uppercase cursor-pointer"
              >
                Kayıt Ol
              </button>
            </form>
          )}
        </div>
      </div>
    </footer>
  );
}

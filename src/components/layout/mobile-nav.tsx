"use client";

import React from "react";
import Link from "next/link";
import { Sheet } from "@/components/ui/sheet";
import { playClickSound } from "@/lib/audio/sound-effects";

export interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const navLinks = [
    { label: "Tüm Ürünler", href: "/collections/all" },
    { label: "Yeni Gelenler", href: "/collections/new" },
    { label: "Kombin Stüdyosu", href: "/kombin-olustur" },
    { label: "Lookbook Sonbahar '24", href: "/lookbook" },
    { label: "Dergi & Makaleler", href: "/dergi" },
    { label: "Materyal Laboratuvarı", href: "/materyal-lab" },
    { label: "Beden & Silüet Rehberi", href: "/beden-rehberi" },
    { label: "İade & Değişim Portalı", href: "/iade-talebi" },
    { label: "VIP Arşiv Kulübü", href: "/vip-kulup" },
    { label: "Dış Giyim", href: "/collections/outerwear" },
    { label: "Üst Giyim", href: "/collections/tops" },
    { label: "Alt Giyim", href: "/collections/bottoms" },
    { label: "Favorilerim", href: "/wishlist" },
    { label: "Ürün Karşılaştırma", href: "/karsilastir" },
    { label: "Dijital Hediye Kartı", href: "/hediye-karti" },
    { label: "Kampanyalar & Kuponlar", href: "/kampanyalar" },
    { label: "Kargo Takibi", href: "/kargo-takip" },
    { label: "Sıkça Sorulan Sorular", href: "/sss" },
    { label: "Showroom & İletişim", href: "/iletisim" },
    { label: "Basın Kiti & Medya", href: "/basin-kiti" },
    { label: "Manifesto & İlkeler", href: "/about" },
    { label: "Müşteri Portalı", href: "/account" },
  ];

  return (
    <Sheet
      isOpen={isOpen}
      onClose={onClose}
      side="left"
      title="VOID ARCHIVE"
      maxWidth="max-w-sm"
    >
      <div className="flex flex-col p-6 gap-3.5 font-label-mono uppercase tracking-widest text-[11px]">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="text-primary hover:opacity-60 border-b border-outline-variant pb-2 transition-opacity"
          >
            {link.label}
          </Link>
        ))}

        <div className="mt-4 pt-3 border-t border-primary flex flex-col gap-1 text-[10px] text-on-surface-variant font-label-mono">
          <p>© 2026 VOID ARCHIVE</p>
          <p>KULLANIŞLILIK İÇİN TASARLANDI</p>
        </div>
      </div>
    </Sheet>
  );
}

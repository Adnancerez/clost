"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ShoppingBag } from "lucide-react";
import { MOCK_PRODUCTS } from "@/lib/shopify/mock-data";
import { Product } from "@/lib/shopify/types";
import { ShopTheLookModal } from "@/components/product/shop-the-look";

interface LookItem {
  id: string;
  title: string;
  imageUrl: string;
  location: string;
  productHandle: string;
  products: Product[];
}

export default function LookbookPage() {
  const [activeModalLook, setActiveModalLook] = useState<LookItem | null>(null);

  const looks: LookItem[] = [
    {
      id: "look-01",
      title: "LOOK 01 // HARAJUKU UNICORN ZIP HOODIE + RETRO STAR TEE",
      imageUrl: "/products/sloid-unicorn-zip-hoodie.jpg",
      location: "Tokyo Harajuku // Shibuya District",
      productHandle: "sloid-unicorn-graphic-zip-hoodie",
      products: [MOCK_PRODUCTS[0], MOCK_PRODUCTS[6]],
    },
    {
      id: "look-02",
      title: "LOOK 02 // SAILOR RUGBY TOP + ULTRA BAGGY RAW DENIM",
      imageUrl: "/products/striped-rugby-baggy-denim.jpg",
      location: "Milano Vintage Skate Spot",
      productHandle: "ultra-baggy-balloon-raw-denim",
      products: [MOCK_PRODUCTS[3], MOCK_PRODUCTS[2]],
    },
    {
      id: "look-03",
      title: "LOOK 03 // LA FAM STRIPED TOP + DISTRESSED DENIM JORTS",
      imageUrl: "/products/lafam-striped-jorts.jpg",
      location: "Amsterdam Indie Boulevard",
      productHandle: "la-fam-start-and-end-striped-top",
      products: [MOCK_PRODUCTS[4], MOCK_PRODUCTS[5]],
    },
    {
      id: "look-04",
      title: "LOOK 04 // JELLY STAR LONGSLEEVE + RAW BAGGY DENIM",
      imageUrl: "/products/jelly-star-longsleeve.jpg",
      location: "London Neo-Y2K Archive",
      productHandle: "jelly-star-striped-longsleeve",
      products: [MOCK_PRODUCTS[1], MOCK_PRODUCTS[2]],
    },
  ];

  return (
    <main className="flex-grow flex flex-col bg-surface">
      {/* Header */}
      <header className="p-6 md:p-12 border-b border-primary bg-surface flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <span className="font-label-mono text-xs uppercase text-on-surface-variant block mb-2 font-bold">
            SONBAHAR &apos;24 // EDİTORYAL SOKAK KAMPANYASI
          </span>
          <h1 className="font-display-lg-mobile md:font-display-lg uppercase tracking-tighter text-primary font-bold">
            LOOKBOOK
          </h1>
        </div>
        <p className="font-label-mono text-xs uppercase text-on-surface-variant max-w-xs leading-relaxed">
          Gen-Z, Y2K ve Skater sokak silüetleri. Fotoğraflara tıklayarak editoryal stili %10 indirimli set olarak sepete ekleyin.
        </p>
      </header>

      {/* Grid of Looks */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-primary border-b border-primary max-w-[1920px] mx-auto w-full">
        {looks.map((look, index) => (
          <div
            key={look.id}
            className={`flex flex-col ${index >= 2 ? "md:border-t md:border-primary" : ""}`}
          >
            {/* Image Container */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface-variant group">
              <Image
                src={look.imageUrl}
                alt={look.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => setActiveModalLook(look)}
                  className="bg-surface text-primary border-2 border-primary font-label-mono text-xs uppercase px-6 py-3 tracking-widest flex items-center gap-2 hover:bg-primary hover:text-on-primary transition-colors cursor-pointer shadow-2xl font-bold"
                >
                  <ShoppingBag className="w-4 h-4" /> Bu Görünümü Al ({look.products.length} Parça)
                </button>
              </div>
            </div>

            {/* Info Footer Bar */}
            <div className="p-6 bg-surface flex justify-between items-center border-t border-primary">
              <div>
                <h3 className="font-headline-sm uppercase text-primary text-base font-bold">
                  {look.title}
                </h3>
                <span className="font-label-mono text-xs text-on-surface-variant block mt-0.5">
                  {look.location}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveModalLook(look)}
                  className="p-3 border border-primary hover:bg-primary hover:text-on-primary transition-colors cursor-pointer text-xs font-label-mono uppercase flex items-center gap-1.5 font-bold"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span className="hidden sm:inline">Seti İncele</span>
                </button>

                <Link
                  href={`/products/${look.productHandle}`}
                  className="p-3 border border-primary hover:bg-surface-variant transition-colors flex items-center justify-center text-primary"
                  aria-label="Ana Ürün Detayına Git"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Shop The Look Quick Modal */}
      {activeModalLook && (
        <ShopTheLookModal
          isOpen={true}
          onClose={() => setActiveModalLook(null)}
          lookTitle={activeModalLook.title}
          products={activeModalLook.products}
        />
      )}
    </main>
  );
}

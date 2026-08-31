import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Layers, Sparkles } from "lucide-react";
import { getCollections } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "Koleksiyonlar Dizini — CLOST",
  description:
    "CLOST Y2K ve Gen-Z sokak modası koleksiyonları. Dış Giyim, Üst Giyim, Alt Giyim ve Yeni Gelenler.",
};

export default async function CollectionsDirectoryPage() {
  const collections = await getCollections();

  const collectionHeroImages: Record<string, { image: string; tag: string; highlight: string }> = {
    all: {
      image: "/products/striped-rugby-baggy-denim.jpg",
      tag: "TAM ARŞİV",
      highlight: "8 Parça // Y2K & Skater Koleksiyonu",
    },
    new: {
      image: "/products/sloid-unicorn-zip-hoodie.jpg",
      tag: "YENİ DROP",
      highlight: "Sonbahar '24 // Sınırlı Üretim",
    },
    outerwear: {
      image: "/products/sloid-unicorn-zip-hoodie.jpg",
      tag: "DIŞ GİYİM",
      highlight: "Grafik Baskılı Zip Hoodie & Sweat",
    },
    tops: {
      image: "/products/jelly-star-longsleeve.jpg",
      tag: "ÜST GİYİM",
      highlight: "Çizgili Rugby, Longsleeve & Baby Tee",
    },
    bottoms: {
      image: "/products/lafam-striped-jorts.jpg",
      tag: "ALT GİYİM",
      highlight: "Ultra Baggy Selvedge Denim & Jorts",
    },
  };

  return (
    <main className="flex-grow flex flex-col">
      {/* Header */}
      <header className="p-6 md:p-12 border-b border-primary bg-surface flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <span className="font-label-mono text-xs uppercase text-on-surface-variant block mb-2 font-bold">
            SOKAK ARŞİVİ // SONBAHAR &apos;24
          </span>
          <h1 className="font-display-lg-mobile md:font-display-lg uppercase tracking-tighter text-primary font-bold">
            KOLEKSİYONLAR
          </h1>
        </div>
        <div className="flex items-center gap-2 font-label-mono text-xs text-on-surface-variant uppercase font-bold">
          <Layers className="w-4 h-4 text-primary" />
          <span>5 Kategori • Y2K &amp; Gen-Z Silüetleri</span>
        </div>
      </header>

      {/* Featured Big Spotlight Cards */}
      <section className="p-6 md:p-12 max-w-[1920px] mx-auto w-full flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((col) => {
            const meta = collectionHeroImages[col.handle] || {
              image: "/products/sloid-unicorn-zip-hoodie.jpg",
              tag: "ARŞİV",
              highlight: "CLOST Temel Parçaları",
            };

            return (
              <Link
                key={col.handle}
                href={`/collections/${col.handle}`}
                className="group border border-primary bg-surface flex flex-col justify-between overflow-hidden hover:border-primary transition-all duration-300 relative shadow-sm"
              >
                {/* Visual Image Banner */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-variant border-b border-primary">
                  <Image
                    src={meta.image}
                    alt={col.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-primary text-on-primary font-label-mono text-[10px] uppercase px-2.5 py-1 font-bold">
                      {meta.tag}
                    </span>
                  </div>

                  <span className="absolute bottom-3 right-3 bg-surface/90 backdrop-blur-sm border border-primary font-label-mono text-[10px] uppercase px-2 py-0.5 text-primary font-bold">
                    {col.products?.length || 0} Ürün
                  </span>
                </div>

                {/* Details Footer */}
                <div className="p-6 flex flex-col justify-between gap-4 flex-1">
                  <div>
                    <span className="font-label-mono text-[11px] uppercase text-on-surface-variant block mb-1 font-bold">
                      {meta.highlight}
                    </span>
                    <h2 className="font-headline-sm uppercase text-primary text-xl group-hover:underline font-bold">
                      {col.title}
                    </h2>
                    <p className="font-body-md text-xs text-on-surface-variant mt-2 line-clamp-2 leading-relaxed">
                      {col.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between font-label-mono text-xs uppercase text-primary border-t border-outline-variant pt-3 font-bold group-hover:text-primary">
                    <span>Koleksiyonu İncele</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Direct Lookbook CTA Banner */}
      <section className="p-6 md:p-12 border-t border-primary bg-surface-container-low">
        <div className="max-w-5xl mx-auto border border-primary bg-surface p-8 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="font-label-mono text-xs uppercase text-on-surface-variant font-bold">
                EDİTORYAL LOOKBOOK
              </span>
            </div>
            <h3 className="font-headline-sm uppercase text-primary text-xl md:text-2xl font-bold">
              Sonbahar &apos;24 Lookbook Arşivini Keşfedin
            </h3>
            <p className="font-body-md text-xs text-on-surface-variant mt-2 max-w-lg leading-relaxed">
              Sokak kombinlerimizi ve parçaların model üzerindeki duruşunu yüksek çözünürlüklü editoryal çekimlerle inceleyin.
            </p>
          </div>

          <Link
            href="/lookbook"
            className="bg-primary text-on-primary font-label-mono text-xs px-8 py-4 uppercase tracking-widest hover:bg-surface-variant hover:text-primary border border-primary transition-colors whitespace-nowrap font-bold"
          >
            Lookbook&apos;a Git →
          </Link>
        </div>
      </section>
    </main>
  );
}

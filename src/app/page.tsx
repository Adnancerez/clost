import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product/product-card";
import { HeroVideoBanner } from "@/components/home/hero-video-banner";
import { DropCountdownBanner } from "@/components/home/drop-countdown-banner";
import { CategoryShowcase } from "@/components/layout/category-showcase";
import { getProducts } from "@/lib/shopify";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="flex-grow flex flex-col">
      {/* 1. Cinematic Autoplay Video Hero Section */}
      <HeroVideoBanner />

      {/* 2. Featured Grid (Tüm Yeni Parçalar) */}
      <section className="py-12 md:py-16 border-b border-primary bg-surface" id="featured">
        <div className="px-4 md:px-10 mb-8 flex justify-between items-end">
          <div>
            <span className="font-label-mono text-xs text-on-surface-variant block mb-1">
              SUMMER DROP &apos;24 ARŞİVİ
            </span>
            <h2 className="font-headline-md uppercase text-primary tracking-tight">
              Tüm Koleksiyon ({products.length})
            </h2>
          </div>
          <Link
            href="/collections/all"
            className="font-label-mono text-xs border-b border-primary pb-1 hover:opacity-60 transition-opacity"
          >
            Filtrele &amp; Sırala →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 px-4 md:px-10">
          {products.map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={idx < 2}
            />
          ))}
        </div>
      </section>

      {/* 3. Live Drop 02 Countdown & VIP Early Access */}
      <DropCountdownBanner />

      {/* 4. Editorial Manifesto Section */}
      <section id="manifesto" className="border-b border-primary bg-surface-bright">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px] lg:min-h-[600px]">
          {/* Large Image (Left, spanning 7 cols) */}
          <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-outline-variant relative h-[360px] lg:h-auto overflow-hidden group">
            <Image
              src="/products/volt-yellow-mesh-track-jacket-1.jpg"
              alt="CLOST Streetwear Manifesto"
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Narrative Text Block (Right, spanning 4 cols, offset by 1) */}
          <div className="lg:col-span-4 lg:col-start-9 flex flex-col justify-center p-6 md:p-10 py-12">
            <span className="font-label-mono text-on-surface-variant mb-3 border-b border-outline-variant pb-2 inline-block w-max text-xs">
              EDİTORYAL 001 // SOKAK DİLİ
            </span>
            <h2 className="font-headline-md uppercase text-primary mb-4 tracking-tight leading-none text-2xl md:text-3xl">
              Kuralları
              <br />
              Sokak Belirler
            </h2>
            <p className="font-body-lg text-on-surface-variant mb-6 text-sm leading-relaxed">
              2000&apos;ler Y2K skater silüetleri, siber neon kontrastlar ve 14.5 oz ham selvedge denimler.
              Yüksek kaliteli kompakt kumaşlar ve nefes alabilen yazlık teknik file panellerle hazırlandı.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/collections/all"
                className="inline-block border border-primary text-primary font-label-mono text-xs px-8 py-3 text-center hover:bg-primary hover:text-on-primary transition-colors duration-300 uppercase tracking-widest font-bold"
              >
                Koleksiyonu İncele
              </Link>
              <Link
                href="/kombin-olustur"
                className="inline-block bg-primary text-on-primary font-label-mono text-xs px-8 py-3 text-center hover:bg-surface-variant hover:text-primary border border-primary transition-colors duration-300 uppercase tracking-widest font-bold"
              >
                Kombin Tasarla (%15 İndirim) →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Category Showcase (above footer) */}
      <CategoryShowcase />
    </main>
  );
}

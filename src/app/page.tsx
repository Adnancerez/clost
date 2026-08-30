import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Ticker } from "@/components/layout/ticker";
import { ProductCard } from "@/components/product/product-card";
import { getProducts } from "@/lib/shopify";

export default async function HomePage() {
  const products = await getProducts();
  const featuredProducts = products.slice(0, 4);

  return (
    <main className="flex-grow pt-16 flex flex-col">
      {/* Marquee USP Ticker */}
      <Ticker />

      {/* Hero Section */}
      <section className="relative w-full h-[75vh] md:h-[870px] border-b border-primary overflow-hidden group select-none">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhVRpzb1ylxKworpFGnS9n9NPThs_A1JBQXmpHb0KPA0mK4ZFNf8Su2ZP6HZNpsMvuXCCaQ4gWtBhuuOyiA4uOB3qoKFfWvfK5Cv9RBuj50xdABVdQFLirtgan3BkAITJH7l1pDerfU1WeL8k3K7HM48Wu3t0EN3vM5l_vjmfzTpZIy1E5JOB4ZuMFRVh8Gs0bBlyINEHlHzlj-Hv8RuBHgcaPs61TwwMblhXxHSTD1s5HAN_TBcVb"
          alt="VOID ARCHIVE Temel Koleksiyon"
          fill
          priority
          sizes="100vw"
          className="object-cover transition-transform duration-[10s] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/25" />

        <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-10 pb-12 md:pb-20 z-10 pointer-events-none">
          <h1 className="font-display-lg-mobile md:font-display-lg text-white mb-6 uppercase tracking-tighter mix-blend-difference pointer-events-auto">
            Temel Koleksiyon
          </h1>
          <div className="pointer-events-auto">
            <Link
              href="#featured"
              className="inline-block bg-primary text-on-primary font-label-mono text-sm px-10 py-4 hover:bg-surface hover:text-primary border border-transparent hover:border-primary transition-colors duration-300 uppercase tracking-widest"
            >
              Keşfet
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Grid (Yeni Gelenler) */}
      <section className="py-12 md:py-20 border-b border-primary" id="featured">
        <div className="px-4 md:px-10 mb-8 flex justify-between items-end">
          <h2 className="font-headline-md uppercase text-primary tracking-tighter">
            Yeni Gelenler
          </h2>
          <Link
            href="/collections/all"
            className="font-label-mono text-xs uppercase border-b border-primary pb-1 hover:opacity-70 transition-opacity"
          >
            Tümünü Gör
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-10">
          {featuredProducts.map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={idx < 2}
            />
          ))}
        </div>
      </section>

      {/* Editorial Manifesto Section */}
      <section id="manifesto" className="border-b border-primary bg-surface-bright">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px] lg:min-h-[716px]">
          {/* Large Image (Left, spanning 7 cols) */}
          <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-outline-variant relative h-[400px] lg:h-auto overflow-hidden group">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsnAGILp2S-cLEM0DzPAduoEeAkpSoeItOpjNIYXMuiEqWz3KXB2H3vgRklx_-pAF1WsB4kcPAl5D8ALH1_3eKkumhYmRh9nZ2B4pjYLzYZLv0FyIxKMXdLYXEgGXiLWNR2BIt5QJExHO5CoMJouW7aCapeGbWvcU8SZgrvcHpGdQLOO6Uld0MoU1FzJYABEGpyVJiBd4eGU_bMNpQJjdgn-voNIHMYuhrUczRrnAJwPqkHJpC_yJO"
              alt="VOID ARCHIVE Manifesto"
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover grayscale contrast-125 transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Narrative Text Block (Right, spanning 4 cols, offset by 1) */}
          <div className="lg:col-span-4 lg:col-start-9 flex flex-col justify-center p-6 md:p-10 py-16">
            <span className="font-label-mono uppercase text-on-surface-variant mb-4 border-b border-outline-variant pb-1 inline-block w-max text-xs">
              Editoryal 001
            </span>
            <h2 className="font-headline-md uppercase text-primary mb-4 tracking-tighter leading-none">
              Kullanışlılık İçin
              <br />
              Tasarlandı
            </h2>
            <p className="font-body-lg text-on-surface-variant mb-8 text-sm md:text-base leading-relaxed">
              Yapısal bütünlüğe tavizsiz bağlılık. Temel Koleksiyon, gereksiz süslemeleri ve
              geçici trendleri tamamen reddederek mutlak fonksiyonelliği merkeze alır.
              Modern şehir silüetleri için geliştirilmiş ağır gramajlı kumaşlar.
            </p>
            <Link
              href="/about"
              className="inline-block border border-primary text-primary font-label-mono text-xs px-10 py-4 text-center hover:bg-primary hover:text-on-primary transition-colors duration-300 uppercase tracking-widest w-full sm:w-auto"
            >
              Manifestoyu Oku
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

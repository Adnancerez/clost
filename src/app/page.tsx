import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product/product-card";
import { getProducts } from "@/lib/shopify";

export default async function HomePage() {
  const products = await getProducts();
  const featuredProducts = products.slice(0, 4);

  return (
    <main className="flex-grow flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full h-[75vh] md:h-[820px] border-b border-primary overflow-hidden group select-none">
        <Image
          src="/products/striped-rugby-baggy-denim.jpg"
          alt="CLOST Y2K & Gen-Z Streetwear Drop"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_12%] transition-transform duration-[10s] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-10 pb-12 md:pb-16 z-10 pointer-events-none">
          <div className="pointer-events-auto mb-2">
            <span className="font-label-mono text-xs uppercase bg-primary text-white px-3 py-1 tracking-widest inline-block font-bold">
              YENİ DROP // FALL 2024
            </span>
          </div>
          <h1 className="font-display-lg-mobile md:font-display-lg text-white mb-6 uppercase tracking-tighter mix-blend-difference pointer-events-auto font-bold">
            Y2K SOKAK ARŞİVİ
          </h1>
          <div className="pointer-events-auto flex flex-wrap gap-3">
            <Link
              href="/collections/all"
              className="inline-block bg-primary text-on-primary font-label-mono text-sm px-8 py-3.5 hover:bg-surface hover:text-primary border border-transparent hover:border-primary transition-colors duration-300 uppercase tracking-widest font-bold"
            >
              Tüm Parçaları Keşfet →
            </Link>
            <Link
              href="/lookbook"
              className="inline-block bg-surface text-primary font-label-mono text-sm px-8 py-3.5 hover:bg-primary hover:text-white border border-primary transition-colors duration-300 uppercase tracking-widest font-bold"
            >
              Lookbook &apos;24
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Grid (Yeni Gelenler) */}
      <section className="py-12 md:py-16 border-b border-primary bg-surface" id="featured">
        <div className="px-4 md:px-10 mb-8 flex justify-between items-end">
          <div>
            <span className="font-label-mono text-xs uppercase text-on-surface-variant block mb-1 font-bold">
              ÖNE ÇIKAN SOKAK PARÇALARI
            </span>
            <h2 className="font-headline-md uppercase text-primary tracking-tighter font-bold">
              Yeni Drop &apos;24
            </h2>
          </div>
          <Link
            href="/collections/all"
            className="font-label-mono text-xs uppercase border-b border-primary pb-1 hover:opacity-70 transition-opacity font-bold"
          >
            Tümünü Gör ({products.length})
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
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px] lg:min-h-[600px]">
          {/* Large Image (Left, spanning 7 cols) */}
          <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-outline-variant relative h-[360px] lg:h-auto overflow-hidden group">
            <Image
              src="/products/lafam-striped-jorts.jpg"
              alt="CLOST Streetwear Manifesto"
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Narrative Text Block (Right, spanning 4 cols, offset by 1) */}
          <div className="lg:col-span-4 lg:col-start-9 flex flex-col justify-center p-6 md:p-10 py-12">
            <span className="font-label-mono uppercase text-on-surface-variant mb-3 border-b border-outline-variant pb-1 inline-block w-max text-xs font-bold">
              EDİTORYAL 001 // Y2K ESTETİĞİ
            </span>
            <h2 className="font-headline-md uppercase text-primary mb-3 tracking-tighter leading-none font-bold text-2xl md:text-3xl">
              Kuralsız
              <br />
              Sokak Dili
            </h2>
            <p className="font-body-lg text-on-surface-variant mb-6 text-xs md:text-sm leading-relaxed">
              2000&apos;ler skate kültürü, Japon Harajuku grafikleri ve Acubi estetiğinin kesişim noktası.
              Geniş paçalı raw selvedge denimler, canlı renk bloklu çizgili üstler ve ikonik baby tee silüetleri.
            </p>
            <Link
              href="/collections/all"
              className="inline-block border border-primary text-primary font-label-mono text-xs px-8 py-3 text-center hover:bg-primary hover:text-on-primary transition-colors duration-300 uppercase tracking-widest w-full sm:w-auto font-bold"
            >
              Koleksiyonu İncele
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

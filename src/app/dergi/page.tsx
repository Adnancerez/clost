"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, User, ShieldCheck, Droplets, Sparkles, Layers, Check } from "lucide-react";
import { JOURNAL_POSTS } from "@/lib/journal/mock-posts";
import { MOCK_PRODUCTS } from "@/lib/shopify/mock-data";

export default function JournalPage() {
  const featuredPost = JOURNAL_POSTS[0];
  const otherPosts = JOURNAL_POSTS.slice(1);

  // Material Lab Interactive State
  const [washTested, setWashTested] = useState(true);
  const [stretchLevel, setStretchLevel] = useState(85);

  const materials = [
    {
      id: "mat-denim",
      title: "14.5 oz Ham Selvedge Denim Kumaşı",
      spec: "%100 Ham Pamuk Dokuma • Doğal Çekmezlik İşlemi",
      weight: "14.5 oz",
      description:
        "Sert ve dayanıklı ham denim dokusu. Kimyasal ağartma veya suni eskitme yapılmamış, giyildikçe kullanıcının hareketlerine göre kişiselleşen doğal kırılma ve iz yapısı.",
      imageUrl: "/products/striped-rugby-baggy-denim.jpg",
      products: [MOCK_PRODUCTS[2], MOCK_PRODUCTS[5]],
    },
    {
      id: "mat-fleece",
      title: "380 GSM Ağır Gramaj İnterlok Pamuk",
      spec: "%100 Taranmış Kompakt Pamuk • Tüylenmez Yüzey",
      weight: "380 GSM",
      description:
        "Geleneksel hazır giyim kumaşlarının iki katı yoğunluktadır. Yüksek bükümlü kompakt iplik yapısı sayesinde yıkama sonrasında formunu kaybetmez, sarkma yapmaz.",
      imageUrl: "/products/sloid-unicorn-zip-hoodie.jpg",
      products: [MOCK_PRODUCTS[0], MOCK_PRODUCTS[1]],
    },
    {
      id: "mat-suprem",
      title: "Vintage Yıkamalı 240 GSM Pamuk Süprem",
      spec: "Reaktif Serigrafi Baskı • Nefes Alabilir Doku",
      weight: "240 GSM",
      description:
        "Özel enzim yıkamadan geçirilerek elde edilen yumuşak doku ve canlı renk tonları. Y2K grafiklerinin çatlama yapmadan kalıcı kalmasını sağlayan reaktif baskı teknolojisi.",
      imageUrl: "/products/starlet-baby-tee.jpg",
      products: [MOCK_PRODUCTS[4], MOCK_PRODUCTS[6]],
    },
  ];

  return (
    <main className="flex-grow flex flex-col">
      {/* Header */}
      <header className="p-6 md:p-12 border-b border-primary bg-surface flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <span className="font-label-mono text-xs uppercase text-on-surface-variant block mb-2 font-bold">
            EDİTORYAL DERGİ &amp; KUMAŞ LABORATUVARI
          </span>
          <h1 className="font-display-lg-mobile md:font-display-lg uppercase tracking-tighter text-primary font-bold">
            DERGİ &amp; KUMAŞ LAB
          </h1>
        </div>
        <p className="font-label-mono text-xs uppercase text-on-surface-variant max-w-xs font-bold">
          Sokak kültürü makaleleri, Y2K estetiği ve kumaş mühendisliği.
        </p>
      </header>

      {/* Featured Lead Story */}
      {featuredPost && (
        <section className="border-b border-primary bg-surface">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
            <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-primary relative h-[380px] lg:h-auto overflow-hidden group">
              <Image
                src={featuredPost.imageUrl}
                alt={featuredPost.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <span className="absolute top-4 left-4 bg-primary text-on-primary font-label-mono text-[10px] uppercase px-3 py-1 font-bold">
                ÖNE ÇIKAN MAKALE
              </span>
            </div>

            <div className="lg:col-span-5 p-6 md:p-12 flex flex-col justify-between gap-6 bg-surface">
              <div>
                <span className="font-label-mono text-xs uppercase text-on-surface-variant border-b border-outline-variant pb-1 inline-block font-bold">
                  {featuredPost.category} • {featuredPost.date}
                </span>
                <h2 className="font-headline-md uppercase text-primary tracking-tight mt-3 text-2xl md:text-3xl font-bold">
                  {featuredPost.title}
                </h2>
                <p className="font-body-md text-sm text-on-surface-variant mt-3 leading-relaxed">
                  {featuredPost.subtitle}
                </p>
              </div>

              <div className="flex flex-col gap-4 border-t border-outline-variant pt-4">
                <div className="flex items-center gap-4 font-label-mono text-xs text-on-surface-variant font-bold">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {featuredPost.readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" /> {featuredPost.author}
                  </span>
                </div>

                <Link
                  href={`/dergi/${featuredPost.slug}`}
                  className="bg-primary text-on-primary font-label-mono text-xs px-8 py-3.5 uppercase tracking-widest hover:bg-surface-variant hover:text-primary border border-primary transition-colors flex items-center justify-center gap-2 self-start cursor-pointer font-bold"
                >
                  Makaleyi Oku <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Grid of Other Articles */}
      <section className="p-6 md:p-12 max-w-[1920px] mx-auto w-full border-b border-primary">
        <h3 className="font-headline-sm uppercase text-primary mb-8 border-b border-primary pb-3 font-bold">
          Tüm Makaleler &amp; Araştırmalar
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {otherPosts.map((post) => (
            <article
              key={post.slug}
              className="border border-primary bg-surface flex flex-col group shadow-sm"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-variant border-b border-primary">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-surface border border-primary font-label-mono text-[10px] uppercase px-2 py-0.5 text-primary font-bold">
                  {post.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 font-label-mono text-[11px] text-on-surface-variant mb-2 font-bold">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h4 className="font-headline-sm text-lg uppercase text-primary group-hover:underline font-bold">
                    {post.title}
                  </h4>
                  <p className="font-body-md text-xs text-on-surface-variant mt-2 leading-relaxed">
                    {post.subtitle}
                  </p>
                </div>

                <Link
                  href={`/dergi/${post.slug}`}
                  className="font-label-mono text-xs uppercase text-primary font-bold flex items-center gap-1.5 hover:opacity-70 transition-opacity border-t border-outline-variant pt-3"
                >
                  Devamını Oku <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Kumaş & Materyal Laboratuvarı */}
      <section id="materyal-lab" className="p-6 md:p-12 max-w-[1920px] mx-auto w-full">
        <div className="mb-8">
          <span className="font-label-mono text-xs uppercase text-on-surface-variant block mb-1 font-bold">
            LABORATUVAR PROTOKOLÜ // KUMAŞ BİLİMİ
          </span>
          <h2 className="font-display-lg-mobile md:font-headline-md uppercase tracking-tight text-primary font-bold">
            KUMAŞ &amp; MATERYAL LABORATUVARI
          </h2>
          <p className="font-body-md text-sm text-on-surface-variant mt-2 max-w-2xl">
            Tüm CLOST sokak koleksiyonunda kullanılan 14.5 oz raw denim, ağır interlok ve kompakt kumaşların dayanıklılık özellikleri.
          </p>
        </div>

        {/* Interactive Testing Sandbox */}
        <div className="border border-primary bg-surface-container-low p-6 mb-12">
          <div className="flex items-center gap-2 font-label-mono text-xs uppercase text-primary border-b border-primary pb-2 mb-6">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span className="font-bold">İNTERAKTİF KUMAŞ KALİTE SİMÜLATÖRÜ</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Wash Durability Test */}
            <div className="border border-primary bg-surface p-6 flex flex-col justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 font-label-mono text-xs text-primary uppercase font-bold mb-2">
                  <Droplets className="w-4 h-4" /> 01 // 50+ Yıkama Sonrası Çekmezlik &amp; Form Testi
                </div>
                <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                  Önceden stabilize edilmiş kompakt pamuk lifleri, yüksek devirli yıkamalarda bile boyut stabilitesini korur.
                </p>
              </div>

              <div className="border border-outline-variant p-4 bg-surface-container-low flex flex-col items-center gap-3">
                <div className="w-full h-16 border border-primary relative flex items-center justify-center overflow-hidden bg-primary text-white font-label-mono text-xs">
                  {washTested ? (
                    <span className="flex items-center gap-2 text-emerald-300 font-bold">
                      <Check className="w-4 h-4" /> CLOST Ağır Pamuk: Sıfır Çekme, Kalıcı Form (%100 Başarı)
                    </span>
                  ) : (
                    <span className="text-red-400 font-bold">
                      Standart İnce Kumaş: %8 Çekme ve Form Bozulması
                    </span>
                  )}
                </div>

                <div className="flex gap-2 w-full">
                  <button
                    type="button"
                    onClick={() => setWashTested(true)}
                    className={`flex-1 py-2 font-label-mono text-xs uppercase border border-primary transition-colors cursor-pointer ${
                      washTested ? "bg-primary text-white font-bold" : "bg-surface text-primary"
                    }`}
                  >
                    CLOST Kumaşı
                  </button>
                  <button
                    type="button"
                    onClick={() => setWashTested(false)}
                    className={`flex-1 py-2 font-label-mono text-xs uppercase border border-primary transition-colors cursor-pointer ${
                      !washTested ? "bg-primary text-white font-bold" : "bg-surface text-primary"
                    }`}
                  >
                    Sıradan Kumaş
                  </button>
                </div>
              </div>
            </div>

            {/* Print Durability Test */}
            <div className="border border-primary bg-surface p-6 flex flex-col justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 font-label-mono text-xs text-primary uppercase font-bold mb-2">
                  <Sparkles className="w-4 h-4" /> 02 // Reaktif Serigrafi Baskı Dayanıklılığı
                </div>
                <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                  Kumaşın liflerine doğrudan nüfuz eden baskı teknolojisi, gerilme ve sürtünmelerde çatlama yapmaz.
                </p>
              </div>

              <div className="border border-outline-variant p-4 bg-surface-container-low flex flex-col gap-3">
                <div className="flex justify-between font-label-mono text-xs">
                  <span>Esnetme &amp; Gerilme Kuvveti:</span>
                  <span className="font-bold text-primary">%{stretchLevel} Esneme</span>
                </div>

                <input
                  type="range"
                  min={20}
                  max={100}
                  value={stretchLevel}
                  onChange={(e) => setStretchLevel(Number(e.target.value))}
                  className="w-full accent-primary cursor-pointer"
                />

                <div className="border border-primary p-2 bg-surface flex justify-between items-center font-label-mono text-xs">
                  <span className="text-on-surface-variant">Baskı Durumu:</span>
                  <span className="font-bold text-emerald-700">Pürüzsüz &amp; Çatlamasız</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Materials Portfolio Grid */}
        <div className="flex flex-col divide-y divide-primary border border-primary bg-surface">
          {materials.map((mat) => (
            <div
              key={mat.id}
              className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-4 relative aspect-[4/3] w-full border border-primary overflow-hidden bg-surface-variant">
                <Image
                  src={mat.imageUrl}
                  alt={mat.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>

              <div className="lg:col-span-8 flex flex-col gap-4">
                <div>
                  <div className="flex items-center gap-3 font-label-mono text-xs text-on-surface-variant mb-1 font-bold">
                    <span className="flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5 text-primary" /> {mat.weight}
                    </span>
                    <span>•</span>
                    <span className="font-bold text-primary uppercase">{mat.spec}</span>
                  </div>
                  <h3 className="font-headline-sm uppercase text-primary text-xl md:text-2xl font-bold">
                    {mat.title}
                  </h3>
                </div>

                <p className="font-body-md text-sm text-on-surface-variant leading-relaxed max-w-2xl">
                  {mat.description}
                </p>

                <div className="border-t border-outline-variant pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2 font-label-mono text-xs text-primary">
                    <span className="text-on-surface-variant font-bold">Kullanan Parçalar:</span>
                    <span className="font-bold uppercase">
                      {mat.products.map((p) => p.title).join(", ")}
                    </span>
                  </div>

                  <Link
                    href={`/products/${mat.products[0]?.handle || "sloid-unicorn-graphic-zip-hoodie"}`}
                    className="bg-primary text-on-primary font-label-mono text-xs px-6 py-2.5 uppercase tracking-wider hover:bg-surface-variant hover:text-primary border border-primary transition-colors flex items-center gap-1.5 flex-shrink-0 font-bold"
                  >
                    Ürünü İncele <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

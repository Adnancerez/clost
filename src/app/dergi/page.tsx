"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, User, ShieldCheck, Droplets, Wind, Layers, Check } from "lucide-react";
import { JOURNAL_POSTS } from "@/lib/journal/mock-posts";
import { MOCK_PRODUCTS } from "@/lib/shopify/mock-data";

export default function JournalPage() {
  const featuredPost = JOURNAL_POSTS[0];
  const otherPosts = JOURNAL_POSTS.slice(1);

  // Material Lab Interactive State
  const [waterTested, setWaterTested] = useState(true);
  const [windSpeed, setWindSpeed] = useState(65);

  const materials = [
    {
      id: "mat-3l",
      title: "3L Naylon Membran Teknolojisi",
      spec: "20.000 mm Su Direnci • 15.000 g/m² Nefes Alabilirlik",
      weight: "420 GSM",
      description:
        "Dış katmanda yüksek gerilimli yırtılmaz naylon, orta katmanda hidrofilik mikro-gözenekli membran ve içte sürtünmesiz lamine astarın ısıl füzyonuyla oluşturulur. Fırtına koşullarında tam su ve rüzgar blokajı sağlar.",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD0WDpvXYEs1ZQedwFf4RAbPlY8PaclgrCjPTRek-lPQR-vgNqLk5CZy3NSqp76kZG_DFr9Vk8ZUXPCpjB2GKWGN5JPuTyYgEDI-XaLjgICApVOD4vjf-p-DdB67Lb9rr2rgShNuAKZhQdbb0utIOMTG5TyN-V4WCOmgitGOfVdASEtmtWyh5BVkWT4jfngsTB8rHCtb1yMuw01StDzcYFN_3MsA5uUF8BjsmRAvR1TOpnqmw3rMviQ",
      products: [MOCK_PRODUCTS[0], MOCK_PRODUCTS[1]],
    },
    {
      id: "mat-fleece",
      title: "450 GSM Ağır Gramaj Pamuklu Polar",
      spec: "%100 Kompakt Eğrilmiş Pamuk • Ön Yıkamalı Çekmezlik",
      weight: "450 GSM",
      description:
        "Geleneksel hazır giyim polar kumaşlarının neredeyse iki katı yoğunluktadır. Yüksek bükümlü kompakt iplik yapısı sayesinde yıkama sonrasında formunu korur ve tüylenmeyi kalıcı olarak engeller.",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBMt4XmPAa-NLHGZAZn-UUdIdUosMYNjBrq9nzGMX3r9-hoscdSUc--V8FTgjhq3q6epSbSbQfA8LW01mkBGJLgEs7aMgTmHMagAq_aVNdn2exYA2X7qPPAuT_4mqJwNQnPfhXs8T8CHmXVUoiDY34EtqbSqnZygJIpGdkJLgYLfJY_igN7n8oWFFUhDjAWD3ikoMTFgsqPH8xYFxdli7mZKrIfItVWTdb6qW1C2UbqknhkShA7d4s5",
      products: [MOCK_PRODUCTS[5]],
    },
    {
      id: "mat-cordura",
      title: "500D Balistik Naylon & Ripstop",
      spec: "Yüksek Mukavemetli Takviye • Aşınma Direnci",
      weight: "380 GSM",
      description:
        "Askeri taktik donanımlardan ilham alan balistik dokuma, aşırı sürtünme ve kesilme kuvvetlerine karşı maksimum dayanıklılık sunar. Kargo pantolonlar ve taktik yeleklerde kullanılır.",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDfvuvkqrVS7yfktHNmCqB1cQ4ac5jLpWdLd9ta6oB_0_2FHoFq_b1dKxGKUFTcJAbL5G8eKHIpJcAyu2q3E7Y3jstNFkPOZYYK7b8OGewdT95CCojuaMxtpuzqiuCr9qWkhNLh3LgvSseNd3MUV-kCvN6QvuqclAR-vq02hGnQZxRB0MN5JzEP36-QWH4VidF8gacNqETXDjlQr7-ijUYN_uUAwsLcho9N0FnLK8WIKzdOrCN4sO3F",
      products: [MOCK_PRODUCTS[3], MOCK_PRODUCTS[7]],
    },
  ];

  return (
    <main className="flex-grow flex flex-col">
      {/* Header */}
      <header className="p-6 md:p-12 border-b border-primary bg-surface flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <span className="font-label-mono text-xs uppercase text-on-surface-variant block mb-2">
            EDİTORYAL DERGİ &amp; KUMAŞ MÜHENDİSLİĞİ
          </span>
          <h1 className="font-display-lg-mobile md:font-display-lg uppercase tracking-tighter text-primary">
            DERGİ &amp; MATERYAL LAB
          </h1>
        </div>
        <p className="font-label-mono text-xs uppercase text-on-surface-variant max-w-xs">
          Malzeme bilimi, brutalist tasarım felsefesi ve teknik giyim manifestoları.
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
                className="object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700"
              />
              <span className="absolute top-4 left-4 bg-primary text-on-primary font-label-mono text-[10px] uppercase px-3 py-1">
                ÖNE ÇIKAN MAKALE
              </span>
            </div>

            <div className="lg:col-span-5 p-6 md:p-12 flex flex-col justify-between gap-6 bg-surface">
              <div>
                <span className="font-label-mono text-xs uppercase text-on-surface-variant border-b border-outline-variant pb-1 inline-block">
                  {featuredPost.category} • {featuredPost.date}
                </span>
                <h2 className="font-headline-md uppercase text-primary tracking-tight mt-3 text-2xl md:text-3xl">
                  {featuredPost.title}
                </h2>
                <p className="font-body-md text-sm text-on-surface-variant mt-3 leading-relaxed">
                  {featuredPost.subtitle}
                </p>
              </div>

              <div className="flex flex-col gap-4 border-t border-outline-variant pt-4">
                <div className="flex items-center gap-4 font-label-mono text-xs text-on-surface-variant">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {featuredPost.readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" /> {featuredPost.author}
                  </span>
                </div>

                <Link
                  href={`/dergi/${featuredPost.slug}`}
                  className="bg-primary text-on-primary font-label-mono text-xs px-8 py-3.5 uppercase tracking-widest hover:bg-surface-variant hover:text-primary border border-primary transition-colors flex items-center justify-center gap-2 self-start cursor-pointer"
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
        <h3 className="font-headline-sm uppercase text-primary mb-8 border-b border-primary pb-3">
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
                  className="object-cover grayscale group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-surface border border-primary font-label-mono text-[10px] uppercase px-2 py-0.5 text-primary">
                  {post.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 font-label-mono text-[11px] text-on-surface-variant mb-2">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h4 className="font-headline-sm text-lg uppercase text-primary group-hover:underline">
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

      {/* CONSOLIDATED SECTION: Kumaş & Materyal Laboratuvarı */}
      <section id="materyal-lab" className="p-6 md:p-12 max-w-[1920px] mx-auto w-full">
        <div className="mb-8">
          <span className="font-label-mono text-xs uppercase text-on-surface-variant block mb-1">
            LABORATUVAR PROTOKOLÜ // MALZEME BİLİMİ
          </span>
          <h2 className="font-display-lg-mobile md:font-headline-md uppercase tracking-tight text-primary">
            KUMAŞ &amp; MATERYAL LABORATUVARI
          </h2>
          <p className="font-body-md text-sm text-on-surface-variant mt-2 max-w-2xl">
            Tüm CLOST tasarımlarında kullanılan 3L membran, ağır polar ve balistik kumaşların mühendislik testleri ve teknik spesifikasyonları.
          </p>
        </div>

        {/* Interactive Testing Sandbox */}
        <div className="border border-primary bg-surface-container-low p-6 mb-12">
          <div className="flex items-center gap-2 font-label-mono text-xs uppercase text-primary border-b border-primary pb-2 mb-6">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span className="font-bold">İNTERAKTİF DİRENÇ TESTİ SİMÜLATÖRÜ</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Water Test */}
            <div className="border border-primary bg-surface p-6 flex flex-col justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 font-label-mono text-xs text-primary uppercase font-bold mb-2">
                  <Droplets className="w-4 h-4" /> 01 // Hidrofobik Yüzey Testi (DWR)
                </div>
                <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                  Lotus yaprağı etkisinden esinlenen florokarbon-içermeyen DWR kaplama, su damlalarının kumaşa nüfuz etmesini engelleyerek küre şeklinde kaymasını sağlar.
                </p>
              </div>

              <div className="border border-outline-variant p-4 bg-surface-container-low flex flex-col items-center gap-3">
                <div className="w-full h-16 border border-primary relative flex items-center justify-center overflow-hidden bg-primary text-white font-label-mono text-xs">
                  {waterTested ? (
                    <span className="flex items-center gap-2 text-emerald-300 font-bold">
                      <Check className="w-4 h-4" /> Su Damlaları %100 Yüzeyden Sekti (20.000 mm Direnç)
                    </span>
                  ) : (
                    <span className="text-red-400 font-bold">
                      Standart Kumaş: Su Emilimi Gerçekleşti
                    </span>
                  )}
                </div>

                <div className="flex gap-2 w-full">
                  <button
                    type="button"
                    onClick={() => setWaterTested(true)}
                    className={`flex-1 py-2 font-label-mono text-xs uppercase border border-primary transition-colors cursor-pointer ${
                      waterTested ? "bg-primary text-white font-bold" : "bg-surface text-primary"
                    }`}
                  >
                    3L CLOST Kumaşı
                  </button>
                  <button
                    type="button"
                    onClick={() => setWaterTested(false)}
                    className={`flex-1 py-2 font-label-mono text-xs uppercase border border-primary transition-colors cursor-pointer ${
                      !waterTested ? "bg-primary text-white font-bold" : "bg-surface text-primary"
                    }`}
                  >
                    Sıradan Kumaş
                  </button>
                </div>
              </div>
            </div>

            {/* Wind Test */}
            <div className="border border-primary bg-surface p-6 flex flex-col justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 font-label-mono text-xs text-primary uppercase font-bold mb-2">
                  <Wind className="w-4 h-4" /> 02 // Rüzgar Blokajı &amp; Termal İzolasyon
                </div>
                <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                  Lamine membran katmanı, 0 CFM hava geçirgenliği ile rüzgar soğutma faktörünü (wind chill) sıfıra indirir.
                </p>
              </div>

              <div className="border border-outline-variant p-4 bg-surface-container-low flex flex-col gap-3">
                <div className="flex justify-between font-label-mono text-xs">
                  <span>Simüle Rüzgar Hızı:</span>
                  <span className="font-bold text-primary">{windSpeed} km/s (Kuvvetli Fırtına)</span>
                </div>

                <input
                  type="range"
                  min={10}
                  max={100}
                  value={windSpeed}
                  onChange={(e) => setWindSpeed(Number(e.target.value))}
                  className="w-full accent-primary cursor-pointer"
                />

                <div className="border border-primary p-2 bg-surface flex justify-between items-center font-label-mono text-xs">
                  <span className="text-on-surface-variant">Hissedilen Vücut Isı Kaybı:</span>
                  <span className="font-bold text-emerald-700">0°C (Tam Termal Koruma)</span>
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
                  className="object-cover grayscale"
                />
              </div>

              <div className="lg:col-span-8 flex flex-col gap-4">
                <div>
                  <div className="flex items-center gap-3 font-label-mono text-xs text-on-surface-variant mb-1">
                    <span className="flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5 text-primary" /> {mat.weight}
                    </span>
                    <span>•</span>
                    <span className="font-bold text-primary uppercase">{mat.spec}</span>
                  </div>
                  <h3 className="font-headline-sm uppercase text-primary text-xl md:text-2xl">
                    {mat.title}
                  </h3>
                </div>

                <p className="font-body-md text-sm text-on-surface-variant leading-relaxed max-w-2xl">
                  {mat.description}
                </p>

                <div className="border-t border-outline-variant pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2 font-label-mono text-xs text-primary">
                    <span className="text-on-surface-variant">Kullanan Parçalar:</span>
                    <span className="font-bold uppercase">
                      {mat.products.map((p) => p.title).join(", ")}
                    </span>
                  </div>

                  <Link
                    href={`/products/${mat.products[0]?.handle || "oversized-technical-parka-v2"}`}
                    className="bg-primary text-on-primary font-label-mono text-xs px-6 py-2.5 uppercase tracking-wider hover:bg-surface-variant hover:text-primary border border-primary transition-colors flex items-center gap-1.5 flex-shrink-0"
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

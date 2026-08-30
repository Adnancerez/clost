import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Layers, Sparkles } from "lucide-react";
import { getCollections } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "Koleksiyonlar Dizini — CLOST",
  description:
    "CLOST arşiv koleksiyonlarını keşfedin. Dış Giyim, Üst Giyim, Alt Giyim ve Yeni Gelenler.",
};

export default async function CollectionsDirectoryPage() {
  const collections = await getCollections();

  const collectionHeroImages: Record<string, { image: string; tag: string; highlight: string }> = {
    all: {
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDhVRpzb1ylxKworpFGnS9n9NPThs_A1JBQXmpHb0KPA0mK4ZFNf8Su2ZP6HZNpsMvuXCCaQ4gWtBhuuOyiA4uOB3qoKFfWvfK5Cv9RBuj50xdABVdQFLirtgan3BkAITJH7l1pDerfU1WeL8k3K7HM48Wu3t0EN3vM5l_vjmfzTpZIy1E5JOB4ZuMFRVh8Gs0bBlyINEHlHzlj-Hv8RuBHgcaPs61TwwMblhXxHSTD1s5HAN_TBcVb",
      tag: "TAM KATALOG",
      highlight: "8 Parça // Eksiksiz Arşiv",
    },
    new: {
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD0WDpvXYEs1ZQedwFf4RAbPlY8PaclgrCjPTRek-lPQR-vgNqLk5CZy3NSqp76kZG_DFr9Vk8ZUXPCpjB2GKWGN5JPuTyYgEDI-XaLjgICApVOD4vjf-p-DdB67Lb9rr2rgShNuAKZhQdbb0utIOMTG5TyN-V4WCOmgitGOfVdASEtmtWyh5BVkWT4jfngsTB8rHCtb1yMuw01StDzcYFN_3MsA5uUF8BjsmRAvR1TOpnqmw3rMviQ",
      tag: "DROP '24",
      highlight: "Sonbahar 01 // Sınırlı Üretim",
    },
    outerwear: {
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCcgbETzrQr3DMidnsbKEf8qbXM3goTtnUnNEuHrcqEGHZaLy9v2lVnwiRIXLXcF-rBbp_S1tuwGxzQkJzAwht8P8jakPrIhGDkieohzs_69yyNSNoK6a40_h96-VV-m5tJfauM0M47lz4UQRB8kul5fQe-kdSLMLCFgNXsJLX1tF-gvDYEcwRuO0dS8Y4DDgUX6Hp2GSe4vvGQT4pu6qISXlgK2YI1xaOHKoPW-vOHlNfaw0s946WO",
      tag: "3L MEMBRAN",
      highlight: "Teknik Parka, Ceket & Taktik Yelek",
    },
    tops: {
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCdxcHT2JhGKFYhsnqXg_qqHbtxxYQCmToLiL1_2e1ihHnzouJ1ZuBy1690y6qJ-iBvU3lxzXTS2gqIR2VzSAGAidhnBMcJXGetFZnPeMGOzB5dnLnGsrHZQPIpCUonLIb1FQp8jju7_5XhsvfZqROlri_qwhJchhTUQt_3zQHGNh8Fz4HFlF5qCS8J501T-n6ac4jJT1-ZpNS_LV5cvpnT2Hv42bw9rkihkHvKPm8wgQub2mnx13Mh",
      tag: "500 GSM POLAR",
      highlight: "Kapüşonlu Hoodie, Gömlek & Tişört",
    },
    bottoms: {
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBo1FQ7iwNeM3ACvTQSVdRxuK6DgTqqaxR0fIVr44t1OgQFpjH5zEVhDKYYhute1MkIeNssckFos4F9SRem5303jo75LYF-5r2xvYqV9snaEWOJgfJq1EKWAs1WpDqZU4WvLOfBBnQP4MJIub8sGoWHX7hzbSgXj384EEYcVWAbCRctAxVzAlvCGAR9C4gazSu3ojMX2M49khOhxtUphxtkL2eXGrOSnYJ_i8w9T2U42gNYl9Wq5B4R",
      tag: "RIPSTOP & SELVEDGE",
      highlight: "Asimetrik Denim & Modüler Kargo",
    },
  };

  return (
    <main className="flex-grow pt-16 flex flex-col">
      {/* Header */}
      <header className="p-6 md:p-12 border-b border-primary bg-surface flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <span className="font-label-mono text-xs uppercase text-on-surface-variant block mb-2">
            ARŞİV DİZİNİ // SONBAHAR &amp; KIŞ &apos;24
          </span>
          <h1 className="font-display-lg-mobile md:font-display-lg uppercase tracking-tighter text-primary">
            KOLEKSİYONLAR
          </h1>
        </div>
        <div className="flex items-center gap-2 font-label-mono text-xs text-on-surface-variant uppercase">
          <Layers className="w-4 h-4 text-primary" />
          <span>5 Tematik Kategori • Mimari Silüetler</span>
        </div>
      </header>

      {/* Featured Big Spotlight Cards */}
      <section className="p-6 md:p-12 max-w-[1920px] mx-auto w-full flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((col) => {
            const meta = collectionHeroImages[col.handle] || {
              image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuD0WDpvXYEs1ZQedwFf4RAbPlY8PaclgrCjPTRek-lPQR-vgNqLk5CZy3NSqp76kZG_DFr9Vk8ZUXPCpjB2GKWGN5JPuTyYgEDI-XaLjgICApVOD4vjf-p-DdB67Lb9rr2rgShNuAKZhQdbb0utIOMTG5TyN-V4WCOmgitGOfVdASEtmtWyh5BVkWT4jfngsTB8rHCtb1yMuw01StDzcYFN_3MsA5uUF8BjsmRAvR1TOpnqmw3rMviQ",
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
                    className="object-cover grayscale contrast-110 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-primary text-on-primary font-label-mono text-[10px] uppercase px-2.5 py-1">
                      {meta.tag}
                    </span>
                  </div>

                  <span className="absolute bottom-3 right-3 bg-surface/90 backdrop-blur-sm border border-primary font-label-mono text-[10px] uppercase px-2 py-0.5 text-primary">
                    {col.products?.length || 0} Ürün
                  </span>
                </div>

                {/* Details Footer */}
                <div className="p-6 flex flex-col justify-between gap-4 flex-1">
                  <div>
                    <span className="font-label-mono text-[11px] uppercase text-on-surface-variant block mb-1">
                      {meta.highlight}
                    </span>
                    <h2 className="font-headline-sm uppercase text-primary text-xl group-hover:underline">
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

      {/* Direct Outfit Studio CTA Banner */}
      <section className="p-6 md:p-12 border-t border-primary bg-surface-container-low">
        <div className="max-w-5xl mx-auto border border-primary bg-surface p-8 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="font-label-mono text-xs uppercase text-on-surface-variant">
                KOMBİN STÜDYOSU
              </span>
            </div>
            <h3 className="font-headline-sm uppercase text-primary text-xl md:text-2xl">
              Tüm Parçaları Bir Vücutta Canlı Dene &amp; Kombinle
            </h3>
            <p className="font-body-md text-xs text-on-surface-variant mt-2 max-w-lg leading-relaxed">
              Dış giyim, üst ve alt parçaları interaktif manken üzerinde giydirerek kendi techwear stilini oluşturun ve %10 anında indirim kazanın.
            </p>
          </div>

          <Link
            href="/kombin-olustur"
            className="bg-primary text-on-primary font-label-mono text-xs px-8 py-4 uppercase tracking-widest hover:bg-surface-variant hover:text-primary border border-primary transition-colors whitespace-nowrap"
          >
            Kombin Stüdyosuna Git →
          </Link>
        </div>
      </section>
    </main>
  );
}

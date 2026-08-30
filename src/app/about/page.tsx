import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Manifesto & İlkeler — CLOST",
  description:
    "Yapısal bütünlüğe tavizsiz bağlılık. Clost manifestosu gereksiz süslemeleri reddeder.",
};

export default function AboutPage() {
  const pillars = [
    {
      number: "01",
      title: "Yapısal Dayanıklılık",
      description:
        "Her dikiş, pens ve fermuar yapısal kalıcılık için hesaplanmıştır. Dış giyimi dekoratif bir giysi değil, mimari bir koruma kalkanı olarak tasarlıyoruz.",
    },
    {
      number: "02",
      title: "Monokrom Netlik",
      description:
        "Renkler en temel tonlarına indirgenmiştir: derin siyahlar, beton grileri ve teknik yırtılmaz dokular. Monokrom netlik, formu dikkat dağıtıcı unsurlardan arındırır.",
    },
    {
      number: "03",
      title: "Ham Fonksiyonellik",
      description:
        "Yüksek tempolu metropol ortamları için tasarlandı. Ağır gramajlı metal aksamlar, su geçirmez yapıştırılmış membranlar ve ergonomik mafsallı kesimler.",
    },
  ];

  return (
    <main className="flex-grow pt-16 flex flex-col">
      {/* Hero Statement */}
      <section className="border-b border-primary p-6 md:p-16 bg-surface-bright">
        <div className="max-w-5xl mx-auto flex flex-col gap-6">
          <span className="font-label-mono text-xs uppercase text-on-surface-variant tracking-widest border-b border-outline-variant pb-2 inline-block w-max">
            CLOST // MANİFESTO 001
          </span>
          <h1 className="font-display-lg-mobile md:font-display-lg text-primary uppercase tracking-tighter leading-none">
            KULLANIŞLILIK İÇİN
            <br />
            TASARLANDI.
          </h1>
          <p className="font-body-lg text-on-surface-variant max-w-2xl text-base md:text-lg leading-relaxed mt-4">
            Hızlı tüketim modasının geçici döngülerini ve gereksiz süslemelerini tamamen reddediyoruz.
            Clost; brutalist mimari, yüksek performanslı teknik kumaşlar ve agresif
            fonksiyonel silüetlerin kesişim noktasında üretilir.
          </p>
        </div>
      </section>

      {/* Split Imagery & Manifesto Details */}
      <section className="border-b border-primary">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
          <div className="lg:col-span-6 border-b lg:border-b-0 lg:border-r border-primary relative h-[450px] lg:h-auto overflow-hidden">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0WDpvXYEs1ZQedwFf4RAbPlY8PaclgrCjPTRek-lPQR-vgNqLk5CZy3NSqp76kZG_DFr9Vk8ZUXPCpjB2GKWGN5JPuTyYgEDI-XaLjgICApVOD4vjf-p-DdB67Lb9rr2rgShNuAKZhQdbb0utIOMTG5TyN-V4WCOmgitGOfVdASEtmtWyh5BVkWT4jfngsTB8rHCtb1yMuw01StDzcYFN_3MsA5uUF8BjsmRAvR1TOpnqmw3rMviQ"
              alt="CLOST Teknik Tasarım"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover grayscale contrast-125"
            />
          </div>

          <div className="lg:col-span-6 p-6 md:p-16 flex flex-col justify-center gap-10 bg-surface">
            <h2 className="font-headline-md text-primary uppercase tracking-tighter">
              Tasarım İlkeleri
            </h2>
            <div className="flex flex-col gap-8">
              {pillars.map((pillar) => (
                <div key={pillar.number} className="flex flex-col gap-2 border-t border-outline-variant pt-4">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-body-lg font-bold text-primary uppercase text-base">
                      {pillar.title}
                    </h3>
                    <span className="font-label-mono text-xs text-on-surface-variant">
                      {pillar.number}
                    </span>
                  </div>
                  <p className="font-body-md text-on-surface-variant text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="p-8 md:p-20 text-center bg-surface border-b border-primary">
        <h2 className="font-headline-sm uppercase text-primary mb-4 tracking-tight">
          Koleksiyonu Keşfedin
        </h2>
        <p className="font-label-mono text-xs uppercase text-on-surface-variant mb-8 max-w-md mx-auto">
          Her parça sınırlı sayıda üretilmekte olup takip edilebilir seri numarasına sahiptir.
        </p>
        <Link
          href="/collections/all"
          className="inline-block bg-primary text-on-primary font-label-mono text-xs px-12 py-4 uppercase tracking-widest hover:bg-surface-variant hover:text-primary border border-primary transition-colors"
        >
          Tüm Ürünleri Gör
        </Link>
      </section>
    </main>
  );
}

import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Manifesto & Marka Kimliği — CLOST",
  description:
    "Y2K, Acubi ve Skater sokak modası arşivi. Kuralsız silüetler, raw denim kumaşlar ve özgün sokak dili.",
};

export default function AboutPage() {
  const pillars = [
    {
      number: "01",
      title: "Kusursuz Baggy & Oversized Kesimler",
      description:
        "Her dikiş, paça genişliği ve omuz düşüklüğü sokak duruşu için milimetrik hesaplanır. Standart kalıpların ötesinde, özgür ve heykelsi bir silüet sunuyoruz.",
    },
    {
      number: "02",
      title: "Y2K & Harajuku Grafik Estetiği",
      description:
        "2000'lerin başındaki sokak asi ruhunu, Japon Harajuku tipografileri ve yıldız motifleriyle bugünün modern Acubi çizgisine taşıyoruz.",
    },
    {
      number: "03",
      title: "14.5 oz Ağır Gramajlı Kumaş Mimarisi",
      description:
        "Gerçek sokak dayanıklılığı için %100 kompakt pamuk, 14.5 oz ham selvedge denimler ve yıkamalı vintage kumaşlar kullanıyoruz.",
    },
  ];

  return (
    <main className="flex-grow flex flex-col">
      {/* Hero Statement */}
      <section className="border-b border-primary p-6 md:p-16 bg-surface-bright">
        <div className="max-w-5xl mx-auto flex flex-col gap-6">
          <span className="font-label-mono text-xs uppercase text-on-surface-variant tracking-widest border-b border-outline-variant pb-2 inline-block w-max font-bold">
            CLOST // MANİFESTO &amp; ARŞİV
          </span>
          <h1 className="font-display-lg-mobile md:font-display-lg text-primary uppercase tracking-tighter leading-none font-bold">
            KURALLARI SOKAK
            <br />
            BELİRLER.
          </h1>
          <p className="font-body-lg text-on-surface-variant max-w-2xl text-base md:text-lg leading-relaxed mt-4">
            Tekdüze ve sıkıcı hızlı modayı reddediyoruz. CLOST; Y2K nostaljisi, skate kültürü ve çağdaş sokak giyiminin buluştuğu bağımsız bir tasarım arşividir.
          </p>
        </div>
      </section>

      {/* Split Imagery & Manifesto Details */}
      <section className="border-b border-primary">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
          <div className="lg:col-span-6 border-b lg:border-b-0 lg:border-r border-primary relative h-[450px] lg:h-auto overflow-hidden">
            <Image
              src="/products/striped-rugby-baggy-denim.jpg"
              alt="CLOST Sokak Tasarım Arşivi"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="lg:col-span-6 p-6 md:p-16 flex flex-col justify-center gap-10 bg-surface">
            <h2 className="font-headline-md text-primary uppercase tracking-tighter font-bold">
              Tasarım İlkelerimiz
            </h2>
            <div className="flex flex-col gap-8">
              {pillars.map((pillar) => (
                <div key={pillar.number} className="flex flex-col gap-2 border-t border-outline-variant pt-4">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-body-lg font-bold text-primary uppercase text-base">
                      {pillar.title}
                    </h3>
                    <span className="font-label-mono text-xs text-on-surface-variant font-bold">
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
        <h2 className="font-headline-sm uppercase text-primary mb-4 tracking-tight font-bold">
          Arşivi Keşfedin
        </h2>
        <p className="font-label-mono text-xs uppercase text-on-surface-variant mb-8 max-w-md mx-auto">
          Her drop sınırlı sayıda üretilmektedir.
        </p>
        <Link
          href="/collections/all"
          className="inline-block bg-primary text-on-primary font-label-mono text-xs px-12 py-4 uppercase tracking-widest hover:bg-surface-variant hover:text-primary border border-primary transition-colors font-bold"
        >
          Tüm Koleksiyonu Gör
        </Link>
      </section>
    </main>
  );
}

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Download, FileText, Check, Mail, Image as ImageIcon, ExternalLink } from "lucide-react";

export default function PressKitPage() {
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleDownload = (name: string) => {
    setDownloading(name);
    setTimeout(() => setDownloading(null), 2000);
  };

  const campaignImages = [
    {
      title: "Look 01 // Teknik Parka & Asimetrik Denim",
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWE313CKKbVMGOlCdkOyRCH75aYprCxXv7nopqIAChruldZcdSQmngzKs6XC9RYsOPMxH3XxAGji2t-CApdVa_UOc8gKBtYtccQdvQ3GwvWU-7oceRDuO-jubQhJHJ8qrZYHi72SHKuCjPA69qCCI81zIpd4rvZov-S81qM6Dzf_wJln5h3-H4HTcfxqWV8yyrdeosOYJDCJjGcMDTKGBKWKvPogVzju3zYy-8BtNJqOlYpX9t7-gm",
    },
    {
      title: "Look 02 // Yapısal Gömlek & Kargo",
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdxcHT2JhGKFYhsnqXg_qqHbtxxYQCmToLiL1_2e1ihHnzouJ1ZuBy1690y6qJ-iBvU3lxzXTS2gqIR2VzSAGAidhnBMcJXGetFZnPeMGOzB5dnLnGsrHZQPIpCUonLIb1FQp8jju7_5XhsvfZqROlri_qwhJchhTUQt_3zQHGNh8Fz4HFlF5qCS8J501T-n6ac4jJT1-ZpNS_LV5cvpnT2Hv42bw9rkihkHvKPm8wgQub2mnx13Mh",
    },
    {
      title: "Look 03 // Taktik Yelek 01 & Monokrom",
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfvuvkqrVS7yfktHNmCqB1cQ4ac5jLpWdLd9ta6oB_0_2FHoFq_b1dKxGKUFTcJAbL5G8eKHIpJcAyu2q3E7Y3jstNFkPOZYYK7b8OGewdT95CCojuaMxtpuzqiuCr9qWkhNLh3LgvSseNd3MUV-kCvN6QvuqclAR-vq02hGnQZxRB0MN5JzEP36-QWH4VidF8gacNqETXDjlQr7-ijUYN_uUAwsLcho9N0FnLK8WIKzdOrCN4sO3F",
    },
  ];

  return (
    <main className="flex-grow pt-16 flex flex-col">
      {/* Header */}
      <header className="p-6 md:p-12 border-b border-primary bg-surface flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <span className="font-label-mono text-xs uppercase text-on-surface-variant block mb-2">
            MEDYA, BASIN &amp; MARKA MATERYALLERİ
          </span>
          <h1 className="font-display-lg-mobile md:font-display-lg uppercase tracking-tighter text-primary">
            BASIN KİTİ
          </h1>
        </div>
        <p className="font-label-mono text-xs uppercase text-on-surface-variant max-w-xs">
          Yüksek çözünürlüklü marka logoları, tipografi standartları ve editoryal kampanya fotoğrafları.
        </p>
      </header>

      {/* Brand Identity & Logo Assets */}
      <section className="border-b border-primary bg-surface-container-low p-6 md:p-12">
        <div className="max-w-5xl mx-auto flex flex-col gap-8">
          <div className="flex justify-between items-center border-b border-primary pb-3">
            <h2 className="font-headline-sm uppercase text-primary text-xl">
              01 // Vektör Logolar &amp; Monogram
            </h2>
            <span className="font-label-mono text-xs uppercase text-on-surface-variant">
              Format: SVG / PNG (300 DPI)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Logo Dark on Light */}
            <div className="border border-primary bg-surface p-8 flex flex-col justify-between items-center gap-6 text-center">
              <span className="font-headline-sm font-bold tracking-tighter text-primary uppercase text-3xl">
                CLOST
              </span>
              <div className="w-full flex justify-between items-center border-t border-outline-variant pt-4 font-label-mono text-xs">
                <span>Ana Tipografik Logo (Siyah)</span>
                <button
                  type="button"
                  onClick={() => handleDownload("logo-black")}
                  className="bg-primary text-on-primary px-4 py-2 uppercase flex items-center gap-1 hover:bg-surface-variant hover:text-primary border border-primary transition-colors cursor-pointer"
                >
                  {downloading === "logo-black" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-400" /> İndirildi
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" /> SVG İndir
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Logo Light on Dark */}
            <div className="border border-primary bg-primary text-on-primary p-8 flex flex-col justify-between items-center gap-6 text-center">
              <span className="font-headline-sm font-bold tracking-tighter uppercase text-3xl">
                CLOST
              </span>
              <div className="w-full flex justify-between items-center border-t border-white/20 pt-4 font-label-mono text-xs">
                <span>Negatif Logo (Beyaz)</span>
                <button
                  type="button"
                  onClick={() => handleDownload("logo-white")}
                  className="bg-surface text-primary px-4 py-2 uppercase flex items-center gap-1 hover:bg-surface-variant transition-colors cursor-pointer border border-surface"
                >
                  {downloading === "logo-white" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-700" /> İndirildi
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" /> SVG İndir
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Media Coverage & Press Contact Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-primary border-b border-primary">
        {/* Media Mentions */}
        <div className="bg-surface-bright p-6 md:p-12 flex flex-col gap-6">
          <h3 className="font-headline-sm uppercase text-primary text-lg flex items-center gap-2">
            <ExternalLink className="w-4 h-4" /> Basında CLOST
          </h3>

          <div className="flex flex-col gap-4 divide-y divide-outline-variant font-label-mono text-xs">
            <div className="pt-3 first:pt-0">
              <span className="text-on-surface-variant text-[11px] block">GQ Style Magazine — Ağustos 2026</span>
              <p className="text-primary font-bold mt-1 text-sm">
                &quot;Brutalist minimalizm ve ağır gramaj tekniğinin Türkiye&apos;deki en iddialı temsilcisi.&quot;
              </p>
            </div>
            <div className="pt-3">
              <span className="text-on-surface-variant text-[11px] block">Hypebeast TR — Temmuz 2026</span>
              <p className="text-primary font-bold mt-1 text-sm">
                &quot;Modanın süsleme fazlalığını temizleyen monokrom bir mimari manifesto.&quot;
              </p>
            </div>
          </div>
        </div>

        {/* PR & Media Inquiries */}
        <div className="border border-primary bg-surface p-6 flex flex-col justify-between gap-6">
          <div>
            <h3 className="font-headline-sm uppercase text-primary text-lg flex items-center gap-2 mb-2">
              <Mail className="w-4 h-4" /> Basın &amp; İletişim İrtibatı
            </h3>
            <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
              Röportaj talepleri, editoryal çekim numunesi temini ve iş birlikleri için doğrudan basın koordinasyon ekibimizle iletişime geçebilirsiniz.
            </p>
          </div>

          <div className="border-t border-outline-variant pt-4 font-label-mono text-xs text-primary flex flex-col gap-1">
            <span className="font-bold">Basın Koordinasyonu:</span>
            <span className="text-on-surface-variant">press@clost.store / +90 (212) 000 00 00</span>
            <span className="text-on-surface-variant mt-1">Levent Mah. Cömert Sok. No: 12, Beşiktaş / İstanbul</span>
          </div>
        </div>
      </section>

      {/* Campaign Editorial Imagery Downloads */}
      <section className="p-6 md:p-12 max-w-[1920px] mx-auto w-full flex flex-col gap-8 border-b border-primary">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-primary pb-4">
          <div>
            <h2 className="font-headline-sm uppercase text-primary text-xl">
              02 // Sonbahar &apos;24 Editoryal Kampanya Fotoğrafları
            </h2>
            <p className="font-label-mono text-xs text-on-surface-variant mt-1">
              Yayın ve basın kullanımı için yüksek çözünürlüklü ham fotoğraflar.
            </p>
          </div>

          <button
            type="button"
            onClick={() => handleDownload("all-campaign")}
            className="bg-primary text-on-primary font-label-mono text-xs px-6 py-2.5 uppercase tracking-wider hover:bg-surface-variant hover:text-primary border border-primary transition-colors flex items-center gap-1.5"
          >
            {downloading === "all-campaign" ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-400" /> Paket İndirildi
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" /> Tüm Kampanyayı İndir (ZIP)
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {campaignImages.map((img, idx) => (
            <div key={idx} className="border border-primary bg-surface flex flex-col">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface-variant">
                <Image
                  src={img.url}
                  alt={img.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover grayscale"
                />
              </div>
              <div className="p-4 border-t border-primary flex justify-between items-center font-label-mono text-xs">
                <span className="truncate max-w-[200px] text-primary">{img.title}</span>
                <button
                  type="button"
                  onClick={() => handleDownload(`img-${idx}`)}
                  className="text-primary underline hover:opacity-70 cursor-pointer uppercase flex items-center gap-1"
                >
                  <ImageIcon className="w-3.5 h-3.5" /> İndir
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Press Releases & Contact */}
      <section className="p-6 md:p-12 max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Press Releases */}
        <div className="border border-primary bg-surface p-6 flex flex-col justify-between gap-6">
          <div>
            <h3 className="font-headline-sm uppercase text-primary text-lg flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4" /> Basın Bültenleri &amp; Raporlar
            </h3>
            <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
              Koleksiyon lansman bülteni ve kurumsal marka manifestosu resmi PDF dökümleri.
            </p>
          </div>

          <div className="flex flex-col gap-2 font-label-mono text-xs">
            <button
              onClick={() => handleDownload("press-release-pdf")}
              className="border border-primary p-3 bg-surface-container-low flex justify-between items-center hover:bg-surface-variant transition-colors cursor-pointer text-left"
            >
              <span>Sonbahar &apos;24 Drop 01 Lansman Bülteni (PDF)</span>
              <Download className="w-4 h-4 text-primary" />
            </button>
            <button
              onClick={() => handleDownload("manifesto-pdf")}
              className="border border-primary p-3 bg-surface-container-low flex justify-between items-center hover:bg-surface-variant transition-colors cursor-pointer text-left"
            >
              <span>Tasarım ve Mimari İlkeler Manifestosu (PDF)</span>
              <Download className="w-4 h-4 text-primary" />
            </button>
          </div>
        </div>

        {/* PR & Media Inquiries */}
        <div className="border border-primary bg-surface p-6 flex flex-col justify-between gap-6">
          <div>
            <h3 className="font-headline-sm uppercase text-primary text-lg flex items-center gap-2 mb-2">
              <Mail className="w-4 h-4" /> Basın &amp; İletişim İrtibatı
            </h3>
            <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
              Röportaj talepleri, editoryal çekim numunesi temini ve iş birlikleri için doğrudan basın koordinasyon ekibimizle iletişime geçebilirsiniz.
            </p>
          </div>

          <div className="border-t border-outline-variant pt-4 font-label-mono text-xs text-primary flex flex-col gap-1">
            <span className="font-bold">Basın Koordinasyonu:</span>
            <span className="text-on-surface-variant">press@clost.store / +90 (212) 000 00 00</span>
            <span className="text-on-surface-variant mt-1">Levent Mah. Cömert Sok. No: 12, Beşiktaş / İstanbul</span>
          </div>
        </div>
      </section>
    </main>
  );
}

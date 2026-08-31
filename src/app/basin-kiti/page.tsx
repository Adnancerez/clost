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
      title: "Look 01 // Sloid Unicorn Graphic Hoodie",
      url: "/products/sloid-unicorn-zip-hoodie.jpg",
    },
    {
      title: "Look 02 // Rugby Longsleeve & Ultra Baggy Denim",
      url: "/products/striped-rugby-baggy-denim.jpg",
    },
    {
      title: "Look 03 // La Fam Striped & Raw Jorts",
      url: "/products/lafam-striped-jorts.jpg",
    },
  ];

  return (
    <main className="flex-grow flex flex-col">
      {/* Header */}
      <header className="p-6 md:p-12 border-b border-primary bg-surface flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <span className="font-label-mono text-xs uppercase text-on-surface-variant block mb-2 font-bold">
            MEDYA, BASIN &amp; MARKA MATERYALLERİ
          </span>
          <h1 className="font-display-lg-mobile md:font-display-lg uppercase tracking-tighter text-primary font-bold">
            BASIN KİTİ
          </h1>
        </div>
        <p className="font-label-mono text-xs uppercase text-on-surface-variant max-w-xs font-bold">
          Yüksek çözünürlüklü marka logoları, tipografi standartları ve editoryal kampanya fotoğrafları.
        </p>
      </header>

      {/* Brand Identity & Logo Assets */}
      <section className="border-b border-primary bg-surface-container-low p-6 md:p-12">
        <div className="max-w-5xl mx-auto flex flex-col gap-8">
          <div className="flex justify-between items-center border-b border-primary pb-3">
            <h2 className="font-headline-sm uppercase text-primary text-xl font-bold">
              01 // Vektör Logolar &amp; Monogram
            </h2>
            <span className="font-label-mono text-xs uppercase text-on-surface-variant font-bold">
              Format: SVG / PNG (300 DPI)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Logo Dark on Light */}
            <div className="border border-primary bg-surface p-8 flex flex-col items-center justify-between gap-6">
              <div className="h-20 flex items-center justify-center">
                <span className="font-headline-md tracking-tighter text-3xl font-black">
                  CLOST
                </span>
              </div>
              <div className="w-full flex justify-between items-center border-t border-outline-variant pt-4 font-label-mono text-xs">
                <span className="text-on-surface-variant">Ana Logotype (Siyah)</span>
                <button
                  type="button"
                  onClick={() => handleDownload("logo-black")}
                  className="border border-primary px-3 py-1 text-primary hover:bg-primary hover:text-on-primary transition-colors cursor-pointer uppercase flex items-center gap-1 font-bold"
                >
                  {downloading === "logo-black" ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-500" /> İndirildi
                    </>
                  ) : (
                    <>
                      <Download className="w-3 h-3" /> SVG İndir
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Logo Light on Dark */}
            <div className="border border-primary bg-primary text-on-primary p-8 flex flex-col items-center justify-between gap-6">
              <div className="h-20 flex items-center justify-center">
                <span className="font-headline-md tracking-tighter text-3xl font-black text-white">
                  CLOST
                </span>
              </div>
              <div className="w-full flex justify-between items-center border-t border-white/20 pt-4 font-label-mono text-xs">
                <span className="text-white/70">Ters Logotype (Beyaz)</span>
                <button
                  type="button"
                  onClick={() => handleDownload("logo-white")}
                  className="border border-white px-3 py-1 text-white hover:bg-white hover:text-black transition-colors cursor-pointer uppercase flex items-center gap-1 font-bold"
                >
                  {downloading === "logo-white" ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" /> İndirildi
                    </>
                  ) : (
                    <>
                      <Download className="w-3 h-3" /> SVG İndir
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Campaign Photography Showcase */}
      <section className="p-6 md:p-12 max-w-5xl mx-auto w-full border-b border-primary">
        <div className="flex justify-between items-center border-b border-primary pb-3 mb-8">
          <div>
            <h2 className="font-headline-sm uppercase text-primary text-xl font-bold">
              02 // Kampanya Fotoğraf Arşivi
            </h2>
            <span className="font-label-mono text-xs uppercase text-on-surface-variant">
              Sonbahar &apos;24 Editoryal Çekimleri (Baskı Kalitesi)
            </span>
          </div>

          <button
            type="button"
            onClick={() => handleDownload("all-campaign-zip")}
            className="hidden sm:flex items-center gap-2 bg-primary text-on-primary px-4 py-2 font-label-mono text-xs uppercase tracking-wider hover:bg-surface-variant hover:text-primary border border-primary transition-colors cursor-pointer font-bold"
          >
            {downloading === "all-campaign-zip" ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" /> Hazırlanıyor...
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" /> Tümünü İndir (.ZIP)
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
                  className="object-cover"
                />
              </div>
              <div className="p-4 border-t border-primary flex justify-between items-center font-label-mono text-xs">
                <span className="truncate max-w-[200px] text-primary font-bold">{img.title}</span>
                <button
                  type="button"
                  onClick={() => handleDownload(`img-${idx}`)}
                  className="text-primary underline hover:opacity-70 cursor-pointer uppercase flex items-center gap-1 font-bold"
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
            <h3 className="font-headline-sm uppercase text-primary text-lg flex items-center gap-2 mb-2 font-bold">
              <FileText className="w-4 h-4" /> Basın Bültenleri &amp; Raporlar
            </h3>
            <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
              En son koleksiyon lansman bülteni, marka manifestosu ve büyüme metrikleri dökümanı.
            </p>
          </div>

          <div className="border-t border-outline-variant pt-4 flex flex-col gap-2 font-label-mono text-xs">
            <div className="flex justify-between items-center">
              <span>CLOST_Fall_24_Release.pdf</span>
              <button
                type="button"
                onClick={() => handleDownload("doc-release")}
                className="text-primary underline hover:opacity-70 uppercase flex items-center gap-1 font-bold"
              >
                <Download className="w-3 h-3" /> İndir (2.4 MB)
              </button>
            </div>
          </div>
        </div>

        {/* Media Inquiries Contact Card */}
        <div className="border border-primary bg-surface-bright p-6 flex flex-col justify-between gap-6">
          <div>
            <h3 className="font-headline-sm uppercase text-primary text-lg flex items-center gap-2 mb-2 font-bold">
              <Mail className="w-4 h-4" /> Basın &amp; İş Birliği İletişimi
            </h3>
            <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
              Röportaj talepleri, editoryal ürün ödünç alma (pull) ve sponsorluk iş birlikleri için doğrudan basın ofisimizle iletişime geçebilirsiniz.
            </p>
          </div>

          <div className="border-t border-outline-variant pt-4 font-label-mono text-xs flex flex-col gap-1">
            <span className="text-on-surface-variant font-bold">Basın İletişim Masası:</span>
            <a
              href="mailto:press@clost.store"
              className="text-primary font-bold underline flex items-center gap-1 text-sm"
            >
              press@clost.store <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

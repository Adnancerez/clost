"use client";

import React, { useRef, useState } from "react";
import { Image as ImageType } from "@/lib/shopify/types";
import { ImageMagnifier } from "./image-magnifier";
import { Eye, Layers } from "lucide-react";

export interface ProductGalleryProps {
  images: ImageType[];
  title: string;
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [activeAngleIndex, setActiveAngleIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const displayImages =
    images && images.length > 0
      ? images
      : [
          {
            url: "/products/cyber-neon-rugby-polo-1.jpg",
            altText: title,
          },
        ];

  const angleLabels = [
    "01 // Ön Boydan Duruş",
    "02 // Kumaş & Detay Dokusu",
    "03 // Sırt & 3/4 Silüet",
  ];

  const scrollToImage = (index: number) => {
    setActiveAngleIndex(index);
    if (containerRef.current) {
      const targetElement = containerRef.current.children[index] as HTMLElement;
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start", inline: "start" });
      }
    }
  };

  return (
    <div className="w-full md:w-[60%] lg:w-[65%] border-b md:border-b-0 md:border-r border-primary flex flex-col no-scrollbar md:h-[calc(100vh-64px)] md:overflow-y-auto bg-surface-variant relative select-none">
      {/* Floating Angle Navigation Strip */}
      <div className="sticky top-0 z-20 bg-surface/90 backdrop-blur-md border-b border-primary p-2.5 px-4 flex items-center justify-between font-label-mono text-[11px]">
        <div className="flex items-center gap-1.5 text-primary font-bold uppercase">
          <Layers className="w-3.5 h-3.5" />
          <span>Çekim Açıları ({displayImages.length})</span>
        </div>

        <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
          {displayImages.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollToImage(idx)}
              className={`px-2.5 py-1 border uppercase font-bold transition-all cursor-pointer text-[10px] ${
                activeAngleIndex === idx
                  ? "bg-primary text-white border-primary"
                  : "bg-surface text-primary border-outline-variant hover:border-primary"
              }`}
            >
              {angleLabels[idx] || `Açı 0${idx + 1}`}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Container (Scrollable on desktop, Snap slider on mobile) */}
      <div
        ref={containerRef}
        className="flex flex-row overflow-x-auto snap-x snap-mandatory md:flex-col md:overflow-visible no-scrollbar"
      >
        {displayImages.map((img, index) => (
          <div
            key={index}
            className="min-w-full md:min-w-0 snap-start border-b border-primary aspect-[4/5] relative bg-surface-variant group"
          >
            <ImageMagnifier
              src={img.url}
              alt={img.altText || `${title} - Fotoğraf ${index + 1}`}
              priority={index === 0}
            />

            {/* Angle Badge */}
            <div className="absolute bottom-4 left-4 z-10 bg-black/80 backdrop-blur-sm text-white border border-white/20 px-3 py-1 font-label-mono text-[10px] uppercase pointer-events-none">
              {angleLabels[index] || `AÇI 0${index + 1}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

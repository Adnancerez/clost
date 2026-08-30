"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Image as ImageType } from "@/lib/shopify/types";
import { RotateCw, Grid } from "lucide-react";
import { ProductSpinner360 } from "./product-spinner-360";
import { playClickSound } from "@/lib/audio/sound-effects";

export interface ProductGalleryProps {
  images: ImageType[];
  title: string;
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [viewMode, setViewMode] = useState<"gallery" | "360">("gallery");

  const displayImages =
    images && images.length > 0
      ? images
      : [
          {
            url: "https://lh3.googleusercontent.com/aida-public/AB6AXuD0WDpvXYEs1ZQedwFf4RAbPlY8PaclgrCjPTRek-lPQR-vgNqLk5CZy3NSqp76kZG_DFr9Vk8ZUXPCpjB2GKWGN5JPuTyYgEDI-XaLjgICApVOD4vjf-p-DdB67Lb9rr2rgShNuAKZhQdbb0utIOMTG5TyN-V4WCOmgitGOfVdASEtmtWyh5BVkWT4jfngsTB8rHCtb1yMuw01StDzcYFN_3MsA5uUF8BjsmRAvR1TOpnqmw3rMviQ",
            altText: title,
          },
        ];

  return (
    <div className="w-full md:w-[60%] lg:w-[65%] border-b md:border-b-0 md:border-r border-primary flex flex-col no-scrollbar md:h-[calc(100vh-64px)] md:overflow-y-auto bg-surface-variant relative">
      {/* View Mode Switcher Header */}
      <div className="sticky top-0 z-20 flex justify-between items-center p-3 border-b border-primary bg-surface font-label-mono text-xs uppercase">
        <span className="text-on-surface-variant">{title}</span>
        <div className="flex border border-primary">
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setViewMode("gallery");
            }}
            className={`px-3 py-1 flex items-center gap-1.5 transition-colors cursor-pointer ${
              viewMode === "gallery"
                ? "bg-primary text-on-primary"
                : "bg-surface text-primary hover:bg-surface-variant"
            }`}
          >
            <Grid className="w-3.5 h-3.5" /> Galeri ({displayImages.length})
          </button>
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setViewMode("360");
            }}
            className={`px-3 py-1 flex items-center gap-1.5 transition-colors cursor-pointer border-l border-primary ${
              viewMode === "360"
                ? "bg-primary text-on-primary"
                : "bg-surface text-primary hover:bg-surface-variant"
            }`}
          >
            <RotateCw className="w-3.5 h-3.5" /> 360° İnceleme
          </button>
        </div>
      </div>

      {viewMode === "360" ? (
        <div className="p-4 md:p-8 flex items-center justify-center flex-1">
          <div className="w-full max-w-lg">
            <ProductSpinner360 images={displayImages} productTitle={title} />
          </div>
        </div>
      ) : (
        /* Gallery Container (Scrollable on desktop, Snap slider on mobile) */
        <div className="flex flex-row overflow-x-auto snap-x snap-mandatory md:flex-col md:overflow-visible no-scrollbar">
          {displayImages.map((img, index) => (
            <div
              key={index}
              className="min-w-full md:min-w-0 snap-start border-b border-primary aspect-[4/5] relative bg-surface-variant"
            >
              <Image
                src={img.url}
                alt={img.altText || `${title} - Fotoğraf ${index + 1}`}
                fill
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, 65vw"
                className="object-cover grayscale mix-blend-multiply"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

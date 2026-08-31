"use client";

import React from "react";
import { Image as ImageType } from "@/lib/shopify/types";
import { ImageMagnifier } from "./image-magnifier";

export interface ProductGalleryProps {
  images: ImageType[];
  title: string;
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const displayImages =
    images && images.length > 0
      ? images
      : [
          {
            url: "/products/sloid-unicorn-zip-hoodie.jpg",
            altText: title,
          },
        ];

  return (
    <div className="w-full md:w-[60%] lg:w-[65%] border-b md:border-b-0 md:border-r border-primary flex flex-col no-scrollbar md:h-[calc(100vh-64px)] md:overflow-y-auto bg-surface-variant relative">
      {/* Gallery Container (Scrollable on desktop, Snap slider on mobile) */}
      <div className="flex flex-row overflow-x-auto snap-x snap-mandatory md:flex-col md:overflow-visible no-scrollbar">
        {displayImages.map((img, index) => (
          <div
            key={index}
            className="min-w-full md:min-w-0 snap-start border-b border-primary aspect-[4/5] relative bg-surface-variant"
          >
            <ImageMagnifier
              src={img.url}
              alt={img.altText || `${title} - Fotoğraf ${index + 1}`}
              priority={index === 0}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

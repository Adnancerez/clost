"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Crosshair } from "lucide-react";

export interface ImageMagnifierProps {
  src: string;
  alt: string;
  zoomLevel?: number;
  priority?: boolean;
}

export function ImageMagnifier({
  src,
  alt,
  zoomLevel = 2.5,
  priority = false,
}: ImageMagnifierProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0, percentX: 50, percentY: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;

    setCoords({ x, y, percentX, percentY });
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="relative w-full h-full overflow-hidden cursor-crosshair select-none bg-surface-variant group"
    >
      {/* Base Image */}
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, 65vw"
        className="object-cover grayscale mix-blend-multiply transition-transform duration-300 group-hover:scale-[1.02]"
      />

      {/* Floating HUD Inspector Badge */}
      <div className="absolute top-4 right-4 z-10 bg-surface/90 backdrop-blur-sm border border-primary px-2.5 py-1 font-label-mono text-[10px] uppercase text-primary flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
        <Crosshair className="w-3 h-3 text-primary animate-spin-slow" />
        <span>Kumaş Büyüteç ({zoomLevel}X)</span>
      </div>

      {/* High-Definition Magnifier Lens & Zoom Overlay */}
      {isHovered && (
        <>
          {/* Target Reticle Cursor Follower */}
          <div
            className="absolute pointer-events-none z-20 border border-primary/60 bg-white/10 backdrop-contrast-125 shadow-2xl transition-transform duration-75 ease-out"
            style={{
              width: "140px",
              height: "140px",
              left: `${coords.x}px`,
              top: `${coords.y}px`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-primary/40 -translate-y-1/2 pointer-events-none" />
            <div className="absolute top-0 left-1/2 w-[1px] h-full bg-primary/40 -translate-x-1/2 pointer-events-none" />
            <div className="absolute top-1 left-1 font-label-mono text-[8px] uppercase text-primary bg-surface/80 px-1">
              DOKU
            </div>
          </div>

          {/* Zoomed Floating Inspector Window (Desktop only) */}
          <div
            className="hidden md:block absolute top-4 left-4 w-52 h-52 border-2 border-primary bg-surface shadow-2xl overflow-hidden z-30 pointer-events-none animate-in fade-in zoom-in-95 duration-150"
            style={{
              backgroundImage: `url(${src})`,
              backgroundPosition: `${coords.percentX}% ${coords.percentY}%`,
              backgroundSize: `${zoomLevel * 100}%`,
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="absolute bottom-1 right-1 bg-primary text-on-primary font-label-mono text-[8px] uppercase px-1.5 py-0.5">
              3L MİKRO DOKU
            </div>
          </div>
        </>
      )}
    </div>
  );
}

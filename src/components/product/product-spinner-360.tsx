"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { RotateCw, Play, Pause } from "lucide-react";
import { playClickSound } from "@/lib/audio/sound-effects";

export interface ProductSpinner360Props {
  images: { url: string; altText?: string }[];
  productTitle: string;
}

export function ProductSpinner360({ images, productTitle }: ProductSpinner360Props) {
  // If we have fewer than 3 images, duplicate or mock frames for smooth rotation
  const frames = images.length >= 2 ? images : [images[0], images[0]];
  const totalFrames = frames.length;

  const [currentFrame, setCurrentFrame] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto rotation loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentFrame((prev) => (prev + 1) % totalFrames);
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, totalFrames]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setIsAutoPlaying(false);
  };

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    const sensitivity = 40; // Pixels per frame shift

    if (Math.abs(deltaX) > sensitivity) {
      const frameDelta = Math.floor(deltaX / sensitivity);
      setCurrentFrame((prev) => {
        let next = (prev - frameDelta) % totalFrames;
        if (next < 0) next += totalFrames;
        return next;
      });
      setStartX(e.clientX);
    }
  }, [isDragging, startX, totalFrames]);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
    }
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [isDragging, handlePointerMove, handlePointerUp]);

  const angle = Math.round((currentFrame / totalFrames) * 360);

  const getAngleLabel = (deg: number) => {
    if (deg >= 315 || deg < 45) return "Ön Profil (0°)";
    if (deg >= 45 && deg < 135) return "Sağ Yan Profil (90°)";
    if (deg >= 135 && deg < 225) return "Arka Profil (180°)";
    return "Sol Yan Profil (270°)";
  };

  return (
    <div className="flex flex-col border border-primary bg-surface select-none">
      {/* 360 Canvas Viewport */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        className="relative aspect-4-5 w-full bg-surface-variant cursor-ew-resize overflow-hidden"
      >
        <Image
          src={frames[currentFrame]?.url || ""}
          alt={`${productTitle} 360 açı ${angle}°`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover grayscale pointer-events-none"
        />

        {/* Floating Controls & Angle Overlay */}
        <div className="absolute top-4 left-4 bg-primary text-on-primary font-label-mono text-[10px] uppercase px-3 py-1.5 flex items-center gap-1.5 shadow-md">
          <RotateCw className="w-3 h-3 animate-spin" style={{ animationDuration: "6s" }} />
          <span>360° İNTERAKTİF GÖRÜNÜM: {angle}°</span>
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-surface/90 border border-primary p-2 backdrop-blur-sm">
          <span className="font-label-mono text-xs text-primary font-bold">
            {getAngleLabel(angle)}
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                playClickSound();
                setIsAutoPlaying(!isAutoPlaying);
              }}
              className="border border-primary px-2.5 py-1 font-label-mono text-[10px] uppercase flex items-center gap-1 hover:bg-primary hover:text-on-primary transition-colors cursor-pointer bg-surface text-primary"
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="w-3 h-3" /> Durdur
                </>
              ) : (
                <>
                  <Play className="w-3 h-3" /> Otomatik Çevir
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Drag Instruction Banner */}
      <div className="p-3 bg-surface-container-low border-t border-primary text-center font-label-mono text-[11px] text-on-surface-variant uppercase">
        ↔ Ürünü 360 derece döndürmek için yatay kaydırın veya sürükleyin
      </div>
    </div>
  );
}

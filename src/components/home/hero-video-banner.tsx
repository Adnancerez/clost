"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { Volume2, VolumeX, Play, Pause, Sparkles } from "lucide-react";

export function HeroVideoBanner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative w-full h-[80vh] md:h-[860px] border-b border-primary overflow-hidden group select-none bg-black">
      {/* HTML5 Autoplay Video Loop */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        poster="/products/cyber-neon-rugby-polo-1.jpg"
        className="absolute inset-0 w-full h-full object-cover object-center"
      >
        <source src="/videos/hero-tokyo-night.mp4" type="video/mp4" />
        Tarayıcınız video etiketini desteklemiyor.
      </video>

      {/* Cinematic Dark Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20 pointer-events-none" />

      {/* Top Left Live Broadcast Indicator */}
      <div className="absolute top-6 left-4 md:left-10 z-20 flex items-center gap-2 font-label-mono text-[11px] uppercase tracking-widest text-white/90 bg-black/40 backdrop-blur-md px-3 py-1 border border-white/20">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        <span>TOKYO NIGHT // CAMPAIGN &apos;24</span>
      </div>

      {/* Video Interaction Controls (Play/Pause & Mute/Unmute) */}
      <div className="absolute top-6 right-4 md:right-10 z-20 flex items-center gap-2">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? "Videoyu Durdur" : "Videoyu Oynat"}
          className="p-2.5 bg-black/60 backdrop-blur-md text-white border border-white/30 hover:border-white hover:bg-white hover:text-black transition-all cursor-pointer"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>

        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? "Sesi Aç" : "Sesi Kapat"}
          className="p-2.5 bg-black/60 backdrop-blur-md text-white border border-white/30 hover:border-white hover:bg-white hover:text-black transition-all cursor-pointer"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Hero Typography & CTAs */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-10 pb-12 md:pb-16 z-10 pointer-events-none">
        <div className="pointer-events-auto mb-2 flex items-center gap-2">
          <span className="font-label-mono text-xs uppercase bg-primary text-white px-3 py-1 tracking-widest inline-flex items-center gap-1.5 font-bold border border-white/30">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            YENİ DROP // SUMMER 2024
          </span>
        </div>

        <h1 className="font-display-lg-mobile md:font-display-lg text-white mb-6 uppercase tracking-tighter mix-blend-difference pointer-events-auto font-bold">
          Y2K SOKAK ARŞİVİ
        </h1>

        <div className="pointer-events-auto flex flex-wrap gap-3">
          <Link
            href="/collections/all"
            className="inline-block bg-primary text-on-primary font-label-mono text-sm px-8 py-3.5 hover:bg-surface hover:text-primary border border-transparent hover:border-primary transition-colors duration-300 uppercase tracking-widest font-bold cursor-pointer"
          >
            Tüm Parçaları Keşfet →
          </Link>
          <Link
            href="/lookbook"
            className="inline-block bg-surface text-primary font-label-mono text-sm px-8 py-3.5 hover:bg-primary hover:text-white border border-primary transition-colors duration-300 uppercase tracking-widest font-bold cursor-pointer"
          >
            Lookbook &apos;24
          </Link>
        </div>
      </div>
    </section>
  );
}

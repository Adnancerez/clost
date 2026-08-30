"use client";

import React, { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, User, ShoppingBag, Heart, Volume2, VolumeX } from "lucide-react";
import { useCartStore } from "@/lib/store/useCartStore";
import { useWishlistStore } from "@/lib/store/useWishlistStore";
import { isAudioMuted, setAudioMuted, playClickSound, playDrawerSound } from "@/lib/audio/sound-effects";
import { MobileNav } from "./mobile-nav";
import { SearchModal } from "./search-modal";

const emptySubscribe = () => () => {};

export function Header() {
  const pathname = usePathname();
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mutedState, setMutedState] = useState<boolean | null>(null);

  const { openCart, getTotalQuantity } = useCartStore();
  const { getTotalCount: getWishlistCount } = useWishlistStore();

  const isMuted = mutedState !== null ? mutedState : isMounted ? isAudioMuted() : false;

  const toggleSound = () => {
    const nextMuted = !isMuted;
    setMutedState(nextMuted);
    setAudioMuted(nextMuted);
    if (!nextMuted) {
      setTimeout(() => playClickSound(), 50);
    }
  };

  const handleOpenCart = () => {
    playDrawerSound();
    openCart();
  };

  const totalQuantity = isMounted ? getTotalQuantity() : 0;
  const wishlistCount = isMounted ? getWishlistCount() : 0;

  // Streamlined 5 essential desktop navigation links
  const navLinks = [
    { label: "Tüm Ürünler", href: "/collections/all" },
    { label: "Koleksiyonlar", href: "/collections" },
    { label: "Kombin Stüdyosu", href: "/kombin-olustur" },
    { label: "Lookbook", href: "/lookbook" },
    { label: "Dergi", href: "/dergi" },
  ];

  return (
    <>
      <header className="fixed top-8 w-full z-40 flex justify-between items-center px-4 md:px-10 h-16 bg-surface border-b border-primary transition-all duration-200">
        {/* Desktop Nav Links */}
        <div className="hidden lg:flex gap-6 font-label-mono text-xs items-center">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/collections"
                ? pathname.startsWith("/collections") &&
                  pathname !== "/collections/new" &&
                  pathname !== "/collections/all"
                : pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={playClickSound}
                className={`transition-opacity duration-200 uppercase tracking-wider ${
                  isActive
                    ? "text-primary border-b border-primary pb-0.5"
                    : "text-on-surface-variant hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile / Tablet Hamburger Toggle */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => {
              playClickSound();
              setIsMobileNavOpen(true);
            }}
            aria-label="Menüyü aç"
            className="text-primary p-2 hover:opacity-70 transition-opacity cursor-pointer"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Brand Logo */}
        <Link
          href="/"
          onClick={playClickSound}
          className="font-headline-sm font-bold tracking-tighter text-primary uppercase absolute left-1/2 -translate-x-1/2 text-base md:text-lg"
        >
          VOID ARCHIVE
        </Link>

        {/* Action Icons */}
        <div className="flex gap-2 sm:gap-4 text-primary items-center">
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            aria-label={isMuted ? "Sesi aç" : "Sesi kapat"}
            className="p-1.5 hover:opacity-70 transition-opacity duration-200 cursor-pointer hidden md:block"
            title={isMuted ? "Sesi Aç" : "Sesi Kapat"}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-outline" /> : <Volume2 className="w-4 h-4 text-primary" />}
          </button>

          {/* Search Trigger */}
          <button
            onClick={() => {
              playClickSound();
              setIsSearchOpen(true);
            }}
            aria-label="Arama yap"
            className="p-1.5 hover:opacity-70 transition-opacity duration-200 cursor-pointer"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Wishlist Link */}
          <Link
            href="/wishlist"
            onClick={playClickSound}
            aria-label={`Favorilerim (${wishlistCount} ürün)`}
            className="p-1.5 hover:opacity-70 transition-opacity duration-200 relative flex items-center"
          >
            <Heart className="w-4 h-4" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-on-primary font-label-mono text-[9px] w-4 h-4 flex items-center justify-center border border-surface">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Account Link */}
          <Link
            href="/account"
            onClick={playClickSound}
            aria-label="Müşteri Hesabı"
            className="p-1.5 hover:opacity-70 transition-opacity duration-200 hidden sm:block"
          >
            <User className="w-4 h-4" />
          </Link>

          {/* Cart Trigger */}
          <button
            onClick={handleOpenCart}
            aria-label={`Alışveriş sepeti (${totalQuantity} ürün)`}
            className="p-1.5 hover:opacity-70 transition-opacity duration-200 relative cursor-pointer flex items-center"
          >
            <ShoppingBag className="w-4 h-4" />
            {totalQuantity > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-on-primary font-label-mono text-[9px] w-4 h-4 flex items-center justify-center border border-surface">
                {totalQuantity}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}

"use client";

import React, { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, User, ShoppingBag, Heart, Shield } from "lucide-react";
import { useCartStore } from "@/lib/store/useCartStore";
import { useWishlistStore } from "@/lib/store/useWishlistStore";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { MobileNav } from "./mobile-nav";
import { SearchModal } from "./search-modal";
import { CurrencySwitcher } from "./currency-switcher";
import { MAIN_NAV_LINKS } from "@/lib/constants/navigation";

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

  const { openCart, getTotalQuantity } = useCartStore();
  const { getTotalCount: getWishlistCount } = useWishlistStore();
  const { user, isAuthenticated } = useAuthStore();

  const handleOpenCart = () => {
    openCart();
  };

  const totalQuantity = isMounted ? getTotalQuantity() : 0;
  const wishlistCount = isMounted ? getWishlistCount() : 0;
  const isUserAdmin = isMounted && isAuthenticated && user?.role === "admin";

  return (
    <>
      <header className="fixed top-7 w-full z-40 flex justify-between items-center px-4 md:px-8 h-14 bg-surface border-b border-outline-variant transition-all duration-200">
        {/* Desktop Nav Links */}
        <div className="hidden lg:flex gap-8 font-label-mono text-xs items-center">
          {MAIN_NAV_LINKS.map((link) => {
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
                className={`transition-opacity duration-200 tracking-wide ${
                  isActive
                    ? "text-primary opacity-100"
                    : "text-on-surface-variant opacity-60 hover:opacity-100 hover:text-primary"
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
            onClick={() => setIsMobileNavOpen(true)}
            aria-label="Menüyü aç"
            className="text-primary p-2 hover:opacity-70 transition-opacity cursor-pointer"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Brand Logo */}
        <Link
          href="/"
          className="font-headline-sm tracking-tight text-primary uppercase absolute left-1/2 -translate-x-1/2 text-base md:text-lg"
        >
          CLOST
        </Link>

        {/* Action Icons */}
        <div className="flex gap-2 sm:gap-4 text-primary items-center">
          {/* Currency Switcher */}
          <div className="hidden sm:block">
            <CurrencySwitcher />
          </div>

          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            aria-label="Arama yap"
            className="p-1.5 hover:opacity-70 transition-opacity duration-200 cursor-pointer"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Wishlist Link */}
          <Link
            href="/wishlist"
            aria-label={`Favorilerim (${wishlistCount} ürün)`}
            className="p-1.5 hover:opacity-70 transition-opacity duration-200 relative flex items-center"
          >
            <Heart className="w-4 h-4" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-on-primary font-label-mono text-[9px] w-4 h-4 flex items-center justify-center border border-surface font-bold">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Account Link with Auth indication */}
          <Link
            href="/account"
            aria-label="Müşteri Hesabı"
            className="p-1.5 hover:opacity-70 transition-opacity duration-200 hidden sm:flex items-center gap-1.5 font-label-mono text-xs uppercase"
          >
            {isUserAdmin ? (
              <Shield className="w-4 h-4 text-emerald-600" />
            ) : (
              <User className="w-4 h-4" />
            )}
            {isMounted && isAuthenticated && user && (
              <span className="text-[11px] font-bold max-w-[90px] truncate hidden xl:inline">
                {user.name.split(" ")[0]}
              </span>
            )}
          </Link>

          {/* Cart Trigger */}
          <button
            onClick={handleOpenCart}
            aria-label={`Alışveriş sepeti (${totalQuantity} ürün)`}
            className="p-1.5 hover:opacity-70 transition-opacity duration-200 relative cursor-pointer flex items-center"
          >
            <ShoppingBag className="w-4 h-4" />
            {totalQuantity > 0 && (
              <span
                key={totalQuantity}
                className="absolute -top-1 -right-1 bg-primary text-on-primary font-label-mono text-[9px] w-4 h-4 flex items-center justify-center border border-surface animate-cart-bounce font-bold"
              >
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

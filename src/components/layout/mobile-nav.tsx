"use client";

import React from "react";
import Link from "next/link";
import { Sheet } from "@/components/ui/sheet";
import { MOBILE_NAV_LINKS } from "@/lib/constants/navigation";
import { playClickSound } from "@/lib/audio/sound-effects";

export interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {

  return (
    <Sheet
      isOpen={isOpen}
      onClose={onClose}
      side="left"
      title="CLOST"
      maxWidth="max-w-sm"
    >
      <div className="flex flex-col p-6 gap-3.5 font-label-mono uppercase tracking-widest text-[11px]">
        {MOBILE_NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="text-primary hover:opacity-60 border-b border-outline-variant pb-2 transition-opacity"
          >
            {link.label}
          </Link>
        ))}

        <div className="mt-4 pt-3 border-t border-primary flex flex-col gap-1 text-[10px] text-on-surface-variant font-label-mono">
          <p>© 2026 CLOST</p>
          <p>KULLANIŞLILIK İÇİN TASARLANDI</p>
        </div>
      </div>
    </Sheet>
  );
}

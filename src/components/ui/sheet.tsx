"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { twMerge } from "tailwind-merge";

export interface SheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  side?: "right" | "left";
  className?: string;
  maxWidth?: string;
}

export function Sheet({
  isOpen,
  onClose,
  title,
  children,
  side = "right",
  className,
  maxWidth = "max-w-md",
}: SheetProps) {
  // Prevent background body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity duration-300 animate-in fade-in"
      />

      {/* Slide Container */}
      <div
        className={twMerge(
          "relative z-10 w-full h-full bg-surface-container-lowest flex flex-col shadow-2xl transition-transform duration-300",
          side === "right"
            ? "ml-auto border-l border-primary animate-in slide-in-from-right"
            : "mr-auto border-r border-primary animate-in slide-in-from-left",
          maxWidth,
          className
        )}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-primary bg-surface">
          {title ? (
            <h2 className="font-headline-sm uppercase tracking-tighter text-primary">
              {title}
            </h2>
          ) : (
            <div />
          )}
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1 text-primary hover:bg-surface-variant transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
}

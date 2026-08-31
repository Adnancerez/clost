"use client";

import React, { useSyncExternalStore } from "react";
import Link from "next/link";
import { X, CheckCircle2, AlertCircle, Info, ArrowRight, ShoppingBag } from "lucide-react";
import { useToastStore, ToastItem } from "@/lib/store/useToastStore";

const emptySubscribe = () => () => {};

export function ToastContainer() {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const { toasts, removeToast } = useToastStore();

  if (!isMounted || toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none"
    >
      {toasts.map((toast) => (
        <ToastSingle
          key={toast.id}
          toast={toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}

function ToastSingle({
  toast,
  onClose,
}: {
  toast: ToastItem;
  onClose: () => void;
}) {
  const getIcon = () => {
    switch (toast.type) {
      case "success":
        return <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />;
      case "warning":
        return <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />;
      default:
        return <Info className="w-4 h-4 text-sky-400 flex-shrink-0" />;
    }
  };

  const isCartRelated =
    toast.title.toLowerCase().includes("sepet") ||
    toast.message?.toLowerCase().includes("sepet");

  return (
    <div className="pointer-events-auto bg-primary text-on-primary border-2 border-primary shadow-2xl flex flex-col overflow-hidden animate-toast-in relative group select-none">
      {/* Toast Content Body */}
      <div className="p-4 flex items-start justify-between gap-3 bg-[#111111]">
        <div className="flex items-start gap-3 flex-1">
          {/* Status Icon with Glowing Dot */}
          <div className="relative mt-0.5 flex-shrink-0">
            {isCartRelated ? (
              <div className="w-6 h-6 border border-white/20 bg-white/10 flex items-center justify-center">
                <ShoppingBag className="w-3.5 h-3.5 text-white" />
              </div>
            ) : (
              getIcon()
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <h4 className="font-label-mono text-xs uppercase font-bold tracking-wider text-white truncate">
                {toast.title}
              </h4>
            </div>

            {toast.message && (
              <p className="font-label-mono text-[11px] text-surface-variant mt-1 leading-relaxed">
                {toast.message}
              </p>
            )}

            {/* Optional Action Button */}
            {toast.actionLabel && (
              <div className="mt-3 flex items-center gap-2">
                {toast.actionHref ? (
                  <Link
                    href={toast.actionHref}
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 font-label-mono text-[10px] uppercase font-bold tracking-widest bg-surface text-primary px-3 py-1.5 hover:bg-surface-variant transition-colors border border-surface"
                  >
                    <span>{toast.actionLabel}</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                ) : toast.onAction ? (
                  <button
                    type="button"
                    onClick={() => {
                      toast.onAction?.();
                      onClose();
                    }}
                    className="inline-flex items-center gap-1.5 font-label-mono text-[10px] uppercase font-bold tracking-widest bg-white text-black px-3 py-1.5 hover:bg-surface-variant transition-colors cursor-pointer border border-white"
                  >
                    <ShoppingBag className="w-3 h-3" />
                    <span>{toast.actionLabel}</span>
                  </button>
                ) : null}
              </div>
            )}
          </div>
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Bildirimi kapat"
          className="text-on-primary-container hover:text-white p-1 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Countdown Timer Bar Animation */}
      <div className="w-full bg-white/10 h-0.5 overflow-hidden">
        <div className="bg-emerald-400 h-full animate-toast-progress" />
      </div>
    </div>
  );
}

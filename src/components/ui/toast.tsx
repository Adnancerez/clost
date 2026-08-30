"use client";

import React, { useSyncExternalStore } from "react";
import Link from "next/link";
import { X, CheckCircle2, AlertCircle, Info, ArrowRight } from "lucide-react";
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
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none"
    >
      {toasts.map((toast) => (
        <ToastSingle key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
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
        return <CheckCircle2 className="w-4 h-4 text-white flex-shrink-0" />;
      case "warning":
        return <AlertCircle className="w-4 h-4 text-white flex-shrink-0" />;
      default:
        return <Info className="w-4 h-4 text-white flex-shrink-0" />;
    }
  };

  return (
    <div className="pointer-events-auto bg-primary text-on-primary border border-primary p-3.5 shadow-2xl flex items-start justify-between gap-3 animate-in slide-in-from-bottom-2 fade-in duration-200">
      <div className="flex items-start gap-2.5 flex-1">
        <div className="mt-0.5">{getIcon()}</div>
        <div className="flex-1">
          <h4 className="font-label-mono text-xs uppercase font-bold tracking-wider">
            {toast.title}
          </h4>
          {toast.message && (
            <p className="font-label-mono text-[11px] text-surface-variant mt-0.5">
              {toast.message}
            </p>
          )}

          {/* Optional Action Button */}
          {toast.actionLabel && (
            <div className="mt-2">
              {toast.actionHref ? (
                <Link
                  href={toast.actionHref}
                  onClick={onClose}
                  className="inline-flex items-center gap-1 font-label-mono text-[10px] uppercase tracking-widest bg-surface text-primary px-2.5 py-1 hover:bg-surface-variant transition-colors"
                >
                  {toast.actionLabel} <ArrowRight className="w-3 h-3" />
                </Link>
              ) : toast.onAction ? (
                <button
                  onClick={() => {
                    toast.onAction?.();
                    onClose();
                  }}
                  className="inline-flex items-center gap-1 font-label-mono text-[10px] uppercase tracking-widest bg-surface text-primary px-2.5 py-1 hover:bg-surface-variant transition-colors cursor-pointer"
                >
                  {toast.actionLabel}
                </button>
              ) : null}
            </div>
          )}
        </div>
      </div>

      <button
        onClick={onClose}
        aria-label="Bildirimi kapat"
        className="text-surface-variant hover:text-white p-0.5 transition-colors cursor-pointer"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

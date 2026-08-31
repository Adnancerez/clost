"use client";

import React, { useSyncExternalStore } from "react";
import { MessageSquareHeart } from "lucide-react";
import { useFeedbackStore } from "@/lib/store/useFeedbackStore";

const emptySubscribe = () => () => {};

export function FeedbackTrigger() {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const { openFeedback } = useFeedbackStore();

  if (!isMounted) return null;

  return (
    <button
      type="button"
      onClick={openFeedback}
      aria-label="Geri Bildirim Gönder"
      title="Görüş ve Önerilerinizi Paylaşın"
      className="fixed bottom-24 right-4 z-30 hidden md:flex items-center gap-2 bg-surface border border-primary text-primary px-3.5 py-2 font-label-mono text-[11px] uppercase tracking-wider shadow-lg hover:bg-primary hover:text-white transition-all cursor-pointer group"
    >
      <MessageSquareHeart className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
      <span className="font-bold">Geri Bildirim</span>
    </button>
  );
}

export default FeedbackTrigger;

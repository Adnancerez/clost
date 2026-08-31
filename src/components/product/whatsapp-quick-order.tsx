"use client";

import React from "react";
import { MessageCircle } from "lucide-react";

interface WhatsAppQuickOrderProps {
  productTitle: string;
  productPrice: string;
  selectedSize?: string;
  selectedColor?: string;
}

export function WhatsAppQuickOrder({
  productTitle,
  productPrice,
  selectedSize = "M",
  selectedColor = "Siyah",
}: WhatsAppQuickOrderProps) {
  const phoneNumber = "905320000000"; // Replaceable or demo phone
  const message = `Merhaba CLOST Ekibi! ${productTitle} (${productPrice} ₺ - Beden: ${selectedSize}, Renk: ${selectedColor}) parçasını sipariş vermek istiyorum.`;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full bg-[#128C7E] text-white font-label-mono text-xs h-12 flex items-center justify-center hover:bg-[#075E54] border border-[#128C7E] transition-colors duration-200 uppercase tracking-wider font-bold gap-2 cursor-pointer"
    >
      <MessageCircle className="w-4 h-4" />
      <span>WhatsApp ile Hızlı Sipariş Ver</span>
    </a>
  );
}

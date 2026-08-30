import React from "react";
import { AccordionItem } from "@/components/ui/accordion";
import { ProductAccordionItem } from "@/lib/shopify/types";

export interface ProductAccordionProps {
  description?: string;
  accordions?: ProductAccordionItem[];
}

export function ProductAccordion({
  description,
  accordions = [],
}: ProductAccordionProps) {
  const defaultAccordions =
    accordions.length > 0
      ? accordions
      : [
          {
            title: "Detaylar & Kalıp",
            content:
              "Fonksiyonel kullanım için tasarlandı. Ergonomik dikişli, yapısal ve kutu kesim siluet.",
          },
          {
            title: "Kumaş & Bakım",
            content:
              "Ağır gramajlı teknik kumaş. Tersten soğuk suda hassas programda yıkayınız. Kurutma makinesine atmayınız.",
          },
          {
            title: "Kargo & İade",
            content:
              "1.500 ₺ üzeri siparişlerde tüm Türkiye'ye ücretsiz kargo. Kullanılmamış ve etiketi üzerinde ürünlerde 30 gün kolay iade.",
          },
        ];

  return (
    <div className="p-4 md:p-10 border-b border-primary">
      {description && (
        <p className="font-body-md text-primary mb-6 leading-relaxed text-sm">
          {description}
        </p>
      )}

      <div className="flex flex-col">
        {defaultAccordions.map((item, index) => (
          <AccordionItem
            key={index}
            title={item.title}
            defaultOpen={index === 0}
          >
            {item.content}
          </AccordionItem>
        ))}
      </div>
    </div>
  );
}

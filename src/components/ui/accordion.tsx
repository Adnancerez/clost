"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { twMerge } from "tailwind-merge";

export interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export function AccordionItem({
  title,
  children,
  defaultOpen = false,
  className,
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={twMerge("border-t border-primary", className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex justify-between items-center font-label-mono text-primary uppercase text-left group transition-colors duration-200 cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="tracking-wider">{title}</span>
        <span className="transition-transform duration-200">
          {isOpen ? (
            <Minus className="w-5 h-5 text-primary" />
          ) : (
            <Plus className="w-5 h-5 text-primary group-hover:rotate-90 transition-transform duration-200" />
          )}
        </span>
      </button>
      {isOpen && (
        <div className="pb-4 font-body-md text-on-surface leading-relaxed text-sm animate-in fade-in duration-200">
          {children}
        </div>
      )}
    </div>
  );
}

export interface AccordionProps {
  items: {
    title: string;
    content: React.ReactNode;
    defaultOpen?: boolean;
  }[];
  className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
  return (
    <div className={twMerge("flex flex-col border-b border-primary", className)}>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          defaultOpen={item.defaultOpen}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
}

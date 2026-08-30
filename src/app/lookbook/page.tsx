"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ShoppingBag } from "lucide-react";
import { MOCK_PRODUCTS } from "@/lib/shopify/mock-data";
import { Product } from "@/lib/shopify/types";
import { ShopTheLookModal } from "@/components/product/shop-the-look";

interface LookItem {
  id: string;
  title: string;
  imageUrl: string;
  location: string;
  productHandle: string;
  products: Product[];
}

export default function LookbookPage() {
  const [activeModalLook, setActiveModalLook] = useState<LookItem | null>(null);

  const looks: LookItem[] = [
    {
      id: "look-01",
      title: "KOMBİN 01 // TEKNİK PARKA + ASİMETRİK DENİM",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCWE313CKKbVMGOlCdkOyRCH75aYprCxXv7nopqIAChruldZcdSQmngzKs6XC9RYsOPMxH3XxAGji2t-CApdVa_UOc8gKBtYtccQdvQ3GwvWU-7oceRDuO-jubQhJHJ8qrZYHi72SHKuCjPA69qCCI81zIpd4rvZov-S81qM6Dzf_wJln5h3-H4HTcfxqWV8yyrdeosOYJDCJjGcMDTKGBKWKvPogVzju3zYy-8BtNJqOlYpX9t7-gm",
      location: "Bölge 04 Beton Stüdyosu",
      productHandle: "oversized-technical-parka-v2",
      products: [MOCK_PRODUCTS[0], MOCK_PRODUCTS[2]], // Parka + Denim
    },
    {
      id: "look-02",
      title: "KOMBİN 02 // YAPISAL GÖMLEK + KARGO",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCdxcHT2JhGKFYhsnqXg_qqHbtxxYQCmToLiL1_2e1ihHnzouJ1ZuBy1690y6qJ-iBvU3lxzXTS2gqIR2VzSAGAidhnBMcJXGetFZnPeMGOzB5dnLnGsrHZQPIpCUonLIb1FQp8jju7_5XhsvfZqROlri_qwhJchhTUQt_3zQHGNh8Fz4HFlF5qCS8J501T-n6ac4jJT1-ZpNS_LV5cvpnT2Hv42bw9rkihkHvKPm8wgQub2mnx13Mh",
      location: "Brutalist Monolit Duvar",
      productHandle: "structure-shirt-x",
      products: [MOCK_PRODUCTS[4], MOCK_PRODUCTS[7]], // Shirt + Cargo
    },
    {
      id: "look-03",
      title: "KOMBİN 03 // TAKTİK YELEK 01 + HOODIE B",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDfvuvkqrVS7yfktHNmCqB1cQ4ac5jLpWdLd9ta6oB_0_2FHoFq_b1dKxGKUFTcJAbL5G8eKHIpJcAyu2q3E7Y3jstNFkPOZYYK7b8OGewdT95CCojuaMxtpuzqiuCr9qWkhNLh3LgvSseNd3MUV-kCvN6QvuqclAR-vq02hGnQZxRB0MN5JzEP36-QWH4VidF8gacNqETXDjlQr7-ijUYN_uUAwsLcho9N0FnLK8WIKzdOrCN4sO3F",
      location: "Endüstriyel Platform",
      productHandle: "utility-vest-01",
      products: [MOCK_PRODUCTS[3], MOCK_PRODUCTS[5]], // Vest + Hoodie
    },
    {
      id: "look-04",
      title: "KOMBİN 04 // HAKİ TAKTİK UZUN KOLLU + KARGO",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA8VHleIFRaj3VKXoGw3TBmZjuskBsSro921FCZSEQE3Pcbvz1qNWkKQswbVN9o_h9uQOXBy4rN8aSZqHRsRJfJ6ErKDgnkbeeKFVmACONFKjz3T2g2lRtgHiR99bRJEIGcLZVlZOw3OEELuoSiRdFdJzaXj4BwupXUpcsRk4Iwlgrb9dyc4u59caM_4aL24EoxbHKQhL01A274Q6GV6NMZhGqiSGwDotHW26bnRBDf0YhVVph3fUJj",
      location: "Çelik Matris Hangar",
      productHandle: "tactical-ls-og",
      products: [MOCK_PRODUCTS[6], MOCK_PRODUCTS[7]], // Long Sleeve + Cargo
    },
  ];

  return (
    <main className="flex-grow pt-16 flex flex-col">
      {/* Header */}
      <header className="p-6 md:p-12 border-b border-primary bg-surface flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <span className="font-label-mono text-xs uppercase text-on-surface-variant block mb-2">
            EDİTORYAL DİZİN // SONBAHAR &apos;24
          </span>
          <h1 className="font-display-lg-mobile md:font-display-lg uppercase tracking-tighter text-primary">
            LOOKBOOK
          </h1>
        </div>
        <p className="font-label-mono text-xs uppercase text-on-surface-variant max-w-xs">
          Özel lokasyonlarda çekildi. Monolitik stil. Fotoğraf: Void Lab.
        </p>
      </header>

      {/* Lookbook Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-primary border-b border-primary">
        {looks.map((look) => (
          <div key={look.id} className="flex flex-col group relative bg-surface-variant">
            {/* Image */}
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src={look.imageUrl}
                alt={look.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover grayscale contrast-110 group-hover:scale-105 transition-transform duration-700"
              />

              {/* Quick Shop The Look Floating Trigger */}
              <div className="absolute top-4 right-4 z-20">
                <button
                  onClick={() => setActiveModalLook(look)}
                  className="bg-primary text-on-primary font-label-mono text-xs uppercase px-4 py-2 flex items-center gap-1.5 hover:bg-surface hover:text-primary border border-primary transition-colors cursor-pointer shadow-lg"
                >
                  <ShoppingBag className="w-3.5 h-3.5" /> Kombini Satın Al (%10 İndirimli)
                </button>
              </div>
            </div>

            {/* Look Details Footer */}
            <div className="p-6 border-t border-primary bg-surface flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="font-body-md font-bold uppercase text-primary text-sm">
                  {look.title}
                </h3>
                <span className="font-label-mono text-xs text-on-surface-variant uppercase mt-0.5 block">
                  Lokasyon: {look.location}
                </span>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setActiveModalLook(look)}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1 font-label-mono text-xs uppercase bg-primary text-on-primary border border-primary px-4 py-2 hover:bg-surface-variant hover:text-primary transition-colors cursor-pointer"
                >
                  Kombini Al
                </button>
                <Link
                  href={`/products/${look.productHandle}`}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1 font-label-mono text-xs uppercase text-primary border border-primary px-4 py-2 hover:bg-surface-variant transition-colors"
                >
                  Detay <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Shop The Look Modal */}
      {activeModalLook && (
        <ShopTheLookModal
          isOpen={!!activeModalLook}
          onClose={() => setActiveModalLook(null)}
          lookTitle={activeModalLook.title}
          products={activeModalLook.products}
        />
      )}
    </main>
  );
}

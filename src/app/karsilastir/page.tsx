"use client";

import React, { useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingBag, ArrowLeftRight, Check, X } from "lucide-react";
import { useCompareStore } from "@/lib/store/useCompareStore";
import { useCartStore } from "@/lib/store/useCartStore";

const emptySubscribe = () => () => {};

export default function ComparePage() {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const { items, removeFromCompare, clearCompare } = useCompareStore();
  const { addItem, openCart } = useCartStore();

  if (!isMounted) return null;

  const handleAddToCart = (product: (typeof items)[0]) => {
    const defaultVariant = product.variants[0];
    addItem({
      productId: product.id,
      variantId: defaultVariant ? defaultVariant.id : `${product.id}-default`,
      title: product.title,
      handle: product.handle,
      variantTitle: defaultVariant ? defaultVariant.title : "Standart",
      selectedOptions: defaultVariant ? defaultVariant.selectedOptions : [],
      price: parseFloat(product.priceRange.minVariantPrice.amount),
      image: product.featuredImage?.url || product.images[0]?.url,
    });
  };

  // Helper specs based on productType
  const getSpecs = (product: (typeof items)[0]) => {
    const type = product.productType?.toLowerCase() || "";
    if (type.includes("dış") || type.includes("parka") || type.includes("ceket")) {
      return {
        fabric: "%100 3L Naylon Ripstop (420 GSM)",
        waterproof: "20.000 mm Su Sütunu (Tam Koruma)",
        fit: "Oversized Brutalist Kutu Kesim",
        hardware: "YKK Aquaguard Çift Yönlü Su Geçirmez Fermuarlar",
        pockets: "6 Adet Modüler Gizli & Fermuarlı Cep",
      };
    }
    if (type.includes("alt") || type.includes("denim") || type.includes("kargo")) {
      return {
        fabric: "Ağır Gramaj Kompakt Ham Denim / Naylon (380 GSM)",
        waterproof: "DWR Yüzey Su İtici Kaplama",
        fit: "Geniş Paça / Asimetrik Paça Kesim",
        hardware: "Mat Siyah Çinko Alaşım Düğme & Tokalar",
        pockets: "4 Adet Körük Cepli & Derin Yan Cepler",
      };
    }
    return {
      fabric: "%100 Ağır Kompakt Pamuklu Polar (450 GSM)",
      waterproof: "Nefes Alabilir Termal Katman",
      fit: "Düşük Omuzlu Boxy Kesim",
      hardware: "Güçlendirilmiş Ribana & Kordon Kilitleri",
      pockets: "Gizli Kanguru Cep",
    };
  };

  return (
    <main className="flex-grow flex flex-col">
      {/* Header */}
      <header className="p-6 md:p-12 border-b border-primary bg-surface flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <span className="font-label-mono text-xs uppercase text-on-surface-variant block mb-2">
            TEKNİK ÖZELLİK MATRİSİ
          </span>
          <h1 className="font-display-lg-mobile md:font-display-lg uppercase tracking-tighter text-primary">
            ÜRÜN KARŞILAŞTIRMA ({items.length}/4)
          </h1>
        </div>

        {items.length > 0 && (
          <button
            onClick={clearCompare}
            className="flex items-center gap-2 border border-primary px-4 py-2 font-label-mono text-xs uppercase hover:bg-primary hover:text-on-primary transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4" /> Karşılaştırmayı Temizle
          </button>
        )}
      </header>

      {/* Content Area */}
      <div className="flex-1 p-6 md:p-12 max-w-[1920px] mx-auto w-full">
        {items.length === 0 ? (
          <div className="py-24 text-center flex flex-col items-center justify-center gap-4">
            <ArrowLeftRight className="w-12 h-12 text-outline" />
            <h2 className="font-headline-sm uppercase text-primary">
              Karşılaştırma Listeniz Boş
            </h2>
            <p className="font-label-mono text-xs uppercase text-on-surface-variant max-w-sm">
              Ürünlerin teknik kumaş ve kalıp özelliklerini kıyaslamak için ürün kartlarındaki karşılaştırma butonuna tıklayın.
            </p>
            <Link
              href="/collections/all"
              className="mt-4 bg-primary text-on-primary font-label-mono text-xs px-8 py-3.5 uppercase tracking-widest hover:bg-surface-variant hover:text-primary border border-primary transition-colors"
            >
              Kataloğu İncele
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto no-scrollbar border border-primary bg-surface">
            <table className="w-full text-left border-collapse font-label-mono text-xs">
              <thead>
                <tr className="border-b border-primary bg-surface-container-low">
                  <th className="p-4 w-48 uppercase text-on-surface-variant border-r border-primary">
                    Teknik Kriterler
                  </th>
                  {items.map((product) => (
                    <th
                      key={product.id}
                      className="p-6 min-w-[260px] max-w-[320px] border-r border-primary last:border-r-0 align-top"
                    >
                      <div className="flex flex-col gap-4">
                        <div className="relative aspect-[4/5] w-full border border-primary overflow-hidden bg-surface-variant">
                          <Image
                            src={product.featuredImage?.url || product.images[0]?.url || ""}
                            alt={product.title}
                            fill
                            sizes="280px"
                            className="object-cover"
                          />
                          <button
                            onClick={() => removeFromCompare(product.id)}
                            className="absolute top-2 right-2 bg-surface border border-primary p-1 text-primary hover:bg-primary hover:text-on-primary transition-colors cursor-pointer"
                            aria-label="Karşılaştırmadan Çıkar"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <div>
                          <Link
                            href={`/products/${product.handle}`}
                            className="font-body-md font-bold uppercase text-primary text-sm hover:underline line-clamp-1"
                          >
                            {product.title}
                          </Link>
                          <span className="font-price-lg text-primary text-base mt-1 block">
                            {parseFloat(product.priceRange.minVariantPrice.amount).toLocaleString("tr-TR")} ₺
                          </span>
                        </div>

                        <button
                          onClick={() => handleAddToCart(product)}
                          className="w-full bg-primary text-on-primary py-3 uppercase flex items-center justify-center gap-1.5 hover:bg-surface-variant hover:text-primary border border-primary transition-colors cursor-pointer"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" /> Sepete Ekle
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-outline-variant">
                <tr>
                  <td className="p-4 font-bold uppercase border-r border-primary bg-surface-container-low">
                    Kategori / Tip
                  </td>
                  {items.map((p) => (
                    <td key={p.id} className="p-4 border-r border-outline-variant last:border-r-0 text-primary uppercase">
                      {p.productType || "Fonksiyonel Dış Giyim"}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="p-4 font-bold uppercase border-r border-primary bg-surface-container-low">
                    Kumaş &amp; Gramaj
                  </td>
                  {items.map((p) => (
                    <td key={p.id} className="p-4 border-r border-outline-variant last:border-r-0 text-primary">
                      {getSpecs(p).fabric}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="p-4 font-bold uppercase border-r border-primary bg-surface-container-low">
                    Su Direnci
                  </td>
                  {items.map((p) => (
                    <td key={p.id} className="p-4 border-r border-outline-variant last:border-r-0 text-primary">
                      {getSpecs(p).waterproof}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="p-4 font-bold uppercase border-r border-primary bg-surface-container-low">
                    Kalıp Silüeti
                  </td>
                  {items.map((p) => (
                    <td key={p.id} className="p-4 border-r border-outline-variant last:border-r-0 text-primary">
                      {getSpecs(p).fit}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="p-4 font-bold uppercase border-r border-primary bg-surface-container-low">
                    Metalik Donanım
                  </td>
                  {items.map((p) => (
                    <td key={p.id} className="p-4 border-r border-outline-variant last:border-r-0 text-primary">
                      {getSpecs(p).hardware}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="p-4 font-bold uppercase border-r border-primary bg-surface-container-low">
                    Cep Mimarisi
                  </td>
                  {items.map((p) => (
                    <td key={p.id} className="p-4 border-r border-outline-variant last:border-r-0 text-primary">
                      {getSpecs(p).pockets}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="p-4 font-bold uppercase border-r border-primary bg-surface-container-low">
                    Beden Seçenekleri
                  </td>
                  {items.map((p) => (
                    <td key={p.id} className="p-4 border-r border-outline-variant last:border-r-0 text-primary">
                      {p.options.find((o) => o.name.toLowerCase() === "beden")?.values.join(" / ") || "S / M / L / XL"}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="p-4 font-bold uppercase border-r border-primary bg-surface-container-low">
                    Stok Durumu
                  </td>
                  {items.map((p) => (
                    <td key={p.id} className="p-4 border-r border-outline-variant last:border-r-0 text-primary">
                      <span className="flex items-center gap-1 text-green-700 font-bold">
                        <Check className="w-3.5 h-3.5" /> Stokta Mevcut
                      </span>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}

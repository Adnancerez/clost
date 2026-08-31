"use client";

import React, { useState, useEffect, useSyncExternalStore, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/shopify/types";
import {
  getEffectiveLocalProducts,
  addCustomProduct,
  removeCustomProduct,
  wipeAllProducts,
  resetToDefaultCatalog,
  isCleanCatalogMode,
} from "@/lib/shopify/catalog-manager";
import { usePwaStore } from "@/lib/pwa/usePwa";
import { useCartStore } from "@/lib/store/useCartStore";
import { useWishlistStore } from "@/lib/store/useWishlistStore";
import { useCompareStore } from "@/lib/store/useCompareStore";
import { useLoyaltyStore } from "@/lib/store/useLoyaltyStore";

const emptySubscribe = () => () => {};

export default function DeveloperPanelPage() {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  // PWA Store
  const isOnline = usePwaStore((state) => state.isOnline);
  const setOnline = usePwaStore((state) => state.setOnline);
  const isInstalled = usePwaStore((state) => state.isInstalled);
  const isInstallable = usePwaStore((state) => state.isInstallable);
  const openInstallModal = usePwaStore((state) => state.openInstallModal);

  // Global Stores
  const { clearCart, items: cartItems } = useCartStore();
  const { clearWishlist, items: wishlistItems } = useWishlistStore();
  const { clearCompare, items: compareItems } = useCompareStore();
  const { resetLoyalty, points: loyaltyPoints, tier: loyaltyTier } = useLoyaltyStore();

  // Local Catalog State
  const [version, setVersion] = useState<number>(0);
  const [cacheKeys, setCacheKeys] = useState<string[]>([]);
  const [swActive, setSwActive] = useState<boolean>(false);

  // Derived catalog state
  const products = isMounted && version >= 0 ? getEffectiveLocalProducts() : [];
  const cleanMode = isMounted ? isCleanCatalogMode() : false;

  // New Product Form State
  const [newTitle, setNewTitle] = useState("");
  const [newHandle, setNewHandle] = useState("");
  const [newPrice, setNewPrice] = useState("1850");
  const [newCategory, setNewCategory] = useState("Dış Giyim");
  const [newColor, setNewColor] = useState("Siyah");
  const [newSizes, setNewSizes] = useState("S, M, L, XL");
  const [newImage, setNewImage] = useState(
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD0WDpvXYEs1ZQedwFf4RAbPlY8PaclgrCjPTRek-lPQR-vgNqLk5CZy3NSqp76kZG_DFr9Vk8ZUXPCpjB2GKWGN5JPuTyYgEDI-XaLjgICApVOD4vjf-p-DdB67Lb9rr2rgShNuAKZhQdbb0utIOMTG5TyN-V4WCOmgitGOfVdASEtmtWyh5BVkWT4jfngsTB8rHCtb1yMuw01StDzcYFN_3MsA5uUF8BjsmRAvR1TOpnqmw3rMviQ"
  );
  const [newDesc, setNewDesc] = useState("Brutalist techwear silüeti ve yüksek performanslı dikiş yapısı.");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Inspect environment
  const shopifyDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || null;
  const shopifyToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || null;
  const hasShopifyCredentials = !!(shopifyDomain && shopifyToken);

  const refreshCatalog = useCallback(() => {
    setVersion((v) => v + 1);
  }, []);

  useEffect(() => {
    // Check SW & Caches on mount
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistration().then((reg) => {
        setSwActive(!!reg);
      });
    }

    if (typeof window !== "undefined" && "caches" in window) {
      caches.keys().then((keys) => setCacheKeys(keys));
    }
  }, []);

  const showFeedback = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3500);
  };

  // Handlers: Catalog
  const handleWipeCatalog = () => {
    if (window.confirm("Sitenin tüm mock ürünlerini temizlemek istediğinize emin misiniz?")) {
      wipeAllProducts();
      refreshCatalog();
      showFeedback("Katalog tamamen temizlendi. Site artık 0 ürün ile temiz modda.");
    }
  };

  const handleResetDefaultCatalog = () => {
    resetToDefaultCatalog();
    refreshCatalog();
    showFeedback("Varsayılan demo ürün kataloğu geri yüklendi.");
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const handle = newHandle.trim() || newTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const sizeList = newSizes.split(",").map((s) => s.trim()).filter(Boolean);

    const productToAdd: Product = {
      id: `custom_${Date.now()}`,
      title: newTitle.trim(),
      handle,
      description: newDesc.trim(),
      availableForSale: true,
      productType: newCategory,
      tags: ["Özel", "Yeni", newCategory],
      priceRange: {
        minVariantPrice: {
          amount: newPrice,
          currencyCode: "TRY",
        },
        maxVariantPrice: {
          amount: newPrice,
          currencyCode: "TRY",
        },
      },
      featuredImage: {
        url: newImage.trim(),
        altText: newTitle.trim(),
      },
      images: [
        {
          url: newImage.trim(),
          altText: newTitle.trim(),
        },
      ],
      options: [
        {
          id: `opt_size_${Date.now()}`,
          name: "Beden",
          values: sizeList.length > 0 ? sizeList : ["Standart"],
        },
        {
          id: `opt_color_${Date.now()}`,
          name: "Renk",
          values: [newColor.trim() || "Siyah"],
        },
      ],
      variants: sizeList.map((size, idx) => ({
        id: `var_${Date.now()}_${idx}`,
        title: `${size} / ${newColor.trim() || "Siyah"}`,
        availableForSale: true,
        selectedOptions: [
          { name: "Beden", value: size },
          { name: "Renk", value: newColor.trim() || "Siyah" },
        ],
        price: {
          amount: newPrice,
          currencyCode: "TRY",
        },
      })),
    };

    addCustomProduct(productToAdd);
    refreshCatalog();
    showFeedback(`"${newTitle}" başarıyla eklendi! (/products/${handle})`);

    // Reset fields
    setNewTitle("");
    setNewHandle("");
  };

  const handleDeleteProduct = (idOrHandle: string) => {
    removeCustomProduct(idOrHandle);
    refreshCatalog();
    showFeedback("Ürün silindi.");
  };

  // Handlers: Cache & PWA
  const handleClearAllCaches = async () => {
    if ("caches" in window) {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
      setCacheKeys([]);
      showFeedback("Tüm Service Worker önbelleği temizlendi.");
    }
  };

  const handleUnregisterSW = async () => {
    if ("serviceWorker" in navigator) {
      const regs = await navigator.serviceWorker.getRegistrations();
      for (const reg of regs) {
        await reg.unregister();
      }
      setSwActive(false);
      showFeedback("Service Worker kaydı kaldırıldı.");
    }
  };

  return (
    <div className="min-h-screen bg-surface py-10 px-4 md:px-8 max-w-7xl mx-auto font-label-mono text-xs">
      {/* Top Banner / Breadcrumb */}
      <div className="flex justify-between items-center pb-4 mb-6 border-b border-primary">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 bg-primary"></span>
          <h1 className="font-headline-sm text-base md:text-lg font-bold text-primary tracking-tight uppercase">
            CLOST // DEVELOPER & MAĞAZA KONTROL PANELİ
          </h1>
        </div>
        <Link
          href="/"
          className="px-3 py-1.5 border border-primary text-primary hover:bg-primary hover:text-white uppercase transition-colors"
        >
          ← MAĞAZAYA DÖN
        </Link>
      </div>

      {/* Toast Feedback */}
      {statusMessage && (
        <div className="mb-6 p-3 bg-primary text-white border border-surface-variant flex items-center justify-between animate-fade-in-up">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-400"></span>
            <span>{statusMessage}</span>
          </div>
          <button onClick={() => setStatusMessage(null)}>✕</button>
        </div>
      )}

      {/* SECTION 1: Environment & Storefront Architecture Status */}
      <div className="border border-primary bg-surface-container-low p-6 mb-8 shadow-sm">
        <h2 className="font-bold text-sm text-primary uppercase mb-4 border-b border-primary/20 pb-2 flex items-center justify-between">
          <span>01 / E-TİCARET & SHOPIFY ALTYAPI DURUMU</span>
          <span
            className={`px-2 py-0.5 text-[10px] ${
              hasShopifyCredentials ? "bg-emerald-600 text-white" : "bg-primary text-white"
            }`}
          >
            {hasShopifyCredentials ? "CANLI SHOPIFY AKTİF" : "YEREL GELİŞTİRİCİ / TEST MODU"}
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="border border-primary/20 p-3 bg-surface">
            <span className="text-on-surface-variant block mb-1">SHOPIFY DOMAIN:</span>
            <code className="font-bold text-primary">
              {shopifyDomain || "Tanımlanmadı (.env.local -> NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN)"}
            </code>
          </div>
          <div className="border border-primary/20 p-3 bg-surface">
            <span className="text-on-surface-variant block mb-1">STOREFRONT ACCESS TOKEN:</span>
            <code className="font-bold text-primary">
              {shopifyToken ? `${shopifyToken.slice(0, 10)}... (Gizlendi)` : "Tanımlanmadı (.env.local -> NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN)"}
            </code>
          </div>
        </div>

        <p className="text-on-surface-variant text-[11px] leading-relaxed">
          <strong>Nasıl Çalışır?</strong> Gerçek Shopify mağazanızı bağlamak için kök dizindeki <code>.env.local</code> dosyasına anahtarlarınızı girmeniz yeterlidir. Anahtarlar girildiğinde Next.js GraphQL API üzerinden canlı ürünleri ve sepeti çeker. Girilmediğinde aşağıdaki yerel katalog yöneticisi devreye girer.
        </p>
      </div>

      {/* SECTION 2: Dynamic Catalog Manager & Clean Slate */}
      <div className="border border-primary bg-surface p-6 mb-8 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-primary pb-4">
          <div>
            <h2 className="font-bold text-sm text-primary uppercase">
              02 / ÜRÜN & KATALOG YÖNETİCİSİ
            </h2>
            <p className="text-on-surface-variant text-[11px] mt-1">
              Aktif Ürün Sayısı: <strong>{isMounted ? products.length : 0}</strong> {cleanMode && "(Temiz Mod Aktif)"}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleWipeCatalog}
              className="px-3 py-2 bg-red-700 text-white hover:bg-red-800 uppercase tracking-wider transition-colors font-bold cursor-pointer"
            >
              🗑️ SİTEYİ TAMAMEN TEMİZLE (KATALOĞU SIFIRLA)
            </button>
            <button
              onClick={handleResetDefaultCatalog}
              className="px-3 py-2 border border-primary text-primary hover:bg-surface-variant uppercase tracking-wider transition-colors cursor-pointer"
            >
              🔄 BAŞLANGIÇ ÜRÜNLERİNİ GERİ YÜKLE
            </button>
          </div>
        </div>

        {/* Add Product Form */}
        <div className="border border-primary/20 bg-surface-container-low p-4 mb-6">
          <h3 className="font-bold text-primary uppercase mb-3 text-xs">
            + HIZLI YENİ ÜRÜN OLUŞTUR
          </h3>

          <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-on-surface-variant mb-1">Ürün Başlığı:</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Örn: Modüler Taktik Yelek"
                required
                className="w-full border border-primary p-2 bg-surface text-primary"
              />
            </div>

            <div>
              <label className="block text-on-surface-variant mb-1">Fiyat (₺):</label>
              <input
                type="number"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                required
                className="w-full border border-primary p-2 bg-surface text-primary"
              />
            </div>

            <div>
              <label className="block text-on-surface-variant mb-1">Kategori:</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full border border-primary p-2 bg-surface text-primary"
              >
                <option value="Dış Giyim">Dış Giyim (Outerwear)</option>
                <option value="Üst Giyim">Üst Giyim (Tops)</option>
                <option value="Alt Giyim">Alt Giyim (Bottoms)</option>
                <option value="Aksesuar">Aksesuar</option>
              </select>
            </div>

            <div>
              <label className="block text-on-surface-variant mb-1">Bedenler (Virgülle ayırın):</label>
              <input
                type="text"
                value={newSizes}
                onChange={(e) => setNewSizes(e.target.value)}
                placeholder="S, M, L, XL"
                className="w-full border border-primary p-2 bg-surface text-primary"
              />
            </div>

            <div>
              <label className="block text-on-surface-variant mb-1">Renk:</label>
              <input
                type="text"
                value={newColor}
                onChange={(e) => setNewColor(e.target.value)}
                placeholder="Siyah"
                className="w-full border border-primary p-2 bg-surface text-primary"
              />
            </div>

            <div>
              <label className="block text-on-surface-variant mb-1">Görsel URL:</label>
              <input
                type="url"
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                required
                className="w-full border border-primary p-2 bg-surface text-primary"
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-on-surface-variant mb-1">Açıklama:</label>
              <textarea
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                rows={2}
                className="w-full border border-primary p-2 bg-surface text-primary"
              />
            </div>

            <div className="md:col-span-3 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-primary text-white hover:bg-surface-variant hover:text-primary uppercase font-bold tracking-wider transition-colors border border-primary cursor-pointer"
              >
                + ÜRÜNÜ YAYINLA & SİTEYE EKLE
              </button>
            </div>
          </form>
        </div>

        {/* Existing Products List */}
        <div>
          <h3 className="font-bold text-primary uppercase mb-3 text-xs">
            AKTİF ÜRÜN LİSTESİ ({isMounted ? products.length : 0})
          </h3>

          {isMounted && products.length === 0 ? (
            <div className="border border-dashed border-primary/40 p-8 text-center bg-surface-container-low">
              <p className="text-on-surface-variant mb-2">Katalogda şu an hiç ürün bulunmuyor.</p>
              <p className="text-[11px] text-on-surface-variant">
                Yukarıdaki formdan yeni ürün ekleyebilir veya &quot;Başlangıç Ürünlerini Geri Yükle&quot; butonuna basabilirsiniz.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-primary/10 border border-primary/20 max-h-96 overflow-y-auto">
              {isMounted &&
                products.map((p) => {
                  const img = p.featuredImage?.url || p.images[0]?.url;
                  return (
                    <div key={p.id} className="p-3 flex items-center justify-between gap-4 hover:bg-surface-container-low transition-colors">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-12 h-14 bg-surface-variant relative shrink-0 border border-primary/20">
                          {img && (
                            <Image
                              src={img}
                              alt={p.title}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-primary truncate uppercase">{p.title}</p>
                          <p className="text-on-surface-variant text-[11px]">
                            {p.productType} — {p.priceRange.minVariantPrice.amount} ₺ — Slug: /{p.handle}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <Link
                          href={`/products/${p.handle}`}
                          target="_blank"
                          className="px-2.5 py-1 border border-primary/40 text-primary hover:border-primary uppercase text-[11px]"
                        >
                          İNCELE ↗
                        </Link>
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="px-2.5 py-1 bg-red-600 text-white hover:bg-red-700 uppercase text-[11px] cursor-pointer"
                        >
                          SİL
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>

      {/* SECTION 3: PWA, Cache & Offline Diagnostics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="border border-primary bg-surface p-6 shadow-sm">
          <h2 className="font-bold text-sm text-primary uppercase mb-4 border-b border-primary/20 pb-2">
            03 / PWA & SERVICE WORKER ÖNBELLEĞİ
          </h2>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center py-1 border-b border-primary/10">
              <span className="text-on-surface-variant">Service Worker Durumu:</span>
              <span className="font-bold text-primary">
                {isMounted ? (swActive ? "🟢 Aktif & Çalışıyor" : "⚪ Kayıtlı Değil") : "Yükleniyor..."}
              </span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-primary/10">
              <span className="text-on-surface-variant">Bağlantı Durumu:</span>
              <span className="font-bold text-primary">
                {isMounted ? (isOnline ? "🟢 Online" : "🟠 Offline") : "—"}
              </span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-primary/10">
              <span className="text-on-surface-variant">Uygulama Modu:</span>
              <span className="font-bold text-primary">
                {isMounted ? (isInstalled ? "📱 Standalone (Yüklü)" : "🌐 Web Tarayıcısı") : "—"}
              </span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-primary/10">
              <span className="text-on-surface-variant">Önbellek Anahtarları:</span>
              <span className="font-bold text-primary">
                {isMounted && cacheKeys.length > 0 ? cacheKeys.join(", ") : "Önbellek Boş"}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleClearAllCaches}
              className="px-3 py-2 bg-primary text-white hover:bg-surface-variant hover:text-primary border border-primary uppercase transition-colors cursor-pointer"
            >
              🧹 TÜM ÖNBELLEĞİ TEMİZLE
            </button>
            <button
              onClick={() => setOnline(!isOnline)}
              className="px-3 py-2 border border-primary text-primary hover:bg-surface-variant uppercase transition-colors cursor-pointer"
            >
              {isOnline ? "OFFLINE SİMÜLASYONU YAP" : "ONLINE MODA DÖN"}
            </button>
            {isInstallable && (
              <button
                onClick={openInstallModal}
                className="px-3 py-2 border border-primary text-primary hover:bg-surface-variant uppercase transition-colors cursor-pointer"
              >
                PWA YÜKLEME MODALINI AÇ
              </button>
            )}
            <button
              onClick={handleUnregisterSW}
              className="px-3 py-2 border border-red-500 text-red-600 hover:bg-red-50 uppercase transition-colors cursor-pointer"
            >
              SW KAYDINI KALDIR
            </button>
          </div>
        </div>

        {/* SECTION 4: State & Local Storage Reset */}
        <div className="border border-primary bg-surface p-6 shadow-sm">
          <h2 className="font-bold text-sm text-primary uppercase mb-4 border-b border-primary/20 pb-2">
            04 / YEREL DURUM (STORE) SIFIRLAMA
          </h2>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="border border-primary/20 p-3 bg-surface-container-low">
              <span className="text-on-surface-variant block">Sepet:</span>
              <span className="font-bold text-primary text-sm">{isMounted ? cartItems.length : 0} ürün</span>
            </div>
            <div className="border border-primary/20 p-3 bg-surface-container-low">
              <span className="text-on-surface-variant block">İstek Listesi:</span>
              <span className="font-bold text-primary text-sm">{isMounted ? wishlistItems.length : 0} ürün</span>
            </div>
            <div className="border border-primary/20 p-3 bg-surface-container-low">
              <span className="text-on-surface-variant block">Karşılaştırma:</span>
              <span className="font-bold text-primary text-sm">{isMounted ? compareItems.length : 0} ürün</span>
            </div>
            <div className="border border-primary/20 p-3 bg-surface-container-low">
              <span className="text-on-surface-variant block">VIP Sadakat:</span>
              <span className="font-bold text-primary text-sm">{isMounted ? `${loyaltyPoints} (${loyaltyTier})` : "—"}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                clearCart();
                showFeedback("Sepet sıfırlandı.");
              }}
              className="px-3 py-2 border border-primary text-primary hover:bg-surface-variant uppercase transition-colors cursor-pointer"
            >
              Sepeti Sıfırla
            </button>
            <button
              onClick={() => {
                clearWishlist();
                showFeedback("İstek listesi sıfırlandı.");
              }}
              className="px-3 py-2 border border-primary text-primary hover:bg-surface-variant uppercase transition-colors cursor-pointer"
            >
              İstek Listesini Sıfırla
            </button>
            <button
              onClick={() => {
                clearCompare();
                showFeedback("Karşılaştırma listesi sıfırlandı.");
              }}
              className="px-3 py-2 border border-primary text-primary hover:bg-surface-variant uppercase transition-colors cursor-pointer"
            >
              Karşılaştırmayı Sıfırla
            </button>
            <button
              onClick={() => {
                resetLoyalty();
                showFeedback("Sadakat puanları sıfırlandı.");
              }}
              className="px-3 py-2 border border-primary text-primary hover:bg-surface-variant uppercase transition-colors cursor-pointer"
            >
              VIP Puanlarını Sıfırla
            </button>
            <button
              onClick={() => {
                if (typeof window !== "undefined") {
                  localStorage.clear();
                  window.location.reload();
                }
              }}
              className="px-3 py-2 bg-red-600 text-white hover:bg-red-700 uppercase transition-colors font-bold cursor-pointer"
            >
              💥 TÜM BELLEĞİ SIFIRLA (HARD RESET)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

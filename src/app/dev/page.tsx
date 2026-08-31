"use client";

import React, { useState, useEffect, useSyncExternalStore, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Shield,
  Package,
  ShoppingBag,
  Ticket,
  Sliders,
  RotateCcw,
  Plus,
  Trash2,
  Download,
  Upload,
  User,
  CheckCircle,
  Clock,
  Truck,
  AlertTriangle,
  ArrowRight,
  Database,
  Eye,
  MessageSquareHeart,
  Star,
} from "lucide-react";
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
import { useAuthStore } from "@/lib/store/useAuthStore";
import { useFeedbackStore } from "@/lib/store/useFeedbackStore";

const emptySubscribe = () => () => {};

export interface MockOrder {
  id: string;
  customerName: string;
  customerEmail: string;
  items: string;
  total: number;
  status: "Hazırlanıyor" | "Kargolandı" | "Teslim Edildi" | "İptal";
  trackingCode?: string;
  date: string;
}

export interface MockCoupon {
  code: string;
  discount: string;
  minSpend: string;
  status: "Aktif" | "Pasif";
  description: string;
}

export default function DeveloperPanelPage() {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  // Active Panel Tab
  const [activeTab, setActiveTab] = useState<
    "overview" | "catalog" | "orders" | "coupons" | "feedbacks" | "diagnostics"
  >("overview");

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
  const { user, isAuthenticated, login, logout } = useAuthStore();
  const { feedbacks, deleteFeedback, clearAllFeedbacks } = useFeedbackStore();

  // Local Catalog State
  const [version, setVersion] = useState<number>(0);
  const [cacheKeys, setCacheKeys] = useState<string[]>([]);
  const [swActive, setSwActive] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

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
  const [newImage, setNewImage] = useState("/products/cyber-neon-rugby-polo-1.jpg");
  const [newDesc, setNewDesc] = useState(
    "Y2K sokak silüeti, ağır gramajlı kompakt pamuk ve özel serigrafi baskı."
  );

  // Live Orders Simulator State
  const [orders, setOrders] = useState<MockOrder[]>([
    {
      id: "ORD-948201-TR",
      customerName: "Adnan Çerez",
      customerEmail: "musteri@clost.store",
      items: "Oversized Technical Parka V.2 (Siyah / M), Raw Denim (32)",
      total: 12500,
      status: "Teslim Edildi",
      trackingCode: "CL-892401-TR",
      date: "2026-08-28 14:32",
    },
    {
      id: "ORD-820491-TR",
      customerName: "Selin Yılmaz",
      customerEmail: "selin.y@example.com",
      items: "Heavyweight Boxy Hoodie 500 GSM (Kömür Gri / L)",
      total: 5200,
      status: "Kargolandı",
      trackingCode: "CL-771923-TR",
      date: "2026-08-30 11:15",
    },
    {
      id: "ORD-719302-TR",
      customerName: "Emre Demir",
      customerEmail: "emre.d@example.com",
      items: "Waterproof Shell Jacket 3L (Zeytin Yeşili / M)",
      total: 6800,
      status: "Hazırlanıyor",
      date: "2026-08-31 09:40",
    },
  ]);

  // Live Coupons Management State
  const [coupons, setCoupons] = useState<MockCoupon[]>([
    {
      code: "CLOST20",
      discount: "%20",
      minSpend: "3.000 ₺",
      status: "Aktif",
      description: "Büyük Sepet Avantajı",
    },
    {
      code: "CLOST15",
      discount: "%15",
      minSpend: "1.500 ₺",
      status: "Aktif",
      description: "Sonbahar Lansman İndirimi",
    },
    {
      code: "CLOST10",
      discount: "%10",
      minSpend: "Alt limitsiz",
      status: "Aktif",
      description: "İlk Sipariş Hoşgeldin Kuponu",
    },
    {
      code: "SET10",
      discount: "%10",
      minSpend: "2 parça",
      status: "Aktif",
      description: "Lookbook Set İndirimi",
    },
  ]);

  const [newCouponCode, setNewCouponCode] = useState("");
  const [newCouponDiscount, setNewCouponDiscount] = useState("%15");
  const [newCouponMin, setNewCouponMin] = useState("1.500 ₺");
  const [newCouponDesc, setNewCouponDesc] = useState("Özel Tanıtım İndirimi");

  // Inspect environment
  const shopifyDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || null;
  const shopifyToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || null;
  const hasShopifyCredentials = !!(shopifyDomain && shopifyToken);

  const refreshCatalog = useCallback(() => {
    setVersion((v) => v + 1);
  }, []);

  useEffect(() => {
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

    setNewTitle("");
    setNewHandle("");
  };

  const handleDeleteProduct = (idOrHandle: string) => {
    removeCustomProduct(idOrHandle);
    refreshCatalog();
    showFeedback("Ürün silindi.");
  };

  // Handlers: Export & Import JSON
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(products, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `clost-catalog-backup-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showFeedback("Katalog JSON dosyası olarak indirildi.");
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (Array.isArray(parsed)) {
            localStorage.setItem("clost_custom_products", JSON.stringify(parsed));
            localStorage.removeItem("clost_clean_mode");
            refreshCatalog();
            showFeedback(`${parsed.length} adet ürün başarıyla yüklendi!`);
          }
        } catch {
          showFeedback("Geçersiz JSON dosyası.");
        }
      };
    }
  };

  // Handlers: Orders Simulator
  const handleUpdateOrderStatus = (orderId: string, status: MockOrder["status"]) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    showFeedback(`${orderId} durumu "${status}" olarak güncellendi.`);
  };

  const handleAddTestOrder = () => {
    const randomTotal = Math.floor(Math.random() * 8000) + 2000;
    const newOrder: MockOrder = {
      id: `ORD-${Math.floor(100000 + Math.random() * 900000)}-TR`,
      customerName: "Test Kullanıcısı",
      customerEmail: "test@clost.store",
      items: "Oversized Technical Parka V.2 (Siyah / L)",
      total: randomTotal,
      status: "Hazırlanıyor",
      date: new Date().toISOString().replace("T", " ").slice(0, 16),
    };
    setOrders([newOrder, ...orders]);
    showFeedback("Yeni simüle sipariş oluşturuldu.");
  };

  // Handlers: Coupons
  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;
    const item: MockCoupon = {
      code: newCouponCode.trim().toUpperCase(),
      discount: newCouponDiscount.trim(),
      minSpend: newCouponMin.trim(),
      status: "Aktif",
      description: newCouponDesc.trim(),
    };
    setCoupons([item, ...coupons]);
    setNewCouponCode("");
    showFeedback(`"${item.code}" kuponu oluşturuldu.`);
  };

  const handleDeleteCoupon = (code: string) => {
    setCoupons((prev) => prev.filter((c) => c.code !== code));
    showFeedback("Kupon silindi.");
  };

  // Calculations
  const totalRevenue = orders
    .filter((o) => o.status !== "İptal")
    .reduce((acc, o) => acc + o.total, 0);

  return (
    <div className="min-h-screen bg-surface py-8 px-4 md:px-8 max-w-7xl mx-auto font-label-mono text-xs">
      {/* Top Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 mb-6 border-b border-primary gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 bg-emerald-500 animate-pulse" />
            <span className="text-[10px] uppercase text-on-surface-variant font-bold">
              CLOST ENTERPRISE // DEV &amp; SATICI YÖNETİM PLATFORMU
            </span>
          </div>
          <h1 className="font-headline-sm text-xl md:text-2xl font-bold text-primary tracking-tight uppercase">
            MAĞAZA KONTROL MERKEZİ
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {isAuthenticated ? (
            <div className="flex items-center gap-2 bg-surface-container-low border border-primary px-3 py-1.5">
              <User className="w-3.5 h-3.5 text-primary" />
              <span className="text-primary font-bold">{user?.name} ({user?.role})</span>
              <button
                type="button"
                onClick={logout}
                className="text-red-600 underline ml-1 hover:opacity-75 font-bold cursor-pointer"
              >
                Çıkış
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => login("admin@clost.store", "admin123")}
              className="px-3 py-1.5 bg-primary text-on-primary hover:bg-surface-variant hover:text-primary border border-primary uppercase font-bold cursor-pointer"
            >
              🛡️ Admin Girişi Yap
            </button>
          )}

          <Link
            href="/"
            className="px-4 py-2 border border-primary text-primary hover:bg-primary hover:text-white uppercase transition-colors font-bold"
          >
            ← Mağazaya Dön
          </Link>
        </div>
      </header>

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

      {/* Navigation Tabs */}
      <nav className="flex flex-wrap border-b border-primary mb-8 font-label-mono text-xs uppercase">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-5 py-3 border-r border-t border-l border-primary -mb-[1px] transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === "overview"
              ? "bg-primary text-on-primary font-bold"
              : "bg-surface text-primary hover:bg-surface-variant"
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Genel Bakış</span>
        </button>

        <button
          onClick={() => setActiveTab("catalog")}
          className={`px-5 py-3 border-r border-t border-primary -mb-[1px] transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === "catalog"
              ? "bg-primary text-on-primary font-bold"
              : "bg-surface text-primary hover:bg-surface-variant"
          }`}
        >
          <Package className="w-3.5 h-3.5" />
          <span>Ürün Kataloğu ({isMounted ? products.length : 0})</span>
        </button>

        <button
          onClick={() => setActiveTab("orders")}
          className={`px-5 py-3 border-r border-t border-primary -mb-[1px] transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === "orders"
              ? "bg-primary text-on-primary font-bold"
              : "bg-surface text-primary hover:bg-surface-variant"
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Siparişler ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("coupons")}
          className={`px-5 py-3 border-r border-t border-primary -mb-[1px] transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === "coupons"
              ? "bg-primary text-on-primary font-bold"
              : "bg-surface text-primary hover:bg-surface-variant"
          }`}
        >
          <Ticket className="w-3.5 h-3.5" />
          <span>Kuponlar &amp; İndirim</span>
        </button>

        <button
          onClick={() => setActiveTab("feedbacks")}
          className={`px-5 py-3 border-r border-t border-primary -mb-[1px] transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === "feedbacks"
              ? "bg-primary text-on-primary font-bold"
              : "bg-surface text-primary hover:bg-surface-variant"
          }`}
        >
          <MessageSquareHeart className="w-3.5 h-3.5" />
          <span>Geri Bildirimler ({feedbacks.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("diagnostics")}
          className={`px-5 py-3 border-r border-t border-primary -mb-[1px] transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === "diagnostics"
              ? "bg-primary text-on-primary font-bold"
              : "bg-surface text-primary hover:bg-surface-variant"
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span>PWA &amp; Tanı Araçları</span>
        </button>
      </nav>

      {/* TAB 1: OVERVIEW */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          {/* KPI Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="border border-primary bg-surface p-5 shadow-sm">
              <span className="text-on-surface-variant text-[11px] block uppercase font-bold">
                Toplam Satış Hacmi
              </span>
              <span className="font-price-lg text-primary text-2xl font-bold block mt-2">
                {totalRevenue.toLocaleString("tr-TR")} ₺
              </span>
              <span className="text-emerald-700 text-[10px] block mt-1">✓ 3 Başarılı Sipariş</span>
            </div>

            <div className="border border-primary bg-surface p-5 shadow-sm">
              <span className="text-on-surface-variant text-[11px] block uppercase font-bold">
                Aktif Katalog Parçaları
              </span>
              <span className="font-price-lg text-primary text-2xl font-bold block mt-2">
                {isMounted ? products.length : 0} Model
              </span>
              <span className="text-on-surface-variant text-[10px] block mt-1">
                {cleanMode ? "Temiz Mod devrede" : "Varsayılan Arşiv"}
              </span>
            </div>

            <div className="border border-primary bg-surface p-5 shadow-sm">
              <span className="text-on-surface-variant text-[11px] block uppercase font-bold">
                Ortalama Sipariş Tutarı
              </span>
              <span className="font-price-lg text-primary text-2xl font-bold block mt-2">
                {orders.length > 0
                  ? Math.round(totalRevenue / orders.length).toLocaleString("tr-TR")
                  : 0}{" "}
                ₺
              </span>
              <span className="text-on-surface-variant text-[10px] block mt-1">AOV Metriği</span>
            </div>

            <div className="border border-primary bg-surface p-5 shadow-sm">
              <span className="text-on-surface-variant text-[11px] block uppercase font-bold">
                PWA &amp; Çevrimdışı Durum
              </span>
              <span className="font-headline-sm text-primary text-lg font-bold block mt-2">
                {isMounted ? (isOnline ? "🟢 Online" : "🟠 Çevrimdışı") : "..."}
              </span>
              <span className="text-on-surface-variant text-[10px] block mt-1">
                {swActive ? "Service Worker Aktif" : "SW Bekleniyor"}
              </span>
            </div>
          </div>

          {/* Quick Actions & Recent Orders */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 border border-primary bg-surface p-6 shadow-sm">
              <div className="flex justify-between items-center border-b border-primary pb-3 mb-4">
                <h3 className="font-bold text-sm uppercase text-primary flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Son Sipariş Hareketleri
                </h3>
                <button
                  type="button"
                  onClick={handleAddTestOrder}
                  className="px-3 py-1.5 bg-primary text-on-primary uppercase font-bold hover:bg-surface-variant hover:text-primary transition-colors cursor-pointer text-[11px]"
                >
                  + Test Siparişi Ekle
                </button>
              </div>

              <div className="divide-y divide-outline-variant">
                {orders.slice(0, 3).map((order) => (
                  <div key={order.id} className="py-3 flex justify-between items-center gap-4">
                    <div>
                      <span className="font-bold text-primary block">{order.id} — {order.customerName}</span>
                      <span className="text-on-surface-variant text-[11px] block">{order.items}</span>
                      <span className="text-[10px] text-on-surface-variant">{order.date}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-primary block text-sm">
                        {order.total.toLocaleString("tr-TR")} ₺
                      </span>
                      <span
                        className={`inline-block px-2 py-0.5 text-[10px] uppercase font-bold mt-1 ${
                          order.status === "Teslim Edildi"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                            : order.status === "Kargolandı"
                            ? "bg-sky-100 text-sky-800 border border-sky-300"
                            : "bg-amber-100 text-amber-800 border border-amber-300"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 border border-primary bg-surface p-6 shadow-sm flex flex-col justify-between gap-4">
              <div>
                <h3 className="font-bold text-sm uppercase text-primary border-b border-primary pb-3 mb-3">
                  Mağaza Hızlı Araçları
                </h3>
                <div className="flex flex-col gap-2.5">
                  <button
                    type="button"
                    onClick={handleExportJSON}
                    className="w-full p-2.5 border border-primary bg-surface hover:bg-surface-variant text-left uppercase flex items-center justify-between font-bold cursor-pointer"
                  >
                    <span>Katalog Yedek İndir (JSON)</span>
                    <Download className="w-4 h-4" />
                  </button>

                  <label className="w-full p-2.5 border border-primary bg-surface hover:bg-surface-variant text-left uppercase flex items-center justify-between font-bold cursor-pointer">
                    <span>Yedekten Katalog Yükle</span>
                    <Upload className="w-4 h-4" />
                    <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
                  </label>

                  <button
                    type="button"
                    onClick={handleResetDefaultCatalog}
                    className="w-full p-2.5 border border-primary bg-surface hover:bg-surface-variant text-left uppercase flex items-center justify-between font-bold cursor-pointer"
                  >
                    <span>Başlangıç Kataloğunu Yükle</span>
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="border border-dashed border-red-500 p-3 bg-red-50/50">
                <span className="font-bold text-red-700 block mb-1">KRİTİK TEMİZLİK:</span>
                <button
                  type="button"
                  onClick={handleWipeCatalog}
                  className="w-full py-2 bg-red-700 text-white uppercase font-bold hover:bg-red-800 transition-colors cursor-pointer"
                >
                  Sitedeki Tüm Ürünleri Sıfırla (0 Ürün)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CATALOG */}
      {activeTab === "catalog" && (
        <div className="space-y-8">
          {/* Add Product Form */}
          <div className="border border-primary bg-surface-container-low p-6 shadow-sm">
            <h3 className="font-bold text-sm text-primary uppercase mb-4 border-b border-primary/20 pb-2 flex items-center gap-2">
              <Plus className="w-4 h-4" /> Yeni Ürün Oluştur &amp; Yayına Al
            </h3>

            <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-on-surface-variant mb-1 font-bold">Ürün Başlığı:</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Örn: Modüler Taktik Yelek"
                  required
                  className="w-full border border-primary p-2.5 bg-surface text-primary"
                />
              </div>

              <div>
                <label className="block text-on-surface-variant mb-1 font-bold">Fiyat (₺):</label>
                <input
                  type="number"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  required
                  className="w-full border border-primary p-2.5 bg-surface text-primary"
                />
              </div>

              <div>
                <label className="block text-on-surface-variant mb-1 font-bold">Kategori:</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full border border-primary p-2.5 bg-surface text-primary font-bold"
                >
                  <option value="Dış Giyim">Dış Giyim (Outerwear)</option>
                  <option value="Üst Giyim">Üst Giyim (Tops)</option>
                  <option value="Alt Giyim">Alt Giyim (Bottoms)</option>
                  <option value="Aksesuar">Aksesuar</option>
                </select>
              </div>

              <div>
                <label className="block text-on-surface-variant mb-1 font-bold">Bedenler (Virgülle):</label>
                <input
                  type="text"
                  value={newSizes}
                  onChange={(e) => setNewSizes(e.target.value)}
                  placeholder="S, M, L, XL"
                  className="w-full border border-primary p-2.5 bg-surface text-primary"
                />
              </div>

              <div>
                <label className="block text-on-surface-variant mb-1 font-bold">Renk:</label>
                <input
                  type="text"
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                  placeholder="Siyah"
                  className="w-full border border-primary p-2.5 bg-surface text-primary"
                />
              </div>

              <div>
                <label className="block text-on-surface-variant mb-1 font-bold">Görsel URL:</label>
                <input
                  type="url"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  required
                  className="w-full border border-primary p-2.5 bg-surface text-primary"
                />
              </div>

              <div className="md:col-span-3">
                <label className="block text-on-surface-variant mb-1 font-bold">Açıklama &amp; Kumaş Detayı:</label>
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  rows={2}
                  className="w-full border border-primary p-2.5 bg-surface text-primary"
                />
              </div>

              <div className="md:col-span-3 flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-3 bg-primary text-white hover:bg-surface-variant hover:text-primary uppercase font-bold tracking-wider transition-colors border border-primary cursor-pointer"
                >
                  + Ürünü Yayınla &amp; Kataloğa Ekle
                </button>
              </div>
            </form>
          </div>

          {/* Product Items Table */}
          <div className="border border-primary bg-surface p-6 shadow-sm">
            <h3 className="font-bold text-primary uppercase mb-4 text-xs">
              Mevcut Ürünler ({isMounted ? products.length : 0})
            </h3>

            {isMounted && products.length === 0 ? (
              <div className="border border-dashed border-primary p-8 text-center bg-surface-container-low">
                <p className="text-primary font-bold mb-2">Katalog boş durumda (0 Ürün).</p>
                <button
                  onClick={handleResetDefaultCatalog}
                  className="px-4 py-2 border border-primary bg-surface hover:bg-primary hover:text-on-primary uppercase transition-colors cursor-pointer font-bold"
                >
                  Varsayılan Ürünleri Geri Yükle
                </button>
              </div>
            ) : (
              <div className="divide-y divide-outline-variant border border-primary max-h-[500px] overflow-y-auto">
                {isMounted &&
                  products.map((p) => {
                    const img = p.featuredImage?.url || p.images[0]?.url;
                    return (
                      <div key={p.id} className="p-3 flex items-center justify-between gap-4 hover:bg-surface-container-low transition-colors">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-12 h-14 bg-surface-variant relative shrink-0 border border-primary">
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
                              {p.productType} • {p.priceRange.minVariantPrice.amount} ₺ • Handle: /{p.handle}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <Link
                            href={`/products/${p.handle}`}
                            target="_blank"
                            className="px-3 py-1.5 border border-primary text-primary hover:bg-primary hover:text-white uppercase text-[11px] font-bold"
                          >
                            İncele ↗
                          </Link>
                          <button
                            onClick={() => handleDeleteProduct(p.id)}
                            className="px-3 py-1.5 bg-red-700 text-white hover:bg-red-800 uppercase text-[11px] cursor-pointer font-bold"
                          >
                            Sil
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: ORDERS */}
      {activeTab === "orders" && (
        <div className="border border-primary bg-surface p-6 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-primary pb-4">
            <div>
              <h3 className="font-bold text-sm uppercase text-primary">
                Sipariş Yönetimi ({orders.length})
              </h3>
              <p className="text-on-surface-variant text-[11px] mt-0.5">
                Sipariş durumunu güncelleyebilir veya test siparişi simüle edebilirsiniz.
              </p>
            </div>
            <button
              onClick={handleAddTestOrder}
              className="px-4 py-2 bg-primary text-on-primary uppercase font-bold hover:bg-surface-variant hover:text-primary border border-primary transition-colors cursor-pointer text-xs"
            >
              + Simüle Sipariş Ekle
            </button>
          </div>

          <div className="divide-y divide-outline-variant border border-primary">
            {orders.map((order) => (
              <div key={order.id} className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-surface-container-low">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-primary text-sm uppercase">{order.id}</span>
                    <span className="text-on-surface-variant text-[11px]">({order.customerName} - {order.customerEmail})</span>
                  </div>
                  <p className="text-on-surface-variant text-xs mt-1">{order.items}</p>
                  <p className="text-[10px] text-on-surface-variant mt-0.5">Tarih: {order.date} {order.trackingCode && `• Kargo Kodu: ${order.trackingCode}`}</p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                  <span className="font-bold text-primary text-base">
                    {order.total.toLocaleString("tr-TR")} ₺
                  </span>

                  <select
                    value={order.status}
                    onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value as MockOrder["status"])}
                    className="border border-primary p-2 bg-surface font-bold text-xs uppercase cursor-pointer"
                  >
                    <option value="Hazırlanıyor">Hazırlanıyor</option>
                    <option value="Kargolandı">Kargolandı</option>
                    <option value="Teslim Edildi">Teslim Edildi</option>
                    <option value="İptal">İptal</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: COUPONS */}
      {activeTab === "coupons" && (
        <div className="space-y-8">
          <div className="border border-primary bg-surface-container-low p-6 shadow-sm">
            <h3 className="font-bold text-sm uppercase text-primary mb-4 border-b border-primary/20 pb-2 flex items-center gap-2">
              <Ticket className="w-4 h-4" /> Yeni İndirim Kuponu Oluştur
            </h3>

            <form onSubmit={handleAddCoupon} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-on-surface-variant mb-1 font-bold">Kupon Kodu:</label>
                <input
                  type="text"
                  value={newCouponCode}
                  onChange={(e) => setNewCouponCode(e.target.value)}
                  placeholder="Örn: CLOST15"
                  required
                  className="w-full border border-primary p-2.5 bg-surface text-primary uppercase font-bold"
                />
              </div>

              <div>
                <label className="block text-on-surface-variant mb-1 font-bold">İndirim Oranı/Tutarı:</label>
                <input
                  type="text"
                  value={newCouponDiscount}
                  onChange={(e) => setNewCouponDiscount(e.target.value)}
                  placeholder="%15 veya 250 ₺"
                  required
                  className="w-full border border-primary p-2.5 bg-surface text-primary font-bold"
                />
              </div>

              <div>
                <label className="block text-on-surface-variant mb-1 font-bold">Minimum Sepet Tutarı:</label>
                <input
                  type="text"
                  value={newCouponMin}
                  onChange={(e) => setNewCouponMin(e.target.value)}
                  placeholder="1.500 ₺"
                  required
                  className="w-full border border-primary p-2.5 bg-surface text-primary"
                />
              </div>

              <div>
                <label className="block text-on-surface-variant mb-1 font-bold">Açıklama:</label>
                <input
                  type="text"
                  value={newCouponDesc}
                  onChange={(e) => setNewCouponDesc(e.target.value)}
                  placeholder="Özel Kampanya"
                  required
                  className="w-full border border-primary p-2.5 bg-surface text-primary"
                />
              </div>

              <div className="md:col-span-4 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-primary text-on-primary uppercase font-bold hover:bg-surface-variant hover:text-primary border border-primary transition-colors cursor-pointer"
                >
                  + Kuponu Kaydet &amp; Aktif Et
                </button>
              </div>
            </form>
          </div>

          <div className="border border-primary bg-surface p-6 shadow-sm">
            <h3 className="font-bold text-sm uppercase text-primary mb-4">
              Aktif Kuponlar ({coupons.length})
            </h3>

            <div className="divide-y divide-outline-variant border border-primary">
              {coupons.map((c) => (
                <div key={c.code} className="p-4 flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-primary text-sm uppercase bg-surface-container-low border border-primary px-2.5 py-1">
                        {c.code}
                      </span>
                      <span className="font-bold text-emerald-700 text-xs">({c.discount} İndirim)</span>
                    </div>
                    <p className="text-on-surface-variant text-xs mt-1">{c.description} • Min: {c.minSpend}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteCoupon(c.code)}
                    className="px-3 py-1.5 bg-red-700 text-white hover:bg-red-800 uppercase font-bold text-xs cursor-pointer"
                  >
                    Sil
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB: FEEDBACKS & BUG REPORTS */}
      {activeTab === "feedbacks" && (
        <div className="space-y-6">
          <div className="border border-primary bg-surface p-6 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="font-label-mono text-xs uppercase text-on-surface-variant block mb-1">
                KULLANICI GERİ BİLDİRİM MERKEZİ
              </span>
              <h3 className="font-headline-sm uppercase text-primary text-xl font-bold">
                Müşteri Geri Bildirimleri &amp; Hata Raporları ({feedbacks.length})
              </h3>
            </div>

            {feedbacks.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  if (confirm("Tüm geri bildirimleri silmek istediğinize emin misiniz?")) {
                    clearAllFeedbacks();
                    showFeedback("Tüm geri bildirimler temizlendi.");
                  }
                }}
                className="px-4 py-2 border border-red-700 text-red-700 hover:bg-red-700 hover:text-white uppercase font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Tümünü Temizle</span>
              </button>
            )}
          </div>

          {feedbacks.length === 0 ? (
            <div className="p-12 border border-primary bg-surface text-center flex flex-col items-center justify-center gap-3">
              <MessageSquareHeart className="w-10 h-10 text-outline-variant stroke-1" />
              <p className="font-headline-sm uppercase text-primary text-base font-bold">
                Henüz Geri Bildirim Bulunmuyor
              </p>
              <p className="font-body-md text-xs text-on-surface-variant max-w-sm">
                Müşteriler alt bardaki veya footer&apos;daki geri bildirim formunu doldurdukça buraya anında düşecektir.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {feedbacks.map((fb) => {
                const typeLabels: Record<string, { label: string; color: string }> = {
                  experience: { label: "Alışveriş Deneyimi", color: "bg-blue-100 text-blue-800 border-blue-300" },
                  product: { label: "Ürün Kalitesi & Kalıp", color: "bg-emerald-100 text-emerald-800 border-emerald-300" },
                  bug: { label: "Hata / Bug Raporu", color: "bg-red-100 text-red-800 border-red-300" },
                  suggestion: { label: "Öneri & İstek", color: "bg-purple-100 text-purple-800 border-purple-300" },
                };
                const badge = typeLabels[fb.type] || { label: fb.type, color: "bg-gray-100 text-gray-800 border-gray-300" };

                return (
                  <div
                    key={fb.id}
                    className="border border-primary bg-surface p-6 shadow-sm flex flex-col justify-between gap-4 font-label-mono"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-outline-variant pb-3">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] uppercase font-bold px-2.5 py-0.5 border ${badge.color}`}>
                          {badge.label}
                        </span>
                        <div className="flex items-center text-amber-500">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className={`w-3.5 h-3.5 ${s <= fb.rating ? "fill-amber-500 text-amber-500" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="text-on-surface-variant text-[11px] flex items-center gap-3">
                        <span>Sayfa: <code className="bg-surface-container-low px-1 py-0.5 border border-outline-variant text-primary">{fb.pageUrl}</code></span>
                        <span>•</span>
                        <span>{fb.createdAt}</span>
                      </div>
                    </div>

                    <p className="font-body-md text-sm text-primary leading-relaxed py-1">
                      &ldquo;{fb.message}&rdquo;
                    </p>

                    <div className="flex justify-between items-center border-t border-outline-variant pt-3 text-xs">
                      <span className="text-on-surface-variant">
                        İletişim: <strong className="text-primary">{fb.email || "Anonim Kullanıcı"}</strong>
                      </span>

                      <button
                        type="button"
                        onClick={() => {
                          deleteFeedback(fb.id);
                          showFeedback("Geri bildirim silindi.");
                        }}
                        className="text-red-700 hover:text-red-900 font-bold uppercase text-[11px] flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" /> Sil
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 6: DIAGNOSTICS & PWA */}
      {activeTab === "diagnostics" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border border-primary bg-surface p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-sm uppercase text-primary border-b border-primary pb-2">
              PWA &amp; Service Worker Durumu
            </h3>

            <div className="space-y-2">
              <div className="flex justify-between py-1 border-b border-outline-variant">
                <span className="text-on-surface-variant">Service Worker:</span>
                <span className="font-bold text-primary">{swActive ? "🟢 Aktif" : "⚪ Kayıtlı Değil"}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-outline-variant">
                <span className="text-on-surface-variant">İnternet Bağlantısı:</span>
                <span className="font-bold text-primary">{isOnline ? "🟢 Online" : "🟠 Offline"}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-outline-variant">
                <span className="text-on-surface-variant">PWA Yükleme Durumu:</span>
                <span className="font-bold text-primary">{isInstalled ? "📱 Yüklü" : "🌐 Tarayıcı"}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-outline-variant">
                <span className="text-on-surface-variant">Önbellek (Cache) Boyutu:</span>
                <span className="font-bold text-primary">{cacheKeys.length} Depolama Alanı</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setOnline(!isOnline)}
                className="px-3 py-2 border border-primary text-primary hover:bg-surface-variant uppercase font-bold cursor-pointer"
              >
                {isOnline ? "Çevrimdışı Simülasyonu" : "Çevrimiçi Moda Dön"}
              </button>

              <button
                type="button"
                onClick={() => {
                  if ("caches" in window) {
                    caches.keys().then((keys) => keys.forEach((k) => caches.delete(k)));
                    showFeedback("Tüm cache temizlendi.");
                  }
                }}
                className="px-3 py-2 bg-primary text-on-primary hover:bg-surface-variant hover:text-primary uppercase font-bold cursor-pointer border border-primary"
              >
                Önbelleği Temizle
              </button>
            </div>
          </div>

          <div className="border border-primary bg-surface p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-sm uppercase text-primary border-b border-primary pb-2">
              Yerel Depolama (Store) Sıfırlama
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 border border-outline-variant bg-surface-container-low">
                <span className="text-on-surface-variant block">Sepet:</span>
                <span className="font-bold text-primary">{cartItems.length} Parça</span>
              </div>
              <div className="p-3 border border-outline-variant bg-surface-container-low">
                <span className="text-on-surface-variant block">İstek Listesi:</span>
                <span className="font-bold text-primary">{wishlistItems.length} Parça</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  clearCart();
                  showFeedback("Sepet sıfırlandı.");
                }}
                className="px-3 py-2 border border-primary text-primary hover:bg-surface-variant uppercase font-bold cursor-pointer"
              >
                Sepeti Boşalt
              </button>

              <button
                type="button"
                onClick={() => {
                  clearWishlist();
                  showFeedback("İstek listesi sıfırlandı.");
                }}
                className="px-3 py-2 border border-primary text-primary hover:bg-surface-variant uppercase font-bold cursor-pointer"
              >
                İstek Listesini Temizle
              </button>

              <button
                type="button"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    localStorage.clear();
                    window.location.reload();
                  }
                }}
                className="px-3 py-2 bg-red-700 text-white hover:bg-red-800 uppercase font-bold cursor-pointer"
              >
                💥 Tüm Belleği Sıfırla (Hard Reset)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

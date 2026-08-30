# CLOST — Modern Brutalist Techwear E-Commerce Storefront

Kullanışlılık için tasarlandı. Next.js 15+ (App Router), Tailwind CSS, Zustand ve Shopify Storefront API entegrasyonlu modern lüks techwear e-ticaret platformu.

---

## ⚡ Özellikler

- **Next.js 15+ App Router**: Hibrit SSR & React Server Components (RSC) ile ultra hızlı sayfa yükleme ve SEO indekslemesi.
- **Shopify Storefront API Entegrasyonu**: Canlı GraphQL istemcisi, dinamik sepet yönetimi (`checkoutUrl`) ve zengin mock veri altyapısı.
- **Zustand State Management**: Kalıcı sepet yönetimi (`useCartStore`), istek listesi (`useWishlistStore`), karşılaştırma ve VIP puan sistemi.
- **Müşteri & Dönüşüm Odaklı UI**:
  - PDP üzerinde sosyal kanıt rozetleri (canlı ziyaretçi nabzı, aynı gün kargo, güvenli ödeme).
  - Akıllı hızlı arama ve son aramalar geçmişi (`localStorage`).
  - Müşteri portalı ve geçmiş siparişlerden tek tıkla *"Tekrar Sipariş Ver"* özelliği.
  - Brutalist minimal toast bildirim sistemi.
- **Dinamik SEO & PWA**: Otomatik XML `sitemap.xml`, `robots.txt`, Web App Manifest (`manifest.webmanifest`) ve Schema.org Product JSON-LD desteği.
- **Neo-Brutalist Tasarım Sistemi**: Monokrom palet, `JetBrains Mono` ve `Inter` tipografisi.

---

## 🚀 Başlangıç

### 1. Bağımlılıkları Yükleyin
```bash
npm install
```

### 2. Ortam Değişkenlerini Tanımlayın (Opsiyonel)
Shopify mağazanızı bağlamak için `.env.example` dosyasını `.env.local` olarak kopyalayın:
```bash
cp .env.example .env.local
```

### 3. Geliştirme Sunucusunu Başlatın
```bash
npm run dev
```
Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

### 4. Derleme & Doğrulama
```bash
npm run lint
npm run build
```

---

## 📄 Lisans
© 2026 CLOST. Tüm hakları saklıdır.

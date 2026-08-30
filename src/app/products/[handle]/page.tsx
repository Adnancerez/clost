import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/shopify";
import { ProductGallery } from "@/components/product/product-gallery";
import { VariantSelector } from "@/components/product/variant-selector";
import { ProductAccordion } from "@/components/product/product-accordion";
import { StickyMobileCTA } from "@/components/product/sticky-mobile-cta";
import { ProductReviews } from "@/components/product/product-reviews";

interface Props {
  params: Promise<{ handle: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProduct(handle);

  if (!product) {
    return {
      title: "Ürün Bulunamadı — VOID ARCHIVE",
    };
  }

  return {
    title: `${product.title} — VOID ARCHIVE`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { handle } = await params;
  const product = await getProduct(handle);

  if (!product) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.images.map((img) => img.url),
    sku: product.sku || product.handle,
    brand: {
      "@type": "Brand",
      name: "VOID ARCHIVE",
    },
    offers: {
      "@type": "Offer",
      price: product.priceRange.minVariantPrice.amount,
      priceCurrency: product.priceRange.minVariantPrice.currencyCode || "TRY",
      availability: product.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `https://clost.store/products/${product.handle}`,
      seller: {
        "@type": "Organization",
        name: "VOID ARCHIVE",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "28",
    },
  };

  return (
    <main className="flex-grow pt-16 flex flex-col w-full max-w-[1920px] mx-auto">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="flex flex-col md:flex-row w-full border-b border-primary">
        {/* Left: Image Gallery (Scrollable on desktop, slider on mobile) */}
        <ProductGallery images={product.images} title={product.title} />

        {/* Right: Sticky Product Details */}
        <div className="w-full md:w-[40%] lg:w-[35%] bg-surface flex flex-col">
          <div className="md:sticky md:top-16 md:h-[calc(100vh-64px)] md:overflow-y-auto no-scrollbar">
            {/* Header Info */}
            <div className="p-4 md:p-10 border-b border-primary">
              <div className="flex justify-between items-start mb-4">
                <h1 className="font-headline-md text-primary uppercase tracking-tighter w-2/3">
                  {product.title}
                </h1>
                <span className="font-price-lg text-primary text-xl">
                  {parseFloat(product.priceRange.minVariantPrice.amount).toLocaleString("tr-TR")} ₺
                </span>
              </div>
              {product.sku && (
                <p className="font-label-mono text-on-surface-variant text-xs">
                  KOD: {product.sku}
                </p>
              )}
            </div>

            {/* Color, Size & Add to Cart */}
            <VariantSelector product={product} />

            {/* Product Description & Accordions */}
            <ProductAccordion
              description={product.description}
              accordions={product.accordions}
            />
          </div>
        </div>
      </div>

      {/* Product Reviews & Ratings Section */}
      <ProductReviews productId={product.id} productTitle={product.title} />

      {/* Sticky Mobile CTA */}
      <StickyMobileCTA product={product} />
    </main>
  );
}

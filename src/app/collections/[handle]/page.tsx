import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProducts, getCollection } from "@/lib/shopify";
import { CollectionView } from "@/components/product/collection-view";

interface Props {
  params: Promise<{ handle: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const collection = await getCollection(handle);

  if (!collection) {
    return {
      title: "Koleksiyon Bulunamadı — VOID ARCHIVE",
    };
  }

  return {
    title: `${collection.title} — VOID ARCHIVE`,
    description: collection.description || "Kullanışlılık için tasarlandı.",
  };
}

export default async function CollectionDetailPage({ params }: Props) {
  const { handle } = await params;
  const collection = await getCollection(handle);

  if (!collection) {
    notFound();
  }

  let products = await getProducts();
  if (handle === "new") {
    products = products.filter((p) => p.tags?.includes("Yeni") || p.tags?.includes("New"));
  } else if (handle === "outerwear") {
    products = products.filter((p) => p.productType === "Dış Giyim");
  } else if (handle === "tops") {
    products = products.filter((p) => p.productType === "Üst Giyim");
  } else if (handle === "bottoms") {
    products = products.filter((p) => p.productType === "Alt Giyim");
  }

  return (
    <main className="flex-grow pt-16">
      <CollectionView
        collection={collection}
        initialProducts={products}
      />
    </main>
  );
}

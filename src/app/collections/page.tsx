import React from "react";
import { Metadata } from "next";
import { getProducts, getCollection } from "@/lib/shopify";
import { CollectionView } from "@/components/product/collection-view";

export const metadata: Metadata = {
  title: "Koleksiyonlar — CLOST",
  description: "Tüm CLOST koleksiyonlarını keşfedin. Kullanışlılık için tasarlandı.",
};

export default async function CollectionsPage() {
  const products = await getProducts();
  const collection = (await getCollection("all")) || {
    id: "col_all",
    handle: "all",
    title: "Tüm Ürünler",
    description: "Eksiksiz katalog.",
  };

  return (
    <main className="flex-grow pt-16">
      <CollectionView
        collection={collection}
        initialProducts={products}
      />
    </main>
  );
}

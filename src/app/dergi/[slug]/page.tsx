import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, User, ArrowLeft } from "lucide-react";
import { JOURNAL_POSTS } from "@/lib/journal/mock-posts";
import { ProductCard } from "@/components/product/product-card";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = JOURNAL_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Makale Bulunamadı — CLOST",
    };
  }

  return {
    title: `${post.title} — CLOST Dergi`,
    description: post.subtitle,
  };
}

export default async function JournalDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = JOURNAL_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="flex-grow pt-16 flex flex-col">
      {/* Back to Index Nav */}
      <div className="p-4 md:px-12 border-b border-primary bg-surface flex items-center justify-between">
        <Link
          href="/dergi"
          className="flex items-center gap-2 font-label-mono text-xs uppercase text-primary hover:opacity-70 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" /> Tüm Makalelere Dön
        </Link>
        <span className="font-label-mono text-xs uppercase text-on-surface-variant">
          Kategori: {post.category}
        </span>
      </div>

      {/* Article Header */}
      <header className="p-6 md:p-16 border-b border-primary bg-surface-bright max-w-5xl mx-auto w-full">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4 font-label-mono text-xs text-on-surface-variant uppercase">
            <span>{post.date}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {post.readTime}
            </span>
          </div>

          <h1 className="font-display-lg-mobile md:font-headline-md text-primary uppercase tracking-tight text-3xl md:text-5xl leading-tight">
            {post.title}
          </h1>

          <p className="font-body-lg text-on-surface-variant text-base md:text-lg leading-relaxed mt-2">
            {post.subtitle}
          </p>

          <div className="flex items-center gap-2 font-label-mono text-xs text-primary pt-4 border-t border-outline-variant">
            <User className="w-4 h-4 text-primary" />
            <span>Yazar / Araştırma: {post.author}</span>
          </div>
        </div>
      </header>

      {/* Hero Cover Image */}
      <div className="w-full max-w-5xl mx-auto aspect-[16/9] relative border-b border-primary overflow-hidden">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          priority
          sizes="100vw"
          className="object-cover grayscale contrast-110"
        />
      </div>

      {/* Article Body Content */}
      <article className="p-6 md:p-16 max-w-4xl mx-auto w-full flex flex-col gap-10">
        {/* Lead Paragraph */}
        <p className="font-body-lg text-primary text-lg md:text-xl font-medium leading-relaxed border-l-2 border-primary pl-6 py-1">
          {post.content.lead}
        </p>

        {/* Sections */}
        <div className="flex flex-col gap-10">
          {post.content.sections.map((section, idx) => (
            <div key={idx} className="flex flex-col gap-3">
              <h2 className="font-headline-sm uppercase text-primary text-xl">
                {section.heading}
              </h2>
              <p className="font-body-md text-on-surface-variant text-base leading-relaxed">
                {section.body}
              </p>
            </div>
          ))}
        </div>

        {/* Pull Quote */}
        {post.content.pullQuote && (
          <blockquote className="border-t border-b border-primary py-8 my-6 text-center">
            <p className="font-headline-sm uppercase text-primary italic text-xl md:text-2xl tracking-tight max-w-2xl mx-auto">
              &quot;{post.content.pullQuote}&quot;
            </p>
            <cite className="font-label-mono text-xs text-on-surface-variant uppercase mt-3 block not-italic">
              — CLOST Manifestosu
            </cite>
          </blockquote>
        )}
      </article>

      {/* Related Products in this Article */}
      {post.relatedProducts.length > 0 && (
        <section className="border-t border-primary bg-surface-container-low p-6 md:p-16">
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-end border-b border-primary pb-4 mb-8">
              <div>
                <span className="font-label-mono text-xs uppercase text-on-surface-variant block mb-1">
                  MAKALEDE GEÇEN PARÇALAR
                </span>
                <h3 className="font-headline-sm uppercase text-primary text-xl">
                  İlgili Ürünler
                </h3>
              </div>
              <Link
                href="/collections/all"
                className="font-label-mono text-xs uppercase text-primary underline"
              >
                Kataloğu Gör
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {post.relatedProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

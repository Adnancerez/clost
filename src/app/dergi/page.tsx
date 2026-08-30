import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, User } from "lucide-react";
import { JOURNAL_POSTS } from "@/lib/journal/mock-posts";

export const metadata: Metadata = {
  title: "Dergi & Makaleler — VOID ARCHIVE",
  description:
    "Kumaş mühendisliği, brutalist mimari, techwear kültürü ve üretim manifestoları.",
};

export default function JournalPage() {
  const featuredPost = JOURNAL_POSTS[0];
  const otherPosts = JOURNAL_POSTS.slice(1);

  return (
    <main className="flex-grow pt-16 flex flex-col">
      {/* Header */}
      <header className="p-6 md:p-12 border-b border-primary bg-surface flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <span className="font-label-mono text-xs uppercase text-on-surface-variant block mb-2">
            EDİTORYAL DERGİ // MAKALE DİZİNİ
          </span>
          <h1 className="font-display-lg-mobile md:font-display-lg uppercase tracking-tighter text-primary">
            DERGİ &amp; ARAŞTIRMA
          </h1>
        </div>
        <p className="font-label-mono text-xs uppercase text-on-surface-variant max-w-xs">
          Malzeme bilimi, brutalist tasarım felsefesi ve teknik giyim manifestoları.
        </p>
      </header>

      {/* Featured Lead Story */}
      {featuredPost && (
        <section className="border-b border-primary bg-surface">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
            <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-primary relative h-[380px] lg:h-auto overflow-hidden group">
              <Image
                src={featuredPost.imageUrl}
                alt={featuredPost.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700"
              />
              <span className="absolute top-4 left-4 bg-primary text-on-primary font-label-mono text-[10px] uppercase px-3 py-1">
                ÖNE ÇIKAN MAKALE
              </span>
            </div>

            <div className="lg:col-span-5 p-6 md:p-12 flex flex-col justify-between gap-6 bg-surface">
              <div>
                <span className="font-label-mono text-xs uppercase text-on-surface-variant border-b border-outline-variant pb-1 inline-block">
                  {featuredPost.category} • {featuredPost.date}
                </span>
                <h2 className="font-headline-md uppercase text-primary tracking-tight mt-3 text-2xl md:text-3xl">
                  {featuredPost.title}
                </h2>
                <p className="font-body-md text-sm text-on-surface-variant mt-3 leading-relaxed">
                  {featuredPost.subtitle}
                </p>
              </div>

              <div className="flex flex-col gap-4 border-t border-outline-variant pt-4">
                <div className="flex items-center gap-4 font-label-mono text-xs text-on-surface-variant">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {featuredPost.readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" /> {featuredPost.author}
                  </span>
                </div>

                <Link
                  href={`/dergi/${featuredPost.slug}`}
                  className="bg-primary text-on-primary font-label-mono text-xs px-8 py-3.5 uppercase tracking-widest hover:bg-surface-variant hover:text-primary border border-primary transition-colors flex items-center justify-center gap-2 self-start"
                >
                  Makaleyi Oku <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Grid of Other Articles */}
      <section className="p-6 md:p-12 max-w-[1920px] mx-auto w-full">
        <h3 className="font-headline-sm uppercase text-primary mb-8 border-b border-primary pb-3">
          Tüm Makaleler
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {otherPosts.map((post) => (
            <article
              key={post.slug}
              className="border border-primary bg-surface flex flex-col group"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-variant border-b border-primary">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover grayscale group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-surface border border-primary font-label-mono text-[10px] uppercase px-2 py-0.5 text-primary">
                  {post.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 font-label-mono text-[11px] text-on-surface-variant mb-2">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h4 className="font-headline-sm text-lg uppercase text-primary group-hover:underline">
                    {post.title}
                  </h4>
                  <p className="font-body-md text-xs text-on-surface-variant mt-2 leading-relaxed">
                    {post.subtitle}
                  </p>
                </div>

                <Link
                  href={`/dergi/${post.slug}`}
                  className="font-label-mono text-xs uppercase text-primary font-bold flex items-center gap-1.5 hover:opacity-70 transition-opacity border-t border-outline-variant pt-3"
                >
                  Devamını Oku <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

import Image from "next/image";
import Link from "next/link";

interface Category {
  title: string;
  href: string;
  image: string;
}

const CATEGORIES: Category[] = [
  {
    title: "Dış Giyim",
    href: "/collections/outerwear",
    image: "/products/volt-yellow-mesh-track-jacket-1.jpg",
  },
  {
    title: "Üst Giyim",
    href: "/collections/tops",
    image: "/products/acid-purple-kanji-heavy-tee-1.jpg",
  },
  {
    title: "Alt Giyim",
    href: "/collections/bottoms",
    image: "/products/ultra-baggy-raw-denim-jorts-1.jpg",
  },
  {
    title: "Lookbook",
    href: "/lookbook",
    image: "/products/cyber-neon-rugby-polo-2.jpg",
  },
];

export function CategoryShowcase() {
  return (
    <section className="border-t border-outline-variant">
      <div className="px-4 md:px-10 py-10 md:py-12 flex justify-between items-end">
        <h2 className="font-headline-md uppercase text-primary tracking-tight">
          Kategoriler
        </h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4">
        {CATEGORIES.map((category) => (
          <Link
            key={category.href}
            href={category.href}
            className="group relative aspect-3-4 overflow-hidden border-r border-t border-outline-variant last:border-r-0"
          >
            <Image
              src={category.image}
              alt={category.title}
              fill
              sizes="(max-width: 640px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/30" />
            <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 flex flex-col gap-1">
              <span className="font-label-mono text-white text-sm">
                {category.title}
              </span>
              <span className="font-label-mono text-white/60 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Keşfet →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

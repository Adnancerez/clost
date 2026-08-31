import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mesafeli Satış Sözleşmesi",
  description:
    "CLOST mesafeli satış sözleşmesi — tüketici hakları, cayma hakkı ve teslimat koşulları.",
};

const SECTIONS = [
  {
    title: "Taraflar",
    body: "Bu sözleşme, satıcı CLOST ile alıcı arasında, www.clost.tr üzerinden gerçekleştirilen uzaktan satış işlemlerine ilişkin olarak düzenlenmiştir.",
  },
  {
    title: "Sipariş ve Onay",
    body: "Siparişinizi tamamladığınızda, sipariş özetiniz e-posta adresinize gönderilir. Siparişin kabulü, ürünün kargoya verilmesi ile kesinleşir.",
  },
  {
    title: "Teslimat",
    body: "Ürünler, sipariş sırasında belirttiğiniz teslimat adresine, seçilen kargo firması aracılığıyla gönderilir. Tahmini teslimat süreleri Kargo Bilgileri sayfasında belirtilmiştir.",
  },
  {
    title: "Cayma Hakkı",
    body: "Alıcı, ürünü teslim aldığı tarihten itibaren 14 gün içinde herhangi bir gerekçe göstermeksizin cayma hakkına sahiptir. Cayma hakkını kullanmak için İade & Değişim sayfamızdan talepte bulunabilirsiniz.",
  },
  {
    title: "Uyuşmazlık Çözümü",
    body: "Bu sözleşmeden doğan uyuşmazlıklarda, Türkiye Cumhuriyeti kanunları uygulanır. Uyuşmazlık halinde öncelikle Showroom & İletişim sayfamız üzerinden bize ulaşabilirsiniz.",
  },
];

export default function DistanceSalesContractPage() {
  return (
    <main className="flex-grow pt-16 flex flex-col">
      <header className="px-6 md:px-12 py-12 md:py-16 border-b border-outline-variant">
        <span className="font-label-mono text-xs text-on-surface-variant block mb-3">
          Kurumsal & Yasal
        </span>
        <h1 className="font-display-lg-mobile md:font-display-lg uppercase tracking-tight text-primary">
          Mesafeli Satış Sözleşmesi
        </h1>
        <p className="font-body-lg text-on-surface-variant mt-4 max-w-xl text-sm">
          Son güncelleme: 2026.
        </p>
      </header>

      <section className="px-6 md:px-12 py-10 max-w-3xl flex flex-col gap-10">
        {SECTIONS.map((section) => (
          <div key={section.title} className="flex flex-col gap-2">
            <h2 className="font-headline-sm uppercase text-primary">
              {section.title}
            </h2>
            <p className="font-body-md text-on-surface-variant leading-relaxed text-sm">
              {section.body}
            </p>
          </div>
        ))}
      </section>
    </main>
  );
}

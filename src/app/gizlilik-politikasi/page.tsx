import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description:
    "CLOST gizlilik politikası — kişisel verilerinizin nasıl toplandığı, kullanıldığı ve korunduğu hakkında bilgilendirme.",
};

const SECTIONS = [
  {
    title: "Toplanan Bilgiler",
    body: "Sipariş oluşturduğunuzda ad, e-posta, teslimat adresi ve telefon numarası gibi bilgilerinizi toplarız. Site kullanımınız sırasında çerezler aracılığıyla anonim kullanım verileri işlenebilir.",
  },
  {
    title: "Bilgilerin Kullanımı",
    body: "Toplanan bilgiler siparişlerinizi işlemek, teslimatı gerçekleştirmek, müşteri desteği sağlamak ve yasal yükümlülükleri yerine getirmek amacıyla kullanılır.",
  },
  {
    title: "Veri Güvenliği",
    body: "Kişisel verileriniz 256-Bit SSL şifreleme ile korunur. Ödeme bilgileriniz sunucularımızda saklanmaz; ödemeler 3D Secure güvenlik protokolü üzerinden işlenir.",
  },
  {
    title: "Üçüncü Taraflarla Paylaşım",
    body: "Verileriniz yalnızca sipariş ve teslimat süreçlerinin yürütülmesi için gerekli olan kargo ve ödeme hizmeti sağlayıcılarıyla paylaşılır. Verileriniz pazarlama amacıyla üçüncü taraflara satılmaz.",
  },
  {
    title: "Haklarınız",
    body: "Kişisel verilerinize erişme, düzeltme, silme ve işleme kısıtlama haklarına sahipsiniz. Talepleriniz için Showroom & İletişim sayfamız üzerinden bize ulaşabilirsiniz.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="flex-grow pt-16 flex flex-col">
      <header className="px-6 md:px-12 py-12 md:py-16 border-b border-outline-variant">
        <span className="font-label-mono text-xs text-on-surface-variant block mb-3">
          Kurumsal & Yasal
        </span>
        <h1 className="font-display-lg-mobile md:font-display-lg uppercase tracking-tight text-primary">
          Gizlilik Politikası
        </h1>
        <p className="font-body-lg text-on-surface-variant mt-4 max-w-xl text-sm">
          Son güncelleme: 2026. Kişisel verilerinizin güvenliği bizim için
          önceliklidir.
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

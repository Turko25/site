import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerSections: FooterSection[] = [
  {
    title: "Ürünler",
    links: [
      { label: "Tamamlayıcı Sağlık Sigortası", href: "/insurance-products" },
      { label: "Aile Sağlık Paketleri", href: "/insurance-products" },
      { label: "Bireysel Sağlık Sigortası", href: "/insurance-products" },
      { label: "Kurumsal Çözümler", href: "/insurance-products" }
    ]
  },
  {
    title: "Hizmetler",
    links: [
      { label: "Teklif Hesaplayıcı", href: "/quote-calculator" },
      { label: "Müşteri Portalı", href: "/client-portal" },
      { label: "Poliçe Yönetimi", href: "/client-portal" },
      { label: "Hasar Bildirimi", href: "/client-portal" }
    ]
  },
  {
    title: "Bilgi Merkezi",
    links: [
      { label: "Sigorta Rehberi", href: "/knowledge-center" },
      { label: "SSS", href: "/knowledge-center" },
      { label: "Blog", href: "/knowledge-center" },
      { label: "Sağlık İpuçları", href: "/knowledge-center" }
    ]
  },
  {
    title: "Kurumsal",
    links: [
      { label: "Hakkımızda", href: "/homepage" },
      { label: "İletişim", href: "/contact" },
      { label: "Kariyer", href: "/homepage" },
      { label: "Basın", href: "/homepage" }
    ]
  }
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-text-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Link href="/homepage" className="flex items-center space-x-3 mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-lg">
                <Icon name="ShieldCheckIcon" size={28} className="text-primary-foreground" variant="solid" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold leading-tight">TSS</span>
                <span className="text-sm text-primary-foreground/70 leading-tight">Sigorta Portalı</span>
              </div>
            </Link>
            <p className="text-primary-foreground/80 mb-6 leading-relaxed">
              Türkiye'nin en güvenilir tamamlayıcı sağlık sigortası platformu. Ailenizin sağlığını ve mali güvenliğini koruyoruz.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="flex items-center justify-center w-10 h-10 bg-primary-foreground/10 rounded-lg hover:bg-primary-foreground/20 transition-colors duration-base"
                aria-label="Facebook"
              >
                <Icon name="ShareIcon" size={20} className="text-primary-foreground" />
              </a>
              <a
                href="#"
                className="flex items-center justify-center w-10 h-10 bg-primary-foreground/10 rounded-lg hover:bg-primary-foreground/20 transition-colors duration-base"
                aria-label="Twitter"
              >
                <Icon name="ShareIcon" size={20} className="text-primary-foreground" />
              </a>
              <a
                href="#"
                className="flex items-center justify-center w-10 h-10 bg-primary-foreground/10 rounded-lg hover:bg-primary-foreground/20 transition-colors duration-base"
                aria-label="LinkedIn"
              >
                <Icon name="ShareIcon" size={20} className="text-primary-foreground" />
              </a>
              <a
                href="#"
                className="flex items-center justify-center w-10 h-10 bg-primary-foreground/10 rounded-lg hover:bg-primary-foreground/20 transition-colors duration-base"
                aria-label="Instagram"
              >
                <Icon name="ShareIcon" size={20} className="text-primary-foreground" />
              </a>
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-base"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Icon name="PhoneIcon" size={20} className="text-healthcare-green" />
                <a href="tel:+908501234567" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  0850 123 45 67
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="EnvelopeIcon" size={20} className="text-healthcare-green" />
                <a href="mailto:info@tsssigorta.com.tr" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  info@tsssigorta.com.tr
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <Icon name="MapPinIcon" size={20} className="text-healthcare-green flex-shrink-0 mt-1" />
                <span className="text-primary-foreground/80">
                  Atatürk Bulvarı No:123, Çankaya, Ankara
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 md:justify-end">
              <div className="flex items-center space-x-2 px-4 py-2 bg-primary-foreground/10 rounded-lg">
                <Icon name="CheckBadgeIcon" size={20} className="text-success" variant="solid" />
                <span className="text-sm text-primary-foreground/80">TSE Belgeli</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-primary-foreground/10 rounded-lg">
                <Icon name="ShieldCheckIcon" size={20} className="text-success" variant="solid" />
                <span className="text-sm text-primary-foreground/80">ISO 9001</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-primary-foreground/10 rounded-lg">
                <Icon name="LockClosedIcon" size={20} className="text-success" variant="solid" />
                <span className="text-sm text-primary-foreground/80">KVKK Uyumlu</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-primary-foreground/60">
              &copy; {currentYear} TSS Sigorta Portalı. Tüm hakları saklıdır.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link href="/homepage" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                Gizlilik Politikası
              </Link>
              <Link href="/homepage" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                Kullanım Koşulları
              </Link>
              <Link href="/homepage" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                Çerez Politikası
              </Link>
              <Link href="/homepage" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                KVKK
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface Product {
  id: number;
  name: string;
  description: string;
  icon: string;
  features: string[];
  startingPrice: string;
  popular?: boolean;
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Temel Sağlık Paketi",
    description: "Günlük sağlık ihtiyaçlarınız için kapsamlı koruma",
    icon: "HeartIcon",
    features: [
      "Yıllık 50.000 TL teminat",
      "Özel hastane ağı erişimi",
      "7/24 sağlık danışma hattı",
      "Acil durum kapsamı"
    ],
    startingPrice: "₺450,00"
  },
  {
    id: 2,
    name: "Aile Sağlık Paketi",
    description: "Tüm aile bireyleriniz için özel tasarlanmış kapsam",
    icon: "UserGroupIcon",
    features: [
      "Yıllık 100.000 TL teminat",
      "4 kişiye kadar aile üyesi",
      "Çocuk aşı ve kontrol kapsamı",
      "Diş tedavisi desteği"
    ],
    startingPrice: "₺1.200,00",
    popular: true
  },
  {
    id: 3,
    name: "Premium Sağlık Paketi",
    description: "Sınırsız sağlık hizmetleri ve VIP ayrıcalıklar",
    icon: "SparklesIcon",
    features: [
      "Yıllık 250.000 TL teminat",
      "Tüm özel hastaneler",
      "Yurtdışı tedavi desteği",
      "Check-up ve önleyici bakım"
    ],
    startingPrice: "₺2.500,00"
  }
];

const FeaturedProducts = () => {
  return (
    <section className="py-16 lg:py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-light rounded-full mb-4">
            <Icon name="ShieldCheckIcon" size={18} className="text-primary" variant="solid" />
            <span className="text-sm font-medium text-primary">Sigorta Ürünlerimiz</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Size Özel Tasarlanmış Sağlık Paketleri
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            İhtiyaçlarınıza uygun kapsamlı sağlık sigortası çözümleri ile ailenizin geleceğini güvence altına alın
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockProducts.map((product) => (
            <div
              key={product.id}
              className={`relative bg-card rounded-2xl shadow-medical hover:shadow-medical-hover transition-all duration-base p-8 ${
                product.popular ? 'ring-2 ring-healthcare-green' : ''
              }`}
            >
              {product.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center space-x-1 px-4 py-1.5 bg-healthcare-green text-healthcare-green-foreground text-sm font-semibold rounded-full shadow-lg">
                    <Icon name="StarIcon" size={16} variant="solid" />
                    <span>En Popüler</span>
                  </span>
                </div>
              )}

              <div className="flex items-center justify-center w-16 h-16 bg-primary-light rounded-2xl mb-6">
                <Icon name={product.icon as any} size={32} className="text-primary" variant="solid" />
              </div>

              <h3 className="text-2xl font-bold text-text-primary mb-3">{product.name}</h3>
              <p className="text-text-secondary mb-6">{product.description}</p>

              <div className="space-y-3 mb-8">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Icon name="CheckCircleIcon" size={20} className="text-success flex-shrink-0 mt-0.5" variant="solid" />
                    <span className="text-sm text-text-primary">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-6">
                <div className="flex items-baseline justify-between mb-4">
                  <div>
                    <p className="text-sm text-text-secondary mb-1">Başlangıç fiyatı</p>
                    <p className="text-3xl font-bold text-text-primary">{product.startingPrice}</p>
                    <p className="text-sm text-text-secondary">/ay</p>
                  </div>
                </div>
                <Link
                  href="/quote-calculator"
                  className="flex items-center justify-center space-x-2 w-full px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary-hover transition-all duration-base"
                >
                  <span>Teklif Al</span>
                  <Icon name="ArrowRightIcon" size={18} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/insurance-products"
            className="inline-flex items-center space-x-2 text-primary font-semibold hover:text-primary-hover transition-colors duration-base"
          >
            <span>Tüm Ürünleri Görüntüle</span>
            <Icon name="ArrowRightIcon" size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
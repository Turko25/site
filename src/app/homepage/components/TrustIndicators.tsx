import Icon from '@/components/ui/AppIcon';

interface TrustMetric {
  id: number;
  icon: string;
  value: string;
  label: string;
  description: string;
}

const mockMetrics: TrustMetric[] = [
  {
    id: 1,
    icon: "UserGroupIcon",
    value: "10.000+",
    label: "Mutlu Müşteri",
    description: "Türkiye genelinde güvenle hizmet veriyoruz"
  },
  {
    id: 2,
    icon: "StarIcon",
    value: "4.9/5",
    label: "Müşteri Memnuniyeti",
    description: "Yüksek kalite standartlarımızla gurur duyuyoruz"
  },
  {
    id: 3,
    icon: "ClockIcon",
    value: "24 Saat",
    label: "Hızlı Onay Süresi",
    description: "Başvurunuz en kısa sürede değerlendirilir"
  },
  {
    id: 4,
    icon: "ShieldCheckIcon",
    value: "15 Yıl",
    label: "Sektör Deneyimi",
    description: "Uzman kadromuzla güvenilir hizmet"
  }
];

interface Certification {
  id: number;
  name: string;
  icon: string;
  description: string;
}

const mockCertifications: Certification[] = [
  {
    id: 1,
    name: "TSE Belgeli",
    icon: "CheckBadgeIcon",
    description: "Türk Standardları Enstitüsü onaylı"
  },
  {
    id: 2,
    name: "ISO 9001",
    icon: "ShieldCheckIcon",
    description: "Kalite yönetim sistemi sertifikası"
  },
  {
    id: 3,
    name: "KVKK Uyumlu",
    icon: "LockClosedIcon",
    description: "Kişisel verilerin korunması"
  },
  {
    id: 4,
    name: "Sigorta Müşavirliği",
    icon: "DocumentCheckIcon",
    description: "T.C. Hazine ve Maliye Bakanlığı lisanslı"
  }
];

const TrustIndicators = () => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-success/10 rounded-full mb-4">
            <Icon name="CheckBadgeIcon" size={18} className="text-success" variant="solid" />
            <span className="text-sm font-medium text-success">Güvenilir Platform</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Neden TSS Sigorta Portalı?
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Sektördeki deneyimimiz ve müşteri odaklı yaklaşımımızla Türkiye'nin en güvenilir sigorta platformuyuz
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {mockMetrics.map((metric) => (
            <div
              key={metric.id}
              className="bg-card rounded-xl shadow-medical p-6 text-center hover:shadow-medical-hover transition-all duration-base"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-primary-light rounded-full mx-auto mb-4">
                <Icon name={metric.icon as any} size={32} className="text-primary" variant="solid" />
              </div>
              <p className="text-4xl font-bold text-text-primary mb-2">{metric.value}</p>
              <p className="text-lg font-semibold text-text-primary mb-2">{metric.label}</p>
              <p className="text-sm text-text-secondary">{metric.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-primary/5 to-healthcare-green/5 rounded-3xl p-8 lg:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl lg:text-3xl font-bold text-text-primary mb-3">
              Sertifikalar ve Akreditasyonlar
            </h3>
            <p className="text-text-secondary">
              Kalite ve güvenilirlik standartlarımız resmi kurumlar tarafından onaylanmıştır
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockCertifications.map((cert) => (
              <div
                key={cert.id}
                className="bg-card rounded-xl p-6 text-center hover:shadow-medical transition-all duration-base"
              >
                <div className="flex items-center justify-center w-14 h-14 bg-success/10 rounded-full mx-auto mb-4">
                  <Icon name={cert.icon as any} size={28} className="text-success" variant="solid" />
                </div>
                <p className="text-lg font-semibold text-text-primary mb-2">{cert.name}</p>
                <p className="text-sm text-text-secondary">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;
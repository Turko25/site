'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <section className={`relative bg-gradient-to-br from-primary/5 via-healthcare-green/5 to-background py-20 lg:py-32 ${className}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-light rounded-full">
                <Icon name="ShieldCheckIcon" size={20} className="text-primary" variant="solid" />
                <span className="text-sm font-medium text-primary">Türkiye'nin Güvenilir Sigorta Platformu</span>
              </div>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-text-primary leading-tight">
                Sağlığınız <span className="text-primary">Temel Kapsamdan</span> Daha Fazlasını Hak Ediyor
              </h1>
              <p className="text-lg lg:text-xl text-text-secondary leading-relaxed">
                Tamamlayıcı sağlık sigortası ile ailenizin sağlığını ve mali güvenliğini koruyun. Uzman rehberliğinde doğru poliçeyi bulun.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/quote-calculator"
                  className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-healthcare-green text-healthcare-green-foreground font-semibold rounded-lg hover:bg-opacity-90 shadow-medical hover:shadow-medical-hover transition-all duration-base pulse-rhythm"
                >
                  <Icon name="CalculatorIcon" size={20} variant="solid" />
                  <span>Hemen Teklif Al</span>
                </Link>
                <Link
                  href="/insurance-products"
                  className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-background text-primary font-semibold border-2 border-primary rounded-lg hover:bg-primary-light transition-all duration-base"
                >
                  <Icon name="DocumentTextIcon" size={20} />
                  <span>Ürünleri İncele</span>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-healthcare-green/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-card rounded-3xl shadow-medical p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-text-primary">Hızlı Prim Hesaplama</h3>
                  <Icon name="SparklesIcon" size={24} className="text-healthcare-green" variant="solid" />
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-surface rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-text-secondary">Yaş Aralığı</span>
                      <span className="text-sm font-medium text-text-primary">30-40</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-1/3 bg-primary rounded-full"></div>
                    </div>
                  </div>
                  <div className="p-4 bg-surface rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-text-secondary">Kapsam Seviyesi</span>
                      <span className="text-sm font-medium text-text-primary">Kapsamlı</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-2/3 bg-healthcare-green rounded-full"></div>
                    </div>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-primary to-healthcare-blue rounded-xl text-center">
                    <p className="text-sm text-primary-foreground/80 mb-1">Tahmini Aylık Prim</p>
                    <p className="text-3xl font-bold text-primary-foreground">₺850,00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`relative bg-gradient-to-br from-primary/5 via-healthcare-green/5 to-background py-20 lg:py-32 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-light rounded-full">
              <Icon name="ShieldCheckIcon" size={20} className="text-primary" variant="solid" />
              <span className="text-sm font-medium text-primary">Türkiye'nin Güvenilir Sigorta Platformu</span>
            </div>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-text-primary leading-tight">
              Sağlığınız <span className="text-primary">Temel Kapsamdan</span> Daha Fazlasını Hak Ediyor
            </h1>
            <p className="text-lg lg:text-xl text-text-secondary leading-relaxed">
              Tamamlayıcı sağlık sigortası ile ailenizin sağlığını ve mali güvenliğini koruyun. Uzman rehberliğinde doğru poliçeyi bulun.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/quote-calculator"
                className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-healthcare-green text-healthcare-green-foreground font-semibold rounded-lg hover:bg-opacity-90 shadow-medical hover:shadow-medical-hover transition-all duration-base pulse-rhythm"
              >
                <Icon name="CalculatorIcon" size={20} variant="solid" />
                <span>Hemen Teklif Al</span>
              </Link>
              <Link
                href="/insurance-products"
                className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-background text-primary font-semibold border-2 border-primary rounded-lg hover:bg-primary-light transition-all duration-base"
              >
                <Icon name="DocumentTextIcon" size={20} />
                <span>Ürünleri İncele</span>
              </Link>
            </div>
            <div className="flex items-center space-x-8 pt-4">
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircleIcon" size={20} className="text-success" variant="solid" />
                <span className="text-sm text-text-secondary">10.000+ Mutlu Müşteri</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="StarIcon" size={20} className="text-warning" variant="solid" />
                <span className="text-sm text-text-secondary">4.9/5 Müşteri Memnuniyeti</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-healthcare-green/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-card rounded-3xl shadow-medical p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-text-primary">Hızlı Prim Hesaplama</h3>
                <Icon name="SparklesIcon" size={24} className="text-healthcare-green" variant="solid" />
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-surface rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-text-secondary">Yaş Aralığı</span>
                    <span className="text-sm font-medium text-text-primary">30-40</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-1/3 bg-primary rounded-full"></div>
                  </div>
                </div>
                <div className="p-4 bg-surface rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-text-secondary">Kapsam Seviyesi</span>
                    <span className="text-sm font-medium text-text-primary">Kapsamlı</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-healthcare-green rounded-full"></div>
                  </div>
                </div>
                <div className="p-6 bg-gradient-to-br from-primary to-healthcare-blue rounded-xl text-center">
                  <p className="text-sm text-primary-foreground/80 mb-1">Tahmini Aylık Prim</p>
                  <p className="text-3xl font-bold text-primary-foreground">₺850,00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
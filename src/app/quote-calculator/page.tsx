import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import QuoteCalculatorInteractive from './components/QuoteCalculatorInteractive';
import Icon from '@/components/ui/AppIcon';

export const metadata: Metadata = {
  title: 'Teklif Hesaplayıcı - TSS Sigorta Portalı',
  description: 'Tamamlayıcı sağlık sigortası için anında teklif alın. Kişiselleştirilmiş teminat seçenekleri, gerçek zamanlı fiyatlandırma ve kolay başvuru süreci ile ihtiyacınıza uygun sigortayı bulun.',
};

export default function QuoteCalculatorPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <section className="bg-primary text-primary-foreground py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-foreground bg-opacity-20 rounded-full mb-4">
                <Icon name="CalculatorIcon" size={32} className="text-primary-foreground" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Teklif Hesaplayıcı
              </h1>
              <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
                Sadece birkaç adımda size özel tamamlayıcı sağlık sigortası teklifinizi alın. Hızlı, kolay ve ücretsiz.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <QuoteCalculatorInteractive />
        </section>

        <section className="bg-surface py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-text-primary text-center mb-12">
                Teklif Alma Süreci
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                  {
                    icon: 'DocumentTextIcon',
                    title: 'Bilgilerinizi Girin',
                    description: 'Kişisel bilgilerinizi ve ihtiyaçlarınızı paylaşın',
                  },
                  {
                    icon: 'ShieldCheckIcon',
                    title: 'Teminat Seçin',
                    description: 'Size uygun teminat paketlerini seçin',
                  },
                  {
                    icon: 'CalculatorIcon',
                    title: 'Fiyat Görün',
                    description: 'Anında hesaplanan priminizi inceleyin',
                  },
                  {
                    icon: 'CheckBadgeIcon',
                    title: 'Başvurun',
                    description: 'Online başvurunuzu tamamlayın',
                  },
                ].map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-light rounded-full mb-4">
                      <Icon name={step.icon as any} size={32} className="text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-text-secondary">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-healthcare-green text-healthcare-green-foreground py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Sorularınız mı var?
              </h2>
              <p className="text-lg opacity-90 mb-8">
                Uzman ekibimiz size yardımcı olmak için hazır. Hemen iletişime geçin.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-healthcare-green-foreground text-healthcare-green font-semibold rounded-lg hover:bg-opacity-90 transition-all duration-base shadow-lg"
                >
                  <Icon name="PhoneIcon" size={24} />
                  <span>Bizi Arayın</span>
                </a>
                <a
                  href="/knowledge-center"
                  className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-transparent border-2 border-healthcare-green-foreground text-healthcare-green-foreground font-semibold rounded-lg hover:bg-healthcare-green-foreground hover:text-healthcare-green transition-all duration-base"
                >
                  <Icon name="BookOpenIcon" size={24} />
                  <span>SSS'leri İnceleyin</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <footer className="bg-text-primary text-background py-8">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <p className="text-sm opacity-80">
                © {new Date().getFullYear()} TSS Sigorta Portalı. Tüm hakları saklıdır.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
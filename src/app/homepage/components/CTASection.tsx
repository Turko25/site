import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const CTASection = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary to-healthcare-blue">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-foreground/10 rounded-full mb-6">
            <Icon name="SparklesIcon" size={18} className="text-primary-foreground" variant="solid" />
            <span className="text-sm font-medium text-primary-foreground">Hemen Başlayın</span>
          </div>

          <h2 className="text-3xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Ailenizin Sağlığını Güvence Altına Alın
          </h2>

          <p className="text-lg lg:text-xl text-primary-foreground/90 mb-8 leading-relaxed">
            Uzman danışmanlarımızla ücretsiz görüşme yapın ve size en uygun tamamlayıcı sağlık sigortası paketini bulun. Sadece birkaç dakika içinde teklif alabilirsiniz.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link
              href="/quote-calculator"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-healthcare-green text-healthcare-green-foreground font-semibold rounded-lg hover:bg-opacity-90 shadow-lg hover:shadow-xl transition-all duration-base pulse-rhythm"
            >
              <Icon name="CalculatorIcon" size={20} variant="solid" />
              <span>Ücretsiz Teklif Al</span>
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-primary-foreground text-primary font-semibold rounded-lg hover:bg-opacity-90 shadow-lg hover:shadow-xl transition-all duration-base"
            >
              <Icon name="PhoneIcon" size={20} />
              <span>Danışman ile Görüş</span>
            </Link>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-center space-x-2 text-primary-foreground/90">
              <Icon name="CheckCircleIcon" size={20} variant="solid" />
              <span className="text-sm font-medium">Ücretsiz Danışmanlık</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-primary-foreground/90">
              <Icon name="ClockIcon" size={20} variant="solid" />
              <span className="text-sm font-medium">24 Saat İçinde Onay</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-primary-foreground/90">
              <Icon name="ShieldCheckIcon" size={20} variant="solid" />
              <span className="text-sm font-medium">Güvenli İşlem</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
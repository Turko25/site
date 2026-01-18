import Icon from '@/components/ui/AppIcon';

interface ContactHeroProps {
  className?: string;
}

const ContactHero = ({ className = '' }: ContactHeroProps) => {
  return (
    <section className={`relative bg-gradient-to-br from-primary/5 via-healthcare-green/5 to-background py-16 lg:py-24 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6">
            <Icon name="ChatBubbleLeftRightIcon" size={32} className="text-primary" variant="solid" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-text-primary mb-6">
            Size Nasıl Yardımcı Olabiliriz?
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Uzman ekibimiz, sağlık sigortası ihtiyaçlarınız konusunda size rehberlik etmeye hazır. İletişim kanallarımızdan birini seçin ve hemen destek alın.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
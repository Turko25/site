import Icon from '@/components/ui/AppIcon';

interface EmergencyContactProps {
  className?: string;
}

const EmergencyContact = ({ className = '' }: EmergencyContactProps) => {
  return (
    <section className={`py-12 lg:py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="bg-gradient-to-br from-accent/10 via-accent/5 to-background border-2 border-accent/20 rounded-2xl p-8 lg:p-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-2xl mb-4">
                <Icon name="ExclamationTriangleIcon" size={32} className="text-accent" variant="solid" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                Acil Durum Desteği
              </h2>
              <p className="text-lg text-text-secondary mb-6">
                Acil sağlık sigortası ihtiyaçlarınız için 7/24 destek hattımız hizmetinizde. Hasar bildirimi, acil onay talepleri ve kritik durumlar için hemen arayın.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a
                  href="tel:+908501234567"
                  className="inline-flex items-center px-8 py-4 bg-accent text-accent-foreground font-semibold text-lg rounded-lg hover:bg-accent-hover shadow-lg hover:shadow-xl transition-all duration-base"
                >
                  <Icon name="PhoneIcon" size={24} className="mr-3" variant="solid" />
                  0850 123 45 67
                </a>
                <div className="flex items-center text-sm text-text-secondary">
                  <Icon name="ClockIcon" size={18} className="mr-2 text-accent" />
                  7/24 Hizmet
                </div>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="w-48 h-48 bg-accent/5 rounded-full flex items-center justify-center">
                <Icon name="ShieldCheckIcon" size={96} className="text-accent/30" variant="solid" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmergencyContact;
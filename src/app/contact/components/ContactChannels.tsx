import Icon from '@/components/ui/AppIcon';

interface ContactChannel {
  id: string;
  icon: string;
  title: string;
  description: string;
  action: string;
  value: string;
  availability: string;
  color: string;
}

interface ContactChannelsProps {
  channels: ContactChannel[];
  className?: string;
}

const ContactChannels = ({ channels, className = '' }: ContactChannelsProps) => {
  return (
    <section className={`py-12 lg:py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            İletişim Kanallarımız
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Size en uygun iletişim yöntemini seçin ve uzman danışmanlarımızla hemen bağlantı kurun
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {channels.map((channel) => (
            <div
              key={channel.id}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-medical transition-all duration-base group"
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4 ${channel.color} group-hover:scale-110 transition-transform duration-base`}>
                <Icon name={channel.icon as any} size={28} className="text-white" variant="solid" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                {channel.title}
              </h3>
              <p className="text-sm text-text-secondary mb-4">
                {channel.description}
              </p>
              <div className="space-y-2 mb-4">
                <p className="text-base font-medium text-text-primary">
                  {channel.value}
                </p>
                <p className="text-xs text-text-tertiary flex items-center">
                  <Icon name="ClockIcon" size={14} className="mr-1" />
                  {channel.availability}
                </p>
              </div>
              <button className="w-full py-2.5 bg-primary/10 text-primary font-medium text-sm rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-base">
                {channel.action}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactChannels;
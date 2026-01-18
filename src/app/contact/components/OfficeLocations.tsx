import Icon from '@/components/ui/AppIcon';

interface Office {
  id: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  workingHours: string;
  mapUrl: string;
  lat: number;
  lng: number;
}

interface OfficeLocationsProps {
  offices: Office[];
  className?: string;
}

const OfficeLocations = ({ offices, className = '' }: OfficeLocationsProps) => {
  return (
    <section className={`py-12 lg:py-16 bg-surface ${className}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Ofis Lokasyonlarımız
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            İstanbul ve Ankara'daki ofislerimizden yüz yüze destek alabilirsiniz
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {offices.map((office) => (
            <div
              key={office.id}
              className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-medical transition-all duration-base"
            >
              <div className="h-64 w-full relative overflow-hidden bg-muted">
                <iframe
                  width="100%"
                  height="100%"
                  loading="lazy"
                  title={`${office.city} Ofis Konumu`}
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${office.lat},${office.lng}&z=14&output=embed`}
                  className="border-0"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-text-primary mb-4 flex items-center">
                  <Icon name="MapPinIcon" size={24} className="text-primary mr-2" variant="solid" />
                  {office.city} Ofisi
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Icon name="BuildingOfficeIcon" size={20} className="text-text-secondary mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-text-secondary">{office.address}</p>
                  </div>
                  <div className="flex items-center">
                    <Icon name="PhoneIcon" size={20} className="text-text-secondary mr-3 flex-shrink-0" />
                    <a href={`tel:${office.phone}`} className="text-sm text-primary hover:underline">
                      {office.phone}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Icon name="EnvelopeIcon" size={20} className="text-text-secondary mr-3 flex-shrink-0" />
                    <a href={`mailto:${office.email}`} className="text-sm text-primary hover:underline">
                      {office.email}
                    </a>
                  </div>
                  <div className="flex items-start">
                    <Icon name="ClockIcon" size={20} className="text-text-secondary mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-text-secondary">{office.workingHours}</p>
                  </div>
                </div>
                <a
                  href={office.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 w-full inline-flex items-center justify-center py-2.5 bg-primary text-primary-foreground font-medium text-sm rounded-lg hover:bg-primary-hover transition-all duration-base"
                >
                  <Icon name="MapIcon" size={18} className="mr-2" />
                  Yol Tarifi Al
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfficeLocations;
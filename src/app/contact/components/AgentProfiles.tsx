'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface Agent {
  id: string;
  name: string;
  title: string;
  expertise: string[];
  image: string;
  alt: string;
  phone: string;
  email: string;
  languages: string[];
  experience: string;
  rating: number;
  reviewCount: number;
}

interface AgentProfilesProps {
  agents: Agent[];
  className?: string;
}

const AgentProfiles = ({ agents, className = '' }: AgentProfilesProps) => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  return (
    <section className={`py-12 lg:py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Uzman Danışman Ekibimiz
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Sertifikalı sigorta uzmanlarımız, size en uygun sağlık sigortası çözümünü bulmak için burada
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-medical transition-all duration-base group"
            >
              <div className="relative h-64 w-full overflow-hidden bg-muted">
                <AppImage
                  src={agent.image}
                  alt={agent.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-base"
                />
                <div className="absolute top-4 right-4 bg-card/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center space-x-1">
                  <Icon name="StarIcon" size={16} className="text-warning" variant="solid" />
                  <span className="text-sm font-semibold text-text-primary">{agent.rating}</span>
                  <span className="text-xs text-text-secondary">({agent.reviewCount})</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-text-primary mb-1">
                  {agent.name}
                </h3>
                <p className="text-sm text-text-secondary mb-3">{agent.title}</p>
                <div className="flex items-center text-xs text-text-tertiary mb-4">
                  <Icon name="BriefcaseIcon" size={14} className="mr-1" />
                  {agent.experience}
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {agent.expertise.slice(0, 2).map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                  {agent.expertise.length > 2 && (
                    <span className="px-3 py-1 bg-muted text-text-secondary text-xs font-medium rounded-full">
                      +{agent.expertise.length - 2}
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2 mb-4">
                  {agent.languages.map((lang, index) => (
                    <span key={index} className="text-xs text-text-tertiary">
                      {lang}{index < agent.languages.length - 1 ? ',' : ''}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => setSelectedAgent(agent)}
                  className="w-full py-2.5 bg-healthcare-green text-healthcare-green-foreground font-medium text-sm rounded-lg hover:bg-opacity-90 transition-all duration-base flex items-center justify-center"
                >
                  <Icon name="CalendarIcon" size={18} className="mr-2" />
                  Randevu Al
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedAgent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-text-primary">
                {selectedAgent.name} ile Randevu
              </h3>
              <button
                onClick={() => setSelectedAgent(null)}
                className="p-2 hover:bg-muted rounded-lg transition-colors duration-base"
              >
                <Icon name="XMarkIcon" size={24} className="text-text-secondary" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-start space-x-4 mb-6">
                <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                  <AppImage
                    src={selectedAgent.image}
                    alt={selectedAgent.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-text-primary">{selectedAgent.name}</h4>
                  <p className="text-sm text-text-secondary mb-2">{selectedAgent.title}</p>
                  <div className="flex items-center space-x-3 text-sm">
                    <a href={`tel:${selectedAgent.phone}`} className="text-primary hover:underline flex items-center">
                      <Icon name="PhoneIcon" size={14} className="mr-1" />
                      {selectedAgent.phone}
                    </a>
                    <a href={`mailto:${selectedAgent.email}`} className="text-primary hover:underline flex items-center">
                      <Icon name="EnvelopeIcon" size={14} className="mr-1" />
                      E-posta
                    </a>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Adınız Soyadınız
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-base"
                    placeholder="Adınızı ve soyadınızı girin"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Telefon Numaranız
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2.5 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-base"
                    placeholder="0555 123 45 67"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    E-posta Adresiniz
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2.5 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-base"
                    placeholder="ornek@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Tercih Ettiğiniz Tarih
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2.5 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Mesajınız (Opsiyonel)
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2.5 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-base resize-none"
                    placeholder="Görüşmek istediğiniz konuları belirtebilirsiniz..."
                  />
                </div>
                <button className="w-full py-3 bg-healthcare-green text-healthcare-green-foreground font-semibold rounded-lg hover:bg-opacity-90 transition-all duration-base">
                  Randevu Talebi Gönder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AgentProfiles;
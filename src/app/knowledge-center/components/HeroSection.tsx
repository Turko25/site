import Icon from '@/components/ui/AppIcon';

interface HeroSectionProps {
  onSearchChange: (query: string) => void;
  searchQuery: string;
}

export default function HeroSection({ onSearchChange, searchQuery }: HeroSectionProps) {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-healthcare-green/5 to-background py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6">
            <Icon name="BookOpenIcon" size={32} className="text-primary" variant="solid" />
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold text-text-primary mb-6">
            Bilgi Merkezi
          </h1>
          
          <p className="text-lg text-text-secondary mb-8 leading-relaxed">
            Sağlık sigortası hakkında bilmeniz gereken her şey. Kapsamlı rehberler, uzman analizleri ve güncel düzenlemelerle sigorta kararlarınızı bilinçli bir şekilde verin.
          </p>
          
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Icon name="MagnifyingGlassIcon" size={20} className="text-text-tertiary" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Sigorta rehberleri, sağlık ipuçları veya düzenlemeler arayın..."
              className="w-full pl-12 pr-4 py-4 bg-background border-2 border-border rounded-xl text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-base"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
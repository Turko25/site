import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface HealthTipCardProps {
  tip: {
    id: string;
    title: string;
    excerpt: string;
    image: string;
    alt: string;
    category: string;
    readTime: string;
  };
  onRead: (id: string) => void;
}

export default function HealthTipCard({ tip, onRead }: HealthTipCardProps) {
  return (
    <div className="medical-card overflow-hidden hover:shadow-medical-hover transition-shadow duration-base">
      <div className="h-40 overflow-hidden bg-surface">
        <AppImage
          src={tip.image}
          alt={tip.alt}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-slow"
        />
      </div>
      <div className="p-5">
        <div className="flex items-center space-x-2 mb-3">
          <span className="px-2 py-1 bg-healthcare-green/10 text-healthcare-green text-xs font-medium rounded">
            {tip.category}
          </span>
          <div className="flex items-center space-x-1 text-text-secondary">
            <Icon name="ClockIcon" size={14} />
            <span className="text-xs">{tip.readTime}</span>
          </div>
        </div>
        <h4 className="text-base font-semibold text-text-primary mb-2 line-clamp-2">
          {tip.title}
        </h4>
        <p className="text-sm text-text-secondary mb-4 line-clamp-2">
          {tip.excerpt}
        </p>
        <button
          onClick={() => onRead(tip.id)}
          className="flex items-center space-x-2 text-sm font-medium text-primary hover:text-primary-hover transition-colors duration-base"
        >
          <span>Devamını Oku</span>
          <Icon name="ArrowRightIcon" size={16} />
        </button>
      </div>
    </div>
  );
}
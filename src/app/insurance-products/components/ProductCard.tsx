'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface ProductFeature {
  name: string;
  included: boolean;
}

interface ProductCardProps {
  id: string;
  name: string;
  category: string;
  monthlyPremium: number;
  annualPremium: number;
  coverageLimit: string;
  image: string;
  alt: string;
  features: ProductFeature[];
  popularityScore: number;
  isRecommended?: boolean;
}

export default function ProductCard({ 
  id, 
  name, 
  category, 
  monthlyPremium, 
  annualPremium, 
  coverageLimit, 
  image, 
  alt, 
  features, 
  popularityScore,
  isRecommended = false 
}: ProductCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isComparing, setIsComparing] = useState(false);

  const handleCompareToggle = () => {
    setIsComparing(!isComparing);
  };

  return (
    <div className={`medical-card p-6 hover:scale-[1.02] transition-all duration-base ${isRecommended ? 'ring-2 ring-healthcare-green' : ''}`}>
      {isRecommended && (
        <div className="absolute -top-3 left-6 bg-healthcare-green text-healthcare-green-foreground px-4 py-1 rounded-full text-xs font-semibold shadow-md">
          Uzman Önerisi
        </div>
      )}
      
      <div className="relative h-48 rounded-lg overflow-hidden mb-4">
        <AppImage 
          src={image} 
          alt={alt}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-text-primary">
          {category}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-text-primary mb-2">{name}</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-primary">{monthlyPremium.toLocaleString('tr-TR')} ₺</span>
            <span className="text-sm text-text-secondary">/ay</span>
          </div>
          <p className="text-xs text-text-tertiary mt-1">
            Yıllık: {annualPremium.toLocaleString('tr-TR')} ₺
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <Icon name="ShieldCheckIcon" size={18} className="text-healthcare-green" variant="solid" />
          <span>Teminat Limiti: {coverageLimit}</span>
        </div>

        <div className="space-y-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-between w-full text-sm font-medium text-primary hover:text-primary-hover transition-colors duration-base"
          >
            <span>Teminat Detayları</span>
            <Icon 
              name="ChevronDownIcon" 
              size={16} 
              className={`transition-transform duration-base ${isExpanded ? 'rotate-180' : ''}`}
            />
          </button>

          {isExpanded && (
            <div className="space-y-2 pt-2 border-t border-border">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2 text-sm">
                  <Icon 
                    name={feature.included ? "CheckCircleIcon" : "XCircleIcon"} 
                    size={16} 
                    className={feature.included ? "text-success mt-0.5" : "text-text-tertiary mt-0.5"}
                    variant="solid"
                  />
                  <span className={feature.included ? "text-text-primary" : "text-text-tertiary line-through"}>
                    {feature.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 pt-4 border-t border-border">
          <div className="flex-1 flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Icon
                key={i}
                name="StarIcon"
                size={14}
                variant={i < Math.floor(popularityScore) ? "solid" : "outline"}
                className={i < Math.floor(popularityScore) ? "text-warning" : "text-text-tertiary"}
              />
            ))}
            <span className="text-xs text-text-secondary ml-1">({popularityScore.toFixed(1)})</span>
          </div>
          
          <button
            onClick={handleCompareToggle}
            className={`p-2 rounded-lg transition-all duration-base ${
              isComparing 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-text-secondary hover:bg-primary-light'
            }`}
            title="Karşılaştırmaya Ekle"
          >
            <Icon name="ScaleIcon" size={18} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <Link
            href={`/quote-calculator?product=${id}`}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-healthcare-green text-healthcare-green-foreground font-medium text-sm rounded-lg hover:bg-opacity-90 shadow-sm hover:shadow-md transition-all duration-base"
          >
            <Icon name="CalculatorIcon" size={16} />
            <span>Teklif Al</span>
          </Link>
          
          <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-muted text-text-primary font-medium text-sm rounded-lg hover:bg-primary-light transition-all duration-base">
            <Icon name="InformationCircleIcon" size={16} />
            <span>Detaylar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
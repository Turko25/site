'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface ComparisonProduct {
  id: string;
  name: string;
  category: string;
  monthlyPremium: number;
  coverageLimit: string;
  image: string;
  alt: string;
  features: {
    name: string;
    included: boolean;
  }[];
}

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: ComparisonProduct[];
}

export default function ComparisonModal({ isOpen, onClose, products }: ComparisonModalProps) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isHydrated]);

  if (!isHydrated || !isOpen) return null;

  const allFeatures = Array.from(
    new Set(products.flatMap(p => p.features.map(f => f.name)))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-text-primary/50 backdrop-blur-sm">
      <div className="bg-background rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-2xl font-semibold text-text-primary">Ürün Karşılaştırma</h2>
            <p className="text-sm text-text-secondary mt-1">{products.length} ürün karşılaştırılıyor</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors duration-base"
          >
            <Icon name="XMarkIcon" size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <div key={product.id} className="medical-card p-6 space-y-4">
                <div className="relative h-40 rounded-lg overflow-hidden">
                  <AppImage 
                    src={product.image} 
                    alt={product.alt}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <div className="text-xs text-text-tertiary mb-1">{product.category}</div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">{product.name}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-primary">{product.monthlyPremium.toLocaleString('tr-TR')} ₺</span>
                    <span className="text-xs text-text-secondary">/ay</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-sm text-text-secondary">
                    <Icon name="ShieldCheckIcon" size={16} className="text-healthcare-green" variant="solid" />
                    <span>{product.coverageLimit}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-border">
                  {allFeatures.map(featureName => {
                    const feature = product.features.find(f => f.name === featureName);
                    const isIncluded = feature?.included ?? false;
                    
                    return (
                      <div key={featureName} className="flex items-start gap-2 text-sm">
                        <Icon 
                          name={isIncluded ? "CheckCircleIcon" : "XCircleIcon"} 
                          size={16} 
                          className={isIncluded ? "text-success mt-0.5" : "text-text-tertiary mt-0.5"}
                          variant="solid"
                        />
                        <span className={isIncluded ? "text-text-primary" : "text-text-tertiary line-through"}>
                          {featureName}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <button className="w-full px-4 py-2.5 bg-healthcare-green text-healthcare-green-foreground font-medium text-sm rounded-lg hover:bg-opacity-90 shadow-sm hover:shadow-md transition-all duration-base">
                  Teklif Al
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
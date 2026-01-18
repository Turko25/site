'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface FilterOption {
  id: string;
  label: string;
  count: number;
}

interface FilterSidebarProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  categories: string[];
  priceRange: [number, number];
  coverageAmount: string[];
  features: string[];
}

export default function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 5000],
    coverageAmount: [],
    features: []
  });

  const categories: FilterOption[] = [
    { id: 'comprehensive', label: 'Kapsamlı Sağlık', count: 12 },
    { id: 'basic', label: 'Temel Sağlık', count: 8 },
    { id: 'dental', label: 'Diş Sağlığı', count: 6 },
    { id: 'vision', label: 'Göz Sağlığı', count: 4 },
    { id: 'maternity', label: 'Doğum Teminatı', count: 5 }
  ];

  const coverageAmounts: FilterOption[] = [
    { id: '50k', label: '50.000 ₺\'ye kadar', count: 15 },
    { id: '100k', label: '100.000 ₺\'ye kadar', count: 10 },
    { id: '250k', label: '250.000 ₺\'ye kadar', count: 8 },
    { id: '500k', label: '500.000 ₺ ve üzeri', count: 5 }
  ];

  const features: FilterOption[] = [
    { id: 'checkup', label: 'Check-up Dahil', count: 18 },
    { id: 'ambulance', label: 'Ambulans Hizmeti', count: 22 },
    { id: 'homecare', label: 'Evde Bakım', count: 12 },
    { id: 'abroad', label: 'Yurtdışı Teminat', count: 9 },
    { id: 'chronic', label: 'Kronik Hastalık', count: 14 }
  ];

  const handleCategoryToggle = (categoryId: string) => {
    const newCategories = filters.categories.includes(categoryId)
      ? filters.categories.filter(c => c !== categoryId)
      : [...filters.categories, categoryId];
    
    const newFilters = { ...filters, categories: newCategories };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleCoverageToggle = (coverageId: string) => {
    const newCoverage = filters.coverageAmount.includes(coverageId)
      ? filters.coverageAmount.filter(c => c !== coverageId)
      : [...filters.coverageAmount, coverageId];
    
    const newFilters = { ...filters, coverageAmount: newCoverage };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleFeatureToggle = (featureId: string) => {
    const newFeatures = filters.features.includes(featureId)
      ? filters.features.filter(f => f !== featureId)
      : [...filters.features, featureId];
    
    const newFilters = { ...filters, features: newFeatures };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceChange = (index: 0 | 1, value: number) => {
    const newPriceRange: [number, number] = [...filters.priceRange] as [number, number];
    newPriceRange[index] = value;
    const newFilters = { ...filters, priceRange: newPriceRange };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    const resetFilters: FilterState = {
      categories: [],
      priceRange: [0, 5000],
      coverageAmount: [],
      features: []
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const activeFilterCount = 
    filters.categories.length + 
    filters.coverageAmount.length + 
    filters.features.length;

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-40 flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-base"
      >
        <Icon name="AdjustmentsHorizontalIcon" size={20} />
        <span>Filtreler</span>
        {activeFilterCount > 0 && (
          <span className="bg-healthcare-green text-healthcare-green-foreground px-2 py-0.5 rounded-full text-xs font-semibold">
            {activeFilterCount}
          </span>
        )}
      </button>

      <div className={`
        fixed lg:sticky top-0 left-0 h-screen lg:h-auto w-80 lg:w-full bg-background lg:bg-transparent
        z-50 lg:z-auto overflow-y-auto lg:overflow-visible
        transition-transform duration-base lg:transition-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="lg:hidden flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-text-primary">Filtreler</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-muted rounded-lg transition-colors duration-base"
          >
            <Icon name="XMarkIcon" size={24} />
          </button>
        </div>

        <div className="p-6 lg:p-0 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wide">Filtreler</h3>
            {activeFilterCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-primary hover:text-primary-hover font-medium transition-colors duration-base"
              >
                Temizle
              </button>
            )}
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium text-text-primary">Ürün Kategorisi</h4>
            <div className="space-y-2">
              {categories.map(category => (
                <label key={category.id} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category.id)}
                    onChange={() => handleCategoryToggle(category.id)}
                    className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  />
                  <span className="flex-1 text-sm text-text-secondary group-hover:text-text-primary transition-colors duration-base">
                    {category.label}
                  </span>
                  <span className="text-xs text-text-tertiary">({category.count})</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-border">
            <h4 className="text-sm font-medium text-text-primary">Aylık Prim Aralığı</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">{filters.priceRange[0].toLocaleString('tr-TR')} ₺</span>
                <span className="text-text-secondary">{filters.priceRange[1].toLocaleString('tr-TR')} ₺</span>
              </div>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="5000"
                  step="100"
                  value={filters.priceRange[0]}
                  onChange={(e) => handlePriceChange(0, parseInt(e.target.value))}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <input
                  type="range"
                  min="0"
                  max="5000"
                  step="100"
                  value={filters.priceRange[1]}
                  onChange={(e) => handlePriceChange(1, parseInt(e.target.value))}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-border">
            <h4 className="text-sm font-medium text-text-primary">Teminat Limiti</h4>
            <div className="space-y-2">
              {coverageAmounts.map(coverage => (
                <label key={coverage.id} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.coverageAmount.includes(coverage.id)}
                    onChange={() => handleCoverageToggle(coverage.id)}
                    className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  />
                  <span className="flex-1 text-sm text-text-secondary group-hover:text-text-primary transition-colors duration-base">
                    {coverage.label}
                  </span>
                  <span className="text-xs text-text-tertiary">({coverage.count})</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-border">
            <h4 className="text-sm font-medium text-text-primary">Ek Özellikler</h4>
            <div className="space-y-2">
              {features.map(feature => (
                <label key={feature.id} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.features.includes(feature.id)}
                    onChange={() => handleFeatureToggle(feature.id)}
                    className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  />
                  <span className="flex-1 text-sm text-text-secondary group-hover:text-text-primary transition-colors duration-base">
                    {feature.label}
                  </span>
                  <span className="text-xs text-text-tertiary">({feature.count})</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-text-primary/50 backdrop-blur-sm z-40"
        />
      )}
    </>
  );
}
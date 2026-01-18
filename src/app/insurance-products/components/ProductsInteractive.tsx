'use client';

import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import FilterSidebar, { FilterState } from './FilterSidebar';
import ComparisonModal from './ComparisonModal';
import CoverageSimulator from './CoverageSimulator';
import Icon from '@/components/ui/AppIcon';

interface Product {
  id: string;
  name: string;
  category: string;
  monthlyPremium: number;
  annualPremium: number;
  coverageLimit: string;
  image: string;
  alt: string;
  features: {
    name: string;
    included: boolean;
  }[];
  popularityScore: number;
  isRecommended?: boolean;
}

export default function ProductsInteractive() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState<string>('recommended');
  const [comparisonProducts, setComparisonProducts] = useState<Product[]>([]);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [showSimulator, setShowSimulator] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const mockProducts: Product[] = [
  {
    id: 'p1',
    name: 'Premium Sağlık Paketi',
    category: 'Kapsamlı Sağlık',
    monthlyPremium: 850,
    annualPremium: 9180,
    coverageLimit: '500.000 ₺',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_15b40f82b-1765354794271.png",
    alt: 'Modern hospital room with medical equipment and comfortable patient bed',
    features: [
    { name: 'Yıllık Check-up', included: true },
    { name: 'Ambulans Hizmeti', included: true },
    { name: 'Evde Bakım', included: true },
    { name: 'Yurtdışı Teminat', included: true },
    { name: 'Kronik Hastalık', included: true },
    { name: 'Diş Tedavisi', included: true }],

    popularityScore: 4.8,
    isRecommended: true
  },
  {
    id: 'p2',
    name: 'Standart Sağlık Sigortası',
    category: 'Temel Sağlık',
    monthlyPremium: 450,
    annualPremium: 4860,
    coverageLimit: '100.000 ₺',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1decc4cad-1764642439646.png",
    alt: 'Healthcare professional reviewing medical charts in bright clinic setting',
    features: [
    { name: 'Yıllık Check-up', included: true },
    { name: 'Ambulans Hizmeti', included: true },
    { name: 'Evde Bakım', included: false },
    { name: 'Yurtdışı Teminat', included: false },
    { name: 'Kronik Hastalık', included: true },
    { name: 'Diş Tedavisi', included: false }],

    popularityScore: 4.5
  },
  {
    id: 'p3',
    name: 'Aile Sağlık Paketi',
    category: 'Kapsamlı Sağlık',
    monthlyPremium: 1250,
    annualPremium: 13500,
    coverageLimit: '750.000 ₺',
    image: "https://images.unsplash.com/photo-1694041676720-3b9fbcdce80b",
    alt: 'Family of four smiling together in medical consultation room',
    features: [
    { name: 'Yıllık Check-up', included: true },
    { name: 'Ambulans Hizmeti', included: true },
    { name: 'Evde Bakım', included: true },
    { name: 'Yurtdışı Teminat', included: true },
    { name: 'Kronik Hastalık', included: true },
    { name: 'Diş Tedavisi', included: true }],

    popularityScore: 4.9,
    isRecommended: true
  },
  {
    id: 'p4',
    name: 'Diş Sağlığı Sigortası',
    category: 'Diş Sağlığı',
    monthlyPremium: 180,
    annualPremium: 1944,
    coverageLimit: '25.000 ₺',
    image: "https://images.unsplash.com/photo-1722586663955-2f96a4c1f255",
    alt: 'Modern dental clinic with advanced equipment and comfortable patient chair',
    features: [
    { name: 'Yıllık Check-up', included: true },
    { name: 'Ambulans Hizmeti', included: false },
    { name: 'Evde Bakım', included: false },
    { name: 'Yurtdışı Teminat', included: false },
    { name: 'Kronik Hastalık', included: false },
    { name: 'Diş Tedavisi', included: true }],

    popularityScore: 4.3
  },
  {
    id: 'p5',
    name: 'Göz Sağlığı Paketi',
    category: 'Göz Sağlığı',
    monthlyPremium: 120,
    annualPremium: 1296,
    coverageLimit: '15.000 ₺',
    image: "https://images.unsplash.com/photo-1724215618752-b445efb38b77",
    alt: 'Optometrist examining patient eyes with modern diagnostic equipment',
    features: [
    { name: 'Yıllık Check-up', included: true },
    { name: 'Ambulans Hizmeti', included: false },
    { name: 'Evde Bakım', included: false },
    { name: 'Yurtdışı Teminat', included: false },
    { name: 'Kronik Hastalık', included: false },
    { name: 'Diş Tedavisi', included: false }],

    popularityScore: 4.2
  },
  {
    id: 'p6',
    name: 'Doğum Teminat Paketi',
    category: 'Doğum Teminatı',
    monthlyPremium: 650,
    annualPremium: 7020,
    coverageLimit: '200.000 ₺',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1a1f59bfc-1765431706915.png",
    alt: 'Expecting mother receiving prenatal care in modern maternity ward',
    features: [
    { name: 'Yıllık Check-up', included: true },
    { name: 'Ambulans Hizmeti', included: true },
    { name: 'Evde Bakım', included: true },
    { name: 'Yurtdışı Teminat', included: false },
    { name: 'Kronik Hastalık', included: true },
    { name: 'Diş Tedavisi', included: false }],

    popularityScore: 4.7
  }];


  useEffect(() => {
    if (isHydrated) {
      setFilteredProducts(mockProducts);
    }
  }, [isHydrated]);

  const handleFilterChange = (filters: FilterState) => {
    let filtered = [...mockProducts];

    if (filters.categories.length > 0) {
      filtered = filtered.filter((p) =>
      filters.categories.some((cat) => {
        if (cat === 'comprehensive') return p.category === 'Kapsamlı Sağlık';
        if (cat === 'basic') return p.category === 'Temel Sağlık';
        if (cat === 'dental') return p.category === 'Diş Sağlığı';
        if (cat === 'vision') return p.category === 'Göz Sağlığı';
        if (cat === 'maternity') return p.category === 'Doğum Teminatı';
        return false;
      })
      );
    }

    filtered = filtered.filter((p) =>
    p.monthlyPremium >= filters.priceRange[0] &&
    p.monthlyPremium <= filters.priceRange[1]
    );

    if (filters.features.length > 0) {
      filtered = filtered.filter((p) =>
      filters.features.every((featureId) => {
        const featureMap: {[key: string]: string;} = {
          'checkup': 'Yıllık Check-up',
          'ambulance': 'Ambulans Hizmeti',
          'homecare': 'Evde Bakım',
          'abroad': 'Yurtdışı Teminat',
          'chronic': 'Kronik Hastalık'
        };
        const featureName = featureMap[featureId];
        return p.features.some((f) => f.name === featureName && f.included);
      })
      );
    }

    setFilteredProducts(filtered);
  };

  const handleSort = (value: string) => {
    setSortBy(value);
    let sorted = [...filteredProducts];

    switch (value) {
      case 'price-low':
        sorted.sort((a, b) => a.monthlyPremium - b.monthlyPremium);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.monthlyPremium - a.monthlyPremium);
        break;
      case 'coverage-high':
        sorted.sort((a, b) => {
          const aLimit = parseInt(a.coverageLimit.replace(/[^0-9]/g, ''));
          const bLimit = parseInt(b.coverageLimit.replace(/[^0-9]/g, ''));
          return bLimit - aLimit;
        });
        break;
      case 'popular':
        sorted.sort((a, b) => b.popularityScore - a.popularityScore);
        break;
      default:
        sorted.sort((a, b) => (b.isRecommended ? 1 : 0) - (a.isRecommended ? 1 : 0));
    }

    setFilteredProducts(sorted);
  };

  const addToComparison = (product: Product) => {
    if (comparisonProducts.length < 3 && !comparisonProducts.find((p) => p.id === product.id)) {
      setComparisonProducts([...comparisonProducts, product]);
    }
  };

  const removeFromComparison = (productId: string) => {
    setComparisonProducts(comparisonProducts.filter((p) => p.id !== productId));
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-text-secondary">Yükleniyor...</div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-canvas pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            Sigorta Ürünlerimiz
          </h1>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            İhtiyaçlarınıza en uygun sağlık sigortası paketini bulun. Kapsamlı teminatlar, uygun fiyatlar ve güvenilir hizmet.
          </p>
        </div>

        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <span className="text-sm text-text-secondary">
              {filteredProducts.length} ürün bulundu
            </span>
            <button
              onClick={() => setShowSimulator(!showSimulator)}
              className="flex items-center gap-2 px-4 py-2 bg-primary-light text-primary font-medium text-sm rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-base">

              <Icon name="BeakerIcon" size={16} />
              <span>{showSimulator ? 'Simülatörü Gizle' : 'Teminat Simülatörü'}</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <label htmlFor="sort" className="text-sm text-text-secondary">
              Sırala:
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => handleSort(e.target.value)}
              className="px-4 py-2 bg-background border border-border rounded-lg text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary">

              <option value="recommended">Önerilen</option>
              <option value="popular">En Popüler</option>
              <option value="price-low">Fiyat (Düşük-Yüksek)</option>
              <option value="price-high">Fiyat (Yüksek-Düşük)</option>
              <option value="coverage-high">Teminat (Yüksek-Düşük)</option>
            </select>
          </div>
        </div>

        {showSimulator &&
        <div className="mb-8">
            <CoverageSimulator />
          </div>
        }

        <div className="flex gap-8">
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24">
              <FilterSidebar onFilterChange={handleFilterChange} />
            </div>
          </aside>

          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) =>
              <ProductCard key={product.id} {...product} />
              )}
            </div>

            {filteredProducts.length === 0 &&
            <div className="text-center py-16">
                <Icon name="FunnelIcon" size={48} className="text-text-tertiary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  Ürün Bulunamadı
                </h3>
                <p className="text-text-secondary">
                  Seçtiğiniz filtrelere uygun ürün bulunamadı. Lütfen filtrelerinizi değiştirin.
                </p>
              </div>
            }
          </div>
        </div>

        <div className="lg:hidden">
          <FilterSidebar onFilterChange={handleFilterChange} />
        </div>

        {comparisonProducts.length > 0 &&
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
            <div className="bg-background border border-border rounded-xl shadow-2xl p-4 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Icon name="ScaleIcon" size={20} className="text-primary" />
                <span className="text-sm font-medium text-text-primary">
                  {comparisonProducts.length} ürün seçildi
                </span>
              </div>
              <button
              onClick={() => setIsComparisonOpen(true)}
              className="px-6 py-2 bg-primary text-primary-foreground font-medium text-sm rounded-lg hover:bg-primary-hover transition-colors duration-base">

                Karşılaştır
              </button>
              <button
              onClick={() => setComparisonProducts([])}
              className="p-2 hover:bg-muted rounded-lg transition-colors duration-base">

                <Icon name="XMarkIcon" size={20} />
              </button>
            </div>
          </div>
        }
      </div>

      <ComparisonModal
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
        products={comparisonProducts} />

    </div>);

}
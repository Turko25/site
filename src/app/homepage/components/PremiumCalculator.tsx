'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface CalculatorState {
  age: number;
  coverage: string;
  familyMembers: number;
}

const PremiumCalculator = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [calculator, setCalculator] = useState<CalculatorState>({
    age: 35,
    coverage: 'standard',
    familyMembers: 1
  });

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const calculatePremium = (): string => {
    let basePremium = 500;
    
    if (calculator.age < 30) basePremium = 400;
    else if (calculator.age > 50) basePremium = 800;
    
    if (calculator.coverage === 'comprehensive') basePremium *= 1.5;
    else if (calculator.coverage === 'premium') basePremium *= 2.2;
    
    basePremium *= calculator.familyMembers;
    
    return `₺${basePremium.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  if (!isHydrated) {
    return (
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/10 to-healthcare-green/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-background rounded-full mb-4">
                <Icon name="CalculatorIcon" size={18} className="text-primary" variant="solid" />
                <span className="text-sm font-medium text-primary">Prim Hesaplayıcı</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                Tahmini Priminizi Hemen Hesaplayın
              </h2>
              <p className="text-lg text-text-secondary">
                Birkaç basit adımda size özel sigorta primini öğrenin
              </p>
            </div>

            <div className="bg-card rounded-3xl shadow-medical p-8 lg:p-12">
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-3">
                    Yaşınız: 35
                  </label>
                  <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '35%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-text-secondary mt-2">
                    <span>18</span>
                    <span>65</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-3">
                    Kapsam Seviyesi
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-4 bg-primary-light border-2 border-primary rounded-lg text-center cursor-pointer">
                      <Icon name="ShieldCheckIcon" size={24} className="text-primary mx-auto mb-2" />
                      <p className="text-sm font-medium text-primary">Temel</p>
                    </div>
                    <div className="p-4 bg-surface border-2 border-border rounded-lg text-center cursor-pointer hover:border-primary transition-colors">
                      <Icon name="ShieldCheckIcon" size={24} className="text-text-secondary mx-auto mb-2" />
                      <p className="text-sm font-medium text-text-primary">Kapsamlı</p>
                    </div>
                    <div className="p-4 bg-surface border-2 border-border rounded-lg text-center cursor-pointer hover:border-primary transition-colors">
                      <Icon name="SparklesIcon" size={24} className="text-text-secondary mx-auto mb-2" />
                      <p className="text-sm font-medium text-text-primary">Premium</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-3">
                    Aile Üyesi Sayısı: 1
                  </label>
                  <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-healthcare-green rounded-full" style={{ width: '25%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-text-secondary mt-2">
                    <span>1</span>
                    <span>4</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-primary to-healthcare-blue rounded-2xl p-8 text-center">
                  <p className="text-sm text-primary-foreground/80 mb-2">Tahmini Aylık Prim</p>
                  <p className="text-5xl font-bold text-primary-foreground mb-6">₺500,00</p>
                  <Link
                    href="/quote-calculator"
                    className="inline-flex items-center space-x-2 px-8 py-3 bg-background text-primary font-semibold rounded-lg hover:bg-opacity-90 transition-all duration-base"
                  >
                    <span>Detaylı Teklif Al</span>
                    <Icon name="ArrowRightIcon" size={18} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/10 to-healthcare-green/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-background rounded-full mb-4">
              <Icon name="CalculatorIcon" size={18} className="text-primary" variant="solid" />
              <span className="text-sm font-medium text-primary">Prim Hesaplayıcı</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Tahmini Priminizi Hemen Hesaplayın
            </h2>
            <p className="text-lg text-text-secondary">
              Birkaç basit adımda size özel sigorta primini öğrenin
            </p>
          </div>

          <div className="bg-card rounded-3xl shadow-medical p-8 lg:p-12">
            <div className="space-y-8">
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-3">
                  Yaşınız: {calculator.age}
                </label>
                <input
                  type="range"
                  min="18"
                  max="65"
                  value={calculator.age}
                  onChange={(e) => setCalculator({ ...calculator, age: parseInt(e.target.value) })}
                  className="w-full h-3 bg-muted rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer"
                />
                <div className="flex justify-between text-xs text-text-secondary mt-2">
                  <span>18</span>
                  <span>65</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-primary mb-3">
                  Kapsam Seviyesi
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setCalculator({ ...calculator, coverage: 'standard' })}
                    className={`p-4 border-2 rounded-lg text-center transition-all duration-base ${
                      calculator.coverage === 'standard' ?'bg-primary-light border-primary' :'bg-surface border-border hover:border-primary'
                    }`}
                  >
                    <Icon
                      name="ShieldCheckIcon"
                      size={24}
                      className={`mx-auto mb-2 ${
                        calculator.coverage === 'standard' ? 'text-primary' : 'text-text-secondary'
                      }`}
                    />
                    <p className={`text-sm font-medium ${
                      calculator.coverage === 'standard' ? 'text-primary' : 'text-text-primary'
                    }`}>
                      Temel
                    </p>
                  </button>
                  <button
                    onClick={() => setCalculator({ ...calculator, coverage: 'comprehensive' })}
                    className={`p-4 border-2 rounded-lg text-center transition-all duration-base ${
                      calculator.coverage === 'comprehensive' ?'bg-primary-light border-primary' :'bg-surface border-border hover:border-primary'
                    }`}
                  >
                    <Icon
                      name="ShieldCheckIcon"
                      size={24}
                      className={`mx-auto mb-2 ${
                        calculator.coverage === 'comprehensive' ? 'text-primary' : 'text-text-secondary'
                      }`}
                    />
                    <p className={`text-sm font-medium ${
                      calculator.coverage === 'comprehensive' ? 'text-primary' : 'text-text-primary'
                    }`}>
                      Kapsamlı
                    </p>
                  </button>
                  <button
                    onClick={() => setCalculator({ ...calculator, coverage: 'premium' })}
                    className={`p-4 border-2 rounded-lg text-center transition-all duration-base ${
                      calculator.coverage === 'premium' ?'bg-primary-light border-primary' :'bg-surface border-border hover:border-primary'
                    }`}
                  >
                    <Icon
                      name="SparklesIcon"
                      size={24}
                      className={`mx-auto mb-2 ${
                        calculator.coverage === 'premium' ? 'text-primary' : 'text-text-secondary'
                      }`}
                    />
                    <p className={`text-sm font-medium ${
                      calculator.coverage === 'premium' ? 'text-primary' : 'text-text-primary'
                    }`}>
                      Premium
                    </p>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-primary mb-3">
                  Aile Üyesi Sayısı: {calculator.familyMembers}
                </label>
                <input
                  type="range"
                  min="1"
                  max="4"
                  value={calculator.familyMembers}
                  onChange={(e) => setCalculator({ ...calculator, familyMembers: parseInt(e.target.value) })}
                  className="w-full h-3 bg-muted rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-healthcare-green [&::-webkit-slider-thumb]:cursor-pointer"
                />
                <div className="flex justify-between text-xs text-text-secondary mt-2">
                  <span>1</span>
                  <span>4</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary to-healthcare-blue rounded-2xl p-8 text-center">
                <p className="text-sm text-primary-foreground/80 mb-2">Tahmini Aylık Prim</p>
                <p className="text-5xl font-bold text-primary-foreground mb-6">{calculatePremium()}</p>
                <Link
                  href="/quote-calculator"
                  className="inline-flex items-center space-x-2 px-8 py-3 bg-background text-primary font-semibold rounded-lg hover:bg-opacity-90 transition-all duration-base"
                >
                  <span>Detaylı Teklif Al</span>
                  <Icon name="ArrowRightIcon" size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumCalculator;
'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface CoverageOption {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  icon: string;
}

interface PersonalInfo {
  firstName: string;
  lastName: string;
  birthDate: string;
  tcNo: string;
  phone: string;
  email: string;
}

interface QuoteFormProps {
  onQuoteGenerated: (quote: any) => void;
}

const QuoteForm = ({ onQuoteGenerated }: QuoteFormProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: '',
    lastName: '',
    birthDate: '',
    tcNo: '',
    phone: '',
    email: '',
  });
  const [selectedCoverages, setSelectedCoverages] = useState<string[]>([]);
  const [dependents, setDependents] = useState<number>(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const coverageOptions: CoverageOption[] = [
    {
      id: 'basic',
      name: 'Temel Teminat',
      description: 'Yatarak tedavi, ameliyat ve acil müdahale kapsamı',
      basePrice: 1250,
      icon: 'ShieldCheckIcon',
    },
    {
      id: 'extended',
      name: 'Genişletilmiş Teminat',
      description: 'Ayakta tedavi, ilaç ve tetkik giderleri dahil',
      basePrice: 2100,
      icon: 'HeartIcon',
    },
    {
      id: 'premium',
      name: 'Premium Teminat',
      description: 'Özel hastane, check-up ve diş tedavisi dahil',
      basePrice: 3500,
      icon: 'StarIcon',
    },
    {
      id: 'dental',
      name: 'Diş Tedavisi',
      description: 'Kapsamlı diş tedavisi ve ortodonti',
      basePrice: 850,
      icon: 'SparklesIcon',
    },
    {
      id: 'maternity',
      name: 'Doğum Teminatı',
      description: 'Hamilelik takibi ve doğum masrafları',
      basePrice: 1800,
      icon: 'UserGroupIcon',
    },
    {
      id: 'international',
      name: 'Yurtdışı Teminatı',
      description: 'Yurtdışı acil sağlık hizmetleri',
      basePrice: 1200,
      icon: 'GlobeAltIcon',
    },
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!personalInfo.firstName.trim()) {
        newErrors.firstName = 'Ad alanı zorunludur';
      }
      if (!personalInfo.lastName.trim()) {
        newErrors.lastName = 'Soyad alanı zorunludur';
      }
      if (!personalInfo.birthDate) {
        newErrors.birthDate = 'Doğum tarihi zorunludur';
      }
      if (!personalInfo.tcNo || personalInfo.tcNo.length !== 11) {
        newErrors.tcNo = 'Geçerli bir TC Kimlik No giriniz (11 hane)';
      }
      if (!personalInfo.phone || personalInfo.phone.length < 10) {
        newErrors.phone = 'Geçerli bir telefon numarası giriniz';
      }
      if (!personalInfo.email || !personalInfo.email.includes('@')) {
        newErrors.email = 'Geçerli bir e-posta adresi giriniz';
      }
    }

    if (step === 2 && selectedCoverages.length === 0) {
      newErrors.coverage = 'En az bir teminat seçmelisiniz';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
    setErrors({});
  };

  const handleCoverageToggle = (coverageId: string) => {
    setSelectedCoverages((prev) =>
      prev.includes(coverageId)
        ? prev.filter((id) => id !== coverageId)
        : [...prev, coverageId]
    );
    setErrors({});
  };

  const calculateTotalPremium = (): number => {
    const coverageTotal = selectedCoverages.reduce((total, id) => {
      const coverage = coverageOptions.find((c) => c.id === id);
      return total + (coverage?.basePrice || 0);
    }, 0);

    const dependentMultiplier = 1 + dependents * 0.4;
    return Math.round(coverageTotal * dependentMultiplier);
  };

  const handleSubmit = () => {
    if (validateStep(2)) {
      const quote = {
        personalInfo,
        selectedCoverages: selectedCoverages.map((id) =>
          coverageOptions.find((c) => c.id === id)
        ),
        dependents,
        totalPremium: calculateTotalPremium(),
        quoteDate: new Date().toLocaleDateString('tr-TR'),
        quoteNumber: `TSS-${Date.now().toString().slice(-8)}`,
      };
      onQuoteGenerated(quote);
    }
  };

  if (!isHydrated) {
    return (
      <div className="w-full max-w-4xl mx-auto bg-card rounded-xl shadow-medical p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="space-y-4">
            <div className="h-12 bg-muted rounded"></div>
            <div className="h-12 bg-muted rounded"></div>
            <div className="h-12 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-card rounded-xl shadow-medical p-6 md:p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center flex-1">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-all duration-base ${
                  currentStep >= step
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {step}
              </div>
              {step < 3 && (
                <div
                  className={`flex-1 h-1 mx-2 transition-all duration-base ${
                    currentStep > step ? 'bg-primary' : 'bg-muted'
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
        <div className="text-center">
          <h3 className="text-xl font-semibold text-text-primary">
            {currentStep === 1 && 'Kişisel Bilgileriniz'}
            {currentStep === 2 && 'Teminat Seçimi'}
            {currentStep === 3 && 'Özet ve Onay'}
          </h3>
          <p className="text-sm text-text-secondary mt-1">
            {currentStep === 1 && 'Lütfen bilgilerinizi eksiksiz doldurun'}
            {currentStep === 2 && 'İhtiyacınıza uygun teminatları seçin'}
            {currentStep === 3 && 'Teklif detaylarını kontrol edin'}
          </p>
        </div>
      </div>

      {currentStep === 1 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Ad <span className="text-error">*</span>
              </label>
              <input
                type="text"
                value={personalInfo.firstName}
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, firstName: e.target.value })
                }
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-base ${
                  errors.firstName ? 'border-error' : 'border-border'
                }`}
                placeholder="Adınız"
              />
              {errors.firstName && (
                <p className="text-error text-xs mt-1">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Soyad <span className="text-error">*</span>
              </label>
              <input
                type="text"
                value={personalInfo.lastName}
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, lastName: e.target.value })
                }
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-base ${
                  errors.lastName ? 'border-error' : 'border-border'
                }`}
                placeholder="Soyadınız"
              />
              {errors.lastName && (
                <p className="text-error text-xs mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Doğum Tarihi <span className="text-error">*</span>
              </label>
              <input
                type="date"
                value={personalInfo.birthDate}
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, birthDate: e.target.value })
                }
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-base ${
                  errors.birthDate ? 'border-error' : 'border-border'
                }`}
              />
              {errors.birthDate && (
                <p className="text-error text-xs mt-1">{errors.birthDate}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                TC Kimlik No <span className="text-error">*</span>
              </label>
              <input
                type="text"
                maxLength={11}
                value={personalInfo.tcNo}
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, tcNo: e.target.value.replace(/\D/g, '') })
                }
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-base ${
                  errors.tcNo ? 'border-error' : 'border-border'
                }`}
                placeholder="12345678901"
              />
              {errors.tcNo && (
                <p className="text-error text-xs mt-1">{errors.tcNo}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Telefon <span className="text-error">*</span>
              </label>
              <input
                type="tel"
                value={personalInfo.phone}
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, phone: e.target.value.replace(/\D/g, '') })
                }
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-base ${
                  errors.phone ? 'border-error' : 'border-border'
                }`}
                placeholder="5XX XXX XX XX"
              />
              {errors.phone && (
                <p className="text-error text-xs mt-1">{errors.phone}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                E-posta <span className="text-error">*</span>
              </label>
              <input
                type="email"
                value={personalInfo.email}
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, email: e.target.value })
                }
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-base ${
                  errors.email ? 'border-error' : 'border-border'
                }`}
                placeholder="ornek@email.com"
              />
              {errors.email && (
                <p className="text-error text-xs mt-1">{errors.email}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="space-y-6">
          {errors.coverage && (
            <div className="bg-error bg-opacity-10 border border-error rounded-lg p-4 flex items-center space-x-3">
              <Icon name="ExclamationTriangleIcon" size={20} className="text-error" />
              <p className="text-error text-sm font-medium">{errors.coverage}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {coverageOptions.map((coverage) => (
              <button
                key={coverage.id}
                onClick={() => handleCoverageToggle(coverage.id)}
                className={`p-6 border-2 rounded-xl text-left transition-all duration-base hover:shadow-md ${
                  selectedCoverages.includes(coverage.id)
                    ? 'border-primary bg-primary-light' :'border-border bg-card hover:border-primary'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div
                    className={`p-3 rounded-lg ${
                      selectedCoverages.includes(coverage.id)
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-text-secondary'
                    }`}
                  >
                    <Icon name={coverage.icon as any} size={24} />
                  </div>
                  {selectedCoverages.includes(coverage.id) && (
                    <Icon
                      name="CheckCircleIcon"
                      size={24}
                      className="text-primary"
                      variant="solid"
                    />
                  )}
                </div>
                <h4 className="font-semibold text-text-primary mb-2">
                  {coverage.name}
                </h4>
                <p className="text-sm text-text-secondary mb-4">
                  {coverage.description}
                </p>
                <p className="text-lg font-bold text-primary">
                  {coverage.basePrice.toLocaleString('tr-TR')} ₺/yıl
                </p>
              </button>
            ))}
          </div>

          <div className="bg-surface rounded-xl p-6">
            <label className="block text-sm font-medium text-text-primary mb-4">
              Bakmakla Yükümlü Olduğunuz Kişi Sayısı
            </label>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDependents(Math.max(0, dependents - 1))}
                className="w-12 h-12 flex items-center justify-center bg-muted hover:bg-primary hover:text-primary-foreground rounded-lg transition-all duration-base"
              >
                <Icon name="MinusIcon" size={20} />
              </button>
              <div className="flex-1 text-center">
                <span className="text-3xl font-bold text-primary">{dependents}</span>
                <p className="text-xs text-text-secondary mt-1">
                  {dependents === 0 && 'Sadece kendiniz'}
                  {dependents === 1 && '1 kişi'}
                  {dependents > 1 && `${dependents} kişi`}
                </p>
              </div>
              <button
                onClick={() => setDependents(Math.min(5, dependents + 1))}
                className="w-12 h-12 flex items-center justify-center bg-muted hover:bg-primary hover:text-primary-foreground rounded-lg transition-all duration-base"
              >
                <Icon name="PlusIcon" size={20} />
              </button>
            </div>
            <p className="text-xs text-text-secondary text-center mt-4">
              Her ek kişi için %40 ek prim uygulanır
            </p>
          </div>

          {selectedCoverages.length > 0 && (
            <div className="bg-healthcare-green bg-opacity-10 border border-healthcare-green rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary mb-1">
                    Tahmini Yıllık Prim
                  </p>
                  <p className="text-3xl font-bold text-healthcare-green">
                    {calculateTotalPremium().toLocaleString('tr-TR')} ₺
                  </p>
                </div>
                <Icon
                  name="CalculatorIcon"
                  size={48}
                  className="text-healthcare-green opacity-50"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {currentStep === 3 && (
        <div className="space-y-6">
          <div className="bg-surface rounded-xl p-6">
            <h4 className="font-semibold text-text-primary mb-4 flex items-center">
              <Icon name="UserIcon" size={20} className="mr-2 text-primary" />
              Kişisel Bilgiler
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-text-secondary">Ad Soyad</p>
                <p className="font-medium text-text-primary">
                  {personalInfo.firstName} {personalInfo.lastName}
                </p>
              </div>
              <div>
                <p className="text-text-secondary">Doğum Tarihi</p>
                <p className="font-medium text-text-primary">
                  {new Date(personalInfo.birthDate).toLocaleDateString('tr-TR')}
                </p>
              </div>
              <div>
                <p className="text-text-secondary">TC Kimlik No</p>
                <p className="font-medium text-text-primary">{personalInfo.tcNo}</p>
              </div>
              <div>
                <p className="text-text-secondary">Telefon</p>
                <p className="font-medium text-text-primary">{personalInfo.phone}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-text-secondary">E-posta</p>
                <p className="font-medium text-text-primary">{personalInfo.email}</p>
              </div>
            </div>
          </div>

          <div className="bg-surface rounded-xl p-6">
            <h4 className="font-semibold text-text-primary mb-4 flex items-center">
              <Icon name="ShieldCheckIcon" size={20} className="mr-2 text-primary" />
              Seçilen Teminatlar
            </h4>
            <div className="space-y-3">
              {selectedCoverages.map((id) => {
                const coverage = coverageOptions.find((c) => c.id === id);
                return (
                  <div
                    key={id}
                    className="flex items-center justify-between p-4 bg-card rounded-lg border border-border"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon
                        name={coverage?.icon as any}
                        size={20}
                        className="text-primary"
                      />
                      <div>
                        <p className="font-medium text-text-primary">
                          {coverage?.name}
                        </p>
                        <p className="text-xs text-text-secondary">
                          {coverage?.description}
                        </p>
                      </div>
                    </div>
                    <p className="font-semibold text-primary">
                      {coverage?.basePrice.toLocaleString('tr-TR')} ₺
                    </p>
                  </div>
                );
              })}
            </div>
            {dependents > 0 && (
              <div className="mt-4 p-4 bg-primary-light rounded-lg">
                <p className="text-sm text-text-primary">
                  <span className="font-semibold">{dependents} bakmakla yükümlü kişi</span>{' '}
                  için %{dependents * 40} ek prim uygulanmıştır
                </p>
              </div>
            )}
          </div>

          <div className="bg-healthcare-green rounded-xl p-6 text-healthcare-green-foreground">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90 mb-1">Toplam Yıllık Prim</p>
                <p className="text-4xl font-bold">
                  {calculateTotalPremium().toLocaleString('tr-TR')} ₺
                </p>
                <p className="text-xs opacity-80 mt-2">
                  Aylık {Math.round(calculateTotalPremium() / 12).toLocaleString('tr-TR')} ₺
                </p>
              </div>
              <Icon name="CheckBadgeIcon" size={64} className="opacity-50" variant="solid" />
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
        {currentStep > 1 ? (
          <button
            onClick={handlePrevious}
            className="flex items-center space-x-2 px-6 py-3 bg-muted text-text-primary font-medium rounded-lg hover:bg-opacity-80 transition-all duration-base"
          >
            <Icon name="ChevronLeftIcon" size={20} />
            <span>Geri</span>
          </button>
        ) : (
          <div></div>
        )}

        {currentStep < 3 ? (
          <button
            onClick={handleNext}
            className="flex items-center space-x-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary-hover transition-all duration-base ml-auto"
          >
            <span>İleri</span>
            <Icon name="ChevronRightIcon" size={20} />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="flex items-center space-x-2 px-8 py-3 bg-healthcare-green text-healthcare-green-foreground font-medium rounded-lg hover:bg-opacity-90 shadow-md hover:shadow-lg transition-all duration-base ml-auto pulse-rhythm"
          >
            <Icon name="CheckIcon" size={20} />
            <span>Teklif Al</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default QuoteForm;
'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Coverage {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  icon: string;
}

interface QuoteData {
  personalInfo: {
    firstName: string;
    lastName: string;
    birthDate: string;
    tcNo: string;
    phone: string;
    email: string;
  };
  selectedCoverages: Coverage[];
  dependents: number;
  totalPremium: number;
  quoteDate: string;
  quoteNumber: string;
}

interface QuoteResultProps {
  quote: QuoteData;
  onNewQuote: () => void;
}

const QuoteResult = ({ quote, onNewQuote }: QuoteResultProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    setShowSuccess(true);
  }, []);

  const handleDownloadPDF = () => {
    alert('PDF indirme özelliği yakında eklenecektir.');
  };

  const handleEmailQuote = () => {
    alert(`Teklif ${quote.personalInfo.email} adresine gönderildi.`);
  };

  const handleApplyNow = () => {
    alert('Başvuru formu yakında eklenecektir.');
  };

  if (!isHydrated) {
    return (
      <div className="w-full max-w-4xl mx-auto bg-card rounded-xl shadow-medical p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-1/2"></div>
          <div className="space-y-4">
            <div className="h-24 bg-muted rounded"></div>
            <div className="h-24 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {showSuccess && (
        <div className="bg-success bg-opacity-10 border-2 border-success rounded-xl p-6 animate-pulse-rhythm">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <Icon
                name="CheckCircleIcon"
                size={48}
                className="text-success"
                variant="solid"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-success mb-1">
                Teklifiniz Hazır!
              </h3>
              <p className="text-text-secondary">
                Teklif numaranız: <span className="font-mono font-semibold">{quote.quoteNumber}</span>
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-card rounded-xl shadow-medical p-6 md:p-8">
        <div className="flex items-center justify-between mb-6 pb-6 border-b border-border">
          <div>
            <h2 className="text-2xl font-bold text-text-primary mb-1">
              Sigorta Teklifiniz
            </h2>
            <p className="text-sm text-text-secondary">
              Teklif Tarihi: {quote.quoteDate}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-text-secondary mb-1">Teklif No</p>
            <p className="text-lg font-mono font-semibold text-primary">
              {quote.quoteNumber}
            </p>
          </div>
        </div>

        <div className="bg-healthcare-green rounded-xl p-6 mb-6 text-healthcare-green-foreground">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90 mb-2">Toplam Yıllık Prim</p>
              <p className="text-5xl font-bold mb-2">
                {quote.totalPremium.toLocaleString('tr-TR')} ₺
              </p>
              <p className="text-sm opacity-80">
                veya aylık {Math.round(quote.totalPremium / 12).toLocaleString('tr-TR')} ₺
              </p>
            </div>
            <Icon name="CurrencyDollarIcon" size={80} className="opacity-30" variant="solid" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-surface rounded-xl p-6">
            <h4 className="font-semibold text-text-primary mb-4 flex items-center">
              <Icon name="UserIcon" size={20} className="mr-2 text-primary" />
              Sigortalı Bilgileri
            </h4>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-text-secondary">Ad Soyad</p>
                <p className="font-medium text-text-primary">
                  {quote.personalInfo.firstName} {quote.personalInfo.lastName}
                </p>
              </div>
              <div>
                <p className="text-text-secondary">Doğum Tarihi</p>
                <p className="font-medium text-text-primary">
                  {new Date(quote.personalInfo.birthDate).toLocaleDateString('tr-TR')}
                </p>
              </div>
              <div>
                <p className="text-text-secondary">TC Kimlik No</p>
                <p className="font-medium text-text-primary">{quote.personalInfo.tcNo}</p>
              </div>
              <div>
                <p className="text-text-secondary">İletişim</p>
                <p className="font-medium text-text-primary">{quote.personalInfo.phone}</p>
                <p className="font-medium text-text-primary text-xs">{quote.personalInfo.email}</p>
              </div>
            </div>
          </div>

          <div className="bg-surface rounded-xl p-6">
            <h4 className="font-semibold text-text-primary mb-4 flex items-center">
              <Icon name="UserGroupIcon" size={20} className="mr-2 text-primary" />
              Poliçe Detayları
            </h4>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-text-secondary">Teminat Sayısı</p>
                <p className="font-medium text-text-primary">
                  {quote.selectedCoverages.length} Teminat
                </p>
              </div>
              <div>
                <p className="text-text-secondary">Bakmakla Yükümlü</p>
                <p className="font-medium text-text-primary">
                  {quote.dependents === 0 ? 'Yok' : `${quote.dependents} Kişi`}
                </p>
              </div>
              <div>
                <p className="text-text-secondary">Poliçe Süresi</p>
                <p className="font-medium text-text-primary">1 Yıl</p>
              </div>
              <div>
                <p className="text-text-secondary">Ödeme Seçeneği</p>
                <p className="font-medium text-text-primary">Yıllık / Aylık</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface rounded-xl p-6 mb-6">
          <h4 className="font-semibold text-text-primary mb-4 flex items-center">
            <Icon name="ShieldCheckIcon" size={20} className="mr-2 text-primary" />
            Seçilen Teminatlar
          </h4>
          <div className="space-y-3">
            {quote.selectedCoverages.map((coverage) => (
              <div
                key={coverage.id}
                className="flex items-center justify-between p-4 bg-card rounded-lg border border-border hover:border-primary transition-all duration-base"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary-light rounded-lg">
                    <Icon name={coverage.icon as any} size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">{coverage.name}</p>
                    <p className="text-xs text-text-secondary">{coverage.description}</p>
                  </div>
                </div>
                <p className="font-semibold text-primary">
                  {coverage.basePrice.toLocaleString('tr-TR')} ₺
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-primary-light border border-primary rounded-xl p-6 mb-6">
          <div className="flex items-start space-x-3">
            <Icon name="InformationCircleIcon" size={24} className="text-primary flex-shrink-0" />
            <div className="text-sm text-text-primary">
              <p className="font-semibold mb-2">Önemli Bilgiler:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Bu teklif 30 gün süreyle geçerlidir</li>
                <li>Poliçe başlangıç tarihi başvuru onayından sonra belirlenecektir</li>
                <li>Sağlık beyanı ve gerekli belgeler başvuru sırasında talep edilecektir</li>
                <li>Primler yıllık veya aylık taksitler halinde ödenebilir</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleApplyNow}
            className="flex-1 flex items-center justify-center space-x-2 px-6 py-4 bg-healthcare-green text-healthcare-green-foreground font-semibold rounded-lg hover:bg-opacity-90 shadow-md hover:shadow-lg transition-all duration-base pulse-rhythm"
          >
            <Icon name="DocumentCheckIcon" size={24} />
            <span>Hemen Başvur</span>
          </button>
          <button
            onClick={handleDownloadPDF}
            className="flex items-center justify-center space-x-2 px-6 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary-hover transition-all duration-base"
          >
            <Icon name="ArrowDownTrayIcon" size={24} />
            <span>PDF İndir</span>
          </button>
          <button
            onClick={handleEmailQuote}
            className="flex items-center justify-center space-x-2 px-6 py-4 bg-secondary text-secondary-foreground font-semibold rounded-lg hover:bg-secondary-hover transition-all duration-base"
          >
            <Icon name="EnvelopeIcon" size={24} />
            <span>E-posta Gönder</span>
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-border text-center">
          <button
            onClick={onNewQuote}
            className="text-primary hover:text-primary-hover font-medium text-sm transition-colors duration-base"
          >
            ← Yeni Teklif Hesapla
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuoteResult;
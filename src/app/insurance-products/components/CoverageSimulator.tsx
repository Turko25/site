'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Scenario {
  id: string;
  title: string;
  description: string;
  icon: string;
  estimatedCost: number;
}

export default function CoverageSimulator() {
  const [selectedScenario, setSelectedScenario] = useState<string>('');
  const [coverageAmount, setCoverageAmount] = useState<number>(100000);

  const scenarios: Scenario[] = [
    {
      id: 'surgery',
      title: 'Ameliyat ve Hastane Yatışı',
      description: 'Kalp bypass ameliyatı, 7 gün hastane yatışı, yoğun bakım',
      icon: 'HeartIcon',
      estimatedCost: 85000
    },
    {
      id: 'emergency',
      title: 'Acil Müdahale',
      description: 'Ambulans hizmeti, acil servis, tetkikler ve ilaç',
      icon: 'BoltIcon',
      estimatedCost: 12000
    },
    {
      id: 'checkup',
      title: 'Yıllık Check-up',
      description: 'Kapsamlı sağlık taraması, kan testleri, görüntüleme',
      icon: 'ClipboardDocumentCheckIcon',
      estimatedCost: 5500
    },
    {
      id: 'dental',
      title: 'Diş Tedavisi',
      description: 'İmplant, kanal tedavisi, estetik diş hekimliği',
      icon: 'SparklesIcon',
      estimatedCost: 18000
    }
  ];

  const calculateCoverage = () => {
    if (!selectedScenario) return null;
    
    const scenario = scenarios.find(s => s.id === selectedScenario);
    if (!scenario) return null;

    const coveredAmount = Math.min(scenario.estimatedCost, coverageAmount);
    const outOfPocket = Math.max(0, scenario.estimatedCost - coverageAmount);
    const coveragePercentage = (coveredAmount / scenario.estimatedCost) * 100;

    return {
      scenario,
      coveredAmount,
      outOfPocket,
      coveragePercentage
    };
  };

  const result = calculateCoverage();

  return (
    <div className="medical-card p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-primary-light rounded-lg">
          <Icon name="BeakerIcon" size={24} className="text-primary" variant="solid" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-text-primary">Teminat Simülatörü</h3>
          <p className="text-sm text-text-secondary">Gerçek senaryolarla teminatınızı test edin</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            Senaryo Seçin
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {scenarios.map(scenario => (
              <button
                key={scenario.id}
                onClick={() => setSelectedScenario(scenario.id)}
                className={`p-4 rounded-lg border-2 text-left transition-all duration-base ${
                  selectedScenario === scenario.id
                    ? 'border-primary bg-primary-light' :'border-border hover:border-primary-light'
                }`}
              >
                <div className="flex items-start gap-3">
                  <Icon 
                    name={scenario.icon as any} 
                    size={20} 
                    className={selectedScenario === scenario.id ? 'text-primary' : 'text-text-secondary'}
                    variant={selectedScenario === scenario.id ? 'solid' : 'outline'}
                  />
                  <div className="flex-1">
                    <div className="font-medium text-text-primary text-sm mb-1">{scenario.title}</div>
                    <div className="text-xs text-text-secondary mb-2">{scenario.description}</div>
                    <div className="text-sm font-semibold text-primary">
                      ~{scenario.estimatedCost.toLocaleString('tr-TR')} ₺
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            Teminat Limiti: {coverageAmount.toLocaleString('tr-TR')} ₺
          </label>
          <input
            type="range"
            min="25000"
            max="500000"
            step="25000"
            value={coverageAmount}
            onChange={(e) => setCoverageAmount(parseInt(e.target.value))}
            className="w-full h-3 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-xs text-text-tertiary mt-2">
            <span>25.000 ₺</span>
            <span>500.000 ₺</span>
          </div>
        </div>

        {result && (
          <div className="p-6 bg-surface rounded-lg border border-border space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <span className="text-sm font-medium text-text-primary">Senaryo Özeti</span>
              <span className="text-xs text-text-secondary">{result.scenario.title}</span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Toplam Maliyet</span>
                <span className="text-sm font-semibold text-text-primary">
                  {result.scenario.estimatedCost.toLocaleString('tr-TR')} ₺
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Sigorta Karşılama</span>
                <span className="text-sm font-semibold text-success">
                  {result.coveredAmount.toLocaleString('tr-TR')} ₺
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Cebinizden Çıkacak</span>
                <span className="text-sm font-semibold text-accent">
                  {result.outOfPocket.toLocaleString('tr-TR')} ₺
                </span>
              </div>

              <div className="pt-3 border-t border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-text-secondary">Kapsama Oranı</span>
                  <span className="text-xs font-semibold text-primary">
                    %{result.coveragePercentage.toFixed(1)}
                  </span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-healthcare-green to-primary transition-all duration-base"
                    style={{ width: `${result.coveragePercentage}%` }}
                  />
                </div>
              </div>
            </div>

            {result.outOfPocket > 0 && (
              <div className="flex items-start gap-3 p-4 bg-warning/10 border border-warning/20 rounded-lg">
                <Icon name="ExclamationTriangleIcon" size={20} className="text-warning mt-0.5" variant="solid" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-text-primary mb-1">Daha Yüksek Teminat Önerisi</p>
                  <p className="text-xs text-text-secondary">
                    Bu senaryo için teminat limitiniz yetersiz kalabilir. Daha yüksek bir teminat limiti seçmenizi öneririz.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
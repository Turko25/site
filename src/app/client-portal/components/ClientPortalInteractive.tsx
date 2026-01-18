'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import PolicyCard from './PolicyCard';
import ClaimCard from './ClaimCard';
import DocumentItem from './DocumentItem';
import QuickActionCard from './QuickActionCard';
import StatCard from './StatCard';
import MessageThread from './MessageThread';
import RenewalNotification from './RenewalNotification';
import HealthTipCard from './HealthTipCard';
import PaymentHistoryItem from './PaymentHistoryItem';

interface Policy {
  id: string;
  type: string;
  policyNumber: string;
  status: 'active' | 'pending' | 'expired';
  startDate: string;
  endDate: string;
  premium: number;
  coverage: string;
  image: string;
  alt: string;
}

interface Claim {
  id: string;
  claimNumber: string;
  type: string;
  date: string;
  amount: number;
  status: 'approved' | 'pending' | 'rejected' | 'processing';
  description: string;
}

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  date: string;
  category: 'policy' | 'claim' | 'payment' | 'other';
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
}

interface Stat {
  label: string;
  value: string;
  icon: string;
  color: string;
  bgColor: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

interface Message {
  id: string;
  agentName: string;
  agentImage: string;
  agentAlt: string;
  subject: string;
  preview: string;
  date: string;
  unread: boolean;
}

interface Renewal {
  id: string;
  policyType: string;
  daysUntilExpiry: number;
  currentPremium: number;
  renewalPremium: number;
}

interface HealthTip {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  alt: string;
  category: string;
  readTime: string;
}

interface Payment {
  id: string;
  date: string;
  amount: number;
  method: string;
  status: 'completed' | 'pending' | 'failed';
  policyType: string;
  invoiceNumber: string;
}

const mockPolicies: Policy[] = [
{
  id: '1',
  type: 'Tamamlayıcı Sağlık Sigortası',
  policyNumber: 'TSS-2024-001234',
  status: 'active',
  startDate: '01/01/2024',
  endDate: '31/12/2024',
  premium: 850,
  coverage: '500.000 ₺',
  image: "https://images.unsplash.com/photo-1666886573600-61c634663827",
  alt: 'Medical professional in white coat holding stethoscope with clipboard in modern hospital setting'
},
{
  id: '2',
  type: 'Aile Sağlık Paketi',
  policyNumber: 'TSS-2024-001235',
  status: 'active',
  startDate: '15/03/2024',
  endDate: '14/03/2025',
  premium: 1250,
  coverage: '750.000 ₺',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1dd5e3e25-1764671590828.png",
  alt: 'Happy family of four sitting together on couch smiling at camera in bright living room'
}];


const mockClaims: Claim[] = [
{
  id: '1',
  claimNumber: 'CLM-2024-5678',
  type: 'Ameliyat Masrafları',
  date: '15/11/2024',
  amount: 12500,
  status: 'approved',
  description: 'Apandisit ameliyatı ve hastane masrafları için yapılan talep onaylandı.'
},
{
  id: '2',
  claimNumber: 'CLM-2024-5679',
  type: 'Laboratuvar Testleri',
  date: '28/11/2024',
  amount: 850,
  status: 'processing',
  description: 'Rutin kan tahlilleri ve görüntüleme testleri için talep işleniyor.'
},
{
  id: '3',
  claimNumber: 'CLM-2024-5680',
  type: 'Fizik Tedavi',
  date: '05/12/2024',
  amount: 2400,
  status: 'pending',
  description: '10 seans fizik tedavi masrafları için belge bekleniyor.'
}];


const mockDocuments: Document[] = [
{
  id: '1',
  name: 'Poliçe Belgesi 2024',
  type: 'PDF',
  size: '2.4 MB',
  date: '01/01/2024',
  category: 'policy'
},
{
  id: '2',
  name: 'Ödeme Makbuzu - Kasım',
  type: 'PDF',
  size: '156 KB',
  date: '01/11/2024',
  category: 'payment'
},
{
  id: '3',
  name: 'Talep Formu - CLM-5678',
  type: 'PDF',
  size: '890 KB',
  date: '15/11/2024',
  category: 'claim'
},
{
  id: '4',
  name: 'Sağlık Raporu',
  type: 'PDF',
  size: '1.2 MB',
  date: '20/11/2024',
  category: 'other'
}];


const mockQuickActions: QuickAction[] = [
{
  id: 'new-claim',
  title: 'Yeni Talep Oluştur',
  description: 'Sağlık masraflarınız için hızlıca talep başlatın',
  icon: 'PlusCircleIcon',
  color: 'text-primary',
  bgColor: 'bg-primary/10'
},
{
  id: 'upload-doc',
  title: 'Belge Yükle',
  description: 'Tıbbi raporlarınızı ve faturalarınızı yükleyin',
  icon: 'CloudArrowUpIcon',
  color: 'text-healthcare-green',
  bgColor: 'bg-healthcare-green/10'
},
{
  id: 'contact-agent',
  title: 'Danışmanla İletişim',
  description: 'Özel danışmanınızla görüşme planlayın',
  icon: 'ChatBubbleLeftRightIcon',
  color: 'text-secondary',
  bgColor: 'bg-secondary/10'
},
{
  id: 'emergency',
  title: 'Acil Destek',
  description: '7/24 acil sağlık destek hattına ulaşın',
  icon: 'PhoneIcon',
  color: 'text-accent',
  bgColor: 'bg-accent/10'
}];


const mockStats: Stat[] = [
{
  label: 'Aktif Poliçeler',
  value: '2',
  icon: 'ShieldCheckIcon',
  color: 'text-primary',
  bgColor: 'bg-primary/10'
},
{
  label: 'Toplam Teminat',
  value: '1.25M ₺',
  icon: 'BanknotesIcon',
  color: 'text-healthcare-green',
  bgColor: 'bg-healthcare-green/10',
  trend: {
    value: '+15%',
    isPositive: true
  }
},
{
  label: 'Onaylanan Talepler',
  value: '8',
  icon: 'CheckBadgeIcon',
  color: 'text-success',
  bgColor: 'bg-success/10',
  trend: {
    value: '+2',
    isPositive: true
  }
},
{
  label: 'Aylık Prim',
  value: '2.100 ₺',
  icon: 'CreditCardIcon',
  color: 'text-secondary',
  bgColor: 'bg-secondary/10'
}];


const mockMessages: Message[] = [
{
  id: '1',
  agentName: 'Ayşe Yılmaz',
  agentImage: "https://img.rocket.new/generatedImages/rocket_gen_img_10243f878-1763297303009.png",
  agentAlt: 'Professional Turkish woman with dark hair in business attire smiling warmly',
  subject: 'Poliçe Yenileme Hatırlatması',
  preview: 'Merhaba, poliçenizin yenileme zamanı yaklaşıyor. Detayları görüşmek ister misiniz?',
  date: '2 saat önce',
  unread: true
},
{
  id: '2',
  agentName: 'Mehmet Demir',
  agentImage: "https://img.rocket.new/generatedImages/rocket_gen_img_179ae67b2-1763296087051.png",
  agentAlt: 'Professional Turkish man with short dark hair in navy suit with confident smile',
  subject: 'Talep Onayı',
  preview: 'CLM-2024-5678 numaralı talebiniz onaylandı. Ödeme 3 iş günü içinde hesabınıza...',
  date: '1 gün önce',
  unread: false
}];


const mockRenewals: Renewal[] = [
{
  id: '1',
  policyType: 'Tamamlayıcı Sağlık Sigortası',
  daysUntilExpiry: 25,
  currentPremium: 850,
  renewalPremium: 920
}];


const mockHealthTips: HealthTip[] = [
{
  id: '1',
  title: 'Kış Aylarında Bağışıklık Sisteminizi Güçlendirin',
  excerpt: 'Soğuk havalarda sağlıklı kalmanın 7 etkili yolu ve beslenme önerileri.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b5c31925-1764661114175.png",
  alt: 'Fresh colorful fruits and vegetables arranged on wooden table with vitamin supplements',
  category: 'Beslenme',
  readTime: '5 dk'
},
{
  id: '2',
  title: 'Düzenli Sağlık Kontrolleri Neden Önemli?',
  excerpt: 'Erken teşhisin hayat kurtaran rolü ve önerilen kontrol takvimi.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_131a7a399-1765467934258.png",
  alt: 'Doctor in white coat examining patient with stethoscope in modern clinic examination room',
  category: 'Önleyici Sağlık',
  readTime: '4 dk'
},
{
  id: '3',
  title: 'Stres Yönetimi ve Mental Sağlık',
  excerpt: 'Günlük hayatta stresi azaltmanın bilimsel yöntemleri ve egzersizler.',
  image: "https://images.unsplash.com/photo-1588783345317-cf3adf740122",
  alt: 'Woman in comfortable clothing practicing meditation in peaceful yoga pose on mat outdoors',
  category: 'Mental Sağlık',
  readTime: '6 dk'
}];


const mockPayments: Payment[] = [
{
  id: '1',
  date: '01/12/2024',
  amount: 2100,
  method: 'Kredi Kartı',
  status: 'completed',
  policyType: 'Tüm Poliçeler',
  invoiceNumber: 'INV-2024-1201'
},
{
  id: '2',
  date: '01/11/2024',
  amount: 2100,
  method: 'Kredi Kartı',
  status: 'completed',
  policyType: 'Tüm Poliçeler',
  invoiceNumber: 'INV-2024-1101'
},
{
  id: '3',
  date: '01/10/2024',
  amount: 2100,
  method: 'Banka Havalesi',
  status: 'completed',
  policyType: 'Tüm Poliçeler',
  invoiceNumber: 'INV-2024-1001'
}];


export default function ClientPortalInteractive() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-surface rounded-lg w-1/3" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) =>
              <div key={i} className="h-32 bg-surface rounded-lg" />
              )}
            </div>
          </div>
        </div>
      </div>);

  }

  const handleViewPolicyDetails = (id: string) => {
    console.log('Viewing policy:', id);
  };

  const handleViewClaim = (id: string) => {
    console.log('Viewing claim:', id);
  };

  const handleDownloadDocument = (id: string) => {
    console.log('Downloading document:', id);
  };

  const handleViewDocument = (id: string) => {
    console.log('Viewing document:', id);
  };

  const handleQuickAction = (id: string) => {
    console.log('Quick action:', id);
  };

  const handleViewMessage = (id: string) => {
    console.log('Viewing message:', id);
  };

  const handleRenewPolicy = (id: string) => {
    console.log('Renewing policy:', id);
  };

  const handleReadHealthTip = (id: string) => {
    console.log('Reading health tip:', id);
  };

  const handleDownloadInvoice = (id: string) => {
    console.log('Downloading invoice:', id);
  };

  const tabs = [
  { id: 'overview', label: 'Genel Bakış', icon: 'HomeIcon' },
  { id: 'policies', label: 'Poliçelerim', icon: 'ShieldCheckIcon' },
  { id: 'claims', label: 'Taleplerim', icon: 'ClipboardDocumentCheckIcon' },
  { id: 'documents', label: 'Belgelerim', icon: 'FolderIcon' },
  { id: 'payments', label: 'Ödemeler', icon: 'CreditCardIcon' },
  { id: 'messages', label: 'Mesajlar', icon: 'ChatBubbleLeftRightIcon' }];


  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-text-primary mb-2">
                Müşteri Portalı
              </h1>
              <p className="text-text-secondary">
                Hoş geldiniz! Poliçelerinizi yönetin ve sağlık sigortanızdan en iyi şekilde yararlanın.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2.5 bg-surface text-text-primary rounded-lg hover:bg-muted transition-colors duration-base">
                <Icon name="BellIcon" size={20} />
                <span className="text-sm font-medium">Bildirimler</span>
                <span className="px-2 py-0.5 bg-accent text-accent-foreground text-xs font-bold rounded-full">3</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition-colors duration-base">
                <Icon name="UserCircleIcon" size={20} />
                <span className="text-sm font-medium">Profilim</span>
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Icon name="MagnifyingGlassIcon" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              placeholder="Poliçe, talep veya belge ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-surface border border-border rounded-lg text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-base" />

          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {mockStats.map((stat, index) =>
          <StatCard key={index} stat={stat} />
          )}
        </div>

        {/* Renewal Notifications */}
        {mockRenewals.length > 0 &&
        <div className="mb-8 space-y-4">
            <h2 className="text-xl font-semibold text-text-primary flex items-center space-x-2">
              <Icon name="BellAlertIcon" size={24} className="text-warning" />
              <span>Yenileme Bildirimleri</span>
            </h2>
            {mockRenewals.map((renewal) =>
          <RenewalNotification
            key={renewal.id}
            renewal={renewal}
            onRenew={handleRenewPolicy} />

          )}
          </div>
        }

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-text-primary mb-4">Hızlı İşlemler</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockQuickActions.map((action) =>
            <QuickActionCard
              key={action.id}
              action={action}
              onClick={handleQuickAction} />

            )}
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="mb-8">
          <div className="border-b border-border overflow-x-auto">
            <div className="flex space-x-1 min-w-max">
              {tabs.map((tab) =>
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 font-medium text-sm transition-all duration-base ${
                activeTab === tab.id ?
                'text-primary border-b-2 border-primary' : 'text-text-secondary hover:text-text-primary'}`
                }>

                  <Icon name={tab.icon as any} size={18} />
                  <span>{tab.label}</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'overview' &&
          <>
              {/* Active Policies */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-text-primary">Aktif Poliçelerim</h2>
                  <button className="text-sm font-medium text-primary hover:text-primary-hover transition-colors duration-base">
                    Tümünü Gör
                  </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {mockPolicies.slice(0, 2).map((policy) =>
                <PolicyCard
                  key={policy.id}
                  policy={policy}
                  onViewDetails={handleViewPolicyDetails} />

                )}
                </div>
              </div>

              {/* Recent Claims */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-text-primary">Son Taleplerim</h2>
                  <button className="text-sm font-medium text-primary hover:text-primary-hover transition-colors duration-base">
                    Tümünü Gör
                  </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {mockClaims.slice(0, 2).map((claim) =>
                <ClaimCard
                  key={claim.id}
                  claim={claim}
                  onViewClaim={handleViewClaim} />

                )}
                </div>
              </div>

              {/* Messages */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-text-primary">Mesajlar</h2>
                  <button className="text-sm font-medium text-primary hover:text-primary-hover transition-colors duration-base">
                    Tümünü Gör
                  </button>
                </div>
                <div className="space-y-3">
                  {mockMessages.map((message) =>
                <MessageThread
                  key={message.id}
                  message={message}
                  onClick={handleViewMessage} />

                )}
                </div>
              </div>

              {/* Health Tips */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-text-primary">Sağlık İpuçları</h2>
                  <button className="text-sm font-medium text-primary hover:text-primary-hover transition-colors duration-base">
                    Tümünü Gör
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockHealthTips.map((tip) =>
                <HealthTipCard
                  key={tip.id}
                  tip={tip}
                  onRead={handleReadHealthTip} />

                )}
                </div>
              </div>
            </>
          }

          {activeTab === 'policies' &&
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockPolicies.map((policy) =>
            <PolicyCard
              key={policy.id}
              policy={policy}
              onViewDetails={handleViewPolicyDetails} />

            )}
            </div>
          }

          {activeTab === 'claims' &&
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockClaims.map((claim) =>
            <ClaimCard
              key={claim.id}
              claim={claim}
              onViewClaim={handleViewClaim} />

            )}
            </div>
          }

          {activeTab === 'documents' &&
          <div className="space-y-3">
              {mockDocuments.map((document) =>
            <DocumentItem
              key={document.id}
              document={document}
              onDownload={handleDownloadDocument}
              onView={handleViewDocument} />

            )}
            </div>
          }

          {activeTab === 'payments' &&
          <div className="space-y-3">
              {mockPayments.map((payment) =>
            <PaymentHistoryItem
              key={payment.id}
              payment={payment}
              onDownloadInvoice={handleDownloadInvoice} />

            )}
            </div>
          }

          {activeTab === 'messages' &&
          <div className="space-y-3">
              {mockMessages.map((message) =>
            <MessageThread
              key={message.id}
              message={message}
              onClick={handleViewMessage} />

            )}
            </div>
          }
        </div>

        {/* Emergency Support Banner */}
        <div className="mt-12 medical-card p-8 bg-gradient-to-r from-accent/5 to-accent/10 border-l-4 border-accent">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                <Icon name="PhoneIcon" size={24} className="text-accent" variant="solid" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  7/24 Acil Destek Hattı
                </h3>
                <p className="text-text-secondary mb-3">
                  Acil sağlık durumlarında veya sorularınız için her zaman yanınızdayız.
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Icon name="PhoneIcon" size={16} className="text-accent" />
                    <span className="font-semibold text-text-primary">0850 123 45 67</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="EnvelopeIcon" size={16} className="text-accent" />
                    <span className="font-semibold text-text-primary">acil@tsssigorta.com</span>
                  </div>
                </div>
              </div>
            </div>
            <button className="px-8 py-3 bg-accent text-accent-foreground font-medium rounded-lg hover:bg-accent-hover shadow-md hover:shadow-lg transition-all duration-base whitespace-nowrap">
              Hemen Ara
            </button>
          </div>
        </div>
      </div>
    </div>);

}
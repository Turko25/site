import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface PolicyCardProps {
  policy: {
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
  };
  onViewDetails: (id: string) => void;
}

export default function PolicyCard({ policy, onViewDetails }: PolicyCardProps) {
  const statusConfig = {
    active: { color: 'bg-success text-success-foreground', label: 'Aktif' },
    pending: { color: 'bg-warning text-warning-foreground', label: 'Beklemede' },
    expired: { color: 'bg-error text-error-foreground', label: 'Süresi Dolmuş' }
  };

  const currentStatus = statusConfig[policy.status];

  return (
    <div className="medical-card p-6 hover:scale-[1.02] transition-transform duration-base">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-surface">
            <AppImage
              src={policy.image}
              alt={policy.alt}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">{policy.type}</h3>
            <p className="text-sm text-text-secondary">Poliçe No: {policy.policyNumber}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${currentStatus.color}`}>
          {currentStatus.label}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-text-secondary mb-1">Başlangıç Tarihi</p>
          <p className="text-sm font-medium text-text-primary">{policy.startDate}</p>
        </div>
        <div>
          <p className="text-xs text-text-secondary mb-1">Bitiş Tarihi</p>
          <p className="text-sm font-medium text-text-primary">{policy.endDate}</p>
        </div>
        <div>
          <p className="text-xs text-text-secondary mb-1">Aylık Prim</p>
          <p className="text-sm font-medium text-primary">{policy.premium.toLocaleString('tr-TR')} ₺</p>
        </div>
        <div>
          <p className="text-xs text-text-secondary mb-1">Teminat</p>
          <p className="text-sm font-medium text-text-primary">{policy.coverage}</p>
        </div>
      </div>

      <button
        onClick={() => onViewDetails(policy.id)}
        className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition-colors duration-base"
      >
        <span className="text-sm font-medium">Detayları Görüntüle</span>
        <Icon name="ArrowRightIcon" size={16} />
      </button>
    </div>
  );
}
import Icon from '@/components/ui/AppIcon';

interface ClaimCardProps {
  claim: {
    id: string;
    claimNumber: string;
    type: string;
    date: string;
    amount: number;
    status: 'approved' | 'pending' | 'rejected' | 'processing';
    description: string;
  };
  onViewClaim: (id: string) => void;
}

export default function ClaimCard({ claim, onViewClaim }: ClaimCardProps) {
  const statusConfig = {
    approved: { 
      color: 'bg-success text-success-foreground', 
      label: 'Onaylandı',
      icon: 'CheckCircleIcon' as const
    },
    pending: { 
      color: 'bg-warning text-warning-foreground', 
      label: 'Beklemede',
      icon: 'ClockIcon' as const
    },
    rejected: { 
      color: 'bg-error text-error-foreground', 
      label: 'Reddedildi',
      icon: 'XCircleIcon' as const
    },
    processing: { 
      color: 'bg-healthcare-blue text-healthcare-blue-foreground', 
      label: 'İşleniyor',
      icon: 'ArrowPathIcon' as const
    }
  };

  const currentStatus = statusConfig[claim.status];

  return (
    <div className="medical-card p-5 hover:shadow-medical-hover transition-shadow duration-base">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name={currentStatus.icon} size={20} className={`${currentStatus.color.split(' ')[0].replace('bg-', 'text-')}`} variant="solid" />
            <h4 className="text-base font-semibold text-text-primary">{claim.type}</h4>
          </div>
          <p className="text-xs text-text-secondary">Talep No: {claim.claimNumber}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${currentStatus.color}`}>
          {currentStatus.label}
        </span>
      </div>

      <p className="text-sm text-text-secondary mb-3 line-clamp-2">{claim.description}</p>

      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center space-x-4">
          <div>
            <p className="text-xs text-text-secondary">Tarih</p>
            <p className="text-sm font-medium text-text-primary">{claim.date}</p>
          </div>
          <div>
            <p className="text-xs text-text-secondary">Tutar</p>
            <p className="text-sm font-medium text-primary">{claim.amount.toLocaleString('tr-TR')} ₺</p>
          </div>
        </div>
        <button
          onClick={() => onViewClaim(claim.id)}
          className="flex items-center space-x-1 text-sm font-medium text-primary hover:text-primary-hover transition-colors duration-base"
        >
          <span>Detay</span>
          <Icon name="ChevronRightIcon" size={16} />
        </button>
      </div>
    </div>
  );
}
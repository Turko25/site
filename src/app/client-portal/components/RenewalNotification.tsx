import Icon from '@/components/ui/AppIcon';

interface RenewalNotificationProps {
  renewal: {
    id: string;
    policyType: string;
    daysUntilExpiry: number;
    currentPremium: number;
    renewalPremium: number;
  };
  onRenew: (id: string) => void;
}

export default function RenewalNotification({ renewal, onRenew }: RenewalNotificationProps) {
  const isUrgent = renewal.daysUntilExpiry <= 7;

  return (
    <div className={`p-4 rounded-lg border-l-4 ${
      isUrgent 
        ? 'bg-accent/5 border-accent' :'bg-warning/5 border-warning'
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <Icon 
            name={isUrgent ? 'ExclamationTriangleIcon' : 'BellAlertIcon'} 
            size={20} 
            className={isUrgent ? 'text-accent' : 'text-warning'}
            variant="solid"
          />
          <div className="flex-1">
            <h5 className="text-sm font-semibold text-text-primary mb-1">
              {renewal.policyType} Yenileme
            </h5>
            <p className="text-xs text-text-secondary mb-2">
              Poliçenizin süresi {renewal.daysUntilExpiry} gün içinde dolacak
            </p>
            <div className="flex items-center space-x-4 text-xs">
              <div>
                <span className="text-text-secondary">Mevcut: </span>
                <span className="font-medium text-text-primary">{renewal.currentPremium.toLocaleString('tr-TR')} ₺</span>
              </div>
              <div>
                <span className="text-text-secondary">Yeni: </span>
                <span className="font-medium text-primary">{renewal.renewalPremium.toLocaleString('tr-TR')} ₺</span>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => onRenew(renewal.id)}
          className="px-4 py-2 bg-primary text-primary-foreground text-xs font-medium rounded-lg hover:bg-primary-hover transition-colors duration-base whitespace-nowrap ml-3"
        >
          Yenile
        </button>
      </div>
    </div>
  );
}
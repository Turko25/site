import Icon from '@/components/ui/AppIcon';

interface PaymentHistoryItemProps {
  payment: {
    id: string;
    date: string;
    amount: number;
    method: string;
    status: 'completed' | 'pending' | 'failed';
    policyType: string;
    invoiceNumber: string;
  };
  onDownloadInvoice: (id: string) => void;
}

export default function PaymentHistoryItem({ payment, onDownloadInvoice }: PaymentHistoryItemProps) {
  const statusConfig = {
    completed: { 
      color: 'text-success', 
      bgColor: 'bg-success/10',
      label: 'Tamamlandı',
      icon: 'CheckCircleIcon' as const
    },
    pending: { 
      color: 'text-warning', 
      bgColor: 'bg-warning/10',
      label: 'Beklemede',
      icon: 'ClockIcon' as const
    },
    failed: { 
      color: 'text-error', 
      bgColor: 'bg-error/10',
      label: 'Başarısız',
      icon: 'XCircleIcon' as const
    }
  };

  const currentStatus = statusConfig[payment.status];

  return (
    <div className="flex items-center justify-between p-4 bg-surface rounded-lg hover:bg-muted transition-colors duration-base">
      <div className="flex items-center space-x-4 flex-1">
        <div className={`w-10 h-10 rounded-lg ${currentStatus.bgColor} flex items-center justify-center`}>
          <Icon name={currentStatus.icon} size={20} className={currentStatus.color} variant="solid" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h5 className="text-sm font-medium text-text-primary">{payment.policyType}</h5>
            <span className={`px-2 py-0.5 rounded text-xs font-medium ${currentStatus.bgColor} ${currentStatus.color}`}>
              {currentStatus.label}
            </span>
          </div>
          <div className="flex items-center space-x-3 text-xs text-text-secondary">
            <span>{payment.date}</span>
            <span>•</span>
            <span>{payment.method}</span>
            <span>•</span>
            <span>Fatura: {payment.invoiceNumber}</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-base font-semibold text-text-primary">{payment.amount.toLocaleString('tr-TR')} ₺</p>
        </div>
      </div>
      {payment.status === 'completed' && (
        <button
          onClick={() => onDownloadInvoice(payment.id)}
          className="ml-4 p-2 text-text-secondary hover:text-primary hover:bg-primary-light rounded-lg transition-all duration-base"
          aria-label="Faturayı İndir"
        >
          <Icon name="ArrowDownTrayIcon" size={18} />
        </button>
      )}
    </div>
  );
}
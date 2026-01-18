import Icon from '@/components/ui/AppIcon';

interface DocumentItemProps {
  document: {
    id: string;
    name: string;
    type: string;
    size: string;
    date: string;
    category: 'policy' | 'claim' | 'payment' | 'other';
  };
  onDownload: (id: string) => void;
  onView: (id: string) => void;
}

export default function DocumentItem({ document, onDownload, onView }: DocumentItemProps) {
  const categoryIcons = {
    policy: 'DocumentTextIcon' as const,
    claim: 'ClipboardDocumentCheckIcon' as const,
    payment: 'BanknotesIcon' as const,
    other: 'FolderIcon' as const
  };

  const categoryColors = {
    policy: 'text-primary',
    claim: 'text-healthcare-green',
    payment: 'text-secondary',
    other: 'text-text-secondary'
  };

  return (
    <div className="flex items-center justify-between p-4 bg-surface rounded-lg hover:bg-muted transition-colors duration-base">
      <div className="flex items-center space-x-4 flex-1">
        <div className={`w-10 h-10 rounded-lg bg-background flex items-center justify-center ${categoryColors[document.category]}`}>
          <Icon name={categoryIcons[document.category]} size={20} variant="solid" />
        </div>
        <div className="flex-1 min-w-0">
          <h5 className="text-sm font-medium text-text-primary truncate">{document.name}</h5>
          <div className="flex items-center space-x-3 mt-1">
            <span className="text-xs text-text-secondary">{document.type}</span>
            <span className="text-xs text-text-tertiary">•</span>
            <span className="text-xs text-text-secondary">{document.size}</span>
            <span className="text-xs text-text-tertiary">•</span>
            <span className="text-xs text-text-secondary">{document.date}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => onView(document.id)}
          className="p-2 text-text-secondary hover:text-primary hover:bg-primary-light rounded-lg transition-all duration-base"
          aria-label="Görüntüle"
        >
          <Icon name="EyeIcon" size={18} />
        </button>
        <button
          onClick={() => onDownload(document.id)}
          className="p-2 text-text-secondary hover:text-healthcare-green hover:bg-secondary-light rounded-lg transition-all duration-base"
          aria-label="İndir"
        >
          <Icon name="ArrowDownTrayIcon" size={18} />
        </button>
      </div>
    </div>
  );
}
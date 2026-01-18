import Icon from '@/components/ui/AppIcon';

interface Update {
  id: string;
  title: string;
  description: string;
  date: string;
  status: 'new' | 'updated' | 'important';
  category: string;
}

interface RegulatoryUpdatesProps {
  updates: Update[];
}

const statusConfig = {
  new: { label: 'Yeni', color: 'bg-healthcare-green text-healthcare-green-foreground' },
  updated: { label: 'Güncellendi', color: 'bg-primary text-primary-foreground' },
  important: { label: 'Önemli', color: 'bg-accent text-accent-foreground' }
};

export default function RegulatoryUpdates({ updates }: RegulatoryUpdatesProps) {
  return (
    <section className="bg-surface border border-border rounded-xl p-6 lg:p-8">
      <div className="flex items-center mb-6">
        <Icon name="NewspaperIcon" size={28} className="text-primary mr-3" variant="solid" />
        <h2 className="text-2xl font-bold text-text-primary">Düzenleme Güncellemeleri</h2>
      </div>
      
      <div className="space-y-4">
        {updates.map((update, index) => (
          <div key={update.id} className="relative">
            {index !== updates.length - 1 && (
              <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-border" />
            )}
            
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center relative z-10">
                <Icon name="BellAlertIcon" size={20} className="text-primary-foreground" variant="solid" />
              </div>
              
              <div className="flex-1 bg-card border border-border rounded-lg p-5">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-semibold rounded ${statusConfig[update.status].color}`}>
                      {statusConfig[update.status].label}
                    </span>
                    <span className="px-2 py-1 bg-muted text-text-secondary text-xs font-medium rounded">
                      {update.category}
                    </span>
                  </div>
                  <span className="text-xs text-text-tertiary">{update.date}</span>
                </div>
                
                <h3 className="text-base font-semibold text-text-primary mb-2">
                  {update.title}
                </h3>
                
                <p className="text-sm text-text-secondary leading-relaxed">
                  {update.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
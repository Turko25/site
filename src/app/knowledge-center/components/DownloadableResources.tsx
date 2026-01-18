import Icon from '@/components/ui/AppIcon';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: string;
  size: string;
  downloads: number;
  icon: string;
}

interface DownloadableResourcesProps {
  resources: Resource[];
  onDownload: (resourceId: string) => void;
}

export default function DownloadableResources({ resources, onDownload }: DownloadableResourcesProps) {
  return (
    <section className="bg-surface border border-border rounded-xl p-6 lg:p-8">
      <div className="flex items-center mb-6">
        <Icon name="ArrowDownTrayIcon" size={28} className="text-primary mr-3" variant="solid" />
        <h2 className="text-2xl font-bold text-text-primary">İndirilebilir Kaynaklar</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resources.map((resource) => (
          <div
            key={resource.id}
            className="bg-card border border-border rounded-lg p-5 hover:shadow-medical transition-all duration-base"
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={resource.icon as any} size={24} className="text-primary" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-text-primary mb-1 line-clamp-1">
                  {resource.title}
                </h3>
                <p className="text-sm text-text-secondary mb-3 line-clamp-2">
                  {resource.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 text-xs text-text-tertiary">
                    <span className="flex items-center space-x-1">
                      <Icon name="DocumentIcon" size={14} />
                      <span>{resource.type}</span>
                    </span>
                    <span>{resource.size}</span>
                    <span className="flex items-center space-x-1">
                      <Icon name="ArrowDownTrayIcon" size={14} />
                      <span>{resource.downloads}</span>
                    </span>
                  </div>
                  
                  <button
                    onClick={() => onDownload(resource.id)}
                    className="px-3 py-1.5 bg-primary text-primary-foreground text-xs font-semibold rounded hover:bg-primary-hover transition-colors duration-base"
                  >
                    İndir
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
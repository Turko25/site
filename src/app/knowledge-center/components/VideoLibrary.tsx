import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Video {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  thumbnailAlt: string;
  views: number;
  expert: {
    name: string;
    title: string;
  };
}

interface VideoLibraryProps {
  videos: Video[];
  onVideoClick: (videoId: string) => void;
}

export default function VideoLibrary({ videos, onVideoClick }: VideoLibraryProps) {
  return (
    <section className="bg-surface border border-border rounded-xl p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-text-primary flex items-center">
          <Icon name="PlayCircleIcon" size={28} className="text-primary mr-3" variant="solid" />
          Video Kütüphanesi
        </h2>
        <button className="text-primary font-medium hover:text-primary-hover transition-colors duration-base flex items-center space-x-1">
          <span>Tümünü Gör</span>
          <Icon name="ArrowRightIcon" size={16} />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            onClick={() => onVideoClick(video.id)}
            className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-medical transition-all duration-base cursor-pointer group"
          >
            <div className="relative h-44 overflow-hidden bg-muted">
              <AppImage
                src={video.thumbnail}
                alt={video.thumbnailAlt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-slow"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-base">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="PlayIcon" size={28} className="text-primary-foreground ml-1" variant="solid" />
                </div>
              </div>
              <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 text-white text-xs font-semibold rounded">
                {video.duration}
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-base font-semibold text-text-primary mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-base">
                {video.title}
              </h3>
              
              <p className="text-sm text-text-secondary mb-3 line-clamp-2">
                {video.description}
              </p>
              
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div>
                  <p className="text-xs font-medium text-text-primary">{video.expert.name}</p>
                  <p className="text-xs text-text-tertiary">{video.expert.title}</p>
                </div>
                <div className="flex items-center space-x-1 text-text-tertiary text-xs">
                  <Icon name="EyeIcon" size={14} />
                  <span>{video.views.toLocaleString('tr-TR')}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
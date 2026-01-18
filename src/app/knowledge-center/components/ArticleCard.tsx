import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: number;
  publishDate: string;
  image: string;
  alt: string;
  author: {
    name: string;
    avatar: string;
    avatarAlt: string;
  };
}

interface ArticleCardProps {
  article: Article;
  onArticleClick: (articleId: string) => void;
}

export default function ArticleCard({ article, onArticleClick }: ArticleCardProps) {
  return (
    <article className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-medical transition-all duration-base group cursor-pointer">
      <div className="relative h-48 overflow-hidden bg-muted">
        <AppImage
          src={article.image}
          alt={article.alt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-slow"
        />
        <div className="absolute top-4 left-4">
          <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
            {article.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-text-primary mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-base">
          {article.title}
        </h3>
        
        <p className="text-text-secondary text-sm mb-4 line-clamp-3 leading-relaxed">
          {article.excerpt}
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center space-x-3">
            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-muted">
              <AppImage
                src={article.author.avatar}
                alt={article.author.avatarAlt}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm font-medium text-text-primary">{article.author.name}</span>
          </div>
          
          <div className="flex items-center space-x-4 text-text-tertiary text-sm">
            <span className="flex items-center space-x-1">
              <Icon name="ClockIcon" size={16} />
              <span>{article.readTime} dk</span>
            </span>
          </div>
        </div>
        
        <button
          onClick={() => onArticleClick(article.id)}
          className="mt-4 w-full flex items-center justify-center space-x-2 px-4 py-2.5 bg-primary/5 text-primary font-medium rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-base"
        >
          <span>Devamını Oku</span>
          <Icon name="ArrowRightIcon" size={16} />
        </button>
      </div>
    </article>
  );
}
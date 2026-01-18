import Icon from '@/components/ui/AppIcon';

interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

interface CategoryFilterProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export default function CategoryFilter({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="bg-surface border border-border rounded-xl p-6">
      <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
        <Icon name="FunnelIcon" size={20} className="text-primary mr-2" />
        Kategoriler
      </h3>
      
      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-base ${
              activeCategory === category.id
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-background hover:bg-muted text-text-primary'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Icon 
                name={category.icon as any} 
                size={20} 
                className={activeCategory === category.id ? 'text-primary-foreground' : 'text-text-secondary'} 
              />
              <span className="font-medium">{category.name}</span>
            </div>
            <span className={`text-sm font-semibold px-2 py-1 rounded ${
              activeCategory === category.id
                ? 'bg-primary-foreground/20'
                : 'bg-muted text-text-secondary'
            }`}>
              {category.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
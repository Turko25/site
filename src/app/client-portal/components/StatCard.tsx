import Icon from '@/components/ui/AppIcon';

interface StatCardProps {
  stat: {
    label: string;
    value: string;
    icon: string;
    color: string;
    bgColor: string;
    trend?: {
      value: string;
      isPositive: boolean;
    };
  };
}

export default function StatCard({ stat }: StatCardProps) {
  return (
    <div className="medical-card p-6">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
          <Icon name={stat.icon as any} size={24} className={stat.color} variant="solid" />
        </div>
        {stat.trend && (
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${stat.trend.isPositive ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}`}>
            <Icon name={stat.trend.isPositive ? 'ArrowUpIcon' : 'ArrowDownIcon'} size={12} />
            <span className="text-xs font-medium">{stat.trend.value}</span>
          </div>
        )}
      </div>
      <p className="text-sm text-text-secondary mb-1">{stat.label}</p>
      <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
    </div>
  );
}
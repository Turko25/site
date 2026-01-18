import Icon from '@/components/ui/AppIcon';

interface QuickActionCardProps {
  action: {
    id: string;
    title: string;
    description: string;
    icon: string;
    color: string;
    bgColor: string;
  };
  onClick: (id: string) => void;
}

export default function QuickActionCard({ action, onClick }: QuickActionCardProps) {
  return (
    <button
      onClick={() => onClick(action.id)}
      className="medical-card p-6 text-left hover:scale-[1.02] transition-transform duration-base w-full"
    >
      <div className={`w-12 h-12 rounded-xl ${action.bgColor} flex items-center justify-center mb-4`}>
        <Icon name={action.icon as any} size={24} className={action.color} variant="solid" />
      </div>
      <h3 className="text-base font-semibold text-text-primary mb-2">{action.title}</h3>
      <p className="text-sm text-text-secondary">{action.description}</p>
    </button>
  );
}
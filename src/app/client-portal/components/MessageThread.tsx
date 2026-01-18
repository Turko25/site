import AppImage from '@/components/ui/AppImage';


interface MessageThreadProps {
  message: {
    id: string;
    agentName: string;
    agentImage: string;
    agentAlt: string;
    subject: string;
    preview: string;
    date: string;
    unread: boolean;
  };
  onClick: (id: string) => void;
}

export default function MessageThread({ message, onClick }: MessageThreadProps) {
  return (
    <button
      onClick={() => onClick(message.id)}
      className={`w-full p-4 rounded-lg text-left transition-all duration-base ${
        message.unread 
          ? 'bg-primary-light hover:bg-primary-light/80' :'bg-surface hover:bg-muted'
      }`}
    >
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
          <AppImage
            src={message.agentImage}
            alt={message.agentAlt}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h5 className={`text-sm font-semibold ${message.unread ? 'text-primary' : 'text-text-primary'}`}>
              {message.agentName}
            </h5>
            <span className="text-xs text-text-secondary">{message.date}</span>
          </div>
          <p className={`text-sm mb-1 ${message.unread ? 'font-medium text-text-primary' : 'text-text-secondary'}`}>
            {message.subject}
          </p>
          <p className="text-xs text-text-secondary line-clamp-1">{message.preview}</p>
        </div>
        {message.unread && (
          <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
        )}
      </div>
    </button>
  );
}
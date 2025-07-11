import { User, Feather } from 'lucide-react';

export default function ChatMessage({ message, isUser }) {
  return (
    <div className="flex gap-4 group">
      {/* Avatar */}
      <div className="flex-shrink-0">
        {isUser ? (
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
        ) : (
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg flex items-center justify-center">
            <Feather className="w-4 h-4 text-white" />
          </div>
        )}
      </div>
      
      {/* Message Content */}
      <div className="flex-1 space-y-1">
        <div className={`text-sm font-medium ${
          isUser ? 'text-blue-700' : 'text-green-700'
        }`}>
          {isUser ? '나' : '초록시인'}
        </div>
        <div className="prose prose-sm max-w-none">
          <div className={`leading-relaxed whitespace-pre-wrap ${
            isUser 
              ? 'text-blue-900 bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400' 
              : 'text-gray-800'
          }`}>
            {message}
          </div>
        </div>
      </div>
    </div>
  );
}

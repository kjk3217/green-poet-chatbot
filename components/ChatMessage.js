import { User, Bot } from 'lucide-react';

export default function ChatMessage({ message, isUser }) {
  return (
    <div className={`flex gap-3 p-4 ${isUser ? 'bg-blue-50' : 'bg-green-50'} rounded-lg mb-4`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isUser ? 'bg-blue-500' : 'bg-green-500'
      }`}>
        {isUser ? (
          <User className="w-5 h-5 text-white" />
        ) : (
          <Bot className="w-5 h-5 text-white" />
        )}
      </div>
      <div className="flex-1">
        <div className={`font-medium text-sm mb-1 ${
          isUser ? 'text-blue-700' : 'text-green-700'
        }`}>
          {isUser ? '학생' : '초록시인'}
        </div>
        <div className="text-gray-800 whitespace-pre-wrap leading-relaxed">
          {message}
        </div>
      </div>
    </div>
  );
}
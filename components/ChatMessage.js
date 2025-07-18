import { User, Feather, Heart, Leaf } from 'lucide-react';

export default function ChatMessage({ message, isUser }) {
  return (
    <div className="flex gap-4 group mb-6">
      <div className="flex-shrink-0">
        {isUser ? (
          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg">
            <Heart className="w-5 h-5 text-white" />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg" style={{background: 'linear-gradient(135deg, #588158 0%, #3b5a42 100%)'}}>
            <Leaf className="w-5 h-5 text-white" />
          </div>
        )}
      </div>
      
      <div className="flex-1 space-y-1">
        <div className={`text-sm font-semibold ${
          isUser ? 'text-purple-600' : ''
        }`} style={!isUser ? {color: '#588158'} : {}}>
          {isUser ? '나' : '초록시인'}
        </div>
        <div className="prose prose-sm max-w-none">
          <div className={`leading-relaxed whitespace-pre-wrap rounded-2xl p-4 border shadow-sm`} style={
            isUser 
              ? {
                  color: '#334e41',
                  background: '#fbfbfa',
                  borderColor: '#a1b189'
                }
              : {
                  color: '#334e41',
                  background: '#d8e0cc',
                  borderColor: '#a1b189'
                }
          }>
            {message}
          </div>
        </div>
      </div>
    </div>
  );
}

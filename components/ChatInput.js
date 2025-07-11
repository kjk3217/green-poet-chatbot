import { useState } from 'react';
import { Send, Paperclip } from 'lucide-react';

export default function ChatInput({ onSend, disabled }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit}>
        <div className="relative flex items-end border border-gray-200 rounded-2xl bg-white focus-within:border-gray-300 transition-colors">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="창작시에 대해 궁금한 것을 물어보세요..."
            className="flex-1 p-4 pr-12 border-0 resize-none focus:outline-none focus:ring-0 rounded-2xl max-h-32 min-h-[52px]"
            disabled={disabled}
            rows={1}
            style={{
              height: 'auto',
              minHeight: '52px',
              maxHeight: '128px',
              overflowY: message.split('\n').length > 3 ? 'auto' : 'hidden'
            }}
            onInput={(e) => {
              e.target.style.height = 'auto';
              e.target.style.height = Math.min(e.target.scrollHeight, 128) + 'px';
            }}
          />
          
          <div className="absolute right-2 bottom-2 flex items-center gap-1">
            <button
              type="submit"
              disabled={!message.trim() || disabled}
              className="w-8 h-8 bg-gray-900 hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg flex items-center justify-center transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </form>
      
      <div className="flex items-center justify-between mt-2 px-1">
        <div className="text-xs text-gray-500">
          Shift + Enter로 줄바꿈
        </div>
        <div className="text-xs text-gray-400">
          {message.length}/2000
        </div>
      </div>
    </div>
  );
}

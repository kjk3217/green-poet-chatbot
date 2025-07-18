import { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import { Send } from 'lucide-react';

const ChatInput = forwardRef(({ onSend, disabled }, ref) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }
  }));

  const handleSubmit = () => {
    if (message.trim() && !disabled) {
      onSend(message);
      setMessage('');
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
        }
      }, 50);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 128) + 'px';
  };

  return (
    <div className="relative">
      <div 
        className="relative flex items-end border-2 rounded-2xl bg-white transition-all duration-200"
        style={{
          borderColor: '#d6aebd',
          ':focus-within': {
            borderColor: '#bb7c93',
            boxShadow: '0 10px 15px -3px rgba(88, 129, 88, 0.1), 0 4px 6px -2px rgba(88, 129, 88, 0.05)'
          }
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = '#bb7c93';
          e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(88, 129, 88, 0.1), 0 4px 6px -2px rgba(88, 129, 88, 0.05)';
        }}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) {
            e.currentTarget.style.borderColor = '#d6aebd';
            e.currentTarget.style.boxShadow = 'none';
          }
        }}
      >
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="창작시에 대해 궁금한 것을 물어보세요... 🌱"
          className="flex-1 p-4 pr-14 border-0 resize-none focus:outline-none focus:ring-0 rounded-2xl max-h-32 min-h-[56px] placeholder-gray-400 text-gray-700"
          disabled={disabled}
          rows={1}
          style={{
            height: 'auto',
            minHeight: '56px',
            maxHeight: '128px',
          }}
          onFocus={(e) => {
            e.target.parentElement.style.borderColor = '#588158';
            e.target.parentElement.style.boxShadow = '0 10px 15px -3px rgba(88, 129, 88, 0.1), 0 4px 6px -2px rgba(88, 129, 88, 0.05)';
          }}
        />
        
        <div className="absolute right-3 bottom-3 flex items-center gap-1">
          <button
            onClick={handleSubmit}
            disabled={!message.trim() || disabled}
            className="w-10 h-10 text-white rounded-xl flex items-center justify-center transition-all duration-200 shadow-lg disabled:cursor-not-allowed"
            style={{
              background: !message.trim() || disabled 
                ? 'linear-gradient(135deg, #d1d5db 0%, #9ca3af 100%)'
                : 'linear-gradient(135deg, #d6aebd 0%, #bb7c93 100%)',
              ':hover': !message.trim() || disabled 
                ? {}
                : {
                  background: 'linear-gradient(135deg, #3b5a42 0%, #334e41 100%)'
                }
            }}
            onMouseEnter={(e) => {
              if (!(!message.trim() || disabled)) {
                e.target.style.background = 'linear-gradient(135deg, #d6aebd 0%, #bb7c93 100%)';
              }
            }}
            onMouseLeave={(e) => {
              if (!(!message.trim() || disabled)) {
                e.target.style.background = 'linear-gradient(135deg, #bb7c93 0%, #d6aebd 100%)';
              }
            }}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-3 px-2">
        <div className="text-xs flex items-center gap-1" style={{color: '#d6aebd'}}>
          Shift + Enter로 줄바꿈
        </div>
        <div className="text-xs" style={{color: '#d6aebd'}}>
          {message.length}/2000
        </div>
      </div>
    </div>
  );
});

ChatInput.displayName = 'ChatInput';

export default ChatInput;

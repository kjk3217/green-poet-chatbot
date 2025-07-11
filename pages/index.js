import { useState, useRef, useEffect } from 'react';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import { Feather, Sparkles, RotateCcw } from 'lucide-react';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ 
      behavior: "smooth",
      block: "end",
      inline: "nearest" 
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message) => {
    const userMessage = { text: message, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // 메시지 전송 후 즉시 입력창에 포커스 유지
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      
      if (response.ok) {
        const botMessage = { text: data.reply, isUser: false };
        setMessages(prev => [...prev, botMessage]);
      } else {
        throw new Error(data.message || '오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { 
        text: '죄송해요. 잠시 문제가 발생했어요. 다시 시도해주세요.', 
        isUser: false 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      // 응답 완료 후에도 포커스 유지
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 200);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Minimal Header */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg flex items-center justify-center">
              <Feather className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-medium text-gray-900">초록시인</h1>
              <p className="text-xs text-gray-500">저탄소 녹색성장 창작시 AI 도우미</p>
            </div>
          </div>
          {messages.length > 0 && (
            <button
              onClick={handleNewChat}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              새 대화
            </button>
          )}
        </div>
      </header>

      {/* Chat Container */}
      <main className="flex-1 flex flex-col max-w-3xl mx-auto w-full">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 py-6 scroll-smooth">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center max-w-md">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-xl font-medium text-gray-900 mb-3">
                  안녕하세요, 초록시인입니다
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  저탄소 녹색성장을 주제로 한 창작시를 함께 만들어봐요.
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    "환경 보호를 비유로 어떻게 표현할까?",
                    "지구의 현재 모습을 계절로 비유한다면?",
                    "녹색성장을 의인법으로 표현해줘",
                    "저탄소 생활을 시로 써보고 싶어"
                  ].map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSendMessage(suggestion)}
                      className="p-3 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((message, index) => (
                <ChatMessage
                  key={index}
                  message={message.text}
                  isUser={message.isUser}
                />
              ))}
              
              {isLoading && (
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Feather className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex gap-1 mb-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
        
        {/* Input Area */}
        <div className="border-t border-gray-100 bg-white px-4 py-4">
          <ChatInput 
            ref={inputRef}
            onSend={handleSendMessage} 
            disabled={isLoading} 
          />
        </div>
      </main>
    </div>
  );
}

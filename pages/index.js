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
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

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
        body: JSON.stringify({ 
          message,
          conversationHistory: messages
        }),
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
    <div className="min-h-screen flex flex-col" style={{background: 'linear-gradient(135deg, #dcd7cb 0%, #f5f3ed 50%, #dcd7cb 100%)'}}>
      {/* 헤더 */}
      <header className="bg-white/90 backdrop-blur-sm sticky top-0 z-10 shadow-sm" style={{borderBottom: '1px solid #a1b189'}}>
        <div className="max-w-3xl mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg" style={{background: 'linear-gradient(135deg, #588158 0%, #3b5a42 100%)'}}>
              <Feather className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold" style={{background: 'linear-gradient(135deg, #3b5a42 0%, #334e41 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent'}}>
                🌱 초록시인
              </h1>
              <p className="text-sm font-medium" style={{color: '#588158'}}>창작시 AI 도우미</p>
            </div>
          </div>
          {messages.length > 0 && (
            <button
              onClick={handleNewChat}
              className="flex items-center gap-2 px-4 py-2 text-sm rounded-xl transition-all duration-200 border"
              style={{
                color: '#588158',
                borderColor: '#a1b189',
                ':hover': {
                  backgroundColor: '#dcd7cb',
                  color: '#3b5a42'
                }
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#dcd7cb';
                e.target.style.color = '#3b5a42';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#588158';
              }}
            >
              <RotateCcw className="w-4 h-4" />
              새 대화
            </button>
          )}
        </div>
      </header>

      {/* 채팅 영역 */}
      <main className="flex-1 flex flex-col max-w-3xl mx-auto w-full">
        <div className="flex-1 overflow-y-auto px-4 py-6 scroll-smooth">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center max-w-md">
                
                <h2 className="text-2xl font-bold mb-4" style={{background: 'linear-gradient(135deg, #3b5a42 0%, #334e41 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent'}}>
                  안녕하세요, 초록시인입니다
                </h2>
                <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                  저탄소 녹색성장을 주제로 한 창작시를 함께 만들어봐요.
                </p>
                
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { text: "환경 보호를 비유로 어떻게 표현할까?", icon: "🌿" },
                    { text: "지구의 현재 모습을 계절로 비유한다면?", icon: "🌍" },
                    { text: "저탄소 생활을 시로 써보고 싶어", icon: "♻️" },
                    { text: "자연을 생명으로 써보고 싶어", icon: "🌸" }
                  ].map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSendMessage(suggestion.text)}
                      className="group p-4 text-sm text-gray-700 bg-white rounded-xl transition-all duration-300 text-left shadow-sm hover:shadow-md"
                      style={{
                        borderColor: '#a1b189',
                        border: '1px solid #a1b189'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'white';
                        e.target.style.borderColor = '#588158';
                        e.target.querySelector('span:last-child').style.color = '#3b5a42';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'white';
                        e.target.style.borderColor = '#a1b189';
                        e.target.querySelector('span:last-child').style.color = '#374151';
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{suggestion.icon}</span>
                        <span className="transition-colors">{suggestion.text}</span>
                      </div>
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
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg" style={{background: 'linear-gradient(135deg, #588158 0%, #3b5a42 100%)'}}>
                    <Feather className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 pt-2">
                    <div className="flex gap-1 mb-2">
                      <div className="w-3 h-3 rounded-full animate-bounce" style={{backgroundColor: '#588158'}}></div>
                      <div className="w-3 h-3 rounded-full animate-bounce" style={{backgroundColor: '#a1b189', animationDelay: '0.2s'}}></div>
                      <div className="w-3 h-3 rounded-full animate-bounce" style={{backgroundColor: '#3b5a42', animationDelay: '0.4s'}}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
        
        <div className="px-4 py-4 backdrop-blur-sm" style={{borderTop: '1px solid rgba(161, 177, 137, 0.3)'}}>
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

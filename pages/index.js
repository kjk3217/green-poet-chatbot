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

  // 파티클 생성
  useEffect(() => {
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.width = (Math.random() * 4 + 2) + 'px';
      particle.style.height = particle.style.width;
      particle.style.animationDelay = Math.random() * 15 + 's';
      
      const container = document.querySelector('.floating-particles');
      if (container) {
        container.appendChild(particle);
        
        // 애니메이션 완료 후 파티클 제거
        setTimeout(() => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        }, 25000);
      }
    };

    // 초기 파티클 생성
    for (let i = 0; i < 10; i++) {
      setTimeout(createParticle, i * 1000);
    }

    // 주기적으로 파티클 생성
    const interval = setInterval(createParticle, 3000);

    return () => clearInterval(interval);
  }, []);

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
    <div className="min-h-screen animated-background flex flex-col relative">
      {/* 떠다니는 파티클 컨테이너 */}
      <div className="floating-particles"></div>
      
      {/* 웨이브 효과 */}
      <div className="wave-container">
        <div className="wave"></div>
        <div className="wave"></div>
      </div>

      {/* 헤더 */}
      <header className="border-b border-green-100/50 bg-white/80 backdrop-blur-md sticky top-0 z-10 shadow-lg">
        <div className="max-w-3xl mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 via-emerald-400 to-teal-400 rounded-2xl flex items-center justify-center shadow-xl animate-pulse">
              <Feather className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                🌱 초록시인
              </h1>
              <p className="text-sm text-emerald-600 font-medium">저탄소 녹색성장 창작시 AI 도우미</p>
            </div>
          </div>
          {messages.length > 0 && (
            <button
              onClick={handleNewChat}
              className="flex items-center gap-2 px-4 py-2 text-sm text-green-600 hover:text-green-700 hover:bg-white/60 rounded-xl transition-all duration-300 border border-green-200/50 backdrop-blur-sm shadow-md hover:shadow-lg"
            >
              <RotateCcw className="w-4 h-4" />
              새 대화
            </button>
          )}
        </div>
      </header>

      {/* 채팅 영역 */}
      <main className="flex-1 flex flex-col max-w-3xl mx-auto w-full relative z-5">
        <div className="flex-1 overflow-y-auto px-4 py-6 scroll-smooth">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center max-w-md">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-400 via-emerald-400 to-teal-400 rounded-3xl flex items-center justify-center mx-auto shadow-2xl transform hover:scale-105 transition-transform duration-300">
                    <Sparkles className="w-10 h-10 text-white animate-pulse" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                    <span className="text-white text-sm">✨</span>
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                  안녕하세요, 초록시인입니다
                </h2>
                <p className="text-gray-700 leading-relaxed mb-8 text-lg backdrop-blur-sm bg-white/40 p-4 rounded-2xl shadow-lg">
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
                      className="group p-4 text-sm text-gray-700 bg-white/70 hover:bg-white/90 rounded-xl transition-all duration-300 text-left border border-green-200/50 hover:border-green-300 shadow-lg hover:shadow-xl backdrop-blur-sm transform hover:scale-[1.02]"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg transform group-hover:scale-110 transition-transform">{suggestion.icon}</span>
                        <span className="group-hover:text-green-700 transition-colors">{suggestion.text}</span>
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
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 via-emerald-400 to-teal-400 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg animate-pulse">
                    <Feather className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 pt-2">
                    <div className="flex gap-1 mb-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-bounce"></div>
                      <div className="w-3 h-3 bg-emerald-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-3 h-3 bg-teal-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
        
        <div className="border-t border-green-100/50 bg-white/60 backdrop-blur-md px-4 py-4 shadow-xl">
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

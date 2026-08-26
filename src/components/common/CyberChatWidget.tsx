import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Send,
  RotateCcw,
  User,
  ShieldCheck,
  Loader2,
  ChevronDown
} from 'lucide-react';
import { sendChatMessage } from '../../services/chatService';
import { useLanguage } from '../../context/LanguageContext';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

const QUICK_PROMPTS = [
  '🚨 Report Financial Fraud',
  '📞 How does 1930 work?',
  '🔍 How to track complaint?',
  '🛡️ Identity theft advice',
];

const INITIAL_BOT_GREETING: Message = {
  id: 'init-greeting',
  sender: 'bot',
  text: 'Namaste! I am Rakshika, your digital safety assistant. How can I help you today?',
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
};

/**
 * Friendly female cyber safety guide avatar vector
 */
const RakshikaAvatar: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <div
    className={`relative rounded-full overflow-hidden shrink-0 flex items-center justify-center bg-gradient-to-tr from-sky-600 via-indigo-600 to-blue-500 ring-2 ring-white/30 shadow-xs ${className}`}
  >
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Hair back */}
      <circle cx="32" cy="28" r="16" fill="#1E293B" />
      {/* Neck */}
      <rect x="29" y="37" width="6" height="8" rx="2" fill="#F4C095" />
      {/* Blazer / Uniform */}
      <path d="M16 58C16 46 22 42 32 42C42 42 48 46 48 58" fill="#0B2235" />
      {/* Inner Collar */}
      <path d="M26 43L32 51L38 43" fill="#38BDF8" />
      {/* Face */}
      <ellipse cx="32" cy="29.5" rx="10.5" ry="11.5" fill="#FCD7B6" />
      {/* Front Hair style */}
      <path
        d="M21.5 27.5C21.5 19.5 25 16.5 32 16.5C39 16.5 42.5 19.5 42.5 27.5C42.5 22.5 38 19.5 32 19.5C26 19.5 21.5 22.5 21.5 27.5Z"
        fill="#0F172A"
      />
      {/* Side Locks */}
      <path d="M21.5 27C21.5 33 22.5 36 23.5 37" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
      <path d="M42.5 27C42.5 33 41.5 36 40.5 37" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
      {/* Eyes */}
      <circle cx="28" cy="29.5" r="1.3" fill="#1E293B" />
      <circle cx="36" cy="29.5" r="1.3" fill="#1E293B" />
      {/* Smile */}
      <path
        d="M29 34.5C30.5 36 33.5 36 35 34.5"
        stroke="#9A3412"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Subtle Bindi */}
      <circle cx="32" cy="25.5" r="0.9" fill="#BE123C" />
      {/* Digital Safety Headset */}
      <path
        d="M22 28.5C21 28.5 20.5 30.5 20.5 32.5"
        stroke="#38BDF8"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="20.5" cy="32.5" r="1.5" fill="#0284C7" />
      <path
        d="M20.5 32.5C22 36.5 24.5 37.5 26.5 37.5"
        stroke="#38BDF8"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="26.5" cy="37.5" r="1.2" fill="#38BDF8" />
    </svg>
  </div>
);

export const CyberChatWidget: React.FC = () => {
  const { currentLang } = useLanguage();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showWelcomeTooltip, setShowWelcomeTooltip] = useState<boolean>(true);
  const [messages, setMessages] = useState<Message[]>([INITIAL_BOT_GREETING]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sessionId, setSessionId] = useState<string>(() =>
    `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
  );

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Auto-scroll to bottom on new message or loading state change
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend ?? inputValue).trim();
    if (!query || isLoading) return;

    const userMessage: Message = {
      id: `msg_${Date.now()}_user`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    const activeSession = sessionId || `session_${Date.now()}`;

    const response = await sendChatMessage(query, activeSession, currentLang);

    const botMessage: Message = {
      id: `msg_${Date.now()}_bot`,
      sender: 'bot',
      text: response.reply,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, botMessage]);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearHistory = () => {
    const newGreeting: Message = {
      ...INITIAL_BOT_GREETING,
      id: `init-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    const newSession = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    setSessionId(newSession);
    setMessages([newGreeting]);
  };

  return (
    <>
      {/* Floating Container (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
        {/* Minimal Welcome Callout Tooltip */}
        {!isOpen && showWelcomeTooltip && (
          <div className="pointer-events-auto mb-2 flex items-center gap-1.5 bg-white text-slate-800 text-xs font-medium py-1 px-3 rounded-full shadow-md border border-slate-200 whitespace-nowrap animate-in fade-in slide-in-from-bottom-1 duration-200">
            <button
              type="button"
              onClick={() => {
                setIsOpen(true);
                setShowWelcomeTooltip(false);
              }}
              className="hover:text-blue-600 transition-colors text-left flex items-center gap-1"
            >
              <span>💬 Need help? Ask Rakshika</span>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowWelcomeTooltip(false);
              }}
              className="text-slate-400 hover:text-slate-600 rounded-full p-0.5 ml-0.5 transition-colors"
              aria-label="Dismiss tooltip"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Sleek Floating Launcher Button */}
        <button
          type="button"
          onClick={() => {
            setIsOpen((prev) => !prev);
            setShowWelcomeTooltip(false);
          }}
          className="pointer-events-auto rounded-full p-1.5 pr-4 flex items-center gap-3 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white ring-1 ring-white/15 shadow-xl shadow-indigo-950/30 backdrop-blur-md transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-900/40 hover:ring-white/30 active:scale-95 active:translate-y-0 group"
          aria-label={isOpen ? 'Close Rakshika AI Assistant' : 'Ask Rakshika AI Assistant'}
        >
          <div className="relative">
            <RakshikaAvatar className="w-8 h-8 group-hover:scale-105 transition-transform" />
            <span className="absolute -bottom-0.5 -right-0.5 relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 ring-2 ring-slate-900"></span>
            </span>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-semibold text-white tracking-tight flex items-center gap-1.5">
              Ask Rakshika
            </span>
            <span className="text-[9.5px] text-sky-400 font-normal leading-none">
              AI Assistant
            </span>
          </div>
          {isOpen && <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />}
        </button>
      </div>

      {/* Minimalist Chat Drawer */}
      {isOpen && (
        <aside
          aria-label="Rakshika AI Chat Assistant"
          className="fixed bottom-20 right-6 w-96 max-w-[calc(100vw-2rem)] h-[520px] max-h-[80vh] rounded-2xl border border-slate-200 shadow-2xl bg-white overflow-hidden flex flex-col z-50 animate-in slide-in-from-bottom-3 duration-200"
        >
          {/* Header */}
          <header className="px-4 py-3 bg-[#0B2235] text-white flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <RakshikaAvatar className="w-8 h-8" />
                <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 ring-2 ring-[#0B2235]"></span>
                </span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-semibold text-sm text-white leading-tight">Rakshika</h3>
                  <span className="inline-flex items-center text-[9px] font-medium px-1.5 py-0.2 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/25">
                    Online
                  </span>
                </div>
                <p className="text-[10px] text-slate-300 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-sky-300" />
                  AI Safety Assistant • I4C
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleClearHistory}
                title="Clear conversation"
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Clear chat history"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close chat assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </header>

          {/* Quick Action Chips */}
          <div className="px-3 py-2 bg-slate-50/80 border-b border-slate-200/70 flex items-center gap-1.5 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                disabled={isLoading}
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap px-2.5 py-1 text-xs font-medium bg-white text-slate-700 rounded-full border border-slate-200 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-xs shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Message History */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/40">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && <RakshikaAvatar className="w-6 h-6 mb-1" />}

                  <div
                    className={`max-w-[82%] shadow-xs break-words ${
                      isUser
                        ? 'bg-blue-600 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm'
                        : 'bg-slate-100 text-slate-800 rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm border border-slate-200/60 leading-relaxed'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                    <span
                      className={`text-[9.5px] mt-1 block text-right ${
                        isUser ? 'text-blue-100' : 'text-slate-400'
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>

                  {isUser && (
                    <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center shrink-0 mb-1">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Thinking / Typing indicator */}
            {isLoading && (
              <div className="flex items-end gap-2 justify-start">
                <RakshikaAvatar className="w-6 h-6 mb-1" />
                <div className="bg-slate-100 text-slate-700 border border-slate-200/60 rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm shadow-xs flex items-center gap-1.5">
                  <span className="text-xs text-slate-500 font-normal mr-1">Rakshika is typing</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Ultra-subtle Emergency Notice */}
          <div className="px-3 py-1.5 bg-amber-50/90 border-t border-amber-200/60 text-center text-[10.5px] text-amber-900 font-medium">
            ⚡ Emergency financial loss? Call <strong>1930</strong> immediately.
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <div className="flex-1 relative flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask Rakshika anything..."
                disabled={isLoading}
                className="w-full pl-3.5 pr-10 py-2 text-sm bg-slate-100/90 border border-slate-200 rounded-full focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900 placeholder:text-slate-400 disabled:opacity-60 transition-all"
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="absolute right-1.5 p-1.5 rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40 disabled:hover:bg-blue-600 disabled:cursor-not-allowed transition-all shadow-xs"
                aria-label="Send message"
              >
                {isLoading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </form>
        </aside>
      )}
    </>
  );
};

export default CyberChatWidget;

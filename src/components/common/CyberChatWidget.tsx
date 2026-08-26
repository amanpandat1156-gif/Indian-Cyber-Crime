import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  X,
  Send,
  RotateCcw,
  Sparkles,
  Bot,
  User,
  ShieldCheck,
  PhoneCall,
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

const STORAGE_SESSION_KEY = 'ncrp_cyberdost_session_id';
const STORAGE_MESSAGES_KEY = 'ncrp_cyberdost_chat_history';

const QUICK_PROMPTS = [
  '🚨 Report Financial Fraud',
  '📞 How does 1930 work?',
  '🔍 How to track complaint?',
  '🛡️ Identity theft advice',
];

const INITIAL_BOT_GREETING: Message = {
  id: 'init-greeting',
  sender: 'bot',
  text: 'Namaste! I am CyberDost, your 24/7 AI Citizen Safety Assistant. How can I help you today with reporting cybercrime, 1930 helpline guidance, or digital safety advice?',
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
};

export const CyberChatWidget: React.FC = () => {
  const { currentLang } = useLanguage();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_MESSAGES_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Ignore parse errors and fallback
    }
    return [INITIAL_BOT_GREETING];
  });
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sessionId, setSessionId] = useState<string>('');

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Initialize or retrieve Session ID from localStorage
  useEffect(() => {
    let currentSession = localStorage.getItem(STORAGE_SESSION_KEY);
    if (!currentSession) {
      currentSession = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem(STORAGE_SESSION_KEY, currentSession);
    }
    setSessionId(currentSession);
  }, []);

  // Persist messages to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_MESSAGES_KEY, JSON.stringify(messages));
    } catch {
      // Storage quota or privacy restriction
    }
  }, [messages]);

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

    const activeSession = sessionId || localStorage.getItem(STORAGE_SESSION_KEY) || 'default_session';

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
    localStorage.setItem(STORAGE_SESSION_KEY, newSession);
    setSessionId(newSession);
    setMessages([newGreeting]);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-[#0B2235] via-[#12304A] to-[#1D60A1] text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 border border-white/20 group"
        aria-label={isOpen ? 'Close CyberDost AI Assistant' : 'Open CyberDost AI Assistant'}
      >
        <div className="relative flex items-center justify-center">
          <MessageSquare className="w-5 h-5 text-sky-300 group-hover:rotate-6 transition-transform" />
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
        </div>
        <div className="flex flex-col text-left">
          <span className="text-xs font-bold tracking-wide flex items-center gap-1">
            CyberDost
            <span className="text-[9px] font-semibold bg-sky-400/25 text-sky-200 px-1.5 py-0.2 rounded border border-sky-400/30">
              AI
            </span>
          </span>
          <span className="text-[10px] text-slate-300 font-normal leading-none">
            Citizen Assistant
          </span>
        </div>
        {isOpen ? (
          <ChevronDown className="w-4 h-4 text-slate-300 ml-1" />
        ) : (
          <Sparkles className="w-3.5 h-3.5 text-amber-300 ml-0.5 animate-pulse" />
        )}
      </button>

      {/* Expandable Chat Panel */}
      {isOpen && (
        <aside
          aria-label="CyberDost AI Chat Assistant"
          className="fixed bottom-20 right-6 w-96 max-w-[calc(100vw-2rem)] h-[520px] max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col z-50 overflow-hidden animate-in slide-in-from-bottom-3 duration-200"
        >
          {/* Header */}
          <header className="px-4 py-3 bg-gradient-to-r from-[#0B2235] via-[#12304A] to-[#1D60A1] text-white flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-200">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm text-white leading-tight">CyberDost Assistant</h3>
                  <span className="inline-flex items-center gap-1 text-[9.5px] font-semibold px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Online
                  </span>
                </div>
                <p className="text-[10px] text-slate-300 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-sky-300" />
                  National Cyber Crime Citizen AI
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleClearHistory}
                title="Clear chat conversation"
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Clear chat history"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close chat assistant"
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close chat assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </header>

          {/* Quick Prompts Chips */}
          <div className="px-3 py-2 bg-slate-50 border-b border-slate-200/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                disabled={isLoading}
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap px-2.5 py-1 text-[11px] font-medium bg-white text-[#12304A] rounded-full border border-slate-300 hover:border-[#1D60A1] hover:bg-sky-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-xs shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Message History */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-[#FBFBFA]/60 text-xs">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex items-end gap-1.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <div className="w-6 h-6 rounded-full bg-[#12304A] text-sky-200 flex items-center justify-center shrink-0 mb-1">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`rounded-2xl px-3.5 py-2.5 max-w-[82%] text-xs shadow-xs break-words ${
                      isUser
                        ? 'bg-[#12304A] text-white rounded-br-xs'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs leading-relaxed'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                    <span
                      className={`text-[9.5px] mt-1 block text-right ${
                        isUser ? 'text-slate-300' : 'text-slate-400'
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>

                  {isUser && (
                    <div className="w-6 h-6 rounded-full bg-slate-300 text-slate-700 flex items-center justify-center shrink-0 mb-1">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Thinking / Typing indicator */}
            {isLoading && (
              <div className="flex items-end gap-1.5 justify-start">
                <div className="w-6 h-6 rounded-full bg-[#12304A] text-sky-200 flex items-center justify-center shrink-0 mb-1">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-white text-slate-700 border border-slate-200 rounded-2xl rounded-bl-xs px-3.5 py-2.5 text-xs shadow-xs flex items-center gap-1.5">
                  <span className="text-[11px] text-slate-500 font-medium mr-1">CyberDost is thinking</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1D60A1] animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1D60A1] animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1D60A1] animate-bounce"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Emergency Helper Banner */}
          <div className="px-3 py-1.5 bg-amber-50 border-t border-amber-200/70 flex items-center justify-between text-[10px] text-amber-900">
            <span className="flex items-center gap-1">
              <PhoneCall className="w-3 h-3 text-amber-700 shrink-0" />
              <span>Urgent Financial Fraud? Call <strong>1930</strong> (24x7 Golden Hour)</span>
            </span>
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask CyberDost or describe incident..."
              disabled={isLoading}
              className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#1D60A1] focus:bg-white text-slate-900 placeholder:text-slate-400 disabled:opacity-60 transition-all"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="p-2 rounded-xl bg-[#12304A] text-white hover:bg-[#1D60A1] disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0 shadow-xs"
              aria-label="Send message"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </form>
        </aside>
      )}
    </>
  );
};

export default CyberChatWidget;

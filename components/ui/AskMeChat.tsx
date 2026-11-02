'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, Bot, ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '@/data/content';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
}

export const AskMeChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: `Hey! I'm ${SITE_CONFIG.name}'s digital assistant. Ask me about his projects, design philosophy, tools, or availability!`,
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg.text,
          history: messages.slice(-4),
        }),
      });

      const data = await res.json();
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: data.reply || `Feel free to email ${SITE_CONFIG.name} at ${SITE_CONFIG.email}!`,
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: `I'm having a brief connection pause, but you can always reach ${SITE_CONFIG.name} directly at ${SITE_CONFIG.email}!`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const samplePrompts = [
    'Are you open to full-time roles?',
    'Tell me about RouteFusion',
    'What tools do you design with?',
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        data-cursor-label="CHAT"
        className="flex items-center space-x-2.5 px-4 py-3 rounded-full bg-surface border border-line shadow-card text-ink hover:border-accent hover:shadow-bloom transition-all group"
        aria-label="Open AI questions panel"
      >
        <div className="w-6 h-6 rounded-full bg-accent-3 border border-ink flex items-center justify-center text-ink text-xs font-bold">
          ✦
        </div>
        <span className="font-mono text-xs font-semibold tracking-wide">
          {isOpen ? 'Close' : 'Ask me anything'}
        </span>
      </motion.button>

      {/* Chat Drawer Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-16 right-0 w-[350px] sm:w-[390px] bg-surface border border-line rounded-card shadow-card overflow-hidden flex flex-col h-[490px]"
          >
            {/* Header */}
            <div className="p-4 bg-bg border-b border-line flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-soft-blue border border-line flex items-center justify-center text-accent-2">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-display text-sm font-bold text-ink">Abhiram Assistant</div>
                  <div className="text-[10px] font-mono text-muted flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-3 border border-ink animate-pulse" />
                    <span>Powered by Claude Bio Context</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-muted hover:text-ink hover:bg-surface transition-colors"
                aria-label="Close chat window"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages stream */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans text-xs">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-accent text-white rounded-br-none shadow-sm'
                        : 'bg-bg border border-line text-ink rounded-bl-none'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-bg border border-line p-3 rounded-2xl rounded-bl-none flex items-center space-x-1.5 text-muted text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            <div className="px-3 py-2 border-t border-line/60 bg-bg/50 flex flex-wrap gap-1.5">
              {samplePrompts.map((p, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(p)}
                  className="px-2.5 py-1 rounded-pill bg-surface border border-line text-[10px] font-mono text-muted hover:text-accent hover:border-accent transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 border-t border-line bg-surface flex items-center space-x-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask anything about Abhiram..."
                className="flex-1 px-3 py-2 rounded-pill bg-bg border border-line text-xs font-mono text-ink placeholder:text-muted focus:outline-none focus:border-accent"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || loading}
                className="p-2 rounded-full bg-accent text-white hover:bg-ink disabled:opacity-40 transition-colors shadow-sm"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp, MessageCircle, Square, X } from 'lucide-react';
import { SITE_CONFIG } from '@/data/content';
import { CHAT_LIMITS, createEventParser, type ChatSource, type ChatTurn } from '@/lib/chat/protocol';
import { duration, ease } from '@/lib/motion';
import { on } from '@/lib/events';
import { lockScroll } from '@/lib/scroll';
import { track } from '@/lib/analytics';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { cn } from '@/lib/utils';

interface Message extends ChatTurn {
  id: string;
  sources?: ChatSource[];
  streaming?: boolean;
}

const WELCOME: Message = {
  id: 'welcome',
  role: 'assistant',
  content: `Hi — I’m an AI assistant grounded in ${SITE_CONFIG.shortName}’s portfolio. Ask about projects, process or availability. I’ll only answer from what’s on this site.`,
};

let counter = 0;
const uid = () => `${Date.now()}-${counter++}`;

export function AskMeChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [announcement, setAnnouncement] = useState('');
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const pendingPrompt = useRef<string | null>(null);

  const close = useCallback(() => setOpen(false), []);
  useFocusTrap(panelRef, open, close);

  useEffect(() => {
    if (!open) return;
    const mobile = window.matchMedia('(max-width: 639px)').matches;
    if (mobile) lockScroll(true);
    return () => {
      if (mobile) lockScroll(false);
    };
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  const send = useCallback(
    async (text: string) => {
      const question = text.trim().slice(0, CHAT_LIMITS.maxInputChars);
      if (!question || busy) return;
      track('chat_message');
      const history: ChatTurn[] = messages
        .filter((m) => m.id !== 'welcome' && !m.streaming)
        .slice(-CHAT_LIMITS.maxHistoryTurns)
        .map(({ role, content }) => ({ role, content }));
      const botId = uid();
      setMessages((prev) => [
        ...prev,
        { id: uid(), role: 'user', content: question },
        { id: botId, role: 'assistant', content: '', streaming: true },
      ]);
      setInput('');
      setBusy(true);
      setAnnouncement('Assistant is typing');

      const patch = (fn: (m: Message) => Message) =>
        setMessages((prev) => prev.map((m) => (m.id === botId ? fn(m) : m)));
      const controller = new AbortController();
      abortRef.current = controller;
      let full = '';

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: question, history }),
          signal: controller.signal,
        });
        if (!res.body) throw new Error('No stream');
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        const parse = createEventParser();
        for (;;) {
          const { value, done } = await reader.read();
          if (done) break;
          for (const ev of parse(decoder.decode(value, { stream: true }))) {
            if (ev.type === 'delta') {
              full += ev.text;
              patch((m) => ({ ...m, content: m.content + ev.text }));
            } else if (ev.type === 'sources') patch((m) => ({ ...m, sources: ev.items }));
            else if (ev.type === 'error') {
              full = ev.message;
              patch((m) => ({ ...m, content: ev.message }));
            }
          }
        }
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          full = `I lost the connection. You can always email ${SITE_CONFIG.email}.`;
          patch((m) => ({ ...m, content: full }));
        }
      } finally {
        patch((m) => ({ ...m, streaming: false }));
        setBusy(false);
        abortRef.current = null;
        setAnnouncement(full);
      }
    },
    [busy, messages],
  );

  useEffect(
    () =>
      on('open-chat', (prompt) => {
        setOpen(true);
        track('chat_open', { source: 'event' });
        if (prompt) pendingPrompt.current = prompt;
      }),
    [],
  );

  useEffect(() => {
    if (open && pendingPrompt.current) {
      const p = pendingPrompt.current;
      pendingPrompt.current = null;
      void send(p);
    }
  }, [open, send]);

  const showChips = messages.length <= 1;

  return (
    <div className="no-print fixed bottom-6 right-4 z-50 sm:right-6">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => {
          setOpen((v) => !v);
          if (!open) track('chat_open', { source: 'button' });
        }}
        aria-expanded={open}
        aria-controls="ask-me-panel"
        className="flex items-center gap-2 rounded-pill border border-line bg-surface p-3 text-ink shadow-card transition-colors hover:border-ink sm:px-4"
      >
        <MessageCircle className="h-5 w-5 text-indigo-600" aria-hidden="true" />
        <span className="sr-only font-mono text-xs font-semibold sm:not-sr-only">
          {open ? 'Close' : 'Ask me anything'}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id="ask-me-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ask-me-title"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: duration.fast, ease: ease.out }}
            className="fixed inset-0 flex flex-col overflow-hidden bg-surface sm:absolute sm:inset-auto sm:bottom-16 sm:right-0 sm:h-[540px] sm:w-[400px] sm:rounded-card sm:border sm:border-line sm:shadow-lift"
          >
            <header className="flex items-center justify-between border-b border-line bg-bg px-4 py-3">
              <div>
                <h2 id="ask-me-title" className="font-display text-sm font-bold text-ink">
                  Ask about {SITE_CONFIG.shortName}
                </h2>
                <p className="font-mono text-[11px] text-muted">AI assistant · answers only from this site</p>
              </div>
              <button
                type="button"
                onClick={close}
                className="rounded-full p-2 text-muted hover:bg-surface hover:text-ink"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <div ref={scrollRef} data-lenis-prevent className="flex-1 space-y-3 overflow-y-auto p-4 text-sm">
              {messages.map((m) => (
                <div key={m.id} className={cn('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}>
                  <div
                    className={cn(
                      'max-w-[88%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 leading-relaxed',
                      m.role === 'user'
                        ? 'rounded-br-md bg-[#111] text-[#f6f4ef]'
                        : 'rounded-bl-md border border-line bg-bg text-ink',
                    )}
                  >
                    {m.content ||
                      (m.streaming && (
                        <span
                          className="inline-block h-4 w-2 animate-pulse bg-indigo-500 align-middle"
                          aria-hidden="true"
                        />
                      ))}
                    {m.sources && m.sources.length > 0 && (
                      <ul className="mt-2.5 flex flex-wrap gap-1.5 border-t border-line pt-2.5">
                        {m.sources.map((s) => (
                          <li key={s.href}>
                            <Link
                              href={s.href}
                              onClick={close}
                              className="inline-block rounded-pill border border-line bg-surface px-2.5 py-1 font-mono text-[11px] text-indigo-700 hover:border-indigo-500"
                            >
                              {s.title} →
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <p className="sr-only" role="status" aria-live="polite">
              {announcement}
            </p>

            {showChips && (
              <div className="flex flex-wrap gap-1.5 border-t border-line px-3 py-2.5">
                {SITE_CONFIG.chatSuggestions.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => send(q)}
                    className="rounded-pill border border-line bg-surface px-3 py-1.5 font-mono text-[11px] text-ink hover:border-ink"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                void send(input);
              }}
              className="flex items-end gap-2 border-t border-line p-3"
            >
              <label htmlFor="ask-me-input" className="sr-only">
                Your question
              </label>
              <div className="flex-1">
                <input
                  id="ask-me-input"
                  data-autofocus
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  maxLength={CHAT_LIMITS.maxInputChars}
                  placeholder="e.g. What did you build for ThreatLens?"
                  autoComplete="off"
                  className="w-full rounded-pill border border-line bg-bg px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:border-ink focus:outline-none"
                />
                {input.length > CHAT_LIMITS.maxInputChars * 0.8 && (
                  <p className="mt-1 px-2 font-mono text-[11px] text-muted">
                    {input.length}/{CHAT_LIMITS.maxInputChars}
                  </p>
                )}
              </div>
              {busy ? (
                <button
                  type="button"
                  onClick={() => abortRef.current?.abort()}
                  className="rounded-full bg-[#111] p-3 text-[#f6f4ef]"
                  aria-label="Stop generating"
                >
                  <Square className="h-3.5 w-3.5" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="rounded-full bg-orange-500 p-3 text-[#111] transition-opacity disabled:opacity-40"
                  aria-label="Send question"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
              )}
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AskMeChat;

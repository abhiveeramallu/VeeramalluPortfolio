'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Briefcase, Copy, FileDown, Github, Home, Mail, MessageCircle, Search, User } from 'lucide-react';
import { SITE_CONFIG } from '@/data/content';
import { duration, ease } from '@/lib/motion';
import { emit, on } from '@/lib/events';
import { lockScroll } from '@/lib/scroll';
import { track } from '@/lib/analytics';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { cn } from '@/lib/utils';

interface Command {
  id: string;
  label: string;
  group: 'Navigate' | 'Case studies' | 'Actions';
  icon: React.ReactNode;
  keywords?: string;
  run: () => void;
}

const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

const isTyping = (el: EventTarget | null) =>
  el instanceof HTMLElement && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));

/** Opens with "?", ⌘K / Ctrl+K, or the Konami code. Fully keyboard-driven (↑ ↓ Enter Esc). */
export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState('');
  const panelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const close = useCallback(() => setOpen(false), []);
  useFocusTrap(panelRef, open, close);

  const show = useCallback((source: string) => {
    setQuery('');
    setActive(0);
    setOpen(true);
    track('command_palette_open', { source });
  }, []);

  const commands = useMemo<Command[]>(() => {
    const go = (href: string) => () => router.push(href);
    return [
      { id: 'home', label: 'Home', group: 'Navigate', icon: <Home />, run: go('/') },
      { id: 'work', label: 'All projects', group: 'Navigate', icon: <Briefcase />, run: go('/work') },
      { id: 'about', label: 'About me', group: 'Navigate', icon: <User />, run: go('/about') },
      { id: 'contact', label: 'Contact', group: 'Navigate', icon: <Mail />, run: go('/contact') },
      ...SITE_CONFIG.projects.map<Command>((p) => ({
        id: `p-${p.slug}`,
        label: p.title,
        group: 'Case studies',
        icon: <Briefcase />,
        keywords: `${p.category} ${p.stack.join(' ')}`,
        run: go(`/work/${p.slug}`),
      })),
      {
        id: 'copy',
        label: 'Copy email address',
        group: 'Actions',
        icon: <Copy />,
        keywords: 'mail contact',
        run: () => {
          void navigator.clipboard?.writeText(SITE_CONFIG.email);
          track('email_copy', { source: 'palette' });
          setToast(`Copied ${SITE_CONFIG.email}`);
        },
      },
      {
        id: 'chat',
        label: 'Ask the AI assistant',
        group: 'Actions',
        icon: <MessageCircle />,
        keywords: 'chat question',
        run: () => emit('open-chat'),
      },
      {
        id: 'resume',
        label: 'Download résumé (PDF)',
        group: 'Actions',
        icon: <FileDown />,
        keywords: 'cv resume',
        run: () => {
          track('resume_download', { location: 'palette' });
          window.location.href = '/resume.pdf';
        },
      },
      {
        id: 'github',
        label: 'Open GitHub profile',
        group: 'Actions',
        icon: <Github />,
        keywords: 'code repositories source',
        run: () => window.open(SITE_CONFIG.socials.github, '_blank', 'noopener,noreferrer'),
      },
    ];
  }, [router]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => `${c.label} ${c.group} ${c.keywords ?? ''}`.toLowerCase().includes(q));
  }, [commands, query]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    return () => lockScroll(false);
  }, [open]);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(''), 2200);
    return () => clearTimeout(id);
  }, [toast]);

  useEffect(() => {
    let konami = 0;
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (open) close();
        else show('shortcut');
        return;
      }
      if (isTyping(e.target)) return;
      if (e.key === '?' && !open) {
        e.preventDefault();
        show('question_mark');
        return;
      }
      konami =
        e.key === KONAMI[konami] || e.key.toLowerCase() === KONAMI[konami]
          ? konami + 1
          : e.key === KONAMI[0]
            ? 1
            : 0;
      if (konami === KONAMI.length) {
        konami = 0;
        show('konami');
      }
    };
    window.addEventListener('keydown', onKey);
    const off = on('open-palette', () => show('button'));
    return () => {
      window.removeEventListener('keydown', onKey);
      off();
    };
  }, [open, close, show]);

  const runCommand = (cmd: Command) => {
    close();
    cmd.run();
  };

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => Math.min(results.length - 1, i + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => Math.max(0, i - 1));
    } else if (e.key === 'Enter' && results[active]) {
      e.preventDefault();
      runCommand(results[active]);
    }
  };

  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  let lastGroup = '';

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[12vh]">
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: duration.fast }}
              onClick={close}
              aria-hidden="true"
            />
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: duration.fast, ease: ease.out }}
              className="relative w-full max-w-lg overflow-hidden rounded-card border border-line bg-surface shadow-lift"
            >
              <div className="flex items-center gap-3 border-b border-line px-4">
                <Search className="h-4 w-4 text-muted" aria-hidden="true" />
                <input
                  data-autofocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onListKey}
                  placeholder="Jump to a page, project or action…"
                  className="h-14 flex-1 bg-transparent text-sm text-ink placeholder:text-muted focus:outline-none"
                  role="combobox"
                  aria-expanded="true"
                  aria-controls="palette-list"
                  aria-activedescendant={results[active] ? `cmd-${results[active].id}` : undefined}
                  aria-label="Search commands"
                />
                <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[11px] text-muted">
                  Esc
                </kbd>
              </div>
              <ul
                ref={listRef}
                id="palette-list"
                role="listbox"
                data-lenis-prevent
                className="max-h-[50vh] overflow-y-auto p-2"
              >
                {results.length === 0 && (
                  <li className="px-3 py-6 text-center text-sm text-muted">
                    No matches. Try “work” or “email”.
                  </li>
                )}
                {results.map((cmd, i) => {
                  const header = cmd.group !== lastGroup ? cmd.group : null;
                  lastGroup = cmd.group;
                  return (
                    <li key={cmd.id} role="presentation">
                      {header && (
                        <p className="px-3 pb-1 pt-3 font-mono text-[11px] uppercase tracking-wider text-muted">
                          {header}
                        </p>
                      )}
                      <div
                        id={`cmd-${cmd.id}`}
                        role="option"
                        aria-selected={i === active}
                        data-index={i}
                        onMouseEnter={() => setActive(i)}
                        onClick={() => runCommand(cmd)}
                        className={cn(
                          'flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink [&_svg]:h-4 [&_svg]:w-4',
                          i === active ? 'bg-bg' : '',
                        )}
                      >
                        <span className={cn('text-muted', i === active && 'text-accent')}>{cmd.icon}</span>
                        {cmd.label}
                      </div>
                    </li>
                  );
                })}
              </ul>
              <p className="border-t border-line px-4 py-2 font-mono text-[11px] text-muted">
                ↑ ↓ to move · Enter to run · try the Konami code
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <p
        role="status"
        aria-live="polite"
        className={cn(
          'fixed bottom-24 left-1/2 z-[71] -translate-x-1/2 rounded-pill bg-ink px-4 py-2 font-mono text-xs text-night transition-opacity',
          toast ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      >
        {toast}
      </p>
    </>
  );
}

export default CommandPalette;

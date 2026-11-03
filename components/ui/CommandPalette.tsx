'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Briefcase, Copy, FileText, Github, Home, Instagram, Linkedin, Mail, MessageCircle, Search, User } from 'lucide-react';
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
        label: 'View resume',
        group: 'Navigate',
        icon: <FileText />,
        keywords: 'cv resume pdf experience',
        run: () => {
          track('cta_click', { label: 'resume', location: 'palette' });
          router.push('/resume');
        },
      },
      {
        id: 'github',
        label: 'Open GitHub profile',
        group: 'Actions',
        icon: <Github />,
        keywords: 'code repositories source github',
        run: () => window.open(SITE_CONFIG.socials.github, '_blank', 'noopener,noreferrer'),
      },
      {
        id: 'leetcode',
        label: 'Open LeetCode profile',
        group: 'Actions',
        icon: (
          <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor" aria-hidden="true">
            <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943L15.292 5.686A5.76 5.76 0 0 0 13.483 0zm-2.889 11.979a1.38 1.38 0 0 0-1.38 1.38v.018a1.38 1.38 0 0 0 1.38 1.38h6.417a1.38 1.38 0 0 0 1.38-1.38v-.018a1.38 1.38 0 0 0-1.38-1.38z" />
          </svg>
        ),
        keywords: 'leetcode problems dsa algorithms',
        run: () => window.open(SITE_CONFIG.socials.leetcode, '_blank', 'noopener,noreferrer'),
      },
      {
        id: 'linkedin',
        label: 'Open LinkedIn profile',
        group: 'Actions',
        icon: <Linkedin />,
        keywords: 'linkedin connect network professional',
        run: () => window.open(SITE_CONFIG.socials.linkedin, '_blank', 'noopener,noreferrer'),
      },
      {
        id: 'instagram',
        label: 'Open Instagram profile',
        group: 'Actions',
        icon: <Instagram />,
        keywords: 'instagram social photos abhi_veeramallu',
        run: () => window.open(SITE_CONFIG.socials.instagram, '_blank', 'noopener,noreferrer'),
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

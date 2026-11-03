'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Command, FileDown, Menu, X } from 'lucide-react';
import { SITE_CONFIG } from '@/data/content';
import { duration, ease } from '@/lib/motion';
import { emit } from '@/lib/events';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/lib/nav';

/**
 * Minimal floating navigation: brand on the left, Home/Projects/About/Contact/Résumé on the right.
 * Small dark pills keep it legible over the page and the illustrations.
 */
export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    menuRef.current?.querySelector<HTMLElement>('a')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const isActive = (href: string) =>
    !href.includes('#') && (pathname === href || pathname.startsWith(`${href}/`));
  const pill = 'rounded-pill bg-bg/85 backdrop-blur-sm';

  return (
    <header className="no-print pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-10 md:pt-6">
      <nav aria-label="Main" className="mx-auto flex max-w-[1440px] items-center justify-between gap-3">
        <Link
          href="/"
          className={cn(pill, 'pointer-events-auto flex min-h-[40px] items-center gap-3 px-4 text-ink')}
        >
          <span aria-hidden className="label text-[11px] text-accent">
            {SITE_CONFIG.initials}
          </span>
          <span className="font-display text-sm font-semibold">{SITE_CONFIG.displayName}</span>
          <span className="sr-only">, home</span>
        </Link>

        <div className={cn(pill, 'pointer-events-auto hidden items-center gap-1 p-1 md:flex')}>
          <ul className="flex items-center">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'label block rounded-pill px-3.5 py-2 text-[11px] transition-colors',
                      active ? 'bg-raised text-ink' : 'text-soft hover:text-ink',
                    )}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
            <li>
              <a
                href="/resume.pdf"
                className="label flex items-center gap-1.5 rounded-pill px-3.5 py-2 text-[11px] text-soft transition-colors hover:text-ink"
              >
                <FileDown size={13} aria-hidden /> Résumé
              </a>
            </li>
          </ul>
          <button
            type="button"
            onClick={() => emit('open-palette')}
            className="label hidden items-center gap-1 rounded-pill px-3 py-2 text-[11px] text-soft transition-colors hover:text-ink lg:flex"
            aria-label="Open command palette"
          >
            <Command size={13} aria-hidden /> K
          </button>
        </div>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={cn(
            pill,
            'pointer-events-auto flex h-11 w-11 items-center justify-center text-ink md:hidden',
          )}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: duration.fast, ease: ease.out }}
            className="pointer-events-auto absolute left-4 right-4 top-20 rounded-card border border-line bg-surface p-3 shadow-lift md:hidden"
          >
            <ul className="flex flex-col font-display text-step-2 font-semibold">
              {[{ name: 'Home', href: '/' }, ...NAV_LINKS].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                    className={cn(
                      'block rounded-xl px-3 py-3',
                      isActive(link.href) ? 'bg-raised text-accent' : 'text-ink hover:bg-raised',
                    )}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <a href="/resume.pdf" className="block rounded-xl px-3 py-3 text-ink hover:bg-raised">
                  Résumé (PDF)
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

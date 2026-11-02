'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Command, Menu, X } from 'lucide-react';
import { SITE_CONFIG } from '@/data/content';
import { duration, ease, spring } from '@/lib/motion';
import { emit } from '@/lib/events';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/lib/nav';

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="no-print pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-6">
      <nav
        aria-label="Main"
        className={cn(
          'pointer-events-auto flex w-full max-w-4xl items-center justify-between rounded-pill border border-line bg-surface/90 backdrop-blur-md transition-[padding,box-shadow] duration-300',
          scrolled ? 'px-3 py-2 shadow-card' : 'px-4 py-2.5 shadow-soft',
        )}
      >
        <Link
          href="/"
          className="group flex items-center gap-2 font-display text-sm font-bold tracking-tight text-ink sm:text-base"
        >
          <span
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#111] font-mono text-xs font-bold text-orange-500 transition-transform duration-300 group-hover:rotate-[-8deg]"
          >
            {SITE_CONFIG.initials}
          </span>
          <span className="sr-only sm:not-sr-only">{SITE_CONFIG.brandName}</span>
          <span className="sr-only">, home</span>
        </Link>

        <ul className="hidden items-center gap-1 rounded-pill border border-line/60 bg-bg/80 p-1 font-mono text-xs md:flex">
          {NAV_LINKS.slice(0, 3).map((link) => {
            const active = isActive(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'relative block rounded-pill px-3.5 py-1.5 transition-colors',
                    active ? 'font-semibold text-ink' : 'text-muted hover:text-ink',
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      transition={spring.snappy}
                      className="absolute inset-0 -z-10 rounded-pill border border-line/80 bg-surface shadow-sm"
                    />
                  )}
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => emit('open-palette')}
            className="hidden items-center gap-1 rounded-pill border border-line px-2.5 py-1.5 font-mono text-[11px] text-muted transition-colors hover:border-ink hover:text-ink lg:flex"
            aria-label="Open command palette"
          >
            <Command className="h-3.5 w-3.5" aria-hidden="true" />
            <span>K</span>
          </button>
          <Link href="/contact" className="btn-primary px-4 py-1.5 text-xs shadow-none">
            Hire me
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="rounded-full border border-line p-1.5 text-ink transition-colors hover:bg-bg md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: duration.fast, ease: ease.out }}
            className="pointer-events-auto absolute left-4 right-4 top-20 rounded-card border border-line bg-surface p-4 shadow-lift md:hidden"
          >
            <ul className="flex flex-col font-display text-2xl font-bold">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                    className={cn(
                      'block rounded-xl px-3 py-2.5',
                      isActive(link.href) ? 'bg-orange-50 text-orange-700' : 'text-ink hover:bg-bg',
                    )}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <a href="/resume.pdf" className="block rounded-xl px-3 py-2.5 text-ink hover:bg-bg">
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

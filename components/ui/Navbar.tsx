'use client';

import { SITE_CONFIG } from '@/data/content';
import { emit } from '@/lib/events';
import { duration, ease } from '@/lib/motion';
import { NAV_LINKS } from '@/lib/nav';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Briefcase,
  Command,
  FileText,
  Github,
  Home,
  Instagram,
  Linkedin,
  type LucideIcon,
  Mail,
  Menu,
  User,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

function LeetCodeIcon({ size = 13, className }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943L15.292 5.686A5.76 5.76 0 0 0 13.483 0zm-2.889 11.979a1.38 1.38 0 0 0-1.38 1.38v.018a1.38 1.38 0 0 0 1.38 1.38h6.417a1.38 1.38 0 0 0 1.38-1.38v-.018a1.38 1.38 0 0 0-1.38-1.38z" />
    </svg>
  );
}

const SOCIAL_NAV = [
  { name: 'GitHub', href: SITE_CONFIG.socials.github, icon: Github },
  { name: 'LeetCode', href: SITE_CONFIG.socials.leetcode, icon: LeetCodeIcon },
  { name: 'LinkedIn', href: SITE_CONFIG.socials.linkedin, icon: Linkedin },
  { name: 'Instagram', href: SITE_CONFIG.socials.instagram, icon: Instagram },
];

const NAV_ICONS: Record<string, LucideIcon> = {
  '/work': Briefcase,
  '/about': User,
  '/contact': Mail,
};

/**
 * Minimal floating navigation: brand on the left, social profiles in the center,
 * and Projects/About/Contact/Résumé on the right.
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
  const pill =
    'rounded-pill border-2 border-ink bg-bg/90 shadow-[3px_3px_0_0_rgb(var(--c-ink))] backdrop-blur-sm';
  const itemHover = 'transition-all duration-150 hover:bg-raised hover:text-ink';

  return (
    <header className="no-print pointer-events-none fixed inset-x-0 top-0 z-[100] px-4 pt-4 md:px-10 md:pt-6">
      <nav aria-label="Main" className="mx-auto flex max-w-[1440px] items-center justify-between gap-3">
        {/* Brand link with Home symbol */}
        <Link
          href="/"
          className={cn(
            pill,
            'pointer-events-auto flex min-h-[40px] items-center gap-2 px-3.5 text-ink transition-colors duration-150 hover:bg-raised',
          )}
          title="Home"
        >
          <Home size={15} className="shrink-0 text-accent" aria-hidden />
          <span className="font-display text-sm font-semibold tracking-wide">
            {SITE_CONFIG.displayName}
          </span>
          <span className="sr-only">Home, Abhiram</span>
        </Link>

        {/* Social profiles navigation (between Abhiram and Projects) */}
        <div className={cn(pill, 'pointer-events-auto hidden items-center gap-1 p-1 md:flex')}>
          <ul className="flex items-center">
            {SOCIAL_NAV.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'label flex items-center gap-1.5 rounded-pill px-3 py-2 text-[11px] text-soft',
                      itemHover,
                    )}
                    title={`${item.name} profile (opens in new tab)`}
                  >
                    <Icon size={13} className="shrink-0" aria-hidden />
                    <span className="hidden lg:inline">{item.name}</span>
                    <span className="sr-only">{item.name} profile (opens in new tab)</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Page navigation with icons & quick actions */}
        <div className={cn(pill, 'pointer-events-auto hidden items-center gap-1 p-1 md:flex')}>
          <ul className="flex items-center">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              const Icon = NAV_ICONS[link.href];
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'label flex items-center gap-1.5 rounded-pill px-3 py-2 text-[11px]',
                      itemHover,
                      active ? 'bg-raised text-ink' : 'text-soft',
                    )}
                  >
                    {Icon && <Icon size={13} className="shrink-0" aria-hidden />}
                    <span>{link.name}</span>
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                href="/resume"
                aria-current={isActive('/resume') ? 'page' : undefined}
                className={cn(
                  'label flex items-center gap-1.5 rounded-pill px-3.5 py-2 text-[11px]',
                  itemHover,
                  isActive('/resume') ? 'bg-raised text-ink' : 'text-soft',
                )}
              >
                <FileText size={13} aria-hidden /> Resume
              </Link>
            </li>
          </ul>
          <button
            type="button"
            onClick={() => emit('open-palette')}
            className={cn(
              'label hidden items-center gap-1 rounded-pill px-3 py-2 text-[11px] text-soft lg:flex',
              itemHover,
            )}
            aria-label="Open command palette"
          >
            <Command size={13} aria-hidden /> K
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={cn(
            pill,
            'pointer-events-auto relative z-10 flex h-11 w-11 items-center justify-center text-ink transition-colors duration-150 hover:bg-raised md:hidden',
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
            className="pointer-events-auto absolute left-4 right-4 top-20 rounded-card border-2 border-ink bg-surface p-4 shadow-lift md:hidden"
          >
            <ul className="flex flex-col font-display text-step-2 font-semibold">
              <li>
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  aria-current={isActive('/') ? 'page' : undefined}
                  className={cn(
                    'flex items-center gap-2.5 rounded-xl px-3 py-3 transition-colors duration-150',
                    isActive('/') ? 'bg-raised text-accent' : 'text-ink hover:bg-raised',
                  )}
                >
                  <Home size={18} className="shrink-0 text-accent" aria-hidden />
                  <span>Home</span>
                </Link>
              </li>
              {NAV_LINKS.map((link) => {
                const Icon = NAV_ICONS[link.href];
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive(link.href) ? 'page' : undefined}
                      className={cn(
                        'flex items-center gap-2.5 rounded-xl px-3 py-3 transition-colors duration-150',
                        isActive(link.href) ? 'bg-raised text-accent' : 'text-ink hover:bg-raised',
                      )}
                    >
                      {Icon && <Icon size={18} className="shrink-0 text-soft" aria-hidden />}
                      <span>{link.name}</span>
                    </Link>
                  </li>
                );
              })}
              <li>
                <Link
                  href="/resume"
                  onClick={() => setOpen(false)}
                  aria-current={isActive('/resume') ? 'page' : undefined}
                  className={cn(
                    'flex items-center gap-2.5 rounded-xl px-3 py-3 transition-colors duration-150',
                    isActive('/resume') ? 'bg-raised text-accent' : 'text-ink hover:bg-raised',
                  )}
                >
                  <FileText size={18} className="shrink-0 text-soft" aria-hidden />
                  <span>Resume</span>
                </Link>
              </li>
            </ul>

            <div className="mt-4 border-t border-line pt-3">
              <p className="label px-1 pb-2 text-[11px] uppercase tracking-wider text-muted">
                Profiles
              </p>
              <div className="grid grid-cols-2 gap-2">
                {SOCIAL_NAV.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2 rounded-xl border border-line bg-raised px-3 py-2 text-xs font-medium text-ink transition-colors duration-150 hover:border-ink hover:bg-surface"
                    >
                      <Icon size={14} className="shrink-0 text-accent" aria-hidden />
                      <span>{item.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

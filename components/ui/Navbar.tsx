'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Menu, X, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '@/data/content';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Journey', href: '/about' },
  { name: 'Projects', href: '/work' },
  { name: 'Experiments', href: '/playground' },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 sm:pt-6 pointer-events-none">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`pointer-events-auto flex items-center justify-between transition-all duration-300 rounded-pill border border-line ${
          isScrolled
            ? 'py-2 px-3 sm:px-4 bg-surface/90 backdrop-blur-md shadow-card scale-[0.98]'
            : 'py-2.5 px-3.5 sm:px-5 bg-surface/85 backdrop-blur-sm shadow-soft'
        } max-w-4xl w-full`}
        aria-label="Main Navigation"
      >
        {/* Brand Avatar / Logotype */}
        <Link
          href="/"
          className="group flex items-center space-x-2 text-ink font-display font-bold text-sm sm:text-base tracking-tight focus-visible:outline-none"
        >
          <div className="w-8 h-8 rounded-full bg-soft-pink border border-line flex items-center justify-center text-accent text-xs font-mono font-bold group-hover:scale-105 transition-transform">
            SA
          </div>
          <span className="hidden sm:inline-block font-semibold">
            {SITE_CONFIG.brandName}
          </span>
        </Link>

        {/* Center Nav Links - Desktop */}
        <div className="hidden md:flex items-center space-x-1 bg-bg/80 p-1 rounded-pill border border-line/60 text-xs font-mono">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-3.5 py-1.5 rounded-pill transition-colors ${
                  isActive ? 'text-ink font-semibold' : 'text-muted hover:text-ink'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                    className="absolute inset-0 bg-surface rounded-pill border border-line/80 shadow-sm -z-10"
                  />
                )}
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Right CTA: Contact Button */}
        <div className="flex items-center space-x-2">
          {/* Status badge pill - desktop */}
          <div className="hidden lg:flex items-center space-x-1.5 px-3 py-1 rounded-pill bg-soft-green border border-line text-[10px] font-mono text-ink">
            <span className="w-2 h-2 rounded-full bg-accent-3 border border-ink animate-pulse" />
            <span className="font-medium">Open to roles</span>
          </div>

          <Link
            href="/contact"
            className="flex items-center space-x-1.5 px-4 py-1.5 rounded-pill bg-accent text-white text-xs font-mono font-semibold hover:bg-ink transition-colors shadow-bloom hover:shadow-none"
          >
            <span>Contact</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-full border border-line text-ink hover:bg-bg transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-accent" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto absolute top-20 left-4 right-4 bg-surface/98 backdrop-blur-xl border border-line rounded-card p-6 shadow-card md:hidden flex flex-col space-y-4"
          >
            <div className="flex flex-col space-y-2 font-display text-lg font-bold">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2 px-3 rounded-xl transition-colors ${
                    pathname === link.href ? 'bg-soft-pink text-accent' : 'text-ink hover:bg-bg'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t border-line flex flex-col space-y-3">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-pill bg-accent text-white font-mono text-center text-xs font-bold flex items-center justify-center space-x-2 shadow-bloom"
              >
                <span>Let's talk</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

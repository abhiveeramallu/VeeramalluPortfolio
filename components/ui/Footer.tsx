'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Copy, Check, Clock, Heart, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '@/data/content';

export const Footer: React.FC = () => {
  const [localTime, setLocalTime] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Display local time in India Standard Time
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setLocalTime(timeStr);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(SITE_CONFIG.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <footer className="relative bg-surface border-t border-line py-16 sm:py-20 px-6 sm:px-12 mt-24">
      <div className="max-w-6xl mx-auto flex flex-col space-y-12">
        {/* Top Big Callout */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-12 border-b border-line gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-muted block mb-2">
              Ready to create something memorable?
            </span>
            <h3 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-ink">
              Let's craft the <span className="font-serif italic font-normal text-accent">obvious</span> together.
            </h3>
          </div>

          <button
            onClick={copyEmail}
            data-cursor-label="COPY"
            className="group flex items-center space-x-2.5 px-5 py-3 rounded-pill bg-bg border border-line hover:border-accent text-ink font-mono text-xs sm:text-sm font-semibold transition-all hover:bg-surface shadow-soft"
          >
            <span>{SITE_CONFIG.email}</span>
            {copied ? (
              <Check className="w-4 h-4 text-accent-2" />
            ) : (
              <Copy className="w-4 h-4 text-muted group-hover:text-accent transition-colors" />
            )}
            {copied && <span className="text-[11px] text-accent font-bold">Copied!</span>}
          </button>
        </div>

        {/* Middle Metadata & Socials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-xs font-mono">
          <div>
            <div className="text-muted uppercase tracking-wider mb-2">// LOCATION</div>
            <div className="text-ink font-semibold">{SITE_CONFIG.location}</div>
            <div className="text-muted mt-1 flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-accent" />
              <span>{localTime || '12:00:00 PM'} IST</span>
            </div>
          </div>

          <div>
            <div className="text-muted uppercase tracking-wider mb-2">// AVAILABILITY</div>
            <div className="flex items-center space-x-2 text-ink font-semibold">
              <span className="w-2 h-2 rounded-full bg-accent-3 border border-ink animate-pulse" />
              <span>{SITE_CONFIG.status}</span>
            </div>
            <div className="text-muted mt-1">{SITE_CONFIG.availability} onwards</div>
          </div>

          <div>
            <div className="text-muted uppercase tracking-wider mb-2">// NAVIGATION</div>
            <div className="flex flex-col space-y-1 text-muted">
              <Link href="/about" className="hover:text-accent transition-colors">Journey</Link>
              <Link href="/work" className="hover:text-accent transition-colors">Projects</Link>
              <Link href="/playground" className="hover:text-accent transition-colors">Playground</Link>
              <Link href="/contact" className="hover:text-accent transition-colors">Contact Form</Link>
            </div>
          </div>

          <div>
            <div className="text-muted uppercase tracking-wider mb-2">// CONNECT</div>
            <div className="flex flex-col space-y-1 text-muted">
              <a
                href={SITE_CONFIG.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 hover:text-accent transition-colors"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 text-muted" />
              </a>
              <a
                href={SITE_CONFIG.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 hover:text-accent transition-colors"
              >
                <span>GitHub</span>
                <ArrowUpRight className="w-3 h-3 text-muted" />
              </a>
              <a
                href={SITE_CONFIG.socials.behance}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 hover:text-accent transition-colors"
              >
                <span>Behance</span>
                <ArrowUpRight className="w-3 h-3 text-muted" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Micro Copyright */}
        <div className="pt-8 border-t border-line/60 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-muted gap-4">
          <div>
            © {new Date().getFullYear()} {SITE_CONFIG.name} — Built with Next.js, R3F &amp; Lenis.
          </div>
          <div className="flex items-center space-x-2">
            <span>Playful-premium design language</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="text-ink font-medium">Light theme only</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

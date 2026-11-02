'use client';

import React, { useState } from 'react';
import { ArrowUpRight, Copy, Check, Send, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '@/data/content';
import { ContactModal } from '@/components/ui/ContactModal';

export const ContactCTA: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(SITE_CONFIG.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <section id="contact-cta" className="py-24 px-6 sm:px-12 max-w-6xl mx-auto">
      <div className="relative rounded-card bg-surface border border-line p-8 sm:p-14 shadow-card text-left overflow-hidden">
        
        {/* Soft Decorative pastel circles */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-soft-yellow opacity-40 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-soft-pink opacity-50 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-pill bg-bg border border-line text-xs font-mono text-ink shadow-sm">
            <span className="w-2 h-2 rounded-full bg-accent-3 border border-ink animate-pulse" />
            <span className="font-semibold">{SITE_CONFIG.status}</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-ink leading-[1.08]">
            Open to <span className="font-serif italic font-normal text-accent underline decoration-accent-2 decoration-2">roles</span>.
          </h2>

          <p className="font-sans text-base sm:text-lg text-muted leading-relaxed">
            I'm currently considering high-impact full-time design engineering roles and selective advisory work. If you value craft, speed, and making complex systems feel simple, let's connect.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            {/* Open Modal Button */}
            <button
              onClick={() => setModalOpen(true)}
              data-cursor-label="DISPATCH"
              className="px-6 py-3.5 rounded-pill bg-accent text-white font-mono text-xs sm:text-sm font-semibold tracking-wide flex items-center space-x-2 shadow-bloom hover:bg-ink hover:shadow-none transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Send message</span>
            </button>

            {/* Copy Email Button */}
            <button
              onClick={copyEmail}
              data-cursor-label="COPY"
              className="px-5 py-3.5 rounded-pill bg-bg border border-line text-ink font-mono text-xs sm:text-sm font-semibold tracking-wide hover:border-accent hover:bg-surface transition-all flex items-center space-x-2 shadow-soft"
            >
              <span>{SITE_CONFIG.email}</span>
              {copied ? (
                <Check className="w-4 h-4 text-accent-2" />
              ) : (
                <Copy className="w-4 h-4 text-muted" />
              )}
              {copied && <span className="text-[11px] text-accent font-bold">Copied!</span>}
            </button>
          </div>

          {/* Social Links */}
          <div className="pt-6 border-t border-line/70 flex flex-wrap items-center gap-5 text-xs font-mono text-muted">
            <span className="text-ink font-semibold uppercase tracking-wider">Socials:</span>
            <a
              href={SITE_CONFIG.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent flex items-center space-x-0.5 transition-colors"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-muted" />
            </a>
            <a
              href={SITE_CONFIG.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent flex items-center space-x-0.5 transition-colors"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-muted" />
            </a>
            <a
              href={SITE_CONFIG.socials.behance}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent flex items-center space-x-0.5 transition-colors"
            >
              <span>Behance</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-muted" />
            </a>
          </div>
        </div>

      </div>

      {/* Modal instance */}
      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
};

'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, Copy, Check, Sparkles, MapPin, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SITE_CONFIG } from '@/data/content';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
        confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
      }
    } catch {
      window.location.href = `mailto:${SITE_CONFIG.email}?subject=Inquiry from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}`;
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(SITE_CONFIG.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <div className="pt-32 pb-24 px-6 sm:px-12 max-w-5xl mx-auto space-y-16 text-left">
      
      {/* Page Header */}
      <div className="pb-8 border-b border-line">
        <div className="text-accent font-mono text-xs font-bold uppercase tracking-wider mb-2">
          // GET IN TOUCH
        </div>
        <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-ink leading-[1.08]">
          Let's make something <span className="font-serif italic font-normal text-accent">memorable</span>.
        </h1>
        <p className="font-sans text-lg text-muted max-w-xl mt-4 leading-relaxed">
          Open to full-time design engineering roles, product design leadership, and selective advisory projects.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Form Column */}
        <div className="lg:col-span-7 p-8 sm:p-10 rounded-card bg-surface border border-line shadow-card">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-soft-green border border-line mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-ink" />
              </div>
              <h2 className="font-display text-3xl font-bold text-ink">Transmission Received!</h2>
              <p className="font-sans text-sm text-muted max-w-sm mx-auto leading-relaxed">
                Thank you for reaching out. I'll review your note and respond within 24 hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', message: '' });
                }}
                className="mt-4 px-6 py-2.5 rounded-pill bg-accent text-white font-mono text-xs font-bold shadow-bloom hover:bg-ink transition-colors"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 font-mono text-xs">
              <div>
                <label htmlFor="contact-name" className="block text-muted uppercase text-[10px] tracking-wider mb-1.5">
                  Your Name / Organization *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Taylor Swift or Stripe"
                  className="w-full px-4 py-3 rounded-xl bg-bg border border-line text-ink outline-none focus:border-accent font-sans text-sm transition-colors"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-muted uppercase text-[10px] tracking-wider mb-1.5">
                  Your Email Address *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="taylor@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-bg border border-line text-ink outline-none focus:border-accent font-sans text-sm transition-colors"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-muted uppercase text-[10px] tracking-wider mb-1.5">
                  Project Brief or Role Details *
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your product, team, or opportunity..."
                  className="w-full px-4 py-3 rounded-xl bg-bg border border-line text-ink outline-none focus:border-accent font-sans text-sm resize-none transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-pill bg-accent text-white hover:bg-ink font-mono text-xs font-bold tracking-wider flex items-center justify-center space-x-2 shadow-bloom disabled:opacity-50 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>{loading ? 'Transmitting...' : 'Send Message'}</span>
              </button>
            </form>
          )}
        </div>

        {/* Info Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-card bg-surface border border-line shadow-soft space-y-4">
            <span className="font-mono text-xs uppercase tracking-wider text-muted block">
              // DIRECT TRANSMISSION
            </span>
            <h3 className="font-display text-2xl font-bold text-ink">
              Prefer Email?
            </h3>
            <p className="font-sans text-sm text-muted leading-relaxed">
              You can always reach me directly without filling out a form.
            </p>

            <button
              onClick={copyEmail}
              data-cursor-label="COPY"
              className="w-full py-3 px-4 rounded-pill bg-bg border border-line hover:border-accent flex items-center justify-between text-xs font-mono font-semibold text-ink transition-colors shadow-sm"
            >
              <span>{SITE_CONFIG.email}</span>
              {copied ? <Check className="w-4 h-4 text-accent-2" /> : <Copy className="w-4 h-4 text-muted" />}
            </button>
          </div>

          <div className="p-8 rounded-card bg-soft-yellow border border-line space-y-3 font-mono text-xs">
            <div className="font-bold text-ink uppercase tracking-wider">// STATUS</div>
            <div className="text-ink font-semibold flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-accent-3 border border-ink animate-pulse" />
              <span>{SITE_CONFIG.status}</span>
            </div>
            <p className="font-sans text-xs text-muted">
              Located in {SITE_CONFIG.location}. Available for remote, hybrid, or on-site roles worldwide.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}

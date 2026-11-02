'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SITE_CONFIG } from '@/data/content';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

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
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
      }
    } catch {
      // Direct mailto fallback
      window.location.href = `mailto:${SITE_CONFIG.email}?subject=Project inquiry from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}`;
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-ink/40 backdrop-blur-sm"
      />

      {/* Modal Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-lg bg-surface border border-line rounded-card shadow-card p-6 sm:p-8 z-10 text-left"
      >
        <div className="flex items-center justify-between pb-4 border-b border-line mb-6">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-accent" />
            <h2 id="contact-modal-title" className="font-display text-lg font-bold text-ink">
              Send a Transmission
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-muted hover:text-ink hover:bg-bg transition-colors"
            aria-label="Close message form"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-soft-green border border-line mx-auto flex items-center justify-center text-accent-3">
              <CheckCircle2 className="w-8 h-8 text-ink" />
            </div>
            <h3 className="font-display text-2xl font-bold text-ink">Message Dispatched!</h3>
            <p className="font-sans text-sm text-muted max-w-xs mx-auto">
              Thank you for reaching out. {SITE_CONFIG.name} will reply within 24 hours.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 rounded-pill bg-accent text-white font-mono text-xs font-bold hover:bg-ink transition-colors shadow-bloom"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
            <div>
              <label htmlFor="modal-name" className="block text-muted uppercase text-[10px] tracking-wider mb-1.5">
                Your Name / Team
              </label>
              <input
                id="modal-name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Alex Morgan or Acme Studio"
                className="w-full px-4 py-3 rounded-xl bg-bg border border-line text-ink outline-none focus:border-accent text-xs font-sans transition-colors"
              />
            </div>

            <div>
              <label htmlFor="modal-email" className="block text-muted uppercase text-[10px] tracking-wider mb-1.5">
                Your Email Address
              </label>
              <input
                id="modal-email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="alex@company.com"
                className="w-full px-4 py-3 rounded-xl bg-bg border border-line text-ink outline-none focus:border-accent text-xs font-sans transition-colors"
              />
            </div>

            <div>
              <label htmlFor="modal-message" className="block text-muted uppercase text-[10px] tracking-wider mb-1.5">
                Project Vision or Question
              </label>
              <textarea
                id="modal-message"
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell me about your product, timeline, or open design engineering role..."
                className="w-full px-4 py-3 rounded-xl bg-bg border border-line text-ink outline-none focus:border-accent text-xs font-sans resize-none transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-pill bg-accent hover:bg-ink text-white font-mono text-xs font-bold tracking-wider flex items-center justify-center space-x-2 shadow-bloom disabled:opacity-50 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? 'Transmitting...' : 'Dispatch Message'}</span>
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

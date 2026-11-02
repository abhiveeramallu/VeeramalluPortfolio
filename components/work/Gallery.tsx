'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { lockScroll } from '@/lib/scroll';
import { duration, ease } from '@/lib/motion';
import { cn } from '@/lib/utils';

export interface GalleryEntry {
  id: string;
  caption: string;
  span: 'full' | 'half' | 'third';
  node: ReactNode;
  /** Generated illustration rather than a real screenshot. */
  illustrative?: boolean;
  /** Interactive embeds (sliders, inspectors) are not opened in the lightbox. */
  zoomable: boolean;
}

const SPAN: Record<GalleryEntry['span'], string> = {
  full: 'md:col-span-6',
  half: 'md:col-span-3',
  third: 'md:col-span-2',
};

/** Bento gallery with a keyboard-navigable lightbox (←/→, Esc, focus trapped and restored). */
export function Gallery({ items, className }: { items: GalleryEntry[]; className?: string }) {
  const zoomable = items.filter((i) => i.zoomable);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpenIndex(null), []);
  useFocusTrap(dialogRef, openIndex !== null, close);

  useEffect(() => {
    if (openIndex === null) return;
    lockScroll(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setOpenIndex((i) => (i === null ? i : (i + 1) % zoomable.length));
      if (e.key === 'ArrowLeft')
        setOpenIndex((i) => (i === null ? i : (i - 1 + zoomable.length) % zoomable.length));
    };
    window.addEventListener('keydown', onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener('keydown', onKey);
    };
  }, [openIndex, zoomable.length]);

  const current = openIndex !== null ? zoomable[openIndex] : null;

  return (
    <>
      <div className={cn('grid grid-cols-1 gap-5 md:grid-cols-6', className)}>
        {items.map((item) => (
          <figure key={item.id} className={cn('group', SPAN[item.span])}>
            <div className="relative overflow-hidden rounded-2xl border border-line">
              {item.node}
              {item.illustrative && (
                <span className="pointer-events-none absolute bottom-3 left-3 rounded-pill bg-surface/90 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted">
                  Illustration
                </span>
              )}
              {item.zoomable && (
                <button
                  type="button"
                  onClick={() => setOpenIndex(zoomable.indexOf(item))}
                  className="absolute inset-0 flex items-start justify-end p-3 opacity-100 transition-opacity focus-visible:opacity-100 md:opacity-0 md:group-hover:opacity-100"
                  aria-label={`Enlarge: ${item.caption}`}
                  data-cursor-label="Zoom"
                >
                  <span className="rounded-full bg-surface p-2 text-ink shadow-soft">
                    <Maximize2 className="h-4 w-4" aria-hidden="true" />
                  </span>
                </button>
              )}
            </div>
            <figcaption className="mt-2.5 font-mono text-xs text-muted">{item.caption}</figcaption>
          </figure>
        ))}
      </div>

      <AnimatePresence>
        {current && (
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`Image viewer: ${current.caption}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration.fast, ease: ease.out }}
            className="fixed inset-0 z-[80] flex flex-col bg-[#111]/95 p-4 sm:p-8"
          >
            <div className="flex items-center justify-between text-[#f6f4ef]">
              <p className="font-mono text-xs" aria-live="polite">
                {openIndex! + 1} / {zoomable.length} · {current.caption}
              </p>
              <button
                type="button"
                onClick={close}
                className="rounded-full p-2 hover:bg-white/10"
                aria-label="Close image viewer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div
              className="relative flex flex-1 items-center justify-center py-6"
              onClick={(e) => e.target === e.currentTarget && close()}
            >
              <div className="w-full max-w-5xl overflow-hidden rounded-2xl">{current.node}</div>
            </div>
            {zoomable.length > 1 && (
              <div className="flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setOpenIndex((openIndex! - 1 + zoomable.length) % zoomable.length)}
                  className="rounded-full border border-white/20 p-3 text-[#f6f4ef] hover:bg-white/10"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setOpenIndex((openIndex! + 1) % zoomable.length)}
                  className="rounded-full border border-white/20 p-3 text-[#f6f4ef] hover:bg-white/10"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

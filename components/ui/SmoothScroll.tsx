'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { setLenis, scrollToTarget } from '@/lib/scroll';

/**
 * Lenis smooth scroll + in-page anchor handling. Framer's useScroll reads native scroll position, which
 * Lenis keeps in sync, so the two never fight. Anchor clicks move focus to the target for keyboard users.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lenis = reduced
      ? null
      : new Lenis({
          duration: 1.1,
          autoRaf: true,
          prevent: (node) => node.closest('[data-lenis-prevent]') !== null,
        });
    setLenis(lenis);

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as HTMLElement | null)?.closest('a');
      if (!link) return;
      const url = new URL(link.href, window.location.href);
      if (!url.hash || url.pathname !== window.location.pathname || url.origin !== window.location.origin)
        return;
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) return;
      e.preventDefault();
      history.pushState(null, '', url.hash);
      scrollToTarget(target);
    };
    document.addEventListener('click', onClick);

    // Arriving with a hash (e.g. /#work from another page): wait a frame for layout, then scroll.
    if (window.location.hash) {
      const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
      if (target) requestAnimationFrame(() => scrollToTarget(target));
    }

    return () => {
      document.removeEventListener('click', onClick);
      setLenis(null);
      lenis?.destroy();
    };
  }, []);

  return null;
}

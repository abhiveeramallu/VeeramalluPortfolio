'use client';

import { useEffect } from 'react';

/**
 * Marks `[data-reveal]` elements with `data-inview="true"` the first time they enter the viewport (CSS does the
 * animation). Watches the DOM so elements on client-side navigations are picked up too.
 */
export function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          (e.target as HTMLElement).dataset.inview = 'true';
          io.unobserve(e.target);
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    const scan = () =>
      document
        .querySelectorAll<HTMLElement>('[data-reveal]:not([data-inview])')
        .forEach((el) => io.observe(el));
    scan();
    document.documentElement.classList.add('reveal-ready');
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
  return null;
}

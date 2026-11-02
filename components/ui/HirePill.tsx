'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { spring } from '@/lib/motion';
import { track } from '@/lib/analytics';

const SHOW_AFTER = 600;

/** Appears after 600px of scroll; hides while any contact section is on screen and on /contact itself. */
export function HirePill() {
  const pathname = usePathname();
  const [pastThreshold, setPastThreshold] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastThreshold(window.scrollY > SHOW_AFTER);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const targets = document.querySelectorAll('[data-contact-section]');
    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
      setContactVisible(visible.size > 0);
    });
    targets.forEach((t) => io.observe(t));
    return () => {
      window.removeEventListener('scroll', onScroll);
      io.disconnect();
    };
  }, [pathname]);

  const show = pastThreshold && !contactVisible && pathname !== '/contact';
  const href = pathname === '/' ? '#contact' : '/contact';

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={spring.snappy}
          className="no-print fixed bottom-6 left-1/2 z-40 -translate-x-1/2"
        >
          <Link
            href={href}
            onClick={() => track('cta_click', { location: 'hire_pill' })}
            className="flex items-center gap-2.5 rounded-pill bg-[#111] py-2 pl-2 pr-5 font-mono text-xs font-semibold text-[#f6f4ef] shadow-lift transition-transform hover:-translate-y-0.5"
          >
            <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-lime-500">
              <span className="pulse-dot relative h-2 w-2 rounded-full bg-[#111]" aria-hidden="true" />
            </span>
            Hire me
            <ArrowUpRight className="h-3.5 w-3.5 text-orange-500" aria-hidden="true" />
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

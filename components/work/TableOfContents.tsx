'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export function TableOfContents({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-20% 0px -65% 0px' },
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label="On this page" className="font-mono text-xs">
      <p className="mb-3 uppercase tracking-wider text-muted">On this page</p>
      <ol className="space-y-1 border-l border-line">
        {items.map((item, i) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? 'true' : undefined}
              className={cn(
                '-ml-px block border-l-2 py-1 pl-3 transition-colors',
                active === item.id
                  ? 'border-orange-500 font-semibold text-ink'
                  : 'border-transparent text-muted hover:text-ink',
              )}
            >
              <span className="mr-2 text-muted">{String(i + 1).padStart(2, '0')}</span>
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

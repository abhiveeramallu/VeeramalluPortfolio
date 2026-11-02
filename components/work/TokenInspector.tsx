'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { contrastRatio, wcagLevel } from '@/lib/contrast';
import { cn } from '@/lib/utils';
import { resolveToken, TOKEN_SETS } from './token-sets';

/**
 * Interactive "design token inspector": pick a component token, switch theme, and watch it resolve
 * component → semantic → global → hex, with a live WCAG check of the pair.
 */
export function TokenInspector({ slug }: { slug: string }) {
  const set = TOKEN_SETS[slug];
  const [selected, setSelected] = useState(0);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  if (!set) return null;

  const comp = set.components[selected];
  const bg = resolveToken(set, comp.bg, theme);
  const fg = resolveToken(set, comp.fg, theme);
  const ratio = contrastRatio(bg.hex, fg.hex);
  const level = wcagLevel(ratio);
  const canvas = theme === 'dark' ? '#111111' : '#F6F4EF';

  return (
    <div className="grid gap-0 overflow-hidden rounded-2xl bg-surface md:grid-cols-[220px_1fr]">
      <div className="border-b border-line p-4 md:border-b-0 md:border-r">
        <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-muted">Component tokens</p>
        <div role="radiogroup" aria-label="Component token" className="flex flex-wrap gap-1.5 md:flex-col">
          {set.components.map((c, i) => (
            <button
              key={c.name}
              type="button"
              role="radio"
              aria-checked={i === selected}
              onClick={() => setSelected(i)}
              className={cn(
                'rounded-lg px-3 py-2 text-left font-mono text-xs transition-colors',
                i === selected ? 'bg-[#111] text-[#f6f4ef]' : 'text-ink hover:bg-bg',
              )}
            >
              {c.name}
            </button>
          ))}
        </div>
        <div
          className="mt-4 flex rounded-pill border border-line p-1 font-mono text-[11px]"
          role="radiogroup"
          aria-label="Theme"
        >
          {(['light', 'dark'] as const).map((t) => (
            <button
              key={t}
              type="button"
              role="radio"
              aria-checked={theme === t}
              onClick={() => setTheme(t)}
              className={cn(
                'flex-1 rounded-pill px-3 py-1 capitalize',
                theme === t ? 'bg-orange-500 text-[#111]' : 'text-muted',
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-5 p-5">
        <div
          className="flex h-36 items-center justify-center rounded-xl transition-colors duration-300"
          style={{ background: canvas }}
        >
          <span
            className="rounded-xl px-5 py-3 font-display text-lg font-bold shadow-soft transition-colors duration-300"
            style={{ background: bg.hex, color: fg.hex }}
          >
            {comp.label}
          </span>
        </div>
        {[
          ['Background', comp.bg, bg],
          ['Text', comp.fg, fg],
        ].map(([label, semantic, resolved]) => {
          const r = resolved as { global: string; hex: string };
          return (
            <div key={label as string}>
              <p className="mb-1.5 font-mono text-[11px] uppercase tracking-wider text-muted">
                {label as string}
              </p>
              <ol className="flex flex-wrap items-center gap-1.5 font-mono text-xs text-ink">
                <li className="rounded-md bg-bg px-2 py-1">{`${comp.name}.${(label as string) === 'Text' ? 'fg' : 'bg'}`}</li>
                <ArrowRight className="h-3 w-3 text-muted" aria-hidden="true" />
                <li className="rounded-md bg-bg px-2 py-1">{semantic as string}</li>
                <ArrowRight className="h-3 w-3 text-muted" aria-hidden="true" />
                <li className="rounded-md bg-bg px-2 py-1">{r.global}</li>
                <ArrowRight className="h-3 w-3 text-muted" aria-hidden="true" />
                <li className="flex items-center gap-1.5 rounded-md bg-bg px-2 py-1">
                  <span
                    className="h-3 w-3 rounded-sm border border-line"
                    style={{ background: r.hex }}
                    aria-hidden="true"
                  />
                  {r.hex}
                </li>
              </ol>
            </div>
          );
        })}
        <p
          className="flex items-center gap-2 border-t border-line pt-4 font-mono text-xs text-ink"
          aria-live="polite"
        >
          Contrast <strong className="text-base">{ratio.toFixed(2)}:1</strong>
          <span
            className={cn(
              'rounded-pill px-2 py-0.5 font-semibold',
              level === 'Fail' ? 'bg-orange-100 text-orange-800' : 'bg-lime-500 text-[#111]',
            )}
          >
            {level}
          </span>
        </p>
      </div>
    </div>
  );
}

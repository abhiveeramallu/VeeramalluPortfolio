import { ArrowUpRight, Github } from 'lucide-react';
import { SITE_CONFIG } from '@/data/content';

/** Header colours for the repository cards, cycled so neighbours never match. */
const CARD_BANDS = ['#ffb21a', '#8fb4ff', '#7cc96a', '#f4a9b8', '#b6a4f0', '#ff8a3d', '#8fd3c1'];

/**
 * The smaller repositories as comic cards: a coloured header strip with a running number, the description,
 * technology pills and Code / Demo buttons. Numbering continues after the featured projects.
 */
export function RepoCards() {
  return (
    <ul className="grid gap-x-6 gap-y-8 md:grid-cols-2 xl:grid-cols-3">
      {SITE_CONFIG.archive.map((r, i) => {
        const band = CARD_BANDS[i % CARD_BANDS.length];
        return (
          <li
            key={r.url}
            style={{ rotate: `${i % 2 ? 0.8 : -0.8}deg` }}
            className="flex flex-col overflow-hidden rounded-[22px] border-[3px] border-[#16121f] bg-[#fff8ee] shadow-[6px_6px_0_0_#16121f] transition-[transform,box-shadow,rotate] duration-200 hover:-translate-y-1.5 hover:shadow-[10px_10px_0_0_#16121f] hover:[rotate:0deg] motion-reduce:transition-none"
          >
            <div
              className="relative flex items-center justify-between gap-3 border-b-[3px] border-[#16121f] px-5 py-3"
              style={{ background: band }}
            >
              <span className="font-[family-name:var(--font-comic)] text-2xl leading-none tracking-wide text-[#16121f]">
                #{String(SITE_CONFIG.projects.length + i + 1).padStart(2, '0')}
              </span>
              {r.liveUrl && (
                <span className="label rounded-pill border-2 border-[#16121f] bg-[#fff8ee] px-2.5 py-0.5 text-[10px] text-[#16121f]">
                  ● Live
                </span>
              )}
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="font-display text-step-1 font-semibold leading-tight text-[#16121f]">
                {r.name}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-[#3d3547]">{r.description}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
                {r.stack.split(' · ').map((s) => (
                  <li
                    key={s}
                    className="label rounded-pill border-2 border-[#16121f] bg-white px-2 py-0.5 text-[10px] text-[#16121f]"
                  >
                    {s}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2.5 text-sm">
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label inline-flex min-h-[36px] items-center gap-1.5 rounded-pill border-2 border-[#16121f] bg-[#16121f] px-3.5 text-[11px] text-[#fff8ee] shadow-[3px_3px_0_0_#ff5a1f] transition-transform hover:-translate-y-0.5"
                >
                  <Github size={13} aria-hidden /> Code<span className="sr-only"> for {r.name}</span>
                </a>
                {r.liveUrl && (
                  <a
                    href={r.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label inline-flex min-h-[36px] items-center gap-1.5 rounded-pill border-2 border-[#16121f] bg-[#fff8ee] px-3.5 text-[11px] text-[#16121f] shadow-[3px_3px_0_0_#16121f] transition-transform hover:-translate-y-0.5"
                  >
                    Demo <ArrowUpRight size={13} aria-hidden />
                    <span className="sr-only"> of {r.name}</span>
                  </a>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

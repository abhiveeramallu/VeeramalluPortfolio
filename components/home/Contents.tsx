import { SITE_CONFIG } from '@/data/content';

/** "In this issue": a magazine contents page that doubles as quick, accessible navigation to every project. */
export function Contents() {
  return (
    <section aria-labelledby="contents-title" className="border-y border-line bg-surface py-20">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-4 md:px-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div data-reveal>
          <p className="label text-accent">Contents</p>
          <h2 id="contents-title" className="type-h2 mt-4">
            In this <span className="accent-word text-accent-2">issue</span>
          </h2>
          <p className="mt-5 max-w-sm leading-relaxed text-soft">
            Nine projects, each described from its own repository — what it does, how it works, and where it
            falls short.
          </p>
        </div>
        <ol className="border-t border-line">
          {SITE_CONFIG.projects.map((p, i) => (
            <li key={p.slug} data-reveal style={{ ['--reveal-delay' as string]: `${i * 40}ms` }}>
              <a
                href={`#project-${p.slug}`}
                className="group flex min-h-[56px] items-baseline gap-4 border-b border-line py-3 transition-colors hover:text-accent"
              >
                <span className="label w-8 text-muted">{String(i + 1).padStart(2, '0')}</span>
                <span className="flex-1 font-display text-step-1 font-semibold">{p.title}</span>
                <span className="hidden flex-1 border-b border-dotted border-line sm:block" aria-hidden />
                <span className="label hidden text-[10px] text-muted md:inline">{p.category}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

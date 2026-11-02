import { SITE_CONFIG } from '@/data/content';

export function SkillsMarquee() {
  const rows = [
    { items: SITE_CONFIG.skillsRow1, anim: 'animate-marquee-left', dot: 'bg-orange-500' },
    { items: SITE_CONFIG.skillsRow2, anim: 'animate-marquee-right', dot: 'bg-indigo-500' },
  ];
  return (
    <section aria-label="Skills" className="marquee-container overflow-hidden py-12">
      <ul className="sr-only">
        {[...SITE_CONFIG.skillsRow1, ...SITE_CONFIG.skillsRow2].map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
      <div aria-hidden="true" className="flex flex-col gap-3">
        {rows.map((row, r) => (
          <div key={r} className={`marquee-track flex w-max ${row.anim}`}>
            {[...row.items, ...row.items].map((skill, i) => (
              <span
                key={i}
                className="mx-1.5 flex items-center gap-2 rounded-pill border border-line bg-surface px-5 py-2.5 font-mono text-sm font-medium text-ink"
              >
                <span className={`h-1.5 w-1.5 rounded-full ${row.dot}`} />
                {skill}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

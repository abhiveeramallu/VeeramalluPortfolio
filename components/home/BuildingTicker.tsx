import { SITE_CONFIG } from '@/data/content';
import { Asterisk } from '@/components/ui/Asterisk';

/** Honest stand-in for a client-logo row: what I'm building right now. */
export function BuildingTicker() {
  const items = [...SITE_CONFIG.currentlyBuilding, ...SITE_CONFIG.currentlyBuilding];
  return (
    <section
      aria-label="Currently building"
      className="marquee-container relative flex items-center overflow-hidden border-y border-line bg-surface"
    >
      <p className="eyebrow relative z-10 flex shrink-0 items-center gap-2 border-r border-line bg-surface px-4 py-4 text-ink sm:px-6">
        <span className="relative h-2 w-2 rounded-full bg-orange-500" aria-hidden="true">
          <span className="pulse-dot absolute inset-0 rounded-full bg-orange-500" />
        </span>
        Currently building
      </p>
      <div className="flex w-max animate-marquee-left whitespace-nowrap marquee-track" aria-hidden="true">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-6 px-6 font-mono text-sm text-ink">
            {item}
            <Asterisk className="h-3 w-3 text-orange-600" />
          </span>
        ))}
      </div>
      <ul className="sr-only">
        {SITE_CONFIG.currentlyBuilding.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

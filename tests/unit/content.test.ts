import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { SITE_CONFIG } from '@/data/content';
import { TOKEN_SETS } from '@/components/work/token-sets';

describe('content integrity', () => {
  it('has unique slugs', () => {
    const slugs = [...SITE_CONFIG.projects.map((p) => p.slug), ...SITE_CONFIG.experiments.map((e) => e.slug)];
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it.each(SITE_CONFIG.projects.map((p) => [p.slug, p] as const))(
    '%s follows the case-study story',
    (_slug, p) => {
      expect(p.metrics).toHaveLength(3);
      expect(p.constraints.length).toBeGreaterThan(0);
      expect(p.process.length).toBeGreaterThan(0);
      expect(p.decisions.length).toBeGreaterThan(0);
      expect(p.gallery.length).toBeGreaterThan(0);
      expect(p.retro.length).toBeGreaterThan(0);
      const ids = p.gallery.map((g) => g.id);
      expect(new Set(ids).size).toBe(ids.length);
      for (const g of p.gallery) if (g.kind === 'token-inspector') expect(TOKEN_SETS[p.slug]).toBeDefined();
    },
  );

  it('never ships lorem ipsum', () => {
    expect(JSON.stringify(SITE_CONFIG).toLowerCase()).not.toContain('lorem');
  });

  it('marks every placeholder testimonial so production hides it', () => {
    for (const t of SITE_CONFIG.testimonials)
      if (/replace me/i.test(t.quote)) expect(t.placeholder).toBe(true);
  });

  it('wires every experiment to a component', () => {
    const host = readFileSync('components/playground/ExperimentHost.tsx', 'utf8');
    for (const e of SITE_CONFIG.experiments) {
      expect(host).toContain(`'${e.slug}'`);
      expect(() => readFileSync(e.sourcePath)).not.toThrow();
    }
  });
});

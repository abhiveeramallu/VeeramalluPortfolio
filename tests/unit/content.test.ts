import { describe, expect, it } from 'vitest';
import { SITE_CONFIG } from '@/data/content';
import { ILLUSTRATION_DESCRIPTIONS } from '@/lib/illustrations';

const STATUSES = ['Live demo', 'Working prototype', 'Research prototype', 'In development'];

describe('content integrity', () => {
  const { projects } = SITE_CONFIG;

  it('has unique slugs and one illustration per project', () => {
    expect(new Set(projects.map((p) => p.slug)).size).toBe(projects.length);
    expect(new Set(projects.map((p) => p.illustration)).size).toBe(projects.length);
  });

  it.each(projects.map((p) => [p.slug, p] as const))('%s has a complete, sourced case study', (_slug, p) => {
    expect(STATUSES).toContain(p.status);
    expect(p.repoUrl).toMatch(/^https:\/\/github\.com\/abhiveeramallu\/[\w.-]+$/);
    if (p.liveUrl) expect(p.liveUrl).toMatch(/^https:\/\//);
    if (p.status === 'Live demo') expect(p.liveUrl).toBeTruthy();
    for (const field of [p.overview, p.problem, p.whyItMatters, p.contribution, p.currentStatus])
      expect(field.length).toBeGreaterThan(20);
    for (const list of [
      p.goals,
      p.constraints,
      p.implementation,
      p.decisions,
      p.challenges,
      p.limitations,
      p.learned,
    ])
      expect(list.length).toBeGreaterThan(0);
    expect(p.architecture.flow.length).toBeGreaterThan(1);
    for (const f of p.facts) expect(f.source.length).toBeGreaterThan(3);
  });

  it('describes every illustration for screen readers', () => {
    for (const p of projects) expect(ILLUSTRATION_DESCRIPTIONS[p.illustration].length).toBeGreaterThan(20);
  });

  it('every archive repository links to GitHub', () => {
    for (const r of SITE_CONFIG.archive) expect(r.url).toMatch(/^https:\/\/github\.com\/abhiveeramallu\//);
  });

  it('contains no placeholder text or inflated claims', () => {
    const text = JSON.stringify(SITE_CONFIG).toLowerCase();
    for (const banned of [
      'lorem',
      'todo',
      'replace me',
      'award-winning',
      'production-grade',
      'thousands of users',
      'trusted by',
    ])
      expect(text).not.toContain(banned);
  });

  it('no longer references the removed playground', () => {
    expect(JSON.stringify(SITE_CONFIG).toLowerCase()).not.toContain('playground');
  });
});

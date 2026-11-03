import { describe, expect, it } from 'vitest';
import { existsSync } from 'node:fs';
import { createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { SITE_CONFIG } from '@/data/content';
import {
  SCENE_PEEP,
  SceneArt,
  sceneBackground,
  sceneLayers,
  type SceneId,
} from '@/components/illustrations/scenes';

const scenes: SceneId[] = [...SITE_CONFIG.projects.map((p) => p.illustration), 'hero', 'about', 'contact'];

describe('illustrations', () => {
  it.each(scenes)('%s renders an Open Peeps character with a speech bubble', (id) => {
    const svg = renderToStaticMarkup(h('svg', null, h(SceneArt, { id })));
    expect(svg).toMatch(/href="\/peeps\/peep-\d+\.svg"/);
    expect(svg).toContain('class="bubble"');
    expect(svg).not.toContain('NaN');
  });

  it.each(scenes)('%s has back, mid and front layers', (id) => {
    const layers = sceneLayers(id);
    for (const depth of ['back', 'mid', 'front'] as const) expect(layers[depth]).toBeTruthy();
  });

  it('only references characters that exist in public/peeps', () => {
    for (const id of scenes) {
      const svg = renderToStaticMarkup(h('svg', null, h(SceneArt, { id })));
      for (const [, file] of svg.matchAll(/href="\/peeps\/([^"]+)"/g))
        expect(existsSync(`public/peeps/${file}`)).toBe(true);
    }
  });

  it.each(scenes)('%s preloads the character it actually shows', (id) => {
    const svg = renderToStaticMarkup(h('svg', null, h(SceneArt, { id })));
    expect(svg).toContain(`/peeps/${SCENE_PEEP[id]}.svg`);
  });

  it('gives neighbouring projects different card colours', () => {
    const colours = SITE_CONFIG.projects.map((p) => sceneBackground(p.illustration));
    for (let i = 1; i < colours.length; i++) expect(colours[i]).not.toBe(colours[i - 1]);
  });
});

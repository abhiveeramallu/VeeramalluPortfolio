import { SITE_CONFIG, getExperiment } from '@/data/content';
import { OG_SIZE, renderOg } from '@/lib/og';

export const alt = 'Playground experiment';
export const size = OG_SIZE;
export const contentType = 'image/png';

export function generateStaticParams() {
  return SITE_CONFIG.experiments.map((e) => ({ slug: e.slug }));
}

export default function Image({ params }: { params: { slug: string } }) {
  const e = getExperiment(params.slug);
  return renderOg({
    eyebrow: e ? `Playground · ${e.kind}` : 'Playground',
    title: e?.title ?? 'Experiment',
    accent: e?.tagline,
    color: e?.color,
  });
}

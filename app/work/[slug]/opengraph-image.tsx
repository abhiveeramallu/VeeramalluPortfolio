import { SITE_CONFIG, getProject } from '@/data/content';
import { OG_SIZE, renderOg } from '@/lib/og';

export const alt = 'Case study';
export const size = OG_SIZE;
export const contentType = 'image/png';

export function generateStaticParams() {
  return SITE_CONFIG.projects.map((p) => ({ slug: p.slug }));
}

export default function Image({ params }: { params: { slug: string } }) {
  const p = getProject(params.slug);
  return renderOg({
    eyebrow: p ? `${p.status} · ${p.category}` : 'Case study',
    title: p?.title ?? 'Case study',
    accent: p ? `${p.kind}, ${p.period}` : undefined,
  });
}

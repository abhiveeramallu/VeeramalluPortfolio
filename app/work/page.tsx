import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/data/content';
import { projectMedia } from '@/lib/assets';
import { ProjectCard } from '@/components/work/ProjectCard';
import { JsonLd } from '@/components/ui/JsonLd';
import { breadcrumbJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Work',
  description: `Case studies by ${SITE_CONFIG.name}: product design, design systems and creative development, with the trade-offs and numbers behind each.`,
  alternates: { canonical: '/work' },
};

const SIZES = ['lg', 'tall', 'md', 'md', 'md', 'md'] as const;
const SPANS = [
  'lg:col-span-4',
  'lg:col-span-2 lg:row-span-2',
  'lg:col-span-2',
  'lg:col-span-2',
  'lg:col-span-3',
  'lg:col-span-3',
];

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-32 sm:px-12">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Work', path: '/work' },
        ])}
      />
      <header className="mb-14 max-w-3xl">
        <p className="eyebrow mb-3 text-orange-600">Work · {SITE_CONFIG.projects.length} case studies</p>
        <h1 className="type-h1 text-ink">
          Problems I’ve <span className="accent-word text-orange-600">untangled.</span>
        </h1>
        <p className="mt-5 max-w-xl leading-relaxed text-muted">
          Each card is labelled honestly: <strong className="text-ink">Shipped</strong> (live),{' '}
          <strong className="text-ink">Prototype</strong> (working, not in production) or{' '}
          <strong className="text-ink">Self-initiated</strong> (my own brief).
        </p>
      </header>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-6 lg:gap-8">
        {SITE_CONFIG.projects.map((p, i) => (
          <ProjectCard
            key={p.slug}
            project={p}
            coverSrc={projectMedia(p.slug, 'cover')}
            size={SIZES[i] ?? 'md'}
            className={`${SPANS[i] ?? 'lg:col-span-3'} ${i === 0 ? 'md:col-span-2' : ''}`}
            priority={i === 0}
          />
        ))}
      </div>
    </div>
  );
}

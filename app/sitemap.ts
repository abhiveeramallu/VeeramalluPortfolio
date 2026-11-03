import type { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/data/content';
import { absoluteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ['/', '/work', '/about', '/contact'].map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: path === '/' ? 1 : 0.8,
  }));
  const projects = SITE_CONFIG.projects.map((p) => ({
    url: absoluteUrl(`/work/${p.slug}`),
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));
  return [...pages, ...projects, { url: absoluteUrl('/resume.pdf'), lastModified: now, priority: 0.6 }];
}

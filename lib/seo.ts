import { SITE_CONFIG, type ProjectItem } from '@/data/content';
import { absoluteUrl, SITE_URL } from '@/lib/site';

type JsonLdObject = Record<string, unknown>;

export function personJsonLd(): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: SITE_CONFIG.name,
    jobTitle: SITE_CONFIG.role,
    url: SITE_URL,
    email: `mailto:${SITE_CONFIG.email}`,
    address: { '@type': 'PostalAddress', addressLocality: SITE_CONFIG.location },
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Vellore Institute of Technology' },
    sameAs: Object.values(SITE_CONFIG.socials).filter(Boolean),
    knowsAbout: SITE_CONFIG.skills.flatMap((g) => g.items).slice(0, 20),
  };
}

export function websiteJsonLd(): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_CONFIG.brandName,
    author: { '@id': `${SITE_URL}/#person` },
    inLanguage: 'en',
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function projectJsonLd(project: ProjectItem): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: project.title,
    description: project.summary,
    url: absoluteUrl(`/work/${project.slug}`),
    image: absoluteUrl(`/work/${project.slug}/opengraph-image`),
    codeRepository: project.repoUrl,
    programmingLanguage: project.stack.slice(0, 4),
    genre: project.category,
    keywords: project.stack.join(', '),
    author: { '@id': `${SITE_URL}/#person` },
    ...(project.liveUrl ? { sameAs: project.liveUrl } : {}),
  };
}

/** Serialise for a <script type="application/ld+json"> without allowing `</script>` breakouts. */
export function serializeJsonLd(data: JsonLdObject | JsonLdObject[]): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

import { SITE_CONFIG } from '@/data/content';
import { OG_SIZE, renderOg } from '@/lib/og';

export const alt = `${SITE_CONFIG.name} — ${SITE_CONFIG.role}`;
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function Image() {
  return renderOg({
    eyebrow: `${SITE_CONFIG.status} · ${SITE_CONFIG.availability}`,
    title: SITE_CONFIG.name,
    accent: 'designs products and ships them in code.',
  });
}

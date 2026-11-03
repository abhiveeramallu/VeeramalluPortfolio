import { SITE_CONFIG } from '@/data/content';
import { OG_SIZE, renderOg } from '@/lib/og';

export const alt = `${SITE_CONFIG.name} — ${SITE_CONFIG.role}`;
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function Image() {
  return renderOg({
    eyebrow: 'Interactive portfolio · VIT Vellore',
    title: SITE_CONFIG.name,
    accent: SITE_CONFIG.tagline,
  });
}

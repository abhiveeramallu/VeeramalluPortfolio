import type { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/data/content';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_CONFIG.name} — ${SITE_CONFIG.role}`,
    short_name: SITE_CONFIG.shortName,
    description: SITE_CONFIG.tagline,
    start_url: '/',
    display: 'standalone',
    background_color: '#F6F4EF',
    theme_color: '#F6F4EF',
    icons: [
      { src: '/icon/192', sizes: '192x192', type: 'image/png' },
      { src: '/icon/512', sizes: '512x512', type: 'image/png' },
      { src: '/icon/512', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}

import { ImageResponse } from 'next/og';
import { SITE_CONFIG } from '@/data/content';

export function generateImageMetadata() {
  return [
    { id: 'small', size: { width: 32, height: 32 }, contentType: 'image/png' },
    { id: '192', size: { width: 192, height: 192 }, contentType: 'image/png' },
    { id: '512', size: { width: 512, height: 512 }, contentType: 'image/png' },
  ];
}

const SIZES: Record<string, number> = { small: 32, '192': 192, '512': 512 };

/** Favicon + PWA icons, generated: ink tile, orange initial "A" and a lime dot. */
export default function Icon({ id }: { id: string }) {
  const s = SIZES[id] ?? 32;
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#111',
          borderRadius: s * 0.22,
          position: 'relative',
        }}
      >
        <div
          style={{
            color: '#FF5A1F',
            fontSize: s * 0.68,
            fontWeight: 800,
            lineHeight: 1,
            marginTop: -s * 0.04,
          }}
        >
          {SITE_CONFIG.shortName[0]}
        </div>
        <div
          style={{
            position: 'absolute',
            right: s * 0.16,
            bottom: s * 0.16,
            width: s * 0.16,
            height: s * 0.16,
            borderRadius: s,
            background: '#C6F432',
          }}
        />
      </div>
    ),
    { width: s, height: s },
  );
}

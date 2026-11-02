import { ImageResponse } from 'next/og';
import { SITE_CONFIG } from '@/data/content';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
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
          position: 'relative',
        }}
      >
        <div style={{ color: '#FF5A1F', fontSize: 124, fontWeight: 800 }}>{SITE_CONFIG.shortName[0]}</div>
        <div
          style={{
            position: 'absolute',
            right: 30,
            bottom: 30,
            width: 28,
            height: 28,
            borderRadius: 14,
            background: '#C6F432',
          }}
        />
      </div>
    ),
    size,
  );
}

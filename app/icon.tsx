import { ImageResponse } from 'next/og';

export function generateImageMetadata() {
  return [
    { id: 'small', size: { width: 32, height: 32 }, contentType: 'image/png' },
    { id: '192', size: { width: 192, height: 192 }, contentType: 'image/png' },
    { id: '512', size: { width: 512, height: 512 }, contentType: 'image/png' },
  ];
}

const SIZES: Record<string, number> = { small: 32, '192': 192, '512': 512 };

/** Favicon + PWA icons, generated: olive tile with a cut-paper sun, leaf and coral dot. */
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
          background: '#171811',
          borderRadius: s * 0.22,
        }}
      >
        <svg width={s * 0.66} height={s * 0.66} viewBox="0 0 40 40">
          <circle cx="27" cy="12" r="7" fill="#e5c542" />
          <path d="M6 36 C 10 24, 14 20, 17 10 C 21 20, 20 28, 19 36 Z" fill="#328477" />
          <circle cx="26" cy="27" r="7" fill="#e98b72" />
        </svg>
      </div>
    ),
    { width: s, height: s },
  );
}

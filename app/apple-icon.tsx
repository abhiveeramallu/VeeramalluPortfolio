import { ImageResponse } from 'next/og';

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
          background: '#171811',
        }}
      >
        <svg width={118} height={118} viewBox="0 0 40 40">
          <circle cx="27" cy="12" r="7" fill="#e5c542" />
          <path d="M6 36 C 10 24, 14 20, 17 10 C 21 20, 20 28, 19 36 Z" fill="#328477" />
          <circle cx="26" cy="27" r="7" fill="#e98b72" />
        </svg>
      </div>
    ),
    size,
  );
}

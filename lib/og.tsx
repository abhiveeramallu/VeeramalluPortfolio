import { ImageResponse } from 'next/og';
import { SITE_CONFIG } from '@/data/content';
import { SITE_URL } from '@/lib/site';

export const OG_SIZE = { width: 1200, height: 630 };

/** Fetches a Google font subset as TTF for next/og. Falls back to the built-in font if offline. */
async function loadFont(
  family: string,
  weight: number,
  text: string,
  italic = false,
): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, '+')}:${italic ? 'ital,' : ''}wght@${italic ? '1,' : ''}${weight}&text=${encodeURIComponent(text)}`,
      {
        headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh) AppleWebKit/533 (KHTML, like Gecko)' },
      },
    ).then((r) => r.text());
    const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
    return url ? await fetch(url).then((r) => r.arrayBuffer()) : null;
  } catch {
    return null;
  }
}

/** Shared OG card: olive paper, cut-paper botanicals, title, one serif accent line, footer. */
export async function renderOg({
  eyebrow,
  title,
  accent,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
}) {
  const domain = SITE_URL.replace(/^https?:\/\//, '');
  const allText = `${eyebrow}${title}${SITE_CONFIG.name}${SITE_CONFIG.role}${domain}`;
  const [display, serif] = await Promise.all([
    loadFont('Fraunces', 600, allText),
    accent ? loadFont('Instrument Serif', 400, accent, true) : null,
  ]);
  const fonts = [
    ...(display ? [{ name: 'Display', data: display, weight: 600 as const, style: 'normal' as const }] : []),
    ...(serif ? [{ name: 'Serif', data: serif, weight: 400 as const, style: 'italic' as const }] : []),
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#171811',
          padding: 72,
          fontFamily: 'Display',
          position: 'relative',
          color: '#f4f0de',
        }}
      >
        <svg
          width={380}
          height={380}
          viewBox="0 0 100 100"
          style={{ position: 'absolute', right: 60, top: 120 }}
        >
          <circle cx="70" cy="22" r="14" fill="#e5c542" />
          <path d="M8 96 C 20 60, 32 52, 40 30 C 48 52, 46 70, 44 96 Z" fill="#328477" />
          <path d="M44 96 C 50 66, 64 56, 86 46 C 82 70, 66 84, 52 96 Z" fill="#20594f" />
          <circle cx="62" cy="64" r="11" fill="#e98b72" />
        </svg>
        <div
          style={{
            display: 'flex',
            fontSize: 24,
            color: '#e5c542',
            letterSpacing: 3,
            textTransform: 'uppercase',
          }}
        >
          {eyebrow}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 760 }}>
          <div
            style={{
              fontSize: title.length > 24 ? 64 : 88,
              fontWeight: 600,
              lineHeight: 1.02,
              letterSpacing: -2,
            }}
          >
            {title}
          </div>
          {accent && (
            <div
              style={{
                fontSize: 44,
                fontFamily: 'Serif',
                fontStyle: 'italic',
                color: '#d6d1bc',
                marginTop: 18,
                lineHeight: 1.2,
              }}
            >
              {accent}
            </div>
          )}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 22,
            borderTop: '1px solid rgba(244,240,222,0.2)',
            paddingTop: 24,
            color: '#d6d1bc',
          }}
        >
          <div style={{ display: 'flex' }}>
            {SITE_CONFIG.name} · {SITE_CONFIG.role}
          </div>
          <div style={{ display: 'flex' }}>{domain}</div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: fonts.length ? fonts : undefined },
  );
}

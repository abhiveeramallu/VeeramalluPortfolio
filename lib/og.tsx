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

/** Shared OG card in the site's comic theme: hot orange, a starburst, slab title, one serif accent line. */
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
    loadFont('Alfa Slab One', 400, allText),
    accent ? loadFont('Instrument Serif', 400, accent, true) : null,
  ]);
  const fonts = [
    ...(display ? [{ name: 'Display', data: display, weight: 400 as const, style: 'normal' as const }] : []),
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
          background: '#ff5a1f',
          padding: 72,
          fontFamily: 'Display',
          position: 'relative',
          color: '#16121f',
        }}
      >
        <svg
          width={380}
          height={380}
          viewBox="0 0 100 100"
          style={{ position: 'absolute', right: 60, top: 120 }}
        >
          <polygon
            points="50.0,4.0 56.6,16.7 67.6,7.5 68.9,21.7 82.5,17.5 78.3,31.1 92.5,32.4 83.3,43.4 96.0,50.0 83.3,56.6 92.5,67.6 78.3,68.9 82.5,82.5 68.9,78.3 67.6,92.5 56.6,83.3 50.0,96.0 43.4,83.3 32.4,92.5 31.1,78.3 17.5,82.5 21.7,68.9 7.5,67.6 16.7,56.6 4.0,50.0 16.7,43.4 7.5,32.4 21.7,31.1 17.5,17.5 31.1,21.7 32.4,7.5 43.4,16.7"
            fill="#ffb21a"
            stroke="#16121f"
            strokeWidth="2"
          />
          <circle cx="50" cy="50" r="18" fill="#fff3e6" stroke="#16121f" strokeWidth="2" />
        </svg>
        <div
          style={{
            display: 'flex',
            fontSize: 24,
            color: '#16121f',
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
              fontWeight: 400,
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
                color: '#2a1f45',
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
            borderTop: '2px solid #16121f',
            paddingTop: 24,
            color: '#2a1f45',
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

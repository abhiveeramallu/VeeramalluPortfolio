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

const SHAPES = ['#FF5A1F', '#5B5BFF', '#C6F432', '#FFB8D6'];

/** Shared branded OG card: eyebrow, title, one serif accent line, footer with name + domain. */
export async function renderOg({
  eyebrow,
  title,
  accent,
  color = '#FF5A1F',
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  color?: string;
}) {
  const domain = SITE_URL.replace(/^https?:\/\//, '');
  const allText = `${eyebrow}${title}${accent ?? ''}${SITE_CONFIG.name}${SITE_CONFIG.role}${domain}`;
  const [display, serif] = await Promise.all([
    loadFont('Space Grotesk', 700, allText),
    accent ? loadFont('Instrument Serif', 400, accent, true) : null,
  ]);
  const fonts = [
    ...(display ? [{ name: 'Display', data: display, weight: 700 as const, style: 'normal' as const }] : []),
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
          background: '#F6F4EF',
          padding: 72,
          fontFamily: 'Display',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: 70,
            top: 70,
            display: 'flex',
            flexWrap: 'wrap',
            width: 220,
            gap: 16,
          }}
        >
          {SHAPES.map((c, i) => (
            <div
              key={c}
              style={{
                width: 96,
                height: 96,
                borderRadius: i % 2 ? 28 : 48,
                background: c === SHAPES[0] ? color : c,
              }}
            />
          ))}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 26,
            color: '#6B6B66',
            letterSpacing: 2,
            textTransform: 'uppercase',
          }}
        >
          {eyebrow}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 860 }}>
          <div
            style={{
              fontSize: title.length > 28 ? 68 : 92,
              fontWeight: 700,
              color: '#111',
              lineHeight: 1.02,
              letterSpacing: -3,
            }}
          >
            {title}
          </div>
          {accent && (
            <div
              style={{
                fontSize: 52,
                fontFamily: 'Serif',
                fontStyle: 'italic',
                color: '#BD3D0C',
                marginTop: 18,
                lineHeight: 1.15,
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
            fontSize: 24,
            color: '#111',
            borderTop: '2px solid #E4E0D8',
            paddingTop: 24,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                background: '#111',
                color: '#FF5A1F',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
              }}
            >
              {SITE_CONFIG.initials}
            </div>
            {SITE_CONFIG.name} · {SITE_CONFIG.role}
          </div>
          <div style={{ display: 'flex', color: '#6B6B66' }}>{domain}</div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: fonts.length ? fonts : undefined },
  );
}

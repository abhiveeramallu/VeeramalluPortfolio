import PEEP_SIZES from './peeps.json';

/**
 * A small kit for editorial illustrations: hand-drawn Open Peeps characters plus props drawn to match (thin
 * ink outlines, flat fills). Everything is plain SVG in absolute viewBox coordinates so CSS can animate parts
 * around real pivot points (`transform-box: view-box`).
 */

export const INK = '#1f1d2b';
export const C = {
  ink: INK,
  cream: '#fbf3e7',
  paper: '#ffffff',
  skin: '#c98b62',
  skinShade: '#b47750',
  hair: '#2a2230',
  blue: '#5b8def',
  blueDeep: '#2f4fb3',
  green: '#7cc96a',
  greenDeep: '#3f8a4a',
  red: '#e8605a',
  redDeep: '#b8392f',
  yellow: '#f4c84a',
  orange: '#f28a4b',
  lilac: '#b6a4f0',
  pink: '#f4a9b8',
  sky: '#cfe1ff',
  grey: '#d9d4cb',
  greyDeep: '#8d8778',
  charcoal: '#3a3946',
};

/* ───────── props ───────── */

export function Sparkle({
  x,
  y,
  r = 10,
  fill = C.cream,
  className = 'drift',
}: {
  x: number;
  y: number;
  r?: number;
  fill?: string;
  className?: string;
}) {
  return (
    <path
      className={className}
      d={`M${x} ${y - r} L${x + r * 0.25} ${y - r * 0.25} L${x + r} ${y} L${x + r * 0.25} ${y + r * 0.25} L${x} ${y + r} L${x - r * 0.25} ${y + r * 0.25} L${x - r} ${y} L${x - r * 0.25} ${y - r * 0.25} Z`}
      fill={fill}
      stroke={INK}
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  );
}

export function Plant({
  x,
  y,
  s = 1,
  pot = C.orange,
  leaf = C.greenDeep,
}: {
  x: number;
  y: number;
  s?: number;
  pot?: string;
  leaf?: string;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="sway-leaves">
        {[
          'M0 -40 C -26 -62 -30 -92 -12 -108 C -6 -84 -2 -62 0 -40 Z',
          'M0 -40 C 22 -60 34 -88 18 -112 C 8 -86 4 -62 0 -40 Z',
          'M0 -38 C -36 -40 -52 -58 -54 -76 C -30 -70 -14 -56 0 -38 Z',
          'M0 -38 C 30 -36 50 -48 58 -66 C 34 -64 16 -54 0 -38 Z',
        ].map((path, i) => (
          <path
            key={i}
            d={path}
            fill={i % 2 ? leaf : C.green}
            stroke={INK}
            strokeWidth="2"
            strokeLinejoin="round"
          />
        ))}
      </g>
      <path
        d="M-20 -42 L 20 -42 L 15 0 L -15 0 Z"
        fill={pot}
        stroke={INK}
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path d="M-23 -46 h 46 v 8 h -46 Z" fill={pot} stroke={INK} strokeWidth="2.4" />
    </g>
  );
}

export function Laptop({
  x,
  y,
  s = 1,
  screen = C.blueDeep,
  flip = false,
}: {
  x: number;
  y: number;
  s?: number;
  screen?: string;
  flip?: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <path
        d="M-8 0 L 52 0 L 58 6 L -14 6 Z"
        fill={C.grey}
        stroke={INK}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path
        d="M2 0 L 46 0 L 52 -38 L 8 -38 Z"
        fill={C.charcoal}
        stroke={INK}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path d="M8 -5 L 43 -5 L 47 -33 L 12 -33 Z" fill={screen} />
      <g className="typing-lines">
        <path d="M16 -27 h 18" stroke={C.yellow} strokeWidth="2.6" strokeLinecap="round" />
        <path d="M15 -20 h 24" stroke={C.cream} strokeWidth="2.6" strokeLinecap="round" />
        <path d="M14 -13 h 13" stroke={C.pink} strokeWidth="2.6" strokeLinecap="round" />
      </g>
    </g>
  );
}

export function Table({
  x,
  y,
  w = 120,
  color = C.cream,
}: {
  x: number;
  y: number;
  w?: number;
  color?: string;
}) {
  return (
    <g>
      <path
        d={`M${x + 10} ${y - 70} L ${x + 16} ${y} M${x + w - 10} ${y - 70} L ${x + w - 16} ${y}`}
        stroke={INK}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <rect x={x} y={y - 78} width={w} height={11} rx={5} fill={color} stroke={INK} strokeWidth="2.4" />
    </g>
  );
}

export function Magnifier({
  x,
  y,
  r = 26,
  className,
}: {
  x: number;
  y: number;
  r?: number;
  className?: string;
}) {
  return (
    <g className={className}>
      <path
        d={`M${x + r * 0.7} ${y + r * 0.7} L ${x + r * 1.6} ${y + r * 1.6}`}
        stroke={INK}
        strokeWidth="9"
        strokeLinecap="round"
      />
      <path
        d={`M${x + r * 0.75} ${y + r * 0.75} L ${x + r * 1.55} ${y + r * 1.55}`}
        stroke={C.redDeep}
        strokeWidth="5"
        strokeLinecap="round"
      />
      <circle cx={x} cy={y} r={r} fill={C.sky} fillOpacity="0.55" stroke={INK} strokeWidth="5" />
      <path
        d={`M${x - r * 0.5} ${y - r * 0.2} A ${r * 0.55} ${r * 0.55} 0 0 1 ${x - r * 0.1} ${y - r * 0.55}`}
        stroke={C.paper}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </g>
  );
}

export function Doc({
  x,
  y,
  w = 56,
  h = 72,
  rot = 0,
  lines = 4,
  accent = C.red,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  rot?: number;
  lines?: number;
  accent?: string;
}) {
  return (
    <g transform={`rotate(${rot} ${x + w / 2} ${y + h / 2})`}>
      <rect x={x} y={y} width={w} height={h} rx={5} fill={C.paper} stroke={INK} strokeWidth="2.4" />
      {Array.from({ length: lines }, (_, i) => (
        <path
          key={i}
          d={`M${x + 9} ${y + 14 + i * 12} h ${i % 3 === 2 ? w * 0.4 : w - 18}`}
          stroke={i === 1 ? accent : C.greyDeep}
          strokeWidth="3"
          strokeLinecap="round"
        />
      ))}
    </g>
  );
}

export function Cloud({
  x,
  y,
  s = 1,
  className = 'drift',
}: {
  x: number;
  y: number;
  s?: number;
  className?: string;
}) {
  return (
    <path
      className={className}
      transform={`translate(${x} ${y}) scale(${s})`}
      d="M-30 10 C -44 10 -44 -10 -28 -10 C -26 -26 -4 -30 4 -16 C 12 -26 34 -20 30 -4 C 44 -4 44 10 30 10 Z"
      fill={C.paper}
      stroke={INK}
      strokeWidth="2.4"
      strokeLinejoin="round"
    />
  );
}

export function Ground({ y = 284, w = 360, x = 20 }: { y?: number; w?: number; x?: number }) {
  return <path d={`M${x} ${y} h ${w}`} stroke={INK} strokeWidth="2.4" strokeLinecap="round" />;
}

/** The soft tinted circle behind each composition. */
export function Backdrop({
  cx = 250,
  cy = 150,
  r = 120,
  fill = '#ffffff',
  opacity = 0.22,
}: {
  cx?: number;
  cy?: number;
  r?: number;
  fill?: string;
  opacity?: number;
}) {
  return <circle cx={cx} cy={cy} r={r} fill={fill} opacity={opacity} />;
}

/* ───────── Open Peeps characters ───────── */

export type PeepName = keyof typeof PEEP_SIZES;

/**
 * A hand-drawn Open Peeps character (CC0, prepared by scripts/build-peeps.mjs). (x, y) is the bottom centre;
 * `h` its height. `tint` adds the comic "misprint": a solid colour copy of the silhouette offset behind it,
 * like a two-colour print slightly out of register. `uid` keeps the filter id unique on the page.
 */
export function Peep({
  name,
  x,
  y,
  h,
  uid,
  tint,
  flip = false,
}: {
  name: PeepName;
  x: number;
  y: number;
  h: number;
  uid: string;
  tint?: string;
  flip?: boolean;
}) {
  const size = PEEP_SIZES[name];
  const w = (h * size.w) / size.h;
  const href = `/peeps/${name}.svg`;
  const mirror = flip ? `translate(${2 * x} 0) scale(-1 1)` : undefined;
  const filterId = `misprint-${uid}`;
  return (
    <g className="peep" style={{ transformOrigin: `${x}px ${y}px`, transformBox: 'view-box' }}>
      {tint && (
        <>
          <defs>
            <filter id={filterId} x="-5%" y="-5%" width="110%" height="110%">
              <feFlood floodColor={tint} />
              <feComposite in2="SourceAlpha" operator="in" />
            </filter>
          </defs>
          <g transform="translate(8 6)">
            <image
              href={href}
              x={x - w / 2}
              y={y - h}
              width={w}
              height={h}
              transform={mirror}
              filter={`url(#${filterId})`}
            />
          </g>
        </>
      )}
      <image href={href} x={x - w / 2} y={y - h} width={w} height={h} transform={mirror} />
    </g>
  );
}

/* ───────── comic devices ───────── */

/** A field of halftone dots clipped to a circle — the printed-comic backdrop. */
export function Halftone({
  uid,
  cx,
  cy,
  r,
  color = INK,
  opacity = 0.16,
  dot = 2.6,
  gap = 11,
}: {
  uid: string;
  cx: number;
  cy: number;
  r: number;
  color?: string;
  opacity?: number;
  dot?: number;
  gap?: number;
}) {
  const id = `halftone-${uid}`;
  return (
    <>
      <defs>
        <pattern id={id} width={gap} height={gap} patternUnits="userSpaceOnUse" patternTransform="rotate(20)">
          <circle cx={gap / 2} cy={gap / 2} r={dot} fill={color} />
        </pattern>
      </defs>
      <circle cx={cx} cy={cy} r={r} fill={`url(#${id})`} opacity={opacity} />
    </>
  );
}

/** Radial speed lines bursting out from a point. */
export function SpeedLines({
  cx,
  cy,
  r1 = 120,
  r2 = 260,
  n = 28,
  color = INK,
  opacity = 0.14,
}: {
  cx: number;
  cy: number;
  r1?: number;
  r2?: number;
  n?: number;
  color?: string;
  opacity?: number;
}) {
  return (
    <g opacity={opacity}>
      {Array.from({ length: n }, (_, i) => {
        const a = (i / n) * Math.PI * 2 + (i % 2) * 0.04;
        const inner = r1 + (i % 3) * 14;
        return (
          <path
            key={i}
            d={`M${(cx + Math.cos(a) * inner).toFixed(1)} ${(cy + Math.sin(a) * inner).toFixed(1)} L ${(cx + Math.cos(a) * r2).toFixed(1)} ${(cy + Math.sin(a) * r2).toFixed(1)}`}
            stroke={color}
            strokeWidth={i % 2 ? 2 : 3.5}
            strokeLinecap="round"
          />
        );
      })}
    </g>
  );
}

/** A comic starburst ("POW!" shape). */
export function Burst({
  cx,
  cy,
  r,
  fill = C.yellow,
  spikes = 16,
  className,
}: {
  cx: number;
  cy: number;
  r: number;
  fill?: string;
  spikes?: number;
  className?: string;
}) {
  const pts = Array.from({ length: spikes * 2 }, (_, i) => {
    const a = (i / (spikes * 2)) * Math.PI * 2 - Math.PI / 2;
    const rr = i % 2 ? r * 0.74 : r * (i % 4 ? 0.98 : 1.06);
    return `${(cx + Math.cos(a) * rr).toFixed(1)},${(cy + Math.sin(a) * rr).toFixed(1)}`;
  }).join(' ');
  return (
    <polygon
      points={pts}
      fill={fill}
      stroke={INK}
      strokeWidth="2.8"
      strokeLinejoin="round"
      className={className}
      style={{ transformOrigin: `${cx}px ${cy}px`, transformBox: 'view-box' }}
    />
  );
}

/**
 * A speech bubble in the comic face. (x, y) is its top-left; the tail points down to `tailX`. Width is
 * estimated from the text, so keep lines short and uppercase.
 */
export function Bubble({
  x,
  y,
  text,
  tailX,
  size = 17,
  fill = C.paper,
}: {
  x: number;
  y: number;
  text: string;
  tailX?: number;
  size?: number;
  fill?: string;
}) {
  const w = Math.round(text.length * size * 0.5 + 30);
  const h = Math.round(size + 22);
  const tx = tailX ?? x + w * 0.3;
  return (
    <g className="bubble" style={{ transformOrigin: `${tx}px ${y + h}px`, transformBox: 'view-box' }}>
      <rect x={x + 4} y={y + 4} width={w} height={h} rx={h / 2} fill={INK} />
      <path
        d={`M${tx - 10} ${y + h - 2} L ${tx - 4} ${y + h + 16} L ${tx + 12} ${y + h - 2} Z`}
        fill={fill}
        stroke={INK}
        strokeWidth="2.8"
        strokeLinejoin="round"
      />
      <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={fill} stroke={INK} strokeWidth="2.8" />
      <path d={`M${tx - 8} ${y + h - 1.5} L ${tx + 10} ${y + h - 1.5}`} stroke={fill} strokeWidth="3" />
      <text
        x={x + w / 2}
        y={y + h / 2 + size * 0.36}
        textAnchor="middle"
        fontSize={size}
        fill={INK}
        style={{ fontFamily: 'var(--font-comic), Impact, sans-serif', letterSpacing: '0.04em' }}
      >
        {text}
      </text>
    </g>
  );
}

import { SHAPES, type ShapeSpec } from './composition';

/**
 * Static SVG of the hero composition (same layout as the WebGL scene). It is server-rendered, so it is
 * what everyone sees at first paint, what reduced-motion / no-WebGL users keep, and the error fallback.
 */
const UNIT = 66;
const CX = 200;
const CY = 215;

const project = ([x, y]: [number, number, number]) => [CX + x * UNIT, CY - y * UNIT] as const;
const deg = (r: number) => (r * 180) / Math.PI;

function Glyph({ s, i }: { s: ShapeSpec; i: number }) {
  const [x, y] = project(s.home);
  const k = s.scale * UNIT;
  const fill = `url(#g${i})`;
  switch (s.kind) {
    case 'sphere':
      return <circle cx={x} cy={y} r={0.4 * k} fill={fill} opacity={s.glass ? 0.85 : 1} />;
    case 'box':
      return (
        <rect
          x={x - 0.36 * k}
          y={y - 0.36 * k}
          width={0.72 * k}
          height={0.72 * k}
          rx={0.16 * k}
          fill={fill}
          transform={`rotate(${deg(s.rot[2]) + 12} ${x} ${y})`}
        />
      );
    case 'pill':
      return (
        <rect
          x={x - 0.2 * k}
          y={y - 0.48 * k}
          width={0.4 * k}
          height={0.96 * k}
          rx={0.2 * k}
          fill={fill}
          transform={`rotate(${-deg(s.rot[2])} ${x} ${y})`}
        />
      );
    case 'torus':
    case 'knot':
      return <circle cx={x} cy={y} r={0.32 * k} fill="none" stroke={fill} strokeWidth={0.2 * k} />;
    case 'asterisk':
      return (
        <g
          transform={`rotate(${deg(s.rot[2])} ${x} ${y})`}
          stroke={s.color}
          strokeWidth={0.2 * k}
          strokeLinecap="round"
        >
          {[0, 60, 120].map((a) => (
            <line
              key={a}
              x1={x}
              y1={y - 0.42 * k}
              x2={x}
              y2={y + 0.42 * k}
              transform={`rotate(${a} ${x} ${y})`}
            />
          ))}
        </g>
      );
  }
}

export function HeroFallback({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 430"
      className={className}
      role="img"
      aria-label="Glossy pastel shapes arranged into the letter A"
    >
      <defs>
        {SHAPES.map((s, i) => (
          <radialGradient key={i} id={`g${i}`} cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="28%" stopColor={s.color} />
            <stop offset="100%" stopColor={s.color} stopOpacity="0.92" />
          </radialGradient>
        ))}
        <radialGradient id="shadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#111" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#111" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx={CX} cy={392} rx={150} ry={20} fill="url(#shadow)" />
      {SHAPES.map((s, i) => (s.home[2] < 0 ? <Glyph key={i} s={s} i={i} /> : null))}
      {SHAPES.map((s, i) => (s.home[2] >= 0 ? <Glyph key={i} s={s} i={i} /> : null))}
    </svg>
  );
}

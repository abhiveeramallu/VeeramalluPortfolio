import type { ReactNode } from 'react';
import type { ProjectArt as ArtKind } from '@/data/content';

/**
 * Generated, brand-coloured mockups used whenever a real screenshot is missing. Each project has its own
 * visual language so the grid never looks templated. `scene` varies the composition (0 = cover).
 * All art is a 640×400 SVG (16:10) so it slots into any frame.
 */
export type ArtScene = number | 'before' | 'after';

const INK = '#111111';
const LINE = '#E4E0D8';
const MONO = { fontFamily: 'var(--font-mono), monospace' };

function Browser({ children, dark = false, url }: { children: ReactNode; dark?: boolean; url: string }) {
  return (
    <g>
      <rect
        x="40"
        y="36"
        width="560"
        height="340"
        rx="18"
        fill={dark ? '#151515' : '#fff'}
        stroke={dark ? '#2E2E2B' : LINE}
      />
      <rect x="40" y="36" width="560" height="36" rx="18" fill={dark ? '#1E1E1C' : '#FAF8F4'} />
      <rect x="40" y="60" width="560" height="12" fill={dark ? '#1E1E1C' : '#FAF8F4'} />
      {['#FF5A1F', '#FFC53D', '#C6F432'].map((c, i) => (
        <circle key={c} cx={62 + i * 16} cy="54" r="5" fill={c} />
      ))}
      <rect x="230" y="45" width="180" height="18" rx="9" fill={dark ? '#2A2A27' : '#EFECE6'} />
      <text x="320" y="58" textAnchor="middle" fontSize="9" fill={dark ? '#A3A39C' : '#6B6B66'} style={MONO}>
        {url}
      </text>
      {children}
    </g>
  );
}

function Phone({ x = 236, children, dark = false }: { x?: number; children: ReactNode; dark?: boolean }) {
  return (
    <g>
      <rect x={x} y="24" width="168" height="352" rx="30" fill={INK} />
      <rect x={x + 8} y="32" width="152" height="336" rx="24" fill={dark ? '#161616' : '#fff'} />
      <rect x={x + 62} y="40" width="44" height="10" rx="5" fill={INK} />
      {children}
    </g>
  );
}

/* ---------------------------------- RouteFusion ---------------------------------- */
function Routes({ scene, color }: { scene: ArtScene; color: string }) {
  const streets = (
    <g stroke={LINE} strokeWidth="6" strokeLinecap="round">
      <path d="M40 150 H600 M40 260 H600 M150 72 V376 M330 72 V376 M480 72 V376" />
      <path d="M40 330 L600 110" strokeWidth="4" />
    </g>
  );
  const route = (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M110 330 L150 260 L330 260 L330 150 L470 150 L540 120" stroke={color} strokeWidth="9" />
      <path d="M200 340 L330 340 L330 260" stroke="#5B5BFF" strokeWidth="9" strokeDasharray="1 16" />
    </g>
  );
  const stops = [
    [110, 330, '1'],
    [330, 260, '2'],
    [470, 150, '3'],
  ].map(([x, y, n]) => (
    <g key={n as string}>
      <circle cx={x} cy={y} r="14" fill="#fff" stroke={INK} strokeWidth="3" />
      <text
        x={x}
        y={(y as number) + 4}
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={INK}
        style={MONO}
      >
        {n}
      </text>
    </g>
  ));

  if (scene === 'before') {
    return (
      <Phone>
        {[0, 1].map((i) => (
          <g key={i}>
            <rect
              x="256"
              y={70 + i * 140}
              width="128"
              height="124"
              rx="14"
              fill={i ? '#E8ECFF' : '#FFE7DF'}
            />
            <text x="270" y={94 + i * 140} fontSize="11" fontWeight="700" fill={INK} style={MONO}>
              {i ? 'PARCEL #2291' : 'RIDE #8812'}
            </text>
            {[0, 1, 2].map((r) => (
              <rect
                key={r}
                x="270"
                y={106 + i * 140 + r * 16}
                width={90 - r * 18}
                height="8"
                rx="4"
                fill="#fff"
              />
            ))}
            <rect x="270" y={160 + i * 140} width="100" height="20" rx="10" fill={INK} />
          </g>
        ))}
      </Phone>
    );
  }
  if (scene === 'after' || scene === 2) {
    return (
      <Phone>
        <rect x="244" y="60" width="152" height="150" fill="#FAF8F4" />
        <path
          d="M262 190 L290 150 L340 150 L350 100 L380 80"
          stroke={color}
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
        {[
          [262, 190],
          [340, 150],
          [380, 80],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="7" fill="#fff" stroke={INK} strokeWidth="2.5" />
        ))}
        {['Pick up · Asha', 'Parcel · 2 kg', 'Drop · Indiranagar'].map((t, i) => (
          <g key={t}>
            <circle cx="262" cy={232 + i * 28} r="6" fill={i === 1 ? '#5B5BFF' : color} />
            <text x="276" y={236 + i * 28} fontSize="10" fill={INK} style={MONO}>
              {t}
            </text>
          </g>
        ))}
        <rect x="256" y="320" width="128" height="32" rx="16" fill={color} />
        <text x="320" y="340" textAnchor="middle" fontSize="11" fontWeight="700" fill={INK} style={MONO}>
          ACCEPT · 14 MIN
        </text>
      </Phone>
    );
  }
  return (
    <Browser url="dispatch.routefusion.app">
      <rect x="40" y="72" width="560" height="304" fill="#FAF8F4" />
      {streets}
      {route}
      {stops}
      {scene === 1 &&
        Array.from({ length: 14 }, (_, i) => (
          <circle
            key={i}
            cx={80 + ((i * 97) % 500)}
            cy={100 + ((i * 61) % 250)}
            r="5"
            fill={i % 2 ? '#5B5BFF' : color}
            opacity="0.7"
          />
        ))}
      <g>
        <rect x="64" y="96" width="170" height="74" rx="14" fill="#fff" stroke={LINE} />
        <text x="80" y="120" fontSize="10" fill="#6B6B66" style={MONO}>
          POOLED JOB
        </text>
        <text
          x="80"
          y="146"
          fontSize="18"
          fontWeight="700"
          fill={INK}
          style={{ fontFamily: 'var(--font-display)' }}
        >
          3 stops · 14 min
        </text>
        <rect x="80" y="154" width="60" height="6" rx="3" fill={color} />
      </g>
    </Browser>
  );
}

/* ---------------------------------- ThreatLens ---------------------------------- */
function Radar({ scene, color }: { scene: ArtScene; color: string }) {
  if (scene === 'before') {
    return (
      <g>
        <rect x="170" y="40" width="300" height="320" rx="16" fill="#fff" stroke={LINE} />
        <rect x="170" y="40" width="300" height="56" rx="16" fill="#5B5BFF" />
        <text x="190" y="74" fontSize="13" fontWeight="700" fill="#fff" style={MONO}>
          Select all traffic lights
        </text>
        {Array.from({ length: 9 }, (_, i) => (
          <rect
            key={i}
            x={190 + (i % 3) * 88}
            y={108 + Math.floor(i / 3) * 70}
            width="80"
            height="62"
            rx="6"
            fill={['#D6D3CC', '#C9C5BD', '#E4E0D8'][i % 3]}
          />
        ))}
        <rect x="370" y="322" width="84" height="26" rx="13" fill="#5B5BFF" />
        <text x="412" y="339" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="700" style={MONO}>
          VERIFY
        </text>
      </g>
    );
  }
  if (scene === 'after') {
    return (
      <g>
        <rect x="170" y="70" width="300" height="260" rx="16" fill="#fff" stroke={LINE} />
        <circle cx="320" cy="170" r="44" fill="#E6F3CD" />
        <path
          d="M300 170 L315 186 L342 154"
          stroke="#4B5E08"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text
          x="320"
          y="250"
          textAnchor="middle"
          fontSize="16"
          fontWeight="700"
          fill={INK}
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Human, verified invisibly
        </text>
        <text x="320" y="274" textAnchor="middle" fontSize="11" fill="#6B6B66" style={MONO}>
          score 0.02 · 14 ms · no challenge
        </text>
      </g>
    );
  }
  const radar = (
    <g>
      {[30, 60, 90].map((r) => (
        <circle key={r} cx="470" cy="224" r={r} fill="none" stroke="#2E2E2B" />
      ))}
      <path d="M470 224 L470 134 A90 90 0 0 1 548 179 Z" fill={color} opacity="0.35" />
      {[
        [500, 190],
        [440, 260],
        [520, 250],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="5" fill={i === 0 ? '#FF5A1F' : '#C6F432'} />
      ))}
    </g>
  );
  const traces = (
    <g fill="none" strokeWidth="3" strokeLinecap="round">
      <path d="M80 330 C120 250, 180 320, 220 240 S300 200, 330 150" stroke="#C6F432" />
      <path d="M80 300 L330 120" stroke="#FF5A1F" strokeDasharray="6 8" />
    </g>
  );
  return (
    <Browser dark url="console.threatlens.ai">
      <rect x="40" y="72" width="560" height="304" fill="#111" />
      {scene === 1 ? (
        <>
          {traces}
          <text x="80" y="110" fontSize="11" fill="#A3A39C" style={MONO}>
            HUMAN · curved, variable speed
          </text>
          <text x="80" y="128" fontSize="11" fill="#FF815B" style={MONO}>
            SCRIPT · straight, constant speed
          </text>
          {radar}
        </>
      ) : (
        <>
          {Array.from({ length: 7 }, (_, i) => (
            <g key={i}>
              <rect
                x="64"
                y={96 + i * 38}
                width="300"
                height="28"
                rx="6"
                fill={i === 2 ? '#2C2891' : '#1B1B1A'}
              />
              <circle cx="80" cy={110 + i * 38} r="4" fill={i === 2 ? '#FF5A1F' : '#C6F432'} />
              <rect x="94" y={106 + i * 38} width={90 + ((i * 37) % 80)} height="8" rx="4" fill="#3A3A36" />
              <text
                x="340"
                y={114 + i * 38}
                textAnchor="end"
                fontSize="10"
                fill={i === 2 ? '#FF815B' : '#A3A39C'}
                style={MONO}
              >
                {i === 2 ? '0.97' : `0.0${i + 1}`}
              </text>
            </g>
          ))}
          {radar}
        </>
      )}
    </Browser>
  );
}

/* ---------------------------------- DocuSense ---------------------------------- */
function Document({ scene, uid }: { scene: ArtScene; color: string; uid: string }) {
  const page = (x: number, w: number) => (
    <g>
      <rect x={x} y="92" width={w} height="270" rx="8" fill="#fff" stroke={LINE} />
      {Array.from({ length: 12 }, (_, i) => (
        <rect
          key={i}
          x={x + 20}
          y={114 + i * 19}
          width={w - 40 - ((i * 29) % 60)}
          height="7"
          rx="3.5"
          fill={i >= 5 && i <= 6 ? '#DBF86E' : '#EFECE6'}
        />
      ))}
      <rect x={x + 14} y="203" width="4" height="30" rx="2" fill="#617A03" />
    </g>
  );
  if (scene === 2 || scene === 'after') {
    return (
      <Browser url="localhost:5173">
        <rect x="40" y="72" width="560" height="304" fill="#FAF8F4" />
        <text x="64" y="108" fontSize="11" fill="#6B6B66" style={MONO}>
          table → json
        </text>
        {Array.from({ length: 5 }, (_, r) =>
          Array.from({ length: 3 }, (_, c) => (
            <rect
              key={`${r}${c}`}
              x={64 + c * 74}
              y={122 + r * 30}
              width="68"
              height="24"
              rx="4"
              fill={r === 0 ? '#E6F3CD' : '#fff'}
              stroke={LINE}
            />
          )),
        )}
        <path d="M300 200 h40" stroke={INK} strokeWidth="3" markerEnd={`url(#${uid}-arrow)`} />
        <rect x="360" y="110" width="210" height="190" rx="10" fill={INK} />
        {[
          '[',
          '  { "item": "Rent",',
          '    "amount": 42000 },',
          '  { "item": "Deposit",',
          '    "amount": 84000 }',
          ']',
        ].map((l, i) => (
          <text
            key={i}
            x="376"
            y={140 + i * 22}
            fontSize="11"
            fill={i % 5 === 0 ? '#A3A39C' : '#DBF86E'}
            style={MONO}
          >
            {l}
          </text>
        ))}
        <defs>
          <marker
            id={`${uid}-arrow`}
            viewBox="0 0 10 10"
            refX="5"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto"
          >
            <path d="M0 0 L10 5 L0 10z" fill={INK} />
          </marker>
        </defs>
      </Browser>
    );
  }
  return (
    <Browser url="localhost:5173 · offline">
      <rect x="40" y="72" width="560" height="304" fill="#FAF8F4" />
      {page(64, 280)}
      <g>
        <rect x="364" y="92" width="212" height="96" rx="14" fill="#fff" stroke={LINE} />
        <text x="380" y="116" fontSize="10" fill="#6B6B66" style={MONO}>
          YOU
        </text>
        <text x="380" y="136" fontSize="12" fill={INK} style={MONO}>
          What&apos;s the notice period?
        </text>
        <rect x="364" y="200" width="212" height="128" rx="14" fill={INK} />
        <text x="380" y="226" fontSize="10" fill="#A3A39C" style={MONO}>
          LLAMA 3 · LOCAL
        </text>
        <text x="380" y="250" fontSize="12" fill="#F6F4EF" style={MONO}>
          60 days, either party.
        </text>
        <rect x="380" y="270" width="104" height="22" rx="11" fill="#DBF86E" />
        <text x="432" y="285" textAnchor="middle" fontSize="10" fontWeight="700" fill={INK} style={MONO}>
          p.4 · §7.2
        </text>
        {scene === 1 && (
          <path
            d="M344 216 C 356 216, 356 290, 380 281"
            stroke="#617A03"
            strokeWidth="2"
            fill="none"
            strokeDasharray="4 4"
          />
        )}
      </g>
    </Browser>
  );
}

/* ---------------------------------- Aura Flora ---------------------------------- */
function Climate({ scene }: { scene: ArtScene; color: string }) {
  const bands = ['#BFEBD9', '#DDF3E4', '#FFF0C2', '#FFD8B8', '#FFB89A'];
  if (scene === 1) {
    return (
      <g>
        {bands.map((b, i) => (
          <g key={b}>
            <rect x={70 + i * 104} y="120" width="92" height="140" rx="16" fill={b} />
            <text x={86 + i * 104} y="244" fontSize="11" fill={INK} style={MONO}>
              {['too cold', 'cool', 'ideal', 'warm', 'too hot'][i]}
            </text>
            <text
              x={86 + i * 104}
              y="152"
              fontSize="18"
              fontWeight="700"
              fill={INK}
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {[8, 14, 22, 28, 34][i]}°
            </text>
          </g>
        ))}
      </g>
    );
  }
  return (
    <Browser url="aura-flora.local/zones">
      <rect x="40" y="72" width="560" height="304" fill="#FAF8F4" />
      {Array.from({ length: 6 }, (_, i) => (
        <g key={i}>
          <rect
            x={64 + (i % 3) * 66}
            y={96 + Math.floor(i / 3) * 70}
            width="58"
            height="60"
            rx="12"
            fill={bands[(i * 2 + 1) % 5]}
          />
          <text
            x={74 + (i % 3) * 66}
            y={136 + Math.floor(i / 3) * 70}
            fontSize="14"
            fontWeight="700"
            fill={INK}
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {[21, 24, 19, 27, 22, 16][i]}°
          </text>
        </g>
      ))}
      <g transform="translate(280 96)">
        <rect width="296" height="250" rx="14" fill="#fff" stroke={LINE} />
        <path
          d="M16 160 C 80 140, 120 90, 180 110 S 260 150, 280 120 L 280 190 C 260 210, 200 190, 180 170 S 80 210, 16 190 Z"
          fill="#FFD8B8"
          opacity="0.6"
        />
        <path
          d="M16 170 C 80 150, 120 110, 180 130 S 260 160, 280 150 L 280 170 C 260 185, 200 170, 180 150 S 80 190, 16 182 Z"
          fill="#FF815B"
          opacity="0.5"
        />
        <path
          d="M16 176 C 80 150, 120 112, 180 140 S 260 165, 280 160"
          stroke="#BD3D0C"
          strokeWidth="3"
          fill="none"
        />
        <line x1="150" y1="30" x2="150" y2="230" stroke={INK} strokeDasharray="4 6" />
        <text x="16" y="34" fontSize="11" fill="#6B6B66" style={MONO}>
          NEXT 12 H
        </text>
        <text x="158" y="44" fontSize="11" fill={INK} style={MONO}>
          frost risk 02:00
        </text>
      </g>
    </Browser>
  );
}

/* ---------------------------------- Lumina Tokens ---------------------------------- */
function Tokens({ scene }: { scene: ArtScene; color: string }) {
  const ramp = [
    '#F4F6FF',
    '#E8ECFF',
    '#D1D9FE',
    '#B4C0FE',
    '#94A2FF',
    '#5B5BFF',
    '#5353ED',
    '#3F3BC1',
    '#2C2891',
    '#1B1664',
  ];
  if (scene === 'before') {
    return (
      <g style={MONO}>
        {[
          ['web/button.css', '#5B5BFF', 80, 110],
          ['ios/Colors.swift', '#5A5CFE', 330, 90],
          ['android/theme.kt', '#5C5BF9', 200, 250],
          ['marketing/site.css', '#6060FF', 420, 270],
        ].map(([file, hex, x, y]) => (
          <g key={file as string} transform={`translate(${x} ${y}) rotate(${((x as number) % 7) - 3})`}>
            <rect width="170" height="70" rx="10" fill="#fff" stroke={LINE} />
            <rect x="12" y="14" width="24" height="24" rx="6" fill={hex as string} />
            <text x="46" y="31" fontSize="12" fontWeight="700" fill={INK}>
              {hex}
            </text>
            <text x="12" y="56" fontSize="10" fill="#6B6B66">
              {file}
            </text>
          </g>
        ))}
      </g>
    );
  }
  if (scene === 'after') {
    return (
      <g style={MONO}>
        <rect x="220" y="60" width="200" height="64" rx="12" fill={INK} />
        <text x="320" y="98" textAnchor="middle" fontSize="13" fontWeight="700" fill="#F6F4EF">
          color.brand.primary
        </text>
        {['CSS', 'Swift', 'Compose'].map((p, i) => (
          <g key={p}>
            <path
              d={`M320 124 C 320 170, ${140 + i * 180} 170, ${140 + i * 180} 220`}
              stroke="#5B5BFF"
              strokeWidth="2.5"
              fill="none"
            />
            <rect x={70 + i * 180} y="220" width="140" height="80" rx="12" fill="#fff" stroke={LINE} />
            <rect x={86 + i * 180} y="236" width="24" height="24" rx="6" fill="#5B5BFF" />
            <text x={120 + i * 180} y="253" fontSize="12" fontWeight="700" fill={INK}>
              {p}
            </text>
            <text x={86 + i * 180} y="285" fontSize="10" fill="#6B6B66">
              #5B5BFF
            </text>
          </g>
        ))}
      </g>
    );
  }
  return (
    <Browser url="lumina.tokens/brand">
      <rect x="40" y="72" width="560" height="304" fill="#fff" />
      {ramp.map((c, i) => (
        <g key={c}>
          <rect x={64 + i * 51} y="100" width="45" height="80" rx="8" fill={c} />
          <text x={86 + i * 51} y="198" textAnchor="middle" fontSize="9" fill="#6B6B66" style={MONO}>
            {i === 0 ? 50 : i * 100}
          </text>
        </g>
      ))}
      {['global.indigo.500', 'semantic.action.bg', 'button.primary.bg'].map((t, i) => (
        <g key={t}>
          <rect
            x={64 + i * 172}
            y="236"
            width="156"
            height="32"
            rx="16"
            fill={i === 2 ? '#5B5BFF' : '#F4F6FF'}
            stroke={i === 2 ? 'none' : '#D1D9FE'}
          />
          <text
            x={142 + i * 172}
            y="256"
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill={i === 2 ? '#fff' : '#3F3BC1'}
            style={MONO}
          >
            {t}
          </text>
          {i < 2 && <path d={`M${222 + i * 172} 252 h12`} stroke="#3F3BC1" strokeWidth="2" />}
        </g>
      ))}
      <rect x="64" y="296" width="200" height="44" rx="22" fill="#5B5BFF" />
      <text x="164" y="323" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff" style={MONO}>
        Primary action · 5.5:1
      </text>
    </Browser>
  );
}

/* ---------------------------------- Kinetic Craft ---------------------------------- */
function Kinetic({ scene, uid }: { scene: ArtScene; color: string; uid: string }) {
  const blobs = [
    ['circle', 170, 200, 70, '#FF5A1F'],
    ['pill', 290, 200, 60, '#5B5BFF'],
    ['circle', 410, 170, 50, '#C6F432'],
    ['ring', 480, 250, 46, '#FFB8D6'],
    ['circle', 250, 300, 30, '#FFF1DC'],
  ] as const;
  if (scene === 2) {
    return (
      <g>
        <rect x="120" y="120" width="400" height="160" rx="24" fill="#fff" stroke={LINE} />
        <circle cx="200" cy="200" r="44" fill="#FF5A1F" />
        <text
          x="270"
          y="216"
          fontSize="44"
          fontWeight="700"
          fill={INK}
          style={{ fontFamily: 'var(--font-display)' }}
        >
          kinetic
        </text>
      </g>
    );
  }
  return (
    <g>
      <defs>
        {blobs.map(([, , , , c], i) => (
          <radialGradient key={i} id={`${uid}-kin${i}`} cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
            <stop offset="30%" stopColor={c} />
            <stop offset="100%" stopColor={c} />
          </radialGradient>
        ))}
      </defs>
      <ellipse cx="320" cy="350" rx="230" ry="18" fill={INK} opacity="0.08" />
      {blobs.map(([kind, x, y, r], i) => {
        const dy = scene === 1 ? (i % 2 ? -30 : 20) : 0;
        if (kind === 'pill')
          return (
            <rect
              key={i}
              x={x - r / 2}
              y={y - r + dy}
              width={r}
              height={r * 2}
              rx={r / 2}
              fill={`url(#${uid}-kin${i})`}
            />
          );
        if (kind === 'ring')
          return (
            <circle
              key={i}
              cx={x}
              cy={y + dy}
              r={r * 0.7}
              fill="none"
              stroke={`url(#${uid}-kin${i})`}
              strokeWidth={r * 0.45}
            />
          );
        return <circle key={i} cx={x} cy={y + dy} r={r} fill={`url(#${uid}-kin${i})`} />;
      })}
    </g>
  );
}

const ARTS: Record<ArtKind, (p: { scene: ArtScene; color: string; uid: string }) => JSX.Element> = {
  routes: Routes,
  radar: Radar,
  document: Document,
  climate: Climate,
  tokens: Tokens,
  kinetic: Kinetic,
};

export function ProjectArt({
  art,
  color,
  scene = 0,
  label,
  uid,
}: {
  art: ArtKind;
  color: string;
  scene?: ArtScene;
  label: string;
  uid: string;
}) {
  const Art = ARTS[art];
  return (
    <svg
      viewBox="0 0 640 400"
      className="h-full w-full"
      role="img"
      aria-label={label}
      preserveAspectRatio="xMidYMid meet"
    >
      <Art scene={scene} color={color} uid={uid} />
    </svg>
  );
}

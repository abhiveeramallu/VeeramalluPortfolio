import type { CSSProperties, ReactNode } from 'react';
import type { IllustrationKind } from '@/data/content';
import {
  Bubble,
  Burst,
  C,
  Cloud,
  Doc,
  Halftone,
  INK,
  Magnifier,
  Peep,
  Plant,
  Sparkle,
  SpeedLines,
  type PeepName,
} from './kit';

/**
 * Comic-book panels: one hand-drawn Open Peeps character (CC0) per panel, printed "misprint" colour shadow,
 * a starburst, halftone dots, speed lines, a speech bubble, and props that act out what the project does
 * (see data/content.ts). The hero, about and contact panels share one protagonist (peep-8).
 *
 * Every panel is split into three depth layers — `back` (speed lines, halftone), `mid` (burst and props) and
 * `front` (the character, bubble and stickers) — which Illustration stacks in CSS 3D like a pop-up book.
 * `hover-shift` / `hover-show` animate on hover (app/globals.css).
 */

export type SceneId = IllustrationKind | 'hero' | 'about' | 'contact';
export type Layers = { back: ReactNode; mid: ReactNode; front: ReactNode };

const shift = (dx: number, dy = 0): CSSProperties => ({
  ['--dx' as string]: `${dx}px`,
  ['--dy' as string]: `${dy}px`,
});
const pivot = (x: number, y: number): CSSProperties => ({
  transformOrigin: `${x}px ${y}px`,
  transformBox: 'view-box',
});
const ink = {
  stroke: INK,
  strokeWidth: 2.6,
  strokeLinejoin: 'round' as const,
  strokeLinecap: 'round' as const,
};

type PanelSpec = {
  uid: string;
  peep: PeepName;
  side: 'left' | 'right';
  flip?: boolean;
  tint: string;
  burst: string;
  bubble: string;
  props: ReactNode;
  front?: ReactNode;
};

/** The shared panel layout: character on one side, props on the other, bubble pointing at the character. */
function panel({ uid, peep, side, flip, tint, burst, bubble, props, front }: PanelSpec): Layers {
  const cx = side === 'left' ? 104 : 296;
  const bubbleW = Math.round(bubble.length * 18 * 0.5 + 30);
  const bx = side === 'left' ? 150 : 250 - bubbleW;
  const tailX = side === 'left' ? bx + 26 : bx + bubbleW - 26;
  return {
    back: (
      <>
        <SpeedLines cx={cx} cy={150} />
        <Halftone uid={uid} cx={side === 'left' ? 290 : 110} cy={170} r={130} />
      </>
    ),
    mid: (
      <>
        <Burst cx={cx} cy={150} r={98} fill={burst} className="burst" />
        {props}
      </>
    ),
    front: (
      <>
        <Peep name={peep} uid={uid} x={cx} y={302} h={238} tint={tint} flip={flip} />
        <Bubble x={bx} y={14} text={bubble} tailX={tailX} />
        {front}
      </>
    ),
  };
}

/* ───────── props, drawn in the same inked style ───────── */

function Car({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x} y={y} width="66" height="24" rx="10" fill={C.red} {...ink} />
      <path d={`M${x + 12} ${y} l 10 -15 h 26 l 8 15 z`} fill={C.sky} {...ink} />
      <circle cx={x + 16} cy={y + 25} r="8" fill={INK} />
      <circle cx={x + 50} cy={y + 25} r="8" fill={INK} />
      <circle cx={x + 16} cy={y + 25} r="3" fill={C.paper} />
      <circle cx={x + 50} cy={y + 25} r="3" fill={C.paper} />
    </g>
  );
}

function Pin({ x, y, fill = C.red }: { x: number; y: number; fill?: string }) {
  return (
    <g className="bob">
      <path
        d={`M${x} ${y} c -14 -16 -16 -26 -16 -32 a 16 16 0 0 1 32 0 c 0 6 -2 16 -16 32 z`}
        fill={fill}
        {...ink}
      />
      <circle cx={x} cy={y - 32} r="6" fill={C.paper} {...ink} strokeWidth={2} />
    </g>
  );
}

function Parcel({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x} y={y} width="40" height="34" rx="3" fill={C.yellow} {...ink} />
      <path d={`M${x + 20} ${y} v 34 M${x} ${y + 12} h 40`} stroke={INK} strokeWidth="2" />
    </g>
  );
}

function Robot({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <path d={`M${x + 30} ${y} v -16`} {...ink} fill="none" />
      <circle cx={x + 30} cy={y - 20} r="6" fill={C.red} {...ink} strokeWidth={2} />
      <rect x={x} y={y} width="60" height="46" rx="12" fill={C.grey} {...ink} />
      <rect x={x + 9} y={y + 10} width="42" height="20" rx="8" fill={C.charcoal} />
      <circle cx={x + 21} cy={y + 20} r="4" fill={C.red} />
      <circle cx={x + 39} cy={y + 20} r="4" fill={C.red} />
      <rect x={x + 8} y={y + 46} width="44" height="34" rx="8" fill={C.grey} {...ink} />
    </g>
  );
}

function Shield({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path
        d="M0 0 L 36 14 C 36 52 22 76 0 88 C -22 76 -36 52 -36 14 Z"
        fill={C.paper}
        {...ink}
        strokeWidth={3}
      />
      <path
        d="M-14 42 L -2 54 L 18 30"
        stroke={C.greenDeep}
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

function Flower({ x, y }: { x: number; y: number }) {
  return (
    <g>
      {[0, 72, 144, 216, 288].map((a) => (
        <circle
          key={a}
          cx={x + Math.cos((a * Math.PI) / 180) * 7}
          cy={y + Math.sin((a * Math.PI) / 180) * 7}
          r="5.5"
          fill={C.pink}
          stroke={INK}
          strokeWidth="1.6"
        />
      ))}
      <circle cx={x} cy={y} r="4" fill={C.yellow} stroke={INK} strokeWidth="1.6" />
    </g>
  );
}

function Bee({ x, y, tag, delay }: { x: number; y: number; tag: string; delay: string }) {
  return (
    <g className="buzz" style={{ ['--delay' as string]: delay } as CSSProperties}>
      <ellipse cx={x} cy={y - 11} rx="9" ry="6" fill={C.paper} stroke={INK} strokeWidth="2" />
      <ellipse cx={x} cy={y} rx="14" ry="10" fill={C.yellow} stroke={INK} strokeWidth="2.4" />
      <path d={`M${x - 3} ${y - 9} v 18 M${x + 4} ${y - 9} v 18`} stroke={INK} strokeWidth="3" />
      <path
        d={`M${x - 14} ${y + 2} l -8 11 h 13 z`}
        fill={tag}
        stroke={INK}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </g>
  );
}

function Crate({ x, y, fill }: { x: number; y: number; fill: string }) {
  return (
    <g>
      <rect x={x} y={y} width="36" height="30" rx="3" fill={fill} {...ink} strokeWidth={2.2} />
      <path d={`M${x + 18} ${y} v 30`} stroke={INK} strokeWidth="1.8" opacity="0.6" />
    </g>
  );
}

/** A small sticker tile with an icon, used to float ideas around a character. */
function Sticker({
  x,
  y,
  fill,
  rot = 0,
  delay = '0s',
  caption,
  children,
}: {
  x: number;
  y: number;
  fill: string;
  rot?: number;
  delay?: string;
  /** A short comic-lettered tag under the sticker, kept inside the 400-unit-wide panel. */
  caption?: string;
  children: ReactNode;
}) {
  const capW = caption ? Math.round(caption.length * 6.2 + 16) : 0;
  const capX = Math.min(Math.max(x + 28 - capW / 2, 4), 396 - capW);
  return (
    <g className="drift" style={{ ['--delay' as string]: delay, ['--dur' as string]: '7s' } as CSSProperties}>
      <g transform={`rotate(${rot} ${x + 28} ${y + 22})`}>
        <rect x={x + 4} y={y + 4} width="56" height="44" rx="10" fill={INK} />
        <rect x={x} y={y} width="56" height="44" rx="10" fill={fill} {...ink} />
        {children}
      </g>
      {caption && (
        <g>
          <rect x={capX + 2} y={y + 54} width={capW} height="20" rx="10" fill={INK} />
          <rect
            x={capX}
            y={y + 52}
            width={capW}
            height="20"
            rx="10"
            fill={C.paper}
            {...ink}
            strokeWidth={2}
          />
          <text
            x={capX + capW / 2}
            y={y + 66.5}
            textAnchor="middle"
            fontSize="12"
            fill={INK}
            style={{ fontFamily: 'var(--font-comic), Impact, sans-serif', letterSpacing: '0.04em' }}
          >
            {caption}
          </text>
        </g>
      )}
    </g>
  );
}
const CodeIcon = ({ x, y }: { x: number; y: number }) => (
  <path
    d={`M${x + 18} ${y + 14} l -8 8 l 8 8 M${x + 38} ${y + 14} l 8 8 l -8 8 M${x + 31} ${y + 11} l -6 22`}
    stroke={C.blueDeep}
    strokeWidth="3.4"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
);
const ChartIcon = ({ x, y }: { x: number; y: number }) => (
  <path
    d={`M${x + 12} ${y + 34} v -8 M${x + 22} ${y + 34} v -16 M${x + 32} ${y + 34} v -11 M${x + 42} ${y + 34} v -22`}
    stroke={INK}
    strokeWidth="5"
    strokeLinecap="round"
  />
);
const ShieldIcon = ({ x, y }: { x: number; y: number }) => (
  <path
    d={`M${x + 28} ${y + 7} l 13 5 c 0 13 -5 21 -13 25 c -8 -4 -13 -12 -13 -25 z M${x + 22} ${y + 21} l 4 4 l 8 -8`}
    fill={C.paper}
    stroke={INK}
    strokeWidth="2.2"
    strokeLinejoin="round"
  />
);

/* ───────── panels ───────── */

/* Hero — just me, big, with what I build floating around. */
function Hero(): Layers {
  return {
    back: (
      <>
        <SpeedLines cx={206} cy={160} r1={110} r2={300} n={36} opacity={0.12} />
        <Halftone uid="hero" cx={206} cy={170} r={150} color={INK} opacity={0.14} />
      </>
    ),
    mid: <Burst cx={206} cy={160} r={118} fill={C.yellow} spikes={18} className="burst" />,
    front: (
      <>
        <Peep name="peep-8" uid="hero" x={206} y={304} h={262} tint={C.blueDeep} />
        <Bubble x={14} y={18} text="IDEAS → EXECUTION" tailX={150} size={20} />
        <Sticker x={300} y={30} fill={C.paper} rot={8} delay="-1s" caption="CODE MODE: ON">
          <CodeIcon x={300} y={30} />
        </Sticker>
        <Sticker x={22} y={150} fill={C.yellow} rot={-8} delay="-3s">
          <ChartIcon x={22} y={150} />
        </Sticker>
        <Sticker x={318} y={168} fill={C.green} rot={6} delay="-5s" caption="BUILT TO BE SECURE">
          <ShieldIcon x={318} y={168} />
        </Sticker>
        <Sparkle x={282} y={118} r={10} fill={C.paper} />
      </>
    ),
  };
}

/* RouteFusion — one trip, a passenger and a parcel; the car drives on hover. */
function City(): Layers {
  return panel({
    uid: 'city',
    peep: 'peep-10',
    side: 'right',
    tint: C.blueDeep,
    burst: C.yellow,
    bubble: 'ONE TRIP, TWO DROPS!',
    props: (
      <>
        <path
          d="M24 262 C 70 262, 90 220, 130 222 S 180 250, 200 236"
          stroke={C.paper}
          strokeWidth="5"
          strokeDasharray="2 12"
          fill="none"
          strokeLinecap="round"
        />
        <Pin x={46} y={226} />
        <Pin x={176} y={206} fill={C.green} />
        <Parcel x={156} y={214} />
        <g className="hover-shift" style={shift(110, -16)}>
          <Car x={20} y={250} />
        </g>
      </>
    ),
  });
}

/* ThreatLensAI — the shield tells the person from the bot; hover flags the bot. */
function Radar(): Layers {
  return panel({
    uid: 'radar',
    peep: 'peep-46',
    side: 'left',
    tint: C.redDeep,
    burst: C.paper,
    bubble: 'BOT SPOTTED!',
    props: (
      <>
        {[36, 62, 88].map((r) => (
          <path
            key={r}
            d={`M${300 - r} 250 A ${r} ${r} 0 0 1 ${300 + r} 250`}
            stroke={C.paper}
            strokeWidth="3"
            fill="none"
            opacity="0.8"
          />
        ))}
        <g className="hover-shift" style={shift(0, -10)}>
          <Robot x={294} y={176} />
        </g>
        <circle
          cx="324"
          cy="214"
          r="54"
          fill="none"
          stroke={C.yellow}
          strokeWidth="5"
          strokeDasharray="12 8"
          className="hover-show spin-slow"
          style={pivot(324, 214)}
        />
        <g className="drift">
          <Shield x={236} y={80} s={0.8} />
        </g>
      </>
    ),
  });
}

/* ImageGuard — the magnifier finds the flower that was copied and pasted. */
function Fracture(): Layers {
  return panel({
    uid: 'fracture',
    peep: 'peep-42',
    side: 'right',
    tint: C.redDeep,
    burst: C.paper,
    bubble: 'COPY FOUND!',
    props: (
      <>
        <rect x="18" y="92" width="170" height="130" rx="6" fill={C.charcoal} {...ink} />
        <rect x="30" y="104" width="146" height="106" fill={C.sky} />
        <circle cx="150" cy="128" r="13" fill={C.yellow} stroke={INK} strokeWidth="2" />
        <path
          d="M30 210 L 30 176 C 60 152, 90 162, 108 176 C 126 162, 156 154, 176 170 L 176 210 Z"
          fill={C.green}
          stroke={INK}
          strokeWidth="2.2"
        />
        <Flower x={62} y={184} />
        <Flower x={138} y={186} />
        <g className="hover-show">
          <circle
            cx="62"
            cy="184"
            r="19"
            fill="none"
            stroke={C.red}
            strokeWidth="3.6"
            strokeDasharray="6 5"
          />
          <circle
            cx="138"
            cy="186"
            r="19"
            fill="none"
            stroke={C.red}
            strokeWidth="3.6"
            strokeDasharray="6 5"
          />
        </g>
        <g className="hover-shift" style={shift(-92, 44)}>
          <Magnifier x={188} y={130} r={28} />
        </g>
      </>
    ),
  });
}

/* VisionRAG-X — what was said isn't what's on the slide; the conflict gets flagged. */
function Frames(): Layers {
  return panel({
    uid: 'frames',
    peep: 'peep-2',
    side: 'left',
    tint: C.blueDeep,
    burst: C.yellow,
    bubble: 'NOT ON THE SLIDE!',
    props: (
      <>
        <rect x="222" y="96" width="160" height="112" rx="8" fill={C.paper} {...ink} />
        <path
          d="M238 120 h 84 M238 140 h 60 M238 160 h 74"
          stroke={C.greyDeep}
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path d="M330 190 L 358 190 L 344 166 Z" fill={C.yellow} {...ink} />
        <path d="M262 278 L 274 208 M342 278 L 330 208" {...ink} strokeWidth={5} fill="none" />
        <g className="hover-shift" style={shift(0, -12)}>
          <rect x="358" y="66" width="13" height="30" rx="6" fill={C.red} {...ink} strokeWidth={2.2} />
          <circle cx="364.5" cy="106" r="6" fill={C.red} {...ink} strokeWidth={2.2} />
        </g>
        <g>
          <rect x="214" y="244" width="176" height="28" rx="4" fill={INK} />
          {[0, 1, 2, 3, 4].map((i) => (
            <rect
              key={i}
              x={222 + i * 34}
              y="250"
              width="26"
              height="16"
              rx="2"
              fill={i === 2 ? C.yellow : C.sky}
            />
          ))}
        </g>
      </>
    ),
  });
}

/* Honeypot — tagged bees (attackers) drawn to the honey pot. */
function Network(): Layers {
  return panel({
    uid: 'network',
    peep: 'peep-24',
    side: 'right',
    tint: C.greenDeep,
    burst: C.yellow,
    bubble: 'GOTCHA!',
    props: (
      <>
        <path
          d="M60 230 C 50 196 62 182 72 180 L 140 180 C 150 182 162 196 152 230 Z"
          fill={C.orange}
          {...ink}
          strokeWidth={3}
        />
        <path d="M64 180 C 64 160 148 160 148 180 Z" fill={C.yellow} {...ink} strokeWidth={3} />
        <path
          d="M136 182 C 138 198 130 206 136 214"
          stroke={C.yellow}
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />
        <rect x="84" y="194" width="44" height="22" rx="5" fill={C.paper} {...ink} strokeWidth={2} />
        <path d="M50 230 h 112" {...ink} strokeWidth={4} />
        <Bee x={40} y={110} tag={C.red} delay="0s" />
        <Bee x={120} y={86} tag={C.blue} delay="-0.7s" />
        <Bee x={186} y={150} tag={C.pink} delay="-1.4s" />
        <Bee x={30} y={180} tag={C.lilac} delay="-2.1s" />
      </>
    ),
  });
}

/* Edge AI thermal — catch the heat early and switch the fan on. */
function Board(): Layers {
  return panel({
    uid: 'board',
    peep: 'peep-59',
    side: 'left',
    tint: C.redDeep,
    burst: C.yellow,
    bubble: 'FAN ON, EARLY!',
    props: (
      <>
        <rect x="232" y="78" width="18" height="86" rx="9" fill={C.paper} {...ink} />
        <circle cx="241" cy="168" r="14" fill={C.red} {...ink} />
        <rect className="mercury" x="236" y="104" width="10" height="62" rx="5" fill={C.red} />
        <g className="heat">
          {[0, 1, 2].map((i) => (
            <path
              key={i}
              d={`M${270 + i * 14} 120 c -8 -10 8 -16 0 -26 c -8 -10 8 -16 0 -26`}
              stroke={C.red}
              strokeWidth="3.6"
              fill="none"
              strokeLinecap="round"
            />
          ))}
        </g>
        <path d="M340 260 v -46" {...ink} strokeWidth={6} fill="none" />
        <circle cx="340" cy="186" r="34" fill={C.paper} {...ink} strokeWidth={3} />
        <g className="spin hover-spin" style={pivot(340, 186)}>
          {[0, 120, 240].map((a) => (
            <ellipse
              key={a}
              cx="340"
              cy="170"
              rx="9"
              ry="17"
              fill={C.blue}
              stroke={INK}
              strokeWidth="2"
              transform={`rotate(${a} 340 186)`}
            />
          ))}
          <circle cx="340" cy="186" r="6" fill={INK} />
        </g>
        <rect x="246" y="230" width="58" height="38" rx="4" fill={C.greenDeep} {...ink} />
        <rect x="262" y="240" width="22" height="18" rx="2" fill={INK} />
        <path
          d="M304 248 C 320 248, 322 230, 330 220"
          stroke={C.red}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      </>
    ),
  });
}

/* Greenhouse — the forecast says rain; hover makes it fall. */
function Greenhouse(): Layers {
  return panel({
    uid: 'greenhouse',
    peep: 'peep-79',
    side: 'right',
    tint: C.greenDeep,
    burst: C.paper,
    bubble: "RAIN'S COMING!",
    props: (
      <>
        <path
          d="M20 280 L 20 214 C 20 168, 190 168, 190 214 L 190 280"
          fill={C.paper}
          fillOpacity="0.55"
          {...ink}
          strokeWidth={3}
        />
        <path d="M105 176 V 280 M62 186 V 280 M148 186 V 280" stroke={INK} strokeWidth="2" opacity="0.6" />
        <Plant x={60} y={280} s={0.5} pot={C.red} />
        <Plant x={108} y={280} s={0.62} pot={C.yellow} />
        <Plant x={154} y={280} s={0.5} pot={C.pink} />
        <Cloud x={92} y={112} s={1.3} />
        <g className="hover-show">
          {[70, 88, 106, 124].map((x, i) => (
            <path
              key={x}
              className="rain"
              style={{ ['--delay' as string]: `${-i * 0.2}s` } as CSSProperties}
              d={`M${x} 136 l -4 12`}
              stroke={C.blueDeep}
              strokeWidth="3.4"
              strokeLinecap="round"
            />
          ))}
        </g>
      </>
    ),
  });
}

/* Smart Document Intelligence — the shy document gets scanned and stays on this machine. */
function Sheets(): Layers {
  return panel({
    uid: 'sheets',
    peep: 'peep-39',
    side: 'left',
    tint: C.redDeep,
    burst: C.yellow,
    bubble: 'STAYS ON MY LAPTOP!',
    props: (
      <>
        <g className="bob">
          <rect x="262" y="104" width="78" height="104" rx="7" fill={C.paper} {...ink} strokeWidth={3} />
          <circle cx="288" cy="138" r="6" fill={INK} />
          <circle cx="314" cy="138" r="6" fill={INK} />
          <path d="M290 158 Q 301 166 312 158" {...ink} fill="none" />
          <path d="M276 180 h 50 M276 192 h 32" stroke={C.greyDeep} strokeWidth="4" strokeLinecap="round" />
          <rect
            className="scan"
            x="252"
            y="110"
            width="98"
            height="7"
            rx="3.5"
            fill={C.yellow}
            {...ink}
            strokeWidth={1.8}
          />
        </g>
        <g className="drift">
          <path d="M346 210 v -12 a 16 16 0 0 1 32 0 v 12" {...ink} strokeWidth={4.5} fill="none" />
          <rect x="338" y="208" width="48" height="38" rx="7" fill={C.yellow} {...ink} />
          <circle cx="362" cy="226" r="4.5" fill={INK} />
        </g>
        <Doc x={226} y={222} w={40} h={50} lines={3} rot={-10} />
      </>
    ),
  });
}

/* StockMind — the camera counts the crates; one shelf is running low. */
function Racks(): Layers {
  return panel({
    uid: 'racks',
    peep: 'peep-25',
    side: 'right',
    tint: C.blueDeep,
    burst: C.yellow,
    bubble: 'SHELF IS LOW!',
    props: (
      <>
        {[268, 206, 144].map((y) => (
          <rect
            key={y}
            x="20"
            y={y}
            width="160"
            height="8"
            rx="2"
            fill={C.paper}
            {...ink}
            strokeWidth={2.2}
          />
        ))}
        <path d="M24 276 V 120 M176 276 V 120" {...ink} strokeWidth={4} fill="none" />
        <Crate x={32} y={238} fill={C.yellow} />
        <Crate x={72} y={238} fill={C.red} />
        <Crate x={112} y={238} fill={C.green} />
        <Crate x={32} y={176} fill={C.pink} />
        <g className="hover-shift" style={shift(80, 0)}>
          <Crate x={32} y={114} fill={C.orange} />
        </g>
        <rect
          className="hover-show"
          x="104"
          y="170"
          width="70"
          height="40"
          rx="3"
          fill="none"
          stroke={C.red}
          strokeWidth="3.4"
          strokeDasharray="6 4"
        />
        <g>
          <rect x="132" y="70" width="46" height="30" rx="6" fill={C.charcoal} {...ink} />
          <circle cx="132" cy="85" r="10" fill={C.sky} {...ink} />
          <circle className="blink-light" cx="170" cy="77" r="3.5" fill={C.red} />
        </g>
      </>
    ),
  });
}

/* Secure Messaging — a message hops from one phone to the other and comes back read. */
function Phone({ x, y, w, h, fill }: { x: number; y: number; w: number; h: number; fill: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="12" fill={C.charcoal} {...ink} strokeWidth={3} />
      <rect x={x + 6} y={y + 12} width={w - 12} height={h - 24} rx="6" fill={fill} />
      <rect x={x + w / 2 - 8} y={y + 4} width="16" height="3.5" rx="1.75" fill={C.greyDeep} />
    </g>
  );
}

function Chat(): Layers {
  return panel({
    uid: 'chat',
    peep: 'peep-10',
    side: 'left',
    tint: C.blueDeep,
    burst: C.yellow,
    bubble: 'READ BY ALL!',
    props: (
      <>
        <Phone x={222} y={92} w={78} h={140} fill={C.sky} />
        <rect x="234" y="114" width="40" height="14" rx="7" fill={C.paper} {...ink} strokeWidth={1.8} />
        <rect x="248" y="136" width="44" height="14" rx="7" fill={C.blue} {...ink} strokeWidth={1.8} />
        <rect x="234" y="158" width="32" height="14" rx="7" fill={C.paper} {...ink} strokeWidth={1.8} />
        <g>
          {[244, 256, 268].map((cx, i) => (
            <circle
              key={cx}
              className="blink-light"
              style={{ animationDelay: `${i * 0.2}s` }}
              cx={cx}
              cy="208"
              r="3.5"
              fill={C.greyDeep}
            />
          ))}
        </g>
        <g className="bob">
          <Phone x={318} y={140} w={66} h={120} fill={C.paper} />
          <rect x="328" y="160" width="36" height="12" rx="6" fill={C.sky} {...ink} strokeWidth={1.6} />
          <rect x="336" y="180" width="40" height="12" rx="6" fill={C.blue} {...ink} strokeWidth={1.6} />
          <path
            d="M340 206 l 5 5 l 9 -10 M350 206 l 5 5 l 9 -10"
            stroke={C.blueDeep}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
        <g className="hover-shift" style={shift(56, 44)}>
          <path
            d="M262 64 h 44 a 10 10 0 0 1 10 10 v 10 a 10 10 0 0 1 -10 10 h -30 l -12 9 v -9 h -2 a 10 10 0 0 1 -10 -10 v -10 a 10 10 0 0 1 10 -10 z"
            fill={C.green}
            {...ink}
            strokeWidth={2.4}
          />
          <path d="M268 79 h 32" stroke={INK} strokeWidth="3" strokeLinecap="round" />
        </g>
        <g className="drift">
          <path d="M346 104 v -10 a 12 12 0 0 1 24 0 v 10" {...ink} strokeWidth={4} fill="none" />
          <rect x="340" y="102" width="36" height="28" rx="6" fill={C.yellow} {...ink} />
          <circle cx="358" cy="116" r="3.5" fill={INK} />
        </g>
      </>
    ),
  });
}

/* About — me, with the things my projects are made of floating around. */
function About(): Layers {
  return panel({
    uid: 'about',
    peep: 'peep-8',
    side: 'left',
    tint: C.blueDeep,
    burst: C.paper,
    bubble: "HEY, I'M ABHIRAM!",
    props: (
      <>
        <Sticker x={230} y={86} fill={C.paper} rot={-6} delay="-1s">
          <CodeIcon x={230} y={86} />
        </Sticker>
        <Sticker x={318} y={120} fill={C.green} rot={8} delay="-3s">
          <ShieldIcon x={318} y={120} />
        </Sticker>
        <Sticker x={246} y={190} fill={C.pink} rot={5} delay="-5s">
          <ChartIcon x={246} y={190} />
        </Sticker>
        <Plant x={350} y={286} s={0.62} pot={C.red} />
      </>
    ),
  });
}

/* Contact — me saying hello while a paper plane loops off with the message. */
function Contact(): Layers {
  return panel({
    uid: 'contact',
    peep: 'peep-8',
    side: 'right',
    flip: true,
    tint: C.redDeep,
    burst: C.yellow,
    bubble: 'SAY HELLO!',
    props: (
      <>
        <path
          d="M30 140 C 60 70, 150 70, 150 120 S 90 170, 120 200"
          stroke={C.paper}
          strokeWidth="3.4"
          strokeDasharray="4 10"
          fill="none"
          strokeLinecap="round"
        />
        <g className="plane">
          <path d="M120 68 L 180 46 L 158 98 L 144 80 Z" fill={C.paper} {...ink} />
          <path d="M144 80 L 180 46" stroke={INK} strokeWidth="2" />
        </g>
        <path d="M62 284 V 226" {...ink} strokeWidth={7} fill="none" />
        <path d="M24 226 V 190 a 30 30 0 0 1 60 0 V 226 Z" fill={C.red} {...ink} strokeWidth={3} />
        <rect x="38" y="200" width="32" height="9" rx="2" fill={INK} />
        <g className="hover-shift" style={shift(0, -12)}>
          <path d="M84 200 V 166 h 20 v 13 h -20" fill={C.yellow} {...ink} strokeWidth={2.4} />
        </g>
      </>
    ),
  });
}

const SCENES: Record<SceneId, { bg: string; draw: () => Layers }> = {
  hero: { bg: '#ff8a3d', draw: Hero },
  city: { bg: C.blue, draw: City },
  radar: { bg: C.red, draw: Radar },
  fracture: { bg: C.yellow, draw: Fracture },
  frames: { bg: C.lilac, draw: Frames },
  network: { bg: C.green, draw: Network },
  board: { bg: C.orange, draw: Board },
  greenhouse: { bg: '#8fd3c1', draw: Greenhouse },
  sheets: { bg: C.pink, draw: Sheets },
  racks: { bg: '#9fc0ef', draw: Racks },
  chat: { bg: '#ffb3a7', draw: Chat },
  about: { bg: C.yellow, draw: About },
  contact: { bg: C.blue, draw: Contact },
};

/** The character each panel features (kept in sync with the panels by tests/unit/illustrations.test.ts). */
export const SCENE_PEEP: Record<SceneId, PeepName> = {
  hero: 'peep-8',
  city: 'peep-10',
  radar: 'peep-46',
  fracture: 'peep-42',
  frames: 'peep-2',
  network: 'peep-24',
  board: 'peep-59',
  greenhouse: 'peep-79',
  sheets: 'peep-39',
  racks: 'peep-25',
  chat: 'peep-10',
  about: 'peep-8',
  contact: 'peep-8',
};

export function sceneBackground(id: SceneId) {
  return SCENES[id].bg;
}

export function sceneLayers(id: SceneId): Layers {
  return SCENES[id].draw();
}

/** All three layers flattened into one group (for tests and any flat use). */
export function SceneArt({ id }: { id: SceneId }) {
  const { back, mid, front } = sceneLayers(id);
  return (
    <g>
      {back}
      {mid}
      {front}
    </g>
  );
}

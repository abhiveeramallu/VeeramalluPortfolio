'use client';

import { useMemo, useRef, useState } from 'react';
import { Canvas, extend, useFrame, useThree, type MaterialNode } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { cn } from '@/lib/utils';

/* ---------------------------------------------------------------- GLSL */
const vertex = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const fragment = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform float uAspect;
uniform vec2 uPointer;
uniform float uStir;
uniform vec3 uA;
uniform vec3 uB;
uniform vec3 uC;
uniform vec3 uD;

// 2D simplex noise — Ashima Arts / Stefan Gustavson (MIT).
vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m; m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

mat2 rot(float a) { float s = sin(a), c = cos(a); return mat2(c, -s, s, c); }

void main() {
  vec2 uv = vUv;
  vec2 p = vec2(uv.x * uAspect, uv.y);
  vec2 ptr = vec2(uPointer.x * uAspect, uPointer.y);

  // Stir: swirl space around the pointer, falling off with distance.
  vec2 d = p - ptr;
  float falloff = exp(-dot(d, d) * 9.0);
  p = ptr + rot(uStir * falloff * 2.4) * d;

  float t = uTime * 0.06;
  // Domain warping: feed noise into noise for liquid folds.
  vec2 q = vec2(snoise(p * 1.4 + t), snoise(p * 1.4 - t + 3.7));
  vec2 r = vec2(snoise(p * 1.1 + q * 1.6 + vec2(1.7, 9.2) + t * 1.3), snoise(p * 1.1 + q * 1.6 + vec2(8.3, 2.8) - t));
  float n = snoise(p * 0.9 + r * 1.2);

  vec3 col = mix(uA, uB, smoothstep(-0.6, 0.6, r.x));
  col = mix(col, uC, smoothstep(0.15, 0.9, n));
  col = mix(col, uD, smoothstep(0.35, 1.0, q.y) * 0.65);

  // Film grain keeps gradients from banding.
  float grain = fract(sin(dot(uv * (uTime + 1.0), vec2(12.9898, 78.233))) * 43758.5453);
  col += (grain - 0.5) * 0.035;
  gl_FragColor = vec4(col, 1.0);
}`;

const FlowMaterial = shaderMaterial(
  {
    uTime: 0,
    uAspect: 1,
    uPointer: new THREE.Vector2(0.5, 0.5),
    uStir: 0,
    uA: new THREE.Color('#1B1664'),
    uB: new THREE.Color('#5B5BFF'),
    uC: new THREE.Color('#FF5A1F'),
    uD: new THREE.Color('#C6F432'),
  },
  vertex,
  fragment,
);
extend({ FlowMaterial });

type FlowMaterialImpl = THREE.ShaderMaterial & {
  uTime: number;
  uAspect: number;
  uPointer: THREE.Vector2;
  uStir: number;
  uA: THREE.Color;
  uB: THREE.Color;
  uC: THREE.Color;
  uD: THREE.Color;
};

declare module '@react-three/fiber' {
  interface ThreeElements {
    flowMaterial: MaterialNode<FlowMaterialImpl, typeof FlowMaterial>;
  }
}

const PALETTES: Record<string, [string, string, string, string]> = {
  Brand: ['#1B1664', '#5B5BFF', '#FF5A1F', '#C6F432'],
  Dusk: ['#2A0F2E', '#E8457C', '#FFAD94', '#FFF0C2'],
  Mint: ['#0B2A28', '#0EA5A4', '#BFEBD9', '#F6F4EF'],
};

function Plane({ palette, speed }: { palette: string; speed: number }) {
  const mat = useRef<FlowMaterialImpl>(null);
  const { viewport, size } = useThree();
  const target = useMemo(() => new THREE.Vector2(0.5, 0.5), []);
  const stir = useRef(0);
  const last = useRef(new THREE.Vector2(0.5, 0.5));

  useFrame((_, dt) => {
    const m = mat.current;
    if (!m) return;
    m.uTime += dt * speed;
    m.uAspect = size.width / size.height;
    m.uPointer.lerp(target, Math.min(1, dt * 6));
    stir.current *= Math.exp(-dt * 1.6);
    m.uStir = stir.current;
    const [a, b, c, d] = PALETTES[palette];
    m.uA.lerp(new THREE.Color(a), dt * 3);
    m.uB.lerp(new THREE.Color(b), dt * 3);
    m.uC.lerp(new THREE.Color(c), dt * 3);
    m.uD.lerp(new THREE.Color(d), dt * 3);
  });

  return (
    <mesh
      scale={[viewport.width, viewport.height, 1]}
      onPointerMove={(e) => {
        if (!e.uv) return;
        target.copy(e.uv);
        stir.current = Math.min(3, stir.current + e.uv.distanceTo(last.current) * 18);
        last.current.copy(e.uv);
      }}
    >
      <planeGeometry />
      <flowMaterial ref={mat} />
    </mesh>
  );
}

export default function FlowGradient() {
  const [palette, setPalette] = useState('Brand');
  const [speed, setSpeed] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1,
  );

  return (
    <div>
      <div
        className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[#1B1664]"
        data-cursor-label="Stir"
        role="img"
        aria-label="Interactive flowing gradient in the selected palette; move the pointer to stir it"
      >
        <Canvas
          dpr={[1, 1.5]}
          orthographic
          camera={{ zoom: 100, position: [0, 0, 5] }}
          gl={{ antialias: false }}
        >
          <Plane palette={palette} speed={speed} />
        </Canvas>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-6">
        <div
          className="flex rounded-pill border border-line p-1 font-mono text-xs"
          role="radiogroup"
          aria-label="Palette"
        >
          {Object.keys(PALETTES).map((p) => (
            <button
              key={p}
              type="button"
              role="radio"
              aria-checked={palette === p}
              onClick={() => setPalette(p)}
              className={cn(
                'rounded-pill px-3 py-1',
                palette === p ? 'bg-[#111] text-[#f6f4ef]' : 'text-muted',
              )}
            >
              {p}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-3 font-mono text-xs text-muted">
          Flow speed
          <input
            type="range"
            min={0}
            max={3}
            step={0.1}
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="accent-orange-500"
          />
          <span className="w-8 text-ink">{speed.toFixed(1)}×</span>
        </label>
      </div>
    </div>
  );
}

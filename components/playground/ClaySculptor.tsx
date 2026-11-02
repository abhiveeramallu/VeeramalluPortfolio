'use client';

import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, Lightformer, OrbitControls, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { cn } from '@/lib/utils';

type Shape = 'blob' | 'cube' | 'knot';
const COLORS = ['#FF5A1F', '#5B5BFF', '#C6F432', '#FFB8D6', '#FFF1DC'];

function Sculpt({
  shape,
  color,
  roughness,
  clearcoat,
}: {
  shape: Shape;
  color: string;
  roughness: number;
  clearcoat: number;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.3;
  });
  const material = (
    <meshPhysicalMaterial
      color={color}
      roughness={roughness}
      clearcoat={clearcoat}
      clearcoatRoughness={0.1}
      sheen={0.3}
    />
  );
  return (
    <group ref={ref}>
      {shape === 'cube' && (
        <RoundedBox args={[1.6, 1.6, 1.6]} radius={0.38} smoothness={8}>
          {material}
        </RoundedBox>
      )}
      {shape === 'blob' && (
        <mesh>
          <icosahedronGeometry args={[1.1, 24]} />
          {material}
        </mesh>
      )}
      {shape === 'knot' && (
        <mesh>
          <torusKnotGeometry args={[0.75, 0.28, 220, 32]} />
          {material}
        </mesh>
      )}
    </group>
  );
}

export default function ClaySculptor() {
  const [shape, setShape] = useState<Shape>('blob');
  const [color, setColor] = useState(COLORS[0]);
  const [roughness, setRoughness] = useState(0.35);
  const [clearcoat, setClearcoat] = useState(1);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_260px]">
      <div
        className="relative aspect-square overflow-hidden rounded-2xl bg-soft-pink sm:aspect-[4/3]"
        data-cursor="drag"
        role="img"
        aria-label="Glossy 3D clay object; drag to rotate"
      >
        <Canvas dpr={[1, 2]} camera={{ position: [0, 0.6, 4.4], fov: 40 }}>
          <ambientLight intensity={0.4} />
          <Environment resolution={256} frames={1}>
            <Lightformer form="rect" intensity={2.4} position={[0, 4, 3]} scale={[8, 2, 1]} />
            <Lightformer
              form="rect"
              intensity={1.4}
              color="#FFE7DF"
              position={[-5, 1, 2]}
              rotation-y={Math.PI / 2}
              scale={[6, 4, 1]}
            />
            <Lightformer
              form="rect"
              intensity={1.6}
              color="#D1D9FE"
              position={[5, 0, -1]}
              rotation-y={-Math.PI / 2}
              scale={[6, 4, 1]}
            />
          </Environment>
          <Sculpt shape={shape} color={color} roughness={roughness} clearcoat={clearcoat} />
          <ContactShadows position={[0, -1.4, 0]} opacity={0.35} scale={6} blur={2.4} far={3} />
          <OrbitControls enablePan={false} enableZoom={false} />
        </Canvas>
      </div>
      <div className="space-y-6 font-mono text-xs">
        <fieldset>
          <legend className="eyebrow mb-2 text-muted">Shape</legend>
          <div className="flex gap-2">
            {(['blob', 'cube', 'knot'] as Shape[]).map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={shape === s}
                onClick={() => setShape(s)}
                className={cn(
                  'rounded-pill border px-3 py-1.5 capitalize',
                  shape === s ? 'border-[#111] bg-[#111] text-[#f6f4ef]' : 'border-line text-ink',
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="eyebrow mb-2 text-muted">Colour</legend>
          <div className="flex gap-2">
            {COLORS.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={color === c}
                aria-label={`Colour ${c}`}
                onClick={() => setColor(c)}
                className={cn(
                  'h-8 w-8 rounded-full border-2',
                  color === c ? 'border-[#111]' : 'border-surface',
                )}
                style={{ background: c }}
              />
            ))}
          </div>
        </fieldset>
        {[
          ['Roughness', roughness, setRoughness],
          ['Clearcoat', clearcoat, setClearcoat],
        ].map(([label, value, set]) => (
          <label key={label as string} className="block">
            <span className="eyebrow mb-2 flex justify-between text-muted">
              {label as string} <span className="text-ink">{(value as number).toFixed(2)}</span>
            </span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={value as number}
              onChange={(e) => (set as (v: number) => void)(Number(e.target.value))}
              className="w-full accent-orange-500"
            />
          </label>
        ))}
      </div>
    </div>
  );
}

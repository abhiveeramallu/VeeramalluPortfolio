'use client';

import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Environment, Lightformer, PerformanceMonitor, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { SHAPES, type ShapeSpec } from './composition';

export interface HeroSceneHandle {
  scatter: () => void;
}

/** Spring tuning — underdamped so the shapes overshoot a little and feel physical. */
const STIFFNESS = 42;
const DAMPING = 7.5;
const REPEL_RADIUS = 1.35;
const REPEL_FORCE = 0.95;

interface Body {
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  home: THREE.Vector3;
  scatter: THREE.Vector3;
  delay: number;
  spin: THREE.Vector3;
}

function Shape({ spec }: { spec: ShapeSpec }) {
  const material = spec.glass ? (
    <meshPhysicalMaterial
      color={spec.color}
      transmission={1}
      thickness={0.9}
      roughness={0.08}
      ior={1.35}
      clearcoat={1}
      attenuationColor={spec.color}
      attenuationDistance={1.2}
    />
  ) : (
    <meshPhysicalMaterial
      color={spec.color}
      roughness={0.32}
      clearcoat={1}
      clearcoatRoughness={0.12}
      sheen={0.4}
      sheenColor="#ffffff"
    />
  );

  switch (spec.kind) {
    case 'box':
      return (
        <RoundedBox args={[0.68, 0.68, 0.68]} radius={0.16} smoothness={5}>
          {material}
        </RoundedBox>
      );
    case 'sphere':
      return (
        <mesh>
          <sphereGeometry args={[0.4, 48, 48]} />
          {material}
        </mesh>
      );
    case 'pill':
      return (
        <mesh>
          <capsuleGeometry args={[0.2, 0.55, 12, 24]} />
          {material}
        </mesh>
      );
    case 'torus':
      return (
        <mesh>
          <torusGeometry args={[0.3, 0.12, 24, 64]} />
          {material}
        </mesh>
      );
    case 'knot':
      return (
        <mesh>
          <torusKnotGeometry args={[0.28, 0.1, 160, 20]} />
          {material}
        </mesh>
      );
    case 'asterisk':
      return (
        <group>
          {[0, Math.PI / 3, (2 * Math.PI) / 3].map((a) => (
            <mesh key={a} rotation={[0, 0, a]}>
              <capsuleGeometry args={[0.1, 0.62, 8, 16]} />
              {material}
            </mesh>
          ))}
        </group>
      );
  }
}

const Assembly = forwardRef<HeroSceneHandle, { pointerActive: React.MutableRefObject<boolean> }>(
  function Assembly({ pointerActive }, ref) {
    const groupRef = useRef<THREE.Group>(null);
    const meshRefs = useRef<(THREE.Group | null)[]>([]);
    const scatterUntil = useRef(0);
    const { viewport, pointer, clock } = useThree();

    const bodies = useMemo<Body[]>(
      () =>
        SHAPES.map((s, i) => {
          const home = new THREE.Vector3(...s.home);
          const angle = (i / SHAPES.length) * Math.PI * 2;
          const start = new THREE.Vector3(Math.cos(angle) * 7, Math.sin(angle) * 5, -3 + (i % 3));
          return {
            pos: start.clone(),
            vel: new THREE.Vector3(),
            home,
            scatter: home
              .clone()
              .add(home.clone().setZ(0).normalize().multiplyScalar(2.6))
              .setZ(1.2 + (i % 3) * 0.4),
            delay: 0.15 + i * 0.06,
            spin: new THREE.Vector3((i % 2 ? 1 : -1) * 0.25, 0.35 + (i % 3) * 0.1, 0),
          };
        }),
      [],
    );

    useImperativeHandle(ref, () => ({
      scatter() {
        scatterUntil.current = clock.elapsedTime + 0.55;
        bodies.forEach((b, i) =>
          b.vel.add(new THREE.Vector3(Math.sin(i * 12.9) * 3, Math.cos(i * 7.3) * 3, 4)),
        );
      },
    }));

    const target = useMemo(() => new THREE.Vector3(), []);
    const pointerWorld = useMemo(() => new THREE.Vector3(), []);
    const offset = useMemo(() => new THREE.Vector3(), []);

    useFrame((_, rawDt) => {
      const dt = Math.min(rawDt, 1 / 30);
      const t = clock.elapsedTime;
      const scattering = t < scatterUntil.current;
      pointerWorld.set((pointer.x * viewport.width) / 2, (pointer.y * viewport.height) / 2, 0);

      bodies.forEach((b, i) => {
        const obj = meshRefs.current[i];
        if (!obj) return;
        const assembled = t > b.delay;
        target.copy(scattering ? b.scatter : assembled ? b.home : b.pos);
        target.y += Math.sin(t * 0.9 + i * 1.7) * 0.06;

        if (pointerActive.current) {
          offset.copy(b.pos).sub(pointerWorld).setZ(0);
          const d = offset.length();
          if (d < REPEL_RADIUS && d > 0.0001) {
            target
              .add(offset.multiplyScalar(((REPEL_RADIUS - d) / d) * REPEL_FORCE))
              .setZ(target.z + (REPEL_RADIUS - d) * 0.6);
          }
        }

        // Semi-implicit Euler spring.
        b.vel
          .addScaledVector(target.sub(b.pos), STIFFNESS * dt)
          .multiplyScalar(Math.max(0, 1 - DAMPING * dt));
        b.pos.addScaledVector(b.vel, dt);
        obj.position.copy(b.pos);
        obj.rotation.x += b.spin.x * dt + b.vel.y * 0.004;
        obj.rotation.y += b.spin.y * dt + b.vel.x * 0.004;
      });

      if (groupRef.current) {
        const g = groupRef.current;
        // Fit the composition (≈6.2 × 5.2 units incl. satellites) into narrow viewports.
        g.scale.setScalar(Math.min(1, viewport.width / 6.2, viewport.height / 5.2));
        g.rotation.y = THREE.MathUtils.damp(
          g.rotation.y,
          pointerActive.current ? pointer.x * 0.22 : 0,
          3,
          dt,
        );
        g.rotation.x = THREE.MathUtils.damp(
          g.rotation.x,
          pointerActive.current ? -pointer.y * 0.12 : 0,
          3,
          dt,
        );
      }
    });

    return (
      <group ref={groupRef}>
        {SHAPES.map((s, i) => (
          <group
            key={i}
            ref={(el) => {
              meshRefs.current[i] = el;
            }}
            rotation={s.rot}
            scale={s.scale}
            position={bodies[i].pos}
          >
            <Shape spec={s} />
          </group>
        ))}
      </group>
    );
  },
);

function StudioLights() {
  // Lightformers baked once into an env map: studio look with zero network requests (no remote HDRI).
  return (
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
      <Lightformer form="ring" intensity={2} position={[2, 3, -4]} scale={2} />
    </Environment>
  );
}

const HeroScene = forwardRef<HeroSceneHandle, { onReady?: () => void }>(function HeroScene({ onReady }, ref) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pointerActive = useRef(false);
  const [inView, setInView] = useState(true);
  const [dpr, setDpr] = useState(1.5);
  const [lowPower, setLowPower] = useState(false);
  const assemblyRef = useRef<HeroSceneHandle>(null);

  useImperativeHandle(ref, () => ({ scatter: () => assemblyRef.current?.scatter() }));

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: '80px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      className="absolute inset-0"
      onPointerEnter={(e) => (pointerActive.current = e.pointerType === 'mouse')}
      onPointerLeave={() => (pointerActive.current = false)}
      onClick={() => assemblyRef.current?.scatter()}
      data-cursor-label="Scatter"
    >
      <Canvas
        dpr={dpr}
        frameloop={inView ? 'always' : 'demand'}
        camera={{ position: [0, 0, 9.5], fov: 34 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
          onReady?.();
        }}
      >
        <PerformanceMonitor
          bounds={() => [45, 58]}
          flipflops={3}
          onIncline={() => setDpr(Math.min(2, window.devicePixelRatio))}
          onDecline={() => {
            setDpr(1);
            setLowPower(true);
          }}
          onFallback={() => setDpr(1)}
        />
        <ambientLight intensity={0.35} />
        <directionalLight position={[3, 5, 5]} intensity={1.1} />
        {/* Cool rim light from behind-left */}
        <directionalLight position={[-5, 2, -6]} intensity={2.2} color="#B4C0FE" />
        <StudioLights />
        <Assembly ref={assemblyRef} pointerActive={pointerActive} />
        <ContactShadows
          position={[0, -2.45, 0]}
          opacity={0.32}
          scale={9}
          blur={2.8}
          far={4.5}
          resolution={lowPower ? 128 : 256}
          color="#3a2a20"
        />
      </Canvas>
    </div>
  );
});

export default HeroScene;

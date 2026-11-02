import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Html, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

interface ComputerTerminalProps {
  mousePos: { x: number; y: number };
}

export const ComputerTerminal3D: React.FC<ComputerTerminalProps> = ({ mousePos }) => {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const cubesRef = useRef<THREE.Group>(null);

  // Smooth rotation towards mouse target
  useFrame((state, delta) => {
    if (groupRef.current) {
      const targetRotationY = (mousePos.x * 0.45);
      const targetRotationX = (-mousePos.y * 0.25);
      
      groupRef.current.rotation.y = THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        targetRotationY,
        3,
        delta
      );
      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        targetRotationX,
        3,
        delta
      );
      
      // Gentle natural hovering
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.12;
    }

    // Spin orbital rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.4;
      ring1Ref.current.rotation.x += delta * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.3;
      ring2Ref.current.rotation.y += delta * 0.25;
    }

    // Animate mini floating tech cubes
    if (cubesRef.current) {
      cubesRef.current.rotation.y += delta * 0.15;
    }
  });

  // Cube positions and colors for floating tech nodes
  const cubeData = useMemo(() => {
    const list = [];
    const count = 12;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 2.4 + Math.sin(i * 1.8) * 0.6;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(i * 2.5) * 1.2;
      const z = Math.sin(angle) * radius;
      const scale = 0.12 + Math.random() * 0.14;
      list.push({ position: [x, y, z] as [number, number, number], scale, color: i % 2 === 0 ? '#FF5B35' : '#8B5CF6' });
    }
    return list;
  }, []);

  return (
    <group>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} color="#F4F0E6" />
      <pointLight position={[-4, -2, -2]} intensity={2.5} color="#8B5CF6" distance={15} />
      <pointLight position={[3, 2, 4]} intensity={3.5} color="#FF5B35" distance={12} />
      <spotLight position={[0, 6, 4]} intensity={2.0} color="#FF5B35" angle={0.6} penumbra={0.8} />

      {/* Main Terminal Cluster with gentle float */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
        <group ref={groupRef} position={[0, 0, 0]}>
          {/* Main Monitor Bezel / Chassis */}
          <mesh castShadow receiveShadow position={[0, 0, 0]}>
            <boxGeometry args={[2.8, 2.0, 0.45]} />
            <meshStandardMaterial
              color="#13131a"
              metalness={0.85}
              roughness={0.25}
              envMapIntensity={1.2}
            />
          </mesh>

          {/* Accent Orange Trim on Monitor Edge */}
          <lineSegments position={[0, 0, 0.23]}>
            <edgesGeometry args={[new THREE.BoxGeometry(2.82, 2.02, 0.05)]} />
            <lineBasicMaterial color="#FF5B35" linewidth={2} transparent opacity={0.8} />
          </lineSegments>

          {/* Monitor Screen Frame Bevel */}
          <mesh position={[0, 0.05, 0.22]}>
            <boxGeometry args={[2.5, 1.7, 0.04]} />
            <meshStandardMaterial color="#0b0b0f" roughness={0.1} metalness={0.9} />
          </mesh>

          {/* Illuminated Screen Surface */}
          <mesh position={[0, 0.05, 0.24]}>
            <planeGeometry args={[2.4, 1.6]} />
            <meshBasicMaterial color="#0c0e12" />
          </mesh>

          {/* Terminal Screen UI content using HTML embedded in 3D */}
          <Html
            transform
            occlude
            position={[0, 0.05, 0.245]}
            scale={0.165}
            distanceFactor={1}
            style={{
              width: '420px',
              height: '280px',
              userSelect: 'none',
              pointerEvents: 'none'
            }}
          >
            <div className="w-full h-full bg-[#0a0a0f]/95 border border-[#FF5B35]/30 rounded p-4 font-mono text-[11px] text-[#F4F0E6] flex flex-col justify-between shadow-[inset_0_0_20px_rgba(255,91,53,0.15)] backdrop-blur-sm">
              <div>
                <div className="flex items-center justify-between border-b border-[#272733] pb-2 mb-3">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5B35]/80 animate-pulse"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#C7D9B5]/80"></span>
                  </div>
                  <span className="text-[10px] text-[#FF5B35] tracking-widest font-bold">TERMINAL v2.7</span>
                </div>
                <div className="space-y-1.5 text-left">
                  <p className="text-[#FF5B35] font-semibold flex items-center">
                    <span className="text-gray-400 mr-1.5">&gt;</span>abhiram.dev
                  </p>
                  <p className="text-[#A7A3AD] flex items-center">
                    <span className="text-gray-400 mr-1.5">&gt;</span>initializing portfolio...
                  </p>
                  <p className="text-[#8B5CF6] font-medium flex items-center">
                    <span className="text-gray-400 mr-1.5">&gt;</span>AI / FULL STACK / SYSTEMS
                  </p>
                  <p className="text-[#C7D9B5] flex items-center">
                    <span className="text-[#FF5B35] mr-1.5 animate-pulse">●</span>system ready_
                  </p>
                </div>
              </div>

              {/* Live telemetry bottom readout */}
              <div className="border-t border-[#272733]/80 pt-2 flex items-center justify-between text-[9px] text-[#A7A3AD]">
                <div className="flex items-center space-x-2">
                  <span className="text-emerald-400">FPS: 60</span>
                  <span>|</span>
                  <span className="text-[#FF5B35]">VIT'27</span>
                </div>
                <div className="text-right">
                  <span className="text-violet-400 font-mono">LATENCY: 12ms</span>
                </div>
              </div>
            </div>
          </Html>

          {/* Computer Stand / Neck */}
          <mesh position={[0, -1.2, -0.1]} castShadow>
            <cylinderGeometry args={[0.18, 0.24, 0.6, 16]} />
            <meshStandardMaterial color="#1e1e28" metalness={0.9} roughness={0.2} />
          </mesh>

          {/* Computer Base */}
          <mesh position={[0, -1.5, 0]} receiveShadow>
            <cylinderGeometry args={[0.9, 1.0, 0.08, 32]} />
            <meshStandardMaterial color="#181822" metalness={0.8} roughness={0.3} />
          </mesh>
          <lineSegments position={[0, -1.45, 0]}>
            <edgesGeometry args={[new THREE.CylinderGeometry(0.91, 1.01, 0.08, 32)]} />
            <lineBasicMaterial color="#FF5B35" transparent opacity={0.6} />
          </lineSegments>

          {/* Floating Keyboard Platform */}
          <mesh position={[0, -1.35, 0.65]} rotation={[-0.15, 0, 0]}>
            <boxGeometry args={[1.9, 0.12, 0.7]} />
            <meshStandardMaterial color="#14141d" metalness={0.7} roughness={0.3} />
          </mesh>
          {/* Keyboard Keys Glow */}
          <mesh position={[0, -1.28, 0.65]} rotation={[-0.15, 0, 0]}>
            <planeGeometry args={[1.75, 0.55]} />
            <meshBasicMaterial color="#FF5B35" transparent opacity={0.15} />
          </mesh>
        </group>
      </Float>

      {/* Orbital Glowing Rings */}
      <mesh ref={ring1Ref} position={[0, 0, 0]} rotation={[1.1, 0.4, 0]}>
        <torusGeometry args={[2.5, 0.02, 16, 100]} />
        <meshBasicMaterial color="#FF5B35" transparent opacity={0.75} />
      </mesh>
      <mesh ref={ring2Ref} position={[0, 0, 0]} rotation={[-0.8, -0.6, 0.3]}>
        <torusGeometry args={[3.1, 0.025, 16, 100]} />
        <meshBasicMaterial color="#8B5CF6" transparent opacity={0.6} />
      </mesh>

      {/* Satellite Floating Tech Cubes */}
      <group ref={cubesRef}>
        {cubeData.map((c, i) => (
          <mesh key={i} position={c.position} scale={c.scale}>
            <boxGeometry />
            <meshStandardMaterial
              color={c.color}
              emissive={c.color}
              emissiveIntensity={0.6}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
        ))}
      </group>

      {/* Atmospheric Particles */}
      <Sparkles
        count={60}
        scale={6}
        size={2.5}
        speed={0.4}
        color="#FF5B35"
        opacity={0.45}
      />
      <Sparkles
        count={40}
        scale={8}
        size={2.0}
        speed={0.3}
        color="#8B5CF6"
        opacity={0.35}
      />

      {/* Subtle bottom wireframe grid representing digital plane */}
      <gridHelper
        args={[16, 24, '#FF5B35', '#272733']}
        position={[0, -2.4, 0]}
      />
    </group>
  );
};

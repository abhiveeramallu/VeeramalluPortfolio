import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export const SmartDocumentScene: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const scanLineRef = useRef<THREE.Mesh>(null);
  const tokensRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.25;
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.15;
    }

    // Scanning beam animation
    if (scanLineRef.current) {
      scanLineRef.current.position.y = Math.sin(state.clock.elapsedTime * 2.0) * 1.2;
    }

    // Floating tokens
    if (tokensRef.current) {
      tokensRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 5, 3]} intensity={1.5} color="#F4F0E6" />
      <pointLight position={[0, 0, 3]} intensity={3} color="#C7D9B5" distance={6} />
      <pointLight position={[-2, -2, 1]} intensity={2} color="#FF5B35" distance={6} />

      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
        {/* Layer 1: Base Document (Back) */}
        <mesh position={[-0.2, -0.15, -0.3]} rotation={[0.05, 0.1, -0.05]}>
          <boxGeometry args={[1.8, 2.4, 0.02]} />
          <meshStandardMaterial
            color="#14181a"
            roughness={0.3}
            metalness={0.7}
            transparent
            opacity={0.7}
          />
        </mesh>

        {/* Layer 2: Middle Document */}
        <mesh position={[0.1, 0.05, 0]} rotation={[-0.05, -0.05, 0.03]}>
          <boxGeometry args={[1.9, 2.5, 0.02]} />
          <meshStandardMaterial
            color="#192220"
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Document Line Placeholders on Middle Sheet */}
        {[-0.8, -0.5, -0.2, 0.1, 0.4, 0.7].map((y, i) => (
          <mesh key={i} position={[0.1, y + 0.05, 0.015]} rotation={[-0.05, -0.05, 0.03]}>
            <planeGeometry args={[1.4, 0.03]} />
            <meshBasicMaterial color={i === 2 ? '#C7D9B5' : '#4a5752'} transparent opacity={0.6} />
          </mesh>
        ))}

        {/* Layer 3: Foreground Translucent OCR Glass Sheet */}
        <mesh position={[0, 0, 0.35]}>
          <boxGeometry args={[2.0, 2.6, 0.02]} />
          <meshPhysicalMaterial
            color="#1d2b27"
            roughness={0.1}
            metalness={0.1}
            transmission={0.6}
            transparent
            opacity={0.9}
            reflectivity={0.9}
          />
        </mesh>
        {/* Orange Accent Border for Main Document */}
        <lineSegments position={[0, 0, 0.36]}>
          <edgesGeometry args={[new THREE.BoxGeometry(2.02, 2.62, 0.02)]} />
          <lineBasicMaterial color="#C7D9B5" transparent opacity={0.7} />
        </lineSegments>

        {/* Dynamic OCR Laser Scanning Plane */}
        <mesh ref={scanLineRef} position={[0, 0, 0.38]}>
          <boxGeometry args={[2.08, 0.04, 0.02]} />
          <meshBasicMaterial color="#FF5B35" />
        </mesh>
      </Float>

      {/* Floating Extracted Data Tokens / Neural Weights */}
      <group ref={tokensRef}>
        {[
          { pos: [1.4, 0.8, 0.5], label: 'Ollama 8B', col: '#C7D9B5' },
          { pos: [-1.4, -0.6, 0.6], label: 'Cosine Sim', col: '#FF5B35' },
          { pos: [1.2, -0.9, -0.4], label: 'Tesseract OCR', col: '#8B5CF6' },
          { pos: [-1.3, 0.9, -0.2], label: 'RAG Pipeline', col: '#C7D9B5' },
        ].map((t, i) => (
          <Float key={i} speed={3 + i} rotationIntensity={0.4} floatIntensity={0.3}>
            <mesh position={t.pos as [number, number, number]}>
              <octahedronGeometry args={[0.12, 0]} />
              <meshStandardMaterial color={t.col} emissive={t.col} emissiveIntensity={0.8} />
            </mesh>
          </Float>
        ))}
      </group>
    </group>
  );
};

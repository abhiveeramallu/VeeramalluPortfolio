import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface InteractiveLabProps {
  geometryType: 'knot' | 'icosahedron' | 'octahedron' | 'dodecahedron';
  wireframe: boolean;
  speed: number;
  color: string;
}

export const InteractiveLab3D: React.FC<InteractiveLabProps> = ({
  geometryType,
  wireframe,
  speed,
  color,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * speed * 0.8;
      meshRef.current.rotation.y += delta * speed * 1.1;
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z -= delta * speed * 0.5;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 4]} intensity={2.0} color="#F4F0E6" />
      <pointLight position={[-3, -3, 2]} intensity={3} color={color} distance={8} />

      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.3}>
        <mesh ref={meshRef}>
          {geometryType === 'knot' && <torusKnotGeometry args={[1.0, 0.32, 128, 32]} />}
          {geometryType === 'icosahedron' && <icosahedronGeometry args={[1.3, 1]} />}
          {geometryType === 'octahedron' && <octahedronGeometry args={[1.4, 0]} />}
          {geometryType === 'dodecahedron' && <dodecahedronGeometry args={[1.3, 0]} />}

          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.35}
            roughness={0.2}
            metalness={0.8}
            wireframe={wireframe}
          />
        </mesh>
      </Float>

      {/* Orbiting Quantum Ring */}
      <mesh ref={outerRingRef} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.0, 0.02, 16, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} />
      </mesh>
    </group>
  );
};

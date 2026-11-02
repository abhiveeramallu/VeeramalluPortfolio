import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

export const ContactMesh3D: React.FC = () => {
  const meshRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.25;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.25;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={2} color="#F4F0E6" />
      <pointLight position={[0, 0, 0]} intensity={4.5} color="#FF5B35" distance={8} />
      <pointLight position={[-4, 2, -2]} intensity={3} color="#8B5CF6" distance={8} />

      <Float speed={2.5} rotationIntensity={0.3} floatIntensity={0.4}>
        <group ref={meshRef}>
          {/* Inner crystal core */}
          <mesh>
            <octahedronGeometry args={[1.2, 0]} />
            <meshStandardMaterial
              color="#FF5B35"
              emissive="#FF5B35"
              emissiveIntensity={0.6}
              roughness={0.15}
              metalness={0.9}
            />
          </mesh>

          {/* Wireframe protective exoskeleton */}
          <mesh scale={1.3}>
            <icosahedronGeometry args={[1.2, 1]} />
            <meshStandardMaterial
              color="#F4F0E6"
              wireframe
              transparent
              opacity={0.35}
            />
          </mesh>

          {/* Secondary geometric cage */}
          <mesh scale={1.6}>
            <dodecahedronGeometry args={[1.1, 0]} />
            <meshStandardMaterial
              color="#8B5CF6"
              wireframe
              transparent
              opacity={0.25}
            />
          </mesh>
        </group>
      </Float>

      {/* Intersecting orbital energy rings */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.5, 0.02, 16, 80]} />
        <meshBasicMaterial color="#FF5B35" transparent opacity={0.7} />
      </mesh>
      <mesh ref={ring2Ref} rotation={[-Math.PI / 4, 0.5, 0]}>
        <torusGeometry args={[2.8, 0.02, 16, 80]} />
        <meshBasicMaterial color="#8B5CF6" transparent opacity={0.6} />
      </mesh>

      <Sparkles count={50} scale={6} size={3} speed={0.5} color="#FF5B35" opacity={0.5} />
      <Sparkles count={30} scale={7} size={2.5} speed={0.4} color="#8B5CF6" opacity={0.4} />
    </group>
  );
};

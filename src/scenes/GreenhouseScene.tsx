import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export const GreenhouseScene: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
    if (coreRef.current) {
      // Temperature pulsation
      const s = 1.0 + Math.sin(state.clock.elapsedTime * 2.5) * 0.08;
      coreRef.current.scale.set(s, s, s);
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.3, 0]}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 5, 2]} intensity={1.5} color="#F4F0E6" />
      <pointLight position={[0, 0.5, 0]} intensity={3.5} color="#FF5B35" distance={6} />
      <pointLight position={[0, -0.8, 0]} intensity={2.0} color="#C7D9B5" distance={5} />

      {/* Geodesic Greenhouse Biodome Wireframe */}
      <mesh position={[0, 0, 0]}>
        <icosahedronGeometry args={[1.8, 2]} />
        <meshStandardMaterial
          color="#FF5B35"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Translucent Greenhouse Glass Facets */}
      <mesh position={[0, 0, 0]}>
        <icosahedronGeometry args={[1.78, 1]} />
        <meshPhysicalMaterial
          color="#162e20"
          roughness={0.15}
          metalness={0.2}
          transmission={0.7}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Greenhouse Base Terrarium Ring */}
      <mesh position={[0, -1.3, 0]}>
        <cylinderGeometry args={[2.0, 2.1, 0.35, 32]} />
        <meshStandardMaterial color="#141916" metalness={0.8} roughness={0.3} />
      </mesh>
      <lineSegments position={[0, -1.12, 0]}>
        <edgesGeometry args={[new THREE.CylinderGeometry(2.01, 2.11, 0.35, 32)]} />
        <lineBasicMaterial color="#FF5B35" transparent opacity={0.7} />
      </lineSegments>

      {/* Central Micro-Climate Thermal Orb */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
        <mesh ref={coreRef} position={[0, 0.1, 0]}>
          <sphereGeometry args={[0.55, 32, 32]} />
          <meshStandardMaterial
            color="#FF5B35"
            emissive="#FF5B35"
            emissiveIntensity={0.8}
            roughness={0.2}
          />
        </mesh>
      </Float>

      {/* Forecast Orbiting Telemetry Sensor Ring */}
      <mesh ref={ringRef} position={[0, 0.1, 0]} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.2, 0.02, 16, 64]} />
        <meshBasicMaterial color="#C7D9B5" />
      </mesh>

      {/* Recurrent Neural Network (GRU / BiLSTM) Time-series Nodes */}
      {[-0.9, -0.45, 0, 0.45, 0.9].map((x, i) => {
        const y = Math.sin(i * 1.3) * 0.3 - 0.5;
        return (
          <group key={i} position={[x, y, 1.2]}>
            <mesh>
              <sphereGeometry args={[0.07, 16, 16]} />
              <meshBasicMaterial color={i % 2 === 0 ? '#FF5B35' : '#C7D9B5'} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

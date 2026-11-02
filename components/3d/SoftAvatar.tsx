'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface SoftAvatarProps {
  mousePos: { x: number; y: number };
}

export const SoftAvatar: React.FC<SoftAvatarProps> = ({ mousePos }) => {
  const avatarGroupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const satelliteCubeRef = useRef<THREE.Mesh>(null);
  const starRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    // Parallax mouse tilt
    if (avatarGroupRef.current) {
      const targetRotY = mousePos.x * 0.45;
      const targetRotX = -mousePos.y * 0.35;
      avatarGroupRef.current.rotation.y = THREE.MathUtils.damp(
        avatarGroupRef.current.rotation.y,
        targetRotY,
        3.5,
        delta
      );
      avatarGroupRef.current.rotation.x = THREE.MathUtils.damp(
        avatarGroupRef.current.rotation.x,
        targetRotX,
        3.5,
        delta
      );
    }

    // Gentle head oscillation
    if (headRef.current) {
      headRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.4) * 0.05;
    }

    // Orbiting ring
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.35;
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.8) * 0.2;
    }

    // Satellite cube spin
    if (satelliteCubeRef.current) {
      satelliteCubeRef.current.rotation.x += delta * 0.6;
      satelliteCubeRef.current.rotation.y += delta * 0.8;
    }

    // 3D orange asterisk spin
    if (starRef.current) {
      starRef.current.rotation.z += delta * 0.5;
    }
  });

  return (
    <group ref={avatarGroupRef} position={[0, 0, 0]}>
      {/* Studio Lighting */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 8, 5]} intensity={1.4} color="#FFFDF7" />
      <directionalLight position={[-4, 3, -3]} intensity={0.6} color="#D6E6FF" />
      <pointLight position={[2, -2, 3]} intensity={1.2} color="#FFD6E8" distance={8} />
      <pointLight position={[-2, 3, 2]} intensity={1.5} color="#FF5A1F" distance={7} />

      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.35}>
        {/* Main Soft Stylized Character Bust / Avatar */}
        <group position={[0, -0.2, 0]}>
          
          {/* Head - Soft Pill / Rounded Sphere */}
          <mesh ref={headRef} position={[0, 0.65, 0]} castShadow>
            <sphereGeometry args={[1.05, 48, 48]} />
            <meshPhysicalMaterial
              color="#FFAF94"
              roughness={0.25}
              clearcoat={0.65}
              clearcoatRoughness={0.15}
              reflectivity={0.6}
            />
          </mesh>

          {/* Friendly Minimalist Eyes */}
          <group position={[0, 0.72, 0.98]}>
            <mesh position={[-0.32, 0, 0]}>
              <capsuleGeometry args={[0.07, 0.12, 8, 16]} />
              <meshBasicMaterial color="#111111" />
            </mesh>
            <mesh position={[0.32, 0, 0]}>
              <capsuleGeometry args={[0.07, 0.12, 8, 16]} />
              <meshBasicMaterial color="#111111" />
            </mesh>
            {/* Soft Peach Blush */}
            <mesh position={[-0.52, -0.15, -0.05]}>
              <sphereGeometry args={[0.16, 16, 16]} />
              <meshBasicMaterial color="#FF5A1F" transparent opacity={0.3} />
            </mesh>
            <mesh position={[0.52, -0.15, -0.05]}>
              <sphereGeometry args={[0.16, 16, 16]} />
              <meshBasicMaterial color="#FF5A1F" transparent opacity={0.3} />
            </mesh>
          </group>

          {/* Torso / Rounded Body Cylinder */}
          <mesh position={[0, -0.7, 0]} castShadow>
            <cylinderGeometry args={[0.9, 1.25, 1.2, 32]} />
            <meshPhysicalMaterial
              color="#5B5BFF"
              roughness={0.28}
              clearcoat={0.5}
              clearcoatRoughness={0.2}
            />
          </mesh>

          {/* Soft Collar Accent */}
          <mesh position={[0, -0.1, 0]}>
            <torusGeometry args={[0.82, 0.14, 16, 32]} />
            <meshPhysicalMaterial
              color="#C6F432"
              roughness={0.2}
              clearcoat={0.6}
            />
          </mesh>
        </group>
      </Float>

      {/* Orbiting Pastel Floating Halo */}
      <mesh ref={ringRef} position={[0, 0.6, 0]} rotation={[1.1, 0.4, 0]}>
        <torusGeometry args={[1.7, 0.04, 16, 64]} />
        <meshPhysicalMaterial
          color="#FF5A1F"
          roughness={0.15}
          clearcoat={0.8}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Floating Soft Rounded Cube (Tool/Toy symbol) */}
      <Float speed={2.5} rotationIntensity={0.6} floatIntensity={0.4}>
        <mesh ref={satelliteCubeRef} position={[1.8, 1.2, -0.3]}>
          <boxGeometry args={[0.42, 0.42, 0.42]} />
          <meshPhysicalMaterial
            color="#C6F432"
            roughness={0.2}
            clearcoat={0.7}
          />
        </mesh>
      </Float>

      {/* Floating Soft Pastel Blue Sphere */}
      <Float speed={3} rotationIntensity={0.4} floatIntensity={0.5}>
        <mesh position={[-1.7, 0.2, 0.4]}>
          <sphereGeometry args={[0.26, 24, 24]} />
          <meshPhysicalMaterial
            color="#D6E6FF"
            roughness={0.15}
            clearcoat={0.9}
          />
        </mesh>
      </Float>

      {/* Orange 3D Asterisk / Star */}
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.3}>
        <group ref={starRef} position={[-1.4, 1.5, -0.2]} scale={0.28}>
          {[0, Math.PI / 3, (2 * Math.PI) / 3].map((angle, i) => (
            <mesh key={i} rotation={[0, 0, angle]}>
              <capsuleGeometry args={[0.2, 1.6, 8, 16]} />
              <meshPhysicalMaterial
                color="#FF5A1F"
                roughness={0.2}
                clearcoat={0.8}
              />
            </mesh>
          ))}
        </group>
      </Float>

      {/* Soft Contact Shadow Simulator Disc */}
      <mesh position={[0, -1.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.1, 1.8, 32]} />
        <meshBasicMaterial color="#111111" transparent opacity={0.06} />
      </mesh>
    </group>
  );
};

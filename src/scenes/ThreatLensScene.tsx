import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export const ThreatLensScene: React.FC = () => {
  const coreRef = useRef<THREE.Group>(null);
  const radarSweepRef = useRef<THREE.Mesh>(null);
  const nodesGroupRef = useRef<THREE.Group>(null);

  // Generate satellite threat and verified nodes
  const nodes = useMemo(() => {
    const list = [];
    const count = 16;
    for (let i = 0; i < count; i++) {
      const theta = (i / count) * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.8;
      const radius = 1.9 + Math.random() * 0.4;
      const x = radius * Math.cos(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi);
      const z = radius * Math.cos(phi) * Math.sin(theta);
      const isThreat = i % 4 === 0;
      list.push({
        pos: [x, y, z] as [number, number, number],
        isThreat,
        color: isThreat ? '#FF5B35' : '#8B5CF6',
        scale: isThreat ? 0.14 : 0.09,
      });
    }
    return list;
  }, []);

  // Single batched draw-call LineSegments for all connection vectors
  const connectionSegments = useMemo(() => {
    const points: THREE.Vector3[] = [];
    nodes.forEach((node) => {
      points.push(new THREE.Vector3(0, 0, 0));
      points.push(new THREE.Vector3(node.pos[0] * 0.7, node.pos[1] * 0.7, node.pos[2] * 0.7));
    });
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: '#8B5CF6',
      transparent: true,
      opacity: 0.3,
    });
    return new THREE.LineSegments(geometry, material);
  }, [nodes]);

  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.35;
      coreRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
    if (radarSweepRef.current) {
      radarSweepRef.current.rotation.z += delta * 1.5;
    }
    if (nodesGroupRef.current) {
      nodesGroupRef.current.rotation.y -= delta * 0.15;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 2]} intensity={1.5} color="#F4F0E6" />
      <pointLight position={[0, 0, 0]} intensity={4} color="#8B5CF6" distance={6} />
      <pointLight position={[2, 2, 2]} intensity={2.5} color="#FF5B35" distance={5} />

      {/* Central Defensive Shield Core */}
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.3}>
        <group ref={coreRef}>
          {/* Inner pulsating core */}
          <mesh>
            <octahedronGeometry args={[0.7, 0]} />
            <meshStandardMaterial
              color="#8B5CF6"
              emissive="#8B5CF6"
              emissiveIntensity={0.8}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>

          {/* Faceted Shield Wireframe Outer Shell */}
          <mesh scale={1.25}>
            <icosahedronGeometry args={[0.9, 1]} />
            <meshStandardMaterial
              color="#3B2667"
              wireframe
              transparent
              opacity={0.4}
            />
          </mesh>

          {/* Accent Shield Plates */}
          <mesh scale={1.4}>
            <dodecahedronGeometry args={[0.8, 0]} />
            <meshStandardMaterial
              color="#FF5B35"
              wireframe
              transparent
              opacity={0.3}
            />
          </mesh>
        </group>
      </Float>

      {/* Radar Scan Disc */}
      <mesh ref={radarSweepRef} rotation={[-Math.PI / 2.2, 0, 0]}>
        <ringGeometry args={[0.5, 2.4, 32]} />
        <meshBasicMaterial
          color="#8B5CF6"
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Threat and telemetry nodes orbiting around */}
      <group ref={nodesGroupRef}>
        <primitive object={connectionSegments} />
        {nodes.map((node, i) => (
          <group key={i} position={node.pos}>
            <mesh scale={node.scale}>
              <sphereGeometry args={[1, 16, 16]} />
              <meshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={node.isThreat ? 1.0 : 0.4}
              />
            </mesh>
            {/* Anomaly halo for threats */}
            {node.isThreat && (
              <mesh scale={node.scale * 1.8}>
                <ringGeometry args={[1, 1.2, 16]} />
                <meshBasicMaterial color="#FF5B35" transparent opacity={0.6} side={THREE.DoubleSide} />
              </mesh>
            )}
          </group>
        ))}
      </group>

      {/* Orbital Shield Rings */}
      <mesh rotation={[0.6, 0.4, 0]}>
        <torusGeometry args={[2.5, 0.015, 16, 64]} />
        <meshBasicMaterial color="#FF5B35" transparent opacity={0.5} />
      </mesh>
      <mesh rotation={[-0.7, -0.5, 0.4]}>
        <torusGeometry args={[2.7, 0.015, 16, 64]} />
        <meshBasicMaterial color="#8B5CF6" transparent opacity={0.4} />
      </mesh>
    </group>
  );
};

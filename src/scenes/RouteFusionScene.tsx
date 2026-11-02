import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export const RouteFusionScene: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const vehiclesRef = useRef<THREE.Group>(null);

  // Generate city buildings and road grid
  const { buildings, roads, waypoints } = useMemo(() => {
    const bList = [];
    const rList = [];
    const wpList = [];

    // Grid of miniature stylized skyscraper blocks
    for (let x = -3; x <= 3; x += 1.2) {
      for (let z = -3; z <= 3; z += 1.2) {
        if (Math.abs(x) < 0.2 && Math.abs(z) < 0.2) continue; // leave central intersection
        const height = 0.5 + Math.random() * 1.5;
        bList.push({
          pos: [x, height / 2 - 1, z] as [number, number, number],
          size: [0.8, height, 0.8] as [number, number, number],
          color: Math.random() > 0.6 ? '#1b1b26' : '#14141c',
          isHub: Math.random() > 0.85
        });
      }
    }

    // Road segments
    rList.push({ start: [-3.5, -0.99, 0], end: [3.5, -0.99, 0] });
    rList.push({ start: [0, -0.99, -3.5], end: [0, -0.99, 3.5] });
    rList.push({ start: [-3.5, -0.99, 1.2], end: [3.5, -0.99, 1.2] });
    rList.push({ start: [-3.5, -0.99, -1.2], end: [3.5, -0.99, -1.2] });

    // Waypoints for pickups & dropoffs
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      wpList.push({
        pos: [Math.cos(angle) * 1.8, -0.7, Math.sin(angle) * 1.8] as [number, number, number],
        type: i % 2 === 0 ? 'pickup' : 'parcel'
      });
    }

    return { buildings: bList, roads: rList, waypoints: wpList };
  }, []);

  // Moving vehicles across routes
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 3]} intensity={1.5} color="#FFE5DB" />
      <pointLight position={[0, 1.5, 0]} intensity={3} color="#FF5B35" distance={6} />
      <pointLight position={[-2, 1, -2]} intensity={2} color="#8B5CF6" distance={8} />

      {/* Ground plane */}
      <mesh position={[0, -1.02, 0]} receiveShadow>
        <cylinderGeometry args={[4.2, 4.4, 0.1, 48]} />
        <meshStandardMaterial color="#0c0c11" roughness={0.4} metalness={0.7} />
      </mesh>
      {/* Outer illuminated boundary ring */}
      <mesh position={[0, -0.98, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4.2, 4.25, 48]} />
        <meshBasicMaterial color="#FF5B35" />
      </mesh>

      {/* Buildings */}
      {buildings.map((b, i) => (
        <group key={i} position={b.pos}>
          <mesh>
            <boxGeometry args={b.size} />
            <meshStandardMaterial
              color={b.color}
              roughness={0.3}
              metalness={0.8}
            />
          </mesh>
          {/* Accent roof beacon for logistics hubs */}
          {b.isHub && (
            <mesh position={[0, b.size[1] / 2 + 0.05, 0]}>
              <boxGeometry args={[0.2, 0.1, 0.2]} />
              <meshBasicMaterial color="#FF5B35" />
            </mesh>
          )}
        </group>
      ))}

      {/* Glowing Logistics Route Paths */}
      <mesh position={[0, -0.95, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[7.0, 0.08]} />
        <meshBasicMaterial color="#FF5B35" transparent opacity={0.85} />
      </mesh>
      <mesh position={[0, -0.95, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
        <planeGeometry args={[7.0, 0.08]} />
        <meshBasicMaterial color="#FF5B35" transparent opacity={0.85} />
      </mesh>
      <mesh position={[0, -0.95, 1.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[7.0, 0.05]} />
        <meshBasicMaterial color="#8B5CF6" transparent opacity={0.75} />
      </mesh>
      <mesh position={[0, -0.95, -1.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[7.0, 0.05]} />
        <meshBasicMaterial color="#8B5CF6" transparent opacity={0.75} />
      </mesh>

      {/* Waypoint Nodes (Hungarian Matching Points) */}
      {waypoints.map((wp, i) => (
        <Float key={i} speed={3} rotationIntensity={0.5} floatIntensity={0.2}>
          <mesh position={wp.pos}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color={wp.type === 'pickup' ? '#FF5B35' : '#C7D9B5'} />
          </mesh>
          {/* Vertical beacon beam */}
          <mesh position={[wp.pos[0], wp.pos[1] + 0.35, wp.pos[2]]}>
            <cylinderGeometry args={[0.01, 0.01, 0.7, 8]} />
            <meshBasicMaterial
              color={wp.type === 'pickup' ? '#FF5B35' : '#C7D9B5'}
              transparent
              opacity={0.6}
            />
          </mesh>
        </Float>
      ))}

      {/* Moving autonomous delivery vehicles */}
      <group ref={vehiclesRef}>
        <VehicleAnimation pathRadius={1.8} speed={1.2} color="#FF5B35" label="Passenger" />
        <VehicleAnimation pathRadius={2.6} speed={-0.9} color="#8B5CF6" label="Parcel" />
      </group>

      {/* Spatial Grid Pruning Wireframe Overlay */}
      <gridHelper
        args={[7, 14, '#FF5B35', '#242433']}
        position={[0, -0.98, 0]}
      />
    </group>
  );
};

const VehicleAnimation: React.FC<{ pathRadius: number; speed: number; color: string; label: string }> = ({
  pathRadius,
  speed,
  color,
}) => {
  const vRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (vRef.current) {
      const t = state.clock.elapsedTime * speed;
      vRef.current.position.x = Math.cos(t) * pathRadius;
      vRef.current.position.z = Math.sin(t) * pathRadius;
      vRef.current.position.y = -0.9;
      vRef.current.rotation.y = -t + Math.PI / 2;
    }
  });

  return (
    <mesh ref={vRef}>
      <boxGeometry args={[0.2, 0.09, 0.12]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
    </mesh>
  );
};

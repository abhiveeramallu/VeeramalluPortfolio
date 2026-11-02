import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { ComputerTerminal3D } from '../scenes/ComputerTerminal3D';
import { WebGLBoundary } from './WebGLBoundary';

export const Hero3D: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates (-1 to 1)
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="w-full h-[450px] sm:h-[550px] lg:h-[650px] relative">
      {/* Background ambient radial glow */}
      <div
        className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-40 mix-blend-screen"
        style={{
          background:
            'radial-gradient(circle at 60% 50%, rgba(255, 91, 53, 0.18) 0%, rgba(139, 92, 246, 0.12) 40%, transparent 70%)',
        }}
      />

      <WebGLBoundary fallbackTitle="Abhiram Terminal 3D Environment">
        <Canvas
          camera={{ position: [0, 0, 5.2], fov: 45 }}
          dpr={[1, 1.75]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <Suspense fallback={null}>
            <ComputerTerminal3D mousePos={mousePos} />
          </Suspense>
        </Canvas>
      </WebGLBoundary>

      {/* Futuristic Floating Telemetry Badges */}
      <div className="absolute bottom-4 right-4 hidden md:flex items-center space-x-3 px-3.5 py-1.5 rounded-lg border border-[#272733]/90 bg-[#14141c]/80 backdrop-blur-md text-[10px] font-mono text-[#A7A3AD]">
        <div className="flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-[#FF5B35] animate-ping" />
          <span className="text-[#F4F0E6] font-medium">TERMINAL READY</span>
        </div>
        <span className="text-[#272733]">|</span>
        <span>DRAG TO TILT</span>
      </div>
    </div>
  );
};

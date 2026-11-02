'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const DynamicHeroScene = dynamic(() => import('./HeroAvatarScene'), {
  ssr: false,
  loading: () => <StaticAvatarFallback />,
});

export const SceneWrapper: React.FC = () => {
  const [shouldRender3D, setShouldRender3D] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Check if device is low-power mobile or has coarse pointer with narrow width
    const isSmallMobile = window.innerWidth < 640 && window.matchMedia('(pointer: coarse)').matches;

    // Check basic WebGL support
    let hasWebGL = true;
    try {
      const canvas = document.createElement('canvas');
      hasWebGL = !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch {
      hasWebGL = false;
    }

    if (prefersReducedMotion || !hasWebGL) {
      setShouldRender3D(false);
    } else {
      setShouldRender3D(true);
    }
  }, []);

  if (shouldRender3D === null) {
    return <StaticAvatarFallback />;
  }

  if (!shouldRender3D) {
    return <StaticAvatarFallback />;
  }

  return (
    <div className="w-full h-full min-h-[380px] sm:min-h-[460px] lg:min-h-[520px]">
      <DynamicHeroScene />
    </div>
  );
};

export const StaticAvatarFallback: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[380px] sm:min-h-[460px] lg:min-h-[520px] flex items-center justify-center relative">
      <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
        {/* Soft pastel ambient aura */}
        <div className="absolute inset-0 rounded-full bg-soft-pink opacity-50 blur-2xl" />
        <div className="absolute w-44 h-44 rounded-full bg-soft-blue opacity-60 blur-xl" />

        {/* Tactile Stylized SVG Character */}
        <svg viewBox="0 0 200 200" className="w-56 h-56 sm:w-64 sm:h-64 relative z-10 filter drop-shadow-card">
          {/* Torso */}
          <rect x="50" y="115" width="100" height="75" rx="35" fill="#5B5BFF" />
          {/* Lime Collar */}
          <ellipse cx="100" cy="115" rx="42" ry="12" fill="#C6F432" stroke="#111111" strokeWidth="2" />
          {/* Head */}
          <circle cx="100" cy="72" r="48" fill="#FFAF94" stroke="#111111" strokeWidth="2.5" />
          {/* Eyes */}
          <rect x="82" y="66" width="6" height="12" rx="3" fill="#111111" />
          <rect x="112" y="66" width="6" height="12" rx="3" fill="#111111" />
          {/* Blush */}
          <circle cx="74" cy="78" r="8" fill="#FF5A1F" opacity="0.3" />
          <circle cx="126" cy="78" r="8" fill="#FF5A1F" opacity="0.3" />
          {/* Halo Ring */}
          <ellipse cx="100" cy="42" rx="60" ry="14" fill="none" stroke="#FF5A1F" strokeWidth="4" opacity="0.85" />
          {/* 3D Asterisk satellite */}
          <g transform="translate(160, 40) scale(0.6)">
            <line x1="0" y1="-18" x2="0" y2="18" stroke="#FF5A1F" strokeWidth="8" strokeLinecap="round" />
            <line x1="-15" y1="-9" x2="15" y2="9" stroke="#FF5A1F" strokeWidth="8" strokeLinecap="round" />
            <line x1="-15" y1="9" x2="15" y2="-9" stroke="#FF5A1F" strokeWidth="8" strokeLinecap="round" />
          </g>
        </svg>
      </div>
    </div>
  );
};

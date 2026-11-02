import React from 'react';

export const GrainOverlay: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-40 pointer-events-none grain-overlay opacity-30 mix-blend-multiply"
    />
  );
};

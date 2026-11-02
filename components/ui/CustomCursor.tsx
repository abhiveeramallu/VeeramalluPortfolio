'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'click' | 'text'>('default');
  const [cursorLabel, setCursorLabel] = useState<string>('');
  const [isTouch, setIsTouch] = useState(true);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 350, mass: 0.4 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Hide completely on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }
    setIsTouch(false);

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const onMouseDown = () => {
      setCursorType('click');
    };

    const onMouseUp = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('a, button, [role="button"], input, select, textarea')) {
        setCursorType('pointer');
      } else {
        setCursorType('default');
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const customLabel = target.closest('[data-cursor-label]')?.getAttribute('data-cursor-label');
      if (customLabel) {
        setCursorLabel(customLabel);
        setCursorType('pointer');
        return;
      }
      setCursorLabel('');

      if (target.closest('a, button, [role="button"], input, select, textarea, [data-cursor="pointer"]')) {
        setCursorType('pointer');
      } else {
        setCursorType('default');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, [mouseX, mouseY]);

  if (isTouch) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
      style={{
        x: cursorX,
        y: cursorY,
      }}
    >
      {cursorLabel ? (
        // Custom interactive label pill (e.g. "View project", "Play")
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.6, opacity: 0 }}
          className="px-3.5 py-1.5 rounded-full bg-accent text-white font-mono text-[11px] font-bold tracking-wider shadow-bloom whitespace-nowrap flex items-center space-x-1"
        >
          <span>{cursorLabel}</span>
          <span className="text-accent-3">↗</span>
        </motion.div>
      ) : cursorType === 'pointer' ? (
        // Playful-premium pointer SVG
        <motion.div
          animate={{ scale: 1.15 }}
          transition={{ type: 'spring', damping: 20, stiffness: 350 }}
          className="relative text-accent filter drop-shadow-md"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8.5 2V13.5L5.7 12.3C4.8 11.9 3.7 12.2 3.2 13.1C2.8 13.9 3 15 3.8 15.5L8.2 18.7C9.2 19.4 10.4 19.8 11.6 19.8H16.5C18.7 19.8 20.5 18 20.5 15.8V9.5C20.5 8.7 19.8 8 19 8C18.2 8 17.5 8.7 17.5 9.5V8.5C17.5 7.7 16.8 7 16 7C15.2 7 14.5 7.7 14.5 8.5V7.5C14.5 6.7 13.8 6 13 6C12.2 6 11.5 6.7 11.5 7.5V2C11.5 1.2 10.8 0.5 10 0.5C9.2 0.5 8.5 1.2 8.5 2Z"
              fill="#FF5A1F"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      ) : cursorType === 'click' ? (
        // Tactile Press Click Ripple
        <motion.div
          animate={{ scale: 0.8 }}
          className="w-5 h-5 rounded-full bg-accent border-2 border-white shadow-bloom"
        />
      ) : (
        // Default warm accent dot
        <motion.div
          animate={{ scale: 1 }}
          className="w-3.5 h-3.5 rounded-full bg-accent border-[1.5px] border-white shadow-sm"
        />
      )}
    </motion.div>
  );
};

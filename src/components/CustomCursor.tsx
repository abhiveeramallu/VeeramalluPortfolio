import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'text' | 'hidden'>('default');
  const [isTouch, setIsTouch] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if device supports fine pointer
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('[data-cursor]');
      if (interactive) {
        const text = interactive.getAttribute('data-cursor-text') || '';
        const variant = (interactive.getAttribute('data-cursor') || 'hover') as 'default' | 'hover' | 'text';
        setCursorText(text);
        setCursorVariant(variant);
      } else if (target.closest('a, button, input, textarea, select')) {
        setCursorText('');
        setCursorVariant('hover');
      } else {
        setCursorText('');
        setCursorVariant('default');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (isTouch) return null;

  return (
    <>
      {/* Outer Spring Follower */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center font-mono text-[10px] tracking-wider text-white font-bold"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        <motion.div
          className={`flex items-center justify-center rounded-full transition-all duration-200 ${
            cursorText
              ? 'bg-[#FF5B35] text-white px-3 py-1 shadow-lg shadow-[#FF5B35]/40 min-w-[70px] h-[28px]'
              : cursorVariant === 'hover'
              ? 'w-10 h-10 border-2 border-[#FF5B35] bg-[#FF5B35]/15 backdrop-blur-[1px]'
              : 'w-7 h-7 border border-[#F4F0E6]/40 bg-transparent'
          }`}
          animate={{
            scale: cursorVariant === 'hover' ? 1.25 : 1,
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        >
          {cursorText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="whitespace-nowrap"
            >
              {cursorText}
            </motion.span>
          )}
        </motion.div>
      </motion.div>

      {/* Center Precise Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 bg-[#FF5B35] rounded-full"
        style={{
          x: mouseX,
          y: mouseY,
        }}
        animate={{
          scale: cursorText ? 0 : 1,
          opacity: cursorVariant === 'hover' ? 0 : 1,
        }}
      />
    </>
  );
};

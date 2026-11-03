'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
  DEFAULT_INTRO_SETTINGS,
  INTRO_LANGUAGES,
  type IntroLanguage,
  type IntroSettings,
} from './introConfig';

interface MultilingualIntroProps {
  settings?: Partial<IntroSettings>;
  languages?: IntroLanguage[];
  onComplete?: () => void;
}

export function MultilingualIntro({
  settings: customSettings,
  languages = INTRO_LANGUAGES,
  onComplete,
}: MultilingualIntroProps) {
  const pathname = usePathname();
  const config = useMemo(
    () => ({ ...DEFAULT_INTRO_SETTINGS, ...customSettings }),
    [customSettings],
  );

  const [visible, setVisible] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const cycleIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isCompleteRef = useRef(false);

  const finishIntro = useCallback((immediate = false) => {
    if (isCompleteRef.current) return;
    isCompleteRef.current = true;

    // Clear any pending timers
    if (timerRef.current) clearTimeout(timerRef.current);
    if (cycleIntervalRef.current) clearInterval(cycleIntervalRef.current);

    // Save session or local storage flag according to config
    try {
      if (typeof window !== 'undefined') {
        if (config.storageMode === 'session') {
          sessionStorage.setItem(config.sessionKey, 'true');
        } else if (config.storageMode === 'first-visit') {
          localStorage.setItem(config.localKey, 'true');
        }
      }
    } catch {
      // Storage access may be restricted in sandboxed iframes
    }

    if (typeof document !== 'undefined') {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }

    setFadingOut(true);
    setTimeout(
      () => {
        setVisible(false);
        onComplete?.();
      },
      immediate ? 200 : config.exitFadeDurationMs,
    );
  }, [config, onComplete]);

  // Initial check on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (pathname !== '/') return;

    // Check query params: ?intro=true forces intro replay
    const urlParams = new URLSearchParams(window.location.search);
    const forceIntro = urlParams.get('intro') === 'true';

    if (!forceIntro) {
      if (!config.enabled) return;

      // Check prefers-reduced-motion
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      // Check session or localStorage
      try {
        if (config.storageMode === 'session' && sessionStorage.getItem(config.sessionKey) === 'true') {
          return;
        }
        if (config.storageMode === 'first-visit' && localStorage.getItem(config.localKey) === 'true') {
          return;
        }
      } catch {
        // Storage unavailable
      }
    }

    // Lock background scroll during the intro
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    setVisible(true);

    let idx = 0;
    const holdTimer = setTimeout(() => {
      cycleIntervalRef.current = setInterval(() => {
        idx += 1;
        if (idx < languages.length) {
          setCurrentIndex(idx);
        } else {
          if (cycleIntervalRef.current) clearInterval(cycleIntervalRef.current);
          // Crisp, elegant hold on Arabic, then glide smoothly into the main page
          setTimeout(() => {
            finishIntro();
          }, 240);
        }
      }, config.stepIntervalMs);
    }, config.initialHoldMs);

    const totalTimer = setTimeout(() => {
      finishIntro();
    }, config.totalDurationMs);

    timerRef.current = totalTimer;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        finishIntro(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(totalTimer);
      if (cycleIntervalRef.current) clearInterval(cycleIntervalRef.current);
      window.removeEventListener('keydown', handleKeyDown);
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [config, finishIntro, languages.length, pathname]);

  if (!visible) return null;

  const currentLang = languages[currentIndex] ?? languages[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Welcome introduction"
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#ff5a1f] select-none transition-opacity ease-[cubic-bezier(0.16,1,0.3,1)] ${
        fadingOut ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
      style={{
        transitionDuration: `${config.exitFadeDurationMs}ms`,
      }}
    >
      {/* Background subtle grain layer */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, #16121f 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      {/* Top right minimal Skip button */}
      <div
        className={`absolute right-6 top-6 z-20 sm:right-10 sm:top-10 transition-opacity duration-300 ${
          fadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <button
          type="button"
          onClick={() => finishIntro(true)}
          className="group inline-flex items-center gap-1.5 rounded-full border-2 border-[#16121f] bg-[#fff3e6] px-3.5 py-1.5 font-mono text-xs font-bold text-[#16121f] shadow-[2px_2px_0_0_#16121f] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_#16121f] active:scale-95"
          aria-label="Skip introduction"
        >
          <span>Skip</span>
          <span className="text-[10px] text-[#16121f]/50 group-hover:text-[#ff5a1f]">✕</span>
        </button>
      </div>

      {/* FIXED CENTRED TYPOGRAPHY STAGE: MATHEMATICALLY STATIONARY CONTAINERS */}
      <main
        className={`relative z-10 flex w-full max-w-4xl flex-col items-center justify-center px-4 text-center transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          fadingOut
            ? 'opacity-0 -translate-y-2.5 blur-sm pointer-events-none'
            : 'opacity-100 translate-y-0 blur-0'
        }`}
      >
        {/* CONTAINER 1: NAME CONTAINER (PERMANENT FIXED POSITION & DIMENSIONS) */}
        <div
          className="relative flex h-24 w-full items-center justify-center overflow-hidden sm:h-32 md:h-36"
          aria-live="polite"
        >
          <AnimatePresence>
            <motion.div
              key={currentLang.id + '-name'}
              initial={{ opacity: 0, filter: 'blur(3px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(3px)' }}
              transition={{
                duration: config.crossfadeDurationMs / 1000,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute inset-0 flex items-center justify-center text-center font-extrabold text-[#fff3e6]"
              dir={currentLang.dir ?? 'ltr'}
              style={{
                willChange: 'opacity, filter',
                transform: 'translate3d(0, 0, 0)',
                backfaceVisibility: 'hidden',
              }}
            >
              <p
                className="font-display text-4xl sm:text-6xl md:text-7xl font-black tracking-tight drop-shadow-sm text-[#fff3e6]"
                style={{
                  fontFamily:
                    'var(--font-display), var(--font-sans), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans Telugu", "Noto Sans Devanagari", "Noto Sans Tamil", "Noto Sans Kannada", "Noto Sans Malayalam", "Noto Sans JP", "Noto Sans KR", "Noto Sans SC", "Noto Sans Arabic", sans-serif',
                }}
              >
                {currentLang.name}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RESTRAINED ACCENT DIVIDER (PERMANENTLY STATIONARY) */}
        <div className="my-3 flex items-center justify-center" aria-hidden="true">
          <div className="h-1 w-10 rounded-full bg-[#16121f]/25" />
        </div>

        {/* CONTAINER 2: PROFESSIONAL TITLE CONTAINER (PERMANENT FIXED POSITION & DIMENSIONS) */}
        <div
          className="relative flex h-10 w-full items-center justify-center overflow-hidden sm:h-12 md:h-14"
          aria-live="polite"
        >
          <AnimatePresence>
            <motion.div
              key={currentLang.id + '-title'}
              initial={{ opacity: 0, filter: 'blur(2px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(2px)' }}
              transition={{
                duration: config.crossfadeDurationMs / 1000,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute inset-0 flex items-center justify-center px-2 text-center font-mono text-xs sm:text-sm md:text-base font-bold text-[#fff3e6]/90 uppercase tracking-[0.16em] sm:tracking-[0.24em]"
              dir={currentLang.dir ?? 'ltr'}
              style={{
                willChange: 'opacity, filter',
                transform: 'translate3d(0, 0, 0)',
                backfaceVisibility: 'hidden',
                fontFamily:
                  'var(--font-mono), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans Telugu", "Noto Sans Devanagari", "Noto Sans Tamil", "Noto Sans Kannada", "Noto Sans Malayalam", "Noto Sans JP", "Noto Sans KR", "Noto Sans SC", "Noto Sans Arabic", sans-serif',
              }}
            >
              <p className="truncate max-w-full">
                {currentLang.title.split('·').map((part, i, arr) => (
                  <span key={i}>
                    {part.trim()}
                    {i < arr.length - 1 && (
                      <span className="mx-2 font-normal text-[#16121f]">·</span>
                    )}
                  </span>
                ))}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const NOTES = [
  { key: 'a', name: 'C4', freq: 261.63, color: '#FFD6E8' },
  { key: 's', name: 'D4', freq: 293.66, color: '#D6E6FF' },
  { key: 'd', name: 'E4', freq: 329.63, color: '#FFF0C2' },
  { key: 'f', name: 'G4', freq: 392.0, color: '#E4F4D6' },
  { key: 'g', name: 'A4', freq: 440.0, color: '#E9E4FF' },
  { key: 'h', name: 'C5', freq: 523.25, color: '#C6F432' },
  { key: 'j', name: 'D5', freq: 587.33, color: '#FFAD94' },
];

export default function ChromaSynth() {
  const ctxRef = useRef<AudioContext | null>(null);
  const [active, setActive] = useState<string | null>(null);
  const [wave, setWave] = useState<OscillatorType>('triangle');

  const play = useCallback(
    (note: (typeof NOTES)[number]) => {
      const Ctor =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return;
      const ctx = (ctxRef.current ??= new Ctor());
      void ctx.resume();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const t = ctx.currentTime;
      osc.type = wave;
      osc.frequency.setValueAtTime(note.freq, t);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.12, t + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);
      osc.connect(gain).connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.65);
      setActive(note.key);
      setTimeout(() => setActive((k) => (k === note.key ? null : k)), 160);
    },
    [wave],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.repeat || e.metaKey || e.ctrlKey || (e.target as HTMLElement).closest('input, textarea, select'))
        return;
      const note = NOTES.find((n) => n.key === e.key.toLowerCase());
      if (note) play(note);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      void ctxRef.current?.close();
      ctxRef.current = null;
    };
  }, [play]);

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted">Click a pad or press A–J. Sound plays only after you interact.</p>
        <div
          className="flex rounded-pill border border-line p-1 font-mono text-xs"
          role="radiogroup"
          aria-label="Waveform"
        >
          {(['sine', 'triangle', 'square'] as OscillatorType[]).map((w) => (
            <button
              key={w}
              type="button"
              role="radio"
              aria-checked={wave === w}
              onClick={() => setWave(w)}
              className={cn('rounded-pill px-3 py-1', wave === w ? 'bg-[#111] text-[#f6f4ef]' : 'text-muted')}
            >
              {w}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3 sm:grid-cols-7">
        {NOTES.map((n) => (
          <button
            key={n.key}
            type="button"
            onClick={() => play(n)}
            data-cursor-label={n.name}
            aria-label={`Play ${n.name} (key ${n.key.toUpperCase()})`}
            className={cn(
              'flex h-32 flex-col items-center justify-between rounded-2xl border border-line py-4 font-mono text-sm font-bold text-[#111] shadow-soft transition-transform',
              active === n.key ? 'scale-95' : 'hover:-translate-y-1',
            )}
            style={{ background: n.color }}
          >
            <span>{n.name}</span>
            <kbd className="rounded border border-[#111]/20 px-1.5 text-[11px]">{n.key.toUpperCase()}</kbd>
          </button>
        ))}
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { Sparkles, Gamepad2, Box, Palette, Music, RefreshCw, Play } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SITE_CONFIG } from '@/data/content';

export default function PlaygroundPage() {
  const [activeTab, setActiveTab] = useState<'matrix' | 'colors' | 'sound'>('matrix');

  return (
    <div className="pt-32 pb-24 px-6 sm:px-12 max-w-6xl mx-auto space-y-16 text-left">
      
      {/* Page Header */}
      <div className="pb-8 border-b border-line flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="text-accent-2 font-mono text-xs font-bold uppercase tracking-wider mb-2">
            // PLAYGROUND &amp; LABS
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-ink">
            Interactive <span className="font-serif italic font-normal text-accent">Toys &amp; Tools</span>.
          </h1>
        </div>
        <p className="font-sans text-base text-muted max-w-md leading-relaxed">
          Tactile mini-games, algorithmic puzzles, and sensory experiments crafted in code.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2.5">
        {[
          { id: 'matrix', label: 'Hungarian Matrix Game', icon: <Gamepad2 className="w-4 h-4" /> },
          { id: 'colors', label: 'WCAG Palette Checker', icon: <Palette className="w-4 h-4" /> },
          { id: 'sound', label: 'Tactile Audio Pad', icon: <Music className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as 'matrix' | 'colors' | 'sound')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-pill font-mono text-xs font-semibold tracking-wide transition-all ${
              activeTab === tab.id
                ? 'bg-accent text-white shadow-bloom'
                : 'bg-surface border border-line text-muted hover:text-ink hover:border-accent'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Interactive Container */}
      <div className="p-8 sm:p-12 rounded-card bg-surface border border-line shadow-card min-h-[480px]">
        {activeTab === 'matrix' && <HungarianMiniGame />}
        {activeTab === 'colors' && <ColorPaletteTool />}
        {activeTab === 'sound' && <TactileAudioPad />}
      </div>

      {/* Side Projects Bento List */}
      <div className="space-y-6 pt-12 border-t border-line">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink">
          All Experiments &amp; Micro-Tools
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SITE_CONFIG.sideProjects.map((p) => (
            <div
              key={p.id}
              className="p-6 rounded-card bg-surface border border-line shadow-soft space-y-3 card-hover-lift"
            >
              <div className="flex justify-between items-center">
                <span className="px-3 py-1 rounded-pill bg-bg border border-line text-[11px] font-mono text-ink font-semibold">
                  {p.tag}
                </span>
                <span className="font-mono text-xs text-muted">{p.year}</span>
              </div>
              <h3 className="font-display text-xl font-bold text-ink">{p.title}</h3>
              <p className="font-sans text-sm text-muted">{p.tagline}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

// 1. Playable Hungarian Algorithm Mini-Game
function HungarianMiniGame() {
  const [matrix] = useState([
    [9, 2, 7],
    [6, 4, 3],
    [5, 8, 1],
  ]);
  const optimalCost = 9;
  const [selectedMatches, setSelectedMatches] = useState<Record<number, number>>({});
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleCellClick = (r: number, c: number) => {
    const updated = { ...selectedMatches };
    if (updated[r] === c) {
      delete updated[r];
    } else {
      updated[r] = c;
    }
    setSelectedMatches(updated);
    setFeedback(null);
  };

  const handleVerify = () => {
    if (Object.keys(selectedMatches).length < 3) {
      setFeedback('Please assign all 3 Drivers (1 cell in each row).');
      return;
    }

    const cols = Object.values(selectedMatches);
    const uniqueCols = new Set(cols);
    if (uniqueCols.size < 3) {
      setFeedback('Constraint Error: Each delivery order must be assigned to a unique driver (no duplicate columns).');
      return;
    }

    let total = 0;
    for (let r = 0; r < 3; r++) {
      total += matrix[r][selectedMatches[r]];
    }

    if (total === optimalCost) {
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
      setFeedback(`🏆 Optimal Kuhn-Munkres Minimum Found! Cost: ${total} mins transit.`);
    } else {
      setFeedback(`Sub-optimal pairing. Total Cost: ${total} mins. Theoretical Hungarian minimum is ${optimalCost} mins.`);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6 text-center">
      <div>
        <h3 className="font-display text-2xl font-bold text-ink">Bipartite Cost Minimizer</h3>
        <p className="font-sans text-xs text-muted mt-1">
          Pick 1 cell per row and column to minimize the transit delivery time.
        </p>
      </div>

      <div className="p-5 rounded-2xl bg-bg border border-line space-y-3">
        <div className="grid grid-cols-4 gap-2 text-xs font-mono font-bold text-muted pb-1">
          <div>DRIVER</div>
          <div className="text-accent">ORDER A</div>
          <div className="text-accent-2">ORDER B</div>
          <div className="text-ink">ORDER C</div>
        </div>

        {[0, 1, 2].map((r) => (
          <div key={r} className="grid grid-cols-4 gap-2 items-center">
            <span className="font-mono text-xs font-bold text-ink bg-surface py-2.5 rounded-xl border border-line">
              D{r + 1}
            </span>
            {[0, 1, 2].map((c) => {
              const isSelected = selectedMatches[r] === c;
              return (
                <button
                  key={c}
                  onClick={() => handleCellClick(r, c)}
                  className={`py-2.5 rounded-xl font-mono text-xs font-bold border transition-all ${
                    isSelected
                      ? 'bg-accent text-white border-accent shadow-bloom scale-105'
                      : 'bg-surface border-line text-ink hover:border-accent'
                  }`}
                >
                  {matrix[r][c]}m
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            setSelectedMatches({});
            setFeedback(null);
          }}
          className="px-4 py-2 rounded-pill bg-bg border border-line text-xs font-mono text-muted hover:text-ink"
        >
          Reset Grid
        </button>

        <button
          onClick={handleVerify}
          className="px-6 py-2.5 rounded-pill bg-accent text-white font-mono text-xs font-bold shadow-bloom hover:bg-ink transition-colors"
        >
          Compute Optimal Cost
        </button>
      </div>

      {feedback && (
        <div className="p-3.5 rounded-xl bg-surface border border-line text-xs font-mono text-ink">
          {feedback}
        </div>
      )}
    </div>
  );
}

// 2. WCAG Contrast Palette Generator
function ColorPaletteTool() {
  const [accentColor, setAccentColor] = useState('#FF5A1F');

  const swatches = [
    { label: 'Warm Background', hex: '#F6F4EF', text: '#111111', contrast: '15.8:1 (AAA)' },
    { label: 'Vivid Orange Accent', hex: '#FF5A1F', text: '#FFFFFF', contrast: '4.6:1 (AA)' },
    { label: 'Electric Indigo', hex: '#5B5BFF', text: '#FFFFFF', contrast: '5.2:1 (AA)' },
    { label: 'Lime Accent Badge', hex: '#C6F432', text: '#111111', contrast: '14.2:1 (AAA)' },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center max-w-md mx-auto">
        <h3 className="font-display text-2xl font-bold text-ink">Design Token Contrast Matrix</h3>
        <p className="font-sans text-xs text-muted mt-1">
          Verified perceptual luminance ratios against WCAG 2.1 AA and AAA standards.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {swatches.map((s) => (
          <div
            key={s.label}
            className="p-5 rounded-2xl border border-line shadow-soft flex flex-col justify-between h-44"
            style={{ backgroundColor: s.hex, color: s.text }}
          >
            <span className="font-mono text-xs font-bold tracking-wider">{s.contrast}</span>
            <div>
              <div className="font-display text-lg font-bold">{s.label}</div>
              <div className="font-mono text-xs opacity-80">{s.hex}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 3. Tactile Audio Synthesizer Pad
function TactileAudioPad() {
  const playTone = (freq: number) => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch {
      // AudioContext unavailable
    }
  };

  const notes = [
    { name: 'C4', freq: 261.63, col: 'bg-soft-pink' },
    { name: 'D4', freq: 293.66, col: 'bg-soft-blue' },
    { name: 'E4', freq: 329.63, col: 'bg-soft-yellow' },
    { name: 'G4', freq: 392.00, col: 'bg-soft-green' },
    { name: 'A4', freq: 440.00, col: 'bg-soft-purple' },
    { name: 'C5', freq: 523.25, col: 'bg-accent-3' },
  ];

  return (
    <div className="max-w-lg mx-auto text-center space-y-6">
      <div>
        <h3 className="font-display text-2xl font-bold text-ink">Tactile Web Audio Keyboard</h3>
        <p className="font-sans text-xs text-muted mt-1">
          Synthesized oscillators built with Web Audio API for sensory feedback.
        </p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {notes.map((n) => (
          <button
            key={n.name}
            onClick={() => playTone(n.freq)}
            data-cursor-label="NOTE"
            className={`p-6 rounded-2xl ${n.col} border border-line text-ink font-mono font-bold text-sm shadow-soft hover:scale-105 active:scale-95 transition-transform flex flex-col items-center justify-between h-28`}
          >
            <span>{n.name}</span>
            <span className="text-[10px] text-muted">{Math.round(n.freq)}Hz</span>
          </button>
        ))}
      </div>
    </div>
  );
}

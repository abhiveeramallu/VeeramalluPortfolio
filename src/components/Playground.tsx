import React, { useState, useRef, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Terminal as TerminalIcon, Sparkles, Box, Gamepad2, Play, RefreshCw, Send, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { InteractiveLab3D } from '../scenes/InteractiveLab3D';
import { soundManager } from '../utils/audio';

type PlaygroundTab = 'terminal' | 'ai' | 'lab3d' | 'game';

export const Playground: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PlaygroundTab>('terminal');

  return (
    <section id="playground" className="relative py-24 sm:py-32 bg-[#0d0d12] border-t border-[#272733] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-8 border-b border-[#272733]">
          <div>
            <div className="text-[#FF5B35] font-mono text-xs uppercase tracking-widest mb-3">
              // 04. EXPERIMENTAL PLAYGROUND
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#F4F0E6]">
              INTERACTIVE <span className="text-[#FF5B35]">LAB</span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 font-sans text-sm sm:text-base text-[#A7A3AD] max-w-md">
            Hands-on prototypes: query the embedded command terminal, inspect simulated AI attention vectors, tweak 3D shaders, or test your algorithmic intuition.
          </p>
        </div>

        {/* Tab Selection Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: 'terminal', name: 'Interactive Terminal', icon: <TerminalIcon className="w-4 h-4" /> },
            { id: 'ai', name: 'AI Attention Lab', icon: <Sparkles className="w-4 h-4" /> },
            { id: 'lab3d', name: '3D Geometry Lab', icon: <Box className="w-4 h-4" /> },
            { id: 'game', name: 'Hungarian Algo Puzzle', icon: <Gamepad2 className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                soundManager.playClick();
                setActiveTab(tab.id as PlaygroundTab);
              }}
              onMouseEnter={() => soundManager.playHover()}
              data-cursor="hover"
              data-cursor-text={tab.id.toUpperCase()}
              className={`flex items-center space-x-2 px-5 py-3 rounded-xl font-mono text-xs font-semibold tracking-wide transition-all ${
                activeTab === tab.id
                  ? 'bg-[#FF5B35] text-white shadow-lg shadow-[#FF5B35]/25 border-transparent'
                  : 'bg-[#14141c] text-[#A7A3AD] border border-[#272733] hover:text-[#F4F0E6] hover:border-[#FF5B35]/40'
              }`}
            >
              {tab.icon}
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Interactive Container */}
        <div className="rounded-3xl border border-[#272733] bg-[#121218] p-6 sm:p-8 min-h-[480px] shadow-2xl relative">
          {activeTab === 'terminal' && <TerminalExperiment />}
          {activeTab === 'ai' && <AIExperiment />}
          {activeTab === 'lab3d' && <Lab3DExperiment />}
          {activeTab === 'game' && <AlgoPuzzleExperiment />}
        </div>

      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/* 1. INTERACTIVE TERMINAL EXPERIMENT                                         */
/* -------------------------------------------------------------------------- */
const TerminalExperiment: React.FC = () => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<Array<{ command: string; response: string | React.ReactNode }>>([
    {
      command: 'init',
      response: 'Welcome to Abhiram OS Shell v2.7. Type "help" to list available commands.'
    }
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    soundManager.playKey();
    let res: string | React.ReactNode = '';

    switch (cmd) {
      case 'help':
        res = (
          <div className="space-y-1 text-[#A7A3AD]">
            <div>Available shell commands:</div>
            <div>  <span className="text-[#FF5B35]">help</span>     - Display command manual</div>
            <div>  <span className="text-[#FF5B35]">about</span>    - Executive dossier on Abhiram</div>
            <div>  <span className="text-[#FF5B35]">projects</span> - List flagship engineering projects</div>
            <div>  <span className="text-[#FF5B35]">skills</span>   - List technical competencies</div>
            <div>  <span className="text-[#FF5B35]">contact</span>  - Retrieve transmission frequencies</div>
            <div>  <span className="text-[#FF5B35]">clear</span>    - Wipe terminal screen buffer</div>
            <div>  <span className="text-[#8B5CF6]">matrix</span>   - Trigger cyber matrix pulse</div>
            <div>  <span className="text-[#C7D9B5]">easteregg</span>- Reveal classified telemetry</div>
          </div>
        );
        break;

      case 'about':
        res = 'Veeramallu Sai Abhiram — Computer Science undergraduate at VIT Vellore (Graduating 2027). Specializing in AI engineering, combinatorial algorithms (Hungarian matching), full-stack microservices, and bot defense telemetry.';
        break;

      case 'projects':
        res = (
          <div className="space-y-1">
            <div>1. <span className="text-[#FF5B35] font-bold">RouteFusion</span> - Ride & parcel Hungarian bipartite matching optimization.</div>
            <div>2. <span className="text-[#8B5CF6] font-bold">ThreatLensAI</span> - Gradient boosted bot & telemetry classifier.</div>
            <div>3. <span className="text-[#C7D9B5] font-bold">Smart Document Intelligence</span> - Local LLM (Ollama) & OCR extraction.</div>
            <div>4. <span className="text-[#FF5B35] font-bold">Greenhouse Micro-Climate</span> - GRU / BiLSTM recurrent forecasting.</div>
          </div>
        );
        break;

      case 'skills':
        res = 'Languages: Python, TypeScript, JavaScript, Java, C++, SQL | Frameworks: React, FastAPI, Node.js, Flask | AI/ML: Ollama, XGBoost, Scikit-learn, BiLSTM | Databases: PostgreSQL, SQLite';
        break;

      case 'contact':
        res = 'Email: Direct Transmission via Contact Section | GitHub: github.com/abhiveeramallu | LinkedIn: linkedin.com/in/abhiramveeramallu';
        break;

      case 'matrix':
        soundManager.playSuccess();
        res = 'Wake up, Neo... The Matrix has you. Follow the white rabbit: abhiram.dev';
        break;

      case 'easteregg':
        soundManager.playSuccess();
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
        res = '🎉 ACCESS GRANTED: 100% genuine code, zero synthetic fluff. Merit scholar at VIT Vellore.';
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        res = `Command not recognized: "${cmd}". Type "help" for a list of valid commands.`;
    }

    setHistory((prev) => [...prev, { command: inputVal, response: res }]);
    setInputVal('');
  };

  return (
    <div className="flex flex-col h-[400px] font-mono text-xs sm:text-sm">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#272733] text-[#A7A3AD]">
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-[#FF5B35]" />
          <span className="w-3 h-3 rounded-full bg-[#8B5CF6]" />
          <span className="w-3 h-3 rounded-full bg-[#C7D9B5]" />
          <span className="ml-2 text-xs font-semibold text-[#F4F0E6]">bash — abhiram@dev:~</span>
        </div>
        <span className="text-[11px] text-[#FF5B35]">SHELL ACTIVE</span>
      </div>

      {/* Terminal Output Stream */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-2 select-text">
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center text-[#FF5B35] font-bold">
              <span className="text-[#A7A3AD] mr-2">guest@abhiram.dev:~$</span>
              <span>{item.command}</span>
            </div>
            <div className="text-[#F4F0E6]/90 pl-4">{item.response}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Terminal Input Line */}
      <form onSubmit={handleCommand} className="pt-3 border-t border-[#272733] flex items-center space-x-2">
        <span className="text-[#FF5B35] font-bold shrink-0">guest@abhiram.dev:~$</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => {
            soundManager.playKey();
            setInputVal(e.target.value);
          }}
          placeholder="type 'help', 'projects', 'about'..."
          className="flex-1 bg-transparent text-[#F4F0E6] outline-none font-mono text-xs sm:text-sm placeholder:text-[#A7A3AD]/50"
          autoFocus
        />
        <button
          type="submit"
          className="px-3 py-1 bg-[#1c1c28] hover:bg-[#FF5B35] text-[#A7A3AD] hover:text-white rounded border border-[#272733] transition-colors"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 2. AI EXPERIMENT (TOKEN ATTENTION & VECTOR CLASSIFIER)                    */
/* -------------------------------------------------------------------------- */
const AIExperiment: React.FC = () => {
  const [promptText, setPromptText] = useState('Optimize multimodal ride-sharing with Hungarian bipartite matching');
  const [analyzed, setAnalyzed] = useState<{
    tokens: Array<{ word: string; weight: number }>;
    intent: string;
    confidence: number;
    latency: number;
  }>({
    tokens: [
      { word: 'Optimize', weight: 0.85 },
      { word: 'multimodal', weight: 0.92 },
      { word: 'ride-sharing', weight: 0.78 },
      { word: 'with', weight: 0.15 },
      { word: 'Hungarian', weight: 0.98 },
      { word: 'bipartite', weight: 0.95 },
      { word: 'matching', weight: 0.89 },
    ],
    intent: 'Algorithmic Optimization / Route Planning',
    confidence: 97.4,
    latency: 14
  });

  const analyzePrompt = (text: string) => {
    soundManager.playClick();
    const words = text.split(/\s+/).filter(Boolean);
    const tokens = words.map((w) => {
      const lower = w.toLowerCase();
      let weight = 0.2 + Math.random() * 0.4;
      if (['hungarian', 'bipartite', 'xgboost', 'fastapi', 'llm', 'security', 'bot', 'spatial', 'gru'].some(k => lower.includes(k))) {
        weight = 0.88 + Math.random() * 0.12;
      }
      return { word: w, weight: Number(weight.toFixed(2)) };
    });

    let intent = 'General Systems Query';
    if (text.toLowerCase().includes('bot') || text.toLowerCase().includes('threat') || text.toLowerCase().includes('security')) {
      intent = 'Cybersecurity Anomaly Classification';
    } else if (text.toLowerCase().includes('ride') || text.toLowerCase().includes('hungarian') || text.toLowerCase().includes('optimize')) {
      intent = 'Combinatorial Assignment & Logistics';
    } else if (text.toLowerCase().includes('document') || text.toLowerCase().includes('llm') || text.toLowerCase().includes('ocr')) {
      intent = 'Document Intelligence & Extraction';
    }

    setAnalyzed({
      tokens,
      intent,
      confidence: Number((94 + Math.random() * 5.8).toFixed(1)),
      latency: Math.floor(10 + Math.random() * 8)
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#272733] gap-2">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-[#FF5B35]" />
          <h3 className="font-display text-base font-bold text-[#F4F0E6]">
            Neural Token Attention &amp; Intent Classifier
          </h3>
        </div>
        <div className="font-mono text-xs text-[#A7A3AD]">
          INFERENCE: <span className="text-emerald-400 font-bold">{analyzed.latency}ms</span> | CONFIDENCE: <span className="text-[#FF5B35] font-bold">{analyzed.confidence}%</span>
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-wrap gap-2 text-xs font-mono">
        <span className="text-[#A7A3AD] self-center">Try Samples:</span>
        {[
          'Optimize multimodal ride-sharing with Hungarian bipartite matching',
          'Detect anomalous bot keystroke telemetry and bypass captcha',
          'Parse confidential PDF contracts with local Ollama 8B LLM'
        ].map((sample, i) => (
          <button
            key={i}
            onClick={() => {
              setPromptText(sample);
              analyzePrompt(sample);
            }}
            className="px-3 py-1.5 rounded-lg border border-[#272733] bg-[#161622] hover:border-[#FF5B35]/60 text-[#A7A3AD] hover:text-[#F4F0E6] transition-colors"
          >
            Sample #{i + 1}
          </button>
        ))}
      </div>

      {/* Custom Input */}
      <div className="flex items-center space-x-3">
        <input
          type="text"
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
          className="flex-1 px-4 py-3 rounded-xl border border-[#272733] bg-[#14141c] text-[#F4F0E6] font-mono text-xs sm:text-sm outline-none focus:border-[#FF5B35]"
          placeholder="Input custom telemetry or query..."
        />
        <button
          onClick={() => analyzePrompt(promptText)}
          className="px-5 py-3 rounded-xl bg-[#FF5B35] text-white font-mono text-xs font-bold hover:bg-[#ff4419] flex items-center space-x-2 shadow-md shadow-[#FF5B35]/25"
        >
          <Play className="w-4 h-4" />
          <span>Compute Attention</span>
        </button>
      </div>

      {/* Token Heatmap Visualization */}
      <div className="p-6 rounded-2xl border border-[#272733] bg-[#0f0f15] space-y-4">
        <div className="text-xs font-mono uppercase tracking-wider text-[#A7A3AD] flex items-center justify-between">
          <span>Self-Attention Token Magnitudes</span>
          <span className="text-[#FF5B35]">Identified: {analyzed.intent}</span>
        </div>

        <div className="flex flex-wrap gap-2.5 items-center">
          {analyzed.tokens.map((tok, i) => {
            const isHigh = tok.weight > 0.7;
            return (
              <div
                key={i}
                className="px-3 py-2 rounded-lg border transition-all text-xs font-mono flex items-center space-x-2"
                style={{
                  borderColor: isHigh ? '#FF5B35' : '#272733',
                  backgroundColor: isHigh ? 'rgba(255, 91, 53, 0.18)' : '#161622',
                  color: isHigh ? '#F4F0E6' : '#A7A3AD',
                }}
              >
                <span className="font-semibold">{tok.word}</span>
                <span className="text-[10px] opacity-70">[{tok.weight}]</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 3. 3D GEOMETRY LAB EXPERIMENT                                              */
/* -------------------------------------------------------------------------- */
const Lab3DExperiment: React.FC = () => {
  const [geometry, setGeometry] = useState<'knot' | 'icosahedron' | 'octahedron' | 'dodecahedron'>('knot');
  const [wireframe, setWireframe] = useState(true);
  const [speed, setSpeed] = useState(1.2);
  const [color, setColor] = useState('#FF5B35');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full">
      {/* 3D Canvas Viewport */}
      <div className="lg:col-span-7 h-[340px] sm:h-[380px] rounded-2xl border border-[#272733] bg-[#0c0c11] overflow-hidden relative">
        <Canvas camera={{ position: [0, 0, 4.2], fov: 45 }}>
          <Suspense fallback={null}>
            <InteractiveLab3D
              geometryType={geometry}
              wireframe={wireframe}
              speed={speed}
              color={color}
            />
          </Suspense>
        </Canvas>
        <div className="absolute bottom-3 left-3 text-[10px] font-mono text-[#A7A3AD] bg-[#101014]/80 px-2.5 py-1 rounded border border-[#272733]">
          WEBGL REALTIME SHADER
        </div>
      </div>

      {/* Controls Sidebar */}
      <div className="lg:col-span-5 space-y-6">
        <div>
          <h4 className="text-xs font-mono uppercase tracking-wider text-[#A7A3AD] mb-2.5">
            1. Select Polyhedron Geometry
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {(['knot', 'icosahedron', 'octahedron', 'dodecahedron'] as const).map((g) => (
              <button
                key={g}
                onClick={() => {
                  soundManager.playClick();
                  setGeometry(g);
                }}
                className={`py-2 px-3 rounded-lg border font-mono text-xs uppercase tracking-wide transition-colors ${
                  geometry === g
                    ? 'border-[#FF5B35] bg-[#FF5B35]/20 text-white font-bold'
                    : 'border-[#272733] bg-[#161622] text-[#A7A3AD] hover:text-[#F4F0E6]'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Wireframe & Speed */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#A7A3AD]">Wireframe Render</span>
            <button
              onClick={() => {
                soundManager.playClick();
                setWireframe(!wireframe);
              }}
              className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                wireframe ? 'bg-[#FF5B35] text-white' : 'bg-[#1e1e2c] text-[#A7A3AD]'
              }`}
            >
              {wireframe ? 'ON' : 'OFF'}
            </button>
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono text-[#A7A3AD] mb-1">
              <span>Rotation Velocity</span>
              <span>{speed.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="3"
              step="0.1"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-full accent-[#FF5B35] cursor-pointer"
            />
          </div>
        </div>

        {/* Color Palette */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-wider text-[#A7A3AD] mb-2.5">
            Atmospheric Color Glow
          </h4>
          <div className="flex space-x-3">
            {[
              { label: 'Orange', hex: '#FF5B35' },
              { label: 'Purple', hex: '#8B5CF6' },
              { label: 'Sage', hex: '#C7D9B5' },
              { label: 'White', hex: '#F4F0E6' },
            ].map((c) => (
              <button
                key={c.hex}
                onClick={() => {
                  soundManager.playClick();
                  setColor(c.hex);
                }}
                className="w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 flex items-center justify-center"
                style={{
                  backgroundColor: c.hex,
                  borderColor: color === c.hex ? '#F4F0E6' : 'transparent',
                }}
                title={c.label}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 4. MINI GAME (HUNGARIAN ALGORITHM BIPARTITE MATCHING PUZZLE)               */
/* -------------------------------------------------------------------------- */
const AlgoPuzzleExperiment: React.FC = () => {
  // A 3x3 Cost Matrix for matching 3 Drivers with 3 Deliveries
  // Goal: Pick 1 cell per row and column to minimize the total transit cost
  const [matrix] = useState([
    [9, 2, 7],
    [6, 4, 3],
    [5, 8, 1],
  ]);

  // Optimal Hungarian solution:
  // Row 0 -> Col 1 (Cost 2)
  // Row 1 -> Col 0 (Cost 6) or Row 1 -> Col 2 (Cost 3, but Row 2 Col 2 is 1)
  // Optimal: Row 0->Col 1 (2), Row 1->Col 0 (6), Row 2->Col 2 (1) => Total 9
  const optimalCost = 9;

  const [selectedMatches, setSelectedMatches] = useState<Record<number, number>>({});
  const [resultMessage, setResultMessage] = useState<string | null>(null);

  const handleCellClick = (row: number, col: number) => {
    soundManager.playKey();
    const updated = { ...selectedMatches };
    if (updated[row] === col) {
      delete updated[row];
    } else {
      updated[row] = col;
    }
    setSelectedMatches(updated);
    setResultMessage(null);
  };

  const verifySolution = () => {
    soundManager.playClick();
    if (Object.keys(selectedMatches).length < 3) {
      setResultMessage('Please select one assignment for each Driver (Row 1, 2, and 3).');
      return;
    }

    const cols = Object.values(selectedMatches);
    const uniqueCols = new Set(cols);
    if (uniqueCols.size < 3) {
      setResultMessage('Constraint Violation: Each delivery order must be assigned to a unique driver (no duplicate columns).');
      return;
    }

    let userCost = 0;
    for (let r = 0; r < 3; r++) {
      userCost += matrix[r][selectedMatches[r]];
    }

    if (userCost === optimalCost) {
      soundManager.playSuccess();
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.7 } });
      setResultMessage(`🏆 OPTIMAL MATCH ACHIEVED! Total Transit Cost: ${userCost} mins (Hungarian Minimum).`);
    } else {
      setResultMessage(`Sub-optimal solution. Your Cost: ${userCost} mins. The Hungarian theoretical minimum is ${optimalCost} mins.`);
    }
  };

  const resetPuzzle = () => {
    soundManager.playClick();
    setSelectedMatches({});
    setResultMessage(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#272733] gap-2">
        <div>
          <h3 className="font-display text-base font-bold text-[#F4F0E6]">
            Hungarian Bipartite Optimization Puzzle
          </h3>
          <p className="text-xs text-[#A7A3AD] font-mono mt-0.5">
            Connect 3 Drivers to 3 Delivery Packages with strictly 1 assignment per row &amp; column to minimize transit detour cost.
          </p>
        </div>

        <button
          onClick={resetPuzzle}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-[#272733] bg-[#161622] hover:border-[#FF5B35] text-xs font-mono text-[#A7A3AD] hover:text-[#F4F0E6] transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Grid</span>
        </button>
      </div>

      {/* The 3x3 Cost Matrix Table */}
      <div className="max-w-md mx-auto bg-[#0d0d12] border border-[#272733] p-4 rounded-2xl shadow-xl">
        <div className="grid grid-cols-4 gap-2 text-center font-mono text-xs mb-2">
          <div className="text-[#686571]">DRIVER \ ORDER</div>
          <div className="text-[#FF5B35] font-bold">PKG A</div>
          <div className="text-[#8B5CF6] font-bold">PKG B</div>
          <div className="text-[#C7D9B5] font-bold">PKG C</div>
        </div>

        {[0, 1, 2].map((row) => (
          <div key={row} className="grid grid-cols-4 gap-2 mb-2 items-center">
            <div className="font-mono text-xs font-bold text-[#F4F0E6] text-center bg-[#161622] py-3 rounded-lg border border-[#272733]">
              D{row + 1}
            </div>

            {[0, 1, 2].map((col) => {
              const isSelected = selectedMatches[row] === col;
              const val = matrix[row][col];
              return (
                <button
                  key={col}
                  onClick={() => handleCellClick(row, col)}
                  className={`py-3 rounded-lg font-mono text-sm font-bold border transition-all ${
                    isSelected
                      ? 'border-[#FF5B35] bg-[#FF5B35] text-white shadow-md shadow-[#FF5B35]/40 scale-105'
                      : 'border-[#272733] bg-[#14141c] text-[#A7A3AD] hover:border-[#FF5B35]/50 hover:text-[#F4F0E6]'
                  }`}
                >
                  {val}m
                </button>
              );
            })}
          </div>
        ))}

        <div className="mt-4 pt-3 border-t border-[#272733] flex items-center justify-between">
          <span className="text-xs font-mono text-[#A7A3AD]">
            Assigned: {Object.keys(selectedMatches).length}/3 Drivers
          </span>
          <button
            onClick={verifySolution}
            className="px-4 py-2 rounded-xl bg-[#FF5B35] hover:bg-[#ff4419] text-white font-mono text-xs font-bold transition-all shadow-md shadow-[#FF5B35]/25"
          >
            Compute Kuhn-Munkres Cost
          </button>
        </div>
      </div>

      {/* Result feedback */}
      {resultMessage && (
        <div className="p-4 rounded-xl border border-[#272733] bg-[#161622] text-xs font-mono text-center text-[#F4F0E6]">
          {resultMessage}
        </div>
      )}
    </div>
  );
};

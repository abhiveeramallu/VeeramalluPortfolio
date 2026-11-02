import React from 'react';
import { Terminal, Brain, ShieldCheck, Cpu, Code2, Sparkles, Award, GraduationCap } from 'lucide-react';
import { soundManager } from '../utils/audio';

export const About: React.FC = () => {
  return (
    <section id="about" className="relative py-24 sm:py-32 bg-[#0e0e13] border-t border-[#272733] overflow-hidden">
      {/* Background atmospheric gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#FF5B35]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 pb-8 border-b border-[#272733] flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <div className="text-[#FF5B35] font-mono text-xs uppercase tracking-widest mb-3">
              // 02. EDITORIAL DOSSIER
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#F4F0E6]">
              ENGINEERING <span className="text-[#FF5B35]">PERSPECTIVE</span>
            </h2>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-2 text-xs font-mono text-[#A7A3AD]">
            <GraduationCap className="w-4 h-4 text-[#8B5CF6]" />
            <span>VIT VELLORE • B.TECH CSE (2023 - 2027)</span>
          </div>
        </div>

        {/* Oversized Editorial Lead Statement */}
        <div className="mb-20">
          <p className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-[#F4F0E6] leading-tight max-w-5xl">
            "I operate at the convergence of <span className="text-[#FF5B35]">algorithmic rigor</span>, <span className="text-[#8B5CF6]">autonomous machine intelligence</span>, and <span className="text-[#C7D9B5]">expressive digital architecture</span>."
          </p>
        </div>

        {/* Two-Column Narrative & Systems Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Narrative Column */}
          <div className="lg:col-span-6 space-y-6 text-[#A7A3AD] font-sans text-base sm:text-lg leading-relaxed">
            <p>
              I am <span className="text-[#F4F0E6] font-semibold">Veeramallu Sai Abhiram</span>, a Computer Science student at <span className="text-[#F4F0E6] font-medium">Vellore Institute of Technology (VIT)</span> graduating in 2027. My work spans designing mathematical optimization engines, engineering localized LLM pipelines, and hardening real-time web services against automated adversarial bot telemetry.
            </p>
            <p>
              Rather than treating machine learning as an isolated black box, I architect complete ecosystems. From writing combinatorial matching algorithms in Python and FastAPI to fine-tuning gradient boosted classifiers and crafting interactive 3D WebGL interfaces, my goal is always clarity, determinism, and seamless user experiences.
            </p>
            <p>
              Whether it is formulating cost matrices via the Hungarian algorithm for multi-tenant logistics or orchestrating local Ollama models on consumer hardware, I thrive on taking complex computer science fundamentals and turning them into scalable real-world software.
            </p>

            {/* Quick Education / Credential Chips */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3.5 rounded-xl border border-[#272733] bg-[#161622] flex items-center space-x-3">
                <GraduationCap className="w-5 h-5 text-[#FF5B35] shrink-0" />
                <div>
                  <div className="text-[#F4F0E6] font-semibold">VIT Vellore</div>
                  <div className="text-[#A7A3AD] text-[11px]">B.Tech Computer Science (2027)</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-[#272733] bg-[#161622] flex items-center space-x-3">
                <Award className="w-5 h-5 text-[#8B5CF6] shrink-0" />
                <div>
                  <div className="text-[#F4F0E6] font-semibold">IBM Certified</div>
                  <div className="text-[#A7A3AD] text-[11px]">Generative AI Engineering</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Core Pillars Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div
              onMouseEnter={() => soundManager.playHover()}
              className="p-6 rounded-2xl border border-[#272733] bg-[#14141d] hover:border-[#FF5B35]/60 hover:bg-[#191924] transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#FF5B35]/15 border border-[#FF5B35]/30 flex items-center justify-center text-[#FF5B35] mb-4 group-hover:scale-110 transition-transform">
                  <Brain className="w-5 h-5" />
                </div>
                <h4 className="font-display text-lg font-bold text-[#F4F0E6] group-hover:text-[#FF5B35] transition-colors">
                  AI &amp; Machine Learning
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-[#A7A3AD] leading-relaxed">
                  Local LLM orchestration with Ollama, XGBoost gradient boosting classifiers, BiLSTM recurrent forecasting, and Retrieval-Augmented Generation (RAG).
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#272733]/60 text-[10px] font-mono text-[#FF5B35]">
                OLLAMA • XGBOOST • GRU/BiLSTM
              </div>
            </div>

            <div
              onMouseEnter={() => soundManager.playHover()}
              className="p-6 rounded-2xl border border-[#272733] bg-[#14141d] hover:border-[#8B5CF6]/60 hover:bg-[#191924] transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center text-[#8B5CF6] mb-4 group-hover:scale-110 transition-transform">
                  <Code2 className="w-5 h-5" />
                </div>
                <h4 className="font-display text-lg font-bold text-[#F4F0E6] group-hover:text-[#8B5CF6] transition-colors">
                  Full-Stack Architecture
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-[#A7A3AD] leading-relaxed">
                  Decoupled client-server architectures using React, TypeScript, FastAPI async services, and resilient PostgreSQL data models.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#272733]/60 text-[10px] font-mono text-[#8B5CF6]">
                REACT • FASTAPI • POSTGRESQL
              </div>
            </div>

            <div
              onMouseEnter={() => soundManager.playHover()}
              className="p-6 rounded-2xl border border-[#272733] bg-[#14141d] hover:border-[#C7D9B5]/60 hover:bg-[#191924] transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#C7D9B5]/15 border border-[#C7D9B5]/30 flex items-center justify-center text-[#C7D9B5] mb-4 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-display text-lg font-bold text-[#F4F0E6] group-hover:text-[#C7D9B5] transition-colors">
                  Cybersecurity &amp; Bot Defense
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-[#A7A3AD] leading-relaxed">
                  Client biometric behavioral telemetry extraction, anomaly scoring, request fingerprinting, and zero-CAPTCHA human validation.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#272733]/60 text-[10px] font-mono text-[#C7D9B5]">
                TELEMETRY • BOT DETECTION
              </div>
            </div>

            <div
              onMouseEnter={() => soundManager.playHover()}
              className="p-6 rounded-2xl border border-[#272733] bg-[#14141d] hover:border-[#FF5B35]/60 hover:bg-[#191924] transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#FF5B35]/15 border border-[#FF5B35]/30 flex items-center justify-center text-[#FF5B35] mb-4 group-hover:scale-110 transition-transform">
                  <Cpu className="w-5 h-5" />
                </div>
                <h4 className="font-display text-lg font-bold text-[#F4F0E6] group-hover:text-[#FF5B35] transition-colors">
                  Algorithmic Problem-Solving
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-[#A7A3AD] leading-relaxed">
                  Combinatorial optimization with Hungarian algorithms, spatial grid pruning, constrained pathfinding, and computational geometry.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#272733]/60 text-[10px] font-mono text-[#FF5B35]">
                HUNGARIAN • SPATIAL PRUNING
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

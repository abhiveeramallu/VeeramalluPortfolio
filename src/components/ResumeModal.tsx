import React, { useEffect } from 'react';
import { X, Printer, Download, ExternalLink, GraduationCap, Award, Code2, Mail, Github, Linkedin } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        soundManager.playClick();
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    soundManager.playClick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#101014]/90 backdrop-blur-xl transition-opacity animate-in fade-in"
        onClick={() => {
          soundManager.playClick();
          onClose();
        }}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#14141c] border border-[#272733] rounded-2xl shadow-2xl flex flex-col overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        
        {/* Top Control Bar */}
        <div className="px-6 py-4 border-b border-[#272733] bg-[#161622] flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5B35]" />
            <span className="font-mono text-xs font-bold text-[#F4F0E6] uppercase tracking-wider">
              CURRICULUM VITAE // VEERAMALLU SAI ABHIRAM
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrint}
              onMouseEnter={() => soundManager.playHover()}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-[#272733] bg-[#1a1a26] text-xs font-mono text-[#F4F0E6] hover:border-[#FF5B35] transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-[#FF5B35]" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="p-1.5 rounded-lg text-[#A7A3AD] hover:text-[#F4F0E6] hover:bg-[#22222d] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Document */}
        <div className="p-8 sm:p-10 overflow-y-auto font-sans text-[#F4F0E6] space-y-8 select-text bg-[#121218]">
          
          {/* Header */}
          <div className="border-b border-[#272733] pb-6">
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F4F0E6]">
              VEERAMALLU SAI ABHIRAM
            </h1>
            <p className="font-mono text-sm text-[#FF5B35] mt-1 font-medium">
              Computer Science Student | AI Engineer | Full-Stack Architect
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-mono text-[#A7A3AD]">
              <span>VIT Vellore, India</span>
              <span>•</span>
              <span className="text-[#F4F0E6]">abhiram.veeramallu@gmail.com</span>
              <span>•</span>
              <a href="https://github.com/abhiveeramallu" target="_blank" rel="noreferrer" className="hover:text-[#FF5B35] underline">
                github.com/abhiveeramallu
              </a>
              <span>•</span>
              <a href="https://linkedin.com/in/abhiramveeramallu" target="_blank" rel="noreferrer" className="hover:text-[#8B5CF6] underline">
                linkedin.com/in/abhiramveeramallu
              </a>
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-[#FF5B35] mb-3 flex items-center space-x-2">
              <GraduationCap className="w-4 h-4" />
              <span>Education</span>
            </h2>
            <div className="p-4 rounded-xl border border-[#272733] bg-[#161620] space-y-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <span className="font-bold text-base text-[#F4F0E6]">Vellore Institute of Technology (VIT)</span>
                <span className="font-mono text-xs text-[#A7A3AD]">2023 — 2027</span>
              </div>
              <div className="text-xs font-mono text-[#8B5CF6]">Bachelor of Technology in Computer Science and Engineering</div>
              <p className="text-xs text-[#A7A3AD] mt-2">
                Coursework: Data Structures &amp; Algorithms, Operating Systems, Database Management Systems, Computer Networks, Machine Learning, and Theory of Computation.
              </p>
            </div>
          </div>

          {/* Honors & Certifications */}
          <div>
            <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-[#FF5B35] mb-3 flex items-center space-x-2">
              <Award className="w-4 h-4" />
              <span>Honors &amp; Certifications</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl border border-[#272733] bg-[#161620]">
                <div className="font-bold text-sm text-[#F4F0E6]">VIT Merit Scholarship</div>
                <div className="text-xs font-mono text-[#FF5B35] mt-0.5">Vellore Institute of Technology</div>
                <p className="text-xs text-[#A7A3AD] mt-2">
                  Awarded institutional merit scholarship in recognition of exceptional competitive rank and academic excellence.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-[#272733] bg-[#161620]">
                <div className="font-bold text-sm text-[#F4F0E6]">IBM Generative AI Engineering</div>
                <div className="text-xs font-mono text-[#8B5CF6] mt-0.5">Professional Certification (IBM)</div>
                <p className="text-xs text-[#A7A3AD] mt-2">
                  Certified in Large Language Models, prompt engineering, RAG architecture, vector search, and model operationalization.
                </p>
              </div>
            </div>
          </div>

          {/* Technical Projects */}
          <div>
            <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-[#FF5B35] mb-3 flex items-center space-x-2">
              <Code2 className="w-4 h-4" />
              <span>Flagship Engineering Projects</span>
            </h2>

            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-[#272733] bg-[#161620] space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <span className="font-bold text-sm text-[#F4F0E6]">RouteFusion — Ride &amp; Parcel Optimization Platform</span>
                  <span className="font-mono text-xs text-[#FF5B35]">React, TypeScript, FastAPI, PostgreSQL, Hungarian Algo</span>
                </div>
                <p className="text-xs text-[#A7A3AD] leading-relaxed">
                  Engineered an intelligent multimodal platform optimizing ride and parcel assignments through Hungarian algorithm bipartite matching and spatial grid pruning to reduce empty vehicle miles.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-[#272733] bg-[#161620] space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <span className="font-bold text-sm text-[#F4F0E6]">ThreatLensAI — Bot Detection &amp; Threat Telemetry</span>
                  <span className="font-mono text-xs text-[#8B5CF6]">Node.js, Express, PostgreSQL, Python, XGBoost</span>
                </div>
                <p className="text-xs text-[#A7A3AD] leading-relaxed">
                  Architected real-time behavioral telemetry classifier trained on mouse curvature and request dynamics using XGBoost to identify malicious automation without human friction.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-[#272733] bg-[#161620] space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <span className="font-bold text-sm text-[#F4F0E6]">Smart Document Intelligence</span>
                  <span className="font-mono text-xs text-[#C7D9B5]">FastAPI, React, SQLite, Ollama</span>
                </div>
                <p className="text-xs text-[#A7A3AD] leading-relaxed">
                  Engineered on-premise document processing system parsing complex PDFs and DOCX files using local Ollama LLMs and OCR with zero data exfiltration.
                </p>
              </div>
            </div>
          </div>

          {/* Technical Skills Summary */}
          <div>
            <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-[#FF5B35] mb-2">
              Technical Competencies
            </h2>
            <div className="text-xs font-mono text-[#A7A3AD] space-y-1.5">
              <div><strong className="text-[#F4F0E6]">Languages:</strong> Python, Java, JavaScript, TypeScript, C++, SQL</div>
              <div><strong className="text-[#F4F0E6]">Frameworks:</strong> React, FastAPI, Flask, Node.js, Express</div>
              <div><strong className="text-[#F4F0E6]">AI &amp; ML:</strong> Ollama, Generative AI, Machine Learning, XGBoost, Scikit-learn, GRU, BiLSTM</div>
              <div><strong className="text-[#F4F0E6]">Databases &amp; Tools:</strong> PostgreSQL, MySQL, SQLite, Git, GitHub, Docker, Three.js, VS Code</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

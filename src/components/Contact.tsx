import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ArrowUpRight, Mail, Copy, Check, Github, Linkedin, FileText, Send, Sparkles } from 'lucide-react';
import { ContactMesh3D } from '../scenes/ContactMesh3D';
import { soundManager } from '../utils/audio';

interface ContactProps {
  onOpenResume: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenResume }) => {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const contactEmail = 'abhiram.veeramallu@gmail.com';

  const copyEmail = () => {
    soundManager.playSuccess();
    navigator.clipboard.writeText(contactEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.email || !formState.message) return;
    soundManager.playSuccess();
    setSubmitted(true);
    // Construct mailto link
    const mailto = `mailto:${contactEmail}?subject=Portfolio Transmission from ${encodeURIComponent(
      formState.name || 'Collaborator'
    )}&body=${encodeURIComponent(formState.message)}`;
    window.location.href = mailto;
  };

  return (
    <section id="contact" className="relative py-28 sm:py-36 bg-[#0a0a0e] border-t border-[#272733] overflow-hidden cyber-grid">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -right-24 w-[600px] h-[600px] bg-[#FF5B35]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-[#8B5CF6]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-[#FF5B35] font-mono text-xs uppercase tracking-widest mb-6">
          // 06. SECURE TRANSMISSION
        </div>

        {/* Dramatic Typography & 3D Interactive Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mb-16">
          
          {/* Massive Typography: LET'S BUILD SOMETHING TOGETHER. */}
          <div className="lg:col-span-7">
            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-[#F4F0E6] leading-[0.92]">
              LET'S BUILD<br />
              <span className="text-[#FF5B35]">SOMETHING</span><br />
              TOGETHER<span className="text-[#8B5CF6]">.</span>
            </h2>

            <p className="mt-8 text-base sm:text-lg text-[#A7A3AD] font-sans max-w-xl leading-relaxed">
              Whether you are looking for an AI Engineer, a full-stack developer who understands algorithmic systems, or an energetic collaborator for cutting-edge projects — my inbox is always open.
            </p>

            {/* Quick Email Copy Pill */}
            <div className="mt-8 inline-flex items-center space-x-3 p-2 pl-4 rounded-xl border border-[#272733] bg-[#14141c] text-xs font-mono">
              <Mail className="w-4 h-4 text-[#FF5B35]" />
              <span className="text-[#F4F0E6] select-all">{contactEmail}</span>
              <button
                onClick={copyEmail}
                onMouseEnter={() => soundManager.playHover()}
                data-cursor="hover"
                data-cursor-text="COPY"
                className="px-3 py-1.5 rounded-lg bg-[#222230] hover:bg-[#FF5B35] text-white transition-colors flex items-center space-x-1"
                title="Copy email to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Large 3D Geometric Element */}
          <div className="lg:col-span-5 h-[340px] sm:h-[420px] rounded-3xl border border-[#272733] bg-[#0f0f15]/80 overflow-hidden relative shadow-2xl flex items-center justify-center">
            <Canvas
              camera={{ position: [0, 0, 4.2], fov: 45 }}
              dpr={[1, 1.8]}
              gl={{ antialias: true, alpha: true }}
            >
              <Suspense fallback={null}>
                <ContactMesh3D />
              </Suspense>
            </Canvas>

            <div className="absolute bottom-3 right-3 text-[10px] font-mono text-[#A7A3AD] bg-[#101014]/90 px-3 py-1 rounded-md border border-[#272733]">
              NEURAL TRANSMITTER ONLINE
            </div>
          </div>

        </div>

        {/* Contact Form & Channels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 border-t border-[#272733]">
          
          {/* Direct Message Transmission Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl border border-[#272733] bg-[#14141c]/90 shadow-xl">
            <h3 className="font-display text-xl font-bold text-[#F4F0E6] mb-6 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#FF5B35]" />
              <span>Direct Transmission Dispatch</span>
            </h3>

            {submitted ? (
              <div className="p-6 rounded-xl border border-emerald-500/40 bg-emerald-950/20 text-center space-y-2">
                <Check className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="font-display text-lg font-bold text-[#F4F0E6]">Transmission Prepared</h4>
                <p className="text-xs font-mono text-[#A7A3AD]">
                  Opening your default mail client with your compiled message. You can also reach me directly at {contactEmail}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#A7A3AD] mb-1.5">
                      Your Name / Organization
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Jane Doe or Acme Corp"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#272733] bg-[#181824] text-[#F4F0E6] font-mono text-xs outline-none focus:border-[#FF5B35] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#A7A3AD] mb-1.5">
                      Your Email Frequency
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#272733] bg-[#181824] text-[#F4F0E6] font-mono text-xs outline-none focus:border-[#FF5B35] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#A7A3AD] mb-1.5">
                    Project Brief or Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Describe your project, role, or collaboration vision..."
                    className="w-full px-4 py-2.5 rounded-xl border border-[#272733] bg-[#181824] text-[#F4F0E6] font-mono text-xs outline-none focus:border-[#FF5B35] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  onMouseEnter={() => soundManager.playHover()}
                  data-cursor="hover"
                  data-cursor-text="DISPATCH"
                  className="w-full py-3.5 rounded-xl bg-[#FF5B35] hover:bg-[#ff4419] text-white font-mono text-xs font-bold tracking-wider flex items-center justify-center space-x-2 shadow-lg shadow-[#FF5B35]/30 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Dispatch Transmission</span>
                </button>
              </form>
            )}
          </div>

          {/* Social Channels & Resume Tile */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            {/* GitHub Card */}
            <a
              href="https://github.com/abhiveeramallu"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => soundManager.playHover()}
              data-cursor="hover"
              data-cursor-text="OPEN"
              className="p-5 rounded-2xl border border-[#272733] bg-[#14141c] hover:border-[#FF5B35] hover:bg-[#181824] transition-all flex items-center justify-between group"
            >
              <div className="flex items-center space-x-3.5">
                <div className="p-3 rounded-xl bg-[#1d1d2b] text-[#FF5B35] group-hover:scale-110 transition-transform">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-display text-base font-bold text-[#F4F0E6]">GitHub</div>
                  <div className="font-mono text-xs text-[#A7A3AD]">@abhiveeramallu</div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#A7A3AD] group-hover:text-[#FF5B35] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>

            {/* LinkedIn Card */}
            <a
              href="https://linkedin.com/in/abhiramveeramallu"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => soundManager.playHover()}
              data-cursor="hover"
              data-cursor-text="CONNECT"
              className="p-5 rounded-2xl border border-[#272733] bg-[#14141c] hover:border-[#8B5CF6] hover:bg-[#181824] transition-all flex items-center justify-between group"
            >
              <div className="flex items-center space-x-3.5">
                <div className="p-3 rounded-xl bg-[#1d1d2b] text-[#8B5CF6] group-hover:scale-110 transition-transform">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-display text-base font-bold text-[#F4F0E6]">LinkedIn</div>
                  <div className="font-mono text-xs text-[#A7A3AD]">Veeramallu Sai Abhiram</div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#A7A3AD] group-hover:text-[#8B5CF6] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>

            {/* Curriculum Vitae / Resume Card */}
            <div
              onClick={() => {
                soundManager.playClick();
                onOpenResume();
              }}
              onMouseEnter={() => soundManager.playHover()}
              data-cursor="hover"
              data-cursor-text="VIEW"
              className="p-5 rounded-2xl border border-[#272733] bg-[#14141c] hover:border-[#C7D9B5] hover:bg-[#181824] transition-all flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center space-x-3.5">
                <div className="p-3 rounded-xl bg-[#1d1d2b] text-[#C7D9B5] group-hover:scale-110 transition-transform">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-display text-base font-bold text-[#F4F0E6]">Verified Resume</div>
                  <div className="font-mono text-xs text-[#A7A3AD]">View Education &amp; Credentials</div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#A7A3AD] group-hover:text-[#C7D9B5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

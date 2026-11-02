import React from 'react';
import { GraduationCap, Award, CheckCircle2, Calendar, Sparkles } from 'lucide-react';
import { achievementsData } from '../data/experience';
import { soundManager } from '../utils/audio';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="relative py-24 sm:py-32 bg-[#101014] border-t border-[#272733] cyber-grid">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-[#272733]">
          <div>
            <div className="text-[#FF5B35] font-mono text-xs uppercase tracking-widest mb-3">
              // 05. ACADEMIC &amp; ENGINEERING RECORD
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#F4F0E6]">
              JOURNEY &amp; <span className="text-[#FF5B35]">CREDENTIALS</span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 font-sans text-sm sm:text-base text-[#A7A3AD] max-w-md">
            Verified academic excellence, specialized engineering certifications, and high-impact open-source systems development.
          </p>
        </div>

        {/* Visual Editorial Timeline */}
        <div className="relative border-l border-[#272733] ml-4 sm:ml-8 space-y-12">
          {achievementsData.map((item, index) => {
            const isEdu = item.type === 'Education';
            const isAward = item.type === 'Award';

            return (
              <div
                key={item.id}
                onMouseEnter={() => soundManager.playHover()}
                className="relative pl-8 sm:pl-12 group"
              >
                {/* Node on vertical timeline bar */}
                <div className={`absolute -left-[17px] top-1.5 w-8 h-8 rounded-full border-2 bg-[#101014] flex items-center justify-center transition-transform group-hover:scale-125 duration-300 ${
                  isEdu
                    ? 'border-[#FF5B35] text-[#FF5B35]'
                    : isAward
                    ? 'border-[#8B5CF6] text-[#8B5CF6]'
                    : 'border-[#C7D9B5] text-[#C7D9B5]'
                }`}>
                  {isEdu ? (
                    <GraduationCap className="w-4 h-4" />
                  ) : isAward ? (
                    <Award className="w-4 h-4" />
                  ) : (
                    <Sparkles className="w-4 h-4" />
                  )}
                </div>

                {/* Timeline Content Card */}
                <div className="p-6 sm:p-8 rounded-2xl border border-[#272733] bg-[#14141c]/90 group-hover:border-[#FF5B35]/50 group-hover:bg-[#181822] transition-all duration-300 shadow-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-xs text-[#FF5B35] font-bold tracking-wider flex items-center space-x-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.year}</span>
                    </span>

                    <div className="flex items-center space-x-2">
                      <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full border border-[#272733] bg-[#1a1a26] text-[#A7A3AD]">
                        {item.type}
                      </span>
                      {item.verified && (
                        <span className="text-[10px] font-mono text-emerald-400 flex items-center space-x-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>VERIFIED</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F4F0E6] group-hover:text-[#FF5B35] transition-colors">
                    {item.title}
                  </h3>

                  <div className="text-xs sm:text-sm font-mono text-[#8B5CF6] mt-1 font-medium">
                    {item.organization}
                  </div>

                  <p className="mt-4 text-sm text-[#A7A3AD] leading-relaxed">
                    {item.description}
                  </p>

                  {/* Tags */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono px-2.5 py-1 rounded bg-[#101015] border border-[#272733] text-[#A7A3AD]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

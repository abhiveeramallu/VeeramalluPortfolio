import React, { useState } from 'react';
import { skillsData, skillCategories, SkillItem } from '../data/skills';
import { soundManager } from '../utils/audio';
import { 
  Terminal, Code, FileCode, Cpu, Binary, Database, 
  Layers, Zap, Server, Flame, Bot, Sparkles, Brain, 
  TrendingUp, Table, HardDrive, GitBranch, Box, Laptop, Eye 
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Terminal: <Terminal className="w-5 h-5" />,
  Code: <Code className="w-5 h-5" />,
  FileCode: <FileCode className="w-5 h-5" />,
  Cpu: <Cpu className="w-5 h-5" />,
  Binary: <Binary className="w-5 h-5" />,
  Database: <Database className="w-5 h-5" />,
  Layers: <Layers className="w-5 h-5" />,
  Zap: <Zap className="w-5 h-5" />,
  Server: <Server className="w-5 h-5" />,
  Flame: <Flame className="w-5 h-5" />,
  Bot: <Bot className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  Brain: <Brain className="w-5 h-5" />,
  TrendingUp: <TrendingUp className="w-5 h-5" />,
  Table: <Table className="w-5 h-5" />,
  HardDrive: <HardDrive className="w-5 h-5" />,
  GitBranch: <GitBranch className="w-5 h-5" />,
  Box: <Box className="w-5 h-5" />,
  Laptop: <Laptop className="w-5 h-5" />,
  Eye: <Eye className="w-5 h-5" />,
};

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedSkill, setSelectedSkill] = useState<SkillItem>(skillsData[0]);

  const filteredSkills = activeCategory === 'All'
    ? skillsData
    : skillsData.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="relative py-24 sm:py-32 bg-[#101014] border-t border-[#272733] cyber-grid">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-8 border-b border-[#272733]">
          <div>
            <div className="text-[#FF5B35] font-mono text-xs uppercase tracking-widest mb-3">
              // 03. TECHNICAL CAPABILITIES
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#F4F0E6]">
              ENGINEERING <span className="text-[#FF5B35]">ARSENAL</span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 font-sans text-sm sm:text-base text-[#A7A3AD] max-w-md">
            Production-tested technologies across high-concurrency backend services, deep learning pipelines, and creative interactive computing.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {skillCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundManager.playClick();
                setActiveCategory(cat);
              }}
              onMouseEnter={() => soundManager.playHover()}
              data-cursor="hover"
              data-cursor-text={cat.toUpperCase()}
              className={`px-4 py-2 rounded-xl font-mono text-xs font-semibold tracking-wide transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-[#FF5B35] text-white shadow-lg shadow-[#FF5B35]/25 border-transparent'
                  : 'bg-[#161622] text-[#A7A3AD] border border-[#272733] hover:text-[#F4F0E6] hover:border-[#FF5B35]/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid of Interactive Skill Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {filteredSkills.map((skill) => {
            const isSelected = selectedSkill.name === skill.name;
            return (
              <div
                key={skill.name}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedSkill(skill);
                }}
                onMouseEnter={() => {
                  soundManager.playHover();
                  setSelectedSkill(skill);
                }}
                data-cursor="hover"
                data-cursor-text={skill.name.toUpperCase()}
                className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col justify-between group ${
                  isSelected
                    ? 'border-[#FF5B35] bg-[#1a1824] shadow-lg shadow-[#FF5B35]/15 scale-[1.02]'
                    : 'border-[#272733] bg-[#14141c] hover:border-[#FF5B35]/50 hover:bg-[#181822]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-lg border transition-colors ${
                      isSelected
                        ? 'bg-[#FF5B35]/20 border-[#FF5B35] text-[#FF5B35]'
                        : 'bg-[#1c1c28] border-[#272733] text-[#A7A3AD] group-hover:text-[#FF5B35]'
                    }`}>
                      {iconMap[skill.iconName] || <Code className="w-5 h-5" />}
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-[#272733] bg-[#121218] text-[#A7A3AD]">
                      {skill.tag}
                    </span>
                  </div>

                  <h4 className="font-display text-sm sm:text-base font-bold text-[#F4F0E6] group-hover:text-[#FF5B35] transition-colors">
                    {skill.name}
                  </h4>
                </div>

                <div className="mt-3 pt-2 border-t border-[#272733]/50 flex items-center justify-between text-[10px] font-mono text-[#686571]">
                  <span>{skill.category}</span>
                  <span className="text-[#FF5B35]">●</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Skill Telemetry Inspector Box */}
        {selectedSkill && (
          <div className="mt-8 p-5 sm:p-6 rounded-2xl border border-[#FF5B35]/30 bg-[#161622]/90 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-[#FF5B35]/15 border border-[#FF5B35]/40 text-[#FF5B35]">
                {iconMap[selectedSkill.iconName] || <Terminal className="w-6 h-6" />}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-display text-lg font-bold text-[#F4F0E6]">{selectedSkill.name}</span>
                  <span className="font-mono text-xs text-[#FF5B35] px-2 py-0.5 rounded bg-[#FF5B35]/10 border border-[#FF5B35]/30">
                    {selectedSkill.category}
                  </span>
                </div>
                <p className="mt-1 text-sm text-[#A7A3AD] font-sans">
                  {selectedSkill.description}
                </p>
              </div>
            </div>

            <div className="font-mono text-xs text-[#A7A3AD] shrink-0 border-t sm:border-t-0 sm:border-l border-[#272733] pt-3 sm:pt-0 sm:pl-6">
              <span className="text-[#FF5B35]">STATUS:</span> PRODUCTION READY
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

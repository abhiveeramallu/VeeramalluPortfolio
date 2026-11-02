import React from 'react';

const MARQUEE_ITEMS = [
  'INTELLIGENT SYSTEMS',
  'HUNGARIAN ALGORITHM',
  'XGBOOST THREAT ANALYSIS',
  'LOCAL LLM ORCHESTRATION',
  'VIT VELLORE CS',
  'SPATIAL PRUNING',
  'FASTAPI MICROSERVICES',
  'CREATIVE TECHNOLOGY',
  'RECURRENT FORECASTING',
];

export const Marquee: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden border-y border-[#272733] bg-[#14141a]/60 py-3 select-none">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
          <div key={idx} className="flex items-center space-x-6 mx-4">
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-[#A7A3AD]/90 hover:text-[#FF5B35] transition-colors">
              {item}
            </span>
            <span className="text-[#FF5B35] text-xs">◆</span>
          </div>
        ))}
      </div>
    </div>
  );
};

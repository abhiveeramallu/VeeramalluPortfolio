import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { soundManager } from '../utils/audio';

export const SoundToggle: React.FC = () => {
  const [muted, setMuted] = useState(soundManager.getIsMuted());

  const handleToggle = () => {
    const next = soundManager.toggleMute();
    setMuted(next);
    if (!next) {
      soundManager.playSuccess();
    }
  };

  return (
    <button
      onClick={handleToggle}
      onMouseEnter={() => soundManager.playHover()}
      data-cursor="hover"
      data-cursor-text={muted ? 'UNMUTE' : 'MUTE'}
      className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-full border border-[#272733] bg-[#16161c]/80 hover:border-[#FF5B35]/60 hover:bg-[#1a1a24] text-[#A7A3AD] hover:text-[#F4F0E6] transition-all duration-200 text-xs font-mono"
      title={muted ? 'Enable sound effects' : 'Mute sound effects'}
      aria-label="Toggle Sound Effects"
    >
      {muted ? (
        <>
          <VolumeX className="w-3.5 h-3.5 text-[#A7A3AD]" />
          <span className="hidden sm:inline text-[11px]">SFX OFF</span>
        </>
      ) : (
        <>
          <Volume2 className="w-3.5 h-3.5 text-[#FF5B35] animate-pulse" />
          <span className="hidden sm:inline text-[11px] text-[#FF5B35]">SFX ON</span>
        </>
      )}
    </button>
  );
};

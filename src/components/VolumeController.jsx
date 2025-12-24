import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function VolumeController({ audioRef }) {
  const [volume, setVolume] = useState(0.5); // Começa em 50%
  const [isMuted, setIsMuted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      const newMutedState = !isMuted;
      setIsMuted(newMutedState);
      audioRef.current.muted = newMutedState;
    }
  };

  return (
    <div 
      className="fixed bottom-4 right-4 z-[9999] flex items-center gap-2 bg-black/60 backdrop-blur-md p-3 rounded-full border border-white/10 transition-all duration-300 hover:bg-black/80"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slider deslizante */}
      <div className={`overflow-hidden transition-all duration-300 ${isHovered ? 'w-24 opacity-100 mr-2' : 'w-0 opacity-0'}`}>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-red-600"
        />
      </div>

      <button 
        onClick={toggleMute}
        className="text-white hover:text-red-400 transition-colors"
        title={isMuted ? "Ativar Som" : "Mutar"}
      >
        {isMuted || volume === 0 ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>
    </div>
  );
}
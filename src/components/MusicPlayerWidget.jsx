import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, 
  Music, Minimize2, Maximize2 
} from 'lucide-react';

export default function MusicPlayerWidget({ playlist, audioRef, initialIsPlaying }) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(initialIsPlaying);
  const [isMinimized, setIsMinimized] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  // Formatar tempo (0:00)
  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    const audio = audioRef.current;

    // Atualiza estados quando o áudio toca
    const updateProgress = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration);
    };

    // Toca a próxima música automaticamente
    const handleEnded = () => {
      handleNext();
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', updateProgress);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrackIndex]); // Re-bind se mudar a faixa

  // Tocar / Pausar
  const togglePlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Mudar Volume
  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    audioRef.current.volume = newVol;
  };

  // Mudar Progresso (clique na barra)
  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setProgress(newTime);
  };

  // Próxima Música
  const handleNext = () => {
    let nextIndex = (currentTrackIndex + 1) % playlist.length;
    changeTrack(nextIndex);
  };

  // Música Anterior
  const handlePrev = () => {
    let prevIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    changeTrack(prevIndex);
  };

  // Função auxiliar para trocar a faixa
  const changeTrack = (index) => {
    setCurrentTrackIndex(index);
    audioRef.current.src = playlist[index].src;
    audioRef.current.load();
    if (isPlaying) {
      audioRef.current.play().catch(e => console.log(e));
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className={`fixed bottom-4 right-4 z-[99999] bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-500 ease-in-out overflow-hidden
        ${isMinimized ? 'w-14 h-14 rounded-full flex items-center justify-center cursor-pointer hover:bg-black/60' : 'w-[320px] rounded-2xl p-4'}
      `}
    >
      <AnimatePresence mode="wait">
        {isMinimized ? (
          // --- MODO MINIMIZADO ---
          <motion.div
            key="minimized"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => setIsMinimized(false)}
            className="relative w-full h-full flex items-center justify-center group"
          >
            {/* Visualizer animado fake */}
            <div className="absolute inset-0 flex items-center justify-center gap-1 opacity-50">
              {[1,2,3].map(i => (
                <motion.div 
                  key={i}
                  animate={{ height: [4, 12, 4] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                  className="w-1 bg-green-400 rounded-full"
                />
              ))}
            </div>
            <Music size={20} className="text-white relative z-10" />
          </motion.div>
        ) : (
          // --- MODO COMPLETO ---
          <motion.div
            key="expanded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-3"
          >
            {/* Cabeçalho */}
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                {/* Capa do Álbum (Animada) */}
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-red-600 to-green-700 flex items-center justify-center shadow-inner ${isPlaying ? 'animate-pulse' : ''}`}>
                  <Music className="text-white/80" size={24} />
                </div>
                <div className="overflow-hidden">
                  <h3 className="text-white text-sm font-bold truncate max-w-[150px]">{playlist[currentTrackIndex].title}</h3>
                  <p className="text-white/60 text-xs truncate max-w-[150px]">{playlist[currentTrackIndex].artist}</p>
                </div>
              </div>
              <button onClick={() => setIsMinimized(true)} className="text-white/50 hover:text-white transition-colors">
                <Minimize2 size={18} />
              </button>
            </div>

            {/* Barra de Progresso */}
            <div className="space-y-1">
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={progress}
                onChange={handleProgressChange}
                className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-green-500 hover:h-2 transition-all"
              />
              <div className="flex justify-between text-[10px] text-white/50 font-mono">
                <span>{formatTime(progress)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controles Principais */}
            <div className="flex justify-between items-center px-2">
              <button onClick={handlePrev} className="text-white/70 hover:text-white transition-transform hover:scale-110">
                <SkipBack size={24} />
              </button>

              <button 
                onClick={togglePlay} 
                className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-white/20"
              >
                {isPlaying ? <Pause size={20} fill="black" /> : <Play size={20} fill="black" className="ml-1" />}
              </button>

              <button onClick={handleNext} className="text-white/70 hover:text-white transition-transform hover:scale-110">
                <SkipForward size={24} />
              </button>
            </div>

            {/* Volume */}
            <div className="flex items-center gap-2 mt-1 bg-white/5 p-2 rounded-lg">
              <button 
                onClick={() => {
                  const newVol = volume === 0 ? 0.5 : 0;
                  setVolume(newVol);
                  audioRef.current.volume = newVol;
                }}
                className="text-white/50 hover:text-white"
              >
                {volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white/80"
              />
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
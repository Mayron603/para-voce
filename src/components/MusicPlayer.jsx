import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music, Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Heart } from 'lucide-react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180); // 3 minutes placeholder

  // Simulated progress
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (currentTime / duration) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-40"
    >
      <div 
        className="rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, rgba(30,30,30,0.95) 0%, rgba(10,10,10,0.98) 100%)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(255,215,0,0.1)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <div className="p-4">
          {/* Song info */}
          <div className="flex items-center gap-4 mb-4">
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ duration: 3, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
              className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, #B3001B 0%, #8B0000 100%)',
                boxShadow: '0 4px 15px rgba(179,0,27,0.4)',
              }}
            >
              <Music className="w-7 h-7 text-white" />
            </motion.div>
            <div className="flex-1 min-w-0">
              <h4 className="text-white font-poppins font-medium text-sm truncate">
                All I Want for Christmas Is You
              </h4>
              <p className="text-gray-400 text-xs font-poppins truncate">
                Mariah Carey
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-red-400"
            >
              <Heart className="w-5 h-5" fill="currentColor" />
            </motion.button>
          </div>

          {/* Progress bar */}
          <div className="mb-3">
            <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-red-500 to-yellow-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between mt-1 text-xs text-gray-500 font-poppins">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>

            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentTime(0)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <SkipBack className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #B3001B 0%, #8B0000 100%)',
                  boxShadow: '0 4px 15px rgba(179,0,27,0.4)',
                }}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-white" fill="currentColor" />
                ) : (
                  <Play className="w-5 h-5 text-white ml-1" fill="currentColor" />
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <SkipForward className="w-5 h-5" />
              </motion.button>
            </div>

            <div className="w-5" /> {/* Spacer for alignment */}
          </div>

          {/* Spotify link placeholder */}
          <div className="mt-3 pt-3 border-t border-gray-700/50 text-center">
            <p className="text-gray-500 text-xs font-poppins">
              🎵 Adicione sua música favorita aqui
            </p>
          </div>
        </div>

        {/* Animated border */}
        <motion.div
          animate={{
            background: [
              'linear-gradient(0deg, #B3001B, #FFD700)',
              'linear-gradient(90deg, #FFD700, #B3001B)',
              'linear-gradient(180deg, #B3001B, #FFD700)',
              'linear-gradient(270deg, #FFD700, #B3001B)',
              'linear-gradient(360deg, #B3001B, #FFD700)',
            ],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="h-1 w-full"
        />
      </div>
    </motion.div>
  );
}
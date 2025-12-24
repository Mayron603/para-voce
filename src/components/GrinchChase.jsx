import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Importando a imagem local (Certifique-se que o arquivo existe em src/assets)
import GRINCH_RUNNING_GIF from '../assets/grinhchorrendo.png';

export default function GrinchChase({ onCaught }) {
  const [position, setPosition] = useState({ top: '50%', left: '-20%' });
  const [isCaught, setIsCaught] = useState(false);

  useEffect(() => {
    // 1. Entra na tela
    setTimeout(() => {
      setPosition({ top: '50%', left: '50%' });
    }, 100);

    // 2. Começa a correr
    const startRunning = setTimeout(() => {
      const interval = setInterval(() => {
        const top = Math.floor(Math.random() * 70) + 15 + '%';
        const left = Math.floor(Math.random() * 70) + 15 + '%';
        setPosition({ top, left });
      }, 800);
      return () => clearInterval(interval);
    }, 1500);

    return () => clearTimeout(startRunning);
  }, []);

  const handleClick = () => {
    setIsCaught(true);
    setTimeout(() => {
      onCaught();
    }, 1000);
  };

  return (
    <AnimatePresence>
      {!isCaught && (
        <motion.div
          animate={position}
          transition={{ type: "spring", stiffness: 50, damping: 15 }}
          exit={{ scale: 0, rotate: 720, opacity: 0, transition: { duration: 1 } }}
          onClick={handleClick}
          className="fixed z-[9999] cursor-crosshair w-32 h-32 md:w-48 md:h-48 pointer-events-auto"
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap animate-bounce">
            Pegue o presente de volta!
          </div>
          <img 
            src={GRINCH_RUNNING_GIF} 
            alt="Grinch" 
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
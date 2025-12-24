import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Importando o vídeo local (Certifique-se que o arquivo existe em src/assets)
import VIDEO_URL from '../assets/Video_de_Pandas_Se_Abracando.mp4';

export default function RealisticPanda({ 
  variant = 'couple', 
  name = '', 
  showSign = false, 
  showRose = false,
  className = ""
}) {
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(blinkInterval);
  }, []);

  // --- 1. VARIANTE VÍDEO (TOPO DO SITE) ---
  if (variant === 'video') {
    return (
      <motion.div
        className={`relative z-10 inline-block ${className}`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        {/* Glow mais fraco atrás */}
        <div className="absolute inset-0 bg-yellow-500/5 blur-[80px] rounded-full scale-75 -z-10 pointer-events-none"></div>

        <motion.div
           className="rounded-2xl"
           animate={{ y: [0, -8, 0] }}
           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <video
            src={VIDEO_URL}
            autoPlay loop muted playsInline
            className="h-64 md:h-80 max-w-[300px] md:max-w-[450px] w-full object-cover rounded-2xl"
            style={{
              // 1. OPACIDADE BEM MAIS BAIXA (50%)
              opacity: 0.5, 
              
              // 2. MÁSCARA RADIAL (VIGNETTE)
              // Isso apaga todas as bordas (cima, baixo, esquerda, direita)
              // O vídeo só fica 100% visível no centro e desaparece nas pontas
              maskImage: 'radial-gradient(circle, black 30%, transparent 70%)',
              WebkitMaskImage: 'radial-gradient(circle, black 30%, transparent 70%)',
              
              // Se o vídeo tiver fundo preto, isso ajuda a sumir com o preto (opcional)
              mixBlendMode: 'screen', 

              // Filtros para deixar menos "lavado"
              filter: 'contrast(1.2) brightness(1.1) saturate(1.2)'
            }}
          />
        </motion.div>
      </motion.div>
    );
  }

  // --- 2. VARIANTES ORIGINAIS (SVGs) ---
  if (variant === 'single-with-sign') {
    return (
      <motion.div className="relative w-48 h-64" animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
        <svg viewBox="0 0 200 280" className="w-full h-full">
          <ellipse cx="100" cy="270" rx="60" ry="10" fill="rgba(0,0,0,0.2)" />
          <motion.g animate={{ scaleY: [1, 1.02, 1] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} style={{ transformOrigin: '100px 200px' }}>
            <ellipse cx="100" cy="200" rx="55" ry="65" fill="#1a1a1a" />
            <ellipse cx="100" cy="210" rx="38" ry="50" fill="#fafafa" />
          </motion.g>
          <ellipse cx="45" cy="180" rx="20" ry="30" fill="#1a1a1a" />
          <ellipse cx="155" cy="180" rx="20" ry="30" fill="#1a1a1a" />
          <ellipse cx="70" cy="255" rx="22" ry="18" fill="#1a1a1a" />
          <ellipse cx="130" cy="255" rx="22" ry="18" fill="#1a1a1a" />
          <circle cx="100" cy="100" r="55" fill="#fafafa" />
          <circle cx="55" cy="55" r="22" fill="#1a1a1a" />
          <circle cx="55" cy="55" r="12" fill="#3a3a3a" />
          <circle cx="145" cy="55" r="22" fill="#1a1a1a" />
          <circle cx="145" cy="55" r="12" fill="#3a3a3a" />
          <ellipse cx="72" cy="95" rx="20" ry="25" fill="#1a1a1a" transform="rotate(-15, 72, 95)" />
          <ellipse cx="128" cy="95" rx="20" ry="25" fill="#1a1a1a" transform="rotate(15, 128, 95)" />
          <motion.g animate={{ scaleY: isBlinking ? 0.1 : 1 }} transition={{ duration: 0.1 }}>
            <ellipse cx="72" cy="95" rx="10" ry="12" fill="white" />
            <ellipse cx="128" cy="95" rx="10" ry="12" fill="white" />
            <circle cx="75" cy="93" r="5" fill="#1a1a1a" />
            <circle cx="131" cy="93" r="5" fill="#1a1a1a" />
            <circle cx="77" cy="91" r="2" fill="white" />
            <circle cx="133" cy="91" r="2" fill="white" />
          </motion.g>
          <ellipse cx="100" cy="118" rx="10" ry="8" fill="#1a1a1a" />
          <ellipse cx="97" cy="116" rx="3" ry="2" fill="#4a4a4a" />
          <path d="M88 128 Q100 140 112 128" stroke="#1a1a1a" strokeWidth="3" fill="none" />
          <ellipse cx="55" cy="115" rx="12" ry="8" fill="#FFB6C1" opacity="0.6" />
          <ellipse cx="145" cy="115" rx="12" ry="8" fill="#FFB6C1" opacity="0.6" />
          <path d="M45 60 Q100 0 155 60" fill="#B3001B" />
          <path d="M45 60 Q100 20 155 60 L145 70 Q100 35 55 70 Z" fill="#8B0000" />
          <ellipse cx="100" cy="65" rx="55" ry="12" fill="white" />
          <circle cx="155" cy="25" r="15" fill="white" />
          {showSign && (
            <g>
              <rect x="155" y="140" width="8" height="80" fill="#8B4513" rx="2" />
              <rect x="120" y="120" width="80" height="50" fill="#FFF8DC" rx="5" stroke="#8B4513" strokeWidth="3" />
              <text x="160" y="152" textAnchor="middle" className="font-dancing" fontSize="16" fill="#B3001B">{name || "Meu Amor"}</text>
              <text x="160" y="162" textAnchor="middle" fontSize="10" fill="#B3001B">❤️</text>
            </g>
          )}
        </svg>
      </motion.div>
    );
  }

  if (variant === 'single-with-rose') {
    return (
      <motion.div className="relative w-48 h-64" animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
        <svg viewBox="0 0 200 280" className="w-full h-full">
          <ellipse cx="100" cy="270" rx="60" ry="10" fill="rgba(0,0,0,0.2)" />
          <motion.g animate={{ scaleY: [1, 1.02, 1] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} style={{ transformOrigin: '100px 200px' }}>
            <ellipse cx="100" cy="200" rx="55" ry="65" fill="#1a1a1a" />
            <ellipse cx="100" cy="210" rx="38" ry="50" fill="#fafafa" />
          </motion.g>
          <motion.g animate={{ rotate: [-5, 5, -5] }} transition={{ duration: 2, repeat: Infinity }} style={{ transformOrigin: '45px 180px' }}>
            <ellipse cx="40" cy="170" rx="20" ry="30" fill="#1a1a1a" />
            <g transform="translate(15, 140)">
              <line x1="15" y1="40" x2="15" y2="15" stroke="#228B22" strokeWidth="3" />
              <ellipse cx="15" cy="10" rx="12" ry="10" fill="#B3001B" />
              <ellipse cx="12" cy="8" rx="6" ry="5" fill="#8B0000" />
              <ellipse cx="18" cy="12" rx="5" ry="4" fill="#FF4444" />
              <path d="M5 25 Q15 20 25 25" stroke="#228B22" strokeWidth="2" fill="none" />
            </g>
          </motion.g>
          <ellipse cx="155" cy="180" rx="20" ry="30" fill="#1a1a1a" />
          <ellipse cx="70" cy="255" rx="22" ry="18" fill="#1a1a1a" />
          <ellipse cx="130" cy="255" rx="22" ry="18" fill="#1a1a1a" />
          <circle cx="100" cy="100" r="55" fill="#fafafa" />
          <circle cx="55" cy="55" r="22" fill="#1a1a1a" />
          <circle cx="145" cy="55" r="22" fill="#1a1a1a" />
          <ellipse cx="72" cy="95" rx="20" ry="25" fill="#1a1a1a" transform="rotate(-15, 72, 95)" />
          <ellipse cx="128" cy="95" rx="20" ry="25" fill="#1a1a1a" transform="rotate(15, 128, 95)" />
          <text x="65" y="100" fontSize="18" fill="#FF69B4">♥</text>
          <text x="121" y="100" fontSize="18" fill="#FF69B4">♥</text>
          <ellipse cx="100" cy="118" rx="10" ry="8" fill="#1a1a1a" />
          <path d="M88 128 Q100 140 112 128" stroke="#1a1a1a" strokeWidth="3" fill="none" />
          <ellipse cx="55" cy="115" rx="12" ry="8" fill="#FFB6C1" opacity="0.7" />
          <ellipse cx="145" cy="115" rx="12" ry="8" fill="#FFB6C1" opacity="0.7" />
          <g transform="translate(100, 50)">
            <ellipse cx="-15" cy="0" rx="12" ry="8" fill="#FF69B4" transform="rotate(-30)" />
            <ellipse cx="15" cy="0" rx="12" ry="8" fill="#FF69B4" transform="rotate(30)" />
            <circle cx="0" cy="3" r="6" fill="#FFD700" />
          </g>
        </svg>
      </motion.div>
    );
  }

  // Padrão (COUPLE SVG ORIGINAL)
  return (
    <motion.div className="relative w-72 h-56 md:w-96 md:h-72" animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
      <svg viewBox="0 0 400 280" className="w-full h-full">
         <ellipse cx="120" cy="265" rx="50" ry="8" fill="rgba(0,0,0,0.15)" />
         <ellipse cx="280" cy="265" rx="50" ry="8" fill="rgba(0,0,0,0.15)" />
         <g transform="translate(40, 20)">
            <motion.g animate={{ scaleY: [1, 1.015, 1] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} style={{ transformOrigin: '80px 180px' }}>
              <ellipse cx="80" cy="180" rx="45" ry="55" fill="#1a1a1a" />
              <ellipse cx="80" cy="188" rx="30" ry="40" fill="#fafafa" />
            </motion.g>
            <ellipse cx="35" cy="165" rx="16" ry="25" fill="#1a1a1a" />
            <motion.ellipse cx="125" cy="155" rx="16" ry="25" fill="#1a1a1a" animate={{ rotate: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} style={{ transformOrigin: '125px 180px' }} />
            <circle cx="80" cy="85" r="45" fill="#fafafa" />
            <circle cx="45" cy="50" r="18" fill="#1a1a1a" />
            <circle cx="115" cy="50" r="18" fill="#1a1a1a" />
            <ellipse cx="60" cy="82" rx="16" ry="20" fill="#1a1a1a" transform="rotate(-12, 60, 82)" />
            <ellipse cx="100" cy="82" rx="16" ry="20" fill="#1a1a1a" transform="rotate(12, 100, 82)" />
            <motion.g animate={{ scaleY: isBlinking ? 0.1 : 1 }} transition={{ duration: 0.1 }}>
              <ellipse cx="60" cy="82" rx="8" ry="10" fill="white" />
              <ellipse cx="100" cy="82" rx="8" ry="10" fill="white" />
              <circle cx="62" cy="80" r="4" fill="#1a1a1a" />
              <circle cx="102" cy="80" r="4" fill="#1a1a1a" />
              <circle cx="64" cy="78" r="1.5" fill="white" />
              <circle cx="104" cy="78" r="1.5" fill="white" />
            </motion.g>
            <ellipse cx="80" cy="100" rx="8" ry="6" fill="#1a1a1a" />
            <path d="M70 108 Q80 118 90 108" stroke="#1a1a1a" strokeWidth="2.5" fill="none" />
            <ellipse cx="42" cy="98" rx="10" ry="6" fill="#FFB6C1" opacity="0.5" />
            <ellipse cx="118" cy="98" rx="10" ry="6" fill="#FFB6C1" opacity="0.5" />
            <path d="M35 55 Q80 5 125 55" fill="#B3001B" />
            <ellipse cx="80" cy="58" rx="45" ry="10" fill="white" />
            <circle cx="125" cy="20" r="12" fill="white" />
         </g>
         <g transform="translate(200, 20)">
            <motion.g animate={{ scaleY: [1, 1.015, 1] }} transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }} style={{ transformOrigin: '80px 180px' }}>
              <ellipse cx="80" cy="180" rx="45" ry="55" fill="#1a1a1a" />
              <ellipse cx="80" cy="188" rx="30" ry="40" fill="#fafafa" />
            </motion.g>
            <motion.ellipse cx="35" cy="155" rx="16" ry="25" fill="#1a1a1a" animate={{ rotate: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }} style={{ transformOrigin: '35px 180px' }} />
            <ellipse cx="125" cy="165" rx="16" ry="25" fill="#1a1a1a" />
            <circle cx="80" cy="85" r="45" fill="#fafafa" />
            <circle cx="45" cy="50" r="18" fill="#1a1a1a" />
            <circle cx="115" cy="50" r="18" fill="#1a1a1a" />
            <ellipse cx="60" cy="82" rx="16" ry="20" fill="#1a1a1a" transform="rotate(-12, 60, 82)" />
            <ellipse cx="100" cy="82" rx="16" ry="20" fill="#1a1a1a" transform="rotate(12, 100, 82)" />
            <text x="52" y="88" fontSize="16" fill="#FF69B4">♥</text>
            <text x="92" y="88" fontSize="16" fill="#FF69B4">♥</text>
            <ellipse cx="80" cy="100" rx="8" ry="6" fill="#1a1a1a" />
            <path d="M70 108 Q80 118 90 108" stroke="#1a1a1a" strokeWidth="2.5" fill="none" />
            <ellipse cx="42" cy="98" rx="10" ry="6" fill="#FFB6C1" opacity="0.6" />
            <ellipse cx="118" cy="98" rx="10" ry="6" fill="#FFB6C1" opacity="0.6" />
            <g transform="translate(80, 42)">
              <ellipse cx="-18" cy="0" rx="14" ry="10" fill="#FF69B4" transform="rotate(-25)" />
              <ellipse cx="18" cy="0" rx="14" ry="10" fill="#FF69B4" transform="rotate(25)" />
              <circle cx="0" cy="2" r="8" fill="#FFD700" />
            </g>
         </g>
         <motion.g animate={{ scale: [1, 1.2, 1], y: [0, -5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
           <text x="185" y="130" fontSize="32" fill="#B3001B" style={{ filter: 'drop-shadow(0 0 8px rgba(179,0,27,0.6))' }}>❤️</text>
         </motion.g>
      </svg>
    </motion.div>
  );
}
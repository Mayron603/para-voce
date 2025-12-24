import React from 'react';
import { motion } from 'framer-motion';

export default function PandaCharacter({ variant = 'couple', size = 'medium' }) {
  const sizeClasses = {
    small: 'w-24 h-24',
    medium: 'w-40 h-40',
    large: 'w-56 h-56',
  };

  if (variant === 'couple') {
    return (
      <motion.div 
        className={`${sizeClasses[size]} relative`}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 200 150" className="w-full h-full">
          {/* Panda 1 - Left */}
          <g transform="translate(20, 20)">
            {/* Body */}
            <ellipse cx="40" cy="80" rx="30" ry="35" fill="#222" />
            {/* White belly */}
            <ellipse cx="40" cy="85" rx="20" ry="25" fill="white" />
            {/* Head */}
            <circle cx="40" cy="40" r="30" fill="white" />
            {/* Ears */}
            <circle cx="15" cy="15" r="12" fill="#222" />
            <circle cx="65" cy="15" r="12" fill="#222" />
            {/* Eye patches */}
            <ellipse cx="28" cy="38" rx="10" ry="12" fill="#222" />
            <ellipse cx="52" cy="38" rx="10" ry="12" fill="#222" />
            {/* Eyes */}
            <circle cx="28" cy="38" r="5" fill="white" />
            <circle cx="52" cy="38" r="5" fill="white" />
            <circle cx="30" cy="37" r="2" fill="#222" />
            <circle cx="54" cy="37" r="2" fill="#222" />
            {/* Nose */}
            <ellipse cx="40" cy="50" rx="5" ry="4" fill="#222" />
            {/* Blush */}
            <ellipse cx="18" cy="50" rx="6" ry="4" fill="#FFB6C1" opacity="0.6" />
            <ellipse cx="62" cy="50" rx="6" ry="4" fill="#FFB6C1" opacity="0.6" />
            {/* Santa Hat */}
            <path d="M10 25 Q40 -15 70 25 L60 30 Q40 0 20 30 Z" fill="#B3001B" />
            <circle cx="70" cy="10" r="8" fill="white" />
            <ellipse cx="40" cy="28" rx="25" ry="6" fill="white" />
            {/* Arm reaching */}
            <ellipse cx="65" cy="70" rx="12" ry="8" fill="#222" transform="rotate(30, 65, 70)" />
          </g>
          
          {/* Panda 2 - Right */}
          <g transform="translate(100, 20)">
            {/* Body */}
            <ellipse cx="40" cy="80" rx="30" ry="35" fill="#222" />
            {/* White belly */}
            <ellipse cx="40" cy="85" rx="20" ry="25" fill="white" />
            {/* Head */}
            <circle cx="40" cy="40" r="30" fill="white" />
            {/* Ears */}
            <circle cx="15" cy="15" r="12" fill="#222" />
            <circle cx="65" cy="15" r="12" fill="#222" />
            {/* Eye patches */}
            <ellipse cx="28" cy="38" rx="10" ry="12" fill="#222" />
            <ellipse cx="52" cy="38" rx="10" ry="12" fill="#222" />
            {/* Eyes with hearts */}
            <text x="24" y="42" fontSize="12" fill="#FF69B4">♥</text>
            <text x="48" y="42" fontSize="12" fill="#FF69B4">♥</text>
            {/* Nose */}
            <ellipse cx="40" cy="50" rx="5" ry="4" fill="#222" />
            {/* Blush */}
            <ellipse cx="18" cy="50" rx="6" ry="4" fill="#FFB6C1" opacity="0.6" />
            <ellipse cx="62" cy="50" rx="6" ry="4" fill="#FFB6C1" opacity="0.6" />
            {/* Bow */}
            <path d="M30 20 Q40 30 50 20 Q40 25 30 20" fill="#B3001B" />
            <circle cx="40" cy="22" r="4" fill="#FFD700" />
            {/* Arm reaching */}
            <ellipse cx="15" cy="70" rx="12" ry="8" fill="#222" transform="rotate(-30, 15, 70)" />
          </g>
          
          {/* Heart between them */}
          <motion.g
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <text x="90" y="60" fontSize="20" fill="#B3001B">❤</text>
          </motion.g>
        </svg>
      </motion.div>
    );
  }

  if (variant === 'waving') {
    return (
      <motion.div 
        className="w-20 h-20"
        animate={{ rotate: [-5, 5, -5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Body */}
          <ellipse cx="50" cy="75" rx="25" ry="20" fill="#222" />
          <ellipse cx="50" cy="78" rx="15" ry="12" fill="white" />
          {/* Head */}
          <circle cx="50" cy="40" r="25" fill="white" />
          {/* Ears */}
          <circle cx="30" cy="20" r="10" fill="#222" />
          <circle cx="70" cy="20" r="10" fill="#222" />
          {/* Eye patches */}
          <ellipse cx="40" cy="38" rx="8" ry="10" fill="#222" />
          <ellipse cx="60" cy="38" rx="8" ry="10" fill="#222" />
          {/* Eyes */}
          <circle cx="40" cy="38" r="4" fill="white" />
          <circle cx="60" cy="38" r="4" fill="white" />
          <circle cx="41" cy="37" r="2" fill="#222" />
          <circle cx="61" cy="37" r="2" fill="#222" />
          {/* Nose */}
          <ellipse cx="50" cy="48" rx="4" ry="3" fill="#222" />
          {/* Smile */}
          <path d="M44 52 Q50 58 56 52" stroke="#222" strokeWidth="2" fill="none" />
          {/* Santa Hat */}
          <path d="M25 30 Q50 0 75 30 L65 33 Q50 10 35 33 Z" fill="#B3001B" />
          <circle cx="75" cy="15" r="6" fill="white" />
          <ellipse cx="50" cy="32" rx="20" ry="5" fill="white" />
          {/* Waving arm */}
          <motion.g
            animate={{ rotate: [-20, 20, -20] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            style={{ transformOrigin: '75px 60px' }}
          >
            <ellipse cx="80" cy="55" rx="10" ry="6" fill="#222" />
          </motion.g>
        </svg>
      </motion.div>
    );
  }

  return null;
}
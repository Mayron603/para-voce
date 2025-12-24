import React, { useEffect, useState } from 'react';

export default function GoldenParticles() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const particleCount = 40;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 2 + Math.random() * 6,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 10,
      opacity: 0.3 + Math.random() * 0.5,
      blur: Math.random() > 0.5 ? 1 : 0,
      glow: Math.random() > 0.6,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 90 }}>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.left}%`,
            bottom: '-20px',
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: particle.glow 
              ? 'radial-gradient(circle, #FFD700 0%, #FFA500 50%, transparent 70%)'
              : '#FFD700',
            opacity: particle.opacity,
            filter: `blur(${particle.blur}px)`,
            boxShadow: particle.glow ? '0 0 15px #FFD700, 0 0 30px #FFA500' : '0 0 5px #FFD700',
            animation: `floatUp ${particle.duration}s ease-out infinite`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-100vh) translateX(${Math.random() > 0.5 ? '' : '-'}30px) scale(0.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
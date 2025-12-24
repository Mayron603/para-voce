import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

export default function FloatingHearts() {
  const [hearts, setHearts] = useState([]);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Generate hearts based on scroll
    if (scrollY > 0 && scrollY % 100 < 10) {
      const newHeart = {
        id: Date.now() + Math.random(),
        left: 10 + Math.random() * 80,
        size: 12 + Math.random() * 20,
        duration: 4 + Math.random() * 4,
        color: Math.random() > 0.5 ? '#B3001B' : '#FF6B6B',
      };
      setHearts(prev => [...prev.slice(-15), newHeart]);
    }
  }, [scrollY]);

  // Also generate some initial hearts
  useEffect(() => {
    const initial = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 14 + Math.random() * 18,
      duration: 6 + Math.random() * 6,
      delay: Math.random() * 5,
      color: Math.random() > 0.5 ? '#B3001B' : '#FF6B6B',
    }));
    setHearts(initial);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 80 }}>
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-heart-float"
          style={{
            left: `${heart.left}%`,
            bottom: '-50px',
            animation: `heartFloat ${heart.duration}s ease-out forwards`,
            animationDelay: `${heart.delay || 0}s`,
          }}
        >
          <Heart 
            size={heart.size} 
            fill={heart.color}
            color={heart.color}
            style={{
              filter: 'drop-shadow(0 0 8px rgba(179, 0, 27, 0.5))',
            }}
          />
        </div>
      ))}
      <style>{`
        @keyframes heartFloat {
          0% {
            transform: translateY(0) scale(1) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          50% {
            transform: translateY(-50vh) scale(1.1) rotate(-10deg);
          }
          100% {
            transform: translateY(-100vh) scale(0.8) rotate(10deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
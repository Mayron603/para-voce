import React, { useEffect, useState } from 'react';

export default function SnowEffect() {
  const [snowflakes, setSnowflakes] = useState([]);

  useEffect(() => {
    // 3 layers of snow with different depths
    const layers = [
      { count: 30, speedRange: [15, 25], sizeRange: [2, 4], opacity: 0.3, blur: 2 }, // Back (slow, small, blurred)
      { count: 40, speedRange: [10, 18], sizeRange: [4, 8], opacity: 0.6, blur: 1 }, // Middle
      { count: 25, speedRange: [6, 12], sizeRange: [8, 14], opacity: 0.9, blur: 0 }, // Front (fast, large, sharp)
    ];

    const allFlakes = [];
    
    layers.forEach((layer, layerIndex) => {
      for (let i = 0; i < layer.count; i++) {
        allFlakes.push({
          id: `${layerIndex}-${i}`,
          left: Math.random() * 100,
          animationDuration: layer.speedRange[0] + Math.random() * (layer.speedRange[1] - layer.speedRange[0]),
          animationDelay: Math.random() * 10,
          size: layer.sizeRange[0] + Math.random() * (layer.sizeRange[1] - layer.sizeRange[0]),
          opacity: layer.opacity * (0.7 + Math.random() * 0.3),
          blur: layer.blur,
          layer: layerIndex,
          swayAmount: 20 + Math.random() * 40,
          swayDuration: 3 + Math.random() * 4,
        });
      }
    });
    
    setSnowflakes(allFlakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 100 }}>
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${flake.left}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity,
            filter: `blur(${flake.blur}px)`,
            animation: `
              snowfall-${flake.layer} ${flake.animationDuration}s linear infinite,
              snowsway ${flake.swayDuration}s ease-in-out infinite alternate
            `,
            animationDelay: `${flake.animationDelay}s, ${Math.random() * 2}s`,
            boxShadow: flake.layer === 2 ? '0 0 10px rgba(255,255,255,0.5)' : 'none',
          }}
        />
      ))}
      <style>{`
        @keyframes snowfall-0 {
          0% { transform: translateY(-20px) rotate(0deg); }
          100% { transform: translateY(100vh) rotate(360deg); }
        }
        @keyframes snowfall-1 {
          0% { transform: translateY(-20px) rotate(0deg); }
          100% { transform: translateY(100vh) rotate(180deg); }
        }
        @keyframes snowfall-2 {
          0% { transform: translateY(-20px); }
          100% { transform: translateY(100vh); }
        }
        @keyframes snowsway {
          0% { margin-left: 0; }
          100% { margin-left: 30px; }
        }
      `}</style>
    </div>
  );
}
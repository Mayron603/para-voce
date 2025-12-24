import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function Card3D() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Suaviza a rotação dividindo por um número maior (20)
    const rotateX = (centerY - e.clientY) / 20; 
    const rotateY = (e.clientX - centerX) / 20;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <section className="py-24 px-4 relative overflow-hidden flex justify-center items-center">
      {/* Luz de Fundo Ambiental */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-900/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full relative z-10">
        
        {/* Título da Seção */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-dancing text-5xl md:text-6xl text-white mb-4 drop-shadow-[0_0_25px_rgba(220,38,38,0.5)]">
            Cartão
          </h2>
          <p className="text-yellow-200/60 font-poppins text-sm uppercase tracking-[0.2em]">
            Interaja com o mouse
          </p>
        </motion.div>

        {/* --- O CARTÃO --- */}
        <div className="flex justify-center perspective-2000">
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => setIsHovered(true)}
            animate={{
              rotateX: rotation.x,
              rotateY: rotation.y,
              scale: isHovered ? 1.02 : 1,
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 30, mass: 0.8 }}
            className="relative cursor-default"
            style={{ 
              transformStyle: 'preserve-3d',
              perspective: '1000px'
            }}
          >
            {/* Sombra Dinâmica no Chão */}
            <motion.div 
              className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[90%] h-8 bg-black/60 blur-xl rounded-[100%]"
              animate={{
                opacity: isHovered ? 0.4 : 0.6,
                scaleX: 1 - Math.abs(rotation.y) / 90,
                x: -rotation.y * 2, // Sombra move oposto ao cartão
              }}
            />

            {/* CORPO DO CARTÃO */}
            <div 
              className="w-[340px] h-[520px] md:w-[400px] md:h-[600px] rounded-xl overflow-hidden relative border border-white/5"
              style={{
                // Gradiente Rico (Bordeaux Profundo)
                background: 'radial-gradient(circle at 50% 0%, #7f1d1d 0%, #450a0a 60%, #1a0202 100%)',
                boxShadow: `
                  0 20px 50px -10px rgba(0,0,0,0.5), 
                  0 0 0 1px rgba(255,255,255,0.05) inset
                `,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Textura de Papel/Ruído (Sutil) */}
              <div 
                className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
              />

              {/* MOLDURA DOURADA (Gold Foil) */}
              <div 
                className="absolute inset-4 border rounded-lg pointer-events-none z-20"
                style={{
                  borderWidth: '2px',
                  borderColor: '#C5A059', // Tom dourado metálico
                  boxShadow: '0 0 15px rgba(197, 160, 89, 0.2), inset 0 0 15px rgba(197, 160, 89, 0.1)',
                  maskImage: 'linear-gradient(to bottom, black 40%, transparent 50%, black 60%)' // Falha artística na borda
                }}
              />
              {/* Segunda borda interna fina */}
              <div className="absolute inset-6 border border-[#C5A059]/30 rounded pointer-events-none z-20" />

              {/* ELEMENTOS DECORATIVOS (Cantoneiras) */}
              <div className="absolute top-5 left-5 w-16 h-16 border-t-2 border-l-2 border-[#C5A059] rounded-tl-xl opacity-80" />
              <div className="absolute top-5 right-5 w-16 h-16 border-t-2 border-r-2 border-[#C5A059] rounded-tr-xl opacity-80" />
              <div className="absolute bottom-5 left-5 w-16 h-16 border-b-2 border-l-2 border-[#C5A059] rounded-bl-xl opacity-80" />
              <div className="absolute bottom-5 right-5 w-16 h-16 border-b-2 border-r-2 border-[#C5A059] rounded-br-xl opacity-80" />

              {/* CONTEÚDO 3D (Com Parallax Real) */}
              <div 
                className="relative h-full flex flex-col items-center justify-between py-16 px-8 text-center"
                style={{ transform: 'translateZ(30px)' }}
              >
                {/* Topo */}
                <div className="space-y-2">
                  <motion.div 
                    animate={{ rotate: [0, 5, -5, 0] }} 
                    transition={{ duration: 6, repeat: Infinity }}
                    className="text-[#C5A059] opacity-80"
                  >
                    <Sparkles className="w-8 h-8 mx-auto" strokeWidth={1} />
                  </motion.div>
                  <p className="text-[#C5A059]/70 text-xs font-poppins tracking-[0.3em] uppercase">Edição Especial</p>
                </div>

                {/* Centro */}
                <div className="flex flex-col items-center gap-4">
                  <h1 
                    className="font-dancing text-6xl text-white leading-tight"
                    style={{ 
                      textShadow: '0 4px 10px rgba(0,0,0,0.5)',
                      background: 'linear-gradient(to bottom, #fff 40%, #e2e8f0 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                  >
                    Feliz<br/>Natal
                  </h1>
                  
                  <div className="w-12 h-[1px] bg-[#C5A059]/50 my-2" />

                  <h2 
                    className="font-dancing text-4xl text-[#C5A059]"
                    style={{ textShadow: '0 2px 10px rgba(197, 160, 89, 0.3)' }}
                  >
                    Meu bem
                  </h2>
                </div>

                {/* Pandas e Mensagem */}
                <div className="space-y-6">
                  <motion.div 
                    className="text-5xl filter drop-shadow-xl"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                  </motion.div>
                  
                  <p className="text-white/80 font-poppins text-xs leading-relaxed max-w-[240px] mx-auto italic">
                    "Que a magia deste momento ilumine cada passo do nosso caminho!"
                  </p>
                </div>
              </div>

              {/* EFEITO DE BRILHO (SHINE) REATIVO AO MOUSE */}
              <motion.div 
                className="absolute inset-0 pointer-events-none z-30 mix-blend-soft-light"
                style={{
                  background: `linear-gradient(
                    ${115 + rotation.x * 20}deg, 
                    transparent 30%, 
                    rgba(255, 255, 255, 0.4) 45%, 
                    rgba(255, 255, 255, 0.0) 50%,
                    transparent 100%
                  )`
                }}
              />
              
              {/* Brilho Especular nas Bordas */}
              <div 
                className="absolute inset-0 rounded-xl pointer-events-none z-30"
                style={{
                  boxShadow: `inset ${-rotation.y * 3}px ${rotation.x * 3}px 20px rgba(255,255,255,0.1)`
                }}
              />

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
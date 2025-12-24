import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

// Importando o vídeo final (Certifique-se de que o arquivo existe na pasta assets)
import finalVideo from '../assets/final.mp4';

// URL do GIF do Panda
const PANDA_GIF = "https://images-ext-1.discordapp.net/external/ujVXuSFv6Uf82ZdxJAfqUM2y5OvjS3BqhTK5FaZtwqU/https/res3.supawork.ai/application/aigc/anonymous/2025/12/3/d1a431f8684d48d3b6995b1aa6d11388.webp?animated=true";

export default function Footer() {
  return (
    <footer className="relative py-20 px-4 overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, #1a0505 30%, #0a0202 100%)',
        }}
      />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        
        {/* Decoração Topo */}
        <div className="flex justify-center items-center gap-6 mb-8">
          <motion.span 
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="text-4xl"
          >
            
          </motion.span>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-3xl"
          >
            
          </motion.span>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />
          <motion.span 
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="text-4xl"
          >
            
          </motion.span>
        </div>

        {/* --- VÍDEO FINAL --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="flex justify-center items-center mb-12 relative"
        >
          {/* Glow Dourado atrás do vídeo */}
          <div className="absolute inset-0 bg-yellow-500/10 blur-[60px] rounded-full scale-75 pointer-events-none" />

          <video
            src={finalVideo}
            autoPlay
            loop
            muted
            playsInline
            className="max-w-[300px] md:max-w-[500px] w-full object-cover rounded-xl"
            style={{
              opacity: 0.7, 
              maskImage: 'radial-gradient(circle, black 40%, transparent 80%)',
              WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 80%)',
              mixBlendMode: 'screen',
              filter: 'contrast(1.1) brightness(1.1) saturate(1.1)'
            }}
          />
        </motion.div>

        {/* --- PANDA GIF (Substituído) --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
          className="flex justify-center mb-12"
        >
          <img 
            src={PANDA_GIF} 
            alt="Panda Fofo"
            // Aumentei um pouco o tamanho (w-32 h-32) e adicionei um brilho suave
            className="w-32 h-32 object-contain opacity-80 hover:opacity-100 transition-opacity transition-transform hover:scale-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
          />
        </motion.div>

        {/* Rodapé Final */}
        <div className="flex justify-center items-center gap-4 text-white/30 text-sm font-poppins">
          <Heart className="w-4 h-4" fill="currentColor" />
          <span>Natal {new Date().getFullYear()}</span>
          <Heart className="w-4 h-4" fill="currentColor" />
        </div>

        {/* Neve caindo no rodapé */}
        <div className="mt-10 flex justify-center gap-3">
          {[...Array(9)].map((_, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -8, 0], opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.15 }}
              className="text-white/40 text-lg"
            >
              ❄
            </motion.span>
          ))}
        </div>
      </div>
    </footer>
  );
}
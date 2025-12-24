import React from 'react';
import { motion } from 'framer-motion';
import CinematicTitle from './CinematicTitle';
import RealisticPanda from './RealisticPanda';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Cinematic background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center top, #3d0a0a 0%, #1a0505 50%, #0a0202 100%)',
          }}
        />
        {/* Luzes de fundo */}
        <motion.div animate={{ opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-[100px]" />
        <motion.div animate={{ opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 7, repeat: Infinity, delay: 1 }} className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-yellow-500/10 rounded-full blur-[80px]" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)' }} />
      </div>

      <div className="relative z-10 text-center px-4 py-20 max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Árvore removida (Espaço vazio no topo) */}

        {/* --- AQUI ESTÁ A CORREÇÃO --- */}
        {/* Adicionamos variant="video" para forçar o vídeo em vez do desenho */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex justify-center mb-8"
        >
          <RealisticPanda variant="video" />
        </motion.div>

        {/* Título */}
        <CinematicTitle />

        {/* Indicador de Scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 15, 0] }}
          transition={{ 
            opacity: { duration: 1, delay: 2 },
            y: { duration: 2, repeat: Infinity, delay: 2 }
          }}
          className="mt-16 text-white/50"
        >
          <p className="text-sm mb-3 font-poppins tracking-wider">Role para baixo</p>
          <div className="flex flex-col items-center gap-1">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
              <motion.div
                animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-yellow-400 rounded-full"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
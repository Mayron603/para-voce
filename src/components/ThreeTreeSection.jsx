import React from 'react';
import { motion } from 'framer-motion';

export default function ThreeTreeSection() {
  return (
    <section className="relative h-screen w-full bg-black overflow-hidden">
      {/* Título Sobreposto */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="absolute top-10 left-0 right-0 z-20 text-center pointer-events-none"
      >
        <h2 className="font-dancing text-4xl md:text-6xl text-white mb-2 drop-shadow-[0_0_15px_rgba(255,215,0,0.8)]">
        
        </h2>
        <p className="text-yellow-200/80 font-poppins text-sm">
        
        </p>
      </motion.div>

      {/* O Iframe carrega o projeto 3D isoladamente */}
      <iframe 
        src="/natal-3d/index.html" 
        title="Árvore 3D"
        className="w-full h-full border-0 absolute inset-0 z-10"
        loading="lazy"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      />
      
      {/* Gradiente para fundir com o resto do site (Opcional) */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0202] to-transparent z-20 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0a0202] to-transparent z-20 pointer-events-none" />
    </section>
  );
}
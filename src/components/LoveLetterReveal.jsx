import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, Sparkles } from 'lucide-react';

export default function LoveLetterReveal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = (e) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  return (
    <section className="py-32 px-4 relative overflow-visible flex flex-col items-center justify-center min-h-[600px]">
      
      {/* Título da Seção */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-20 relative z-10"
      >
        <h2 className="font-dancing text-5xl md:text-7xl text-white mb-2 drop-shadow-[0_0_25px_rgba(220,38,38,0.6)]">
          Mensagem de Natal
        </h2>
        <p className="text-yellow-200/80 font-poppins tracking-widest uppercase text-xs md:text-sm">
          Toque no selo para revelar
        </p>
      </motion.div>

      {/* --- O ENVELOPE --- */}
      <div className="relative w-[340px] md:w-[450px] h-[240px] perspective-1000 z-20 group">
        
        {/* Sombra no chão */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[90%] h-4 bg-black/50 blur-xl rounded-[100%]" />

        {/* 1. PARTE DE TRÁS DO ENVELOPE */}
        <div className="absolute inset-0 bg-[#8B0000] rounded-xl shadow-2xl overflow-hidden border border-white/5">
           <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3C/g%3E%3C/svg%3E")` }} />
        </div>

        {/* 2. A CARTA (Papel Pergaminho) */}
        <motion.div
          className="absolute inset-2 bg-[#fdfbf7] rounded-lg shadow-inner flex flex-col items-center p-6 md:p-8 text-center origin-bottom"
          initial={{ y: 0, scale: 0.95, rotateX: 0 }}
          animate={isOpen ? { 
            y: -450, // Subimos um pouco mais para dar área de leitura
            scale: 1.1, 
            rotateX: 5,
            zIndex: 50, 
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
          } : { 
            y: 0, 
            scale: 0.95,
            zIndex: 5 
          }}
          transition={{ 
            duration: 1.2, 
            delay: isOpen ? 0.4 : 0, 
            type: "spring", 
            damping: 15 
          }}
        >
          {/* Textura de Papel */}
          <div className="absolute inset-0 opacity-10 pointer-events-none rounded-lg" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
          
          <div className="absolute inset-3 border border-[#C5A059]/40 rounded pointer-events-none" />
          <div className="absolute inset-1 border border-[#C5A059]/20 rounded pointer-events-none" />

          {/* CONTEÚDO DA CARTA (COM SCROLL) */}
          <div className="relative z-10 w-full h-full overflow-y-auto custom-scrollbar flex flex-col px-2 text-left">
             
             {/* Cabeçalho Realista */}
             <div className="w-full mb-6 border-b border-[#C5A059]/30 pb-2">
                <p className="font-dancing text-xl text-gray-500">25 de Dezembro, 2025</p>
                <p className="font-dancing text-2xl text-[#8B0000] mt-1">
                  Para: <span className="font-bold">Nay</span>
                </p>
             </div>
             
             {/* Corpo do Texto */}
             <div className="space-y-3 font-dancing text-lg md:text-xl text-gray-800 leading-relaxed">
                <p>Eu penso em você quando o dia fica pesado.</p>
                <p>Eu fico mesmo sem saber direito o que fazer.</p>
                <p>Eu tento ser melhor por nós.</p>
                <p>Eu sinto falta antes mesmo de ir.</p>
                <p>Eu fico quieto quando percebo que você precisa de silêncio.</p>
                <p>Eu aprendo com você todos os dias.</p>
                <p>Eu penso em como te fazer sentir segura.</p>
                <p>Eu fico mesmo quando estou cansado.</p>
                <p>Eu me importo mais do que sei dizer.</p>
                <p>Eu escuto, mesmo quando não entendo tudo.</p>
                <p>Eu me preocupo quando você some.</p>
                <p>Eu fico nervoso pensando em te perder.</p>
                <p>Eu escolho você mesmo nos dias confusos.</p>
                <p>Eu fico porque quero, não por obrigação.</p>
                <p>Eu sinto quando você não está bem.</p>
                <p>Eu penso em você nas coisas simples.</p>
                <p>Eu fico com medo de não ser suficiente.</p>
                <p>Eu penso antes de dormir e quando acordo.</p>
                <p>Eu me vejo em você mais do que imagino.</p>
                <p>Eu sinto saudade mesmo perto.</p>
                <p>Eu penso em você quando algo dá certo.</p>
                <p>Eu fico com receio de te machucar.</p>
                <p>Eu fico porque me importa.</p>
                <p className="font-bold text-[#8B0000] text-xl pt-2">Eu fico aqui.</p>
             </div>

             {/* Assinatura */}
             <div className="mt-8 w-full flex flex-col items-end gap-1 shrink-0 pb-4">
                <div className="w-20 h-[1px] bg-[#C5A059]" />
                <p className="font-dancing text-xl text-[#8B0000] mt-1">De: <span className="font-bold">Mayron</span></p>
             </div>
          </div>

          {isOpen && (
            <button 
              onClick={handleClose}
              className="absolute -top-3 -right-3 bg-[#8B0000] text-white rounded-full p-1.5 shadow-lg hover:bg-red-700 transition-colors border-2 border-[#C5A059] z-50"
            >
              <X size={16} />
            </button>
          )}
        </motion.div>

        {/* 3. FRENTE DO ENVELOPE */}
        <div className="absolute inset-0 z-20 pointer-events-none">
           <div 
             className="absolute bottom-0 left-0 w-full h-full bg-[#9B0000]"
             style={{ clipPath: 'polygon(0 0, 50% 50%, 0 100%)', boxShadow: 'inset 5px 0 10px rgba(0,0,0,0.2)' }}
           />
           <div 
             className="absolute bottom-0 right-0 w-full h-full bg-[#A50000]"
             style={{ clipPath: 'polygon(100% 0, 50% 50%, 100% 100%)', boxShadow: 'inset -5px 0 10px rgba(0,0,0,0.2)' }}
           />
           <div 
             className="absolute bottom-0 left-0 w-full h-full bg-[#B30000]"
             style={{ clipPath: 'polygon(0 100%, 50% 50%, 100% 100%)', boxShadow: '0 -5px 10px rgba(0,0,0,0.1)' }}
           />
        </div>

        {/* 4. ABA SUPERIOR */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full z-30 origin-top"
          initial={{ rotateX: 0 }}
          animate={{ rotateX: isOpen ? 180 : 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{ transformStyle: 'preserve-3d' }}
        >
           <div 
             className="w-full h-full bg-[#8B0000] shadow-xl border-t border-white/10"
             style={{ clipPath: 'polygon(0 0, 100% 0, 50% 55%)' }}
           />
           
           {/* --- SELO DE CERA --- */}
           <motion.button
             onClick={() => !isOpen && setIsOpen(true)}
             className="absolute top-[55%] left-1/2 w-16 h-16 cursor-pointer flex items-center justify-center outline-none"
             style={{ x: "-50%", y: "-50%" }}
             animate={{ opacity: isOpen ? 0 : 1 }}
             whileHover={{ scale: 1.1 }}
             whileTap={{ scale: 0.95 }}
           >
             <div className="absolute inset-0 text-[#C5A059] drop-shadow-md">
               <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                 <path d="M50 5 C20 5 5 25 5 50 C5 80 25 95 50 95 C80 95 95 75 95 50 C95 20 75 5 50 5 Z M50 15 C70 15 85 30 85 50 C85 70 70 85 50 85 C30 85 15 70 15 50 C15 30 30 15 50 15 Z" />
                 <circle cx="50" cy="50" r="35" className="fill-[#AA8539]" />
               </svg>
             </div>
             
             <div className="relative z-10 text-[#4a3b18]">
               <Heart className="w-6 h-6 fill-current" />
             </div>

             <motion.div
               className="absolute inset-0 bg-[#C5A059]/30 rounded-full blur-md"
               animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
               transition={{ duration: 2, repeat: Infinity }}
             />
           </motion.button>
        </motion.div>

        <AnimatePresence>
          {isOpen && (
            <>
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0], 
                    x: (Math.random() - 0.5) * 200, 
                    y: -100 - Math.random() * 200,
                    scale: Math.random() * 1 
                  }}
                  transition={{ duration: 2, delay: i * 0.1 }}
                  className="absolute top-1/2 left-1/2 text-yellow-300 pointer-events-none z-50"
                >
                  <Sparkles size={10 + Math.random() * 10} />
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
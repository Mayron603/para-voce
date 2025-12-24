import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Wind, Heart } from 'lucide-react';

export default function AnxietyRelief({ isOpen, onClose }) {
  const [phase, setPhase] = useState('inhale'); // inhale, hold, exhale
  const [text, setText] = useState('Inspire...');

  // Ciclo da Respiração 4-7-8 (Adaptado para ser visualmente confortável)
  useEffect(() => {
    if (!isOpen) return;

    const breathe = () => {
      // 1. INSPIRE (4 segundos)
      setPhase('inhale');
      setText('Inspire devagar...');
      
      setTimeout(() => {
        // 2. SEGURE (4 segundos)
        setPhase('hold');
        setText('Segure o ar...');
        
        setTimeout(() => {
          // 3. EXPIRE (6 segundos)
          setPhase('exhale');
          setText('Solte bem devagar...');
        }, 4000); // Espera o Hold acabar
      }, 4000); // Espera o Inhale acabar
    };

    breathe(); // Começa imediatamente
    const interval = setInterval(breathe, 14000); // Ciclo total de 14s

    return () => clearInterval(interval);
  }, [isOpen]);

  // Mensagens de apoio aleatórias que mudam a cada ciclo
  const [supportMsg, setSupportMsg] = useState("Estou aqui com você");
  const messages = [
    "Estou orgulhoso de você",
    "Isso é só um momento, vai passar",
    "Você está segura",
    "Eu te amo muito",
    "Respire... eu estou aqui",
    "Você é mais forte do que imagina",
    "Foque apenas na minha voz mentalmente",
    "Nós vamos ficar bem"
  ];

  useEffect(() => {
    if (phase === 'inhale') {
      // Troca a mensagem de apoio toda vez que começa a inspirar
      setSupportMsg(messages[Math.floor(Math.random() * messages.length)]);
    }
  }, [phase]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#0a1a2f] text-white overflow-hidden"
        >
          {/* Fundo com gradiente suave animado */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f2027] via-[#203a43] to-[#2c5364] opacity-80" />
          
          {/* Partículas flutuantes calmas */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white rounded-full opacity-10"
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: Math.random() * window.innerHeight,
                scale: Math.random() * 0.5 + 0.5 
              }}
              animate={{ 
                y: [null, Math.random() * -100],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{ 
                duration: Math.random() * 10 + 10, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              style={{ width: Math.random() * 4 + 2 + 'px', height: Math.random() * 4 + 2 + 'px' }}
            />
          ))}

          {/* Botão Fechar Suave */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-white/50 hover:text-white transition-colors z-50 flex items-center gap-2 text-sm font-poppins"
          >
            <span>Estou melhor</span> <X size={20} />
          </button>

          <div className="relative z-10 flex flex-col items-center text-center px-4">
            
            <motion.h2 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-2xl md:text-3xl font-dancing text-blue-200 mb-12 opacity-90"
            >
              Cantinho da Paz
            </motion.h2>

            {/* Círculo de Respiração */}
            <div className="relative flex items-center justify-center w-64 h-64 md:w-80 md:h-80 mb-12">
              {/* Círculo Externo (Guia) */}
              <div className="absolute inset-0 border border-white/10 rounded-full" />
              
              {/* Círculo Animado Principal */}
              <motion.div
                className="bg-blue-300/20 backdrop-blur-md rounded-full shadow-[0_0_50px_rgba(147,197,253,0.3)]"
                animate={{
                  scale: phase === 'inhale' ? 1.5 : (phase === 'hold' ? 1.5 : 1),
                  opacity: phase === 'exhale' ? 0.6 : 1
                }}
                transition={{
                  duration: phase === 'inhale' ? 4 : (phase === 'hold' ? 0 : 6),
                  ease: "easeInOut"
                }}
                style={{ width: '120px', height: '120px' }}
              />

              {/* Texto Central da Instrução */}
              <motion.div 
                className="absolute text-xl md:text-2xl font-poppins font-light tracking-widest text-white drop-shadow-lg"
                key={text}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                {text}
              </motion.div>
            </div>

            {/* Mensagem de Apoio */}
            <motion.div 
              className="h-20 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p className="font-dancing text-xl md:text-2xl text-blue-100 flex items-center gap-2">
                <Heart size={16} className="text-blue-300" fill="currentColor" /> 
                {supportMsg} 
                <Heart size={16} className="text-blue-300" fill="currentColor" />
              </p>
            </motion.div>

            <p className="absolute bottom-[-100px] text-xs text-white/30 font-poppins max-w-xs">
              Siga o círculo. Inspire quando ele crescer, solte quando ele diminuir.
            </p>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
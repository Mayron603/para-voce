import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Frown, RefreshCw } from 'lucide-react';

// --- Componente de Caixa Individual ---
const GiftItem = ({ id, status, onClick, label, delay, isWinningPhase, isStolen }) => {
  // Se foi roubado (pelo Grinch), não renderiza
  if (isStolen) return null;

  const isOpen = status === 'opened';
  const [isShaking, setIsShaking] = useState(false);
  
  // Novo estado local para controlar o "spoiler/segredo" de presentes especiais
  const [isSecretRevealed, setIsSecretRevealed] = useState(false);

  const handleClick = () => {
    // Só abre se estiver fechado e não estiver chacoalhando
    if (!isOpen && !isShaking) {
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
        onClick(id);
      }, 1000);
    }
  };
  
  const boxSizeClasses = "w-24 h-24 md:w-32 md:h-32";
  
  return (
    <motion.div
      layoutId={`gift-${id}`} 
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: delay * 0.1 }}
      className="relative flex flex-col items-center justify-center p-2"
    >
      <div className={`relative ${boxSizeClasses} cursor-pointer`}>
        <AnimatePresence>
          {!isOpen ? (
            // --- CAIXA FECHADA ---
            <motion.div
              key="box"
              exit={{ scale: 1.5, opacity: 0, filter: 'blur(10px)' }}
              animate={isShaking ? {
                x: [0, -5, 5, -5, 5, 0],
                rotate: [0, -5, 5, -5, 5, 0],
                transition: { duration: 0.4, repeat: 2 }
              } : {
                y: [0, -5, 0],
                transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
              onClick={handleClick}
              whileHover={{ scale: 1.05 }}
              className="absolute inset-0 z-10"
            >
               {/* Design da Caixa 3D */}
               <div className="w-full h-full relative">
                 <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-red-500 to-red-700 rounded-t-lg shadow-lg z-20">
                    <div className="absolute left-1/2 -translate-x-1/2 -top-4 w-8 h-8 bg-yellow-400 rounded-full shadow-md flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-yellow-800" />
                    </div>
                    <div className="absolute top-1/2 -translate-y-1/2 w-full h-2 bg-yellow-400 shadow-sm" />
                 </div>
                 <div className="absolute bottom-0 left-2 right-2 h-2/3 bg-gradient-to-b from-red-700 to-red-900 rounded-b-lg shadow-2xl flex items-center justify-center">
                    <div className="w-4 h-full bg-yellow-400 shadow-sm" />
                 </div>
              </div>
            </motion.div>
          ) : (
            // --- CONTEÚDO REVELADO ---
            <motion.div
              initial={{ scale: 0, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: "spring", damping: 12 }}
              className="absolute inset-0 flex flex-col items-center justify-center z-0 rounded-lg overflow-hidden bg-black/30 backdrop-blur-sm border border-white/10"
            >
              {/* FASE REAL (Presentes Verdadeiros) */}
              {isWinningPhase && (
                 label.isSecret ? (
                   // LÓGICA ESPECIAL PARA PRESENTES SECRETOS
                   !isSecretRevealed ? (
                     // Estado 1: Botão para revelar
                     <div 
                        onClick={(e) => { e.stopPropagation(); setIsSecretRevealed(true); }}
                        className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-white/10 transition-colors p-2"
                     >
                        <p className="text-yellow-400 font-bold text-xs md:text-sm text-center leading-tight mb-1">
                          {label.secretLabel || "Presente Misterioso"}
                        </p>
                        <p className="text-white/60 text-[10px] uppercase tracking-widest animate-pulse">
                          Clique para revelar
                        </p>
                     </div>
                   ) : (
                     // Estado 2: O Conteúdo (Texto ou Imagem)
                     <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-full h-full flex items-center justify-center p-1"
                     >
                       {label.content}
                     </motion.div>
                   )
                 ) : (
                   // ÍCONES NORMAIS (Livro, Carta, Vídeo, Audible)
                   <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-4xl md:text-5xl mb-2 filter drop-shadow-lg">
                     {label.icon}
                   </motion.div>
                 )
              )}

              {/* FASE FAKE (GIF do Troll) */}
              {!isWinningPhase && label.image && (
                  <div className="w-full h-full overflow-hidden">
                    <img src={label.image} alt="Troll" className="w-full h-full object-cover opacity-80" />
                  </div>
              )}
              
              {/* Etiqueta inferior (só aparece se não for segredo OU se já tiver sido revelado) */}
              {isWinningPhase && (!label.isSecret || isSecretRevealed) && label.text && (
                <span className="absolute bottom-1 text-[10px] md:text-xs font-bold text-white bg-black/50 px-2 py-0.5 rounded-full backdrop-blur-sm border border-white/10 shadow-lg whitespace-nowrap z-10">
                  {label.text}
                </span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// --- COMPONENTE PRINCIPAL ---
export default function RealisticGiftBox({ onRevealBook, onRevealLetter, onRevealVideo, onRevealAudible, stolenGiftId, onPhaseChange }) {
  const [phase, setPhase] = useState(1);
  const [openedBoxes, setOpenedBoxes] = useState([]);
  const [showFailMessage, setShowFailMessage] = useState(false);

  // --- ALTERAÇÃO: Total de presentes agora é 5 ---
  const totalGifts = 5; 

  const handleBoxClick = (id) => {
    if (openedBoxes.includes(id)) return;

    const newOpened = [...openedBoxes, id];
    setOpenedBoxes(newOpened);

    if (phase === 1) {
      // Fase Fake: Espera abrir todos os presentes para mostrar que deu ruim
      if (newOpened.length === totalGifts) {
        setTimeout(() => setShowFailMessage(true), 1500);
      }
    } else {
      // Fase Real: Abre os modais correspondentes
      setTimeout(() => {
        if (id === 1) onRevealBook();
        if (id === 2) onRevealLetter();
        if (id === 3) onRevealVideo();
        if (id === 4) onRevealAudible();
        // ID 5 não precisa de callback externo, é revelado na própria caixa
      }, 800);
    }
  };

  const startSecondChance = () => {
    setShowFailMessage(false);
    setOpenedBoxes([]);
    
    setTimeout(() => {
      setPhase(2);
      if (onPhaseChange) onPhaseChange(2);
    }, 500);
  };

  const getLabel = (id, phase) => {
    // Fase 1: Todos são Troll/Vazio
    if (phase === 1) return { image: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZnl6MmR5cXAxMzQxb2p1c3R2bDA5MGJ6dXdsZzZtaTh3b3cwNXoxcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/GLbiGvv9qrpny/giphy.gif", text: "Vazio!" };
    
    // Fase 2: Presentes Reais
    switch(id) {
        case 1: return { icon: "📖", text: "Nossa História" };
        case 2: return { icon: "💌", text: "Carta de Amor" };
        case 3: return { icon: "🎬", text: "Vídeo Especial" };
        case 4: return { icon: "🎧", text: "Audible Premium" };
        
        // --- ID 5: O Texto da Trolagem ---
        case 5: return { 
          isSecret: true,
          secretLabel: "Presente Misterioso",
          content: (
            <div className="text-center">
               <p className="text-white font-bold text-xs md:text-sm leading-tight break-words">
                 Acha mesmo que eu iria revelar? kkk Surpresa! 🎁
               </p>
               <span className="text-2xl md:text-3xl mt-1 block">🫣</span>
            </div>
          ),
          text: "" 
        }; 
        
        // REMOVIDO: Case 6 do Panda

        default: return { icon: "🎁", text: "Surpresa" };
    }
  }

  return (
    <section className="py-12 px-4 relative overflow-visible z-20 min-h-[400px]">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div key={phase} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h2 className="font-dancing text-5xl md:text-7xl text-white mb-4 drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]">
            {phase === 1 ? "Tente a Sorte" : "Agora é Real! ✨"}
          </h2>
          <p className="text-yellow-200 font-poppins text-lg md:text-xl">
            {phase === 1 ? `Escolha ${totalGifts} presentes...` : "Preparei com carinho ❤️"}
          </p>
        </motion.div>

        {!showFailMessage && (
          // Grid centralizado para os 5 presentes
          <motion.div layout className="flex flex-wrap justify-center gap-4">
            {[1, 2, 3, 4, 5].map((id) => (
              <GiftItem
                key={`${phase}-${id}`}
                id={id}
                delay={id}
                status={openedBoxes.includes(id) ? 'opened' : 'closed'}
                onClick={handleBoxClick}
                isWinningPhase={phase === 2}
                isStolen={id === stolenGiftId}
                label={getLabel(id, phase)}
              />
            ))}
          </motion.div>
        )}

        <AnimatePresence>
          {showFailMessage && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.5 }} 
              className="bg-black/40 backdrop-blur-xl p-8 rounded-3xl border border-white/10 max-w-lg mx-auto mt-8 shadow-2xl relative z-50"
            >
              <Frown className="w-20 h-20 text-yellow-400 mx-auto mb-6 animate-bounce" />
              <h3 className="text-3xl text-white font-bold mb-3 font-dancing">Que Azar! 😱</h3>
              <p className="text-gray-200 mb-8 font-poppins">
                Poxa vida, todos os {totalGifts} estavam vazios! <br/>
                Vou usar minha magia de Natal...
              </p>
              <button 
                onClick={startSecondChance} 
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-10 py-4 rounded-full font-bold text-lg flex items-center gap-3 mx-auto transition-all hover:scale-105 shadow-[0_0_20px_rgba(220,38,38,0.6)]"
              >
                <RefreshCw className="w-6 h-6 animate-spin-slow" /> Tentar de Novo
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
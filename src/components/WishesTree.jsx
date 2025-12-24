import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Trash2, Lightbulb, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Certifique-se que o caminho da imagem está correto (png ou jpg)
import treeImage from '../assets/arvore.png';

// --- CONFIGURAÇÃO DOS ENFEITES (NOVOS ITENS ADICIONADOS) ---
const TOOLS = [
  // Bolas Clássicas
  { id: 'red-ball', label: '🔴', type: 'ball', color: '#dc2626', highlight: '#fca5a5' },
  { id: 'gold-ball', label: '🟡', type: 'ball', color: '#d97706', highlight: '#fcd34d' },
  { id: 'blue-ball', label: '🔵', type: 'ball', color: '#2563eb', highlight: '#93c5fd' },
  // Novos Itens do Kit
  { id: 'bow', label: '🎀', type: 'bow' },       // Laço Vermelho
  { id: 'gift', label: '🎁', type: 'gift' },     // Presentinho Dourado
  { id: 'bell', label: '🔔', type: 'bell' },     // Sino Dourado
  { id: 'santa', label: '🎅', type: 'santa' },   // Papai Noel
  { id: 'drum', label: '🥁', type: 'drum' },     // Tambor
  // Outros
  { id: 'star', label: '⭐', type: 'star' },
  { id: 'cane', label: '🍬', type: 'cane' },
  { id: 'light', label: '💡', type: 'light', color: '#fef08a' },
];

export default function WishesTree() {
  const [decorations, setDecorations] = useState([]);
  const [isNightMode, setIsNightMode] = useState(false);
  const treeRef = useRef(null);

  // --- LÓGICA DE DRAG & DROP ---
  const handleDragEnd = (event, info, toolType) => {
    const treeElement = treeRef.current;
    if (!treeElement) return;

    const treeRect = treeElement.getBoundingClientRect();
    
    // Pega posição segura (Mouse ou Touch)
    const clientX = event.clientX || (event.changedTouches && event.changedTouches[0]?.clientX) || info.point.x;
    const clientY = event.clientY || (event.changedTouches && event.changedTouches[0]?.clientY) || info.point.y;

    // Verifica se soltou dentro da árvore
    const isInside = 
      clientX >= treeRect.left && 
      clientX <= treeRect.right &&
      clientY >= treeRect.top && 
      clientY <= treeRect.bottom;

    if (isInside) {
      const x = ((clientX - treeRect.left) / treeRect.width) * 100;
      const y = ((clientY - treeRect.top) / treeRect.height) * 100;

      const newDeco = {
        id: Date.now(),
        x,
        y,
        ...toolType,
      };

      setDecorations((prev) => [...prev, newDeco]);
    }
  };

  const handleRemove = (id) => {
    setDecorations((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <section className={`py-10 px-4 relative transition-colors duration-700 select-none ${isNightMode ? 'bg-black/90' : ''}`}>
      
      {/* Máscara Noturna */}
      <div className={`fixed inset-0 bg-black pointer-events-none transition-opacity duration-700 ${isNightMode ? 'opacity-60' : 'opacity-0'}`} style={{ zIndex: 5 }} />

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
        
        <motion.div 
          className="text-center mb-6 relative z-20"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="font-dancing text-5xl text-white mb-2 drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]">
            Monte Sua Árvore
          </h2>
          <p className="text-yellow-100/80 font-poppins text-xs md:text-sm">
            Arraste os enfeites para a árvore • Duplo clique para remover
          </p>
        </motion.div>

        {/* --- ÁREA DA ÁRVORE --- */}
        <div 
          ref={treeRef}
          className="relative w-full max-w-[500px] aspect-[3/4] mx-auto mt-2 border-2 border-dashed border-white/10 rounded-3xl"
        >
          <img 
            src={treeImage} 
            alt="Árvore de Natal" 
            className={`w-full h-full object-contain drop-shadow-2xl relative z-10 transition-filter duration-700 pointer-events-none ${isNightMode ? 'brightness-75' : 'brightness-100'}`}
          />

          <AnimatePresence>
            {decorations.map((deco) => (
              <motion.div
                key={deco.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                drag
                dragMomentum={false}
                dragConstraints={treeRef}
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  handleRemove(deco.id);
                }}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing touch-none"
                style={{ left: `${deco.x}%`, top: `${deco.y}%` }}
              >
                <OrnamentVisual deco={deco} isNightMode={isNightMode} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* --- BARRA DE FERRAMENTAS --- */}
        <div className="mt-8 p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl relative z-30 w-full max-w-2xl">
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            {TOOLS.map((tool) => (
              <motion.div
                key={tool.id}
                drag
                dragSnapToOrigin={true}
                dragElastic={0.1}
                dragMomentum={false}
                onDragEnd={(e, info) => handleDragEnd(e, info, tool)}
                className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-2xl cursor-grab active:cursor-grabbing hover:bg-white/20 transition-colors relative z-50 shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 1.2, zIndex: 100 }}
                title={`Arrastar ${tool.label}`}
              >
                <span className="pointer-events-none select-none filter drop-shadow-md">
                  {tool.label}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-between items-center border-t border-white/10 pt-4 px-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsNightMode(!isNightMode)}
              className={`gap-2 ${isNightMode ? 'text-yellow-300 bg-yellow-400/10' : 'text-white/70 hover:text-white'}`}
            >
              <Lightbulb size={18} />
              {isNightMode ? 'Acender Luz' : 'Apagar Luz'}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDecorations([])}
              className="text-red-400 hover:text-red-300 hover:bg-red-500/10 gap-2"
            >
              <RefreshCw size={16} /> Limpar
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
}

// --- COMPONENTE VISUAL DOS ENFEITES ---
const OrnamentVisual = ({ deco, isNightMode }) => {
  
  // 1. Bolas
  if (deco.type === 'ball') {
    return (
      <div 
        className="w-10 h-10 rounded-full relative shadow-md pointer-events-none"
        style={{ 
          background: `radial-gradient(circle at 30% 30%, ${deco.highlight}, ${deco.color}, #2a0a0a)`,
          boxShadow: isNightMode 
            ? `0 0 10px ${deco.color}, inset -2px -2px 6px rgba(0,0,0,0.5)` 
            : 'inset -2px -2px 6px rgba(0,0,0,0.3), 2px 3px 5px rgba(0,0,0,0.3)'
        }}
      >
        <div className="absolute top-2 left-2 w-3 h-2 bg-white/60 blur-[1px] rounded-full rotate-[-45deg]" />
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-3 bg-yellow-600 rounded-sm" />
      </div>
    );
  }

  // 2. Laço Vermelho (Bow)
  if (deco.type === 'bow') {
    return (
      <div className="relative w-12 h-10 pointer-events-none filter drop-shadow-md">
        <svg viewBox="0 0 100 80" className="w-full h-full fill-[#dc2626]">
          {/* Lados do laço */}
          <path d="M50 40 L10 10 Q0 0 10 30 L50 40 L90 30 Q100 0 90 10 Z" />
          {/* Fitas penduradas */}
          <path d="M50 40 L20 80 L35 80 L50 50 L65 80 L80 80 Z" fill="#b91c1c" />
          {/* Nó central */}
          <circle cx="50" cy="40" r="8" fill="#ef4444" />
        </svg>
      </div>
    );
  }

  // 3. Presente (Gift)
  if (deco.type === 'gift') {
    return (
      <div className="relative w-10 h-10 pointer-events-none drop-shadow-lg">
        {/* Caixa Dourada */}
        <div className="w-full h-full bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-sm shadow-inner" />
        {/* Fita Vertical */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-2 bg-red-600" />
        {/* Fita Horizontal */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-2 bg-red-600" />
        {/* Laço topo */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-4 bg-red-500 rounded-full" />
      </div>
    );
  }

  // 4. Sino (Bell)
  if (deco.type === 'bell') {
    return (
      <div className="relative w-10 h-10 pointer-events-none filter drop-shadow-md">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M50 10 Q80 10 80 60 L90 80 L10 80 L20 60 Q20 10 50 10 Z" fill="url(#goldGradient)" />
          <circle cx="50" cy="80" r="10" fill="#b45309" /> {/* Badalo */}
          <defs>
            <linearGradient id="goldGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fcd34d" />
              <stop offset="50%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#92400e" />
            </linearGradient>
          </defs>
        </svg>
        {/* Lacinho do sino */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-600 rounded-full" />
      </div>
    );
  }

  // 5. Papai Noel (Santa)
  if (deco.type === 'santa') {
    return (
      <div className="relative w-10 h-12 pointer-events-none drop-shadow-md">
        {/* Gorro */}
        <div className="absolute top-0 w-full h-1/2 bg-red-600 rounded-t-full z-10" />
        <div className="absolute top-4 right-0 w-3 h-3 bg-white rounded-full z-20" /> {/* Pompons */}
        {/* Rosto */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#fcd34d] rounded-full" />
        {/* Barba */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-6 bg-white rounded-b-xl" />
      </div>
    );
  }

  // 6. Tambor (Drum)
  if (deco.type === 'drum') {
    return (
      <div className="relative w-10 h-10 pointer-events-none drop-shadow-md">
        <div className="w-full h-8 bg-red-700 mt-1 border-t-2 border-b-2 border-yellow-400 relative">
           {/* Detalhes cruzados */}
           <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_45%,#facc15_45%,#facc15_55%,transparent_55%)] bg-[length:10px_10px]" />
           <div className="absolute inset-0 bg-[linear-gradient(-45deg,transparent_45%,#facc15_45%,#facc15_55%,transparent_55%)] bg-[length:10px_10px]" />
        </div>
        {/* Topo do tambor */}
        <div className="absolute top-0 w-full h-3 bg-white/50 rounded-full border border-yellow-600" />
      </div>
    );
  }

  // 7. Estrela (Star)
  if (deco.type === 'star') {
    return (
      <div className="relative pointer-events-none">
        <Star className="w-14 h-14 text-yellow-400 fill-yellow-400 drop-shadow-lg" strokeWidth={1} />
        <div className={`absolute inset-0 bg-yellow-400 blur-xl rounded-full transition-opacity duration-700 ${isNightMode ? 'opacity-60' : 'opacity-0'}`} />
      </div>
    );
  }

  // 8. Bengala (Cane)
  if (deco.type === 'cane') {
    return (
      <div 
        className="w-8 h-12 border-4 border-b-0 rounded-t-full relative overflow-hidden rotate-12 drop-shadow-md pointer-events-none"
        style={{ 
          borderColor: '#ef4444',
          background: 'repeating-linear-gradient(45deg, #ef4444, #ef4444 5px, #ffffff 5px, #ffffff 10px)'
        }}
      >
        <div className="absolute inset-0 shadow-[inset_0_0_5px_rgba(0,0,0,0.3)] rounded-t-full" />
      </div>
    );
  }

  // 9. Luzinha (Light)
  if (deco.type === 'light') {
    return (
      <div className="relative pointer-events-none">
        <motion.div 
          animate={{ opacity: [0.6, 1, 0.6], scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-yellow-200 rounded-full blur-md ${isNightMode ? 'opacity-100' : 'opacity-40'}`}
        />
        <div className="w-4 h-4 bg-yellow-100 rounded-full relative z-10 shadow-[0_0_5px_rgba(255,255,0,0.8)]" />
      </div>
    );
  }

  return null;
};
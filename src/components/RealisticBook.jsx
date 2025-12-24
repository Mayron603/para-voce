import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, Camera, Star, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const pages = [
  {
    id: 1,
    title: "Nossa História",
    icon: Heart,
    content: (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center relative">
        <div className="absolute inset-4 border-2 border-yellow-600/30 rounded-lg pointer-events-none" />
        <div className="absolute top-2 left-2 text-yellow-600/40 text-2xl">❧</div>
        <div className="absolute bottom-2 right-2 text-yellow-600/40 text-2xl rotate-180">❧</div>
        
        <Heart className="w-12 h-12 text-red-500 mb-4" fill="currentColor" />
        <h3 className="font-dancing text-3xl text-red-700 mb-4">Nossa História</h3>
        <p className="font-poppins text-gray-700 leading-relaxed text-sm">
          Desde o primeiro momento em que te vi, soube que você seria especial na minha vida. 
          Cada dia ao seu lado é uma nova página sendo escrita em nossa história de amor.
        </p>
        <p className="font-poppins text-gray-700 leading-relaxed text-sm mt-4">
          Você trouxe cor e alegria para meus dias, transformando momentos simples em memórias inesquecíveis.
        </p>
        <div className="mt-6 text-3xl">🐼💕🐼</div>
      </div>
    ),
  },
  {
    id: 2,
    title: "Momentos Especiais",
    icon: Camera,
    content: (
      <div className="h-full p-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Camera className="w-6 h-6 text-red-600" />
          <h3 className="font-dancing text-2xl text-red-700">Momentos Especiais</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.15 }}
              className="aspect-square bg-gradient-to-br from-red-50 to-pink-50 rounded-lg border-2 border-dashed border-red-200 flex items-center justify-center hover:border-red-400 transition-colors cursor-pointer group"
            >
              <div className="text-center text-red-400 group-hover:text-red-600 transition-colors">
                <Camera className="w-8 h-8 mx-auto mb-1" />
                <span className="text-xs font-poppins">Foto {i}</span>
              </div>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-gray-500 text-xs mt-4 font-poppins">
          Adicione suas fotos especiais aqui
        </p>
      </div>
    ),
  },
  {
    id: 3,
    title: "O que eu amo em você",
    icon: Star,
    content: (
      <div className="h-full p-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Star className="w-6 h-6 text-yellow-500" fill="currentColor" />
          <h3 className="font-dancing text-2xl text-red-700">O que eu amo em você</h3>
        </div>
        <div className="space-y-3">
          {[
            "Seu sorriso que ilumina meu dia",
            "Seu abraço que me faz sentir em casa",
            "Sua risada contagiante",
            "Seu jeito carinhoso de me olhar",
            "Como você me faz querer ser melhor",
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.3 }}
              className="flex items-center gap-3"
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ delay: index * 0.3 + 0.5, duration: 0.5 }}
              >
                <Heart className="w-4 h-4 text-red-500 flex-shrink-0" fill="currentColor" />
              </motion.span>
              <span className="font-poppins text-gray-700 text-sm">{item}</span>
            </motion.div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 4,
    title: "Mensagem para você",
    icon: MessageCircle,
    content: (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center relative">
        <div className="absolute inset-4 border-2 border-yellow-600/30 rounded-lg pointer-events-none" />
        
        <div className="text-5xl mb-4">🎄</div>
        <h3 className="font-dancing text-2xl text-red-700 mb-4">Mensagem de Natal</h3>
        <p className="font-poppins text-gray-700 leading-relaxed text-sm italic">
          "Neste Natal, meu maior presente é ter você ao meu lado. 
          Que possamos construir juntos muitos mais momentos felizes.
          Te amo mais do que palavras podem expressar."
        </p>
        <p className="mt-6 font-dancing text-2xl text-red-600">
          Com todo meu amor ❤️
        </p>
        <div className="mt-4 text-2xl">🐼🎁🐼</div>
      </div>
    ),
  },
];

export default function RealisticBook() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState('next');
  const audioRef = useRef(null);

  const playPageSound = () => {
    // Create a subtle page flip sound effect
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
      // Audio not supported
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    playPageSound();
  };

  const nextPage = () => {
    if (currentPage < pages.length - 1 && !isFlipping) {
      setFlipDirection('next');
      setIsFlipping(true);
      playPageSound();
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setIsFlipping(false);
      }, 400);
    }
  };

  const prevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      setFlipDirection('prev');
      setIsFlipping(true);
      playPageSound();
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setIsFlipping(false);
      }, 400);
    }
  };

  const CurrentIcon = pages[currentPage]?.icon || Heart;

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-900/50 via-transparent to-red-900/50 pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-dancing text-5xl md:text-6xl text-white mb-4" style={{ textShadow: '0 0 30px rgba(255,215,0,0.3)' }}>
            Nosso Livro de Amor
          </h2>
          <p className="text-yellow-300 font-poppins text-lg">
            Clique para abrir e descobrir nossa história ✨
          </p>
        </motion.div>

        <div className="flex justify-center" style={{ perspective: '2000px' }}>
          <AnimatePresence mode="wait">
            {!isOpen ? (
              /* CLOSED BOOK */
              <motion.div
                key="closed-book"
                initial={{ rotateY: 0, scale: 0.9, opacity: 0 }}
                animate={{ rotateY: 0, scale: 1, opacity: 1 }}
                exit={{ rotateY: -120, scale: 1.1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                onClick={handleOpen}
                className="cursor-pointer group"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Book shadow */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-72 h-10 bg-black/40 blur-xl rounded-full transform group-hover:scale-110 transition-transform" />
                
                {/* Book cover */}
                <div className="relative w-72 h-96 md:w-80 md:h-[450px] rounded-r-lg rounded-l-sm overflow-hidden transform group-hover:scale-105 transition-all duration-500">
                  {/* Velvet texture background */}
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(135deg, #8B0000 0%, #B3001B 30%, #8B0000 70%, #5c0011 100%)',
                    }}
                  />
                  
                  {/* Texture overlay */}
                  <div 
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    }}
                  />
                  
                  {/* Golden border */}
                  <div className="absolute inset-3 border-2 border-yellow-500/50 rounded pointer-events-none" />
                  <div className="absolute inset-5 border border-yellow-600/30 rounded pointer-events-none" />
                  
                  {/* Spine effect */}
                  <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-black/40 to-transparent" />
                  
                  {/* Golden glow effect */}
                  <motion.div
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute inset-0 rounded-r-lg"
                    style={{
                      boxShadow: '0 0 60px rgba(255, 215, 0, 0.4), inset 0 0 30px rgba(255, 215, 0, 0.1)',
                    }}
                  />
                  
                  {/* Content */}
                  <div className="relative h-full flex flex-col items-center justify-center p-8">
                    {/* Decorative corners */}
                    <div className="absolute top-4 left-8 text-yellow-500/60 text-3xl">❧</div>
                    <div className="absolute top-4 right-4 text-yellow-500/60 text-3xl scale-x-[-1]">❧</div>
                    <div className="absolute bottom-4 left-8 text-yellow-500/60 text-3xl scale-y-[-1]">❧</div>
                    <div className="absolute bottom-4 right-4 text-yellow-500/60 text-3xl scale-[-1]">❧</div>
                    
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-6xl mb-6"
                    >
                      📖
                    </motion.div>
                    
                    <h3 
                      className="font-dancing text-4xl text-yellow-300 mb-3"
                      style={{ textShadow: '0 0 20px rgba(255, 215, 0, 0.5)' }}
                    >
                      Nossa História
                    </h3>
                    
                    <p className="text-white/80 font-poppins text-sm mb-6">de Amor</p>
                    
                    <div className="text-4xl">🐼❤️🐼</div>
                    
                    <motion.p
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute bottom-8 text-yellow-200/70 text-sm font-poppins"
                    >
                      ✨ Toque para abrir ✨
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* OPEN BOOK */
              <motion.div
                key="open-book"
                initial={{ rotateY: -90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Book shadow */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-96 h-12 bg-black/30 blur-2xl rounded-full" />
                
                {/* Open book container */}
                <div className="relative bg-gradient-to-br from-amber-50 via-amber-100 to-amber-50 rounded-lg shadow-2xl overflow-hidden w-80 h-[480px] md:w-[420px] md:h-[520px]">
                  {/* Paper texture */}
                  <div 
                    className="absolute inset-0 opacity-50"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paper)'/%3E%3C/svg%3E")`,
                    }}
                  />
                  
                  {/* Book spine (left side) */}
                  <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-red-900 via-red-800 to-red-900 shadow-lg">
                    <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-r from-transparent to-black/20" />
                  </div>
                  
                  {/* Page fold shadow */}
                  <div className="absolute left-6 top-0 bottom-0 w-8 bg-gradient-to-r from-black/10 to-transparent pointer-events-none" />
                  
                  {/* Light effect when open */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-br from-yellow-200/30 via-transparent to-transparent pointer-events-none"
                  />
                  
                  {/* Header with title */}
                  <div className="ml-6 bg-gradient-to-r from-red-700 via-red-600 to-red-700 p-4 flex items-center justify-center gap-3 shadow-md">
                    <CurrentIcon className="w-6 h-6 text-yellow-300" />
                    <h3 className="font-dancing text-2xl text-white">
                      {pages[currentPage].title}
                    </h3>
                  </div>
                  
                  {/* Page content */}
                  <div className="ml-6 h-[360px] md:h-[400px] overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentPage}
                        initial={{ 
                          rotateY: flipDirection === 'next' ? 90 : -90,
                          opacity: 0,
                        }}
                        animate={{ 
                          rotateY: 0,
                          opacity: 1,
                        }}
                        exit={{ 
                          rotateY: flipDirection === 'next' ? -90 : 90,
                          opacity: 0,
                        }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="h-full"
                        style={{ transformStyle: 'preserve-3d', transformOrigin: 'left center' }}
                      >
                        {pages[currentPage].content}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  
                  {/* Navigation */}
                  <div className="ml-6 absolute bottom-0 left-0 right-0 p-4 border-t border-red-200/50 bg-gradient-to-t from-amber-100 to-transparent flex items-center justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={prevPage}
                      disabled={currentPage === 0 || isFlipping}
                      className="text-red-700 hover:bg-red-100 disabled:opacity-30"
                    >
                      <ChevronLeft className="w-5 h-5 mr-1" />
                      Anterior
                    </Button>
                    
                    <div className="flex items-center gap-2">
                      {pages.map((_, idx) => (
                        <div
                          key={idx}
                          className={`w-2 h-2 rounded-full transition-all ${
                            idx === currentPage ? 'bg-red-600 w-4' : 'bg-red-300'
                          }`}
                        />
                      ))}
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={nextPage}
                      disabled={currentPage === pages.length - 1 || isFlipping}
                      className="text-red-700 hover:bg-red-100 disabled:opacity-30"
                    >
                      Próxima
                      <ChevronRight className="w-5 h-5 ml-1" />
                    </Button>
                  </div>
                </div>
                
                {/* Close button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => { setIsOpen(false); setCurrentPage(0); }}
                  className="absolute -top-4 -right-4 rounded-full w-12 h-12 bg-red-600 text-white border-2 border-yellow-400 hover:bg-red-700 shadow-lg"
                >
                  ✕
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
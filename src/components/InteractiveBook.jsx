import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Book, Heart, Camera, Gift, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const pages = [
  {
    id: 1,
    title: "Nossa História",
    icon: Heart,
    content: (
      <div className="text-center p-4">
        <p className="text-gray-700 font-poppins leading-relaxed text-sm md:text-base">
          Desde o primeiro momento em que te vi, soube que você seria especial na minha vida. 
          Cada dia ao seu lado é uma nova página sendo escrita em nossa história de amor.
        </p>
        <p className="mt-4 text-gray-700 font-poppins leading-relaxed text-sm md:text-base">
          Você trouxe cor e alegria para meus dias, transformando momentos simples em memórias inesquecíveis.
        </p>
        <div className="mt-6 text-4xl">🐼❤️🐼</div>
      </div>
    ),
  },
  {
    id: 2,
    title: "Momentos Especiais",
    icon: Camera,
    content: (
      <div className="grid grid-cols-2 gap-3 p-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="aspect-square bg-gradient-to-br from-red-100 to-pink-100 rounded-lg flex items-center justify-center border-2 border-dashed border-red-300"
          >
            <div className="text-center text-red-400">
              <Camera className="w-8 h-8 mx-auto mb-1" />
              <span className="text-xs font-poppins">Foto {i}</span>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 3,
    title: "O que eu mais amo em você",
    icon: Gift,
    content: (
      <div className="p-4 space-y-3">
        {[
          "Seu sorriso que ilumina meu dia",
          "Seu abraço que me faz sentir em casa",
          "Sua risada contagiante",
          "Seu jeito carinhoso de me olhar",
          "Como você me faz querer ser melhor",
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className="flex items-center gap-2 text-gray-700 font-poppins text-sm"
          >
            <Heart className="w-4 h-4 text-red-500 flex-shrink-0" fill="currentColor" />
            <span>{item}</span>
          </motion.div>
        ))}
      </div>
    ),
  },
  {
    id: 4,
    title: "Mensagem de Natal",
    icon: MessageCircle,
    content: (
      <div className="text-center p-4">
        <div className="text-5xl mb-4">🎄</div>
        <p className="text-gray-700 font-poppins leading-relaxed text-sm md:text-base italic">
          "Neste Natal, meu maior presente é ter você ao meu lado. 
          Que possamos construir juntos muitos mais momentos felizes.
          Te amo mais do que palavras podem expressar."
        </p>
        <p className="mt-6 font-dancing text-2xl text-red-600">
          Com todo meu amor ❤️
        </p>
        <div className="mt-4 text-3xl">🐼🎁🐼</div>
      </div>
    ),
  },
];

export default function InteractiveBook() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const CurrentIcon = pages[currentPage]?.icon || Book;

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-red-800 to-red-900">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-dancing text-4xl md:text-5xl text-white mb-4">
            Nosso Livro de Amor
          </h2>
          <p className="text-yellow-300 font-poppins">
            Clique para abrir e descobrir cada página ❤️
          </p>
        </motion.div>

        <div className="flex justify-center perspective-1000">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              <motion.div
                key="closed"
                initial={{ rotateY: 0 }}
                exit={{ rotateY: -90 }}
                transition={{ duration: 0.5 }}
                onClick={() => setIsOpen(true)}
                className="cursor-pointer"
              >
                <div className="w-72 h-96 md:w-80 md:h-[450px] bg-gradient-to-br from-red-700 to-red-900 rounded-r-lg rounded-l-sm shadow-2xl flex flex-col items-center justify-center border-l-8 border-red-950 hover:scale-105 transition-transform">
                  <Book className="w-16 h-16 text-yellow-400 mb-4" />
                  <h3 className="font-dancing text-3xl text-white mb-2">Nossa História</h3>
                  <p className="text-white/70 text-sm font-poppins">Toque para abrir</p>
                  <div className="mt-6 text-4xl">🐼❤️🐼</div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotateY: -90 }}
                animate={{ rotateY: 0 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="w-72 h-96 md:w-96 md:h-[500px] bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg shadow-2xl overflow-hidden">
                  {/* Book spine effect */}
                  <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-red-900 to-red-800" />
                  
                  {/* Page content */}
                  <div className="ml-4 h-full flex flex-col">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-red-700 to-red-600 p-4 flex items-center gap-3">
                      <CurrentIcon className="w-6 h-6 text-yellow-300" />
                      <h3 className="font-dancing text-2xl text-white">
                        {pages[currentPage].title}
                      </h3>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-auto">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentPage}
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -50 }}
                          transition={{ duration: 0.3 }}
                        >
                          {pages[currentPage].content}
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Navigation */}
                    <div className="p-4 border-t border-red-200 flex items-center justify-between bg-white/50">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={prevPage}
                        disabled={currentPage === 0}
                        className="text-red-700 hover:bg-red-100"
                      >
                        <ChevronLeft className="w-5 h-5" />
                        Anterior
                      </Button>
                      
                      <span className="text-red-600 font-poppins text-sm">
                        {currentPage + 1} / {pages.length}
                      </span>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={nextPage}
                        disabled={currentPage === pages.length - 1}
                        className="text-red-700 hover:bg-red-100"
                      >
                        Próxima
                        <ChevronRight className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Close button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="absolute -top-3 -right-3 rounded-full w-10 h-10 bg-red-600 text-white border-0 hover:bg-red-700"
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
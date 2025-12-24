import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Heart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function GiftBox() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-red-900 to-red-800">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="font-dancing text-4xl md:text-5xl text-white mb-4">
            Presente Especial
          </h2>
          <p className="text-yellow-300 font-poppins">
            Clique no presente para descobrir a surpresa 🎁
          </p>
        </motion.div>

        <div className="flex justify-center">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              <motion.div
                key="closed"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0, rotate: 180 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                className="cursor-pointer relative"
              >
                {/* Gift box */}
                <div className="relative">
                  {/* Lid */}
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="relative z-10"
                  >
                    <div className="w-44 h-12 bg-gradient-to-b from-red-600 to-red-700 rounded-t-lg shadow-lg">
                      {/* Ribbon top */}
                      <div className="absolute left-1/2 -translate-x-1/2 -top-6">
                        <div className="relative">
                          <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-xl">🎀</span>
                          </div>
                          {/* Bow loops */}
                          <div className="absolute -left-4 top-2 w-8 h-6 bg-yellow-400 rounded-full transform -rotate-45" />
                          <div className="absolute -right-4 top-2 w-8 h-6 bg-yellow-400 rounded-full transform rotate-45" />
                        </div>
                      </div>
                      {/* Ribbon horizontal */}
                      <div className="absolute left-0 right-0 top-1/2 h-4 bg-yellow-400 -translate-y-1/2" />
                    </div>
                  </motion.div>
                  
                  {/* Box */}
                  <div className="w-40 h-32 bg-gradient-to-b from-red-500 to-red-700 rounded-b-lg shadow-2xl mx-auto -mt-1">
                    {/* Ribbon vertical */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-4 bg-yellow-400" />
                  </div>

                  {/* Sparkles */}
                  <motion.div
                    animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                    className="absolute -top-4 -left-4 text-2xl"
                  >
                    ✨
                  </motion.div>
                  <motion.div
                    animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    className="absolute -top-2 -right-4 text-2xl"
                  >
                    ✨
                  </motion.div>
                  <motion.div
                    animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    className="absolute -bottom-2 left-0 text-2xl"
                  >
                    ✨
                  </motion.div>
                </div>

                <p className="mt-6 text-white/80 font-poppins text-sm animate-pulse">
                  Toque para abrir
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative"
              >
                {/* Revealed message */}
                <div className="bg-gradient-to-br from-amber-50 to-pink-50 rounded-2xl p-8 shadow-2xl max-w-sm border-4 border-yellow-400">
                  {/* Close button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="absolute -top-3 -right-3 rounded-full w-10 h-10 bg-red-600 text-white hover:bg-red-700"
                  >
                    <X className="w-5 h-5" />
                  </Button>

                  {/* Hearts floating animation */}
                  <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ y: 100, x: Math.random() * 200, opacity: 0 }}
                        animate={{ y: -100, opacity: [0, 1, 0] }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity, 
                          delay: i * 0.5,
                          ease: "easeOut"
                        }}
                        className="absolute text-red-400"
                      >
                        <Heart className="w-4 h-4" fill="currentColor" />
                      </motion.div>
                    ))}
                  </div>

                  <div className="relative z-10 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="text-6xl mb-4"
                    >
                      🐼❤️🐼
                    </motion.div>

                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="font-dancing text-3xl text-red-600 mb-4"
                    >
                      Para o Amor da Minha Vida
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="text-gray-700 font-poppins text-sm leading-relaxed"
                    >
                      Você é o melhor presente que eu poderia receber. 
                      Obrigado por fazer parte da minha vida e tornar cada dia especial.
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="mt-4 text-2xl"
                    >
                      🎄✨🎁✨🎄
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
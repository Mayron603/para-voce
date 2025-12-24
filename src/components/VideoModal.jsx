import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// --- IMPORTAÇÃO DO VÍDEO LOCAL ---
import mensagemVideo from '../assets/Mensagem.mp4';

export default function VideoModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md" onClick={onClose}>
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 z-20 p-2 bg-black/50 rounded-full text-white hover:bg-red-600 transition-colors"
            >
              <X size={24} />
            </button>
            
            <video 
              className="w-full h-full object-contain"
              controls 
              autoPlay 
              playsInline
            >
              {/* --- ALTERAÇÃO AQUI: Usando o vídeo importado --- */}
              <source 
                src={mensagemVideo} 
                type="video/mp4" 
              />
              Seu navegador não suporta a reprodução de vídeos.
            </video>
            
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
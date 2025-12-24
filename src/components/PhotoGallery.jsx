import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Heart } from 'lucide-react';

// Importando as imagens (Certifique-se que elas estão na pasta src/assets)
import natal1 from '../assets/natal1.jpg';
import natal2 from '../assets/natal2.jpg';
import natal3 from '../assets/natal3.jpg';

const photos = [
  { 
    id: 1, 
    image: natal1, 
    caption: "" 
  },
  { 
    id: 2, 
    image: natal2, 
    caption: "" 
  },
  { 
    id: 3, 
    image: natal3, 
    caption: "" 
  },
];

export default function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const navigate = (direction) => {
    if (selectedPhoto === null) return;
    const currentIndex = photos.findIndex(p => p.id === selectedPhoto);
    let newIndex;
    if (direction === 'next') {
      newIndex = currentIndex + 1 >= photos.length ? 0 : currentIndex + 1;
    } else {
      newIndex = currentIndex - 1 < 0 ? photos.length - 1 : currentIndex - 1;
    }
    setSelectedPhoto(photos[newIndex].id);
  };

  const currentPhoto = photos.find(p => p.id === selectedPhoto);

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 
            className="font-dancing text-5xl md:text-6xl text-white mb-4"
            style={{ textShadow: '0 0 30px rgba(255,215,0,0.3)' }}
          >
            Galeria
          </h2>
          <p className="text-yellow-300 font-poppins text-lg">
            Momentinhos
          </p>
        </motion.div>

        {/* Grade de Fotos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              onClick={() => setSelectedPhoto(photo.id)}
              className="relative cursor-pointer group"
            >
              {/* Moldura da Foto */}
              <div 
                className="aspect-[3/4] rounded-xl overflow-hidden relative shadow-2xl"
                style={{
                  border: '4px solid #fff',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                }}
              >
                {/* Imagem Real */}
                <img 
                  src={photo.image} 
                  alt={photo.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay ao passar o mouse */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="text-center">
                    <Heart className="w-8 h-8 text-white mx-auto mb-2 drop-shadow-lg" fill="currentColor" />
                    <p className="text-white text-sm font-poppins font-bold shadow-black drop-shadow-md">Ver foto</p>
                  </div>
                </div>
              </div>

              {/* Legenda abaixo da foto (opcional) */}
              <p className="text-center text-white/80 mt-3 font-dancing text-xl">
                {photo.caption}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Lightbox (Modal de tela cheia) */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
              onClick={() => setSelectedPhoto(null)}
            >
              {/* Botão Fechar */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-50"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navegação */}
              <button
                onClick={(e) => { e.stopPropagation(); navigate('prev'); }}
                className="absolute left-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-50"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); navigate('next'); }}
                className="absolute right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-50"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Foto Grande */}
              <motion.div
                key={selectedPhoto}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl max-h-[85vh] w-full flex flex-col items-center"
              >
                <div className="relative rounded-lg overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border-4 border-white/10">
                  <img 
                    src={currentPhoto?.image} 
                    alt={currentPhoto?.caption}
                    className="max-h-[70vh] w-auto object-contain"
                  />
                </div>

                {/* Legenda */}
                <div className="text-center mt-6">
                  <p className="text-white font-dancing text-3xl drop-shadow-md">
                    {currentPhoto?.caption} 💕
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
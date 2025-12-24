import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Music, Disc, Play, Loader2 } from 'lucide-react'; // Adicionei o Loader2

const songs = [
  { 
    title: "Natal Todo Dia", 
    artist: "Roupa Nova", 
    emoji: "🎄", 
    spotifyId: "7AFThfbqx1OVNWg01WvUnW" // Removi o ?si=... e o resto, deixe SÓ O ID PURO
  },
  { 
    title: "The Christmas Song", 
    artist: "Shawn Mendes, Camila Cabello", 
    emoji: "🎄", 
    spotifyId: "4PS1e8f2LvuTFgUs1Cn3ON"
  },
  { 
    title: "Feliz Navidad", 
    artist: "Andrea Bocelli, Matteo Bocelli", 
    emoji: "🎅", 
    spotifyId: "4h8gC82RmwrIsNYibTbXvs" 
  }
];

export default function SpotifyPlaylist() {
  const [currentSong, setCurrentSong] = useState(songs[0]); 
  const [isLoading, setIsLoading] = useState(true); // Novo estado para controlar o carregamento

  // Função para limpar o ID caso venha com lixo na string (paranoia de segurança)
  const getCleanId = (id) => id.split('?')[0];

  const handleSongChange = (song) => {
    if (song.spotifyId !== currentSong.spotifyId) {
      setIsLoading(true); // Ativa o loading ao trocar
      setCurrentSong(song);
    }
  };

  return (
    <section className="py-24 px-4 relative overflow-hidden bg-black">
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-dancing text-5xl md:text-6xl text-white mb-4" style={{ textShadow: '0 0 30px rgba(255,215,0,0.3)' }}>
            Playlist de Natal
          </h2>
          <p className="text-yellow-300 font-poppins text-lg">
            Toque para ouvir no Spotify 👇
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          
          {/* LADO ESQUERDO: O Player */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="sticky top-10"
          >
            <div className="bg-[#121212] rounded-3xl p-4 shadow-2xl border border-white/10 relative overflow-hidden">
              
              {/* Info da Música Atual */}
              <div className="relative z-10 text-center mb-4">
                <motion.div 
                  key={currentSong.spotifyId}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-48 h-48 mx-auto mb-4 rounded-xl shadow-lg bg-gradient-to-br from-gray-800 to-black flex items-center justify-center text-6xl border-2 border-white/10"
                >
                  {currentSong.emoji}
                </motion.div>
                <h3 className="text-white font-bold text-xl truncate px-2">{currentSong.title}</h3>
                <p className="text-gray-400 text-sm">{currentSong.artist}</p>
              </div>

              {/* --- AREA DO IFRAME --- */}
              <div className="rounded-xl overflow-hidden shadow-lg bg-black relative min-h-[152px]">
                
                {/* Loader Spinner (Aparece enquanto o iframe carrega) */}
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#181818] z-20">
                    <Loader2 className="w-8 h-8 text-[#1DB954] animate-spin" />
                    <span className="ml-2 text-sm text-gray-400">Carregando player...</span>
                  </div>
                )}

                <iframe 
                  key={currentSong.spotifyId}
                  style={{ borderRadius: '12px' }} 
                  // URL OFICIAL E OTIMIZADA DO SPOTIFY
                  src={`https://open.spotify.com/embed/track/${getCleanId(currentSong.spotifyId)}?utm_source=generator&theme=0`} 
                  width="100%" 
                  height="152" 
                  frameBorder="0" 
                  allowFullScreen="" 
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                  loading="eager" // Mudado para eager para carregar assim que possível
                  onLoad={() => setIsLoading(false)} // Desativa o loading quando o iframe termina
                  className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                />
              </div>

            </div>
          </motion.div>

          {/* LADO DIREITO: A Lista */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#181818] rounded-3xl p-6 border border-white/5 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <Disc className="text-[#1DB954] animate-spin-slow" />
              <h3 className="text-white font-bold font-poppins">Fila de Reprodução</h3>
            </div>

            <div className="space-y-2">
              {songs.map((song, index) => {
                const isActive = currentSong.title === song.title;
                
                return (
                  <motion.div
                    key={index}
                    onClick={() => handleSongChange(song)}
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)' }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border ${
                      isActive 
                        ? 'bg-white/10 border-[#1DB954]/50' 
                        : 'border-transparent hover:border-white/10'
                    }`}
                  >
                    <div className="w-8 h-8 flex items-center justify-center bg-white/5 rounded-full text-lg">
                      {song.emoji}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-bold truncate ${isActive ? 'text-[#1DB954]' : 'text-white'}`}>
                        {song.title}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        {song.artist}
                      </p>
                    </div>

                    {isActive && (
                       <div className="h-3 w-3 bg-[#1DB954] rounded-full animate-pulse shadow-[0_0_10px_#1DB954]" />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
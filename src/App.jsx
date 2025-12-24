import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, RefreshCw } from 'lucide-react';
import Home from './pages/Home';
import MusicPlayerWidget from './components/MusicPlayerWidget';

// Importe as músicas
import music1 from './assets/Feliz Navidad.mp3';
import music2 from './assets/Natal Todo Dia.mp3';
import music3 from './assets/The Christmas Song.mp3';

// Array da Playlist
const PLAYLIST = [
  { title: "Feliz Navidad", artist: "José Feliciano", src: music1 },
  { title: "Natal Todo Dia", artist: "Roupa Nova", src: music2 },
  { title: "The Christmas Song", artist: "Nat King Cole", src: music3 },
];

// --- COMPONENTE CAMUFLAGEM (Tela de Erro) ---
const PrankSite = ({ onInteraction }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleRetry = () => {
    setIsLoading(true);
    // Chama a função para dar play na música imediatamente
    onInteraction();
    // NÃO removemos a tela aqui. Ela vai sair sozinha quando a música chegar em 14s.
  };

  return (
    <div className="fixed inset-0 z-[99999] bg-[#202124] text-[#9aa0a6] font-sans flex flex-col items-center justify-center p-4 text-left select-none">
      <div className="max-w-md w-full">
        {/* Ícone de Erro */}
        <div className="mb-6">
           <WifiOff size={48} className="text-[#9aa0a6]" />
        </div>

        <h1 className="text-[#e8eaed] text-2xl font-medium mb-4">
          Não há conexão com a internet
        </h1>
        
        <div className="text-sm mb-6 leading-relaxed space-y-2">
          <p>Tente:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Verificar os cabos de rede, modem e roteador.</li>
            <li>Conectar à rede Wi-Fi novamente.</li>
          </ul>
        </div>

        <p className="text-xs text-[#5f6368] mb-8 font-mono">
          ERR_INTERNET_DISCONNECTED
        </p>

        {/* Botão de "Tentar Novamente" */}
        <button 
          onClick={handleRetry}
          disabled={isLoading}
          className="bg-[#8ab4f8] text-[#202124] px-6 py-2 rounded-[4px] font-medium text-sm hover:bg-[#aecbfa] transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <RefreshCw size={16} className="animate-spin" /> Diagnosticando...
            </>
          ) : (
            "Tentar novamente"
          )}
        </button>
      </div>

      {/* Detalhes técnicos falsos */}
      <div className="fixed bottom-4 left-4 text-[10px] text-[#5f6368]">
        <p>Host: vercel.app | Proxy: Direct</p>
      </div>
    </div>
  );
};

// --- COMPONENTE APP PRINCIPAL ---
function App() {
  const [showPrank, setShowPrank] = useState(true);
  const audioRef = useRef(new Audio(PLAYLIST[0].src)); 
  const [isPlaying, setIsPlaying] = useState(false);
  
  // LÓGICA DE SINCRONIA RESTAURADA
  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = false;
    audio.volume = 0.5;

    // Monitora o tempo para a transição dos 14 segundos
    const handleTimeUpdate = () => {
      // Se a música passou de 14s e a tela de erro ainda está lá, remove ela
      if (audio.currentTime >= 14 && showPrank) {
        setShowPrank(false);
      }
    };
    audio.addEventListener('timeupdate', handleTimeUpdate);

    // Quando acabar, toca a próxima
    audio.onended = () => {
      audio.play(); 
    };

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [showPrank]);

  // Função chamada quando ela clica em "Tentar Novamente"
  const handleStartMusic = () => {
    // Apenas dá o play na música, o useEffect acima cuida de tirar a tela no tempo certo
    if (audioRef.current.paused) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(e => console.log("Erro ao tocar:", e));
    }
  };

  return (
    <AnimatePresence mode="wait">
      {showPrank ? (
        <motion.div
          key="camouflage"
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)', transition: { duration: 1.5 } }} // Saída suave quando der 14s
          className="fixed inset-0 z-50"
        >
          {/* Tela de Erro Fake */}
          <PrankSite onInteraction={handleStartMusic} />
        </motion.div>
      ) : (
        <motion.div
          key="home-site"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="relative z-10 w-full min-h-screen"
        >
          <Home />
          
          {/* Widget de Música */}
          <MusicPlayerWidget 
            playlist={PLAYLIST} 
            audioRef={audioRef} 
            initialIsPlaying={isPlaying}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;
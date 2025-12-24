import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Headphones, CheckCircle, Sparkles } from 'lucide-react'; 

// Componentes Originais
import SnowEffect from '../components/SnowEffect';
import GoldenParticles from '../components/GoldenParticles';
import FloatingHearts from '../components/FloatingHearts';
import HeroSection from '../components/HeroSection';
import CountdownTimer from '../components/CountdownTimer';
import RealisticBook3D from '../components/RealisticBook3D';
import RealisticGiftBox from '../components/RealisticGiftBox'; 
import LoveLetterReveal from '../components/LoveLetterReveal';
import PandaShowcase from '../components/PandaShowcase';
import PhotoGallery from '../components/PhotoGallery';
import WishesTree from '../components/WishesTree';
import RelationshipTimeline from '../components/RelationshipTimeline';
import SpotifyPlaylist from '../components/SpotifyPlaylist';
import Card3D from '../components/Card3D';
import Footer from '../components/Footer';
import VideoModal from '../components/VideoModal';
import ThreeTreeSection from '../components/ThreeTreeSection';
import GrinchChase from '../components/GrinchChase';

// NOVO COMPONENTE DE ALÍVIO
import AnxietyRelief from '../components/AnxietyRelief';

// NOVO COMPONENTE
import BookQuiz from '../components/BookQuiz';

// Importação do vídeo do roubo
import robberyVideoFile from '../assets/roubo.mp4';

// --- IMPORTAÇÃO DO GIF REBOLANDO ---
import rebolandoGif from '../assets/rebolando.gif';

export default function Home() {
  const [showBook, setShowBook] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showAnxietyRelief, setShowAnxietyRelief] = useState(false);
  
  // NOVO ESTADO PARA O MODAL AUDIBLE
  const [showAudibleModal, setShowAudibleModal] = useState(false);

  // --- LÓGICA DA BARRA DE PROGRESSO (CORAÇÃO) ---
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      if (windowHeight === 0) return;

      const scroll = totalScroll / windowHeight;
      // Garante que fique entre 0 e 1
      setScrollProgress(Math.min(Math.max(scroll, 0), 1));
    }
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- POSIÇÃO ALEATÓRIA DO GIF ---
  const [pandaPos, setPandaPos] = useState(null);

  useEffect(() => {
    // Calcula uma posição aleatória ao carregar a página
    const randomTop = Math.floor(Math.random() * 60) + 20; // Entre 20% e 80% da altura
    const randomSide = Math.random() > 0.5 ? 'right' : 'left';
    
    setPandaPos({ top: `${randomTop}%`, side: randomSide });
  }, []);

  const bookRef = useRef(null);
  const letterRef = useRef(null);

  useEffect(() => {
    if (showBook && bookRef.current) {
      setTimeout(() => {
        bookRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 600);
    }
  }, [showBook]);

  useEffect(() => {
    if (showLetter && letterRef.current) {
      setTimeout(() => {
        letterRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 600);
    }
  }, [showLetter]);

  // --- GRINCH E ROUBO ---
  const [showRobberyVideo, setShowRobberyVideo] = useState(false); 
  const [grinchPhase, setGrinchPhase] = useState('idle'); 
  const [stolenGiftId, setStolenGiftId] = useState(null); 
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); 

  const handleGiftPhaseChange = (phase) => {
    if (phase === 2) {
      setTimeout(() => {
        setShowRobberyVideo(true); 
      }, 500);
    }
  };

  const handleRobberyVideoEnded = () => {
    setShowRobberyVideo(false); 
    setGrinchPhase('running');
    setStolenGiftId(3); // O Grinch rouba o vídeo (Id 3)
  };

  const handleGrinchCaught = () => {
    setGrinchPhase('caught'); 
    setStolenGiftId(null); 
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 4000);
  };

  return (
    <div className="min-h-screen overflow-x-hidden relative bg-[#0a0202]">
    

      {/* 2. BARRA DE PROGRESSO DE CORAÇÃO (NOVO) */}
      <div className="fixed top-6 right-6 z-50 w-12 h-12 mix-blend-difference pointer-events-none hidden md:block drop-shadow-lg">
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          {/* Contorno do Coração */}
          <path 
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
            stroke="white" 
            strokeWidth="1.5"
            className="opacity-50"
          />
          {/* Máscara que revela o preenchimento conforme o scroll */}
          <mask id="heartMask">
            <rect x="0" y={24 - (24 * scrollProgress)} width="24" height="24" fill="white" />
          </mask>
          {/* Preenchimento Vermelho (Controlado pela máscara) */}
          <path 
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
            fill="#ef4444" 
            mask="url(#heartMask)"
          />
        </svg>
        {/* Texto opcional de % */}
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8px] font-bold text-white mix-blend-exclusion">
          {Math.round(scrollProgress * 100)}%
        </span>
      </div>

      {/* Modais Existentes */}
      <VideoModal isOpen={showVideoModal} onClose={() => setShowVideoModal(false)} />

      {/* --- NOVO MODAL AUDIBLE --- */}
      <AnimatePresence>
        {showAudibleModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setShowAudibleModal(false)}>
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-[#1a1a1a] p-8 rounded-3xl border border-yellow-500/30 max-w-md w-full text-center shadow-2xl relative overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              {/* Efeito de brilho fundo */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
              
              <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Headphones className="w-10 h-10 text-yellow-400" />
              </div>
              
              <h3 className="text-2xl text-white font-bold mb-2">Audible! 🎧</h3>
              <p className="text-gray-300 mb-6 font-poppins text-sm leading-relaxed">
                Já assinei na sua conta da Amazon! Agora você pode ouvir seus livros favoritos enquanto a gente... faz outras coisas.
              </p>
              
              <button 
                onClick={() => setShowAudibleModal(false)}
                className="w-full py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle size={18} /> Entendi, Amei!
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&family=Poppins:wght@300;400;500;600;700&family=Lora:ital,wght@0,400;0,500;1,400&display=swap');
        .font-dancing { font-family: 'Dancing Script', cursive; }
        .font-poppins { font-family: 'Poppins', sans-serif; }
        .font-lora { font-family: 'Lora', serif; }
        html { scroll-behavior: smooth; }
      `}</style>

      {/* CENA DO ROUBO */}
      <AnimatePresence>
        {showRobberyVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-black flex items-center justify-center"
          >
            <video
              src={robberyVideoFile}
              autoPlay
              playsInline
              className="w-full h-full object-cover" 
              onEnded={handleRobberyVideoEnded} 
            />
            <button 
              onClick={handleRobberyVideoEnded}
              className="absolute top-4 right-4 text-white/50 hover:text-white border border-white/20 px-3 py-1 rounded text-xs uppercase"
            >
              Pular
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed inset-0 z-0" style={{ background: 'radial-gradient(ellipse at center, #1a0505 0%, #0a0202 50%, #050101 100%)' }} />
      
      <SnowEffect /> 
      <GoldenParticles />
      <FloatingHearts />

      <AnimatePresence>
        {grinchPhase === 'running' && (
          <GrinchChase onCaught={handleGrinchCaught} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSuccessMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed top-10 left-1/2 -translate-x-1/2 z-[10000] bg-green-600 text-white px-8 py-4 rounded-full shadow-[0_0_30px_rgba(0,255,0,0.5)] font-bold text-xl flex items-center gap-2 backdrop-blur-md border-2 border-green-400"
          >
            <span>🎁</span> Você recuperou o presente! Boa!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10">
        <HeroSection />
        <CountdownTimer />
        
        <div className="mb-12">
          <RealisticGiftBox 
            stolenGiftId={stolenGiftId}
            onPhaseChange={handleGiftPhaseChange}
            onRevealBook={() => setShowBook(true)}
            onRevealLetter={() => setShowLetter(true)}
            onRevealVideo={() => setShowVideoModal(true)}
            onRevealAudible={() => setShowAudibleModal(true)} 
          />
        </div>

        <AnimatePresence>
          {showBook && (
            <motion.div
              ref={bookRef}
              className="scroll-mt-32 relative z-20"
              initial={{ opacity: 0, scale: 0, rotateY: 720, y: 100 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0, y: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 60, mass: 1, duration: 2 }}
            >
              <RealisticBook3D />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showLetter && (
            <motion.div
              ref={letterRef}
              className="scroll-mt-32 relative z-20"
              initial={{ opacity: 0, scale: 0, rotate: -15, y: 50 }}
              animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
              transition={{ type: "spring", damping: 12, stiffness: 120, delay: 0.2 }}
            >
              <LoveLetterReveal />
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="h-20" />

        <BookQuiz />

        <PandaShowcase />
        <PhotoGallery />
        <WishesTree />
        <RelationshipTimeline />
        <SpotifyPlaylist />
        <Card3D />

        {/* --- PANDA REBOLANDO ALEATÓRIO (GIF) --- */}
        {pandaPos && (
          <motion.div 
            className="absolute z-40 hidden md:block pointer-events-none" // pointer-events-none para não atrapalhar cliques
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            style={{ 
              top: pandaPos.top, 
              [pandaPos.side]: '5%', // Afastado um pouco da borda
            }}
          >
             <img 
               src={rebolandoGif} 
               alt="Panda Dançando" 
               className="w-32 h-32 md:w-48 md:h-48 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
             />
          </motion.div>
        )}

        <Footer />
        <ThreeTreeSection />
      </div>

      {/* --- COMPONENTE DE ALÍVIO (MODAL) --- */}
      <AnxietyRelief isOpen={showAnxietyRelief} onClose={() => setShowAnxietyRelief(false)} />

      {/* --- BOTÃO FLUTUANTE DE EMERGÊNCIA/CALMA --- */}
      <motion.button
        onClick={() => setShowAnxietyRelief(true)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="fixed bottom-4 left-4 z-50 bg-white/10 hover:bg-blue-500/30 backdrop-blur-md border border-white/20 text-white p-3 rounded-full shadow-lg group transition-all duration-300"
        title="Preciso de um momento de calma"
      >
        <div className="relative">
          <Sparkles className="w-6 h-6 text-blue-200 group-hover:text-white transition-colors" />
          {/* Efeito de pulso suave */}
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500 opacity-50"></span>
          </span>
        </div>
        <span className="absolute left-14 top-1/2 -translate-y-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Cantinho da Calma ☁️
        </span>
      </motion.button>
    </div>
  );
}
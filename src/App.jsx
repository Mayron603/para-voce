import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, RefreshCw, Key, ShieldCheck, Loader2 } from 'lucide-react';
import Home from './pages/Home';
import MusicPlayerWidget from './components/MusicPlayerWidget';
import DateChallenge from './components/DateChallenge';

// Importe as músicas
import music1 from './assets/Feliz Navidad.mp3';
import music2 from './assets/Natal Todo Dia.mp3';
import music3 from './assets/The Christmas Song.mp3';

const PLAYLIST = [
  { title: "Feliz Navidad", artist: "José Feliciano", src: music1 },
  { title: "Natal Todo Dia", artist: "Roupa Nova", src: music2 },
  { title: "The Christmas Song", artist: "Nat King Cole", src: music3 },
];

// --- COMPONENTE TELA DE ERRO (MODIFICADO COM O LOADING DE 14s) ---
const PrankSite = ({ onUnlockAttempt, requiredPassword, isVerifying }) => {
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [inputPassword, setInputPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // 1. Simula diagnóstico inicial
  const handleRetryClick = () => {
    setIsDiagnosing(true);
    setTimeout(() => {
      setIsDiagnosing(false);
      setShowPasswordInput(true);
    }, 2000);
  };

  // 2. Verifica a senha
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (inputPassword.toUpperCase() === requiredPassword.toUpperCase()) {
      // CHAMA A FUNÇÃO NO PAI QUE INICIA A MÚSICA E O TIMER DE 14s
      onUnlockAttempt(); 
    } else {
      setErrorMsg('ERRO: Credencial inválida. Acesso negado.');
      setInputPassword('');
    }
  };

  // SE ESTIVER NOS 14 SEGUNDOS DE VERIFICAÇÃO, MOSTRA ESSA TELA:
  if (isVerifying) {
    return (
      <div className="fixed inset-0 z-[99999] bg-[#202124] text-[#9aa0a6] font-sans flex flex-col items-center justify-center p-4">
         <motion.div 
           initial={{ opacity: 0 }} animate={{ opacity: 1 }}
           className="flex flex-col items-center max-w-md text-center"
         >
            <div className="relative mb-8">
               <ShieldCheck size={64} className="text-[#8ab4f8] animate-pulse" />
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-[-10px] border-t-2 border-[#8ab4f8] rounded-full w-[84px] h-[84px]"
               />
            </div>
            
            <h2 className="text-[#e8eaed] text-xl font-medium mb-2">Restabelecendo Conexão Segura</h2>
            <p className="text-sm text-[#9aa0a6] mb-8">Verificando credenciais e sincronizando pacotes...</p>
            
            {/* Barra de progresso falsa de 14s */}
            <div className="w-64 h-1 bg-[#3c4043] rounded-full overflow-hidden">
               <motion.div 
                 className="h-full bg-[#8ab4f8]"
                 initial={{ width: "0%" }}
                 animate={{ width: "100%" }}
                 transition={{ duration: 14, ease: "linear" }}
               />
            </div>
            <p className="mt-4 text-xs font-mono text-[#5f6368]">TLS_HANDSHAKE_IN_PROGRESS...</p>
         </motion.div>
      </div>
    );
  }

  // TELA PADRÃO DE ERRO
  return (
    <div className="fixed inset-0 z-[99999] bg-[#202124] text-[#9aa0a6] font-sans flex flex-col items-center justify-center p-4 text-left select-none">
      <div className="max-w-md w-full">
        <div className="mb-6">
           <WifiOff size={48} className="text-[#9aa0a6]" />
        </div>

        <h1 className="text-[#e8eaed] text-2xl font-medium mb-4">
          Não há conexão com a internet
        </h1>
        
        <div className="text-sm mb-6 leading-relaxed space-y-2">
          <p>Tente:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Verificar a data da sua primeira confissão.</li>
            <li>Conectar à rede do coração novamente.</li>
          </ul>
        </div>

        <p className="text-xs text-[#5f6368] mb-8 font-mono">
          ERR_HEARTBEAT_DISCONNECTED
        </p>

        {!showPasswordInput ? (
          <button 
            onClick={handleRetryClick}
            disabled={isDiagnosing}
            className="bg-[#8ab4f8] text-[#202124] px-6 py-2 rounded-[4px] font-medium text-sm hover:bg-[#aecbfa] transition-colors flex items-center gap-2 disabled:opacity-70"
          >
            {isDiagnosing ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Diagnosticando...
              </>
            ) : (
              "Tentar novamente"
            )}
          </button>
        ) : (
          <motion.form 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handlePasswordSubmit}
            className="bg-[#303134] p-4 rounded-md border border-[#5f6368]"
          >
            <p className="text-xs text-[#e8eaed] mb-2 flex items-center gap-2">
              <Key size={12} /> Chave de Recuperação:
            </p>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={inputPassword}
                onChange={(e) => setInputPassword(e.target.value)}
                placeholder="Insira a senha..."
                className="flex-1 bg-[#202124] border border-[#5f6368] rounded px-3 py-1 text-sm text-white outline-none focus:border-[#8ab4f8]"
                autoFocus
              />
              <button 
                type="submit"
                className="bg-[#8ab4f8] text-[#202124] px-4 py-1 rounded text-sm font-medium hover:bg-[#aecbfa]"
              >
                Reconectar
              </button>
            </div>
            {errorMsg && <p className="text-red-400 text-xs mt-2">{errorMsg}</p>}
          </motion.form>
        )}
      </div>
    </div>
  );
};

// --- APP PRINCIPAL ---
function App() {
  const [currentStage, setCurrentStage] = useState('calendar'); 
  const [unlockedPassword, setUnlockedPassword] = useState('');
  const [isVerifying, setIsVerifying] = useState(false); // Novo estado para os 14s
  
  const audioRef = useRef(new Audio(PLAYLIST[0].src)); 
  const [isPlaying, setIsPlaying] = useState(false);
  
  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = false;
    audio.volume = 0.5;
    audio.onended = () => { audio.play(); };
  }, []);

  const handleCalendarSuccess = (password) => {
    setUnlockedPassword(password);
    setCurrentStage('prank');
  };

  // QUANDO ELA COLOCA A SENHA CERTA NA TELA DE ERRO:
  const handlePrankUnlock = () => {
    // 1. Toca a música (intro)
    if (audioRef.current.paused) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(e => console.log("Erro play:", e));
    }

    // 2. Ativa o modo "Verificando..." na tela de erro
    setIsVerifying(true);

    // 3. Espera os 14 segundos da intro da música
    setTimeout(() => {
      // 4. Libera o site e remove a tela de erro
      setIsVerifying(false);
      setCurrentStage('site');
    }, 14000); // 14000ms = 14 segundos
  };

  return (
    <AnimatePresence mode="wait">
      
      {/* ESTÁGIO 1: CALENDÁRIO */}
      {currentStage === 'calendar' && (
        <motion.div key="stage-calendar" exit={{ opacity: 0 }}>
          <DateChallenge onSuccess={handleCalendarSuccess} />
        </motion.div>
      )}

      {/* ESTÁGIO 2: TELA DE ERRO (PRANK) */}
      {currentStage === 'prank' && (
        <motion.div 
          key="stage-prank" 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)', transition: { duration: 1.5 } }}
          className="fixed inset-0 z-50"
        >
          <PrankSite 
            requiredPassword={unlockedPassword} 
            onUnlockAttempt={handlePrankUnlock} 
            isVerifying={isVerifying} // Passamos o estado para mostrar o loading
          />
        </motion.div>
      )}

      {/* ESTÁGIO 3: SITE OFICIAL */}
      {currentStage === 'site' && (
        <motion.div
          key="stage-site"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="relative z-10 w-full min-h-screen"
        >
          <Home />
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
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Heart, ArrowRight, Lock, KeyRound, Sparkles } from 'lucide-react';

export default function DateChallenge({ onSuccess }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [showPasswordReveal, setShowPasswordReveal] = useState(false);
  const [error, setError] = useState(false);

  // --- CONFIGURAÇÃO ---
  const CORRECT_DATE = "2025-10-01"; // Data atualizada
  const REVEALED_PASSWORD = "我愛你"; // Senha revelada ao acertar a data

  const handleCheckDate = () => {
    if (selectedDate === CORRECT_DATE) {
      setShowPasswordReveal(true);
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-[#1a0505] to-black flex flex-col items-center justify-center p-4 text-white overflow-hidden">
      
      {/* Elementos de Fundo Decorativos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-[#8B0000]/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-[120px]" />
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
            className="absolute text-[#8B0000]/30"
            style={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`,
              transform: `scale(${0.5 + Math.random()})`
            }}
          >
            <Heart fill="currentColor" size={24 + Math.random() * 40} />
          </motion.div>
        ))}
      </div>

      {!showPasswordReveal ? (
        // --- TELA DO CALENDÁRIO ---
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-md w-full backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)]"
        >
          <div className="flex flex-col items-center mb-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-[#8B0000] to-[#500000] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-red-900/50 rotate-3 transform hover:rotate-0 transition-transform duration-500">
              <Calendar size={36} className="text-white drop-shadow-md" />
            </div>
            <h2 className="font-dancing text-4xl mb-3 text-transparent bg-clip-text bg-gradient-to-r from-red-100 to-red-300 drop-shadow-sm">
              Vamos ver se você se lembra...
            </h2>
            <p className="text-gray-300 font-poppins text-sm font-light tracking-wide">
              Quando nossos corações se abriram<br/>pela primeira vez?
            </p>
          </div>

          <div className="space-y-6">
            <div className="relative group">
              <input 
                type="date" 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-center text-white text-lg focus:border-[#8B0000]/50 focus:bg-black/40 focus:ring-1 focus:ring-[#8B0000]/50 outline-none transition-all placeholder-transparent appearance-none"
                style={{ colorScheme: 'dark' }}
              />
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-center gap-2 text-red-400 text-xs font-medium bg-red-900/20 py-2 rounded-lg border border-red-500/20"
              >
                <Lock size={12} /> Tente lembrar da dica...
              </motion.div>
            )}

            <motion.button 
              onClick={handleCheckDate}
              whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(139, 0, 0, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-[#8B0000] to-[#600000] text-white py-4 rounded-xl font-medium tracking-wide shadow-xl hover:shadow-red-900/20 transition-all flex items-center justify-center gap-2 group border border-white/5"
            >
              <Heart size={18} className="fill-white/20 group-hover:fill-white/40 transition-colors" /> 
              Confirmar Data
            </motion.button>

            <div className="mt-8 pt-6 border-t border-white/5 text-center relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#150a0a] px-3 text-[10px] text-gray-500 uppercase tracking-widest border border-white/5 rounded-full">
                Dica Secreta
              </div>
              <p className="text-[#C5A059] text-sm italic font-dancing mt-2">
                "Mês seguinte do meu aniversário..."
              </p>
            </div>
          </div>
        </motion.div>
      ) : (
        // --- TELA DA REVELAÇÃO DA SENHA ---
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full backdrop-blur-xl bg-[#2a2a2a]/80 p-10 rounded-3xl border border-[#C5A059]/30 shadow-[0_0_60px_rgba(197,160,89,0.15)] text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent opacity-50" />
          
          <motion.div 
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="w-20 h-20 mx-auto bg-[#C5A059]/10 rounded-full flex items-center justify-center mb-6 text-[#C5A059] border border-[#C5A059]/20"
          >
            <KeyRound size={40} />
          </motion.div>
          
          <h2 className="text-3xl font-bold text-white mb-2 font-dancing">Acesso Concedido</h2>
          <p className="text-gray-400 text-sm mb-8 leading-relaxed">
            Você desbloqueou a chave.<br/>Copie a senha abaixo para continuar.
          </p>

          <div className="bg-black/50 p-6 rounded-xl border border-dashed border-[#C5A059]/30 mb-8 relative group">
            <Sparkles className="absolute top-2 right-2 text-yellow-500/50 w-4 h-4 animate-pulse" />
            <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] mb-2">Vai nem traduzir? Eu traduzeria, sou curioso</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] mb-2">Senha de Acesso</p>
            <p className="text-4xl font-mono text-[#C5A059] tracking-[0.2em] font-bold select-all drop-shadow-lg">
              {REVEALED_PASSWORD}
            </p>
          </div>

          <button 
            onClick={() => onSuccess(REVEALED_PASSWORD)}
            className="w-full bg-[#C5A059] hover:bg-[#d6b066] text-[#1a0505] font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-yellow-900/20"
          >
            Continuar para o Site <ArrowRight size={20} />
          </button>
        </motion.div>
      )}
    </div>
  );
}
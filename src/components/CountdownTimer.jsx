import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// --- CORREÇÃO: TimeBlock movido para FORA do componente principal ---
const TimeBlock = ({ value, label, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ scale: 1.05, y: -5 }}
    className="flex flex-col items-center"
  >
    <div className="relative group">
      {/* Glow effect */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute -inset-2 bg-yellow-500/20 rounded-2xl blur-xl"
      />
      
      {/* Main block */}
      <div 
        className="relative w-24 h-28 md:w-32 md:h-36 rounded-2xl flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, #B3001B 0%, #8B0000 50%, #5c0011 100%)',
          boxShadow: '0 10px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
        }}
      >
        {/* Texture */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(255,255,255,0.05) 5px, rgba(255,255,255,0.05) 10px)',
        }} />
        
        {/* Inner shadow */}
        <div className="absolute inset-0 rounded-2xl" style={{
          boxShadow: 'inset 0 -5px 20px rgba(0,0,0,0.3)',
        }} />
        
        {/* Number */}
        <motion.span
          key={value}
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="text-4xl md:text-6xl font-bold text-white font-poppins relative z-10"
          style={{ textShadow: '0 0 20px rgba(255,215,0,0.5), 0 4px 8px rgba(0,0,0,0.3)' }}
        >
          {String(value).padStart(2, '0')}
        </motion.span>
        
        {/* Shine effect */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent rounded-t-2xl" />
      </div>
      
      {/* Golden border */}
      <div 
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          border: '2px solid rgba(255,215,0,0.3)',
        }}
      />
      
      {/* Sparkle */}
      <motion.div
        animate={{ opacity: [0, 1, 0], scale: [0.8, 1, 0.8] }}
        transition={{ duration: 2, repeat: Infinity, delay: delay * 2 }}
        className="absolute -top-2 -right-2 text-xl"
      >
        ✨
      </motion.div>
    </div>
    
    <span 
      className="mt-4 text-white/80 text-sm md:text-base font-poppins tracking-widest uppercase"
      style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
    >
      {label}
    </span>
  </motion.div>
);

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const christmas = new Date(now.getFullYear(), 11, 25);
      
      if (now > christmas) {
        christmas.setFullYear(christmas.getFullYear() + 1);
      }
      
      const difference = christmas - now;
      
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-950/50 to-transparent" />
      
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
            Contagem para o Natal
          </h2>
          <div className="flex items-center justify-center gap-3 text-yellow-300 text-xl">
            <span>🎄</span>
            <span className="font-poppins tracking-wider">25 de Dezembro</span>
            <span>🎄</span>
          </div>
        </motion.div>

        {/* Countdown blocks */}
        <div className="flex justify-center gap-4 md:gap-8 flex-wrap">
          <TimeBlock value={timeLeft.days} label="Dias" delay={0} />
          
          <motion.span 
            className="text-yellow-400 text-4xl md:text-5xl font-bold self-center hidden md:block"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            :
          </motion.span>
          
          <TimeBlock value={timeLeft.hours} label="Horas" delay={0.1} />
          
          <motion.span 
            className="text-yellow-400 text-4xl md:text-5xl font-bold self-center hidden md:block"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
          >
            :
          </motion.span>
          
          <TimeBlock value={timeLeft.minutes} label="Minutos" delay={0.2} />
          
          <motion.span 
            className="text-yellow-400 text-4xl md:text-5xl font-bold self-center hidden md:block"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
          >
            :
          </motion.span>
          
          <TimeBlock value={timeLeft.seconds} label="Segundos" delay={0.3} />
        </div>

        {/* Bottom message */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center font-dancing text-2xl md:text-3xl text-white/80"
          style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
        >
          Cada segundo mais perto de você ❤️
        </motion.p>
      </div>
    </section>
  );
}
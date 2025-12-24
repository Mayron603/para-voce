import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CinematicTitle() {
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  // Essa é a roteirização da brincadeira
  useEffect(() => {
    const sequence = async () => {
      // 1. Digita o nome "errado" ou formal
      await typeText("Feliz Navidad, Nayara");
      await wait(1500); // Espera a pessoa ler

      // 2. Apaga tudo
      await deleteText();
      await wait(500);

      // 3. Digita o "Ops..."
      await typeText("Ops...");
      await wait(1000); // Pausa cômica

      // 4. Apaga o "Ops..."
      await deleteText();
      await wait(500);

      // 5. Digita a frase final correta
      await typeText("Feliz Navidad, mi amor");
      setIsTyping(false); // Fim da animação
    };

    sequence();
  }, []);

  // Função auxiliar para digitar (adiciona letras)
  const typeText = async (fullText) => {
    for (let i = 0; i <= fullText.length; i++) {
      setText(fullText.slice(0, i));
      await wait(Math.random() * 50 + 100); // Velocidade de digitação variável (humana)
    }
  };

  // Função auxiliar para apagar (remove letras)
  const deleteText = async () => {
    await wait(300);
    // Pega o texto atual e vai tirando letra por letra
    const currentText = document.getElementById('cinematic-text')?.innerText || "";
    for (let i = currentText.length; i >= 0; i--) {
      setText(currentText.slice(0, i));
      await wait(50); // Apaga mais rápido que digita
    }
  };

  // Promessa simples para esperar o tempo
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <div className="relative text-center py-8 min-h-[200px] flex items-center justify-center">
      {/* Título Principal */}
      <h1 
        id="cinematic-text"
        className="font-dancing text-5xl md:text-7xl lg:text-8xl text-white mb-6 relative px-4"
      >
        {text.split('').map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block"
            style={{ 
              textShadow: '0 0 30px rgba(255, 215, 0, 0.5), 0 0 60px rgba(255, 215, 0, 0.3)',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}

        {/* Cursor piscando (Barra vertical |) */}
        {isTyping && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block text-yellow-400 ml-1"
            style={{ textShadow: '0 0 20px rgba(255,215,0,0.8)' }}
          >
            |
          </motion.span>
        )}
        
        {/* Efeito de brilho dourado passando (só aparece na frase final) */}
        {!isTyping && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{ 
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 3
            }}
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,215,0,0.4), transparent)',
            }}
          />
        )}
      </h1>
    </div>
  );
}
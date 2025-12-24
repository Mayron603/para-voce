import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Heart, Infinity } from 'lucide-react'; // Adicionei o ícone Infinity

// Certifique-se de ter esses arquivos na pasta 'src/assets/'
import pageFlipSound from '../assets/livro.mp3';
import writingSoundFile from '../assets/escrita.mp3';

// --- COMPONENTE DE DIGITAÇÃO INTELIGENTE ---
const TypewriterText = ({ 
  text, 
  isActive, 
  delay = 0, 
  speed = 80, 
  className = "", 
  soundEnabled = true,
  onComplete 
}) => {
  const [displayText, setDisplayText] = useState("");
  const audioRef = useRef(null);
  
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    audioRef.current = new Audio(writingSoundFile);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.05; 

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (!isActive) {
      setDisplayText("");
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      return;
    }

    timeoutRef.current = setTimeout(() => {
      let currentLength = 0;
      
      if (soundEnabled && audioRef.current) {
        audioRef.current.play().catch(e => {});
      }
      
      intervalRef.current = setInterval(() => {
        currentLength++;
        setDisplayText(text.slice(0, currentLength));
        
        if (currentLength >= text.length) {
          clearInterval(intervalRef.current);
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
          }
          if (onCompleteRef.current) {
            onCompleteRef.current();
          }
        }
      }, speed);

    }, delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [isActive, text, delay, speed, soundEnabled]);

  return <p className={className}>{displayText}</p>;
};

// --- DADOS DAS PÁGINAS ---
const pagesData = [
  // PÁGINA 1
  {
    front: {
      text: "Sei nem por onde começar, mas vou tentar… espero conseguir escrever e expressar tudo que estou pensando. Às vezes eu paro e fico lembrando como as coisas andaram né entre a gente... foi tão natural, que nem consigo descrever.\n\nTeve um momento em que eu já não conseguia mais guardar o que estava sentindo. Estava tão na cara que até Duda percebeu antes de você. E olha… que amiga, viu? Talvez, se não fosse ela, a gente não estaria tão próximo assim hoje."
    },
    back: {
      text: "Eu só queria dizer que eu me sinto tão bem ao seu lado. Inexplicável. Já te falei que me apeguei rápido, e é verdade… chega a ser doido, mas me sinto bem. Gosto muito de estar com você, gosto de conversar, rir, falar besteira… até quando estamos calados no Discord.\n\nUm silêncio vale mais que mil palavras, mas o importante é estar aqui."
    }
  },
  // PÁGINA 2
  {
    front: {
      text: "Até que hoje eu to inspirado, não são todos dias, estou emocionado escrevendo isso, sou bem emocional na verdade, por mais que não apareça e eu não demonstre tanto.\n\nE preciso te dizer uma coisa, adoro quando você está naqueles dias. Já te falei isso mil vezes e vou falar pela milésima primeira rs. Você sabe o que quero dizer… eu amo, no sentido bom, claro..\n\nJá não sei mais o que escrever, estou perdido, mas aproveitei que hoje estou inspirado."
    },
    back: {
      text: "Eu amo nossas calls de soninho. Me sinto tão perto de você, mesmo a quilômetros de distância. Me sinto acolhido, sinto que estou no lugar certo.\n\n Acordar e ouvir um bom dia seu… ou acordar e ver um simples “bom dia” seu. Pode parecer pequeno, insignificante, mas não é. Eu valorizo cada detalhe. \n\n Independente de tudo isso que estamos construindo, acima de tudo somos melhores amigos. E isso significa que você sempre vai poder contar comigo, seja nos dias bons ou ruins. Estou aqui porque eu quero, porque eu gosto de você, e porque você merece muito mais do que eu consigo oferecer."
    }
  },
  // PÁGINA 3
  {
    front: {
      text: "E por favor… pare de achar que é exploradora. Eu jamais pensaria isso de você. Eu sei quem você é.\n\nPode me dizer o que sente sem medo. Não estou aqui pra te julgar, muito ao contrário, estou aqui pra te acolher, te ajudar, do jeito que você merece.\n\nE já estava até me esquecendo… recebe esse presente como forma de gratidão por você ser exatamente você. Por existir na minha vida desse jeitinho único que só você tem.\n\n"
    },
    back: {
      text: "Eu estou aqui, pronto pra dividir qualquer peso contigo. Quero ser seu abrigo nos dias de tempestade e sua calmaria nas noites difíceis. \n\n Não importa o que aconteça. Eu tenho meus problemas, minhas falhas, minhas imperfeições… mas eu escolhi estar com você. E estou aqui por você.\n\nTalvez eu não seja o garoto dos seus sonhos. Eu tenho minhas inseguranças, e meu maior medo é te perder.\n\n Eu quero poder fazer o que nunca ninguém fez por você. Eu quero ser diferente.\n\n Mas a verdade é simples: eu me apaixonei por você."
    }
  },
  // PÁGINA 4
  {
    front: {
      text: "Não pelo corpo, não pela aparência.\nMe apaixonei por você. \n\n E sobre o nosso futuro… não tenho muito o que dizer, só que vou fazer de tudo pra dar certo. Disso você pode ter certeza. Inclusive nos seus estudos, nos seus sonhos, em tudo que você quiser construir. \n\n E nesse Natal, eu só quero que você se sinta bem. \n Que seu coração fique tranquilo, e que você consiga aproveitar bastante assistindo seu Grinch. \n E que você nunca duvide do quanto é especial."
    },
    back: {
      text: "Obrigado por deixar eu fazer parte da sua vida.\nObrigado por cada conversa, cada momento, cada detalhe nosso.\n\nEu espero, do fundo do coração, que este Natal te abrace com tudo o que existe de mais bonito…\ne que eu possa continuar te acompanhando, não só nesta época, mas em todos os Natais que a vida permitir.\n\nCom amor, Mayron ❤️"
    }
  },
  // PÁGINA 5 (A PÁGINA FINAL ESPECIAL)
  {
    front: {
      text: "FINAL_SPECIAL_PAGE" // Marcador especial para a lógica de renderização
    },
    back: {
      text: ""
    }
  }
];

export default function RealisticBook3D() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  const [leftPageFinished, setLeftPageFinished] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [audio] = useState(new Audio(pageFlipSound));

  useEffect(() => {
    audio.volume = 0.5;
    audio.load();
    setShowTitle(true);
  }, [audio]);

  const playPageSound = () => {
    if (!soundEnabled) return;
    try {
      audio.currentTime = 0;
      audio.play().catch(e => {});
    } catch (e) {}
  };

  const openBook = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    playPageSound();
    setIsOpen(true);
    setTimeout(() => {
      setCurrentPage(0);
      setIsAnimating(false);
    }, 800);
  };

  const closeBook = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    playPageSound();
    setCurrentPage(-1);
    setLeftPageFinished(false);
    setTimeout(() => {
      setIsOpen(false);
      setIsAnimating(false);
    }, 800);
  };

  const nextPage = () => {
    if (isAnimating || currentPage >= pagesData.length - 1) return;
    setIsAnimating(true);
    playPageSound();
    setLeftPageFinished(false);
    setCurrentPage(prev => prev + 1);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const prevPage = () => {
    if (isAnimating || currentPage <= 0) return;
    setIsAnimating(true);
    playPageSound();
    setLeftPageFinished(false);
    setCurrentPage(prev => prev - 1);
    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <section className="py-12 px-4 relative overflow-hidden min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-5xl mx-auto relative z-10 w-full flex flex-col items-center">
        
        {/* --- TÍTULO DO TOPO --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mb-10 relative min-h-[100px] flex flex-col items-center justify-center w-full"
        >
          <div className="font-dancing text-4xl md:text-5xl text-white mb-2" style={{ textShadow: '0 0 30px rgba(255,215,0,0.3)' }}>
            <TypewriterText 
              text="Espero que goste do presente..." 
              isActive={showTitle} 
              delay={500} 
              speed={80}
              soundEnabled={soundEnabled}
            />
          </div>
          
          <div className="text-yellow-300 font-poppins text-lg md:text-xl">
             <TypewriterText 
              text="Fiz com todo carinho!! ❤️" 
              isActive={showTitle} 
              delay={4000} 
              speed={80}
              soundEnabled={soundEnabled}
            />
          </div>
          
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="absolute top-0 right-0 md:right-20 p-2 text-white/40 hover:text-white/90 transition-colors rounded-full hover:bg-white/10"
            title={soundEnabled ? "Desativar som" : "Ativar som"}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </motion.div>

        {/* --- LIVRO 3D --- */}
        <div 
          className="flex justify-center items-center"
          style={{ perspective: '1500px' }}
        >
          <motion.div 
            className="relative"
            animate={{
              x: isOpen ? '0%' : '-25%' 
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ 
              transformStyle: 'preserve-3d',
              width: '90vw',
              maxWidth: '600px',
              height: '45vh',
              maxHeight: '400px',
              minHeight: '300px',
            }}
          >
            {/* Sombra do Livro */}
            <motion.div
              animate={{
                width: isOpen ? '90%' : '50%',
                opacity: isOpen ? 0.4 : 0.6,
                x: isOpen ? '-50%' : '0%', 
                left: isOpen ? '50%' : 'auto',
                right: isOpen ? 'auto' : '0'
              }}
              className="absolute -bottom-6 h-6 bg-black rounded-full blur-lg"
              style={{ filter: 'blur(15px)' }}
            />

            {/* Contra-Capa (Base Fixa) */}
            <div
              className="absolute rounded-md"
              style={{
                width: '50%',
                height: '100%',
                right: 0, 
                background: 'linear-gradient(135deg, #4a0404 0%, #2b0202 100%)',
                boxShadow: 'inset -5px 0 15px rgba(0,0,0,0.4)',
                transform: 'translateZ(-4px)',
              }}
            />

            {/* Miolo das Páginas (Fundo) */}
            {isOpen && (
              <div
                className="absolute rounded-r-sm"
                style={{
                  width: 'calc(50% - 4px)',
                  height: 'calc(100% - 8px)',
                  right: '2px', 
                  top: '4px',
                  background: 'linear-gradient(90deg, #e8e0d5 0%, #f5f0e8 10%, #faf8f5 100%)',
                  boxShadow: 'inset 5px 0 8px rgba(0,0,0,0.1)',
                  transform: 'translateZ(-2px)',
                }}
              />
            )}

            {/* PÁGINAS */}
            {isOpen && pagesData.map((page, index) => {
              const isFlipped = index < currentPage;
              const isFrontVisible = index === currentPage;
              const isBackVisible = index === currentPage - 1;
              const shouldStartFront = isFrontVisible && (index === 0 || leftPageFinished);
              const shouldStartBack = isBackVisible;

              // Verifica se é a última página para aplicar o estilo especial
              const isLastPage = index === pagesData.length - 1;

              return (
                <motion.div
                  key={index}
                  className="absolute cursor-pointer"
                  style={{
                    width: '50%',
                    height: '100%',
                    right: '0',
                    transformStyle: 'preserve-3d',
                    transformOrigin: 'left center',
                    zIndex: isFlipped ? (51 + index) : (pagesData.length - index),
                  }}
                  animate={{
                    rotateY: isFlipped ? -180 : 0,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.645, 0.045, 0.355, 1.000],
                  }}
                  onClick={() => {
                    if (isFrontVisible && !isAnimating) nextPage();
                  }}
                >
                  {/* Frente da Página */}
                  <div className="absolute inset-0 rounded-r-md overflow-hidden bg-white"
                    style={{
                      background: 'linear-gradient(90deg, #e8e0d5 0%, #faf8f5 5%, #ffffff 100%)',
                      backfaceVisibility: 'hidden',
                      boxShadow: isFrontVisible ? '4px 0 15px rgba(0,0,0,0.1)' : 'none',
                    }}
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-black/5 to-transparent pointer-events-none" />
                    
                    {/* CONTEÚDO DA PÁGINA */}
                    <div className="relative h-full flex flex-col p-6 md:p-8 overflow-hidden"> 
                      
                      {isLastPage ? (
                        // --- LAYOUT ESPECIAL DA ÚLTIMA PÁGINA ---
                        <div className="h-full flex flex-col items-center justify-center text-center border-4 border-double border-red-900/10 p-4 rounded-lg">
                             <motion.div 
                               initial={{ opacity: 0, scale: 0.8 }}
                               animate={shouldStartFront ? { opacity: 1, scale: 1 } : {}}
                               transition={{ delay: 0.5, duration: 1 }}
                               className="flex flex-col items-center"
                             >
                                <span className="font-poppins text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-4">
                                  E assim...
                                </span>
                                
                                <h2 className="font-dancing text-3xl md:text-4xl text-red-800 mb-2">
                                  Nossa História
                                </h2>
                                <h2 className="font-dancing text-4xl md:text-5xl text-red-600 font-bold mb-6">
                                  Continua...
                                </h2>

                                <div className="text-red-400 mb-6">
                                   <Infinity size={32} strokeWidth={1.5} />
                                </div>

                                <p className="font-poppins text-[9px] text-gray-400 italic">
                                  "O começo da nossa eternidade."
                                </p>
                             </motion.div>
                        </div>
                      ) : (
                        // --- LAYOUT PADRÃO DAS OUTRAS PÁGINAS ---
                        <>
                          <div className="flex-1 pr-1">
                            <TypewriterText 
                              key={`front-${index}`}
                              text={page.front.text} 
                              isActive={shouldStartFront}
                              delay={600} 
                              speed={80}
                              soundEnabled={soundEnabled}
                              className="font-poppins text-gray-700 text-[10px] md:text-xs leading-relaxed whitespace-pre-wrap text-justify" 
                            />
                          </div>
                          <div className="mt-4 text-center text-[8px] text-red-300">
                              {index === 0 && "Toque para virar →"}
                          </div>
                        </>
                      )}
                    </div>
                    
                    {!isLastPage && (
                      <div className="absolute bottom-3 right-4 text-[10px] text-gray-400 font-poppins">
                        {index * 2 + 1}
                      </div>
                    )}
                  </div>

                  {/* Verso da Página */}
                  <div className="absolute inset-0 rounded-l-md overflow-hidden bg-white"
                    style={{
                      background: 'linear-gradient(270deg, #e8e0d5 0%, #faf8f5 5%, #ffffff 100%)',
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                  >
                    <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-black/5 to-transparent pointer-events-none" />
                    
                    <div className="relative h-full flex flex-col p-6 md:p-8 overflow-hidden bg-gradient-to-l from-white to-gray-50/50">
                      
                      {/* O Verso da última página pode ser vazio ou ter um padrão simples */}
                      {isLastPage ? (
                         <div className="h-full flex items-center justify-center opacity-10">
                            <Heart size={60} />
                         </div>
                      ) : (
                        <>
                          <div className="flex-1 pr-1 pt-2">
                            <TypewriterText 
                              key={`back-${index}`}
                              text={page.back.text} 
                              isActive={shouldStartBack}
                              delay={800}
                              speed={80}
                              soundEnabled={soundEnabled}
                              onComplete={() => setLeftPageFinished(true)} 
                              className="font-poppins text-gray-700 text-[10px] md:text-xs leading-relaxed whitespace-pre-wrap text-justify italic" 
                            />
                          </div>
                          <div className="mt-4 text-center shrink-0">
                              <div className="text-red-800/20 text-lg">❧</div>
                          </div>
                        </>
                      )}
                    </div>
                    
                    {!isLastPage && (
                      <div className="absolute bottom-3 left-4 text-[10px] text-gray-400 font-poppins">
                        {index * 2 + 2}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}

            {/* CAPA DO LIVRO (Frente) */}
            <motion.div
              className="absolute cursor-pointer"
              style={{
                width: '50%',
                height: '100%',
                right: '0', 
                transformStyle: 'preserve-3d',
                transformOrigin: 'left center',
                zIndex: 50,
              }}
              animate={{
                rotateY: isOpen ? -180 : 0,
              }}
              transition={{
                duration: 0.8,
                ease: [0.645, 0.045, 0.355, 1.000],
              }}
              onClick={() => !isOpen && openBook()}
            >
              {/* EXTERIOR DA CAPA */}
              <div className="absolute inset-0 rounded-md overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #4a0404 0%, #720e1e 50%, #2b0202 100%)',
                  backfaceVisibility: 'hidden',
                  boxShadow: '5px 0 25px rgba(0,0,0,0.5), inset 0 0 50px rgba(0,0,0,0.6)',
                }}
              >
                <div className="absolute inset-0 opacity-40 mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />
                
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/40 via-transparent to-transparent z-10" />
                <div className="absolute left-2 top-0 bottom-0 w-[1px] bg-white/10 z-10 opacity-30" />
                <div className="absolute left-3 top-0 bottom-0 w-[2px] bg-black/30 z-10 blur-[1px]" />

                <div className="absolute inset-4 border-2 border-yellow-500/40 rounded-sm opacity-80" />
                <div className="absolute inset-5 border border-yellow-400/20 rounded-sm" />
                
                <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-yellow-500/60 rounded-tl-lg" />
                <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-yellow-500/60 rounded-tr-lg" />
                <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-yellow-500/60 rounded-bl-lg" />
                <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-yellow-500/60 rounded-br-lg" />

                <div className="relative h-full flex flex-col items-center justify-center p-6 text-center z-20">
                  <div className="mb-6 opacity-80">
                     <span className="text-4xl text-yellow-500/40 font-dancing"></span>
                  </div>
                  
                  <div className="relative">
                    <h3 className="font-dancing text-4xl md:text-5xl mb-2 font-bold tracking-wide"
                        style={{
                            background: 'linear-gradient(to bottom, #fbf5b7 0%, #bf953f 30%, #b38728 60%, #fbf5b7 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            filter: 'drop-shadow(0px 2px 0px rgba(0,0,0,0.5))'
                        }}
                    >
                      O Melhor Capítulo
                    </h3>
                    <h3 className="font-dancing text-2xl md:text-3xl font-bold"
                        style={{
                            background: 'linear-gradient(to bottom, #fbf5b7 0%, #bf953f 40%, #aa771c 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            filter: 'drop-shadow(0px 1px 0px rgba(0,0,0,0.5))'
                        }}
                    >
                      da Minha Vida
                    </h3>
                  </div>

                  <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent my-6" />

                  <p className="font-poppins text-[10px] text-yellow-500/60 uppercase tracking-[0.2em]">
                    Edição Especial de Natal
                  </p>
                </div>
              </div>

              {/* INTERIOR DA CAPA */}
              <div className="absolute inset-0 rounded-md overflow-hidden"
                style={{
                  background: 'linear-gradient(270deg, #2b0202 0%, #4a0404 100%)',
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  boxShadow: 'inset 0 0 30px rgba(0,0,0,0.6)' 
                }}
              >
                <div className="absolute inset-4 md:inset-6 bg-[#fdfbf7] shadow-[2px_2px_10px_rgba(0,0,0,0.3)] rotate-[-1deg] flex flex-col items-center justify-center p-4">
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.2' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3Ccircle cx='13' cy='13' r='1'/%3E%3C/g%3E%3C/svg%3E")` }} />
                  
                  <div className="absolute inset-2 border-2 border-double border-[#8b7355] opacity-60" />
                  <div className="absolute inset-3 border border-dashed border-[#8b7355] opacity-30" />

                  <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-[#8b7355] rounded-tl-sm opacity-50" />
                  <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[#8b7355] rounded-tr-sm opacity-50" />
                  <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-[#8b7355] rounded-bl-sm opacity-50" />
                  <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-[#8b7355] rounded-br-sm opacity-50" />

                  <div className="relative z-10 text-center flex flex-col items-center gap-2">
                     <span className="text-[#8b7355] text-xs font-poppins uppercase tracking-[0.3em] opacity-80">
                       Edição Especial
                     </span>
                     
                     <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#8b7355] to-transparent my-1 opacity-50" />
                     
                     <h4 className="font-poppins text-xs text-gray-500 uppercase tracking-widest mt-2">
                       Este livro pertence a
                     </h4>
                     
                     <h2 className="font-dancing text-3xl md:text-4xl text-[#5c0011] mt-1 mb-2 transform -rotate-2">
                       A chata que está lendo
                     </h2>

                     <p className="text-[10px] text-gray-400 font-poppins italic max-w-[80%] leading-relaxed">
                       "Que cada página deste livro te lembre do quanto você é amada."
                     </p>

                     <div className="mt-6 flex flex-col items-center">
                        <span className="text-[9px] text-gray-400 font-poppins uppercase tracking-widest mb-1">
                          Com amor
                        </span>
                        <div className="font-dancing text-xl text-[#2b0202]">
                          Mayron
                        </div>
                        <div className="w-12 h-[1px] bg-[#2b0202] mt-0.5 opacity-50" />
                     </div>
                     
                     <div className="absolute -bottom-2 -right-2 opacity-10 rotate-[-15deg] pointer-events-none">
                        <div className="border-4 border-[#5c0011] rounded-full w-20 h-20 flex items-center justify-center">
                          <span className="text-[#5c0011] font-bold text-[10px] uppercase">Natal 2025</span>
                        </div>
                     </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Lombada do Livro */}
            {!isOpen && (
              <div
                className="absolute rounded-l-sm"
                style={{
                  width: '8%',
                  height: '100%',
                  left: '50%',
                  transform: 'translateX(-100%) translateZ(2px)',
                  background: 'linear-gradient(90deg, #2b0202 0%, #5c0011 40%, #720e1e 50%, #5c0011 60%, #2b0202 100%)',
                  boxShadow: 'inset 0 0 10px rgba(0,0,0,0.6)',
                  zIndex: 49
                }}
              >
                <div className="absolute top-[10%] left-0 right-0 h-[2px] bg-yellow-600/30 shadow-[0_1px_1px_rgba(0,0,0,0.8)]" />
                <div className="absolute top-[30%] left-0 right-0 h-[2px] bg-yellow-600/30 shadow-[0_1px_1px_rgba(0,0,0,0.8)]" />
                <div className="absolute bottom-[30%] left-0 right-0 h-[2px] bg-yellow-600/30 shadow-[0_1px_1px_rgba(0,0,0,0.8)]" />
                <div className="absolute bottom-[10%] left-0 right-0 h-[2px] bg-yellow-600/30 shadow-[0_1px_1px_rgba(0,0,0,0.8)]" />

                <div className="h-full flex items-center justify-center">
                  <p 
                    className="font-dancing text-yellow-200/60 text-[10px] md:text-xs whitespace-nowrap tracking-widest"
                    style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}
                  >
                    Nosso Conto
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Botões de Navegação */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center gap-3 mt-6"
          >
            <button
              onClick={prevPage}
              disabled={currentPage <= 0 || isAnimating}
              className="px-4 py-2 bg-red-900/40 hover:bg-red-800/60 disabled:opacity-30 disabled:cursor-not-allowed text-yellow-100 font-poppins text-xs rounded-full transition-all border border-yellow-500/20 hover:border-yellow-500/40"
            >
              ← Anterior
            </button>
            <button
              onClick={closeBook}
              className="px-4 py-2 bg-yellow-600/20 hover:bg-yellow-600/40 text-yellow-100 font-poppins text-xs rounded-full transition-all border border-yellow-500/30"
            >
              Fechar Livro
            </button>
            <button
              onClick={nextPage}
              disabled={currentPage >= pagesData.length - 1 || isAnimating}
              className="px-4 py-2 bg-red-900/40 hover:bg-red-800/60 disabled:opacity-30 disabled:cursor-not-allowed text-yellow-100 font-poppins text-xs rounded-full transition-all border border-yellow-500/20 hover:border-yellow-500/40"
            >
              Próxima →
            </button>
          </motion.div>
        )}

        {/* Indicador de Páginas */}
        {isOpen && (
          <div className="flex justify-center gap-1.5 mt-3">
            {pagesData.map((_, idx) => (
              <div
                key={idx}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  idx === currentPage ? 'bg-yellow-500 scale-125' : 'bg-white/10'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
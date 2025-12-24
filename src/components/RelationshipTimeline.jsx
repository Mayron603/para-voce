import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Plane, MapPin, Gamepad2, Star } from 'lucide-react';

const timelineEvents = [
  {
    date: "Memorável",
    title: "O Ataque do Tubarão",
    description: "Lembra daquele jogo? O tubarão não parava de me morder! Foi entre risadas...",
    icon: Gamepad2,
    status: "past"
  },
  {
    date: "01 de Outubro de 2025",
    title: "Nossa Decisão",
    description: "O dia em que abrimos nossos corações de verdade. Conversamos sobre nós...",
    icon: Heart,
    status: "past"
  },
  {
    date: "Cada dia",
    title: "Conexão",
    description: "As mensagens de bom dia e a certeza de que você é a melhor notificação do meu celular.",
    icon: MessageCircle,
    status: "present"
  },
  {
    date: "Em breve...",
    title: "?",
    description: "",
    icon: MessageCircle,
    status: "future"
  },
  {
    date: "Em breve...",
    title: "?",
    description: "",
    icon: MessageCircle,
    status: "future"
  },
];

export default function RelationshipTimeline() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background sofisticado */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-950/20 to-transparent" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 
            className="font-dancing text-5xl md:text-6xl text-white mb-4 drop-shadow-lg"
          >
            Nossa História
          </h2>
          <p className="text-yellow-200/80 font-poppins text-lg font-light">
           ❤️
          </p>
        </motion.div>

        <div className="relative">
          {/* Linha Central Dourada Elegante */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2 bg-gradient-to-b from-transparent via-yellow-500/50 to-transparent">
            {/* Brilho da linha */}
            <div className="absolute inset-0 bg-yellow-400 blur-[2px] opacity-50" />
          </div>

          {timelineEvents.map((event, index) => {
            const Icon = event.icon;
            const isLeft = index % 2 === 0;
            const isFuture = event.status === "future";

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`relative flex items-center mb-20 ${
                  isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Ponto Central (Ícone) */}
                <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 z-20">
                  <div className={`relative w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                    isFuture 
                      ? 'bg-black/80 border-gray-600 text-gray-500 grayscale' 
                      : 'bg-black border-yellow-500 text-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.4)]'
                  }`}>
                    <Icon size={20} />
                  </div>
                </div>

                {/* Card de Conteúdo */}
                <div className={`ml-20 md:ml-0 md:w-5/12 ${isLeft ? 'md:pr-12 text-left md:text-right' : 'md:pl-12 text-left'}`}>
                  <div className={`group relative p-6 rounded-xl border transition-all duration-500 hover:scale-[1.02] ${
                    isFuture
                      ? 'bg-white/5 border-white/5'
                      : 'bg-gradient-to-br from-red-950/40 to-black/40 border-yellow-500/20 backdrop-blur-sm hover:border-yellow-500/40 hover:shadow-[0_5px_30px_rgba(234,179,8,0.1)]'
                  }`}>
                    
                    {/* Data */}
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-poppins tracking-wider mb-3 border ${
                      isFuture 
                        ? 'bg-white/5 text-gray-400 border-white/5' 
                        : 'bg-yellow-500/10 text-yellow-300 border-yellow-500/20'
                    } ${isLeft ? 'md:ml-auto' : ''}`}>
                      {event.date}
                    </div>

                    <h3 className={`font-dancing text-3xl mb-2 ${isFuture ? 'text-gray-400' : 'text-white'}`}>
                      {event.title}
                    </h3>
                    
                    <p className={`font-poppins text-sm leading-relaxed ${isFuture ? 'text-gray-500' : 'text-gray-300'}`}>
                      {event.description}
                    </p>

                    {/* Decoração sutil de canto */}
                    {!isFuture && (
                      <div className={`absolute top-0 w-20 h-20 bg-gradient-to-br from-yellow-500/10 to-transparent rounded-tl-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity ${
                        isLeft ? 'right-0 rotate-90' : 'left-0'
                      }`} />
                    )}
                  </div>
                </div>

                {/* Espaçador para o lado oposto */}
                <div className="hidden md:block md:w-5/12" />
              </motion.div>
            );
          })}
        </div>

        {/* Final da Linha */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <div className="inline-flex flex-col items-center gap-2">
            <div className="h-16 w-px bg-gradient-to-b from-yellow-500/50 to-transparent" />
            <Star className="text-yellow-500 w-6 h-6 animate-pulse" fill="currentColor" />
            <p className="text-yellow-200/50 text-xs font-poppins mt-2 tracking-widest uppercase">
              Continua...
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
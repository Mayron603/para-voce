import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Check, X, Lock, Unlock, Download, Library, ChevronRight, AlertTriangle, Calendar, Award, Tablet, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';

// --- IMPORTAÇÃO DOS ARQUIVOS DE PRÊMIO ---

// Prêmio 1: Sobre a Escrita (Um Caso Perdido)
import stephenPdf from '../assets/Stephen-King-Sobre-a-Escrita.pdf';
import stephenEpub from '../assets/Stephen-King-Sobre-a-Escrita.epub';

// Prêmio 2: Achados e Perdidos (O Pequeno Príncipe)
import achadosPdf from '../assets/Achados-e-perdidos-_Stephen-King-_King_-Stephen__-_Z-Library_.pdf';
import achadosEpub from '../assets/Achados e perdidos (Stephen King [King, Stephen]) (Z-Library).epub';

// Prêmio 3: Outsider (Imagina-me)
import outsiderPdf from '../assets/Outsider - Stephen King.pdf';
import outsiderEpub from '../assets/Outsider-Stephen-King.epub'; 

// Prêmio 4: Sob a Redoma (Meia-Noite)
import redomaPdf from '../assets/Sob-a-Redoma-Stephen-King.pdf';
import redomaEpub from '../assets/Sob-a-Redoma-Stephen-King.epub';

// Prêmio 5: Christine (Espectro)
import christinePdf from '../assets/Christine-Stephen-King.pdf';
import christineEpub from '../assets/Christine-Stephen-King.epub';

// --- NOVOS PRÊMIOS ---

// Prêmio 6: Amor em Roma (O Acordo)
import amorRomaPdf from '../assets/Amor-em-Roma-_Sarah-Adams_-_Z-Library_.pdf';
import amorRomaEpub from '../assets/Amor em Roma (Sarah Adams) (Z-Library).epub';

// Prêmio 7: Um Amor para Recordar (O Erro)
import amorRecordarPdf from '../assets/Um-amor-para-recordar-_Nicholas-Sparks_-_Z-Library_.pdf';
import amorRecordarEpub from '../assets/Um amor para recordar (Nicholas Sparks) (Z-Library).epub';

// Prêmio 8: Minha Melhor Parte (Minha Culpa)
import minhaMelhorPdf from '../assets/Minha-Melhor-Parte-_Hannah-Bonam-Young_-_Z-Library_.pdf';
import minhaMelhorEpub from '../assets/Minha Melhor Parte (Hannah Bonam-Young) (Z-Library).epub';

// Prêmio 9: O Amor (depois) da Minha Vida (Dois a Dois)
import amorDepoisPdf from '../assets/O-Amor-_depois_-da-Minha-Vida-_Kirsty-Greenwood_-_Z-Library_.pdf';
import amorDepoisEpub from '../assets/O Amor (depois) da Minha Vida (Kirsty Greenwood) (Z-Library).epub';

// Prêmio 10: Sapatilhas de Gelo (A Seleção)
import sapatilhasPdf from '../assets/Sapatilhas-de-gelo-_Babi-A.-Sette_-_Z-Library_.pdf';
import sapatilhasEpub from '../assets/Sapatilhas de gelo (Babi A. Sette) (Z-Library).epub';


// --- DADOS DOS LIVROS E PERGUNTAS ---
const BOOKS_DATA = [
  {
    id: 'hopeless',
    title: "Um Caso Perdido",
    author: "Colleen Hoover",
    readDate: "01/05/2025",
    readYear: 2025,
    color: "from-blue-400 to-blue-600",
    prizeName: "Sobre a Escrita (Stephen King)",
    pdfLink: stephenPdf,
    epubLink: stephenEpub,
    questions: [
      { q: "Qual é o verdadeiro nome da protagonista Sky?", options: ["Hope", "Faith", "Grace", "Destiny"], correct: 0 },
      { q: "Quem é a melhor amiga da Sky que viaja para a Europa?", options: ["Breckin", "Six", "Karen", "Lesley"], correct: 1 },
      { q: "O que Dean Holder tem tatuado no pulso?", options: ["Hope", "Hopeless", "Alive", "Forever"], correct: 1 },
      { q: "Qual o nome da irmã de Holder que faleceu?", options: ["Lesslie", "Hope", "Karen", "Sky"], correct: 0 },
      { q: "O que Sky descobre sobre sua adoção?", options: ["Foi legal", "Ela foi sequestrada", "Ela é orfã", "Seus pais morreram"], correct: 1 }
    ]
  },
  {
    id: 'prince',
    title: "O Pequeno Príncipe",
    author: "Antoine de Saint-Exupéry",
    readDate: "08/07/2025",
    readYear: 2025,
    color: "from-yellow-300 to-yellow-500",
    prizeName: "Achados e Perdidos (Stephen King)",
    pdfLink: achadosPdf,
    epubLink: achadosEpub,
    questions: [
      { q: "O que o príncipe pede para o aviador desenhar logo no início?", options: ["Uma rosa", "Um elefante", "Um carneiro", "Uma caixa"], correct: 2 },
      { q: "Quem ensina ao príncipe que 'tu te tornas eternamente responsável por aquilo que cativas'?", options: ["A Rosa", "A Raposa", "A Serpente", "O Rei"], correct: 1 },
      { q: "Em qual asteroide o Pequeno Príncipe vivia?", options: ["B-612", "C-3PO", "X-99", "Alpha Centauri"], correct: 0 },
      { q: "Quantos vulcões existem no planeta do Príncipe?", options: ["1", "2", "3", "4"], correct: 2 },
      { q: "Qual animal morde o Príncipe para ele voltar ao seu planeta?", options: ["Raposa", "Serpente", "Tigre", "Rosa"], correct: 1 }
    ]
  },
  {
    id: 'imagine',
    title: "Imagina-me",
    author: "Tahereh Mafi",
    readDate: "13/10/2022",
    readYear: 2022,
    color: "from-purple-500 to-pink-600",
    prizeName: "Outsider (Stephen King)",
    pdfLink: outsiderPdf,
    epubLink: outsiderEpub,
    questions: [
      { q: "Qual é a revelação chocante sobre a identidade da Juliette?", options: ["Ela é um robô", "Ela é irmã do Warner", "Seu nome é Ella", "Ela é alienígena"], correct: 2 },
      { q: "Com quem Juliette/Ella termina a saga (casamento)?", options: ["Adam", "Warner", "Kenji", "Ninguém"], correct: 1 },
      { q: "Qual presente simbólico Warner dá para Ella?", options: ["Um anel", "Uma adaga", "Cartas antigas", "Um vestido"], correct: 1 },
      { q: "Quem é a verdadeira irmã biológica de Juliette?", options: ["Nazeera", "Emmaline", "Sonya", "Sara"], correct: 1 },
      { q: "Qual a relação de Anderson com Warner?", options: ["Tio", "Pai", "Irmão", "Avô"], correct: 1 }
    ]
  },
  {
    id: 'vampire_meianoite',
    title: "Diários do Vampiro: Meia-Noite",
    author: "L. J. Smith",
    readDate: "09/11/2022",
    readYear: 2022,
    color: "from-indigo-600 to-purple-900",
    prizeName: "Sob a Redoma (Stephen King)",
    pdfLink: redomaPdf,
    epubLink: redomaEpub,
    questions: [
      { q: "Onde Damon estava aprisionado no início deste arco?", options: ["No Inferno", "Na Dimensão das Trevas", "Em Fell's Church", "Na Europa"], correct: 1 },
      { q: "Qual dupla de kitsunes (raposas) aterroriza a cidade?", options: ["Misao e Shinichi", "Klaus e Elijah", "Katherine e Elena", "Bonnie e Meredith"], correct: 0 },
      { q: "O que Elena precisa encontrar para salvar a cidade?", options: ["Uma estaca de carvalho", "A Bola Estelar (Starball)", "O anel do sol", "A verbena sagrada"], correct: 1 },
      { q: "Como Damon retorna à vida 'humana' (ou quase)?", options: ["Magia da Bonnie", "Sangue de Elena", "Ressuscitado pela Starball", "Ele nunca morreu"], correct: 2 },
      { q: "Quem se transforma em um ser sobrenatural para ajudar na batalha final?", options: ["Matt", "Meredith", "Sra. Flowers", "Caroline"], correct: 0 }
    ]
  },
  {
    id: 'vampire_espectro',
    title: "Diários do Vampiro: Espectro",
    author: "L. J. Smith",
    readDate: "05/12/2022",
    readYear: 2022,
    color: "from-red-700 to-red-950",
    prizeName: "Christine (Stephen King)",
    pdfLink: christinePdf,
    epubLink: christineEpub,
    questions: [
      { q: "Do que o vilão 'Espectro' se alimenta?", options: ["Sangue", "Medo", "Ciúmes/Inveja", "Alegria"], correct: 2 },
      { q: "De onde os personagens tinham acabado de voltar?", options: ["Da Dimensão das Trevas", "De Paris", "Do Outro Lado", "Da Tumba"], correct: 0 },
      { q: "Quem o Espectro manipula para tentar matar Elena?", options: ["Damon", "Matt", "Bonnie", "Stefan"], correct: 0 },
      { q: "Qual a principal característica física do Espectro?", options: ["Ele é invisível", "Ele tem olhos vermelhos", "Ele não tem rosto", "Ele é gigante"], correct: 0 },
      { q: "Como eles derrotam o Espectro?", options: ["Estaca no coração", "Queimando-o", "Revelando seus segredos/união", "Decapitando"], correct: 2 }
    ]
  },
  {
    id: 'deal',
    title: "O Acordo",
    author: "Elle Kennedy",
    readDate: "26/07/2021",
    readYear: 2021,
    color: "from-teal-400 to-teal-600",
    prizeName: "Amor em Roma (Sarah Adams)",
    pdfLink: amorRomaPdf,
    epubLink: amorRomaEpub,
    questions: [
      { q: "Qual é a troca principal do acordo entre Hannah e Garrett?", options: ["Aulas de patinação por encontros", "Aulas de Ética por ajuda para conquistar outro cara", "Dinheiro por notas altas", "Limpar o apartamento por ingressos"], correct: 1 },
      { q: "Qual é o talento secreto de Hannah?", options: ["Pintura", "Canto/Música", "Dança", "Culinária"], correct: 1 },
      { q: "Quem é o jogador de futebol que Hannah queria conquistar inicialmente?", options: ["Justin", "Kohler", "Dean", "Fitz"], correct: 0 },
      { q: "Qual é o trauma familiar que Garrett esconde?", options: ["Perdeu a mãe cedo", "Pai abusivo fisicamente", "Acidente de carro", "Foi expulso de casa"], correct: 1 },
      { q: "O que Garrett faz no final para provar seu amor?", options: ["Canta no palco", "Escreve uma carta", "Enfrenta o pai e se declara na frente de todos", "Faz uma tatuagem"], correct: 2 }
    ]
  },
  {
    id: 'mistake',
    title: "O Erro",
    author: "Elle Kennedy",
    readDate: "16/10/2022",
    readYear: 2022,
    color: "from-green-400 to-emerald-600",
    prizeName: "Um Amor para Recordar (Nicholas Sparks)",
    pdfLink: amorRecordarPdf,
    epubLink: amorRecordarEpub,
    questions: [
      { q: "Como Logan e Grace se conhecem pela primeira vez?", options: ["Na aula de psicologia", "Ele entra no quarto errado do dormitório", "Em uma festa da fraternidade", "Na pista de gelo"], correct: 1 },
      { q: "Qual foi o 'erro' estúpido de Logan com Grace?", options: ["Traiu ela", "Disse que estava apaixonado pela namorada do amigo", "Esqueceu o nome dela", "Vazou fotos dela"], correct: 1 },
      { q: "O que Grace faz para 'punir' Logan quando ele tenta reconquistá-la?", options: ["Finge que não o conhece", "Faz ele cumprir uma lista de tarefas humilhantes", "Namora o melhor amigo dele", "Muda de faculdade"], correct: 1 },
      { q: "Qual é o medo de Logan em relação ao futuro após a faculdade?", options: ["Não ser draftado", "Ter que trabalhar na oficina do pai alcoólatra", "Se machucar e perder a carreira", "Casar jovem"], correct: 1 },
      { q: "Quem é o melhor amigo de Logan que tenta colocar juízo nele?", options: ["Garrett", "Dean", "Tucker", "Fitzy"], correct: 0 }
    ]
  },
  {
    id: 'minha_culpa',
    title: "Minha Culpa",
    author: "Mercedes Ron",
    readDate: "2023",
    readYear: 2023,
    color: "from-orange-500 to-red-500",
    prizeName: "Minha Melhor Parte (Hannah Bonam-Young)",
    pdfLink: minhaMelhorPdf,
    epubLink: minhaMelhorEpub,
    questions: [
      { q: "Qual é o nome da protagonista que se muda para a mansão Leister?", options: ["Noah", "Nick", "Jenna", "Lion"], correct: 0 },
      { q: "Qual é o segredo de Nick que Noah descobre?", options: ["Ele é um agente secreto", "Ele participa de corridas ilegais", "Ele é um vampiro", "Ele é adotado"], correct: 1 },
      { q: "Como é a relação inicial entre Noah e Nick?", options: ["Amor à primeira vista", "Indiferença", "Ódio mútuo", "Amizade colorida"], correct: 2 },
      { q: "Quem é Dan?", options: ["Pai de Noah", "Namorado de Noah", "Melhor amigo de Nick", "Inimigo de Nick"], correct: 1 },
      { q: "Onde Noah e Nick ficam presos juntos pela primeira vez?", options: ["No elevador", "Em uma festa", "No carro", "Na escola"], correct: 1 }
    ]
  },
  {
    id: 'dois_a_dois',
    title: "Dois a Dois",
    author: "Nicholas Sparks",
    readDate: "2023",
    readYear: 2023,
    color: "from-sky-400 to-blue-300",
    prizeName: "O Amor (depois) da Minha Vida",
    pdfLink: amorDepoisPdf,
    epubLink: amorDepoisEpub,
    questions: [
      { q: "Qual é a profissão de Russell Green no início do livro?", options: ["Advogado", "Publicitário", "Médico", "Arquiteto"], correct: 1 },
      { q: "Quem é London na vida de Russell?", options: ["Sua esposa", "Sua irmã", "Sua filha", "Sua mãe"], correct: 2 },
      { q: "Por que o casamento de Russell e Vivian termina?", options: ["Ela se muda para outro país", "Ele a trai", "Ela se apaixona pelo chefe/trabalho", "Problemas financeiros"], correct: 2 },
      { q: "Quem ajuda Russell a cuidar de London e se reerguer?", options: ["Marge (irmã)", "Vivian", "Seu pai", "Ninguém"], correct: 0 },
      { q: "Qual é o nome da ex-namorada que reaparece na vida de Russell?", options: ["Emily", "Sarah", "Kate", "Julia"], correct: 0 }
    ]
  },
  {
    id: 'selecao',
    title: "A Seleção",
    author: "Kiera Cass",
    readDate: "2023",
    readYear: 2023,
    color: "from-cyan-300 to-blue-400",
    prizeName: "Sapatilhas de Gelo (Babi A. Sette)",
    pdfLink: sapatilhasPdf,
    epubLink: sapatilhasEpub,
    questions: [
      { q: "Qual é a casta de America Singer no início do livro?", options: ["Um", "Três", "Cinco", "Oito"], correct: 2 },
      { q: "Quem é o primeiro amor de America?", options: ["Maxon", "Aspen", "Kriss", "Carter"], correct: 1 },
      { q: "Para que serve 'A Seleção'?", options: ["Escolher a nova rainha", "Recrutar soldados", "Escolher a cozinheira real", "Um reality show de talentos"], correct: 0 },
      { q: "Como America e Maxon se conhecem?", options: ["No jardim", "Ela tenta fugir e esbarra nele", "No salão principal", "Ele a vê cantando"], correct: 1 },
      { q: "Qual o apelido que America dá a Maxon no começo?", options: ["Vossa Majestade", "Riquinho", "Superficial", "Querido"], correct: 2 }
    ]
  }
];

export default function BookQuiz() {
  const [activeBook, setActiveBook] = useState(null);
  
  // 1. LER DO LOCALSTORAGE AO INICIAR
  const [unlockedBooks, setUnlockedBooks] = useState(() => {
    // Tenta ler do localStorage, se não existir, começa vazio
    const saved = localStorage.getItem('unlockedBooks');
    return saved ? JSON.parse(saved) : [];
  });

  // 2. SALVAR NO LOCALSTORAGE QUANDO MUDAR
  React.useEffect(() => {
    localStorage.setItem('unlockedBooks', JSON.stringify(unlockedBooks));
  }, [unlockedBooks]);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizState, setQuizState] = useState('playing'); // playing, won, lost, downloads
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const startQuiz = (book) => {
    setActiveBook(book);
    
    // Se já estiver desbloqueado, vai direto para a tela de downloads
    if (unlockedBooks.includes(book.id)) {
      setQuizState('downloads');
    } else {
      setCurrentQuestionIndex(0);
      setScore(0);
      setQuizState('playing');
      setFeedback(null);
      setSelectedOption(null);
    }
  };

  const handleOptionClick = (index) => {
    if (feedback) return;
    setSelectedOption(index);

    const isCorrect = index === activeBook.questions[currentQuestionIndex].correct;
    
    if (isCorrect) {
      setFeedback('correct');
      setScore(prev => prev + 1);
      confetti({ particleCount: 30, spread: 40, origin: { y: 0.7 } });
    } else {
      setFeedback('wrong');
    }

    setTimeout(() => {
      if (currentQuestionIndex < 4) {
        setCurrentQuestionIndex(prev => prev + 1);
        setFeedback(null);
        setSelectedOption(null);
      } else {
        finishQuiz(isCorrect ? score + 1 : score);
      }
    }, 1200);
  };

  const finishQuiz = (finalScore) => {
    if (finalScore >= 3) {
      setQuizState('won');
      setUnlockedBooks(prev => {
        const newUnlocked = [...prev, activeBook.id];
        // O useEffect vai salvar automaticamente
        return newUnlocked;
      });
      confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
    } else {
      setQuizState('lost');
    }
  };

  // Componente de Botões de Download (Reutilizável)
  const DownloadButtons = ({ book }) => (
    <div className="flex flex-col gap-2 w-full">
      <a 
        href={book.pdfLink} 
        target="_blank" rel="noreferrer" 
        className="w-full py-2 bg-red-600/20 text-red-400 rounded-lg text-xs font-bold flex items-center justify-center gap-2 border border-red-500/30 hover:bg-red-600/30 transition-all"
      >
        <FileText size={16} /> Baixar PDF
      </a>
      
      {/* Se tiver EPUB, mostra botão extra */}
      {book.epubLink && (
        <a 
          href={book.epubLink} 
          target="_blank" rel="noreferrer" 
          className="w-full py-2 bg-orange-600/20 text-orange-400 rounded-lg text-xs font-bold flex items-center justify-center gap-2 border border-orange-500/30 hover:bg-orange-600/30 transition-all"
        >
          <Tablet size={16} /> Baixar Kindle (Epub)
        </a>
      )}
    </div>
  );

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      
      {/* FUNDO MESCLADO */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(15, 23, 42, 0.6) 0%, rgba(10, 2, 2, 0) 70%)',
          maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)'
        }}
      />
      
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 1px, transparent 1px)', backgroundSize: '30px 30px' }} 
      />

      <div className="max-w-6xl mx-auto relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-4">
            <div className="bg-blue-900/20 p-4 rounded-full border border-blue-500/20 shadow-[0_0_40px_rgba(59,130,246,0.15)]">
              <Library className="w-10 h-10 text-blue-300" />
            </div>
          </div>
          <h2 className="font-dancing text-5xl text-white mb-2 drop-shadow-lg">Desafio dos Livros</h2>
          <p className="text-blue-200/60 font-poppins text-sm tracking-wide">
            Prove que você leu para desbloquear seus presentes 📚
          </p>
        </motion.div>

        {/* --- GRID DE LIVROS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {BOOKS_DATA.map((book) => {
            const isUnlocked = unlockedBooks.includes(book.id);
            
            return (
              <motion.div
                key={book.id}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`relative rounded-xl p-5 border transition-all cursor-pointer overflow-hidden group min-h-[320px] flex flex-col justify-between backdrop-blur-sm
                  ${isUnlocked 
                    ? 'bg-gradient-to-b from-green-900/40 to-black/60 border-green-500/30 shadow-[0_0_25px_rgba(34,197,94,0.1)]' 
                    : 'bg-gradient-to-b from-slate-900/40 to-black/60 border-white/5 hover:border-blue-400/30 hover:shadow-[0_0_25px_rgba(59,130,246,0.1)]'
                  }`}
                onClick={() => startQuiz(book)}
              >
                {/* Brilho interno */}
                <div className={`absolute inset-0 bg-gradient-to-br ${book.color} opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500`} />

                <div>
                  <div className="flex justify-between items-start mb-4">
                    <BookOpen className={`w-6 h-6 ${isUnlocked ? 'text-green-400' : 'text-blue-300/80'}`} />
                    {isUnlocked ? <Unlock size={18} className="text-green-400" /> : <Lock size={18} className="text-gray-600 group-hover:text-blue-400/70 transition-colors" />}
                  </div>
                  
                  <div className="flex items-center gap-1 text-[10px] text-gray-400 mb-3 font-poppins bg-black/40 w-fit px-2 py-1 rounded-full border border-white/5">
                    <Calendar size={10} />
                    {book.readDate}
                  </div>

                  <h3 className="text-lg font-bold text-gray-100 mb-1 leading-tight min-h-[50px] group-hover:text-white transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">{book.author}</p>
                </div>

                <div className="mt-4 space-y-2 relative z-10">
                  {isUnlocked ? (
                    <div className="text-center">
                       <p className="text-[10px] text-green-400 mb-1 font-bold uppercase tracking-wider">Desbloqueado</p>
                       
                       {/* NOME DO PRÊMIO NO CARD */}
                       <p className="text-xs text-yellow-300 font-dancing mb-3 leading-tight">
                         {book.prizeName}
                       </p>

                       <div className="opacity-50 group-hover:opacity-100 transition-opacity">
                         <DownloadButtons book={book} />
                       </div>
                    </div>
                  ) : (
                    <button className="w-full py-2 bg-white/5 text-gray-300 rounded-lg text-xs font-bold flex items-center justify-center gap-2 group-hover:bg-blue-600/80 group-hover:text-white transition-all border border-white/5 group-hover:border-blue-500/50">
                      Iniciar Quiz <ChevronRight size={14} />
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* --- MODAL DO QUIZ --- */}
        <AnimatePresence>
          {activeBook && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
              onClick={() => { if(quizState !== 'playing') setActiveBook(null); }}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#0f172a] border border-blue-500/20 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl relative"
              >
                
                {quizState === 'playing' && (
                  <>
                    <div className="h-1 bg-gray-800 w-full">
                      <motion.div 
                        className={`h-full bg-gradient-to-r ${activeBook.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentQuestionIndex) / 5) * 100}%` }}
                      />
                    </div>

                    <div className="p-8">
                      <button 
                        onClick={() => setActiveBook(null)}
                        className="absolute top-4 right-4 text-gray-500 hover:text-white"
                      >
                        <X size={24} />
                      </button>

                      <div className="mb-6">
                        <span className="text-xs font-bold text-blue-400 uppercase tracking-widest flex items-center gap-2">
                          <BookOpen size={14} /> {activeBook.title}
                        </span>
                        <h3 className="text-xl text-white font-bold mt-3 leading-relaxed">
                          {activeBook.questions[currentQuestionIndex].q}
                        </h3>
                      </div>

                      <div className="space-y-3">
                        {activeBook.questions[currentQuestionIndex].options.map((option, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleOptionClick(idx)}
                            disabled={!!feedback}
                            className={`w-full p-4 rounded-xl text-left font-poppins text-sm transition-all duration-200 flex items-center justify-between border ${
                              selectedOption === idx
                                ? feedback === 'correct' 
                                  ? 'bg-green-500/20 border-green-500 text-green-100'
                                  : feedback === 'wrong'
                                    ? 'bg-red-500/20 border-red-500 text-red-100'
                                    : 'bg-white/10 border-white/30 text-white'
                                : 'bg-white/5 border-white/5 text-gray-300 hover:bg-white/10'
                            }`}
                          >
                            {option}
                            {selectedOption === idx && feedback === 'correct' && <Check size={18} className="text-green-400" />}
                            {selectedOption === idx && feedback === 'wrong' && <X size={18} className="text-red-400" />}
                          </button>
                        ))}
                      </div>

                      <div className="mt-6 flex justify-between text-xs text-gray-500">
                        <span>Pergunta {currentQuestionIndex + 1} de 5</span>
                        <span>Acertos: {score}</span>
                      </div>
                    </div>
                  </>
                )}

                {/* ESTADO: VITÓRIA OU JÁ DESBLOQUEADO */}
                {(quizState === 'won' || quizState === 'downloads') && (
                  <div className="p-8 text-center bg-gradient-to-b from-[#0f172a] to-green-900/20">
                     <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(34,197,94,0.5)]">
                       <Award className="w-10 h-10 text-white" />
                     </motion.div>
                     
                     <h3 className="text-2xl text-white font-bold mb-2">
                        {quizState === 'won' ? 'Parabéns! 🎉' : 'Já Desbloqueado!'}
                     </h3>
                     
                     <div className="mb-6">
                        <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">
                          {quizState === 'won' ? 'Você desbloqueou:' : 'Seu prêmio:'}
                        </p>
                        <p className="text-xl md:text-2xl font-bold text-yellow-400 font-dancing leading-relaxed">
                          {activeBook.prizeName || activeBook.title}
                        </p>
                     </div>
                     
                     <p className="text-gray-300 mb-6 text-sm">
                       {quizState === 'won' 
                         ? `Você acertou ${score} de 5 perguntas! Aproveite.` 
                         : `Você já garantiu este prêmio.`}
                     </p>
                     
                     {/* ÁREA DE DOWNLOADS NO MODAL */}
                     <div className="max-w-xs mx-auto space-y-3">
                        <DownloadButtons book={activeBook} />
                     </div>

                     <button onClick={() => setActiveBook(null)} className="block w-full mt-6 text-gray-500 text-sm hover:text-white">
                       Fechar
                     </button>
                  </div>
                )}

                {/* ESTADO: DERROTA */}
                {quizState === 'lost' && (
                  <div className="p-8 text-center bg-gradient-to-b from-[#0f172a] to-red-900/20">
                     <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(239,68,68,0.5)]">
                       <X className="w-10 h-10 text-white" />
                     </motion.div>
                     <h3 className="text-2xl text-white font-bold mb-2">Poxa vida... 😢</h3>
                     <p className="text-gray-300 mb-6 text-sm">
                       Você acertou apenas {score} de 5. Precisa de pelo menos 3 para desbloquear.<br/>
                       Tente lembrar dos detalhes!
                     </p>
                     <button onClick={() => startQuiz(activeBook)} className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-full transition-all border border-white/10">
                       <Library size={18} /> Tentar Novamente
                     </button>
                  </div>
                )}

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
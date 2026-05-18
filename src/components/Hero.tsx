import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, animate } from "motion/react";
import { Sparkles, PlayCircle, Zap, RefreshCw, Pause } from "lucide-react";

interface HeroProps {
  onOpenWizard?: (movieTitle?: string) => void;
}

const featuredMovies = [
  {
    title: "Project Hail Mary",
    tag: "CIENCIA FICCIÓN // ESTRENO 2026",
    image: "/peliculas 2026/hail_mary.jpg",
    glowColor: "rgba(0, 240, 255, 0.65)", // Cian
    croMessage: "🛰️ ESTRENO MAYO 2026 // ¿Vas a pagar otra suscripción mensual de 19,99€ solo para ver este estreno espacial, o prefieres configurar tu Stremio en 30 segundos con un único pago para toda la vida?",
  },
  {
    title: "The Boys: Season 5",
    tag: "ACCIÓN // SÁTIRA (2026)",
    image: "/peliculas 2026/the_boys.jpg",
    glowColor: "rgba(173, 0, 255, 0.65)", // Morado
    croMessage: "🩸 TEMPORADA FINAL // Olvídate de los anuncios obligatorios y el buffering molesto. Optimiza tu Stremio hoy y disfruta el estreno sin límites de ancho de banda y en Full HD real.",
  },
  {
    title: "Avatar: Fuego y Ceniza",
    tag: "AVENTURA // SCI-FI (2026)",
    image: "/peliculas 2026/avatar.jpg",
    glowColor: "rgba(255, 85, 0, 0.65)", // Volcanic Orange
    croMessage: "🔥 AVATAR: FUEGO Y CENIZA // ¿Seguirás pagando suscripciones caras de streaming solo para ver los últimos estrenos en 1080p falso? Configura tu Stremio hoy y vívelo en calidad cinematográfica real sin límites.",
  },
  {
    title: "Nemesis",
    tag: "ACCIÓN // CYBERPUNK (2026)",
    image: "/peliculas 2026/nemesis.jpg",
    glowColor: "rgba(220, 20, 60, 0.65)", // Rojo
    croMessage: "⚔️ ESTRENO EXCLUSIVO // Deja de alquilar películas individuales o esperar meses a que lleguen a tu país. Configura tu biblioteca unificada ahora mismo.",
  },
];

export default function Hero({ onOpenWizard }: HeroProps) {
  const [isMobile, setIsMobile] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Valores base para el carrusel rotativo
  const rotationY = useMotionValue(0);
  
  // Físicas muy suaves para el arrastre y giro del cilindro 3D
  const springConfig = { damping: 22, stiffness: 90, mass: 0.8 };
  const smoothRotation = useSpring(rotationY, springConfig);

  // Valores para fondo ambiental
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Animación infinita continua si NO está pausada por click
  useEffect(() => {
    if (isMobile || isPaused) return;
    
    // Iniciar rotación continua lineal
    const animation = animate(rotationY, rotationY.get() - 360, {
      duration: 40,
      ease: "linear",
      repeat: Infinity,
    });
    
    return () => animation?.stop();
  }, [isPaused, rotationY, isMobile]);

  // Actualizar el Active Index para el CRO Message
  useEffect(() => {
    if (isMobile) return;
    
    const unsubscribe = smoothRotation.on("change", (latestRotation) => {
      // Normalizar rotación para encontrar el índice frontal (0 a 3)
      const normalizedRot = ((latestRotation % 360) + 360) % 360;
      let index = Math.round((360 - normalizedRot) / 90) % 4;
      if (index < 0) index += 4;
      setActiveIndex(index);
    });
    
    return () => unsubscribe();
  }, [smoothRotation, isMobile]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleDrag = (e: any, info: any) => {
    // Si arrastra, pausamos la rotación continua automática
    setIsPaused(true);
    rotationY.set(rotationY.get() + info.delta.x * 0.4);
  };

  const handleCardClick = (idx: number) => {
    if (isMobile) {
      onOpenWizard?.(featuredMovies[idx].title);
      return;
    }

    // Si ya está pausado y damos click exactamente en la que está activa (al frente), reanudamos rotación
    if (isPaused && activeIndex === idx) {
      setIsPaused(false);
      return;
    }

    // Pausar y traer esta tarjeta al frente
    setIsPaused(true);
    setActiveIndex(idx);

    const currentRot = rotationY.get();
    const targetAngle = -idx * 90;

    // Encontrar el camino más corto (menor diferencia de ángulos)
    const difference = ((targetAngle - currentRot + 180) % 360) - 180;
    const targetRot = currentRot + difference;

    animate(rotationY, targetRot, {
      type: "spring",
      stiffness: 90,
      damping: 20,
    });
  };

  const activeMovie = featuredMovies[activeIndex];

  return (
    <section id="inicio" className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-16 overflow-hidden">
      {/* 🌌 FONDO DE ESPACIO PROFUNDO */}
      <div className="absolute inset-0 bg-transparent -z-30" />
      
      {/* Auroras Ambientales */}
      <motion.div 
        animate={{ x: [0, 30, -30, 0], y: [0, -50, 30, 0], scale: [1, 1.1, 0.9, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-10 w-[550px] h-[550px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-20"
      />
      <motion.div 
        animate={{ x: [0, -40, 20, 0], y: [0, 40, -30, 0], scale: [1, 0.95, 1.05, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[150px] pointer-events-none -z-20"
      />

      <div className="container mx-auto relative z-10 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl flex flex-col items-center mb-10"
        >
          {/* Badge Contextual */}
          <div className="flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md relative overflow-hidden shadow-[0_0_30px_rgba(0,240,255,0.06)]">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping" />
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] absolute" />
            <span className="text-[#00F0FF] text-[10px] md:text-xs font-black tracking-[0.25em] uppercase font-mono">
              ● ONVIVO SETUP PREMIUM 100% AUTÓNOMO
            </span>
          </div>
          
          {/* Título Monumental */}
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 leading-[0.92] uppercase">
            <span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.18)] block mb-1">CINE PERSONAL</span>
            <span className="bg-gradient-to-r from-[#00F0FF] via-[#AD00FF] to-[#FF007A] text-transparent bg-clip-text drop-shadow-[0_0_35px_rgba(0,240,255,0.32)] block">
              SIN COMPLICACIONES
            </span>
          </h1>
          
          <p className="max-w-2xl text-white/70 text-sm md:text-base mb-6 leading-relaxed font-normal">
            Configuramos tu entorno Stremio de manera profesional en segundos. Accede a los estrenos mundiales de 2026 en Full HD nativo y sin geobloqueos.
          </p>
        </motion.div>

        {/* ------------------------------------------------------------- */}
        {/* 🔥 CILINDRO HOLOGRÁFICO 3D (Desktop) o Lista Normal (Mobile) */}
        {/* ------------------------------------------------------------- */}
        
        {isMobile ? (
          /* Vista Mobile Plana */
          <div className="w-full flex flex-col gap-6">
            {featuredMovies.map((movie, idx) => (
              <div key={idx} className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 flex flex-col gap-4">
                <img src={movie.image} alt={movie.title} className="w-full h-48 object-cover rounded-xl" />
                <h3 className="text-white font-bold text-xl">{movie.title}</h3>
                <p className="text-white/60 text-xs italic">"{movie.croMessage}"</p>
                <button 
                  onClick={() => onOpenWizard?.(movie.title)}
                  className="w-full mt-2 py-3 bg-gradient-to-r from-[#00F0FF]/20 to-[#AD00FF]/20 border border-[#00F0FF]/30 text-[#00F0FF] font-mono text-xs font-bold rounded-lg"
                >
                  CONFIGURAR STREAMING ➔
                </button>
              </div>
            ))}
          </div>
        ) : (
          /* Vista Desktop: Carrusel Cilíndrico 3D + CRO Panel */
          <div 
            className="w-full max-w-4xl relative h-[450px] flex items-center justify-center perspective-[1500px]"
            onMouseMove={handleMouseMove}
          >
            {/* Contenedor del Carrusel Orbital */}
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDrag={handleDrag}
              style={{
                rotateY: smoothRotation,
                transformStyle: "preserve-3d"
              }}
              className="relative w-[260px] h-[380px] cursor-grab active:cursor-grabbing z-20"
            >
              {featuredMovies.map((movie, idx) => {
                const cardAngle = idx * (360 / featuredMovies.length);
                const isActive = activeIndex === idx;

                return (
                  /* Wrapper Div con Estilo inline 3D Estático para evitar conflicto de transform de Framer Motion */
                  <div
                    key={idx}
                    className="absolute inset-0"
                    style={{
                      transform: `rotateY(${cardAngle}deg) translateZ(280px)`,
                      transformStyle: "preserve-3d"
                    }}
                  >
                    <motion.div
                      onClick={() => handleCardClick(idx)}
                      className="w-full h-full rounded-2xl overflow-hidden border cursor-pointer transition-[border-color,opacity,box-shadow] duration-500 bg-[#030306]/95"
                      style={{
                        boxShadow: isActive ? `0 0 45px ${movie.glowColor}` : '0 15px 35px rgba(0,0,0,0.6)',
                        borderColor: isActive ? movie.glowColor : 'rgba(255,255,255,0.1)',
                        opacity: isActive ? 1 : 0.4,
                      }}
                      whileHover={{ scale: 1.04 }}
                    >
                      {/* Imagen de Fondo de Póster */}
                      <img 
                        src={movie.image} 
                        alt={movie.title}
                        className="w-full h-full object-cover select-none pointer-events-none"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent pointer-events-none" />
                      
                      {/* Contenido / Texto del Póster */}
                      <div className="absolute bottom-5 left-5 right-5 text-left select-none pointer-events-none">
                        <span className="text-[10px] font-mono tracking-widest text-[#00F0FF] uppercase block mb-1">{movie.tag}</span>
                        <h3 className="text-white text-xl font-bold tracking-tight">{movie.title}</h3>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* 🔥 PANEL DE NEUROMARKETING CRO (Solo Desktop) */}
        {/* ------------------------------------------------------------- */}
        {!isMobile && activeMovie && (
          <motion.div 
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-3xl mt-8 mx-auto p-6 rounded-2xl border bg-black/40 backdrop-blur-2xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] z-30 flex flex-col md:flex-row items-center gap-6"
            style={{
              borderColor: activeMovie.glowColor.replace('0.65', '0.3'),
              boxShadow: `0 20px 40px rgba(0,0,0,0.5), inset 0 0 20px ${activeMovie.glowColor.replace('0.65', '0.1')}`
            }}
          >
            <div className="flex-1 text-left">
              <div className="flex items-center gap-4 mb-2">
                <div className="flex items-center gap-2 opacity-60">
                  <Zap className="w-3.5 h-3.5 text-[#00F0FF]" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#00F0FF]">SYSTEM DIAGNOSTIC</span>
                </div>
                
                {/* Indicador visual de Pausado/Interactividad */}
                {isPaused ? (
                  <span 
                    onClick={() => setIsPaused(false)}
                    className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[9px] font-mono font-bold tracking-widest uppercase cursor-pointer hover:bg-amber-500/20 transition-all select-none"
                    title="Haz clic para reanudar el giro automático del carrusel"
                  >
                    <Pause className="w-2 h-2" /> Pausado (Click en tarjeta activa para reanudar)
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[9px] font-mono font-bold tracking-widest uppercase select-none animate-pulse">
                    <RefreshCw className="w-2.5 h-2.5 animate-spin-slow" /> Rotando libremente
                  </span>
                )}
              </div>
              <p className="text-white/80 text-sm leading-relaxed font-light italic">
                "{activeMovie.croMessage}"
              </p>
            </div>
            
            <div className="shrink-0 w-full md:w-auto">
              <motion.button
                onClick={() => onOpenWizard?.(activeMovie.title)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full group relative inline-flex items-center justify-center px-6 py-4 bg-gradient-to-r text-white font-bold uppercase text-xs tracking-[0.1em] rounded-xl overflow-hidden transition-all shadow-lg font-mono cursor-pointer"
                style={{
                  backgroundImage: `linear-gradient(to right, ${activeMovie.glowColor}, #AD00FF)`
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <PlayCircle className="w-4 h-4" /> CONFIGURAR AHORA
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, animate } from "motion/react";
import { Zap, PlayCircle, RefreshCw, Pause } from "lucide-react";

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
    checkMobile(); // Check on mount
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Animación infinita continua si NO está pausada por click (aplica a Móvil y Desktop)
  useEffect(() => {
    if (isPaused) return;
    
    // Iniciar rotación continua lineal
    const animation = animate(rotationY, rotationY.get() - 360, {
      duration: 40,
      ease: "linear",
      repeat: Infinity,
    });
    
    return () => animation?.stop();
  }, [isPaused, rotationY]);

  // Actualizar el Active Index para el CRO Message (aplica a Móvil y Desktop)
  useEffect(() => {
    const unsubscribe = smoothRotation.on("change", (latestRotation) => {
      // Normalizar rotación para encontrar el índice frontal (0 a 3)
      const normalizedRot = ((latestRotation % 360) + 360) % 360;
      let index = Math.round((360 - normalizedRot) / 90) % 4;
      if (index < 0) index += 4;
      setActiveIndex(index);
    });
    
    return () => unsubscribe();
  }, [smoothRotation]);

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
    // En móviles ajustamos la sensibilidad del drag para que sea cómoda
    const dragMultiplier = isMobile ? 0.6 : 0.4;
    rotationY.set(rotationY.get() + info.delta.x * dragMultiplier);
  };

  const handleCardClick = (idx: number) => {
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
  
  // Parámetros dinámicos según el dispositivo
  const carouselRadius = isMobile ? 180 : 280;
  const cardWidth = isMobile ? 180 : 260;
  const cardHeight = isMobile ? 260 : 380;
  const perspective = isMobile ? 1000 : 1500;

  return (
    <section id="inicio" className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-6 pt-24 md:pt-32 pb-16 overflow-hidden">
      {/* 🌌 FONDO DE ESPACIO PROFUNDO */}
      <div className="absolute inset-0 bg-transparent -z-30" />
      
      {/* Auroras Ambientales */}
      <motion.div 
        animate={{ x: [0, 30, -30, 0], y: [0, -50, 30, 0], scale: [1, 1.1, 0.9, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-10 w-[300px] md:w-[550px] h-[300px] md:h-[550px] bg-cyan-500/10 rounded-full blur-[100px] md:blur-[140px] pointer-events-none -z-20"
      />
      <motion.div 
        animate={{ x: [0, -40, 20, 0], y: [0, 40, -30, 0], scale: [1, 0.95, 1.05, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 right-10 w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-pink-500/10 rounded-full blur-[100px] md:blur-[150px] pointer-events-none -z-20"
      />

      <div className="container mx-auto relative z-10 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl flex flex-col items-center mb-6 md:mb-10"
        >
          {/* Badge Contextual */}
          <div className="flex items-center gap-2 mb-4 md:mb-6 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md relative overflow-hidden shadow-[0_0_30px_rgba(0,240,255,0.06)]">
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#00F0FF] animate-ping" />
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#00F0FF] absolute" />
            <span className="text-[#00F0FF] text-[8px] md:text-xs font-black tracking-[0.2em] md:tracking-[0.25em] uppercase font-mono">
              ● ONVIVO SETUP PREMIUM 100% AUTÓNOMO
            </span>
          </div>
          
          {/* Título Monumental */}
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-4 md:mb-6 leading-[0.95] md:leading-[0.92] uppercase">
            <span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.18)] block mb-1">CINE PERSONAL</span>
            <span className="bg-gradient-to-r from-[#00F0FF] via-[#AD00FF] to-[#FF007A] text-transparent bg-clip-text drop-shadow-[0_0_35px_rgba(0,240,255,0.32)] block">
              SIN COMPLICACIONES
            </span>
          </h1>
          
          <p className="max-w-2xl text-white/70 text-xs md:text-base mb-2 md:mb-6 leading-relaxed font-normal px-2">
            Configuramos tu entorno Stremio de manera profesional en segundos. Accede a los estrenos mundiales de 2026 en Full HD nativo y sin geobloqueos.
          </p>
        </motion.div>

        {/* ------------------------------------------------------------- */}
        {/* 🔥 CILINDRO HOLOGRÁFICO 3D (Unificado para Mobile y Desktop) */}
        {/* ------------------------------------------------------------- */}
        <div 
          className="w-full max-w-4xl relative flex items-center justify-center my-4 md:my-0"
          style={{ height: `${cardHeight + 60}px`, perspective: `${perspective}px` }}
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
              transformStyle: "preserve-3d",
              width: cardWidth,
              height: cardHeight
            }}
            className="relative cursor-grab active:cursor-grabbing z-20"
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
                    transform: `rotateY(${cardAngle}deg) translateZ(${carouselRadius}px)`,
                    transformStyle: "preserve-3d"
                  }}
                >
                  <motion.div
                    onClick={() => handleCardClick(idx)}
                    className="w-full h-full rounded-2xl overflow-hidden border cursor-pointer transition-[border-color,opacity,box-shadow] duration-500 bg-[#030306]/95"
                    style={{
                      boxShadow: isActive ? `0 0 ${isMobile ? '25px' : '45px'} ${movie.glowColor}` : '0 15px 35px rgba(0,0,0,0.6)',
                      borderColor: isActive ? movie.glowColor : 'rgba(255,255,255,0.1)',
                      opacity: isActive ? 1 : 0.4,
                    }}
                    whileHover={{ scale: isMobile ? 1 : 1.04 }}
                  >
                    {/* Imagen de Fondo de Póster */}
                    <img 
                      src={movie.image} 
                      alt={movie.title}
                      className="w-full h-full object-cover select-none pointer-events-none"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
                    
                    {/* Contenido / Texto del Póster */}
                    <div className="absolute bottom-4 left-4 right-4 md:bottom-5 md:left-5 md:right-5 text-left select-none pointer-events-none">
                      <span className="text-[8px] md:text-[10px] font-mono tracking-wider md:tracking-widest text-[#00F0FF] uppercase block mb-1">{movie.tag}</span>
                      <h3 className="text-white text-base md:text-xl font-bold tracking-tight leading-tight">{movie.title}</h3>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 🔥 PANEL DE NEUROMARKETING CRO (Unificado) */}
        {/* ------------------------------------------------------------- */}
        {activeMovie && (
          <motion.div 
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-3xl mt-4 md:mt-8 mx-auto p-4 md:p-6 rounded-2xl border bg-black/40 backdrop-blur-2xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] z-30 flex flex-col md:flex-row items-center gap-4 md:gap-6"
            style={{
              borderColor: activeMovie.glowColor.replace('0.65', '0.3'),
              boxShadow: `0 20px 40px rgba(0,0,0,0.5), inset 0 0 20px ${activeMovie.glowColor.replace('0.65', '0.1')}`
            }}
          >
            <div className="flex-1 text-left w-full">
              <div className="flex items-center justify-between md:justify-start gap-4 mb-2 md:mb-3">
                <div className="flex items-center gap-1.5 md:gap-2 opacity-60">
                  <Zap className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#00F0FF]" />
                  <span className="text-[8px] md:text-[10px] font-mono uppercase tracking-widest text-[#00F0FF]">DIAGNOSTIC</span>
                </div>
                
                {/* Indicador visual de Pausado/Interactividad */}
                {isPaused ? (
                  <span 
                    onClick={() => setIsPaused(false)}
                    className="flex items-center gap-1 md:gap-1.5 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[8px] md:text-[9px] font-mono font-bold tracking-wider md:tracking-widest uppercase cursor-pointer hover:bg-amber-500/20 transition-all select-none"
                    title="Haz clic para reanudar el giro automático del carrusel"
                  >
                    <Pause className="w-2 h-2" /> Pausado (Clic en tarjeta activa)
                  </span>
                ) : (
                  <span className="flex items-center gap-1 md:gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[8px] md:text-[9px] font-mono font-bold tracking-wider md:tracking-widest uppercase select-none animate-pulse">
                    <RefreshCw className="w-2 h-2 md:w-2.5 md:h-2.5 animate-spin-slow" /> Rotando
                  </span>
                )}
              </div>
              <p className="text-white/80 text-xs md:text-sm leading-relaxed font-light italic">
                "{activeMovie.croMessage}"
              </p>
            </div>
            
            <div className="shrink-0 w-full md:w-auto">
              <motion.button
                onClick={() => onOpenWizard?.(activeMovie.title)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full group relative inline-flex items-center justify-center px-4 md:px-6 py-3 md:py-4 bg-gradient-to-r text-white font-bold uppercase text-[10px] md:text-xs tracking-[0.1em] rounded-xl overflow-hidden transition-all shadow-lg font-mono cursor-pointer"
                style={{
                  backgroundImage: `linear-gradient(to right, ${activeMovie.glowColor}, #AD00FF)`
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <PlayCircle className="w-3.5 h-3.5 md:w-4 md:h-4" /> CONFIGURAR AHORA
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

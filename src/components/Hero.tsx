import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Sparkles, Tv, Shield, Zap } from "lucide-react";

interface HeroProps {
  onOpenWizard?: () => void;
}

const featuredMovies = [
  {
    title: "Dune: Part Two",
    tag: "SCI-FI // AVENTURA",
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=400",
    glowColor: "rgba(235, 140, 20, 0.65)",
  },
  {
    title: "Spider-Man: Beyond the Spider-Verse",
    tag: "ANIMACIÓN // ACCIÓN",
    image: "https://images.unsplash.com/photo-1608889175123-8ec330b86f84?auto=format&fit=crop&q=80&w=400",
    glowColor: "rgba(255, 0, 110, 0.65)",
  },
  {
    title: "Fallout: Season 2",
    tag: "SCI-FI // ACCIÓN (2026)",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400",
    glowColor: "rgba(0, 240, 255, 0.65)",
  },
  {
    title: "Shōgun: Season 2",
    tag: "DRAMA ÉPICO // ACCIÓN (2026)",
    image: "https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&q=80&w=400",
    glowColor: "rgba(220, 20, 60, 0.65)",
  },
];

export default function Hero({ onOpenWizard }: HeroProps) {
  const [isMobile, setIsMobile] = useState(true);

  // Lógica de Motion para el tilt 3D a 60fps estables en GPU
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Valores amortiguados (spring) para una suavidad exquisita
  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);
  
  // Desplazamiento inverso del gradiente ambiental de fondo para el paralaje
  const glowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [50, -50]), springConfig);
  const glowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [50, -50]), springConfig);

  // Elementos flotantes holográficos con ligeras desviaciones de físicas (Nivel Superior)
  const floatX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), springConfig);
  const floatY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-20, 20]), springConfig);

  // Springs dedicados para evitar llamadas condicionales en el renderizado JSX
  const floatY_IA = useSpring(useTransform(mouseY, [-0.5, 0.5], [20, -20]), springConfig);
  const floatX_Speed = useSpring(useTransform(mouseX, [-0.5, 0.5], [20, -20]), springConfig);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = (e.clientX - rect.left) / width - 0.5;
    const y = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section id="inicio" className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-36 pb-24 overflow-hidden">
      {/* 🌌 FONDO DE ESPACIO PROFUNDO Y NEÓN DINÁMICO */}
      <div className="absolute inset-0 bg-transparent -z-30" />
      
      {/* Auroras Ambientales Animadas de Fondo */}
      <motion.div 
        animate={{
          x: [0, 30, -30, 0],
          y: [0, -50, 30, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-10 left-10 w-[550px] h-[550px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-20"
      />
      <motion.div 
        animate={{
          x: [0, -40, 20, 0],
          y: [0, 40, -30, 0],
          scale: [1, 0.95, 1.05, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[150px] pointer-events-none -z-20"
      />
      <motion.div 
        animate={{
          x: [0, 20, -20, 0],
          y: [0, 30, 40, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[160px] pointer-events-none -z-20"
      />

      {/* Rejilla Cibernética 3D (Tron Grid Plane) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[250%] h-[75%] opacity-35"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0, 240, 255, 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 240, 255, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            transform: "perspective(400px) rotateX(75deg) translateY(120px)",
            maskImage: "linear-gradient(to top, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 80%)",
            WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 80%)",
          }}
        />
      </div>

      {/* Side Meta Text */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col space-y-24 opacity-20 z-20">
        <span className="text-[10px] rotate-90 uppercase tracking-[0.5em] origin-left whitespace-nowrap">Digital Services</span>
        <span className="text-[10px] rotate-90 uppercase tracking-[0.5em] origin-left whitespace-nowrap">V 2.5.0</span>
      </div>

      <div className="container mx-auto relative z-10 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl flex flex-col items-center"
        >
          {/* Badge Contextual de Cristal Premium con Shimmer */}
          <div className="flex items-center gap-2 mb-8 px-4.5 py-2.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md relative overflow-hidden group shadow-[0_0_30px_rgba(0,240,255,0.06)]">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping" />
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] absolute" />
            <span className="text-[#00F0FF] text-[10px] md:text-xs font-black tracking-[0.25em] uppercase font-mono">
              ● ONVIVO SETUP PREMIUM 100% AUTÓNOMO
            </span>
          </div>
          
          {/* Título Monumental con Gradiente Neón Multicapa y Drop-Shadow de Brillo */}
          <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight mb-8 leading-[0.92] uppercase">
            <span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.18)] block mb-1">CINE PERSONAL</span>
            <span className="bg-gradient-to-r from-[#00F0FF] via-[#AD00FF] to-[#FF007A] text-transparent bg-clip-text drop-shadow-[0_0_35px_rgba(0,240,255,0.32)] block">
              SIN COMPLICACIONES
            </span>
          </h1>
          
          {/* Subtítulo de Alta Legibilidad */}
          <p className="max-w-2xl text-white/70 text-sm md:text-base lg:text-lg mb-12 leading-relaxed font-normal">
            Configuramos tu entorno Stremio de manera profesional en segundos. Accede a todo el contenido global en un solo lugar, optimizado y en calidad máxima, sin necesidad de tutoriales complejos.
          </p>

          {/* Acciones de Conversión Shimmer & Glowing (Enfoque de Botón Único Web) */}
          <div className="flex items-center justify-center mb-20 w-full">
            <motion.button
              onClick={onOpenWizard}
              whileHover={{ scale: 1.04, boxShadow: "0 0 45px rgba(0, 240, 255, 0.6)" }}
              whileTap={{ scale: 0.96 }}
              className="w-full sm:w-auto group relative inline-flex items-center justify-center px-12 py-5 bg-gradient-to-r from-[#00F0FF] via-[#7000FF] to-[#FF007A] text-white font-extrabold uppercase text-xs tracking-widest overflow-hidden transition-all shadow-[0_0_35px_rgba(0,240,255,0.45)] cursor-pointer rounded-xl font-mono"
            >
              <span className="relative z-10 flex items-center gap-2">
                ¡OBTENER ACCESO INMEDIATO! <Sparkles className="w-4 h-4 text-white animate-spin-slow" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </motion.button>
          </div>
        </motion.div>

        {/* Mockup Monumental de la Smart TV con perspectiva e interactividad */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="w-full max-w-5xl mx-auto relative cursor-pointer"
          style={{
            perspective: 1200,
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* ⚡ BADGES HOLOGRÁFICOS FLOTANTES CON FISICAS REVERSAS (Efecto WOW) */}
          {!isMobile && (
            <>
              {/* Badge 1: 1080p Full HD (Arriba Izquierda) */}
              <motion.div 
                style={{ x: floatX, y: floatY }}
                className="absolute -top-8 -left-12 z-30 px-4 py-2 rounded-xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-md flex items-center gap-2 shadow-[0_10px_30px_rgba(0,240,255,0.15)]"
              >
                <Tv className="w-4 h-4 text-cyan-400" />
                <span className="text-[10px] font-mono font-bold text-white tracking-wider">1080p FULL HD OPTIMIZED</span>
              </motion.div>
              
              {/* Badge 2: IA Activada (Abajo Izquierda) */}
              <motion.div 
                style={{ x: floatX, y: floatY_IA }}
                className="absolute -bottom-8 -left-6 z-30 px-4 py-2 rounded-xl bg-slate-900/60 border border-purple-500/20 backdrop-blur-md flex items-center gap-2 shadow-[0_10px_30px_rgba(112,0,255,0.15)]"
              >
                <Shield className="w-4 h-4 text-purple-400" />
                <span className="text-[10px] font-mono font-bold text-white tracking-wider">AI AUTOMATED SETUP</span>
              </motion.div>

              {/* Badge 3: Descarga ⚡ (Derecha) */}
              <motion.div 
                style={{ x: floatX_Speed, y: floatY }}
                className="absolute top-1/4 -right-12 z-30 px-4 py-2 rounded-xl bg-slate-900/60 border border-pink-500/20 backdrop-blur-md flex items-center gap-2 shadow-[0_10px_30px_rgba(255,0,120,0.15)]"
              >
                <Zap className="w-4 h-4 text-pink-400 animate-pulse" />
                <span className="text-[10px] font-mono font-bold text-white tracking-wider">MAX SPEED STREAMING</span>
              </motion.div>
            </>
          )}

          {/* Gradiente Radial de Iluminación Ambiental Trasero con Paralaje de Fondo */}
          <motion.div 
            className="absolute inset-0 -z-10 blur-[130px] pointer-events-none rounded-full"
            style={{
              x: isMobile ? 0 : glowX,
              y: isMobile ? 0 : glowY,
              background: "radial-gradient(circle, rgba(0, 240, 255, 0.28) 0%, rgba(173, 0, 255, 0.25) 50%, transparent 80%)",
              transform: "scale(1.25)",
            }}
          />

          {/* Contorno de Neón Reactivo Pulsante Perimetral (Mística Extrema) */}
          <div className="absolute -inset-[2px] bg-gradient-to-r from-[#00F0FF]/30 via-[#AD00FF]/30 to-[#FF007A]/30 rounded-[28px] -z-20 blur-[3px] opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute -inset-[8px] bg-gradient-to-r from-[#00F0FF]/15 via-[#AD00FF]/15 to-[#FF007A]/15 rounded-[34px] -z-20 blur-[15px] opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />

          {/* Marco Físico 3D de la Smart TV (Cristal Esmerilado Premium) */}
          <motion.div
            style={{
              rotateX: isMobile ? 0 : rotateX,
              rotateY: isMobile ? 0 : rotateY,
              transformStyle: "preserve-3d",
            }}
            className="glass rounded-3xl p-2.5 md:p-3 aspect-video overflow-hidden shadow-[0_45px_130px_rgba(0,0,0,0.95)] border border-white/10 relative group transition-all duration-300"
          >
            {/* Simulador Stremio "Onvivo Custom" */}
            <div className="w-full h-full bg-[#030306]/95 rounded-2xl overflow-hidden relative flex flex-col border border-white/5">
              
              {/* Reflejo satinado de cristal (Diagonal) */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none -z-10 group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              
              {/* Efecto de escaneo analógico CRT de televisión activa (Mística visual retro-futurista) */}
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.04)_0%,transparent_80%)] mix-blend-overlay -z-10" />
              <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_bottom,rgba(255,255,255,1)_50%,transparent_50%)] bg-[length:100%_4px] -z-10" />
              
              {/* Barra de Navegación del Simulador */}
              <div className="flex items-center justify-between px-6 py-4 bg-black/60 border-b border-white/5 z-20">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] animate-ping" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] absolute" />
                  <span className="text-[10px] md:text-xs font-black font-mono tracking-widest text-[#00F0FF] uppercase">ONVIVO ACTIVE // SETUP 100% OK</span>
                </div>
                <div className="flex items-center gap-4 text-white/40 text-[10px] font-mono tracking-wider">
                  <span className="text-[#00F0FF] font-bold">1080p Full HD</span>
                  <span>●</span>
                  <span className="text-[#AD00FF] font-bold">OPTIMIZED STREAMING</span>
                </div>
              </div>
              
              {/* Cuadrícula de Pósteres de Películas */}
              <div className="flex-1 p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 overflow-hidden z-10" style={{ transformStyle: "preserve-3d" }}>
                {featuredMovies.map((movie, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ 
                      y: -18, 
                      scale: 1.16,
                      rotateY: idx % 2 === 0 ? 6 : -6,
                      rotateX: 4,
                      z: 40,
                      boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 25px ${movie.glowColor}`
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 18
                    }}
                    className="relative aspect-[2/3] rounded-xl overflow-hidden group cursor-pointer border border-white/5 transition-all duration-300"
                    style={{
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6)",
                      transformStyle: "preserve-3d"
                    }}
                  >
                    {/* Imagen de Fondo del Póster */}
                    <img 
                      src={movie.image} 
                      alt={movie.title}
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-95 group-hover:scale-105 transition-all duration-500"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Degradado Translúcido de Pie */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300" />
                    
                    {/* Brillo Ambiental Radial en Hover */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none"
                      style={{
                        background: `radial-gradient(circle, ${movie.glowColor} 0%, transparent 70%)`,
                      }}
                    />

                    {/* Contenido / Texto del Póster */}
                    <div className="absolute bottom-4 left-4 right-4 text-left z-10">
                      <span className="text-[9px] font-mono tracking-widest text-[#00F0FF] uppercase block mb-1">{movie.tag}</span>
                      <h3 className="text-white text-xs md:text-sm font-bold tracking-tight line-clamp-1 leading-snug group-hover:text-[#00F0FF] transition-colors duration-300">{movie.title}</h3>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

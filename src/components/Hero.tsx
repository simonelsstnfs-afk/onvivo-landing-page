import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Send } from "lucide-react";

interface HeroProps {
  onOpenWizard?: () => void;
}

const featuredMovies = [
  {
    title: "Cyberpunk: Edgerunners",
    tag: "Anime // Sci-Fi",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=400",
    glowColor: "rgba(0, 240, 255, 0.4)",
  },
  {
    title: "Interstellar",
    tag: "Drama // Sci-Fi",
    image: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&q=80&w=400",
    glowColor: "rgba(112, 0, 255, 0.4)",
  },
  {
    title: "Demon Slayer",
    tag: "Anime // Acción",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=400",
    glowColor: "rgba(255, 0, 128, 0.4)",
  },
  {
    title: "Blade Runner 2049",
    tag: "Neo-Noir // Sci-Fi",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=400",
    glowColor: "rgba(255, 128, 0, 0.4)",
  },
];

export default function Hero({ onOpenWizard }: HeroProps) {
  const [isMobile, setIsMobile] = useState(true);

  // Lógica de Motion para el tilt 3D a 60fps estables en GPU
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Valores amortiguados (spring) para una suavidad exquisita
  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);
  
  // Desplazamiento inverso del gradiente ambiental de fondo para el paralaje
  const glowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [40, -40]), springConfig);
  const glowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [40, -40]), springConfig);

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
    <section id="inicio" className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-20 overflow-hidden">
      {/* Elementos Decorativos de Fondo de espacio profundo */}
      <div className="absolute inset-0 bg-[#020204] -z-20" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-brand-secondary/5 rounded-full blur-[120px] pointer-events-none -z-10" />

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
          {/* Badge Contextual */}
          <div className="flex items-center gap-3 mb-6 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="text-[#00F0FF] text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase animate-pulse">● Setup Premium 100% Autónomo</span>
          </div>
          
          {/* Título Monumental */}
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[0.95] uppercase">
            CINE PERSONAL <br />
            <span className="text-stroke text-transparent opacity-90">SIN COMPLICACIONES</span>
          </h1>
          
          {/* Subtítulo / Propuesta de valor */}
          <p className="max-w-2xl text-white/60 text-sm md:text-base lg:text-lg mb-10 leading-relaxed font-normal">
            Configuramos tu entorno Stremio de manera profesional en segundos. Accede a todo el contenido global en un solo lugar, optimizado y en calidad máxima, sin necesidad de tutoriales complejos.
          </p>

          {/* Acciones de Conversión */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-16 w-full sm:w-auto">
            <motion.button
              onClick={onOpenWizard}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="w-full sm:w-auto group relative inline-flex items-center justify-center px-8 py-4 bg-[#00F0FF] text-[#050508] font-bold uppercase text-xs tracking-widest overflow-hidden transition-all shadow-[0_0_25px_rgba(0,240,255,0.35)] cursor-pointer rounded-lg"
            >
              <span className="relative z-10">COMPRAR AHORA</span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </motion.button>
            
            <motion.a
              href="https://t.me/onvivo_bot"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="w-full sm:w-auto group relative inline-flex items-center justify-center px-8 py-4 bg-transparent border border-white/10 hover:border-white/20 text-white hover:bg-white/5 font-bold uppercase text-xs tracking-widest overflow-hidden transition-all rounded-lg"
            >
              <Send className="w-3.5 h-3.5 mr-2.5 text-[#00F0FF]" />
              <span className="relative z-10">Probar en Telegram</span>
            </motion.a>
          </div>
        </motion.div>

        {/* Mockup Monumental de la Smart TV */}
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
          {/* Gradiente Radial de Iluminación Ambiental Trasero con Paralaje de Fondo */}
          <motion.div 
            className="absolute inset-0 -z-10 blur-[130px] pointer-events-none rounded-full"
            style={{
              x: isMobile ? 0 : glowX,
              y: isMobile ? 0 : glowY,
              background: "radial-gradient(circle, rgba(0, 240, 255, 0.22) 0%, rgba(112, 0, 255, 0.2) 50%, transparent 80%)",
              transform: "scale(1.2)",
            }}
          />

          {/* Marco Físico 3D de la Smart TV */}
          <motion.div
            style={{
              rotateX: isMobile ? 0 : rotateX,
              rotateY: isMobile ? 0 : rotateY,
              transformStyle: "preserve-3d",
            }}
            className="glass rounded-3xl p-2.5 md:p-3 aspect-video overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.8)] border border-white/5 relative group transition-all duration-300"
          >
            {/* Simulador Stremio "Onvivo Custom" */}
            <div className="w-full h-full bg-[#050508]/85 rounded-2xl overflow-hidden relative flex flex-col border border-white/5">
              {/* Barra de Navegación del Simulador */}
              <div className="flex items-center justify-between px-6 py-4 bg-black/40 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] animate-pulse" />
                  <span className="text-[10px] md:text-xs font-bold font-mono tracking-widest text-[#00F0FF] uppercase">ONVIVO ACTIVE // SETUP 100% OK</span>
                </div>
                <div className="flex items-center gap-4 text-white/40 text-[10px] font-mono tracking-wider">
                  <span>4K UHD STREAMING READY</span>
                  <span>●</span>
                  <span className="text-emerald-400 font-bold">STABLE CONNECTION</span>
                </div>
              </div>
              
              {/* Cuadrícula de Pósteres de Películas */}
              <div className="flex-1 p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 overflow-hidden">
                {featuredMovies.map((movie, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -8, scale: 1.03 }}
                    className="relative aspect-[2/3] rounded-xl overflow-hidden group cursor-pointer border border-white/5"
                    style={{
                      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    {/* Imagen de Fondo del Póster */}
                    <img 
                      src={movie.image} 
                      alt={movie.title}
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Degradado Translúcido de Pie */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-85 group-hover:opacity-90 transition-opacity duration-300" />
                    
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

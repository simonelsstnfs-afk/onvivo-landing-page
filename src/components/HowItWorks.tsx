import { motion } from "motion/react";
import { MessageSquare, Settings, PlayCircle, ChevronRight, HelpCircle, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: <MessageSquare className="w-7 h-7 text-[#00F0FF]" />,
    title: "Personaliza tu Plan",
    desc: "Elige tus preferencias de visualización (idioma, audio, subtítulos y tus géneros favoritos) directamente en nuestro intuitivo asistente web en segundos.",
    tag: "PASO 01",
    glowColor: "rgba(0, 240, 255, 0.1)"
  },
  {
    icon: <Settings className="w-7 h-7 text-[#AD00FF]" />,
    title: "Activación Automatizada",
    desc: "Completa la suscripción mediante nuestra pasarela segura Lemon Squeezy y nuestro motor de IA generará tu cuenta Stremio de inmediato.",
    tag: "PASO 02",
    glowColor: "rgba(173, 0, 255, 0.1)"
  },
  {
    icon: <PlayCircle className="w-7 h-7 text-[#FF007A]" />,
    title: "Acceso y Disfrute",
    desc: "Inicia sesión en Stremio en tu Smart TV, PC o móvil y empieza a ver tu contenido favorito con velocidad extrema y resolución 1080p Full HD fluida.",
    tag: "PASO 03",
    glowColor: "rgba(255, 0, 122, 0.1)"
  }
];

export default function HowItWorks() {
  return (
    <section id="proceso" className="py-32 relative overflow-hidden bg-[#040407] border-t border-white/5">
      {/* Esferas de luz sutiles de fondo */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#AD00FF]/2 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-0 w-[450px] h-[450px] bg-[#00F0FF]/2 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Columna Izquierda: Información de Simplicidad */}
          <div className="lg:w-5/12 w-full text-left">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/5 backdrop-blur-md">
              <span className="text-[10px] md:text-xs font-mono font-bold tracking-[0.2em] text-[#AD00FF] uppercase">FLUJO SIMPLIFICADO</span>
            </div>
            
            <h2 className="text-sm font-bold text-white/40 uppercase tracking-[0.3em] mb-4">Simplicidad Pura</h2>
            
            <h3 className="text-3xl md:text-6xl font-black mb-8 leading-[0.98] uppercase tracking-tighter">
              CENTRADOS EN TU <br />
              <span className="bg-gradient-to-r from-[#00F0FF] via-[#AD00FF] to-[#FF007A] text-transparent bg-clip-text drop-shadow-[0_0_20px_rgba(173,0,255,0.15)]">
                EXPERIENCIA
              </span>
            </h3>
            
            <p className="text-white/45 mb-10 max-w-lg leading-relaxed text-sm md:text-base">
              No necesitas conocimientos técnicos previos. Hemos simplificado todo el proceso a través de inteligencia robótica para que lo tengas todo listo en menos de 3 minutos de reloj.
            </p>
            
            <div className="space-y-4 max-w-md">
              {[
                { text: "Automatización total de plugins", color: "text-[#00F0FF]" },
                { text: "Soporte interactivo 24/7 vía Telegram", color: "text-[#AD00FF]" },
                { text: "Actualizaciones de contenido automáticas", color: "text-[#FF007A]" }
              ].map((item, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.01] hover:bg-white/[0.02] border border-white/5 transition-all duration-300"
                >
                  <div className="w-6 h-6 rounded-full bg-white/[0.04] flex items-center justify-center text-slate-200">
                    <ChevronRight size={14} className={item.color} />
                  </div>
                  <span className="text-sm font-bold tracking-tight text-white/85">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Columna Derecha: Timeline Premium de Cristal */}
          <div className="lg:w-7/12 w-full relative">
            {/* Línea Central de la Línea de Tiempo (Neón Cian/Púrpura) */}
            <div className="absolute left-[36px] top-8 bottom-8 w-[2px] bg-gradient-to-b from-[#00F0FF] via-[#AD00FF] to-[#FF007A] opacity-25 pointer-events-none" />

            <div className="flex flex-col gap-6 md:gap-8 relative z-10">
              {steps.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 35 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  className="group flex gap-6 md:gap-8 p-8 md:p-10 rounded-2xl bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 hover:border-white/10 items-center transition-all duration-500 relative overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.45)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:-translate-y-1"
                >
                  {/* Resplandor interno trasero */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[60px] pointer-events-none -z-10"
                    style={{
                      background: `radial-gradient(circle at 10% 50%, ${s.glowColor} 0%, transparent 60%)`,
                    }}
                  />

                  {/* Nodo luminoso del Timeline */}
                  <div className="w-[18px] h-[18px] shrink-0 rounded-full border-4 border-[#030305] bg-slate-800 group-hover:bg-[#00F0FF] group-hover:scale-125 transition-all duration-300 absolute left-[28px] z-20 shadow-[0_0_10px_rgba(0,0,0,1)]" />

                  {/* Icono de Paso a la izquierda */}
                  <div className="w-16 h-16 shrink-0 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/5 transition-transform duration-300 z-10 ml-8 md:ml-10">
                    {s.icon}
                  </div>

                  {/* Contenido */}
                  <div className="z-10 text-left">
                    <span className="text-[9px] font-mono text-white/30 tracking-[0.25em] block mb-2 font-bold uppercase">
                      {s.tag}
                    </span>
                    <h4 className="text-xl md:text-2xl font-black mb-2 flex items-center gap-2 uppercase tracking-tighter text-white group-hover:text-white transition-colors duration-300">
                      {s.title}
                    </h4>
                    <p className="text-white/45 group-hover:text-white/65 text-xs md:text-sm leading-relaxed transition-colors duration-300 max-w-xl">
                      {s.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

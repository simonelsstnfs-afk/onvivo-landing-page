import { motion } from "motion/react";
import { Zap, Shield, Smartphone, Bot, Layers, FastForward, Sparkles } from "lucide-react";

const features = [
  {
    icon: <Zap className="w-6 h-6 text-cyan-400" />,
    title: "Setup Automatizado",
    desc: "Olvida los tutoriales complejos. Nuestro motor inteligente procesa tus preferencias y activa tu servicio en segundos de forma 100% autónoma.",
    glowColor: "rgba(6, 182, 212, 0.15)", // Cian glow
    tag: "EFICIENCIA",
  },
  {
    icon: <Sparkles className="w-6 h-6 text-purple-400" />,
    title: "Wizard Interactivo",
    desc: "Configura tus preferencias de audio, subtítulos, anime e idiomas en tiempo real mediante nuestro asistente web inteligente integrado.",
    glowColor: "rgba(168, 85, 247, 0.15)", // Violeta glow
    tag: "PERSONALIZACIÓN",
  },
  {
    icon: <Shield className="w-6 h-6 text-emerald-400" />,
    title: "100% Seguro",
    desc: "Mantenemos tu privacidad y seguridad como prioridad absoluta en cada paso del proceso.",
    glowColor: "rgba(16, 185, 129, 0.15)", // Verde glow
    tag: "PROTECCIÓN",
  },
  {
    icon: <Layers className="w-6 h-6 text-orange-400" />,
    title: "Multi-Catálogo",
    desc: "Accede a las mejores fuentes de contenido y librerías mundiales de alta calidad en un solo lugar.",
    glowColor: "rgba(249, 115, 22, 0.15)", // Naranja glow
    tag: "CONECTIVIDAD",
  },
  {
    icon: <Smartphone className="w-6 h-6 text-blue-400" />,
    title: "Multiplataforma",
    desc: "Configúralo una vez y disfrútalo en tu Smart TV, PC o dispositivo móvil sin complicaciones.",
    glowColor: "rgba(59, 130, 246, 0.15)", // Azul glow
    tag: "COMPATIBILIDAD",
  },
  {
    icon: <FastForward className="w-6 h-6 text-pink-400" />,
    title: "Sin Suscripciones",
    desc: "Un único servicio de configuración permanente para liberar todo el potencial de tu streaming.",
    glowColor: "rgba(236, 72, 153, 0.15)", // Rosa glow
    tag: "PAGO ÚNICO",
  }
];

interface FeaturesProps {
  onOpenWizard?: () => void;
}

export default function Features({ onOpenWizard }: FeaturesProps) {
  return (
    <section id="servicios" className="py-32 relative overflow-hidden border-t border-white/5 bg-transparent">
      {/* Glows de fondo decorativos */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-[#00F0FF]/3 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#FF007A]/3 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="container mx-auto px-6 max-w-7xl">
        {/* Encabezado Monumental de Sección */}
        <div className="text-center mb-24 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/5 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span className="text-[10px] md:text-xs font-mono font-bold tracking-[0.2em] text-white/50 uppercase">TECNOLOGÍA DE ÉLITE</span>
          </div>
          
          <h2 className="text-3xl md:text-6xl font-black tracking-tighter uppercase mb-6 leading-[0.98]">
            MÁXIMA POTENCIA <br />
            <span className="bg-gradient-to-r from-[#00F0FF] via-[#AD00FF] to-[#FF007A] text-transparent bg-clip-text drop-shadow-[0_0_25px_rgba(0,240,255,0.15)]">
              TECNOLOGÍA SIN LÍMITES
            </span>
          </h2>
          
          <p className="text-white/40 max-w-xl text-sm md:text-base leading-relaxed">
            Hemos re-diseñado e integrado los mejores estándares de automatización para ofrecerte un servicio de configuración de streaming rápido, fluido y permanente.
          </p>
        </div>

        {/* Grid de Tarjetas de Cristal Holográfico */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              onClick={onOpenWizard}
              className="group relative p-8 md:p-10 rounded-2xl bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all duration-500 overflow-hidden cursor-pointer shadow-[0_4px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.65)] hover:-translate-y-2 flex flex-col justify-between"
            >
              {/* Resplandor Ambiental Interno de Hover (Color del Icono) */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[80px] pointer-events-none -z-10"
                style={{
                  background: `radial-gradient(circle at 10% 10%, ${f.glowColor} 0%, transparent 60%)`,
                }}
              />
              
              {/* Shimmer de Borde de Neón */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-[#00F0FF]/40 transition-all duration-700" />

              <div>
                {/* Tag Mono e Icono */}
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[9px] font-mono text-white/30 tracking-[0.25em] uppercase font-bold">
                    {f.tag}
                  </span>
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 group-hover:scale-110 group-hover:bg-white/5 transition-all duration-300">
                    {f.icon}
                  </div>
                </div>

                {/* Título de Tarjeta */}
                <h3 className="text-xl md:text-2xl font-black mb-4 uppercase tracking-tight text-white group-hover:text-[#00F0FF] transition-colors duration-300">
                  {f.title}
                </h3>
                
                {/* Descripción */}
                <p className="text-white/45 group-hover:text-white/65 leading-relaxed text-sm transition-colors duration-300">
                  {f.desc}
                </p>
              </div>

              {/* Indicador de Acción Holográfico en Hover */}
              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono font-bold tracking-widest text-[#00F0FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>PERSONALIZAR PLAN</span>
                <span className="text-xs">➔</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

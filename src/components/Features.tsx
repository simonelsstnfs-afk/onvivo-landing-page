import { motion } from "motion/react";
import { Zap, Shield, Smartphone, Bot, Layers, FastForward } from "lucide-react";

const features = [
  {
    icon: <Zap className="text-cyan-400" />,
    title: "Setup Instantáneo",
    desc: "Olvida los tutoriales de 30 minutos. Nuestro bot hace el trabajo pesado por ti en segundos."
  },
  {
    icon: <Bot className="text-violet-400" />,
    title: "Guía Inteligente",
    desc: "Un bot de Telegram dedicado que te lleva de la mano durante todo el proceso de configuración."
  },
  {
    icon: <Shield className="text-emerald-400" />,
    title: "100% Seguro",
    desc: "Mantenemos tu privacidad y seguridad como prioridad absoluta en cada paso."
  },
  {
    icon: <Layers className="text-orange-400" />,
    title: "Multi-Catálogo",
    desc: "Accede a las mejores fuentes de contenido y librerías mundiales en un solo lugar."
  },
  {
    icon: <Smartphone className="text-blue-400" />,
    title: "Multiplataforma",
    desc: "Configúralo una vez y disfrútalo en tu TV, PC o móvil. Sin fronteras."
  },
  {
    icon: <FastForward className="text-rose-400" />,
    title: "Sin Suscripciones",
    desc: "Un único servicio de configuración para liberar todo el potencial de tu streaming."
  }
];

export default function Features() {
  return (
    <section id="servicios" className="border-t border-white/10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group p-12 border-b border-white/10 lg:border-r last:border-r-0 hover:bg-white/[0.02] transition-colors relative overflow-hidden"
          >
            <span className="text-[10px] font-mono text-brand-primary mb-6 block tracking-widest uppercase">
              {i < 9 ? `0${i+1}` : i+1} // Sistema
            </span>
            <div className="mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
               {f.icon}
            </div>
            <h4 className="text-2xl font-black mb-4 uppercase tracking-tighter">{f.title}</h4>
            <p className="text-white/40 leading-relaxed text-sm group-hover:text-white/60 transition-colors">
              {f.desc}
            </p>
            
            {/* Corner Decorative */}
            <div className="absolute top-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity">
               <div className="absolute top-4 right-4 w-1 h-1 bg-brand-primary" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

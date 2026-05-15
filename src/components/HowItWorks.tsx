import { motion } from "motion/react";
import { MessageSquare, Settings, PlayCircle, ChevronRight } from "lucide-react";

const steps = [
  {
    icon: <MessageSquare size={32} />,
    title: "Conecta con el Bot",
    desc: "Inicia la conversación en Telegram. Nuestro bot te dará la bienvenida inmediatamente."
  },
  {
    icon: <Settings size={32} />,
    title: "Sigue la Guía",
    desc: "Responde un par de preguntas y deja que el bot configure tu entorno ideal."
  },
  {
    icon: <PlayCircle size={32} />,
    title: "Disfruta",
    desc: "Accede a tu plataforma configurada y empieza a ver tu contenido favorito."
  }
];

export default function HowItWorks() {
  return (
    <section id="proceso" className="py-24 bg-surface/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-sm font-bold text-brand-secondary uppercase tracking-[0.3em] mb-4">Simplicidad Pura</h2>
            <h3 className="text-4xl md:text-6xl font-black mb-8 leading-tight">CENTRADOS EN TU <br /> EXPERIENCIA</h3>
            <p className="text-slate-400 mb-8 max-w-lg">
              No necesitas ser un experto. Onvivo está diseñado para que cualquiera pueda tener un sistema de streaming de élite en minutos.
            </p>
            
            <div className="space-y-4">
              {["Automatización total", "Soporte 24/7 vía Telegram", "Actualizaciones constantes"].map((item) => (
                <div key={item} className="flex items-center gap-3 text-slate-200">
                  <div className="w-5 h-5 rounded-full bg-brand-secondary/20 flex items-center justify-center text-brand-secondary">
                    <ChevronRight size={14} />
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            <div className="flex flex-col gap-px bg-white/10 border border-white/10">
              {steps.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="flex gap-6 p-10 bg-background items-center group hover:bg-white/[0.02] transition-colors"
                >
                  <div className="w-16 h-16 shrink-0 bg-white/5 flex items-center justify-center text-brand-primary group-hover:scale-110 transition-transform">
                    {s.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-black mb-1 flex items-center gap-2 uppercase tracking-tighter">
                       <span className="text-brand-primary text-xs font-mono tracking-widest">{i < 9 ? `0${i+1}` : i+1} //</span> {s.title}
                    </h4>
                    <p className="text-white/40 text-sm">{s.desc}</p>
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

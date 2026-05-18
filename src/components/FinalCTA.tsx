import { motion } from "motion/react";
import { Send, Sparkles, Tv, ArrowRight } from "lucide-react";

interface FinalCTAProps {
  onOpenWizard?: () => void;
}

export default function FinalCTA({ onOpenWizard }: FinalCTAProps) {
  return (
    <section className="py-36 relative overflow-hidden bg-[#020204] border-t border-white/5">
      
      {/* Espectacular Aurora Galáctica de Fondo (Cierre Monumental) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] md:w-[1200px] h-[400px] bg-gradient-to-t from-[#AD00FF]/15 via-[#00F0FF]/5 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] bg-[#FF007A]/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        
        {/* Contenedor Consola de Cristal Esmerilado Premium */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative backdrop-blur-2xl bg-white/[0.01] hover:bg-[#07070f]/40 border border-white/5 rounded-3xl p-10 md:p-20 text-center shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all duration-700 overflow-hidden"
        >
          {/* Shimmer superior */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00F0FF]/30 to-transparent" />
          
          <div className="flex flex-col items-center">
            
            {/* Badge */}
            <div className="flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/5 backdrop-blur-md">
              <Tv className="w-3.5 h-3.5 text-[#FF007A]" />
              <span className="text-[10px] md:text-xs font-mono font-bold tracking-[0.25em] text-white/50 uppercase">CONFIGURACIÓN DEFINITIVA</span>
            </div>

            {/* Título Monumental */}
            <h2 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.95] uppercase">
              ¿LISTO PARA EL <br /> 
              <span className="bg-gradient-to-r from-[#00F0FF] via-[#AD00FF] to-[#FF007A] text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(0,240,255,0.2)]">
                PRÓXIMO NIVEL?
              </span>
            </h2>
            
            {/* Descripción */}
            <p className="text-white/45 text-sm md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
              Únete a miles de amantes del cine que ya disfrutan de su centro multimedia premium optimizado con velocidad ilimitada. Configúralo en segundos.
            </p>

            {/* Acciones de Conversión */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10 w-full sm:w-auto">
              
              {/* Botón Principal: Compra Gradiente Shimmer */}
              <motion.button
                onClick={onOpenWizard}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto group relative inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-[#00F0FF] via-[#7000FF] to-[#FF007A] text-white font-mono text-xs font-bold uppercase tracking-[0.2em] rounded-xl overflow-hidden shadow-[0_0_35px_rgba(0,240,255,0.35)] transition-all duration-300 cursor-pointer"
              >
                {/* Capa de destello animado (Shimmer Effect) */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms] ease-out" />
                <span className="relative z-10 flex items-center gap-2">
                  ¡OBTENER ACCESO INMEDIATO! <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
              
              {/* Botón Secundario: Telegram Borde Neón */}
              <motion.a
                href="https://t.me/onvivo_bot"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto group relative inline-flex items-center justify-center px-10 py-5 bg-transparent border border-[#00F0FF]/35 text-[#00F0FF] hover:border-[#00F0FF]/75 font-mono text-xs font-bold uppercase tracking-[0.2em] rounded-xl overflow-hidden hover:bg-[#00F0FF]/5 hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] transition-all duration-300"
              >
                <Send className="w-4 h-4 mr-3" />
                <span className="relative z-10">Telegram Bot</span>
              </motion.a>
            </div>
            
            {/* Informaciones de Confianza */}
            <div className="flex justify-center border-t border-white/5 pt-8 w-full max-w-md">
              <div className="flex flex-col items-center gap-1.5">
                <span className="text-[9px] uppercase tracking-[0.4em] text-white/30 font-bold">Oficial Telegram Address</span>
                <a 
                  href="https://t.me/onvivo_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white font-mono text-sm underline underline-offset-4 decoration-[#00F0FF] hover:text-[#00F0FF] transition-colors"
                >
                  @onvivo_bot
                </a>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}

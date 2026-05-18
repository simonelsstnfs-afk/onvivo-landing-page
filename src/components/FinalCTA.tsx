import { motion } from "motion/react";
import { Sparkles, ArrowRight } from "lucide-react";

interface FinalCTAProps {
  onOpenWizard?: () => void;
}

export default function FinalCTA({ onOpenWizard }: FinalCTAProps) {
  return (
    <section className="py-36 relative overflow-hidden bg-[#020204] border-t border-white/5">
      {/* Luces Ambientales Galácticas de Fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#00F0FF]/5 via-[#AD00FF]/5 to-[#FF007A]/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass rounded-3xl p-12 md:p-20 text-center relative overflow-hidden border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.8)]"
        >
          {/* Shimmer de luz interna */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00F0FF]/2 to-transparent -translate-x-full animate-shimmer pointer-events-none" />

          <div className="max-w-3xl mx-auto flex flex-col items-center">
            {/* Pequeña Cabecera */}
            <span className="text-[10px] font-mono tracking-[0.4em] text-[#00F0FF] uppercase font-bold mb-4 block">
              SOPORTE 100% GARANTIZADO
            </span>
            
            {/* Título Principal */}
            <h2 className="text-3xl md:text-6xl font-black tracking-tighter text-white mb-6 uppercase">
              ¿LISTO PARA LLEVAR TU CINE AL{" "}
              <span className="bg-gradient-to-r from-[#00F0FF] via-[#AD00FF] to-[#FF007A] text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(0,240,255,0.2)]">
                PRÓXIMO NIVEL?
              </span>
            </h2>
            
            {/* Descripción */}
            <p className="text-white/45 text-sm md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
              Únete a miles de amantes del cine que ya disfrutan de su centro multimedia premium optimizado con velocidad ilimitada. Configúralo en segundos.
            </p>

            {/* Acciones de Conversión */}
            <div className="flex items-center justify-center mb-6 w-full">
              {/* Botón Principal: Compra Gradiente Shimmer */}
              <motion.button
                onClick={onOpenWizard}
                whileHover={{ scale: 1.05, y: -2, boxShadow: "0 0 45px rgba(0, 240, 255, 0.5)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto group relative inline-flex items-center justify-center px-12 py-5 bg-gradient-to-r from-[#00F0FF] via-[#7000FF] to-[#FF007A] text-white font-mono text-xs font-bold uppercase tracking-[0.2em] rounded-xl overflow-hidden shadow-[0_0_35px_rgba(0,240,255,0.35)] transition-all duration-300 cursor-pointer"
              >
                {/* Capa de destello animado (Shimmer Effect) */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms] ease-out" />
                <span className="relative z-10 flex items-center gap-2">
                  ¡OBTENER ACCESO INMEDIATO! <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
            </div>
            
            {/* Informaciones de Confianza */}
            <div className="flex justify-center border-t border-white/5 pt-8 w-full max-w-md">
              <div className="flex flex-col items-center gap-1.5">
                <span className="text-[9px] uppercase tracking-[0.3em] text-white/30 font-bold">PAGO ÚNICO SEGURO // ACCESO DE POR VIDA</span>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}

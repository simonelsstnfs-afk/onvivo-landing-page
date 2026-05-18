import { motion } from "motion/react";
import { Send, ArrowRight } from "lucide-react";

interface FinalCTAProps {
  onOpenWizard?: () => void;
}

export default function FinalCTA({ onOpenWizard }: FinalCTAProps) {
  return (
    <section className="py-24 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="relative overflow-hidden text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <h2 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.95] uppercase">
              ¿LISTO PARA EL <br /> 
              <span className="text-stroke text-transparent">PRÓXIMO NIVEL?</span>
            </h2>
            
            <p className="text-white/40 text-base md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
              Únete a miles de usuarios que ya disfrutan de su cine personal automatizado. Configura todo desde la web o directamente en Telegram.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
              <motion.button
                onClick={onOpenWizard}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto group relative inline-flex items-center justify-center px-10 py-5 bg-brand-primary text-background font-bold uppercase text-sm tracking-widest overflow-hidden transition-all glow-cyan cursor-pointer"
              >
                <span className="relative z-10">COMPRAR AHORA</span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </motion.button>
              
              <motion.a
                href="https://t.me/onvivo_bot"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto group relative inline-flex items-center justify-center px-10 py-5 bg-transparent border border-white/20 text-white hover:bg-white/5 font-bold uppercase text-sm tracking-widest overflow-hidden transition-all"
              >
                <Send className="w-4 h-4 mr-3" />
                <span className="relative z-10">Telegram Bot</span>
              </motion.a>
            </div>
            
            <div className="flex justify-center">
              <div className="flex flex-col items-center gap-1">
                <span className="text-[10px] uppercase tracking-[0.4em] opacity-40 font-bold">Oficial Bot</span>
                <div className="flex items-center gap-2 text-white font-mono text-sm underline underline-offset-4 decoration-brand-primary">
                  @onvivo_bot
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

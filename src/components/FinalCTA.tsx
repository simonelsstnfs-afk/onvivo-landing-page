import { motion } from "motion/react";
import { Send, ArrowRight } from "lucide-react";

export default function FinalCTA() {
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
            <h2 className="text-5xl md:text-[100px] font-black mb-8 tracking-tighter leading-[0.85] uppercase">
              ¿LISTO PARA EL <br /> 
              <span className="text-stroke text-transparent">PRÓXIMO NIVEL?</span>
            </h2>
            
            <p className="text-white/40 text-lg md:text-xl max-w-2xl mx-auto mb-16 leading-relaxed">
              Únete a miles de usuarios que ya disfrutan de su cine personal automatizado. La configuración te espera en Telegram.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-12">
              <motion.a
                href="https://t.me/onvivo_bot"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center justify-center px-16 py-8 bg-brand-primary text-background font-black uppercase text-xl tracking-[0.2em] overflow-hidden transition-all glow-cyan"
              >
                <span className="relative z-10">INICIAR BOT</span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </motion.a>
              
              <div className="flex flex-col items-start gap-1">
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

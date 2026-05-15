import { motion } from "motion/react";
import { Send, Play, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center px-6 pt-24 overflow-hidden">
      {/* Side Meta Text */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col space-y-24 opacity-20 z-20">
        <span className="text-[10px] rotate-90 uppercase tracking-[0.5em] origin-left whitespace-nowrap">Digital Services</span>
        <span className="text-[10px] rotate-90 uppercase tracking-[0.5em] origin-left whitespace-nowrap">V 2.5.0</span>
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl"
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="text-brand-primary text-[11px] font-bold tracking-[0.3em] uppercase">● Bot Status: Online</span>
          </div>
          
          <h1 className="text-7xl md:text-[140px] font-black tracking-tighter mb-8 leading-[0.8] uppercase">
            TU STREAMING <br />
            <span className="text-stroke text-transparent opacity-80">SIN LIMITES</span>
          </h1>
          
          <p className="max-w-xl text-white/50 text-lg md:text-xl mb-12 leading-relaxed">
            Configuramos tu entorno Stremio a través de nuestra IA en Telegram. Accede a todo el contenido global en un solo lugar, optimizado y profesional.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-12">
            <motion.a
              href="https://t.me/onvivo_bot"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center justify-center px-12 py-6 bg-brand-primary text-background font-black uppercase text-sm tracking-widest overflow-hidden transition-all glow-cyan"
            >
              <span className="relative z-10">INICIAR EN TELEGRAM</span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </motion.a>
            
            <div className="flex gap-10">
               <div className="flex flex-col">
                  <span className="text-3xl font-black">+5k</span>
                  <span className="text-[10px] uppercase tracking-widest opacity-40">Usuarios</span>
               </div>
               <div className="w-[1px] h-12 bg-white/10 hidden sm:block" />
               <div className="flex flex-col">
                  <span className="text-3xl font-black">100%</span>
                  <span className="text-[10px] uppercase tracking-widest opacity-40">Auto</span>
               </div>
            </div>
          </div>
        </motion.div>

        {/* Mockup / Visual */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-20 relative max-w-5xl mx-auto"
        >
          <div className="glass rounded-3xl p-2 md:p-4 aspect-video overflow-hidden shadow-2xl border-white/5">
            <div className="w-full h-full rounded-2xl bg-slate-900 overflow-hidden relative group">
              <img 
                src="https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80&w=2070" 
                alt="Streaming Interface"
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-brand-primary rounded-full flex items-center justify-center text-background animate-float">
                  <Play size={32} fill="currentColor" />
                </div>
              </div>
              <div className="absolute bottom-6 left-6 right-6 p-4 glass rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-white/10" />
                  <div className="text-left">
                    <div className="w-32 h-3 bg-white/20 rounded mb-2" />
                    <div className="w-20 h-2 bg-white/10 rounded" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full border border-white/10" />
                  <div className="w-8 h-8 rounded-full border border-white/10" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative bits */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-primary/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-secondary/20 rounded-full blur-3xl" />
        </motion.div>
      </div>
    </section>
  );
}

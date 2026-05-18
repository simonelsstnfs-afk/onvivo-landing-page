import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, HelpCircle, HelpCircle as HelpIcon } from "lucide-react";

const faqs = [
  {
    q: "¿Qué es exactamente Onvivo?",
    a: "Onvivo es un servicio de configuración asistida de élite. Te ayudamos a configurar tu plataforma de streaming (Stremio) de manera profesional, ultra-optimizada y en resolución óptima (1080p Full HD para la fluidez máxima sin buffering) directamente desde nuestro asistente interactivo web."
  },
  {
    q: "¿Necesito tener conocimientos técnicos?",
    a: "Para nada. La automatización de Onvivo está diseñada para guiarte de forma visual paso a paso mediante nuestro asistente web intuitivo. Una vez completado el pago, tu cuenta de Stremio se configura e inicializa de forma 100% automatizada e instantánea."
  },
  {
    q: "¿Tengo que pagar una suscripción mensual?",
    a: "No. Onvivo es un servicio de configuración de pago único. Una vez configurado y activado, el sistema te pertenece para siempre. No cobramos ningún tipo de mensualidades ni tarifas recurrentes de mantenimiento."
  },
  {
    q: "¿En qué dispositivos puedo configurarlo?",
    a: "Nuestra configuración de alta gama es totalmente multiplataforma y universal. Es compatible con Smart TVs (Android TV, Chromecast, Fire TV Stick), PC (Windows, Mac, Linux), Android e iOS. Una sola configuración se sincroniza automáticamente en todos tus dispositivos."
  },
  {
    q: "¿Es totalmente seguro el proceso?",
    a: "Es 100% seguro y confidencial. No solicitamos ni almacenamos credenciales bancarias o datos sensibles de navegación. Toda la automatización del setup se procesa de forma transparente y bajo estándares modernos de encriptación."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-32 relative overflow-hidden bg-[#030306] border-t border-white/5">
      {/* Luces sutiles en los costados */}
      <div className="absolute top-1/3 left-[-15%] w-[400px] h-[400px] bg-[#00F0FF]/2 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 right-[-15%] w-[400px] h-[400px] bg-[#FF007A]/2 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Encabezado */}
        <div className="text-center mb-24 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/5 backdrop-blur-md">
            <HelpCircle className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span className="text-[10px] md:text-xs font-mono font-bold tracking-[0.2em] text-white/50 uppercase">CENTRO DE AYUDA</span>
          </div>
          
          <h2 className="text-3xl md:text-6xl font-black mb-6 tracking-tighter uppercase leading-[0.98]">
            DESPEJA TUS <br />
            <span className="bg-gradient-to-r from-[#00F0FF] via-[#AD00FF] to-[#FF007A] text-transparent bg-clip-text drop-shadow-[0_0_20px_rgba(0,240,255,0.15)]">
              DUDAS
            </span>
          </h2>
          
          <p className="text-white/40 max-w-md text-sm md:text-base leading-relaxed">
            ¿Tienes alguna pregunta sobre el funcionamiento de Onvivo? Encuentra respuestas inmediatas a continuación.
          </p>
        </div>

        {/* Lista de Acordeones Flotantes en Cristal */}
        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className={`group rounded-2xl backdrop-blur-md border transition-all duration-500 overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.45)] ${
                  isOpen 
                    ? "bg-white/[0.03] border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.6)]" 
                    : "bg-white/[0.01] border-white/5 hover:border-white/10 hover:bg-white/[0.02]"
                }`}
              >
                {/* Iluminación ambiental suave interior si está activo */}
                {isOpen && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00F0FF]/[0.02] via-[#AD00FF]/[0.01] to-[#FF007A]/[0.02] pointer-events-none -z-10" />
                )}

                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left transition-colors cursor-pointer"
                >
                  <span className={`text-base md:text-lg font-bold tracking-tight pr-4 transition-colors duration-300 ${
                    isOpen ? "text-[#00F0FF]" : "text-white/90 group-hover:text-white"
                  }`}>
                    {faq.q}
                  </span>
                  
                  {/* Botón de Expansión Neón */}
                  <div className={`w-10 h-10 shrink-0 rounded-xl bg-white/[0.02] border flex items-center justify-center transition-all duration-300 ${
                    isOpen 
                      ? "border-[#00F0FF]/30 text-[#00F0FF] scale-110 shadow-[0_0_12px_rgba(0,240,255,0.25)]" 
                      : "border-white/5 text-white/30 group-hover:text-white/80 group-hover:border-white/10 group-hover:bg-white/5"
                  }`}>
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                    >
                      <div className="px-6 md:px-8 pb-8 text-white/50 leading-relaxed text-sm md:text-base pr-8 md:pr-16 max-w-3xl border-t border-white/5 pt-6">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

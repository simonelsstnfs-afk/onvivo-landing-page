import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "¿Qué es exactamente Onvivo?",
    a: "Onvivo es un servicio de configuración asistida. Te ayudamos a configurar una plataforma de streaming similar a Stremio de manera profesional, optimizada y rápida a través de un bot de Telegram."
  },
  {
    q: "¿Necesito conocimientos técnicos?",
    a: "Para nada. El bot está diseñado para guiarte paso a paso. Si puedes usar Telegram, puedes configurar Onvivo."
  },
  {
    q: "¿Tengo que pagar una suscripción mensual?",
    a: "No. Onvivo es un servicio de configuración. Una vez configurado, el sistema es tuyo. No cobramos mensualidades por el uso de la plataforma."
  },
  {
    q: "¿En qué dispositivos funciona?",
    a: "Funciona en Smart TVs (Android TV), PC (Windows, Mac, Linux), Android e iOS. Una configuración sirve para todos tus dispositivos."
  },
  {
    q: "¿Es seguro?",
    a: "Totalmente. No almacenamos tus datos personales sensibles y el proceso se realiza bajo estándares de seguridad modernos para garantizar tu privacidad."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-brand-primary uppercase tracking-[0.3em] mb-4">Preguntas Frecuentes</h2>
          <h3 className="text-4xl font-black mb-4">DESPEJA TUS DUDAS</h3>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-white/10 last:border-b-0 overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between py-8 text-left hover:text-brand-primary transition-colors group"
              >
                <span className="font-black text-xl uppercase tracking-tighter">{faq.q}</span>
                <div className="shrink-0 ml-4 text-white/20 group-hover:text-brand-primary">
                  {openIndex === i ? <Minus size={24} /> : <Plus size={24} />}
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="pb-8 text-white/50 leading-relaxed text-sm max-w-2xl">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

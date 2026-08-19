import React from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

export const FAQ: React.FC = () => {
  const faqItems = [
    {
      q: '¿En qué dispositivos puedo usar el servicio de Onvivo?',
      a: 'Onvivo es compatible con prácticamente cualquier dispositivo moderno: Smart TVs con Android TV o Google TV (Sony, Philips, Xiaomi, TCL), Amazon Fire TV Stick (todos los modelos), Xiaomi Mi Box, Chromecast con Google TV, ordenadores PC con Windows, Mac (macOS), Linux, así como teléfonos y tablets Android e iOS/iPadOS.',
    },
    {
      q: '¿Es legal utilizar el servicio de configuración de Onvivo?',
      a: 'Completamente. Onvivo es un servicio técnico y digital de optimización, personalización y documentación educativa para centros de streaming multimedia de código abierto. No alojamos, distribuimos ni retransmitimos contenidos audiovisuales bajo derechos de autor en nuestros servidores; proporcionamos la consultoría técnica y la preparación para que disfrutes de tu entorno de manera fluida y segura.',
    },
    {
      q: '¿Cómo y cuándo recibo mi configuración tras realizar el pago?',
      a: 'La entrega es 100% digital e inmediata. En menos de 2 minutos tras completar tu pago seguro a través de Polar.sh, recibirás en tu correo electrónico tus credenciales maestras preconfiguradas y la Guía Visual Interactiva en PDF con instrucciones paso a paso adaptadas a tus dispositivos seleccionados.',
    },
    {
      q: '¿Realmente es un pago único de 65€ o hay cuotas ocultas?',
      a: 'Es un pago único de 65€ (o 75$). No hay suscripciones mensuales, ni renovaciones automáticas, ni costes ocultos por parte de Onvivo. Una vez adquirido, dispones de tu configuración y de las guías de optimización de forma permanente.',
    },
    {
      q: '¿Qué ocurre si necesito ayuda durante la puesta en marcha?',
      a: 'El pack incluye una Guía Visual Interactiva exhaustiva en PDF con capturas reales y explicaciones detalladas botón por botón para cada tipo de dispositivo (Smart TV, PC, Fire TV, móvil). La puesta en marcha está diseñada para completarse en menos de 60 segundos con solo iniciar sesión.',
    },
  ];

  return (
    <section
      id="faq"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#050510] overflow-hidden border-t border-white/5"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-[#A855F7] text-xs font-mono font-bold uppercase tracking-[0.2em] mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>PREGUNTAS FRECUENTES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-[0.98] font-display">
            TODO LO QUE NECESITAS <br />
            <span className="text-gradient-cyan">SABER SOBRE ONVIVO</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-white/60 leading-relaxed font-grotesk max-w-xl">
            Transparencia absoluta sobre compatibilidad, legalidad, velocidad de entrega y soporte.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4 font-grotesk">
          {faqItems.map((item, index) => (
            <details
              key={index}
              className="group rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-cyan-500/30 p-6 transition-all duration-300 open:bg-[#070714]/90 open:border-cyan-500/40 open:shadow-[0_10px_30px_rgba(0,240,255,0.1)]"
            >
              <summary className="flex items-center justify-between cursor-pointer font-bold text-white text-base sm:text-lg select-none list-none uppercase tracking-tight">
                <span>{item.q}</span>
                <span className="ml-4 w-7 h-7 rounded-full bg-white/5 group-open:bg-cyan-500/20 flex items-center justify-center text-[#00F0FF] transition-transform duration-300 group-open:rotate-180 shrink-0">
                  <ChevronDown className="w-4 h-4" />
                </span>
              </summary>
              <div className="mt-4 pt-4 border-t border-white/[0.06] text-sm text-white/70 leading-relaxed">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

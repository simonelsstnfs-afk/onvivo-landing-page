
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'

const FAQS = [
  {
    q: '¿Qué es exactamente onvivo?',
    a: 'onvivo es un sistema operativo B2B para la configuración automatizada de streaming premium. Combinamos inteligencia robótica (Playwright), un panel de control para socios revendedores y un catálogo global unificado de 7 addons premium. Vendemos llaves de activación prepago a socios mayoristas, quienes las revenden a usuarios finales con un margen del 80% al 90%. El setup se completa en menos de 3 minutos de forma 100% autónoma.',
  },
  {
    q: '¿Necesito tener conocimientos técnicos?',
    a: 'No. Hemos diseñado onvivo específicamente para eliminar cualquier barrera técnica. Tanto el socio revendedor como el usuario final solo necesitan seguir un asistente web intuitivo. La configuración se ejecuta automáticamente en segundo plano mediante Playwright, sin instalación manual de addons ni edición de preferencias complejas. Si el setup falla por cualquier motivo, el sistema reembolsa la llave automáticamente.',
  },
  {
    q: '¿Tengo que pagar una suscripción mensual?',
    a: 'No existen suscripciones. El modelo de onvivo es de pago único: 50€ para el usuario final, con acceso permanente de por vida. Para socios B2B, el coste base es de 20€ por llave de activación prepago, sin caducidad y con consumo atómico (solo se consume si el setup tiene éxito). No hay recargos mensuales ocultos ni renovaciones automáticas.',
  },
  {
    q: '¿En qué dispositivos puedo configurarlo?',
    a: 'onvivo es 100% multiplataforma. Una vez completado el setup, puedes acceder desde cualquier Smart TV (Samsung, LG, Android TV, Apple TV), PC (Windows, macOS, Linux), smartphone o tablet (iOS, Android). La sincronización entre dispositivos es automática. Solo necesitas instalar Stremio en cada dispositivo e iniciar sesión con las credenciales que te proporciona el sistema.',
  },
  {
    q: '¿Es totalmente seguro el proceso?',
    a: 'Sí. La seguridad es prioridad absoluta en cada paso. Utilizamos la pasarela de pago Lemon Squeezy, certificada y encriptada con TLS 1.3. No almacenamos datos sensibles de pago. Las llaves de activación se procesan de forma atómica y el reembolso es automático si el setup falla. Para socios B2B, el panel de control utiliza autenticación de dos factores y registro completo de auditoría.',
  },
  {
    q: '¿Cómo funciona el programa de socios B2B?',
    a: 'Como socio revendedor obtienes acceso al Panel de Control de onvivo, donde puedes adquirir packs de llaves a precio mayorista (20€ base, 18€ desde 25 llaves, 15€ desde 100 llaves). Cada llave se revende al precio que tú decidas (recomendado 25-50€), conservando el margen neto. El panel incluye gestión de saldo, historial de activaciones, soporte prioritario directo del Administrador y API de integración para volumen.',
  },
]

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <section id="faq" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute left-1/2 top-0 -translate-x-1/2 h-px w-full section-divider" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/5 px-4 py-1.5 text-xs font-mono uppercase tracking-[0.3em] text-violet-200 mb-6"
          >
            <HelpCircle className="h-3.5 w-3.5" /> Centro de Ayuda
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-6xl font-black tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Despeja tus
            <span className="text-gradient-violet"> dudas</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 text-lg text-slate-300/85"
          >
            ¿Tienes alguna pregunta sobre el funcionamiento de onvivo? Encuentra respuestas
            inmediatas a continuación.
          </motion.p>
        </div>

        <div className="space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = openIdx === i
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={`glass-card rounded-xl border transition-all duration-300 ${
                  isOpen
                    ? 'border-cyan-500/40 shadow-[0_0_30px_rgba(0,240,255,0.15)]'
                    : 'border-white/8 hover:border-cyan-500/20'
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-base sm:text-lg font-semibold transition-colors ${
                      isOpen ? 'text-cyan-300' : 'text-white'
                    }`}
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {item.q}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                      isOpen ? 'bg-cyan-500/15 text-cyan-300' : 'bg-white/5 text-slate-400'
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 sm:px-6 pb-5 text-sm text-slate-300/90 leading-relaxed">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

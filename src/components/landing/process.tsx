
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Sliders, Cpu, PlayCircle, ArrowRight } from 'lucide-react'

const STEPS = [
  {
    num: '01',
    icon: Sliders,
    title: 'Personaliza la cuenta de tu cliente',
    description:
      'Introduce el correo de tu cliente y personaliza el idioma de sus subtítulos directamente en tu panel de control B2B en segundos.',
    accent: 'cyan',
  },
  {
    num: '02',
    icon: Cpu,
    title: 'Creación Automatizada',
    description:
      'Con solo un clic, nuestro motor inteligente consume una llave de tu saldo y configura la cuenta de Stremio con los 9 Addons premium de forma 100% autónoma.',
    accent: 'violet',
  },
  {
    num: '03',
    icon: PlayCircle,
    title: 'Entrega Inmediata',
    description:
      'Entrega las credenciales a tu cliente. Solo tendrá que iniciar sesión en su Smart TV, PC o móvil y disfrutar del catálogo unificado en 1080p sin configurar nada.',
    accent: 'magenta',
  },
]

const ACCENT: Record<string, { text: string; bg: string; border: string; from: string }> = {
  cyan: { text: 'text-cyan-300', bg: 'bg-cyan-500/10', border: 'border-cyan-500/40', from: 'from-cyan-500' },
  violet: { text: 'text-violet-300', bg: 'bg-violet-500/10', border: 'border-violet-500/40', from: 'from-violet-500' },
  magenta: { text: 'text-pink-300', bg: 'bg-pink-500/10', border: 'border-pink-500/40', from: 'from-pink-500' },
}

export function Process() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start center', 'end center'] })
  const lineScale = useTransform(scrollYProgress, [0.1, 0.9], [0, 1])

  return (
    <section id="process" ref={ref} className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute left-1/2 top-0 -translate-x-1/2 h-px w-full section-divider" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-mono uppercase tracking-[0.4em] text-cyan-300 mb-4"
          >
            <span className="text-violet-400">◆</span> Flujo Simplificado
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-6xl font-black tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Simplicidad
            <span className="text-gradient-cyan"> pura</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 text-lg text-slate-300/85 leading-relaxed"
          >
            Centrados en tu rentabilidad y tiempo. No necesitas conocimientos técnicos previos: hemos
            simplificado todo el proceso a través de automatización para que la cuenta de tu cliente esté 
            lista y configurada en menos de 3 minutos de reloj.
          </motion.p>
        </div>

        {/* Steps with connecting line */}
        <div className="relative">
          {/* Vertical/horizontal connecting line */}
          <div className="hidden lg:block absolute top-[88px] left-[10%] right-[10%] h-px bg-white/10">
            <motion.div
              style={{ scaleX: lineScale, transformOrigin: 'left' }}
              className="h-full bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-400"
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {STEPS.map((step, i) => {
              const a = ACCENT[step.accent]
              const Icon = step.icon
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.7, delay: i * 0.2 }}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Icon orb */}
                  <div className={`relative mb-8 h-32 w-32 rounded-full ${a.bg} border ${a.border} backdrop-blur-sm flex items-center justify-center group hover:scale-105 transition-transform`}>
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${a.from}/30 to-transparent opacity-50`} />
                    <Icon className={`h-12 w-12 ${a.text} relative z-10`} />

                    {/* Step number */}
                    <div
                      className={`absolute -top-3 -right-3 h-10 w-10 rounded-full bg-[#0a0a1f] border ${a.border} flex items-center justify-center text-xs font-mono font-bold ${a.text}`}
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {step.num}
                    </div>

                    {/* Pulsing ring */}
                    <div className={`absolute inset-0 rounded-full border ${a.border} animate-pulse-glow opacity-50`} />
                  </div>

                  <h3
                    className="text-2xl font-bold text-white mb-4"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-300/85 leading-relaxed max-w-xs">
                    {step.description}
                  </p>

                  {/* Arrow connector on mobile */}
                  {i < STEPS.length - 1 && (
                    <div className="lg:hidden mt-8 mb-2">
                      <ArrowRight className="h-5 w-5 text-slate-600 rotate-90" />
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Bottom benefits strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-20 flex flex-wrap items-center justify-center gap-4 sm:gap-8"
        >
          {[
            'Automatización total de plugins',
            'Soporte técnico de activación incluido',
            'Actualizaciones de contenido automáticas',
          ].map((b) => (
            <div
              key={b}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-5 py-2 text-sm text-slate-200 backdrop-blur-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
              {b}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

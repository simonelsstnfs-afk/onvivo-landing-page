
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import {
  Cpu,
  Rocket,
  Lock,
  Globe2,
  Infinity as InfinityIcon,
  Wand2,
} from 'lucide-react'

const FEATURES = [
  {
    icon: Cpu,
    title: 'Inteligencia Robótica',
    description:
      'Hemos rediseñado los estándares de automatización para ofrecer un servicio de configuración de streaming rápido, fluido y permanente. Nuestro motor inteligente procesa tus preferencias y activa tu servicio en segundos de forma 100% autónoma.',
    accent: 'cyan',
  },
  {
    icon: Wand2,
    title: 'Wizard Interactivo',
    description:
      'Configura tus preferencias de audio, subtítulos, anime e idiomas en tiempo real mediante nuestro asistente web inteligente integrado. Personalización profunda sin necesidad de conocimientos técnicos previos.',
    accent: 'violet',
  },
  {
    icon: Lock,
    title: 'Seguridad Absoluta',
    description:
      'Mantenemos tu privacidad y seguridad como prioridad absoluta en cada paso del proceso. Pasarela de pago segura Lemon Squeezy, sin almacenamiento de datos sensibles y reembolso automático si el setup falla.',
    accent: 'magenta',
  },
  {
    icon: Globe2,
    title: 'Multi-Catálogo Global',
    description:
      'Accede a las mejores fuentes de contenido y librerías mundiales de alta calidad en un solo lugar. Catálogo unificado que reemplaza 5 suscripciones distintas con un solo pago de 50€ para siempre.',
    accent: 'emerald',
  },
  {
    icon: Rocket,
    title: 'Multiplataforma Real',
    description:
      'Configúralo una vez y disfrútalo en tu Smart TV, PC o dispositivo móvil sin complicaciones. Setup en 3 clics, llaves sin caducidad y compatibilidad total con todos los sistemas operativos modernos.',
    accent: 'cyan',
  },
  {
    icon: InfinityIcon,
    title: 'Sin Suscripciones',
    description:
      'Un único servicio de configuración permanente para liberar todo el potencial de tu streaming. Pago único, acceso de por vida, sin recargos mensuales ocultos ni renovaciones automáticas indeseadas.',
    accent: 'violet',
  },
]

const ACCENT_MAP: Record<string, { text: string; border: string; bg: string; glow: string }> = {
  cyan: {
    text: 'text-cyan-300',
    border: 'border-cyan-500/30',
    bg: 'bg-cyan-500/10',
    glow: 'group-hover:shadow-[0_0_30px_rgba(0,240,255,0.35)]',
  },
  violet: {
    text: 'text-violet-300',
    border: 'border-violet-500/30',
    bg: 'bg-violet-500/10',
    glow: 'group-hover:shadow-[0_0_30px_rgba(168,85,247,0.35)]',
  },
  magenta: {
    text: 'text-pink-300',
    border: 'border-pink-500/30',
    bg: 'bg-pink-500/10',
    glow: 'group-hover:shadow-[0_0_30px_rgba(236,72,153,0.35)]',
  },
  emerald: {
    text: 'text-emerald-300',
    border: 'border-emerald-500/30',
    bg: 'bg-emerald-500/10',
    glow: 'group-hover:shadow-[0_0_30px_rgba(16,185,129,0.35)]',
  },
}

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Parallax for decorative element
  const yBlob1 = useTransform(scrollYProgress, [0, 1], ['-10%', '30%'])
  const yBlob2 = useTransform(scrollYProgress, [0, 1], ['20%', '-20%'])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* Parallax blobs */}
      <motion.div
        style={{ y: yBlob1 }}
        className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-cyan-500/15 blur-[120px] pointer-events-none"
      />
      <motion.div
        style={{ y: yBlob2 }}
        className="absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-violet-500/15 blur-[120px] pointer-events-none"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-4xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="inline-block text-xs font-mono uppercase tracking-[0.4em] text-cyan-300 mb-4"
          >
            <span className="text-violet-400">◆</span> Quiénes Somos
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-6xl font-black tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Tecnología de <span className="text-gradient-violet">Élite</span> para
            <span className="block text-gradient-cyan mt-2">máxima potencia</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-8 text-lg sm:text-xl text-slate-300/90 leading-relaxed"
          >
            onvivo es un sistema operativo de streaming B2B que transforma la manera en que
            configuras y consumes tu contenido digital. Mediante automatización inteligente
            de máxima fidelidad, ofrecemos configuraciones optimizadas a tu medida, eliminando
            los tutoriales complejos y los procesos manuales lentos. Nuestra misión es clara:
            <span className="text-cyan-300 font-semibold"> democratizar el acceso a streaming premium</span> mediante
            tecnología robótica de última generación.
          </motion.p>
        </div>

        {/* Feature grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => {
            const accent = ACCENT_MAP[f.accent]
            const Icon = f.icon
            return (
              <motion.article
                key={f.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
                className={`group glass-card rounded-2xl p-6 border ${accent.border} transition-all duration-500 hover:-translate-y-1 ${accent.glow}`}
              >
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${accent.bg} ${accent.text} mb-5 ring-1 ring-white/10`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3
                  className="text-xl font-bold mb-3 text-white"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {f.title}
                </h3>
                <p className="text-sm text-slate-300/85 leading-relaxed">
                  {f.description}
                </p>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className={`absolute top-3 right-3 h-8 w-8 border-t-2 border-r-2 ${accent.border.replace('/30', '/80')}`} />
                </div>
              </motion.article>
            )
          })}
        </div>

        {/* Mission banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="mt-16 relative conic-border p-px overflow-hidden rounded-2xl"
        >
          <div className="relative bg-[#0a0a1f]/80 backdrop-blur-xl rounded-2xl px-6 sm:px-12 py-10 sm:py-14">
            <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <div className="text-xs font-mono uppercase tracking-[0.3em] text-cyan-300 mb-3">
                  Nuestra Misión
                </div>
                <p
                  className="text-2xl sm:text-3xl font-bold leading-snug text-white"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Transformando la manera en que configuras y consumes tu
                  <span className="text-gradient-cyan"> contenido digital</span> mediante
                  <span className="text-gradient-violet"> automatización inteligente</span>.
                </p>
              </div>
              <div className="flex flex-row lg:flex-col gap-6 lg:gap-4 lg:pl-8 lg:border-l lg:border-white/10">
                <div>
                  <div className="text-3xl font-black text-gradient-cyan" style={{ fontFamily: 'var(--font-display)' }}>
                    80-90%
                  </div>
                  <div className="text-xs text-slate-400 font-mono uppercase tracking-wider">Margen B2B</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-gradient-violet" style={{ fontFamily: 'var(--font-display)' }}>
                    3 min
                  </div>
                  <div className="text-xs text-slate-400 font-mono uppercase tracking-wider">Setup total</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

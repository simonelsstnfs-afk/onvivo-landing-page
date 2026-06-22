
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Zap, ArrowRight, Shield, Star, CheckCircle2 } from 'lucide-react'

const FINAL_STATS = [
  { value: '+500', label: 'Configuraciones activas' },
  { value: '4.9/5', label: 'Satisfacción usuarios' },
  { value: '100%', label: 'Pago seguro garantizado' },
  { value: '3 min', label: 'Tiempo medio de setup' },
]

export function CTA() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y1 = useTransform(scrollYProgress, [0, 1], ['-20%', '20%'])
  const y2 = useTransform(scrollYProgress, [0, 1], ['10%', '-30%'])

  return (
    <section id="cta" ref={ref} className="relative py-24 sm:py-32 overflow-hidden">
      {/* Animated background */}
      <motion.div
        style={{ y: y1 }}
        className="absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[150px] pointer-events-none"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute right-1/4 bottom-0 h-[500px] w-[500px] rounded-full bg-violet-500/20 blur-[150px] pointer-events-none"
      />

      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Main CTA card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="relative conic-border p-px rounded-3xl overflow-hidden"
        >
          <div className="relative bg-[#070718]/90 backdrop-blur-2xl rounded-3xl px-6 sm:px-12 lg:px-20 py-14 sm:py-20 text-center overflow-hidden">
            {/* Inner glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.1),transparent_60%)] pointer-events-none" />

            {/* Floating sparkles */}
            <div className="absolute top-10 left-10 text-cyan-300/40 animate-float">
              <Star className="h-5 w-5" />
            </div>
            <div className="absolute top-20 right-12 text-violet-300/40 animate-float" style={{ animationDelay: '1s' }}>
              <Star className="h-4 w-4" />
            </div>
            <div className="absolute bottom-16 left-16 text-pink-300/40 animate-float" style={{ animationDelay: '2s' }}>
              <Star className="h-6 w-6" />
            </div>

            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 px-4 py-1.5 text-xs font-mono uppercase tracking-[0.3em] text-cyan-200 mb-8"
              >
                <Shield className="h-3.5 w-3.5 text-emerald-400" /> Soporte 100% Garantizado
              </motion.div>

              <h2
                className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                <span className="block text-white">¿Listo para llevar tu</span>
                <span className="block text-gradient-neon">negocio al próximo nivel?</span>
              </h2>

              <p className="mt-8 max-w-2xl mx-auto text-lg text-slate-300/90 leading-relaxed">
                Únete a nuestra red de revendedores exclusivos y empieza a generar ingresos con
                márgenes de hasta el 300%. Sistema llave en mano, sin servidores que administrar.
              </p>

              {/* Price highlight */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-10 inline-flex flex-col items-center gap-1"
              >
                <div className="flex items-baseline gap-2">
                  <span
                    className="text-6xl sm:text-7xl font-black text-gradient-cyan"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    20€
                  </span>
                  <span className="text-sm font-mono uppercase tracking-widest text-slate-400">
                    / llave
                  </span>
                </div>
                <span className="text-xs font-mono uppercase tracking-[0.3em] text-cyan-300">
                  Sin mensualidades · Cero costes de infraestructura
                </span>
              </motion.div>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <a
                  href="#contact"
                  className="btn-neon group inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-bold"
                >
                  <Zap className="h-5 w-5" />
                  Solicitar Información
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="/login"
                  className="btn-outline-neon inline-flex items-center gap-2 rounded-xl px-6 py-4 text-base font-semibold"
                >
                  Ya soy Socio
                </a>
              </motion.div>

              {/* Trust badges */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-400"
              >
                {[
                  'Sin suscripciones',
                  'Sin caducidad',
                  'Reembolso automático',
                  'Soporte prioritario',
                ].map((t) => (
                  <span key={t} className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    {t}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Stats grid */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {FINAL_STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card rounded-xl border border-white/8 p-5 text-center"
            >
              <div
                className={`text-3xl sm:text-4xl font-black ${
                  i % 2 === 0 ? 'text-gradient-cyan' : 'text-gradient-violet'
                }`}
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {s.value}
              </div>
              <div className="mt-2 text-[10px] sm:text-xs uppercase tracking-widest text-slate-400 font-mono">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

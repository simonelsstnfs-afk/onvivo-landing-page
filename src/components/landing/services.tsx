import React from 'react'
import { motion } from 'framer-motion'
import {
  Sparkles,
  Zap,
  Shield,
  Layers,
  Smartphone,
  Wallet,
  Headphones,
  RefreshCw,
  Key,
} from 'lucide-react'

const SERVICES = [
  {
    icon: Zap,
    title: 'Setup Automatizado',
    subtitle: 'EFICIENCIA',
    description:
      'Olvida las configuraciones manuales o enviar tutoriales a tus clientes. Nuestro motor Playwright crea y configura las cuentas de tus clientes en Stremio con los 9 addons en segundos de forma 100% autónoma, sin fricciones ni errores.',
    metrics: [
      { label: 'Tiempo medio', value: '< 3 min' },
      { label: 'Tasa de éxito', value: '99.2%' },
    ],
    accent: 'cyan',
  },
  {
    icon: Key,
    title: 'Llaves Prepago B2B',
    subtitle: 'REVENDEDORES',
    description:
      'Adquiere llaves por unidad a precio de socio y revende al precio que tú decidas. Obtén un margen de beneficio neto directo de hasta un 300% (80€ de ganancia pura por cada llave si la vendes a 100€). Llaves sin caducidad y consumo seguro (solo se descuenta si la instalación tiene éxito).',
    metrics: [
      { label: 'Coste unitario', value: '20€ / llave' },
      { label: 'PVP recomendado', value: '60 - 100€' },
    ],
    accent: 'violet',
  },
  {
    icon: Layers,
    title: '9 Addons Premium',
    subtitle: 'CATÁLOGO',
    description:
      'Multi-catálogo de las principales plataformas de streaming en un solo lugar. Ofrece a tus clientes películas y series en tendencia, cartelera de cine y clásicos inolvidables en 1080p, con subtítulos garantizados en su idioma al 90%.',
    metrics: [
      { label: 'Addons', value: '9 premium' },
      { label: 'Resolución', value: '1080p Full HD' },
    ],
    accent: 'magenta',
  },
  {
    icon: Shield,
    title: 'Reembolso Automático',
    subtitle: 'GARANTÍA',
    description:
      'Consumo seguro de llave: la llave solo se descuenta de tu inventario si el setup se completa con éxito. Si algo falla durante la creación, la llave no se consume. Tu inversión siempre está protegida.',
    metrics: [
      { label: 'Política', value: '100% segura' },
      { label: 'Reembolso', value: 'Automático' },
    ],
    accent: 'emerald',
  },
  {
    icon: Smartphone,
    title: 'Multiplataforma Total',
    subtitle: 'COMPATIBILIDAD',
    description:
      'Tus clientes podrán disfrutar del servicio en Smart TV, PC, móvil, tablet o cualquier dispositivo compatible con Stremio. La sincronización es perfecta entre todos sus dispositivos sin que tengan que realizar configuraciones adicionales.',
    metrics: [
      { label: 'Plataformas', value: 'Smart TV · PC · Mobile' },
      { label: 'Sync', value: 'Cross-device' },
    ],
    accent: 'cyan',
  },
  {
    icon: Headphones,
    title: 'Soporte Prioritario B2B',
    subtitle: 'ASISTENCIA',
    description:
      'Soporte técnico de activación incluido y atención prioritaria directa del Administrador para socios revendedores. Respuesta garantizada en menos de 24 horas hábiles.',
    metrics: [
      { label: 'Canal', value: 'Directo Admin' },
      { label: 'SLA', value: '< 24h' },
    ],
    accent: 'violet',
  },
]

const ACCENT: Record<string, { text: string; bg: string; border: string; gradient: string; shadow: string }> = {
  cyan: {
    text: 'text-cyan-300',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/40',
    gradient: 'from-cyan-500/20 to-cyan-500/0',
    shadow: 'hover:shadow-[0_0_40px_rgba(0,240,255,0.25)]',
  },
  violet: {
    text: 'text-violet-300',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/40',
    gradient: 'from-violet-500/20 to-violet-500/0',
    shadow: 'hover:shadow-[0_0_40px_rgba(168,85,247,0.25)]',
  },
  magenta: {
    text: 'text-pink-300',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/40',
    gradient: 'from-pink-500/20 to-pink-500/0',
    shadow: 'hover:shadow-[0_0_40px_rgba(236,72,153,0.25)]',
  },
  emerald: {
    text: 'text-emerald-300',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/40',
    gradient: 'from-emerald-500/20 to-emerald-500/0',
    shadow: 'hover:shadow-[0_0_40px_rgba(16,185,129,0.25)]',
  },
}

export function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
      <div className="absolute left-1/2 top-0 -translate-x-1/2 h-px w-full section-divider" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-mono uppercase tracking-[0.4em] text-violet-300 mb-4"
          >
            <span className="text-cyan-400">◆</span> Qué Ofrecemos
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-6xl font-black tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Tecnología
            <span className="text-gradient-cyan"> sin límites</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 text-lg text-slate-300/85 leading-relaxed"
          >
            Hemos rediseñado e integrado los mejores estándares de automatización para ofrecerte
            un servicio de configuración de streaming rápido, fluido y permanente. Soluciones
            B2B end-to-end para revendedores y partners.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => {
            const a = ACCENT[s.accent]
            const Icon = s.icon
            return (
              <motion.article
                key={s.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
                className={`group relative glass-card rounded-2xl p-7 border ${a.border} transition-all duration-500 hover:-translate-y-2 ${a.shadow}`}
              >
                {/* Top gradient overlay */}
                <div className={`absolute inset-x-0 top-0 h-32 bg-gradient-to-b ${a.gradient} rounded-t-2xl pointer-events-none opacity-60`} />

                <div className="relative">
                  {/* Icon + subtitle */}
                  <div className="flex items-start justify-between mb-5">
                    <div className={`inline-flex h-14 w-14 items-center justify-center rounded-xl ${a.bg} ${a.text} ring-1 ring-white/10 backdrop-blur-sm`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-slate-500 mt-2">
                      {s.subtitle}
                    </span>
                  </div>

                  <h3
                    className="text-2xl font-bold mb-3 text-white"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-sm text-slate-300/85 leading-relaxed mb-6">
                    {s.description}
                  </p>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-3 pt-5 border-t border-white/5">
                    {s.metrics.map((m) => (
                      <div key={m.label}>
                        <div className={`text-base font-bold ${a.text}`} style={{ fontFamily: 'var(--font-display)' }}>
                          {m.value}
                        </div>
                        <div className="text-[10px] uppercase tracking-wider text-slate-500 font-mono mt-0.5">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Corner accents on hover */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Sparkles className={`h-4 w-4 ${a.text}`} />
                </div>
              </motion.article>
            )
          })}
        </div>


      </div>
    </section>
  )
}

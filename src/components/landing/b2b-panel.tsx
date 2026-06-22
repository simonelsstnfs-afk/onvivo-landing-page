
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, lazy, Suspense } from 'react'
import {
  LayoutDashboard,
  Key,
  Wallet,
  History,
  TrendingUp,
  Users,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  Plus,
  Activity,
  Globe2,
} from 'lucide-react'

const PlaywrightTerminal = lazy(() => import('./playwright-terminal').then((m) => ({ default: m.PlaywrightTerminal })))

const RESELLER_BENEFITS = [
  'Llaves de activación prepago sin caducidad',
  'Setup de Stremio 100% automatizado con Playwright',
  'Consumo seguro de llave (solo si la instalación es exitosa)',
  'Reembolso automático de la llave si falla el setup',
  '9 Addons premium preinstalados listos para usar',
  'Soporte prioritario directo del Administrador',
  'Panel de control para gestionar clientes e historial',
  'Recarga de llaves directa desde tu panel de control',
]

const PRICE_TIERS = [
  {
    name: 'Socio Minorista',
    price: '20€',
    badge: '1 A 24 LLAVES',
    description: 'Precio base para comenzar',
    features: ['Soporte técnico directo', 'Panel de gestión B2B', 'Reembolso garantizado de llaves tras error de creación'],
    accent: 'cyan',
    highlighted: false,
  },
  {
    name: 'Socio Profesional',
    price: '16€',
    badge: '25 A 49 LLAVES',
    description: 'Mejor margen por volumen medio',
    features: ['Soporte técnico directo', 'Panel de gestión B2B', 'Reembolso garantizado de llaves tras error de creación', 'Branding personalizado'],
    accent: 'violet',
    highlighted: true,
  },
  {
    name: 'Socio Mayorista',
    price: '12€',
    badge: '50+ LLAVES',
    description: 'El máximo margen de beneficio',
    features: ['Soporte técnico directo', 'Panel de gestión B2B', 'Reembolso garantizado de llaves tras error de creación', 'Branding personalizado'],
    accent: 'magenta',
    highlighted: false,
  },
]

const ACCENT: Record<string, { text: string; border: string; bg: string; ring: string; glow: string }> = {
  cyan: {
    text: 'text-cyan-300',
    border: 'border-cyan-500/50',
    bg: 'bg-cyan-500/10',
    ring: 'ring-cyan-500/30',
    glow: 'shadow-[0_0_40px_rgba(0,240,255,0.25)]',
  },
  violet: {
    text: 'text-violet-300',
    border: 'border-violet-500/50',
    bg: 'bg-violet-500/10',
    ring: 'ring-violet-500/30',
    glow: 'shadow-[0_0_50px_rgba(168,85,247,0.35)]',
  },
  magenta: {
    text: 'text-pink-300',
    border: 'border-pink-500/50',
    bg: 'bg-pink-500/10',
    ring: 'ring-pink-500/30',
    glow: 'shadow-[0_0_40px_rgba(236,72,153,0.25)]',
  },
}

/* Mockup panel content */

function PanelMockup() {
  return (
    <div className="relative w-full max-w-[800px] rounded-3xl overflow-hidden glass-card shadow-2xl p-4 sm:p-6 flex flex-col h-[460px]">
      {/* Top Header */}
      <header className="flex items-center justify-between border-b border-white/5 pb-4 mb-6 shrink-0">
        <div>
          <h1 className="text-xl font-black uppercase tracking-tight text-white">
            Panel del <span className="text-[#00F0FF]">Socio</span>
          </h1>
          <p className="text-[10px] text-white/50 mt-1">
            Bienvenido, B2B Partner <span className="ml-1 px-1.5 py-0.5 rounded text-[8px] font-bold bg-emerald-500/20 text-emerald-400">ACTIVO</span>
          </p>
        </div>
        <div className="flex gap-2">
          <div className="h-8 w-8 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
            <LayoutDashboard className="h-4 w-4 text-[#00F0FF]" />
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 overflow-hidden">
        
        {/* Left Col - Stats */}
        <div className="col-span-1 space-y-4">
          <div className="bg-[#0a0a0f]/50 border border-white/5 p-4 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-[#00F0FF]/10 blur-xl rounded-full pointer-events-none" />
            <h2 className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-3 flex items-center gap-1.5">
              <Key className="w-3 h-3 text-[#00F0FF]" /> Balance
            </h2>
            <div className="text-2xl font-black text-[#00F0FF] tracking-tight">127</div>
            <div className="text-[9px] text-emerald-400 mt-1 flex items-center gap-1">
              <TrendingUp className="h-2 w-2" /> +8 llaves este mes
            </div>
          </div>

          <div className="bg-[#0a0a0f]/50 border border-[#AD00FF]/20 p-4 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-[#AD00FF]/10 blur-xl rounded-full pointer-events-none" />
            <h2 className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-3 flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#AD00FF]" /> Beneficio
            </h2>
            <div className="text-2xl font-black text-white/90 tracking-tight">420€</div>
            <div className="text-[9px] text-emerald-400 mt-1 flex items-center gap-1">
              <TrendingUp className="h-2 w-2" /> +12% vs mes anterior
            </div>
          </div>
        </div>

        {/* Right Col - Chart & Activity */}
        <div className="col-span-2 flex flex-col gap-4">
          {/* Chart area */}
          <div className="flex-1 bg-[#0a0a0f]/50 border border-white/5 rounded-2xl p-4 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[10px] font-black uppercase tracking-widest text-white/40">
                Activaciones (7 días)
              </h2>
              <Activity className="h-3 w-3 text-[#00F0FF]" />
            </div>
            <div className="flex-1 flex items-end gap-2 pb-2">
              {[40, 65, 45, 80, 55, 95, 70].map((h, i) => (
                <div key={i} className="flex-1 relative h-full">
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.08 }}
                    className="absolute bottom-0 inset-x-0 rounded-t bg-gradient-to-t from-[#00F0FF]/40 to-[#AD00FF]/40"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-[#0a0a0f]/50 border border-white/5 rounded-2xl p-4 space-y-3 shrink-0">
            {[
              { icon: CheckCircle2, color: 'text-emerald-400', text: 'Setup automatizado #A8F2', time: '2m' },
              { icon: Plus, color: 'text-[#00F0FF]', text: 'Compra de 10 llaves', time: '1h' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <item.icon className={`h-3 w-3 ${item.color} shrink-0`} />
                <span className="text-slate-300 truncate flex-1 text-[10px]">{item.text}</span>
                <span className="text-slate-500 font-mono text-[9px]">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Overlays */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00F0FF]/20 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-[#AD00FF]/20 to-transparent" />
      </div>
    </div>
  )
}

export function B2BPanel() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const yScene = useTransform(scrollYProgress, [0, 1], ['-15%', '15%'])

  return (
    <section id="panel" ref={ref} className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-violet-950/10 via-[#050510] to-cyan-950/10 pointer-events-none" />
      <motion.div
        style={{ y: yScene }}
        className="absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full bg-violet-500/20 blur-[140px] pointer-events-none"
      />
      <motion.div
        style={{ y: yScene }}
        className="absolute left-0 bottom-1/4 h-[400px] w-[400px] rounded-full bg-cyan-500/15 blur-[140px] pointer-events-none"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/5 px-4 py-1.5 text-xs font-mono uppercase tracking-[0.3em] text-violet-200 mb-6"
          >
            <span className="text-cyan-400">◆</span> Programa de Socios B2B
            <span className="text-cyan-400">◆</span>
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-6xl font-black tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Crea tu propia red de
            <span className="block text-gradient-violet">clientes premium</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 text-lg text-slate-300/85 leading-relaxed"
          >
            Activa cuentas de streaming premium para tus clientes de forma 100% automatizada con nuestro motor Playwright. Gestiona a tus usuarios y el consumo de tus llaves desde tu propio Panel de Control, obteniendo un margen de beneficio neto directo de hasta un 300%.
          </motion.p>
        </div>

        {/* Panel mockup + 3D scene side-by-side */}
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
          >
            <PanelMockup />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative h-[360px] lg:h-[460px] flex items-center justify-center p-4 lg:p-8"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-violet-500/5 to-transparent rounded-3xl" />
            <Suspense fallback={null}>
              <PlaywrightTerminal />
            </Suspense>
          </motion.div>
        </div>

        {/* Reseller benefits grid */}
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-4"
          >
            <h3
              className="text-2xl sm:text-3xl font-bold text-white"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Beneficios del
              <span className="text-gradient-cyan"> Socio Revendedor</span>
            </h3>
            <p className="text-slate-300/85 leading-relaxed text-sm">
              Como socio B2B de onvivo, obtienes acceso a infraestructura empresarial, soporte
              directo y herramientas de gestión profesional. Tu negocio de streaming escala sin
              fricciones técnicas.
            </p>
            <a
              href="#cta"
              className="btn-neon inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-bold mt-4"
            >
              Acceder y recargar
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="grid sm:grid-cols-2 gap-3"
          >
            {RESELLER_BENEFITS.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="flex items-start gap-2.5 rounded-xl border border-white/8 bg-white/[0.02] p-3 backdrop-blur-sm"
              >
                <CheckCircle2 className="h-4 w-4 text-cyan-400 mt-0.5 shrink-0" />
                <span className="text-xs text-slate-300 leading-relaxed">{b}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Price tiers */}
        <div className="grid md:grid-cols-3 gap-6">
          {PRICE_TIERS.map((tier, i) => {
            const a = ACCENT[tier.accent]
            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className={`relative ${
                  tier.highlighted ? `lg:-translate-y-4` : ''
                } transition-all duration-500 hover:-translate-y-2`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-4 py-1 text-[10px] font-mono uppercase tracking-wider text-[#050510] font-bold z-20 whitespace-nowrap">
                    {tier.badge}
                  </div>
                )}
                
                <div className={`h-full glass-card rounded-2xl p-6 border ${a.border} flex flex-col ${tier.highlighted ? a.glow : ''}`}>
                  {!tier.highlighted && (
                    <div className={`inline-block text-[10px] font-mono uppercase tracking-wider ${a.text} mb-3`}>
                      {tier.badge}
                    </div>
                  )}

                  <h4 className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                    {tier.name}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 mb-5">{tier.description}</p>

                  <div className="flex items-baseline gap-1 mb-6">
                    <span className={`text-4xl font-black ${a.text}`} style={{ fontFamily: 'var(--font-display)' }}>
                      {tier.price}
                    </span>
                    <span className="text-xs text-slate-500">/ llave</span>
                  </div>

                  <ul className="space-y-2.5 mb-2 flex-1">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                        <CheckCircle2 className={`h-4 w-4 ${a.text} mt-0.5 shrink-0`} />
                        <span className="leading-tight">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}


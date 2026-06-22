import React, { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Zap, Shield, Sparkles } from 'lucide-react'

const HeroScene = lazy(() => import('./three/hero-scene').then((m) => ({ default: m.HeroScene })))

const STATS = [
  { value: '+500', label: 'Configuraciones' },
  { value: '4.9/5', label: 'Satisfacción' },
  { value: '100%', label: 'Automatizado' },
]

const MARQUEE_ITEMS = [
  'CONFIGURACIÓN AUTOMATIZADA',
  'PANEL B2B',
  'MÁRGENES DE HASTA 150%',
  '9 ADDONS PREMIUM',
  '1080P FULL HD',
  'MULTIPLATAFORMA',
  'SOCIOS REVENDEDORES',
  'SOPORTE PRIORITARIO',
]

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden pt-24 pb-12"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid pointer-events-none" />

      {/* 3D scene as backdrop */}
      <div className="absolute inset-0 z-10 opacity-90 pointer-events-none">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>

      {/* Radial dark overlay for text legibility */}
      <div className="absolute inset-0 z-20 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,5,16,0.4)_60%,rgba(5,5,16,0.85)_100%)]" />

      {/* Content */}
      <div className="relative z-30 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-6rem)] flex flex-col items-center justify-center text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 px-4 py-1.5 backdrop-blur-sm mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300" />
          </span>
          <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-cyan-200">
            Programa de Socios B2B · Estreno 2026
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight max-w-5xl"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          <span className="block text-white">Tu Streaming</span>
          <span className="block text-gradient-neon">Premium B2B</span>
          <span className="block text-white">sin Complicaciones</span>
        </motion.h1>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-8 max-w-2xl text-base sm:text-lg lg:text-xl text-slate-300/90 leading-relaxed"
        >
          Plataforma de configuración automatizada de streaming para
          <span className="text-cyan-300 font-semibold"> revendedores y socios B2B</span>.
          Gestiona licencias, automatiza setups con inteligencia robótica y
          escala tu negocio desde un único panel de control.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="#contact"
            className="btn-neon group inline-flex items-center gap-2 rounded-xl px-7 py-4 text-base font-bold"
          >
            <Zap className="h-5 w-5" />
            Solicitar Acceso como Socio
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#services"
            className="btn-outline-neon inline-flex items-center gap-2 rounded-xl px-6 py-4 text-base font-semibold"
          >
            <Play className="h-4 w-4" />
            Descubrir Ventajas
          </a>
        </motion.div>

        {/* Quick badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.95 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1">
            <Shield className="h-3.5 w-3.5 text-emerald-400" /> Llaves a 20€
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" /> Setup en 3 minutos
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1">
            <Zap className="h-3.5 w-3.5 text-violet-400" /> 1080p Full HD
          </span>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="mt-16 grid grid-cols-3 gap-6 sm:gap-12"
        >
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div
                className="text-3xl sm:text-5xl font-black text-gradient-cyan"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {s.value}
              </div>
              <div className="mt-1 text-xs sm:text-sm uppercase tracking-widest text-slate-400 font-mono">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="absolute bottom-0 left-0 right-0 z-30 border-y border-cyan-500/10 bg-[#050510]/60 backdrop-blur-sm py-3 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="mx-6 text-xs font-mono uppercase tracking-[0.3em] text-cyan-300/60">
              {item} <span className="text-violet-400 mx-2">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 hidden sm:flex flex-col items-center gap-2 text-cyan-300/60"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-mono">Scroll</span>
        <div className="relative h-10 w-6 rounded-full border border-cyan-400/40">
          <motion.span
            animate={{ y: [4, 16, 4] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="absolute left-1/2 -translate-x-1/2 top-1 h-1.5 w-1.5 rounded-full bg-cyan-300"
          />
        </div>
      </motion.div>
    </section>
  )
}

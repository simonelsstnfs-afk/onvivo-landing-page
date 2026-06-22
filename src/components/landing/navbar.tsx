
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, LayoutDashboard, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'

const NAV_LINKS = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Quiénes Somos', href: '#about' },
  { label: 'Servicios', href: '#services' },
  { label: 'Panel B2B', href: '#panel' },
  { label: 'Proceso', href: '#process' },
  { label: 'FAQ', href: '#faq' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-[#050510]/80 backdrop-blur-xl border-b border-cyan-500/15 shadow-[0_8px_30px_rgba(0,0,0,0.5)]'
            : 'bg-transparent'
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 sm:h-20 items-center justify-between gap-4">
            {/* Logo */}
            <a href="#hero" className="flex items-center gap-3 group shrink-0">
              <div className="relative h-10 w-10 sm:h-12 sm:w-12 rounded-xl overflow-hidden ring-1 ring-cyan-500/40 group-hover:ring-cyan-400/80 transition-all">
                <img
                  src="/onvivo-logo.png"
                  alt="onvivo logo"
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-violet-500/20 mix-blend-overlay" />
              </div>
              <div className="flex flex-col leading-none">
                <span
                  className="text-xl sm:text-2xl font-black tracking-tight text-gradient-cyan"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  onvivo
                </span>
                <span className="text-[10px] tracking-[0.25em] text-cyan-300/60 uppercase font-mono">
                  B2B · Cloud
                </span>
              </div>
            </a>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors group tracking-wide"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {link.label}
                  <span className="absolute left-4 right-4 -bottom-0.5 h-px bg-gradient-to-r from-cyan-400 to-violet-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </a>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                to="/login"
                className="btn-outline-neon inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold"
              >
                <LayoutDashboard className="h-4 w-4" />
                Panel de Socio
              </Link>
              <a
                href="#cta"
                className="btn-neon inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm"
              >
                Acceso Inmediato
                <ChevronDown className="h-4 w-4 -rotate-90" />
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-500/30 text-cyan-300"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-[#050510]/90 backdrop-blur-xl"
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="absolute right-0 top-0 bottom-0 w-[78%] max-w-sm bg-[#0a0a1f]/95 border-l border-cyan-500/20 p-6 pt-24 flex flex-col gap-2"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                  className="block px-4 py-3 text-lg font-medium text-slate-200 hover:text-cyan-300 border-b border-white/5 tracking-wide"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="mt-6 flex flex-col gap-3">
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="btn-outline-neon inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Panel de Socio
                </Link>
                <a
                  href="#cta"
                  onClick={() => setMobileOpen(false)}
                  className="btn-neon inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm"
                >
                  Acceso Inmediato
                </a>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

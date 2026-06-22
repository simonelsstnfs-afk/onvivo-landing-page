import { Link } from 'react-router-dom'
import { Mail, MessageCircle, Send } from 'lucide-react'

const NAV_GROUPS = [
  {
    title: 'Navegación',
    links: [
      { label: 'Inicio', href: '#hero' },
      { label: 'Quiénes Somos', href: '#about' },
      { label: 'Servicios', href: '#services' },
      { label: 'Proceso', href: '#process' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
  {
    title: 'Socios B2B',
    links: [
      { label: 'Panel de Socio', href: '/login' },
      { label: 'Tarifas de socio', href: '#services' },
      { label: 'Llaves prepago', href: '#services' },
      { label: 'Solicitar Acceso', href: '#contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Seguridad', href: '#' },
      { label: 'Términos', href: '#' },
      { label: 'Privacidad', href: '#' },
      { label: 'Precio', href: '#cta' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="relative mt-auto border-t border-cyan-500/15 bg-[#04040c]/80 backdrop-blur-xl">
      <div className="absolute left-1/2 top-0 -translate-x-1/2 h-px w-1/2 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid lg:grid-cols-[1.5fr_2fr] gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="relative h-12 w-12 rounded-xl overflow-hidden ring-1 ring-cyan-500/40">
                <img
                  src="/onvivo-logo.png"
                  alt="onvivo logo"
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-violet-500/20 mix-blend-overlay" />
              </div>
              <div>
                <div
                  className="text-2xl font-black text-gradient-cyan"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  onvivo
                </div>
                <div className="text-[10px] tracking-[0.25em] text-cyan-300/60 uppercase font-mono">
                  B2B · Cloud · 2026
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              Transformando la manera en que configuras y consumes tu contenido digital mediante
              automatización inteligente de máxima fidelidad y configuraciones optimizadas a tu
              medida.
            </p>

            {/* Social */}
            <div className="flex items-center gap-3 mt-6">
              {[
                { icon: Send, label: 'Telegram' },
                { icon: MessageCircle, label: 'Discord' },
                { icon: Mail, label: 'Email' },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="h-10 w-10 inline-flex items-center justify-center rounded-lg border border-cyan-500/20 bg-white/[0.02] text-slate-400 hover:text-cyan-300 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          <div className="grid sm:grid-cols-3 gap-8">
            {NAV_GROUPS.map((group) => (
              <div key={group.title}>
                <h4 className="text-xs font-mono uppercase tracking-[0.3em] text-cyan-300 mb-4">
                  {group.title}
                </h4>
                <ul className="space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-slate-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-1.5 group"
                      >
                        <span className="h-px w-0 bg-cyan-400 group-hover:w-4 transition-all" />
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 font-mono">
            © 2026 ONVIVO · Sistema Operativo de Streaming
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-500 font-mono">
            <span className="inline-flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              Sistema operativo
            </span>
            <span className="text-cyan-300/60">v2.6 · Build 2026.06</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

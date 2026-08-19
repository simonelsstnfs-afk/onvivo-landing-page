import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#030308] border-t border-white/10 pt-16 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/[0.06]">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="inline-block">
              <img
                src="/onvivo-official-logo.png"
                alt="ONVIVO Streaming Engine"
                className="h-8 sm:h-9 w-auto object-contain drop-shadow-[0_0_15px_rgba(0,240,255,0.25)]"
              />
            </a>

            <p className="text-xs sm:text-sm text-white/60 leading-relaxed max-w-sm font-grotesk">
              Tu centro de entretenimiento inteligente, optimizado y sin ataduras. Democratizando el acceso al entretenimiento digital a través de software open-source optimizado y accesible para todos.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs font-mono text-[#00FF85]">
              <span className="w-2 h-2 rounded-full bg-[#00FF85] animate-pulse" />
              <span>Sistema Operativo 100% Online</span>
            </div>
          </div>

          {/* Column 1: Producto */}
          <div className="space-y-3">
            <div className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#00F0FF]">
              Producto
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-white/60 font-grotesk">
              <li>
                <button onClick={() => scrollTo('features')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Servicios
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('wizard')} className="hover:text-[#00FF85] transition-colors cursor-pointer text-left font-mono">
                  Setup Wizard
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('showcase')} className="hover:text-[#00F0FF] transition-colors cursor-pointer text-left font-mono">
                  Simulador 1080p
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('comparativa')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Comparativa de Ahorro
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Compatibilidad */}
          <div className="space-y-3">
            <div className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#A855F7]">
              Compatibilidad
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-white/60 font-grotesk">
              <li>
                <button onClick={() => scrollTo('wizard')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Smart TV & Google TV
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('wizard')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Amazon Fire TV Stick
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('wizard')} className="hover:text-white transition-colors cursor-pointer text-left">
                  PC Windows & Mac
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('wizard')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Móviles Android & iOS
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Socios */}
          <div className="space-y-3">
            <div className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#EC4899]">
              Legal & Socios
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-white/60 font-grotesk">
              <li>
                <button onClick={() => scrollTo('faq')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Preguntas Frecuentes
                </button>
              </li>
              <li>
                <a
                  href="https://polar.sh/onvivo/setup-pack"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1 font-mono text-xs"
                >
                  Pasarela Segura (Polar.sh) ↗
                </a>
              </li>
              <li className="pt-2">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-[#00F0FF] text-xs font-mono border border-white/10 transition-colors"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Acceso Socios / B2B</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Disclaimer */}
        <div className="pt-8 space-y-4">
          <p className="text-[11px] text-white/40 leading-relaxed max-w-4xl font-grotesk">
            <strong>Aviso Legal & Compliance:</strong> Onvivo es un servicio de consultoría técnica, configuración y entrega de guías de optimización para plataformas multimedia de código abierto. Onvivo no aloja, transmite, vende ni distribuye contenido multimedia protegido por derechos de autor. Stremio es una marca registrada de sus respectivos propietarios.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-white/40 font-mono border-t border-white/[0.04] pt-4">
            <span>© 2026 Onvivo. Todos los derechos reservados.</span>
            <span>Diseñado para el entretenimiento sin límites.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

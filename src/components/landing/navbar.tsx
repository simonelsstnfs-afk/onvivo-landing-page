import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Shield, ArrowRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 sm:py-4 px-4 sm:px-6 lg:px-8 ${
        isScrolled ? 'backdrop-blur-xl bg-[#0B0F19]/80 py-2.5' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <nav
          className={`relative flex items-center justify-between px-5 py-3 rounded-2xl transition-all duration-300 border ${
            isScrolled
              ? 'bg-[#070A11]/90 border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.7)]'
              : 'bg-[#0B0F19]/80 backdrop-blur-xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.45)]'
          }`}
        >
          {/* Brand Logo */}
          <a
            href="#"
            className="group flex items-center gap-3 text-decoration-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#00F0FF] via-[#A855F7] to-[#EC4899] p-[1px] shadow-[0_0_20px_rgba(0,240,255,0.35)] group-hover:shadow-[0_0_28px_rgba(0,240,255,0.6)] transition-all duration-300">
              <div className="w-full h-full bg-[#0B0F19] rounded-[11px] flex items-center justify-center">
                <span className="text-[#00F0FF] text-lg font-black tracking-tighter transform group-hover:scale-110 transition-transform">
                  ◆
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-white font-extrabold tracking-wider text-lg sm:text-xl font-mono">
                  ONVIVO
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              </div>
              <span className="text-[10px] uppercase font-semibold tracking-widest text-[#8B8BA7] -mt-1 font-mono">
                Streaming Engine
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => scrollToSection('features')}
              className="px-3.5 py-2 rounded-lg text-sm font-medium text-[#8B8BA7] hover:text-[#E2E8FF] hover:bg-white/5 transition-all duration-200 cursor-pointer"
            >
              Características
            </button>
            <button
              onClick={() => scrollToSection('showcase')}
              className="px-3.5 py-2 rounded-lg text-sm font-medium text-[#8B8BA7] hover:text-[#E2E8FF] hover:bg-white/5 transition-all duration-200 cursor-pointer"
            >
              Simulador 1080p
            </button>
            <button
              onClick={() => scrollToSection('comparativa')}
              className="px-3.5 py-2 rounded-lg text-sm font-medium text-[#8B8BA7] hover:text-[#E2E8FF] hover:bg-white/5 transition-all duration-200 cursor-pointer"
            >
              Comparativa
            </button>
            <button
              onClick={() => scrollToSection('wizard')}
              className="px-3.5 py-2 rounded-lg text-sm font-medium text-[#8B8BA7] hover:text-[#E2E8FF] hover:bg-white/5 transition-all duration-200 cursor-pointer"
            >
              Setup Wizard
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="px-3.5 py-2 rounded-lg text-sm font-medium text-[#8B8BA7] hover:text-[#E2E8FF] hover:bg-white/5 transition-all duration-200 cursor-pointer"
            >
              FAQ
            </button>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Direct CTA */}
            <button
              onClick={() => scrollToSection('wizard')}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#A855F7] text-[#0B0F19] font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.7)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <span>Configurar Mi Pantalla</span>
              <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded bg-[#0B0F19]/25 text-[10px] font-mono text-white">
                &lt;2 min
              </span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-[#8B8BA7] hover:text-white hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-[#00F0FF] cursor-pointer"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Drawer Panel */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 rounded-2xl bg-[#0B0F19]/95 backdrop-blur-2xl border border-white/10 p-5 shadow-2xl transition-all duration-300">
            <div className="flex flex-col gap-2">
              <button
                onClick={() => scrollToSection('features')}
                className="text-left px-4 py-3 rounded-xl text-base font-medium text-[#E2E8FF] hover:bg-white/5 transition-colors cursor-pointer"
              >
                Características
              </button>
              <button
                onClick={() => scrollToSection('showcase')}
                className="text-left px-4 py-3 rounded-xl text-base font-medium text-[#E2E8FF] hover:bg-white/5 transition-colors cursor-pointer"
              >
                Simulador 1080p
              </button>
              <button
                onClick={() => scrollToSection('comparativa')}
                className="text-left px-4 py-3 rounded-xl text-base font-medium text-[#E2E8FF] hover:bg-white/5 transition-colors cursor-pointer"
              >
                Comparativa de Ahorro
              </button>
              <button
                onClick={() => scrollToSection('wizard')}
                className="text-left px-4 py-3 rounded-xl text-base font-medium text-[#E2E8FF] hover:bg-white/5 transition-colors cursor-pointer"
              >
                Setup Wizard
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="text-left px-4 py-3 rounded-xl text-base font-medium text-[#E2E8FF] hover:bg-white/5 transition-colors cursor-pointer"
              >
                Preguntas Frecuentes
              </button>

              <div className="pt-3 mt-2 border-t border-white/10 flex flex-col gap-2">
                <button
                  onClick={() => scrollToSection('wizard')}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#A855F7] text-[#0B0F19] font-bold text-sm uppercase tracking-wider shadow-lg cursor-pointer"
                >
                  <span>Configurar Mi Pantalla — 65€</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <Link
                  to="/login"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-[#8B8BA7] hover:text-white font-mono text-xs border border-white/10 transition-colors"
                >
                  <Shield className="w-3.5 h-3.5 text-[#00F0FF]" />
                  <span>Portal de Socios B2B</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

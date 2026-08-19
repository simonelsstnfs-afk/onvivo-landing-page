import React from 'react';
import { HeroScene3D } from './three/HeroScene3D';
import { ArrowRight, Play, Zap } from 'lucide-react';

interface HeroProps {
  onOpenWizard?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenWizard }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleStartSetup = () => {
    if (onOpenWizard) {
      onOpenWizard();
    } else {
      scrollTo('pricing');
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[95vh] flex flex-col justify-center items-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#050510]"
    >
      {/* 3D Canvas Background */}
      <HeroScene3D />

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Top Announcement Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-cyan-500/10 backdrop-blur-xl border border-cyan-500/30 shadow-[0_0_25px_rgba(0,240,255,0.2)] mb-8">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F0FF]" />
          </span>
          <span className="text-xs sm:text-sm font-bold font-mono tracking-widest text-[#00F0FF] uppercase">
            ● CONFIGURACIÓN TÉCNICA Y SOPORTE PERSONALIZADO
          </span>
        </div>

        {/* Main Monumental Headline with Orbitron Typography */}
        <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black tracking-tight uppercase leading-[0.95] max-w-5xl font-display">
          <span className="block text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.18)]">
            CINE PERSONAL
          </span>
          <span className="block text-gradient-neon drop-shadow-[0_0_35px_rgba(0,240,255,0.35)] mt-2">
            SIN COMPLICACIONES
          </span>
        </h1>

        {/* Subheadline with Space Grotesk - Exact Compliance Text */}
        <p className="mt-6 text-base sm:text-lg lg:text-xl text-white/80 max-w-3xl leading-relaxed font-grotesk">
          Centraliza y organiza la gestión de tu centro multimedia en todos tus dispositivos. Servicio de configuración técnica y soporte personalizado (pago único por instalación y puesta a punto).
        </p>

        {/* Dual CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          {/* Primary CTA */}
          <button
            type="button"
            onClick={handleStartSetup}
            className="group relative w-full sm:w-auto inline-flex flex-col items-center justify-center p-[2px] rounded-2xl bg-gradient-to-r from-[#00F0FF] via-[#A855F7] to-[#EC4899] shadow-[0_0_30px_rgba(0,240,255,0.4)] hover:shadow-[0_0_50px_rgba(0,240,255,0.7)] transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer"
          >
            <div className="w-full h-full bg-[#050510] group-hover:bg-transparent rounded-[14px] px-8 py-3.5 flex flex-col items-center justify-center transition-colors duration-300">
              <span className="text-sm sm:text-base font-black text-white group-hover:text-[#050510] flex items-center gap-2 uppercase tracking-wider font-display transition-colors duration-300">
                <Zap className="w-4 h-4" />
                Iniciar Setup Personalizado
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="text-[11px] text-white/60 group-hover:text-[#050510]/80 font-mono mt-0.5 transition-colors duration-300">
                65€ pago único • Instalación y puesta a punto
              </span>
            </div>
          </button>

          {/* Secondary CTA */}
          <button
            type="button"
            onClick={() => scrollTo('showcase')}
            className="btn-outline-neon w-full sm:w-auto inline-flex flex-col items-center justify-center px-7 py-3.5 rounded-2xl backdrop-blur-xl transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer font-grotesk"
          >
            <span className="text-sm sm:text-base font-bold text-white flex items-center gap-2 uppercase tracking-wide">
              <Play className="w-3.5 h-3.5 text-[#00F0FF]" />
              Ver Simulador 1080p
              <span className="text-xs text-[#00F0FF] font-mono">● LIVE</span>
            </span>
            <span className="text-[11px] text-white/50 font-mono mt-0.5">
              Demostración interactiva
            </span>
          </button>
        </div>

        {/* Social Proof Metrics Grid */}
        <div className="mt-16 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-10 border-t border-white/[0.08]">
          {/* Metric 1 */}
          <div className="p-4 rounded-2xl bg-white/[0.02] backdrop-blur-md border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 text-left">
            <div className="text-2xl sm:text-3xl font-black text-[#00F0FF] font-display">&gt; 650€</div>
            <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white mt-1 font-grotesk">Ahorro Anual</div>
            <div className="text-[11px] text-white/50 mt-0.5 font-mono">Vs múltiples suscripciones</div>
          </div>

          {/* Metric 2 */}
          <div className="p-4 rounded-2xl bg-white/[0.02] backdrop-blur-md border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 text-left">
            <div className="text-2xl sm:text-3xl font-black text-[#A855F7] font-display">1080p60</div>
            <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white mt-1 font-grotesk">Calidad Full HD</div>
            <div className="text-[11px] text-white/50 mt-0.5 font-mono">Streaming optimizado</div>
          </div>

          {/* Metric 3 */}
          <div className="p-4 rounded-2xl bg-white/[0.02] backdrop-blur-md border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 text-left">
            <div className="text-2xl sm:text-3xl font-black text-[#EC4899] font-display">&lt; 2 min</div>
            <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white mt-1 font-grotesk">Entrega Inmediata</div>
            <div className="text-[11px] text-white/50 mt-0.5 font-mono">Directo a tu correo</div>
          </div>

          {/* Metric 4 */}
          <div className="p-4 rounded-2xl bg-white/[0.02] backdrop-blur-md border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 text-left">
            <div className="text-2xl sm:text-3xl font-black text-[#00FF85] font-display">100%</div>
            <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white mt-1 font-grotesk">Listo para Usar</div>
            <div className="text-[11px] text-white/50 mt-0.5 font-mono">Sin complejidad técnica</div>
          </div>
        </div>
      </div>
    </section>
  );
};

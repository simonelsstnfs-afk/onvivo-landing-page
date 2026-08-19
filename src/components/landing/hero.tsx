import React from 'react';
import { HeroScene3D } from './three/HeroScene3D';
import { ArrowRight, Play, ShieldCheck, Zap, Monitor, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex flex-col justify-center items-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0B0F19]"
    >
      {/* 3D Canvas Background */}
      <HeroScene3D />

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Top Announcement Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-[0_0_25px_rgba(0,240,255,0.15)] mb-8">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F0FF]" />
          </span>
          <span className="text-xs sm:text-sm font-medium text-[#E2E8FF] tracking-wide">
            Setup Automatizado • 1080p Full HD • Sin Cuotas Mensuales
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.12] max-w-4xl">
          Todo el cine y series del mundo
          <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-[#A855F7] to-[#EC4899] drop-shadow-[0_0_35px_rgba(0,240,255,0.35)]">
            en una sola app
          </span>
        </h1>

        {/* Subheadline */}
        <p className="mt-6 text-base sm:text-lg lg:text-xl text-[#8B8BA7] max-w-2xl leading-relaxed font-normal">
          Elimina la fragmentación de pagar múltiples suscripciones al mes. Onvivo optimiza y preconfigura tu ecosistema de entretenimiento en cualquier pantalla para que disfrutes de streaming fluido a 1080p60 en tu idioma y listo en menos de 2 minutos.
        </p>

        {/* Dual CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          {/* Primary CTA */}
          <button
            onClick={() => scrollTo('wizard')}
            className="group relative w-full sm:w-auto inline-flex flex-col items-center justify-center p-[2px] rounded-2xl bg-gradient-to-r from-[#00F0FF] via-[#A855F7] to-[#EC4899] shadow-[0_0_30px_rgba(0,240,255,0.4)] hover:shadow-[0_0_50px_rgba(0,240,255,0.7)] transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer"
          >
            <div className="w-full h-full bg-[#0B0F19] group-hover:bg-transparent rounded-[14px] px-8 py-3.5 flex flex-col items-center justify-center transition-colors duration-300">
              <span className="text-base font-bold text-white group-hover:text-[#0B0F19] flex items-center gap-2 transition-colors duration-300">
                Iniciar Setup Personalizado
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="text-[11px] text-[#8B8BA7] group-hover:text-[#0B0F19]/80 font-mono mt-0.5 transition-colors duration-300">
                65€ pago único • Acceso inmediato
              </span>
            </div>
          </button>

          {/* Secondary CTA */}
          <button
            onClick={() => scrollTo('showcase')}
            className="w-full sm:w-auto inline-flex flex-col items-center justify-center px-7 py-3.5 rounded-2xl bg-white/[0.05] hover:bg-white/[0.09] backdrop-blur-xl border border-white/10 hover:border-white/20 text-white transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
          >
            <span className="text-base font-semibold text-[#E2E8FF] flex items-center gap-2">
              Ver Simulación en Vivo
              <span className="text-xs text-[#00F0FF]">● 1080p60</span>
            </span>
            <span className="text-[11px] text-[#8B8BA7] font-mono mt-0.5">
              Telemetría en tiempo real
            </span>
          </button>
        </div>

        {/* Social Proof Metrics Grid */}
        <div className="mt-16 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-10 border-t border-white/[0.08]">
          {/* Metric 1 */}
          <div className="p-4 rounded-2xl bg-white/[0.02] backdrop-blur-md border border-white/[0.05] hover:border-[#00F0FF]/30 transition-all duration-300 text-left">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#00F0FF] font-mono">&gt; 650€</div>
            <div className="text-xs sm:text-sm font-semibold text-[#E2E8FF] mt-1">Ahorro Anual Medio</div>
            <div className="text-[11px] text-[#8B8BA7] mt-0.5">Vs plataformas tradicionales</div>
          </div>

          {/* Metric 2 */}
          <div className="p-4 rounded-2xl bg-white/[0.02] backdrop-blur-md border border-white/[0.05] hover:border-[#A855F7]/30 transition-all duration-300 text-left">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#A855F7] font-mono">1080p60</div>
            <div className="text-xs sm:text-sm font-semibold text-[#E2E8FF] mt-1">Streaming Optimizado</div>
            <div className="text-[11px] text-[#8B8BA7] mt-0.5">Cero buffering garantizado</div>
          </div>

          {/* Metric 3 */}
          <div className="p-4 rounded-2xl bg-white/[0.02] backdrop-blur-md border border-white/[0.05] hover:border-[#EC4899]/30 transition-all duration-300 text-left">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#EC4899] font-mono">&lt; 2 min</div>
            <div className="text-xs sm:text-sm font-semibold text-[#E2E8FF] mt-1">Entrega Digital</div>
            <div className="text-[11px] text-[#8B8BA7] mt-0.5">Fulfillment automatizado</div>
          </div>

          {/* Metric 4 */}
          <div className="p-4 rounded-2xl bg-white/[0.02] backdrop-blur-md border border-white/[0.05] hover:border-[#10B981]/30 transition-all duration-300 text-left">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#10B981] font-mono">100%</div>
            <div className="text-xs sm:text-sm font-semibold text-[#E2E8FF] mt-1">Compatibilidad</div>
            <div className="text-[11px] text-[#8B8BA7] mt-0.5">Smart TV, Sticks, PC y Móvil</div>
          </div>
        </div>
      </div>
    </section>
  );
};

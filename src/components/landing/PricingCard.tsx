import React from 'react';
import { Check, Shield, ArrowRight, Zap } from 'lucide-react';

export const PricingCard: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const polarUrl = import.meta.env.VITE_POLAR_CHECKOUT_URL || 'https://polar.sh/onvivo/setup-pack';

  return (
    <section id="pricing" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#0B0F19] overflow-hidden">
      {/* Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-br from-[#00F0FF]/15 via-[#A855F7]/15 to-[#EC4899]/15 blur-[160px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/25 text-[#10B981] text-xs font-mono font-semibold uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>Oferta Comercial</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Pack Setup Onvivo B2C
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#8B8BA7] leading-relaxed">
            La configuración definitiva para convertir tu Smart TV, ordenador o móvil en el centro multimedia perfecto sin ataduras.
          </p>
        </div>

        {/* Master High-Converting Pricing Card */}
        <div className="relative rounded-3xl bg-gradient-to-b from-[#131B2E] via-[#0F172A] to-[#0B0F19] border-2 border-[#00F0FF]/40 shadow-[0_20px_70px_rgba(0,240,255,0.2)] p-8 sm:p-12 transition-all duration-300">
          {/* Top Badge */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-white/10">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00F0FF]/15 text-[#00F0FF] text-xs font-mono font-bold uppercase tracking-wider border border-[#00F0FF]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
                Acceso Lifetime • Oferta de Lanzamiento
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                Licencia Setup Perpetua
              </h3>
              <p className="text-xs sm:text-sm text-[#8B8BA7] mt-1">
                Entrega digital inmediata por email (&lt; 2 minutos)
              </p>
            </div>

            {/* Price Display */}
            <div className="text-left sm:text-right">
              <div className="flex items-baseline sm:justify-end gap-2">
                <span className="text-sm line-through text-[#8B8BA7] font-mono">120€</span>
                <span className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight">65€</span>
                <span className="text-sm font-mono text-[#8B8BA7]">/ 75$</span>
              </div>
              <div className="text-xs font-mono text-[#10B981] font-semibold mt-1">
                Pago único de por vida • Cero mensualidades
              </div>
            </div>
          </div>

          {/* Features Checklist */}
          <div className="py-8 space-y-4">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#00F0FF]">
              Entregables Incluidos en el Pack:
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <span className="w-5 h-5 rounded-full bg-[#10B981]/20 text-[#10B981] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  ✓
                </span>
                <div>
                  <strong className="text-white block">7 Addons Premium Sincronizados</strong>
                  <span className="text-[#8B8BA7] text-xs">Indexación ultrarrápida, metadatos y fuentes automáticas.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <span className="w-5 h-5 rounded-full bg-[#10B981]/20 text-[#10B981] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  ✓
                </span>
                <div>
                  <strong className="text-white block">Optimización Anti-Buffering 1080p</strong>
                  <span className="text-[#8B8BA7] text-xs">Buffer precargado para streaming a 60 FPS sin cortes.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <span className="w-5 h-5 rounded-full bg-[#10B981]/20 text-[#10B981] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  ✓
                </span>
                <div>
                  <strong className="text-white block">Sync de Audio y Subtítulos en tu Idioma</strong>
                  <span className="text-[#8B8BA7] text-xs">Prioridad en Castellano, Latino y VOSE sincronizado.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <span className="w-5 h-5 rounded-full bg-[#10B981]/20 text-[#10B981] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  ✓
                </span>
                <div>
                  <strong className="text-white block">Guía Visual Interactiva en PDF</strong>
                  <span className="text-[#8B8BA7] text-xs">Instrucciones ilustradas paso a paso para todas las pantallas.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <span className="w-5 h-5 rounded-full bg-[#10B981]/20 text-[#10B981] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  ✓
                </span>
                <div>
                  <strong className="text-white block">Entrega Inmediata por Email (&lt; 2 min)</strong>
                  <span className="text-[#8B8BA7] text-xs">Despacho automatizado tras confirmar tu compra.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <span className="w-5 h-5 rounded-full bg-[#10B981]/20 text-[#10B981] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  ✓
                </span>
                <div>
                  <strong className="text-white block">Compatibilidad Multidispositivo</strong>
                  <span className="text-[#8B8BA7] text-xs">Usa tu perfil en Smart TV, Fire Stick, PC y móvil.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-6 border-t border-white/10 flex flex-col items-center gap-4">
            <button
              onClick={() => scrollTo('wizard')}
              className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-[#00F0FF] via-[#A855F7] to-[#EC4899] text-[#0B0F19] font-black text-lg uppercase tracking-wider text-center shadow-[0_0_35px_rgba(0,240,255,0.4)] hover:shadow-[0_0_55px_rgba(0,240,255,0.7)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 cursor-pointer"
            >
              Configurar y Comprar Pack — 65€
            </button>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[#8B8BA7] font-mono">
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-[#10B981]" />
                Checkout Seguro SSL vía Polar.sh
              </span>
              <span>•</span>
              <span>Apple Pay / Google Pay / Tarjeta</span>
              <span>•</span>
              <span className="text-[#10B981]">Garantía de activación en 60s</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

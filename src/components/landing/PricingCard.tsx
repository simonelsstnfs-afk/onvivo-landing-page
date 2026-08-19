import React from 'react';
import { Shield, Zap, CheckCircle } from 'lucide-react';

interface PricingCardProps {
  onOpenWizard?: () => void;
}

export const PricingCard: React.FC<PricingCardProps> = ({ onOpenWizard }) => {
  const handleAction = () => {
    if (onOpenWizard) {
      onOpenWizard();
    }
  };

  return (
    <section id="pricing" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#050510] overflow-hidden border-t border-white/5">
      {/* Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-br from-[#00F0FF]/15 via-[#A855F7]/15 to-[#EC4899]/15 blur-[160px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00FF85]/10 border border-[#00FF85]/30 text-[#00FF85] text-xs font-mono font-bold uppercase tracking-[0.2em] mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>OFERTA COMERCIAL</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-[0.98] font-display">
            PACK SETUP ONVIVO <br />
            <span className="text-gradient-neon">INSTALACIÓN Y PUESTA A PUNTO</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-white/70 leading-relaxed font-grotesk max-w-xl">
            Servicio de configuración técnica y soporte personalizado (pago único por instalación y puesta a punto). Centraliza y organiza la gestión de tu centro multimedia en todos tus dispositivos.
          </p>
        </div>

        {/* Master High-Converting Pricing Card */}
        <div className="relative rounded-3xl bg-gradient-to-b from-[#0F1123] via-[#070714] to-[#050510] border-2 border-cyan-500/40 shadow-[0_20px_70px_rgba(0,240,255,0.2)] p-8 sm:p-12 transition-all duration-300">
          {/* Top Badge */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-white/10">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 text-[#00F0FF] text-xs font-mono font-bold uppercase tracking-wider border border-cyan-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
                SERVICIO TÉCNICO · PAGO ÚNICO
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-2 uppercase tracking-tight font-display">
                Setup Profesional Llave en Mano
              </h3>
              <p className="text-xs sm:text-sm text-white/60 mt-1 font-grotesk">
                Entrega digital inmediata por email (&lt; 2 minutos)
              </p>
            </div>

            {/* Price Display */}
            <div className="text-left sm:text-right">
              <div className="flex items-baseline sm:justify-end gap-2">
                <span className="text-sm line-through text-white/40 font-mono">120€</span>
                <span className="text-5xl sm:text-6xl font-black text-white font-display tracking-tight">65€</span>
                <span className="text-sm font-mono text-white/60">/ 75$</span>
              </div>
              <div className="text-xs font-mono text-[#00FF85] font-bold mt-1 uppercase tracking-wider">
                Pago único por instalación y puesta a punto
              </div>
            </div>
          </div>

          {/* Features Checklist */}
          <div className="py-8 space-y-4">
            <div className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#00F0FF]">
              Entregables Incluidos en el Servicio:
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm font-grotesk">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <CheckCircle className="w-5 h-5 text-[#00FF85] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-bold">Configuración Técnica Completa</strong>
                  <span className="text-white/60 text-xs">Instalación, optimización y calibración personalizada antes de la entrega.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <CheckCircle className="w-5 h-5 text-[#00FF85] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-bold">Filtro de Resolución 1080p Full HD</strong>
                  <span className="text-white/60 text-xs">Priorización de video en alta definición para un streaming ágil y fluido.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <CheckCircle className="w-5 h-5 text-[#00FF85] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-bold">Prioridad de Idiomas y Subtítulos</strong>
                  <span className="text-white/60 text-xs">Audio en Español (Castellano/Latino) y subtítulos automáticos listos.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <CheckCircle className="w-5 h-5 text-[#00FF85] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-bold">Guía Visual Interactiva en PDF</strong>
                  <span className="text-white/60 text-xs">Instrucciones ilustradas paso a paso para configurar tu TV, Stick, PC o móvil.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <CheckCircle className="w-5 h-5 text-[#00FF85] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-bold">Entrega Inmediata por Email (&lt; 2 min)</strong>
                  <span className="text-white/60 text-xs">Despacho automatizado tras confirmar tu compra en la pasarela segura.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <CheckCircle className="w-5 h-5 text-[#00FF85] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-bold">Soporte Técnico Posventa</strong>
                  <span className="text-white/60 text-xs">Asistencia personalizada para resolver cualquier duda en tus pantallas.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-6 border-t border-white/10 flex flex-col items-center gap-4">
            <button
              type="button"
              onClick={handleAction}
              className="btn-neon w-full py-4 px-8 rounded-2xl text-[#050510] font-black text-base sm:text-lg uppercase tracking-wider text-center font-display cursor-pointer"
            >
              Configurar y Contratar Setup — 65€
            </button>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/50 font-mono">
              <span className="flex items-center gap-1.5 text-[#00FF85]">
                <Shield className="w-4 h-4" />
                Checkout Seguro SSL vía Polar.sh
              </span>
              <span>•</span>
              <span>Apple Pay / Google Pay / Tarjeta</span>
              <span>•</span>
              <span className="text-[#00FF85]">Garantía de activación inmediata</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { Zap, ShieldCheck, Languages, PiggyBank, ArrowRight, Play, Check } from 'lucide-react';

export const BentoFeatures: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="features" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#0B0F19] overflow-hidden">
      {/* Subtle Ambient Glows */}
      <div className="absolute top-1/3 -left-48 w-96 h-96 bg-[#00F0FF]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-[#A855F7]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/25 text-[#00F0FF] text-xs font-mono font-semibold uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>Ingeniería de Streaming</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Diseñado para el confort absoluto. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-[#A855F7] to-[#EC4899]">
              Sin complejidad técnica.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#8B8BA7] leading-relaxed">
            Convertimos una arquitectura de software libre en una experiencia plug & play superior a cualquier app comercial.
          </p>
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Card 1: Setup Completo en 60 Segundos */}
          <div className="col-span-12 lg:col-span-7 relative group rounded-3xl p-8 sm:p-10 bg-gradient-to-b from-[#131B2E]/90 to-[#0F172A]/80 border border-white/[0.08] hover:border-[#00F0FF]/40 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/30 font-mono">
                  Despliegue Ultrarrápido
                </span>
                <div className="w-12 h-12 rounded-2xl bg-[#00F0FF]/10 border border-[#00F0FF]/20 flex items-center justify-center text-[#00F0FF]">
                  <Zap className="w-6 h-6" />
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Setup Completo en 60 Segundos
              </h3>
              <p className="text-sm sm:text-base text-[#8B8BA7] leading-relaxed mb-6">
                Sin comandos de consola ni instalaciones confusas. Recibes tus credenciales maestras y perfil sincronizado listo para importar en un solo clic en tu TV, ordenador o móvil.
              </p>
            </div>

            {/* Interactive Simulated Preview Pill */}
            <div className="mt-4 rounded-2xl bg-[#070A11]/80 border border-white/[0.06] p-4 font-mono text-xs text-[#E2E8FF] shadow-inner">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-2 mb-3 text-[11px] text-[#8B8BA7]">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                  Onvivo Sync Engine v2.4
                </span>
                <span className="text-[#00F0FF]">Ready to Import</span>
              </div>
              <div className="flex items-center justify-between bg-white/[0.03] px-3 py-2 rounded-lg border border-white/[0.04]">
                <span className="text-[#8B8BA7] truncate max-w-[200px] sm:max-w-xs">
                  token: onv_live_7x_premium_sync
                </span>
                <span className="px-2 py-0.5 rounded bg-[#10B981]/20 text-[#10B981] font-semibold text-[10px]">
                  0 configs manuales
                </span>
              </div>
            </div>

            {/* Tech Badge Footer */}
            <div className="mt-6 pt-4 border-t border-white/[0.05] flex items-center justify-between text-xs text-[#8B8BA7]">
              <span className="font-mono text-[#00F0FF]">One-Click Sync Architecture</span>
              <span className="text-white/60 font-medium">100% Automatizado</span>
            </div>
          </div>

          {/* Card 2: 100% Anti-Buffering 1080p */}
          <div className="col-span-12 lg:col-span-5 relative group rounded-3xl p-8 sm:p-10 bg-gradient-to-b from-[#131B2E]/90 to-[#0F172A]/80 border border-white/[0.08] hover:border-[#A855F7]/40 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#A855F7]/15 text-[#A855F7] border border-[#A855F7]/30 font-mono">
                  Rendimiento
                </span>
                <div className="w-12 h-12 rounded-2xl bg-[#A855F7]/10 border border-[#A855F7]/20 flex items-center justify-center text-[#A855F7]">
                  <ShieldCheck className="w-6 h-6" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">
                100% Anti-Buffering 1080p
              </h3>
              <p className="text-sm text-[#8B8BA7] leading-relaxed mb-6">
                Enrutamiento inteligente con precarga de buffer constante. Disfruta de reproducción fluida a 60 FPS estables sin caídas de resolución ni molestos círculos de carga.
              </p>
            </div>

            {/* Buffer Bar Visual Widget */}
            <div className="mt-2 rounded-2xl bg-[#070A11]/80 border border-white/[0.06] p-4 font-mono text-xs">
              <div className="flex items-center justify-between text-[11px] mb-2">
                <span className="text-[#8B8BA7]">Buffer Health</span>
                <span className="text-[#10B981] font-bold">100% (45s Adelantado)</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden relative">
                <div className="h-full bg-gradient-to-r from-[#00F0FF] via-[#A855F7] to-[#10B981] w-full animate-pulse rounded-full" />
              </div>
              <div className="flex justify-between items-center mt-2 text-[10px] text-[#8B8BA7]">
                <span>60 FPS Estables</span>
                <span>Bitrate: 14.2 Mbps</span>
              </div>
            </div>

            {/* Tech Badge Footer */}
            <div className="mt-6 pt-4 border-t border-white/[0.05] flex items-center justify-between text-xs text-[#8B8BA7]">
              <span className="font-mono text-[#A855F7]">Stream Engine v2.4 • 60 FPS</span>
              <span className="text-[#10B981] font-medium">Flujo sin cortes</span>
            </div>
          </div>

          {/* Card 3: Sync de Audio y Subtítulos */}
          <div className="col-span-12 lg:col-span-5 relative group rounded-3xl p-8 sm:p-10 bg-gradient-to-b from-[#131B2E]/90 to-[#0F172A]/80 border border-white/[0.08] hover:border-[#EC4899]/40 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#EC4899]/15 text-[#EC4899] border border-[#EC4899]/30 font-mono">
                  Localización
                </span>
                <div className="w-12 h-12 rounded-2xl bg-[#EC4899]/10 border border-[#EC4899]/20 flex items-center justify-center text-[#EC4899]">
                  <Languages className="w-6 h-6" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">
                Sync de Audio y Subtítulos
              </h3>
              <p className="text-sm text-[#8B8BA7] leading-relaxed mb-6">
                Priorización algorítmica de pistas en Castellano, Latino y VOSE con subtítulos sincronizados al milisegundo exacto para que nunca pierdas el ritmo de la historia.
              </p>
            </div>

            {/* Language Selector Micro-UI */}
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="px-3 py-1.5 rounded-xl bg-white/[0.05] border border-[#EC4899]/30 text-white font-mono text-xs flex items-center gap-1.5 shadow-sm">
                <span className="text-[#EC4899]">🇪🇸</span> Castellano Prioritario
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-[#8B8BA7] font-mono text-xs flex items-center gap-1.5">
                <span>🌎</span> Español Latino
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-[#8B8BA7] font-mono text-xs flex items-center gap-1.5">
                <span>💬</span> Subtítulos Auto-Sync
              </span>
            </div>

            {/* Tech Badge Footer */}
            <div className="mt-6 pt-4 border-t border-white/[0.05] flex items-center justify-between text-xs text-[#8B8BA7]">
              <span className="font-mono text-[#EC4899]">Auto-Track Priority (ES / LAT / VOSE)</span>
              <span className="text-white/60 font-medium">Doblaje y subs perfectos</span>
            </div>
          </div>

          {/* Card 4: Cero Cuotas Mensuales de por Vida */}
          <div className="col-span-12 lg:col-span-7 relative group rounded-3xl p-8 sm:p-10 bg-gradient-to-b from-[#131B2E]/90 to-[#0F172A]/80 border border-white/[0.08] hover:border-[#10B981]/40 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 font-mono">
                  Libertad Financiera
                </span>
                <div className="w-12 h-12 rounded-2xl bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center text-[#10B981]">
                  <PiggyBank className="w-6 h-6" />
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Cero Cuotas Mensuales de por Vida
              </h3>
              <p className="text-sm sm:text-base text-[#8B8BA7] leading-relaxed mb-6">
                Un único pago de 65€. Di adiós a los 60€ mensuales que se evaporan en múltiples suscripciones fragmentadas sin renunciar a ningún estreno de cartelera.
              </p>
            </div>

            {/* Savings Math Widget */}
            <div className="mt-4 rounded-2xl bg-[#070A11]/80 border border-white/[0.06] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="text-3xl sm:text-4xl font-extrabold text-[#10B981] font-mono">&gt; 650€</div>
                <div>
                  <div className="text-xs font-bold text-[#E2E8FF]">Ahorro Neto Año 1</div>
                  <div className="text-[11px] text-[#8B8BA7]">720€ vs 65€ pago único</div>
                </div>
              </div>
              <button
                onClick={() => scrollTo('wizard')}
                className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-[#10B981]/20 hover:bg-[#10B981]/30 border border-[#10B981]/40 text-[#10B981] text-xs font-bold font-mono transition-colors cursor-pointer"
              >
                Calcular Mi Ahorro →
              </button>
            </div>

            {/* Tech Badge Footer */}
            <div className="mt-6 pt-4 border-t border-white/[0.05] flex items-center justify-between text-xs text-[#8B8BA7]">
              <span className="font-mono text-[#10B981]">Lifetime Access Token</span>
              <span className="text-[#10B981] font-semibold">Ahorra +650€ / año</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

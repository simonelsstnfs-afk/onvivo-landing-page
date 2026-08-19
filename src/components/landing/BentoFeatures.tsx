import React from 'react';
import { Zap, ShieldCheck, Languages, PiggyBank, Sparkles, CheckCircle } from 'lucide-react';

export const BentoFeatures: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="features" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#050510] overflow-hidden border-t border-white/5">
      {/* Subtle Ambient Glows */}
      <div className="absolute top-1/3 -left-48 w-96 h-96 bg-[#00F0FF]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-[#A855F7]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-cyan-500/30 text-[#00F0FF] text-xs font-mono font-bold uppercase tracking-[0.2em] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span>SERVICIOS DE OPTIMIZACIÓN</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase leading-[0.98] font-display">
            MÁXIMO CONFORT <br />
            <span className="text-gradient-neon">
              SIN COMPLEJIDAD TÉCNICA
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-white/60 leading-relaxed font-grotesk max-w-2xl">
            Convertimos una arquitectura de software libre en una experiencia inmediata, cómoda y profesional adaptada a tus pantallas.
          </p>
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Card 1: Setup Listo en 60 Segundos */}
          <div className="col-span-12 lg:col-span-7 relative group rounded-3xl p-8 sm:p-10 bg-gradient-to-b from-[#0F1123]/90 to-[#070714]/80 border border-white/[0.08] hover:border-cyan-500/40 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-cyan-500/15 text-[#00F0FF] border border-cyan-500/30 font-mono">
                  LLAVE EN MANO
                </span>
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-[#00F0FF]">
                  <Zap className="w-6 h-6" />
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white mb-3 uppercase tracking-tight font-display">
                Setup Listo en 60 Segundos
              </h3>
              <p className="text-sm sm:text-base text-white/60 leading-relaxed mb-6 font-grotesk">
                Olvídate de buscar tutoriales, lidiar con configuraciones manuales o perder horas intentando entender el sistema. Recibes tus credenciales maestras y tu perfil totalmente preparado para que solo tengas que iniciar sesión y empezar a ver.
              </p>
            </div>

            {/* Interactive Preview Widget */}
            <div className="mt-4 rounded-2xl bg-[#030308]/90 border border-white/[0.06] p-4 font-mono text-xs text-white/90 shadow-inner">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-2 mb-3 text-[11px] text-white/50">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00FF85] animate-pulse" />
                  Estado de Cuenta
                </span>
                <span className="text-[#00FF85] font-bold">VERIFICADA Y LISTA</span>
              </div>
              <div className="flex items-center justify-between bg-white/[0.03] px-3 py-2 rounded-lg border border-white/[0.04]">
                <span className="text-white/60 truncate max-w-[200px] sm:max-w-xs">
                  Sincronización en la Nube
                </span>
                <span className="px-2 py-0.5 rounded bg-[#00FF85]/20 text-[#00FF85] font-bold text-[10px]">
                  0 ajustes manuales
                </span>
              </div>
            </div>

            {/* Tech Badge Footer */}
            <div className="mt-6 pt-4 border-t border-white/[0.05] flex items-center justify-between text-xs text-white/50 font-mono">
              <span className="text-[#00F0FF]">Preparación Profesional</span>
              <span className="text-white/80 font-bold">100% Configurado</span>
            </div>
          </div>

          {/* Card 2: Streaming Fluido a 1080p */}
          <div className="col-span-12 lg:col-span-5 relative group rounded-3xl p-8 sm:p-10 bg-gradient-to-b from-[#0F1123]/90 to-[#070714]/80 border border-white/[0.08] hover:border-purple-500/40 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-purple-500/15 text-[#A855F7] border border-purple-500/30 font-mono">
                  CALIDAD DE IMAGEN
                </span>
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-[#A855F7]">
                  <ShieldCheck className="w-6 h-6" />
                </div>
              </div>

              <h3 className="text-2xl font-black text-white mb-3 uppercase tracking-tight font-display">
                Streaming Fluido a 1080p
              </h3>
              <p className="text-sm text-white/60 leading-relaxed mb-6 font-grotesk">
                Configuración calibrada para seleccionar automáticamente las mejores fuentes de video en alta definición, evitando transmisiones inestables o archivos pesados que provoquen pausas de carga constantes.
              </p>
            </div>

            {/* Visual Quality Widget */}
            <div className="mt-2 rounded-2xl bg-[#030308]/90 border border-white/[0.06] p-4 font-mono text-xs">
              <div className="flex items-center justify-between text-[11px] mb-2">
                <span className="text-white/50">Resolución Óptima</span>
                <span className="text-[#00FF85] font-bold">1080p Full HD</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden relative">
                <div className="h-full bg-gradient-to-r from-[#00F0FF] via-[#A855F7] to-[#00FF85] w-full animate-pulse rounded-full" />
              </div>
              <div className="flex justify-between items-center mt-2 text-[10px] text-white/50">
                <span>60 FPS Estables</span>
                <span>Filtro de fuentes activo</span>
              </div>
            </div>

            {/* Tech Badge Footer */}
            <div className="mt-6 pt-4 border-t border-white/[0.05] flex items-center justify-between text-xs text-white/50 font-mono">
              <span className="text-[#A855F7]">Filtro de Fuentes Inteligente</span>
              <span className="text-[#00FF85] font-bold">Alta Definición</span>
            </div>
          </div>

          {/* Card 3: Audio y Subtítulos en tu Idioma */}
          <div className="col-span-12 lg:col-span-5 relative group rounded-3xl p-8 sm:p-10 bg-gradient-to-b from-[#0F1123]/90 to-[#070714]/80 border border-white/[0.08] hover:border-pink-500/40 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-pink-500/15 text-[#EC4899] border border-pink-500/30 font-mono">
                  LOCALIZACIÓN
                </span>
                <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-[#EC4899]">
                  <Languages className="w-6 h-6" />
                </div>
              </div>

              <h3 className="text-2xl font-black text-white mb-3 uppercase tracking-tight font-display">
                Audio y Subtítulos en tu Idioma
              </h3>
              <p className="text-sm text-white/60 leading-relaxed mb-6 font-grotesk">
                Configuramos tu entorno para priorizar automáticamente versiones en Castellano, Español Latino o Versión Original con subtítulos sincronizados, para que no tengas que buscar pistas a mano en cada reproducción.
              </p>
            </div>

            {/* Language Badges */}
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="px-3 py-1.5 rounded-xl bg-white/[0.05] border border-pink-500/30 text-white font-mono text-xs flex items-center gap-1.5 shadow-sm">
                <span className="text-[#EC4899]">🇪🇸</span> Castellano
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white/60 font-mono text-xs flex items-center gap-1.5">
                <span>🌎</span> Español Latino
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white/60 font-mono text-xs flex items-center gap-1.5">
                <span>💬</span> Subtítulos Automáticos
              </span>
            </div>

            {/* Tech Badge Footer */}
            <div className="mt-6 pt-4 border-t border-white/[0.05] flex items-center justify-between text-xs text-white/50 font-mono">
              <span className="text-[#EC4899]">Pistas de Audio & Subtítulos</span>
              <span className="text-white/80 font-bold">Auto-Sincronizado</span>
            </div>
          </div>

          {/* Card 4: Cero Cuotas Mensuales de por Vida */}
          <div className="col-span-12 lg:col-span-7 relative group rounded-3xl p-8 sm:p-10 bg-gradient-to-b from-[#0F1123]/90 to-[#070714]/80 border border-white/[0.08] hover:border-emerald-500/40 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-emerald-500/15 text-[#00FF85] border border-emerald-500/30 font-mono">
                  INVERSIÓN ÚNICA
                </span>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-[#00FF85]">
                  <PiggyBank className="w-6 h-6" />
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white mb-3 uppercase tracking-tight font-display">
                Cero Cuotas Mensuales de por Vida
              </h3>
              <p className="text-sm sm:text-base text-white/60 leading-relaxed mb-6 font-grotesk">
                Un único pago de 65€. Aprovechas toda la potencia del software libre optimizado por profesionales, eliminando para siempre las facturas recurrentes mes a mes.
              </p>
            </div>

            {/* Savings Math Widget */}
            <div className="mt-4 rounded-2xl bg-[#030308]/90 border border-white/[0.06] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="text-3xl sm:text-4xl font-black text-[#00FF85] font-display">&gt; 650€</div>
                <div>
                  <div className="text-xs font-bold uppercase text-white font-grotesk">Ahorro Anual Medio</div>
                  <div className="text-[11px] text-white/50 font-mono">720€ tradicional vs 65€ pago único</div>
                </div>
              </div>
              <button
                onClick={() => scrollTo('wizard')}
                className="btn-neon inline-flex items-center justify-center px-4 py-2 rounded-xl text-[#050510] text-xs font-black font-mono uppercase cursor-pointer"
              >
                Configurar Ahora →
              </button>
            </div>

            {/* Tech Badge Footer */}
            <div className="mt-6 pt-4 border-t border-white/[0.05] flex items-center justify-between text-xs text-white/50 font-mono">
              <span className="text-[#00FF85]">Servicio de Setup Perpetuo</span>
              <span className="text-[#00FF85] font-bold">Ahorra +650€ / año</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

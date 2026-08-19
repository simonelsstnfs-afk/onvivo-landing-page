import React, { useState } from 'react';
import { Play } from 'lucide-react';

export const ConsoleShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'player' | 'ecosystem'>('player');

  const pillarsList = [
    { name: 'Biblioteca Global Unificada', desc: 'Catálogo clasificado con sinopsis y carátulas.', status: 'LISTO' },
    { name: 'Filtro Inteligente 1080p', desc: 'Priorización automática de fuentes en alta definición.', status: 'ACTIVO' },
    { name: 'Prioridad de Audio en Español', desc: 'Preselección de pistas en Castellano y Latino.', status: 'CONFIGURADO' },
    { name: 'Subtítulos Automáticos', desc: 'Sincronización directa en múltiples idiomas.', status: 'ACTIVO' },
    { name: 'Sincronización en la Nube', desc: 'Tu perfil disponible en cualquiera de tus pantallas.', status: 'VERIFICADO' },
    { name: 'Cero Ajustes Manuales', desc: 'Todo verificado antes de la entrega de tus accesos.', status: '100% LISTO' },
  ];

  return (
    <section id="showcase" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#050510] overflow-hidden border-t border-white/5">
      {/* Glow Backdrops */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#00F0FF]/10 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-[#EC4899]/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00FF85]/10 border border-[#00FF85]/30 text-[#00FF85] text-xs font-mono font-bold uppercase tracking-[0.2em] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#00FF85] animate-ping" />
            <span>DEMOSTRACIÓN INTERACTIVA</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-[0.98] font-display">
            SIMULADOR DE EXPERIENCIA <br />
            <span className="text-gradient-cyan">ONVIVO STREAMING</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-white/60 leading-relaxed font-grotesk">
            Comprueba cómo queda organizada y optimizada la interfaz de tu reproductor en cualquier pantalla.
          </p>
        </div>

        {/* Master Console Terminal Frame */}
        <div className="relative rounded-3xl bg-[#070714]/95 backdrop-blur-2xl border border-cyan-500/20 shadow-[0_25px_70px_rgba(0,0,0,0.8)] overflow-hidden">
          {/* Top Titlebar & Status Ribbon */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-white/[0.02] gap-4">
            {/* Window Dots & Status */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#EC4899]/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#F59E0B]/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#00FF85]/80 inline-block" />
              </div>
              <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />
              <div className="flex items-center gap-2 font-mono text-xs text-white">
                <span className="text-[#00F0FF] font-bold">ONVIVO_STREAM_CORE</span>
                <span className="px-2 py-0.5 rounded bg-[#00FF85]/15 text-[#00FF85] text-[10px] font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FF85] animate-pulse" />
                  SISTEMA LISTO
                </span>
              </div>
            </div>

            {/* Quick Status Pills */}
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
              <span className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[#00F0FF]">
                CALIDAD: <strong className="text-white">1080p Full HD</strong>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[#A855F7]">
                TASA: <strong className="text-white">60.0 FPS</strong>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[#00FF85]">
                AUDIO: <strong className="text-white">Español 5.1</strong>
              </span>
            </div>
          </div>

          {/* Tab Navigation Switcher */}
          <div className="flex items-center gap-2 px-6 pt-4 border-b border-white/[0.06] bg-black/30 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab('player')}
              className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold font-mono border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer uppercase tracking-wider ${
                activeTab === 'player'
                  ? 'border-[#00F0FF] text-[#00F0FF] bg-white/[0.04]'
                  : 'border-transparent text-white/50 hover:text-white'
              }`}
            >
              <span>🎬</span>
              <span>Reproductor Cinemático</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('ecosystem')}
              className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold font-mono border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer uppercase tracking-wider ${
                activeTab === 'ecosystem'
                  ? 'border-[#00F0FF] text-[#00F0FF] bg-white/[0.04]'
                  : 'border-transparent text-white/50 hover:text-white'
              }`}
            >
              <span>⚙️</span>
              <span>Pilares de Configuración</span>
            </button>
          </div>

          {/* Tab 1: Reproductor Cinemático */}
          {activeTab === 'player' && (
            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Mock Video Viewport */}
                <div className="lg:col-span-8 relative aspect-video rounded-2xl bg-gradient-to-br from-[#0B132B] via-[#070A11] to-[#1C1938] border border-white/10 overflow-hidden flex flex-col justify-between p-5 shadow-2xl group">
                  {/* Video Overlay Atmosphere */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

                  {/* Center Animated Play Icon */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="w-16 h-16 rounded-full bg-[#00F0FF]/20 border border-[#00F0FF]/40 backdrop-blur-md flex items-center justify-center text-[#00F0FF] shadow-[0_0_30px_rgba(0,240,255,0.4)] group-hover:scale-110 transition-transform">
                      <Play className="w-7 h-7 ml-1 fill-current" />
                    </div>
                  </div>

                  {/* Top Overlay Info */}
                  <div className="relative z-10 flex items-center justify-between text-xs font-mono">
                    <span className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-white font-bold">
                      REPRODUCCIÓN: Cinemática de Muestra · 1080p Full HD
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-[#00FF85]/20 text-[#00FF85] font-bold border border-[#00FF85]/40">
                      ● FLUIDEZ ÓPTIMA
                    </span>
                  </div>

                  {/* Bottom Controls Bar */}
                  <div className="relative z-10 space-y-3">
                    <div className="space-y-1">
                      <div className="w-full h-1.5 rounded-full bg-white/20 overflow-hidden relative">
                        <div className="absolute inset-y-0 left-0 bg-white/40 w-3/4 rounded-full" />
                        <div className="h-full bg-gradient-to-r from-[#00F0FF] to-[#A855F7] w-1/2 rounded-full" />
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-mono text-white/50">
                        <span>01:14:22</span>
                        <span className="text-[#00F0FF]">Flujo continuo sin cortes</span>
                        <span>02:49:00</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-white">
                      <div className="flex items-center gap-3 font-mono">
                        <span className="hover:text-[#00F0FF] transition-colors cursor-pointer">▶ Play/Pausa</span>
                        <span className="hover:text-[#00F0FF] transition-colors cursor-pointer">🔊 Dolby 5.1</span>
                      </div>
                      <div className="flex items-center gap-2 font-mono text-[11px]">
                        <span className="px-2 py-0.5 rounded bg-white/10 text-[#00F0FF] border border-white/10">Audio: ES 5.1</span>
                        <span className="px-2 py-0.5 rounded bg-white/10 text-[#A855F7] border border-white/10">Subs: Castellano</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Side Parameters */}
                <div className="lg:col-span-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] p-5 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="text-xs font-mono font-bold text-[#00F0FF] uppercase tracking-[0.2em] mb-3">
                      Ajustes Aplicados en tu Perfil
                    </div>
                    <div className="space-y-3 font-mono text-xs">
                      <div className="flex items-center justify-between py-1.5 border-b border-white/[0.05]">
                        <span className="text-white/50">Resolución Máxima</span>
                        <span className="text-white font-bold font-display">1080p Full HD</span>
                      </div>
                      <div className="flex items-center justify-between py-1.5 border-b border-white/[0.05]">
                        <span className="text-white/50">Fluidez de Cuadros</span>
                        <span className="text-[#00FF85] font-bold">60 FPS Estables</span>
                      </div>
                      <div className="flex items-center justify-between py-1.5 border-b border-white/[0.05]">
                        <span className="text-white/50">Prioridad de Idioma</span>
                        <span className="text-white font-bold">Castellano / Latino</span>
                      </div>
                      <div className="flex items-center justify-between py-1.5 border-b border-white/[0.05]">
                        <span className="text-white/50">Subtítulos</span>
                        <span className="text-[#00F0FF] font-bold">Auto-Sincronizados</span>
                      </div>
                      <div className="flex items-center justify-between py-1.5 border-b border-white/[0.05]">
                        <span className="text-white/50">Entrega de Accesos</span>
                        <span className="text-[#A855F7] font-bold">&lt; 2 minutos</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#00FF85]/10 border border-[#00FF85]/30 text-xs">
                    <div className="flex items-center gap-2 text-[#00FF85] font-bold font-mono mb-1">
                      <span>✓ Todo Preconfigurado</span>
                    </div>
                    <p className="text-[11px] text-white/60 leading-relaxed font-grotesk">
                      Solo introduces tu usuario y contraseña para disfrutar directamente en tu pantalla.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Pilares de Configuración */}
          {activeTab === 'ecosystem' && (
            <div className="p-6 sm:p-8">
              <div className="mb-4 flex items-center justify-between font-mono">
                <span className="text-xs text-white/50">
                  Resumen de Ajustes Integrados en tu Cuenta
                </span>
                <span className="text-xs text-[#00FF85] font-bold">
                  ● 6 Pilares Calibrados (100% Verificados)
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {pillarsList.map((pillar) => (
                  <div
                    key={pillar.name}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-cyan-500/30 flex items-center justify-between transition-all"
                  >
                    <div>
                      <div className="text-sm font-bold text-white font-grotesk">
                        {pillar.name}
                      </div>
                      <div className="text-[11px] text-white/50 font-mono mt-0.5">{pillar.desc}</div>
                    </div>
                    <div className="flex items-center gap-3 font-mono text-xs">
                      <span className="px-2 py-0.5 rounded bg-[#00FF85]/15 text-[#00FF85] text-[10px] font-bold">
                        {pillar.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

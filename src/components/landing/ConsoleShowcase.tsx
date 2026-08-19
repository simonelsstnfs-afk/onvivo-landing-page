import React, { useState } from 'react';
import { Play, Activity, Sparkles } from 'lucide-react';

export const ConsoleShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'player' | 'catalog' | 'telemetry'>('player');

  const addonsList = [
    { name: 'Cinemeta (Official)', type: 'Base Metadata Index', latency: '12 ms', status: 'ONLINE' },
    { name: 'Torrentio 1080p Pro', type: 'Streams & P2P Engine', latency: '18 ms', status: 'ONLINE' },
    { name: 'ThePirateBay+ Engine', type: 'Redundant Mirror Stream', latency: '22 ms', status: 'ONLINE' },
    { name: 'Streaming Catalogs', type: 'Netflix, Disney+, Max Sync', latency: '15 ms', status: 'ONLINE' },
    { name: 'Anime Catalogs HD', type: 'MyAnimeList Top Series', latency: '20 ms', status: 'ONLINE' },
    { name: 'Anime Kitsu Live', type: 'Japanese Simulcast Data', latency: '19 ms', status: 'ONLINE' },
    { name: 'OpenSubtitles v3 Pro', type: 'Auto-Sync Multi-Language', latency: '14 ms', status: 'ONLINE' },
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
            <span>DIAGNÓSTICO EN TIEMPO REAL</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-[0.98] font-display">
            CONSOLA DE TELEMETRÍA <br />
            <span className="text-gradient-cyan">ONVIVO STREAM CORE</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-white/60 leading-relaxed font-grotesk">
            Observa cómo opera el motor de streaming: telemetría continua a 1080p60, metadatos enriquecidos y gestión inteligente de buffers sin cortes.
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
                  STREAMING LIVE
                </span>
              </div>
            </div>

            {/* Live Telemetry Quick Pills */}
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
              <span className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[#00F0FF]">
                RES: <strong className="text-white">1080p Full HD</strong>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[#A855F7]">
                FPS: <strong className="text-white">60.0 FPS</strong>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[#00FF85]">
                BITRATE: <strong className="text-white">14.2 Mbps</strong>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[#EC4899]">
                PING: <strong className="text-white">18 ms</strong>
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
              onClick={() => setActiveTab('catalog')}
              className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold font-mono border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer uppercase tracking-wider ${
                activeTab === 'catalog'
                  ? 'border-[#00F0FF] text-[#00F0FF] bg-white/[0.04]'
                  : 'border-transparent text-white/50 hover:text-white'
              }`}
            >
              <span>📑</span>
              <span>Muro Unificado</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('telemetry')}
              className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold font-mono border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer uppercase tracking-wider ${
                activeTab === 'telemetry'
                  ? 'border-[#00F0FF] text-[#00F0FF] bg-white/[0.04]'
                  : 'border-transparent text-white/50 hover:text-white'
              }`}
            >
              <span>📡</span>
              <span>Monitor de Red & Addons (7)</span>
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
                      STREAMING: Dune Part Two (2026) · 1080p
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-[#00FF85]/20 text-[#00FF85] font-bold border border-[#00FF85]/40">
                      ● LIVE BUFFER: +45.0s
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
                        <span className="text-[#00F0FF]">Buffer precargado: +45.0s</span>
                        <span>02:49:00</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-white">
                      <div className="flex items-center gap-3 font-mono">
                        <span className="hover:text-[#00F0FF] transition-colors cursor-pointer">▶ Play/Pausa</span>
                        <span className="hover:text-[#00F0FF] transition-colors cursor-pointer">🔊 100% (Dolby 5.1)</span>
                      </div>
                      <div className="flex items-center gap-2 font-mono text-[11px]">
                        <span className="px-2 py-0.5 rounded bg-white/10 text-[#00F0FF] border border-white/10">Audio: ES 5.1</span>
                        <span className="px-2 py-0.5 rounded bg-white/10 text-[#A855F7] border border-white/10">Subs: Castellano</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Side Stream Telemetry Diagnostics */}
                <div className="lg:col-span-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] p-5 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="text-xs font-mono font-bold text-[#00F0FF] uppercase tracking-[0.2em] mb-3">
                      Parámetros de Reproducción
                    </div>
                    <div className="space-y-3 font-mono text-xs">
                      <div className="flex items-center justify-between py-1.5 border-b border-white/[0.05]">
                        <span className="text-white/50">Resolución Activa</span>
                        <span className="text-white font-bold font-display">1920 x 1080p</span>
                      </div>
                      <div className="flex items-center justify-between py-1.5 border-b border-white/[0.05]">
                        <span className="text-white/50">Tasa de Cuadros</span>
                        <span className="text-[#00FF85] font-bold">60.00 FPS Estables</span>
                      </div>
                      <div className="flex items-center justify-between py-1.5 border-b border-white/[0.05]">
                        <span className="text-white/50">Pipeline Decodificación</span>
                        <span className="text-white">Hardware HEVC/H.264</span>
                      </div>
                      <div className="flex items-center justify-between py-1.5 border-b border-white/[0.05]">
                        <span className="text-white/50">Latencia CDN</span>
                        <span className="text-[#00F0FF] font-bold">18 ms (Cluster ES)</span>
                      </div>
                      <div className="flex items-center justify-between py-1.5 border-b border-white/[0.05]">
                        <span className="text-white/50">Addons Sincronizados</span>
                        <span className="text-[#A855F7] font-bold">7 / 7 Online</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#00FF85]/10 border border-[#00FF85]/30 text-xs">
                    <div className="flex items-center gap-2 text-[#00FF85] font-bold font-mono mb-1">
                      <span>🛡️ Cero Caídas Detectadas</span>
                    </div>
                    <p className="text-[11px] text-white/60 leading-relaxed font-grotesk">
                      El motor previene automáticamente cortes ajustando dinámicamente los buffers de red.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Muro Unificado */}
          {activeTab === 'catalog' && (
            <div className="p-6 sm:p-8">
              <div className="mb-4 flex items-center justify-between font-mono">
                <span className="text-xs text-white/50">
                  Catálogo Unificado Onvivo · Vista previa en Smart TV & PC
                </span>
                <span className="text-xs text-[#00F0FF] font-bold">
                  +25.000 títulos indexados
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {/* Card 1 */}
                <div className="group rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-cyan-500/40 p-3 transition-all duration-300">
                  <div className="aspect-[2/3] rounded-xl bg-gradient-to-br from-[#1E293B] to-[#0F172A] relative overflow-hidden flex flex-col justify-between p-3">
                    <span className="self-start px-2 py-0.5 rounded bg-cyan-500/20 text-[#00F0FF] text-[10px] font-mono font-bold">1080p HD</span>
                    <div className="text-xs font-bold text-white font-grotesk">Dune: Part Two</div>
                  </div>
                  <div className="mt-2 text-[11px] text-white/50 flex items-center justify-between font-mono">
                    <span>★ 9.1</span>
                    <span className="text-[#EC4899]">Audio: ES / LAT</span>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="group rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-purple-500/40 p-3 transition-all duration-300">
                  <div className="aspect-[2/3] rounded-xl bg-gradient-to-br from-[#2E1065] to-[#0F172A] relative overflow-hidden flex flex-col justify-between p-3">
                    <span className="self-start px-2 py-0.5 rounded bg-purple-500/20 text-[#A855F7] text-[10px] font-mono font-bold">Temporada Completa</span>
                    <div className="text-xs font-bold text-white font-grotesk">Fallout (S1)</div>
                  </div>
                  <div className="mt-2 text-[11px] text-white/50 flex items-center justify-between font-mono">
                    <span>★ 8.9</span>
                    <span className="text-[#EC4899]">Audio: VOSE + Subs</span>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="group rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-pink-500/40 p-3 transition-all duration-300">
                  <div className="aspect-[2/3] rounded-xl bg-gradient-to-br from-[#831843] to-[#0F172A] relative overflow-hidden flex flex-col justify-between p-3">
                    <span className="self-start px-2 py-0.5 rounded bg-pink-500/20 text-[#EC4899] text-[10px] font-mono font-bold">Estreno 2026</span>
                    <div className="text-xs font-bold text-white font-grotesk">Project Hail Mary</div>
                  </div>
                  <div className="mt-2 text-[11px] text-white/50 flex items-center justify-between font-mono">
                    <span>★ 9.4</span>
                    <span className="text-[#EC4899]">Audio: ES 5.1</span>
                  </div>
                </div>

                {/* Card 4 */}
                <div className="group rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-emerald-500/40 p-3 transition-all duration-300">
                  <div className="aspect-[2/3] rounded-xl bg-gradient-to-br from-[#064E3B] to-[#0F172A] relative overflow-hidden flex flex-col justify-between p-3">
                    <span className="self-start px-2 py-0.5 rounded bg-emerald-500/20 text-[#00FF85] text-[10px] font-mono font-bold">Serie Épica</span>
                    <div className="text-xs font-bold text-white font-grotesk">Shōgun</div>
                  </div>
                  <div className="mt-2 text-[11px] text-white/50 flex items-center justify-between font-mono">
                    <span>★ 9.2</span>
                    <span className="text-[#EC4899]">Audio: JAP + Subs ES</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Monitor de Red & Addons */}
          {activeTab === 'telemetry' && (
            <div className="p-6 sm:p-8">
              <div className="mb-4 flex items-center justify-between font-mono">
                <span className="text-xs text-white/50">
                  Monitor en Vivo de Manifiestos y Conectividad
                </span>
                <span className="text-xs text-[#00FF85] font-bold">
                  ● 7 / 7 Addons Operativos (0 errores)
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {addonsList.map((addon) => (
                  <div
                    key={addon.name}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-cyan-500/30 flex items-center justify-between transition-all"
                  >
                    <div>
                      <div className="text-sm font-bold text-white font-grotesk">
                        {addon.name}
                      </div>
                      <div className="text-[11px] text-white/50 font-mono mt-0.5">{addon.type}</div>
                    </div>
                    <div className="flex items-center gap-3 font-mono text-xs">
                      <span className="text-[#00F0FF]">{addon.latency}</span>
                      <span className="px-2 py-0.5 rounded bg-[#00FF85]/15 text-[#00FF85] text-[10px] font-bold">
                        {addon.status}
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

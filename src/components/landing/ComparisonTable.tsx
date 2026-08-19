import React from 'react';
import { ArrowRight, Scale, Check, X } from 'lucide-react';

interface ComparisonTableProps {
  onOpenWizard?: () => void;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ onOpenWizard }) => {
  const handleAction = () => {
    if (onOpenWizard) {
      onOpenWizard();
    }
  };

  return (
    <section id="comparativa" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#050510] overflow-hidden border-t border-white/5">
      {/* Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[300px] bg-[#00F0FF]/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-[#EC4899] text-xs font-mono font-bold uppercase tracking-[0.2em] mb-4">
            <Scale className="w-3.5 h-3.5" />
            <span>TRANSPARENCIA Y AHORRO</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-[0.98] font-display">
            ONVIVO FRENTE A LA <br />
            <span className="text-gradient-violet">FRAGMENTACIÓN</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-white/60 leading-relaxed font-grotesk max-w-xl">
            ¿Por qué pagar más de 60€ al mes cuando puedes unificarlo todo con un único servicio de configuración permanente?
          </p>
          <div className="mt-4 inline-block px-4 py-1.5 rounded-full bg-[#00FF85]/15 border border-[#00FF85]/30 text-[#00FF85] font-mono text-xs font-bold">
            💰 Ahorro neto de más de 650€ cada año
          </div>
        </div>

        {/* Comparison Table Card Frame */}
        <div className="relative rounded-3xl bg-[#070714]/90 backdrop-blur-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[650px] font-grotesk">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03]">
                  <th scope="col" className="py-5 px-6 text-xs sm:text-sm font-bold uppercase tracking-wider text-white/50 font-mono w-1/3">
                    Característica
                  </th>
                  <th scope="col" className="py-5 px-6 text-xs sm:text-sm font-bold uppercase tracking-wider text-white/50 font-mono w-1/3">
                    Suscripciones Tradicionales
                  </th>
                  <th scope="col" className="py-5 px-6 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#00F0FF] font-mono w-1/3 bg-cyan-500/[0.06] border-l border-r border-cyan-500/20">
                    <div className="flex items-center gap-2">
                      <span>Pack Setup Onvivo</span>
                      <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-[#00F0FF] text-[10px] font-bold font-mono">
                        Recomendado
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] text-xs sm:text-sm">
                {/* Row 1: Coste Mensual */}
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6 font-semibold text-white">
                    Coste mensual recurrente
                  </td>
                  <td className="py-4 px-6 text-white/60">
                    <div className="flex items-center gap-2">
                      <span className="text-[#EC4899] font-bold">✕</span>
                      <span>~60€ / mes (con subidas constantes)</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 bg-cyan-500/[0.03] border-l border-r border-cyan-500/20 text-white font-bold">
                    <div className="flex items-center gap-2 text-[#00FF85]">
                      <span>✓</span>
                      <span>0€ / mes (Sin cuotas jamás)</span>
                    </div>
                  </td>
                </tr>

                {/* Row 2: Coste 1er Año */}
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6 font-semibold text-white">
                    Coste total en el 1er año
                  </td>
                  <td className="py-4 px-6 text-white/60">
                    <div className="flex items-center gap-2">
                      <span className="text-[#EC4899] font-bold">✕</span>
                      <span>720€+</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 bg-cyan-500/[0.03] border-l border-r border-cyan-500/20 text-[#00F0FF] font-bold font-display text-base">
                    <div className="flex items-center gap-2">
                      <span className="text-[#00FF85]">✓</span>
                      <span>65€ (Pago único Lifetime)</span>
                    </div>
                  </td>
                </tr>

                {/* Row 3: Ahorro Neto */}
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6 font-semibold text-white">
                    Ahorro neto acumulado
                  </td>
                  <td className="py-4 px-6 text-white/60">
                    <div className="flex items-center gap-2">
                      <span className="text-[#EC4899] font-bold">✕</span>
                      <span>0€ (Gasto recurrente perdido)</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 bg-cyan-500/[0.03] border-l border-r border-cyan-500/20 text-[#00FF85] font-black font-display text-base">
                    <div className="flex items-center gap-2">
                      <span>✓</span>
                      <span>655€ ahorrados año 1</span>
                    </div>
                  </td>
                </tr>

                {/* Row 4: Número de Cuentas */}
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6 font-semibold text-white">
                    Número de aplicaciones y cuentas
                  </td>
                  <td className="py-4 px-6 text-white/60">
                    <div className="flex items-center gap-2">
                      <span className="text-[#EC4899] font-bold">✕</span>
                      <span>Múltiples apps con login disperso</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 bg-cyan-500/[0.03] border-l border-r border-cyan-500/20 text-white font-medium">
                    <div className="flex items-center gap-2 text-[#00FF85]">
                      <span>✓</span>
                      <span>1 sola aplicación centralizada</span>
                    </div>
                  </td>
                </tr>

                {/* Row 5: Calidad y Limitaciones */}
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6 font-semibold text-white">
                    Calidad y limitaciones de pantallas
                  </td>
                  <td className="py-4 px-6 text-white/60">
                    <div className="flex items-center gap-2">
                      <span className="text-[#EC4899] font-bold">✕</span>
                      <span>Planes con anuncios y cargos por hogar</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 bg-cyan-500/[0.03] border-l border-r border-cyan-500/20 text-white font-medium">
                    <div className="flex items-center gap-2 text-[#00FF85]">
                      <span>✓</span>
                      <span>1080p Full HD sin bloqueos por hogar</span>
                    </div>
                  </td>
                </tr>

                {/* Row 6: Disponibilidad Catálogo */}
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6 font-semibold text-white">
                    Disponibilidad del catálogo
                  </td>
                  <td className="py-4 px-6 text-white/60">
                    <div className="flex items-center gap-2">
                      <span className="text-[#EC4899] font-bold">✕</span>
                      <span>Títulos que expiran y licencias rotativas</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 bg-cyan-500/[0.03] border-l border-r border-cyan-500/20 text-white font-medium">
                    <div className="flex items-center gap-2 text-[#00FF85]">
                      <span>✓</span>
                      <span>Acceso universal a todo el catálogo</span>
                    </div>
                  </td>
                </tr>

                {/* Row 7: Tiempo de Puesta en Marcha */}
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6 font-semibold text-white">
                    Tiempo de puesta en marcha
                  </td>
                  <td className="py-4 px-6 text-white/60">
                    <div className="flex items-center gap-2">
                      <span className="text-[#EC4899] font-bold">✕</span>
                      <span>Registros manuales y tarjetas múltiples</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 bg-cyan-500/[0.03] border-l border-r border-cyan-500/20 text-white font-medium">
                    <div className="flex items-center gap-2 text-[#00FF85]">
                      <span>✓</span>
                      <span>Configuración llave en mano en &lt; 60 segundos</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Table Footer CTA Strip */}
          <div className="p-6 bg-white/[0.02] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-white/50 font-mono">
              * Estimación basada en el coste medio de 4 a 5 suscripciones mensuales tradicionales.
            </div>
            <button
              type="button"
              onClick={handleAction}
              className="btn-neon inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-[#050510] text-xs font-black uppercase tracking-wider font-mono shadow-lg cursor-pointer"
            >
              <span>Activar Mi Ahorro Ahora — 65€</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

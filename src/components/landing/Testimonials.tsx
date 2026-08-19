import React from 'react';
import { Star } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonios" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#0B0F19] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/25 text-[#00F0FF] text-xs font-mono font-semibold uppercase tracking-wider mb-4">
            <Star className="w-3.5 h-3.5 fill-[#00F0FF]" />
            <span>Experiencias Reales</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Usuarios que ya disfrutan de su entretenimiento sin límites
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#8B8BA7] leading-relaxed">
            Descubre cómo personas como tú han simplificado su salón y ahorrado cientos de euros al año.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Testimonial 1: Carlos R. */}
          <div className="rounded-3xl p-8 bg-gradient-to-b from-[#131B2E] to-[#0F172A] border border-white/[0.08] hover:border-[#00F0FF]/40 shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex text-[#F59E0B] text-sm">★★★★★</div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#10B981]/15 text-[#10B981] text-[10px] font-mono font-bold">
                  Ahorro de 700€/año
                </span>
              </div>
              <p className="text-sm text-[#E2E8FF] leading-relaxed italic mb-6">
                «Pagaba más de 65€ al mes acumulando múltiples suscripciones para la familia. Con el setup de Onvivo lo tengo todo unificado en el Fire TV del salón. En 2 minutos estaba funcionando y el ahorro de más de 650€ al año es brutal.»
              </p>
            </div>
            <div className="pt-4 border-t border-white/[0.06] flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-lg">
                👨‍💼
              </div>
              <div>
                <div className="text-sm font-bold text-white">Carlos R.</div>
                <div className="text-[11px] text-[#8B8BA7]">Madrid • Amazon Fire TV Stick 4K</div>
              </div>
            </div>
          </div>

          {/* Testimonial 2: Lucía M. */}
          <div className="rounded-3xl p-8 bg-gradient-to-b from-[#131B2E] to-[#0F172A] border border-white/[0.08] hover:border-[#A855F7]/40 shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex text-[#F59E0B] text-sm">★★★★★</div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#00F0FF]/15 text-[#00F0FF] text-[10px] font-mono font-bold">
                  0 cortes • 1080p60
                </span>
              </div>
              <p className="text-sm text-[#E2E8FF] leading-relaxed italic mb-6">
                «Lo que más me preocupaba eran los subtítulos y los cortes de carga. La sincronización de audio en versión original con subs en castellano es milimétrica y la reproducción a 1080p no se traba jamás.»
              </p>
            </div>
            <div className="pt-4 border-t border-white/[0.06] flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-lg">
                👩‍💻
              </div>
              <div>
                <div className="text-sm font-bold text-white">Lucía M.</div>
                <div className="text-[11px] text-[#8B8BA7]">Barcelona • MacBook Pro & Smart TV</div>
              </div>
            </div>
          </div>

          {/* Testimonial 3: David S. */}
          <div className="rounded-3xl p-8 bg-gradient-to-b from-[#131B2E] to-[#0F172A] border border-white/[0.08] hover:border-[#EC4899]/40 shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex text-[#F59E0B] text-sm">★★★★★</div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#EC4899]/15 text-[#EC4899] text-[10px] font-mono font-bold">
                  Setup en &lt; 2 minutos
                </span>
              </div>
              <p className="text-sm text-[#E2E8FF] leading-relaxed italic mb-6">
                «Intenté configurar Stremio por mi cuenta pero perdía horas buscando addons fiables que no se cayeran a los dos días. La guía en PDF y el perfil preconfigurado de Onvivo me ahorraron todo el dolor de cabeza. Vale cada céntimo.»
              </p>
            </div>
            <div className="pt-4 border-t border-white/[0.06] flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-lg">
                🧑‍🔧
              </div>
              <div>
                <div className="text-sm font-bold text-white">David S.</div>
                <div className="text-[11px] text-[#8B8BA7]">Valencia • Google TV & Android</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

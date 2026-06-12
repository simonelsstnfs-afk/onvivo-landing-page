import { motion } from "motion/react";
import { Shield, Zap, Clock, CheckCircle, ArrowRight } from "lucide-react";

export default function Pricing() {
  return (
    <section id="precio" className="py-32 relative overflow-hidden bg-transparent border-t border-white/5">
      {/* Glow de fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#00F0FF]/5 via-[#AD00FF]/8 to-[#FF007A]/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="container mx-auto px-6 max-w-4xl">
        {/* Encabezado */}
        <div className="text-center mb-16 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/5 backdrop-blur-md">
            <Shield className="w-3.5 h-3.5 text-[#00FF85]" />
            <span className="text-[10px] md:text-xs font-mono font-bold tracking-[0.2em] text-white/50 uppercase">
              COMPRA DE LLAVES EN LOTE // REVENDEDORES
            </span>
          </div>
          
          <h2 className="text-3xl md:text-6xl font-black tracking-tighter uppercase mb-6 leading-[0.98]">
            TARIFAS DE{" "}
            <span className="bg-gradient-to-r from-[#00F0FF] via-[#AD00FF] to-[#FF007A] text-transparent bg-clip-text drop-shadow-[0_0_20px_rgba(0,240,255,0.15)]">
              SOCIO B2B
            </span>
          </h2>
          
          <p className="text-white/40 max-w-lg text-sm md:text-base leading-relaxed">
            Adquiere packs de llaves a precio de socio mayorista y revende al precio que tú decidas. Margen de beneficio neto directo del 80% al 90%.
          </p>
        </div>

        {/* Tarjeta de Precio Principal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl"
        >
          {/* Borde gradiente */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#00F0FF]/30 via-[#AD00FF]/20 to-[#FF007A]/30 rounded-3xl" />
          
          <div className="relative m-[1px] bg-[#07070a]/95 backdrop-blur-2xl rounded-3xl p-8 md:p-10">
            {/* Badge superior */}
            <div className="text-center mb-8">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#00FF85]/10 border border-[#00FF85]/25 text-[#00FF85] text-[10px] font-mono font-bold tracking-[0.25em] uppercase">
                COSTE BASE DE SOCIO
              </span>
            </div>

            {/* Precio */}
            <div className="text-center mb-8">
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-6xl md:text-7xl font-black text-white tracking-tighter">20</span>
                <div className="text-left">
                  <span className="text-2xl font-bold text-white/80">€</span>
                  <div className="text-[10px] font-mono text-white/30 tracking-widest uppercase">POR LLAVE</div>
                </div>
              </div>
              <p className="text-white/40 text-xs mt-3 font-mono tracking-wider">
                PRECIO RECOMENDADO VENTA: 25€ - 50€
              </p>
            </div>

            {/* Lista de beneficios */}
            <div className="space-y-3.5 mb-8">
              {[
                "Llaves de activación prepago sin caducidad",
                "Setup de Stremio 100% automatizado con Playwright",
                "Consumo atómico de llave (solo si tiene éxito)",
                "Reembolso automático de la llave si falla el setup",
                "7 Addons premium preinstalados listos para usar",
                "Soporte prioritario directo del Administrador",
                "Panel de control para gestionar balance e historial",
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-[#00FF85] shrink-0" />
                  <span className="text-white/70 text-sm">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Principal */}
            <motion.a
              href="#/login"
              whileHover={{ scale: 1.03, y: -2, boxShadow: "0 0 45px rgba(0, 240, 255, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              className="w-full group relative inline-flex items-center justify-center py-4 bg-gradient-to-r from-[#00F0FF] via-[#7000FF] to-[#FF007A] text-white font-mono text-xs font-bold uppercase tracking-[0.2em] rounded-xl overflow-hidden shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-all duration-300 cursor-pointer text-center"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms] ease-out" />
              <span className="relative z-10 flex items-center gap-2">
                ACCEDER Y RECARGAR <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.a>

            {/* Trust indicators */}
            <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-white/5">
              <div className="flex items-center gap-1.5 text-white/30">
                <Shield className="w-3.5 h-3.5" />
                <span className="text-[9px] font-mono tracking-wider uppercase">Retorno Rápido</span>
              </div>
              <div className="flex items-center gap-1.5 text-white/30">
                <Zap className="w-3.5 h-3.5" />
                <span className="text-[9px] font-mono tracking-wider uppercase">Setup en 3 clics</span>
              </div>
              <div className="flex items-center gap-1.5 text-white/30">
                <Clock className="w-3.5 h-3.5" />
                <span className="text-[9px] font-mono tracking-wider uppercase">Llaves sin Caducidad</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from "motion/react";
import { Send, Twitter, Instagram, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-24 border-t border-white/5 bg-[#020203] relative overflow-hidden">
      {/* Sutil resplandor de fondo */}
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#00F0FF]/2 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-20 mb-20">
          
          {/* Logo y Eslogan */}
          <div className="col-span-1 md:col-span-2 text-left">
            <div className="flex items-center gap-3 mb-8">
              <img 
                src="/logo.png" 
                alt="onvivo logo" 
                className="w-10 h-10 object-contain drop-shadow-[0_0_15px_rgba(0,240,255,0.4)] animate-pulse"
              />
              <span className="text-xl font-black text-white tracking-tighter uppercase font-mono">onvivo</span>
            </div>
            <p className="text-white/45 max-w-sm leading-relaxed text-sm">
              Transformando la manera en que configuras y consumes tu contenido digital mediante automatización inteligente de máxima fidelidad y configuraciones optimizadas a tu medida.
            </p>
          </div>

          {/* Navegación */}
          <div className="text-left">
            <h5 className="text-[10px] font-bold text-[#00F0FF] uppercase tracking-[0.3em] mb-8 font-mono">Navegación</h5>
            <div className="flex flex-col gap-4 text-white/50 text-[10px] uppercase tracking-widest font-bold font-mono">
              <a href="#inicio" className="hover:text-[#00F0FF] transition-colors duration-300 w-fit">Inicio</a>
              <a href="#servicios" className="hover:text-[#00F0FF] transition-colors duration-300 w-fit">Servicios</a>
              <a href="#proceso" className="hover:text-[#00F0FF] transition-colors duration-300 w-fit">Proceso</a>
              <a href="#faq" className="hover:text-[#00F0FF] transition-colors duration-300 w-fit">FAQ</a>
            </div>
          </div>

          {/* Seguridad */}
          <div className="text-left">
            <h5 className="text-[10px] font-bold text-[#AD00FF] uppercase tracking-[0.3em] mb-8 font-mono">Seguridad</h5>
            <div className="flex flex-col gap-4 text-white/50 text-[10px] uppercase tracking-widest font-bold font-mono">
              <a href="#" className="hover:text-[#AD00FF] transition-colors duration-300 w-fit">Términos</a>
              <a href="#" className="hover:text-[#AD00FF] transition-colors duration-300 w-fit">Privacidad</a>
              <a href="#" className="hover:text-[#AD00FF] transition-colors duration-300 w-fit">SLA</a>
            </div>
          </div>
        </div>

        {/* Separación y Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-8">
          <p className="text-white/30 text-[10px] uppercase tracking-[0.25em] font-mono font-bold">
            © {new Date().getFullYear()} ONVIVO // SISTEMA OPERATIVO
          </p>
          
          {/* Iconos Sociales con Brillo Neón */}
          <div className="flex gap-8">
            <a 
              href="https://t.me/onvivo_bot" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-[#00F0FF] hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] hover:scale-115 transition-all duration-300"
            >
              <Send size={18} />
            </a>
            <a 
              href="#" 
              className="text-white/40 hover:text-[#AD00FF] hover:drop-shadow-[0_0_8px_rgba(173,0,255,0.8)] hover:scale-115 transition-all duration-300"
            >
              <Twitter size={18} />
            </a>
            <a 
              href="#" 
              className="text-white/40 hover:text-[#FF007A] hover:drop-shadow-[0_0_8px_rgba(255,0,122,0.8)] hover:scale-115 transition-all duration-300"
            >
              <Instagram size={18} />
            </a>
            <a 
              href="#" 
              className="text-white/40 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] hover:scale-115 transition-all duration-300"
            >
              <Github size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

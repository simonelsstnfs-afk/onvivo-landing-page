import { motion } from "motion/react";
import { Send, Twitter, Instagram, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-24 border-t border-white/10 mt-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-20 relative z-10">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <svg className="w-8 h-8 drop-shadow-[0_0_8px_rgba(0,240,255,0.3)]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M35 25 L75 50 L35 75 Z" fill="url(#onvivo-footer-grad)" stroke="white" strokeOpacity="0.2" strokeWidth="2" />
                <path d="M35 25 L55 50 L35 75 Z" fill="#FFFFFF" fillOpacity="0.15" />
                <circle cx="47" cy="50" r="5" fill="#FFFFFF" />
                <defs>
                  <linearGradient id="onvivo-footer-grad" x1="35" y1="25" x2="75" y2="75" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#00F0FF" />
                    <stop offset="1" stopColor="#7000FF" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-xl font-black text-white tracking-tighter uppercase">onvivo</span>
            </div>
            <p className="text-white/40 max-w-sm leading-relaxed text-sm">
              Transformando la manera en que configuras y consumes contenido digital mediante automatización inteligente en Telegram.
            </p>
          </div>

          <div>
            <h5 className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.3em] mb-8">Navegación</h5>
            <div className="flex flex-col gap-4 text-white/50 text-[11px] uppercase tracking-widest font-bold">
              <a href="#inicio" className="hover:text-white transition-colors">Inicio</a>
              <a href="#servicios" className="hover:text-white transition-colors">Servicios</a>
              <a href="#proceso" className="hover:text-white transition-colors">Proceso</a>
              <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            </div>
          </div>

          <div>
            <h5 className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.3em] mb-8">Seguridad</h5>
            <div className="flex flex-col gap-4 text-white/50 text-[11px] uppercase tracking-widest font-bold">
              <a href="#" className="hover:text-white transition-colors">Términos</a>
              <a href="#" className="hover:text-white transition-colors">Privacidad</a>
              <a href="#" className="hover:text-white transition-colors">SLA</a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-8">
          <p className="text-white/20 text-[10px] uppercase tracking-[0.2em] font-mono">
            © {new Date().getFullYear()} ONVIVO // SISTEMA OPERATIVO
          </p>
          
          <div className="flex gap-8">
            <a href="https://t.me/onvivo_bot" className="text-white/40 hover:text-white transition-colors"><Send size={18} /></a>
            <a href="#" className="text-white/40 hover:text-white transition-colors"><Twitter size={18} /></a>
            <a href="#" className="text-white/40 hover:text-white transition-colors"><Instagram size={18} /></a>
            <a href="#" className="text-white/40 hover:text-white transition-colors"><Github size={18} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

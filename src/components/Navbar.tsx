import { motion } from "motion/react";
import { Sparkles, Menu, X } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  onOpenWizard?: () => void;
}

export default function Navbar({ onOpenWizard }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleContractClick = () => {
    setIsOpen(false);
    if (onOpenWizard) {
      onOpenWizard();
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#07070a]/75 backdrop-blur-xl border-b border-white/5 px-6 py-4 transition-all shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <img 
            src="/logo.png" 
            alt="onvivo logo" 
            className="w-10 h-10 object-contain drop-shadow-[0_0_12px_rgba(0,240,255,0.45)]"
          />
          <span className="text-xl font-black tracking-tighter uppercase text-white">onvivo</span>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-12">
          {["Inicio", "Servicios", "Proceso", "FAQ"].map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60 hover:text-[#00F0FF] hover:scale-105 transition-all duration-300"
            >
              {item}
            </motion.a>
          ))}
          <motion.button
            onClick={handleContractClick}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[10px] cursor-pointer font-bold uppercase tracking-[0.25em] px-6 py-2.5 border border-[#00F0FF]/35 text-[#00F0FF] rounded-full hover:bg-[#00F0FF]/5 hover:border-[#00F0FF]/70 hover:shadow-[0_0_15px_rgba(0,240,255,0.25)] transition-all duration-300 font-mono"
          >
            Contratar
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-[#00F0FF] hover:text-white transition-colors p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu en Cristal Esmerilado Premium */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden mt-3 backdrop-blur-2xl bg-[#07070a]/90 border border-white/10 rounded-2xl p-5 flex flex-col gap-4 shadow-[0_15px_40px_rgba(0,0,0,0.8)]"
        >
          {["Inicio", "Servicios", "Proceso", "FAQ"].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              onClick={() => setIsOpen(false)}
              className="text-white/60 hover:text-[#00F0FF] font-bold text-xs uppercase tracking-widest px-2 py-1 transition-colors"
            >
              {item}
            </a>
          ))}
          <button
            onClick={handleContractClick}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#00F0FF] via-[#7000FF] to-[#FF007A] text-white px-5 py-3.5 rounded-xl font-mono text-[10px] font-bold uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-transform duration-300 active:scale-95 cursor-pointer"
          >
            <Sparkles size={14} className="animate-pulse" />
            Contratar Ahora
          </button>
        </motion.div>
      )}
    </nav>
  );
}

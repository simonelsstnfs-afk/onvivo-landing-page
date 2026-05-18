import { motion } from "motion/react";
import { Send, Menu } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#07070a]/75 backdrop-blur-xl border-b border-white/5 px-6 py-4 transition-all shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img 
            src="/logo.png" 
            alt="onvivo logo" 
            className="w-10 h-10 object-contain drop-shadow-[0_0_12px_rgba(0,240,255,0.4)]"
            style={{ mixBlendMode: 'screen' }} 
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
              className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60 hover:text-white transition-all"
            >
              {item}
            </motion.a>
          ))}
          <motion.a
            href="https://t.me/onvivo_bot"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[10px] font-bold uppercase tracking-[0.2em] px-5 py-2 border border-white/20 rounded-full hover:bg-white hover:text-background transition-all"
          >
            Acceso Directo
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-slate-300 hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu (Optional expansion) */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden mt-2 glass rounded-2xl p-4 flex flex-col gap-4"
        >
          {["Inicio", "Servicios", "Proceso", "FAQ"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-slate-300 hover:text-white px-2 py-1">
              {item}
            </a>
          ))}
          <a
            href="https://t.me/onvivo_bot"
            className="flex items-center justify-center gap-2 bg-brand-primary text-background px-5 py-3 rounded-xl font-bold"
          >
            <Send size={16} />
            Telegram
          </a>
        </motion.div>
      )}
    </nav>
  );
}

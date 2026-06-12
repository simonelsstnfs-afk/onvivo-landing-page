import { motion } from "motion/react";
import { Sparkles, Menu, X, User, LogOut } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, role, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === "/";

  const handleLogoClick = () => {
    if (isHomePage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#07070a]/75 backdrop-blur-xl border-b border-white/5 px-6 py-4 transition-all shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* LOGO */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 cursor-pointer"
          onClick={handleLogoClick}
        >
          <img 
            src="/logo.png" 
            alt="onvivo logo" 
            className="w-10 h-10 object-contain drop-shadow-[0_0_12px_rgba(0,240,255,0.45)]"
          />
          <span className="text-xl font-black tracking-tighter uppercase text-white">onvivo</span>
        </motion.div>

        {/* Navigation Links (Desktop) */}
        <div className="hidden md:flex items-center gap-8">
          {isHomePage ? (
            <>
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
            </>
          ) : (
            <Link
              to="/"
              className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60 hover:text-[#00F0FF] hover:scale-105 transition-all duration-300"
            >
              Volver al inicio
            </Link>
          )}

          <div className="h-4 w-[1px] bg-white/10" />

          {/* Botón de Acceso/Panel */}
          {user ? (
            <div className="flex items-center gap-4">
              <Link
                to={role === "admin" ? "/admin" : "/dashboard"}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#00F0FF]/20 to-[#AD00FF]/20 border border-[#00F0FF]/30 hover:border-[#00F0FF]/60 hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] text-white text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all"
              >
                <User size={12} className="text-[#00F0FF]" />
                Panel Control
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/30 text-red-400 rounded-xl transition-all cursor-pointer"
                title="Cerrar sesión"
              >
                <LogOut size={12} />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 px-5 py-2.5 bg-[#00F0FF]/10 hover:bg-[#00F0FF]/25 border border-[#00F0FF]/30 hover:border-[#00F0FF] text-[#00F0FF] text-[10px] font-black uppercase tracking-[0.15em] rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(0,240,255,0.1)] hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]"
            >
              Acceso Socios
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-[#00F0FF] hover:text-white transition-colors p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden mt-3 backdrop-blur-2xl bg-[#07070a]/95 border border-white/10 rounded-2xl p-5 flex flex-col gap-4 shadow-[0_15px_40px_rgba(0,0,0,0.8)]"
        >
          {isHomePage ? (
            ["Inicio", "Servicios", "Proceso", "FAQ"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-[#00F0FF] font-bold text-xs uppercase tracking-widest px-2 py-1 transition-colors"
              >
                {item}
              </a>
            ))
          ) : (
            <Link 
              to="/" 
              onClick={() => setIsOpen(false)}
              className="text-white/60 hover:text-[#00F0FF] font-bold text-xs uppercase tracking-widest px-2 py-1 transition-colors"
            >
              Volver al inicio
            </Link>
          )}

          <div className="h-[1px] w-full bg-white/5 my-1" />

          {user ? (
            <div className="flex flex-col gap-2">
              <Link
                to={role === "admin" ? "/admin" : "/dashboard"}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 py-3 bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] font-bold text-xs uppercase tracking-wider rounded-xl"
              >
                <User size={14} />
                Panel Control
              </Link>
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="flex items-center justify-center gap-2 py-3 bg-red-500/10 border border-red-500/20 text-red-400 font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer"
              >
                <LogOut size={14} />
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 py-3 bg-[#00F0FF]/15 border border-[#00F0FF] text-white font-black text-xs uppercase tracking-[0.15em] rounded-xl shadow-[0_0_15px_rgba(0,240,255,0.2)]"
            >
              Acceso Socios
            </Link>
          )}
        </motion.div>
      )}
    </nav>
  );
}

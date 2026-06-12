import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Lock, Mail, AlertTriangle, ArrowLeft, Loader2, Sparkles } from "lucide-react";

export default function Login() {
  const { login, role, user, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (!loading && user) {
      if (role === "admin") {
        navigate("/admin");
      } else if (role === "partner") {
        navigate("/dashboard");
      }
    }
  }, [user, role, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Por favor, rellene todos los campos.");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      await login(email, password);
      // La redirección ocurrirá en el useEffect al detectar el cambio de user/role
    } catch (err: any) {
      console.error(err);
      let errorMsg = "Ocurrió un error al iniciar sesión. Inténtalo de nuevo.";
      if (err.code === "auth/invalid-credential" || err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        errorMsg = "Credenciales incorrectas. Verifica tu email y contraseña.";
      } else if (err.code === "auth/too-many-requests") {
        errorMsg = "Demasiados intentos fallidos. Cuenta bloqueada temporalmente.";
      }
      setError(errorMsg);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 relative overflow-hidden">
      {/* Botón de retroceso */}
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 flex items-center gap-2 text-white/50 hover:text-[#00F0FF] transition-all text-xs font-bold uppercase tracking-wider cursor-pointer z-10"
      >
        <ArrowLeft size={16} />
        Volver a la web
      </motion.button>

      {/* Caja de login en Glassmorphism de Élite */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="relative w-full max-w-md bg-[#07070a]/75 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-10"
      >
        {/* Glows interiores */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#00F0FF]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#AD00FF]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Cabecera */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00F0FF]/20 to-[#AD00FF]/20 border border-white/10 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(0,240,255,0.25)]">
            <Sparkles className="w-8 h-8 text-[#00F0FF] animate-pulse" />
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tighter text-white">
            onvivo <span className="text-[#00F0FF]">B2B</span>
          </h1>
          <p className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em] mt-1">
            Panel de Socios & Distribuidores
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-200 text-xs"
            >
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Input de Email */}
          <div className="space-y-2">
            <label className="text-[10px] text-white/50 font-bold uppercase tracking-widest block pl-1">
              Email Corporativo
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="socio@tuempresa.com"
                className="w-full bg-[#050508]/80 border border-white/5 pl-12 pr-4 py-3.5 rounded-2xl text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#00F0FF] focus:shadow-[0_0_15px_rgba(0,240,255,0.15)] transition-all duration-300"
              />
            </div>
          </div>

          {/* Input de Contraseña */}
          <div className="space-y-2">
            <label className="text-[10px] text-white/50 font-bold uppercase tracking-widest block pl-1">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#050508]/80 border border-white/5 pl-12 pr-4 py-3.5 rounded-2xl text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#AD00FF] focus:shadow-[0_0_15px_rgba(173,0,255,0.15)] transition-all duration-300"
              />
            </div>
          </div>

          {/* Botón de Acceder */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-[#00F0FF] to-[#AD00FF] hover:shadow-[0_0_25px_rgba(0,240,255,0.35)] text-white text-xs font-black uppercase tracking-[0.2em] py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                Autenticando...
              </>
            ) : (
              "Iniciar Sesión"
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

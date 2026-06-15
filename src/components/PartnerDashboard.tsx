import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  Key, 
  PlusCircle, 
  History, 
  Terminal as TermIcon, 
  LogOut, 
  Send, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ChevronRight, 
  Copy, 
  Check, 
  HelpCircle,
  AlertTriangle,
  RefreshCw,
  Loader2
} from "lucide-react";

interface Account {
  id: string;
  client_name: string;
  client_email: string;
  status: "completed" | "pending" | "failed";
  created_at: any;
  error_log?: string;
  auth_key?: string;
}

interface LogMessage {
  text: string;
  type: "system" | "success" | "error" | "info";
  time: string;
}

export default function PartnerDashboard() {
  const { logout, getToken, user } = useAuth();
  const navigate = useNavigate();

  // Estados del Socio
  const [partnerStatus, setPartnerStatus] = useState<any>(null);
  const [loadingStatus, setLoadingStatus] = useState(true);

  // Estados del Formulario de Cliente
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPassword, setClientPassword] = useState("");
  const [addonsProfile, setAddonsProfile] = useState("estandar");
  const [interfaceLanguage, setInterfaceLanguage] = useState("Español");
  const [audioLanguage, setAudioLanguage] = useState("Español");
  const [subtitleLanguage, setSubtitleLanguage] = useState("Español");

  // Estado del Terminal de Logs
  const [isConsoleActive, setIsConsoleActive] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState<LogMessage[]>([]);
  const [activeAccountId, setActiveAccountId] = useState<string | null>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Estados del Historial de Cuentas
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loadingAccounts, setLoadingAccounts] = useState(true);

  // Estados del Modal de Recarga
  const [isRechargeOpen, setIsRechargeOpen] = useState(false);
  const [rechargeKeysCount, setRechargeKeysCount] = useState(10);
  const [paymentMethod, setPaymentMethod] = useState("bizum");
  const [rechargeResponse, setRechargeResponse] = useState<any>(null);
  const [isRecharging, setIsRecharging] = useState(false);

  // Utilidades generales
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

  // Cargar Perfil y Cuentas al iniciar
  useEffect(() => {
    fetchPartnerData();
    fetchAccountsHistory();
  }, []);

  // Auto-scroll en consola
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [consoleLogs]);

  // Polling para el proceso de creación en background
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (activeAccountId) {
      interval = setInterval(async () => {
        try {
          const token = await getToken();
          const res = await fetch(`${API_URL}/api/partner/accounts`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const data = await res.json();
          
          if (data.accounts) {
            const currentAcc = data.accounts.find((a: any) => a.id === activeAccountId);
            if (currentAcc) {
              if (currentAcc.status === "completed") {
                addLog("✅ Automatización de Stremio finalizada con éxito.", "success");
                addLog("📧 Correo con credenciales de acceso enviado al cliente.", "success");
                addLog("🎉 ¡Proceso finalizado con éxito! La llave ha sido consumida.", "success");
                setActiveAccountId(null);
                fetchPartnerData(); // Actualizar saldo
                fetchAccountsHistory();
              } else if (currentAcc.status === "failed") {
                addLog(`❌ El proceso falló: ${currentAcc.error_log || "Error desconocido en Playwright"}`, "error");
                addLog("♻️ La llave de activación ha sido reembolsada automáticamente a tu saldo.", "info");
                setActiveAccountId(null);
                fetchPartnerData(); // Actualizar saldo
                fetchAccountsHistory();
              }
            }
          }
        } catch (err) {
          console.error("Error al consultar estado de cuenta:", err);
        }
      }, 4000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeAccountId]);

  const fetchPartnerData = async () => {
    setLoadingStatus(true);
    try {
      const token = await getToken();
      const res = await fetch(`${API_URL}/api/partner/status`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setPartnerStatus(data);
      } else {
        console.error("Error al obtener status del socio");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingStatus(false);
    }
  };

  const fetchAccountsHistory = async () => {
    setLoadingAccounts(true);
    try {
      const token = await getToken();
      const res = await fetch(`${API_URL}/api/partner/accounts`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setAccounts(data.accounts || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAccounts(false);
    }
  };

  const addLog = (text: string, type: "system" | "success" | "error" | "info" = "system") => {
    const time = new Date().toLocaleTimeString();
    setConsoleLogs((prev) => [...prev, { text, type, time }]);
  };

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !clientPassword) return;

    if (partnerStatus && partnerStatus.keys_available < 1) {
      alert("No dispones de llaves de activación. Por favor, solicita una recarga.");
      return;
    }

    setIsConsoleActive(true);
    setConsoleLogs([]);
    addLog("🚀 Iniciando petición de creación de cuenta...", "info");
    addLog("🔒 Bloqueando 1 llave de activación de forma atómica...", "info");

    try {
      const token = await getToken();
      const res = await fetch(`${API_URL}/api/partner/create-account`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          clientName,
          clientEmail,
          clientPassword,
          addonsProfile,
          interfaceLanguage,
          audioLanguage,
          subtitleLanguage
        })
      });

      const data = await res.json();

      if (res.status === 202) {
        setActiveAccountId(data.accountId);
        addLog(`✅ Llave bloqueada. Account ID: ${data.accountId}`, "success");
        addLog("⚙️ Lanzando motor de automatización Playwright en background...", "system");
        
        // Simular fases de log detalladas en cliente para espectacularidad
        simulatePlaywrightLogs();
      } else {
        addLog(`❌ Error del servidor: ${data.error || "Error desconocido"}`, "error");
        addLog("♻️ Llave liberada.", "info");
      }
    } catch (err: any) {
      addLog(`💥 Error de red: ${err.message}`, "error");
    }
  };

  const simulatePlaywrightLogs = () => {
    const steps = [
      { msg: "Conectando a los servidores de Stremio...", delay: 2000 },
      { msg: "Abriendo navegador Chromium en modo sin cabeza (headless)...", delay: 4500 },
      { msg: "Navegando a https://www.stremio.com/register...", delay: 7000 },
      { msg: "Aceptando política de cookies del sitio web...", delay: 9000 },
      { msg: "Rellenando formulario de registro con credenciales del cliente...", delay: 11000 },
      { msg: "Enviando formulario de registro y aceptando términos...", delay: 13500 },
      { msg: "Esperando redirección al panel de Stremio (dashboard)...", delay: 16500 },
      { msg: "Cuenta creada con éxito. Extrayendo cookie de sesión 'authKey'...", delay: 19000 },
      { msg: "Descargando manifiestos del pack estándar de addons (7 addons)...", delay: 22000 },
      { msg: "Inyectando addons a través de la API oficial de Stremio...", delay: 25000 },
      { msg: "Confirmando instalación del catálogo unificado 1080p...", delay: 27000 },
      { msg: "Esperando respuesta final del backend...", delay: 30000 }
    ];

    steps.forEach((step) => {
      setTimeout(() => {
        // Solo seguir imprimiendo si el proceso sigue activo en background
        setConsoleLogs((prev) => {
          // Si el último mensaje es de éxito o error final de polling, detenemos la simulación
          const hasFinished = prev.some(l => l.text.includes("finalizada con éxito") || l.text.includes("El proceso falló"));
          if (!hasFinished) {
            const time = new Date().toLocaleTimeString();
            return [...prev, { text: `[PLAYWRIGHT] ${step.msg}`, type: "system", time }];
          }
          return prev;
        });
      }, step.delay);
    });
  };

  const handleRequestKeys = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRecharging(true);
    setRechargeResponse(null);

    try {
      const token = await getToken();
      const res = await fetch(`${API_URL}/api/partner/request-keys`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          keysRequested: rechargeKeysCount,
          paymentMethod
        })
      });

      const data = await res.json();
      if (res.ok) {
        setRechargeResponse(data);
        fetchPartnerData(); // Actualizar datos
      } else {
        alert(data.error || "Ocurrió un error al crear la solicitud");
      }
    } catch (err) {
      console.error(err);
      alert("Error al conectar con la API de recargas");
    } finally {
      setIsRecharging(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const cost = partnerStatus?.cost_per_key || 5.00;
  const totalCost = (rechargeKeysCount * cost).toFixed(2);

  return (
    <div className="min-h-screen w-full text-white pb-12 pt-20 px-4 md:px-8 relative">
      
      {/* 🔮 HEADER */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6 mb-8">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight">
            Panel del <span className="text-[#00F0FF]">Socio</span>
          </h1>
          <p className="text-xs text-white/50">
            Bienvenido, {partnerStatus?.name || user?.displayName || user?.email} • Estado: 
            <span className={`ml-1 px-2 py-0.5 rounded text-[10px] font-bold ${partnerStatus?.status === "active" ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>
              {partnerStatus?.status === "active" ? "ACTIVO" : "INACTIVO"}
            </span>
          </p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={fetchPartnerData}
            className="p-3 bg-[#07070a] border border-white/5 hover:border-white/10 hover:text-[#00F0FF] rounded-2xl transition-all cursor-pointer"
            title="Refrescar saldo"
          >
            <RefreshCw size={18} />
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/30 text-red-300 text-xs font-bold uppercase tracking-wider rounded-2xl transition-all cursor-pointer"
          >
            <LogOut size={16} />
            Cerrar Sesión
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* ================= SECCIÓN IZQUIERDA: MÉTRICAS Y ACCIONES ================= */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* Card de Balance de Llaves */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#07070a]/75 backdrop-blur-xl border border-white/10 p-6 rounded-3xl relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00F0FF]/5 rounded-full blur-2xl pointer-events-none" />
            <h2 className="text-xs font-black uppercase tracking-widest text-white/40 mb-4 flex items-center gap-2">
              <Key size={14} className="text-[#00F0FF]" />
              Balance de Llaves
            </h2>
            
            {loadingStatus ? (
              <div className="py-6 flex items-center justify-center">
                <RefreshCw size={24} className="animate-spin text-white/30" />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#050508]/80 border border-white/5 p-4 rounded-2xl">
                  <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider block">Disponibles</span>
                  <span className="text-3xl font-black text-[#00F0FF] tracking-tight">{partnerStatus?.keys_available ?? 0}</span>
                </div>
                <div className="bg-[#050508]/80 border border-white/5 p-4 rounded-2xl">
                  <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider block">Consumidas</span>
                  <span className="text-3xl font-black text-white/80 tracking-tight">{partnerStatus?.keys_used ?? 0}</span>
                </div>
              </div>
            )}

            <button
              onClick={() => {
                setRechargeResponse(null);
                setIsRechargeOpen(true);
              }}
              className="w-full mt-4 bg-[#00F0FF]/10 hover:bg-[#00F0FF]/20 border border-[#00F0FF]/20 hover:border-[#00F0FF]/30 text-[#00F0FF] text-[11px] font-bold uppercase tracking-wider py-3.5 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <PlusCircle size={14} />
              Solicitar Recarga de Llaves
            </button>
          </motion.div>

          {/* Formulario de Creación de Cuentas */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#07070a]/75 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl relative"
          >
            <h2 className="text-xs font-black uppercase tracking-widest text-white/40 mb-5 flex items-center gap-2">
              <PlusCircle size={14} className="text-[#AD00FF]" />
              Registrar Nuevo Cliente Stremio
            </h2>

            <form onSubmit={handleCreateAccount} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] text-white/50 font-bold uppercase tracking-wider pl-1">Nombre del Cliente</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Juan Pérez"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  disabled={activeAccountId !== null}
                  className="w-full bg-[#050508]/80 border border-white/5 pl-4 pr-4 py-3 rounded-xl text-white placeholder-white/20 text-xs focus:outline-none focus:border-[#AD00FF] transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-white/50 font-bold uppercase tracking-wider pl-1">Email del Cliente</label>
                <input
                  type="email"
                  required
                  placeholder="cliente@email.com"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  disabled={activeAccountId !== null}
                  className="w-full bg-[#050508]/80 border border-white/5 pl-4 pr-4 py-3 rounded-xl text-white placeholder-white/20 text-xs focus:outline-none focus:border-[#AD00FF] transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-white/50 font-bold uppercase tracking-wider pl-1">Contraseña Stremio</label>
                <input
                  type="text"
                  required
                  placeholder="Contraseña autogenerada o manual"
                  value={clientPassword}
                  onChange={(e) => setClientPassword(e.target.value)}
                  disabled={activeAccountId !== null}
                  className="w-full bg-[#050508]/80 border border-white/5 pl-4 pr-4 py-3 rounded-xl text-white placeholder-white/20 text-xs focus:outline-none focus:border-[#AD00FF] transition-all"
                />
                <button
                  type="button"
                  onClick={() => {
                    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#";
                    let autoPass = "";
                    for (let i = 0; i < 10; i++) {
                      autoPass += chars.charAt(Math.floor(Math.random() * chars.length));
                    }
                    setClientPassword(autoPass);
                  }}
                  disabled={activeAccountId !== null}
                  className="text-[9px] text-[#00F0FF] font-bold hover:underline block pt-1 pl-1 cursor-pointer"
                >
                  ⚡ Autogenerar contraseña segura
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-white/50 font-bold uppercase tracking-wider pl-1">Idioma de Interfaz</label>
                  <select
                    value={interfaceLanguage}
                    onChange={(e) => setInterfaceLanguage(e.target.value)}
                    disabled={activeAccountId !== null}
                    className="w-full bg-[#050508]/80 border border-white/5 px-4 py-3 rounded-xl text-white text-xs focus:outline-none focus:border-[#AD00FF] transition-all cursor-pointer"
                  >
                    <option value="Español">Español</option>
                    <option value="Inglés">Inglés</option>
                    <option value="Francés">Francés</option>
                    <option value="Italiano">Italiano</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-white/50 font-bold uppercase tracking-wider pl-1">Idioma de Audio</label>
                  <select
                    value={audioLanguage}
                    onChange={(e) => setAudioLanguage(e.target.value)}
                    disabled={activeAccountId !== null}
                    className="w-full bg-[#050508]/80 border border-white/5 px-4 py-3 rounded-xl text-white text-xs focus:outline-none focus:border-[#AD00FF] transition-all cursor-pointer"
                  >
                    <option value="Español">Español</option>
                    <option value="Inglés">Inglés</option>
                    <option value="Francés">Francés</option>
                    <option value="Italiano">Italiano</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-white/50 font-bold uppercase tracking-wider pl-1">Idioma de Subtítulos</label>
                  <select
                    value={subtitleLanguage}
                    onChange={(e) => setSubtitleLanguage(e.target.value)}
                    disabled={activeAccountId !== null}
                    className="w-full bg-[#050508]/80 border border-white/5 px-4 py-3 rounded-xl text-white text-xs focus:outline-none focus:border-[#AD00FF] transition-all cursor-pointer"
                  >
                    <option value="Español">Español</option>
                    <option value="Inglés">Inglés</option>
                    <option value="Francés">Francés</option>
                    <option value="Italiano">Italiano</option>
                  </select>
                </div>

                <div className="bg-[#050508]/40 border border-dashed border-white/10 p-3 rounded-xl flex items-center justify-between text-xs text-white/60">
                  <span className="font-bold uppercase text-[9px] tracking-wider text-white/40">Calidad de Video</span>
                  <span className="text-[#00F0FF] font-black uppercase text-[10px] tracking-widest bg-[#00F0FF]/10 px-2 py-0.5 rounded border border-[#00F0FF]/20">
                    1080p FULL HD
                  </span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={activeAccountId !== null || (partnerStatus && partnerStatus.keys_available < 1)}
                className="w-full bg-gradient-to-r from-[#00F0FF] to-[#AD00FF] hover:shadow-[0_0_20px_rgba(0,240,255,0.25)] text-white text-[11px] font-black uppercase tracking-[0.15em] py-3.5 rounded-2xl transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
              >
                <Send size={14} />
                Crear Cuenta & Consumir Llave
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* ================= SECCIÓN DERECHA: CONSOLA Y HISTORIAL ================= */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Consola Terminal de Playwright */}
          {isConsoleActive && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#020204] border border-cyan-500/30 rounded-3xl overflow-hidden shadow-2xl relative"
            >
              {/* Barra superior de terminal */}
              <div className="bg-[#0a0a0f] border-b border-white/5 px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TermIcon className="w-4 h-4 text-cyan-400" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/60 font-mono">
                    Terminal de Automatización Playwright
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  {activeAccountId ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                      <span className="text-[9px] font-bold font-mono text-cyan-400 uppercase tracking-wider">PROCESANDO</span>
                    </>
                  ) : (
                    <span className="text-[9px] font-bold font-mono text-white/30 uppercase tracking-wider">IDLE</span>
                  )}
                  <button 
                    onClick={() => setIsConsoleActive(false)}
                    disabled={activeAccountId !== null}
                    className="text-white/40 hover:text-white ml-2 text-xs font-bold disabled:opacity-30 cursor-pointer"
                  >
                    Cerrar
                  </button>
                </div>
              </div>

              {/* Logs */}
              <div className="p-6 h-64 overflow-y-auto font-mono text-xs space-y-1.5 scrollbar-thin scrollbar-thumb-cyan-500">
                {consoleLogs.map((log, i) => (
                  <div 
                    key={i} 
                    className={`flex items-start gap-2 leading-relaxed ${
                      log.type === "success" ? "text-emerald-400" :
                      log.type === "error" ? "text-red-400 font-bold" :
                      log.type === "info" ? "text-cyan-400" : "text-white/70"
                    }`}
                  >
                    <span className="text-white/20 select-none shrink-0">[{log.time}]</span>
                    <span>{log.text}</span>
                  </div>
                ))}
                <div ref={terminalEndRef} />
              </div>
            </motion.div>
          )}

          {/* Tabla de Historial de Cuentas */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#07070a]/75 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl relative"
          >
            <h2 className="text-xs font-black uppercase tracking-widest text-white/40 mb-5 flex items-center gap-2">
              <History size={14} className="text-[#FF007A]" />
              Historial de Cuentas Creadas
            </h2>

            {loadingAccounts ? (
              <div className="py-12 flex items-center justify-center">
                <RefreshCw size={24} className="animate-spin text-white/30" />
              </div>
            ) : accounts.length === 0 ? (
              <div className="py-12 text-center border border-dashed border-white/5 rounded-2xl bg-[#050508]/40">
                <p className="text-xs text-white/40 font-bold uppercase tracking-wider">No se han registrado cuentas aún.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 text-[10px] font-black uppercase tracking-wider text-white/40">
                      <th className="pb-3 pl-2">Cliente</th>
                      <th className="pb-3">Email Stremio</th>
                      <th className="pb-3 text-center">Estado</th>
                      <th className="pb-3 text-right pr-2">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-xs">
                    {accounts.map((acc) => (
                      <tr key={acc.id} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="py-4 pl-2 font-bold text-white/90">{acc.client_name}</td>
                        <td className="py-4 font-mono text-white/70">{acc.client_email}</td>
                        <td className="py-4 text-center">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            acc.status === "completed" ? "bg-emerald-500/10 text-emerald-400" :
                            acc.status === "failed" ? "bg-red-500/10 text-red-400" : "bg-amber-500/10 text-amber-400"
                          }`}>
                            {acc.status === "completed" && <CheckCircle2 size={10} />}
                            {acc.status === "failed" && <XCircle size={10} />}
                            {acc.status === "pending" && <Clock size={10} className="animate-spin" />}
                            {acc.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-4 text-right pr-2">
                          <div className="flex items-center justify-end gap-2">
                            {acc.status === "completed" && acc.auth_key && (
                              <button
                                onClick={() => handleCopy(acc.auth_key || "", acc.id)}
                                className="p-2 bg-white/5 hover:bg-[#00F0FF]/15 border border-white/5 hover:border-[#00F0FF]/20 hover:text-[#00F0FF] rounded-xl transition-all cursor-pointer"
                                title="Copiar AuthKey de Stremio"
                              >
                                {copiedId === acc.id ? <Check size={12} /> : <Copy size={12} />}
                              </button>
                            )}
                            {acc.status === "failed" && acc.error_log && (
                              <button
                                onClick={() => alert(`Log de error de automatización:\n${acc.error_log}`)}
                                className="p-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 rounded-xl transition-all cursor-pointer"
                                title="Ver detalle de error"
                              >
                                <HelpCircle size={12} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        </div>
      </main>

      {/* ================= MODAL DE SOLICITUD DE RECARGA ================= */}
      <AnimatePresence>
        {isRechargeOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-[#07070a] border border-white/10 w-full max-w-lg p-6 rounded-3xl shadow-2xl relative"
            >
              <h2 className="text-lg font-black uppercase tracking-tight mb-2">Solicitar Recarga de Llaves</h2>
              <p className="text-xs text-white/50 mb-6">
                Genera una solicitud para adquirir llaves adicionales de activación. Las solicitudes se confirman tras verificar el pago.
              </p>

              {!rechargeResponse ? (
                <form onSubmit={handleRequestKeys} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] text-white/50 font-bold uppercase tracking-wider">Cantidad de Llaves</label>
                      <input
                        type="number"
                        min="1"
                        required
                        value={rechargeKeysCount}
                        onChange={(e) => setRechargeKeysCount(parseInt(e.target.value) || 1)}
                        className="w-full bg-[#050508]/80 border border-white/5 px-4 py-3 rounded-xl text-white font-bold text-sm focus:outline-none focus:border-[#00F0FF] transition-all"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-white/50 font-bold uppercase tracking-wider">Importe Total</label>
                      <div className="w-full bg-[#050508]/80 border border-white/5 px-4 py-3 rounded-xl text-white font-bold text-sm flex items-center">
                        <span className="text-[#00F0FF]">{totalCost}€</span>
                        <span className="text-[10px] text-white/30 font-medium ml-2">({cost.toFixed(2)}€/llave)</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-white/50 font-bold uppercase tracking-wider">Método de Pago Preferido</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("bizum")}
                        className={`py-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          paymentMethod === "bizum" 
                            ? "bg-[#00F0FF]/10 border-[#00F0FF] text-[#00F0FF]" 
                            : "bg-[#050508] border-white/5 hover:border-white/10 text-white/60"
                        }`}
                      >
                        Bizum
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("iban")}
                        className={`py-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          paymentMethod === "iban" 
                            ? "bg-[#00F0FF]/10 border-[#00F0FF] text-[#00F0FF]" 
                            : "bg-[#050508] border-white/5 hover:border-white/10 text-white/60"
                        }`}
                      >
                        Transferencia IBAN
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-white/5">
                    <button
                      type="button"
                      onClick={() => setIsRechargeOpen(false)}
                      className="flex-1 py-3.5 bg-white/5 border border-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider rounded-2xl transition-all cursor-pointer"
                    >
                      Cerrar
                    </button>
                    <button
                      type="submit"
                      disabled={isRecharging}
                      className="flex-1 py-3.5 bg-gradient-to-r from-[#00F0FF] to-[#AD00FF] text-white text-xs font-black uppercase tracking-[0.15em] rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isRecharging ? (
                        <>
                          <Loader2 size={14} className="animate-spin text-white" />
                          Procesando...
                        </>
                      ) : (
                        "Crear Solicitud"
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  {/* Solicitud creada con éxito */}
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                    <div>
                      <h4 className="text-xs font-black text-white uppercase tracking-wider">Solicitud Registrada</h4>
                      <p className="text-[10px] text-white/60">ID Solicitud: <span className="font-mono font-bold text-white">{rechargeResponse.reqId}</span></p>
                    </div>
                  </div>

                  {/* Instrucciones de Pago */}
                  <div className="bg-[#050508] border border-white/5 p-5 rounded-2xl space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-wider text-white/50">Instrucciones de Transferencia</h4>
                    
                    {paymentMethod === "bizum" ? (
                      <div className="space-y-2">
                        <p className="text-xs text-white/70">Realiza un envío de Bizum con los siguientes datos:</p>
                        <div className="space-y-1 text-xs">
                          <div>Teléfono: <span className="font-bold text-[#00F0FF]">{rechargeResponse.paymentInfo?.bizum}</span></div>
                          <div>Importe: <span className="font-bold text-white">{rechargeResponse.amount}€</span></div>
                          <div>Concepto: <span className="font-bold text-white font-mono">{rechargeResponse.reqId}</span></div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <p className="text-xs text-white/70">Realiza una transferencia bancaria con los siguientes datos:</p>
                        <div className="space-y-1 text-xs">
                          <div>IBAN: <span className="font-bold text-[#00F0FF] font-mono">{rechargeResponse.paymentInfo?.iban}</span></div>
                          <div>Importe: <span className="font-bold text-white">{rechargeResponse.amount}€</span></div>
                          <div>Concepto: <span className="font-bold text-white font-mono">{rechargeResponse.reqId}</span></div>
                        </div>
                      </div>
                    )}
                    
                    <div className="text-[10px] text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 p-3.5 rounded-xl flex items-start gap-2">
                      <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                      <span>Es imprescindible indicar exactamente el <strong>ID de Solicitud</strong> en el concepto del pago para su aprobación inmediata.</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsRechargeOpen(false)}
                    className="w-full py-3.5 bg-white/5 border border-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider rounded-2xl transition-all cursor-pointer"
                  >
                    Entendido & Cerrar
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
    </div>
  );
}

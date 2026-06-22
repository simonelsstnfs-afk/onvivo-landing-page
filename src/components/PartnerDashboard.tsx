import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { findLanguage } from "../utils/languages";
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
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface Account {
  id: string;
  client_name: string;
  client_email: string;
  status: "completed" | "pending" | "failed";
  created_at: any;
  error_log?: string;
  auth_key?: string;
}

interface FinanceMetric {
  month: string;
  accountsSold: number;
  revenue: number;
  cost: number;
  profit: number;
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
  const [addonLanguages, setAddonLanguages] = useState("Español");
  const [addonLanguagesError, setAddonLanguagesError] = useState("");
  const [salePrice, setSalePrice] = useState("");

  // Contraseña de la última cuenta creada — se conserva post-éxito para que el socio la tenga a mano
  const [lastCreatedPassword, setLastCreatedPassword] = useState<string | null>(null);

  // Estado del Terminal de Logs
  const [isConsoleActive, setIsConsoleActive] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState<LogMessage[]>([]);
  const [activeAccountId, setActiveAccountId] = useState<string | null>(null);
  const [processResult, setProcessResult] = useState<'success' | 'failed' | null>(null); // UX-05
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const consoleContainerRef = useRef<HTMLDivElement>(null);
  // BUG-01: ref para capturar clientPassword sin stale closure en el polling
  const clientPasswordRef = useRef<string>("");
  // BUG-03: contador de intentos de polling para timeout máximo
  const pollingAttemptsRef = useRef<number>(0);

  // Estados del Historial de Cuentas
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loadingAccounts, setLoadingAccounts] = useState(true);

  // Estados Financieros
  const [financeMetrics, setFinanceMetrics] = useState<FinanceMetric[]>([]);
  const [loadingFinance, setLoadingFinance] = useState(true);

  // Estados del Modal de Recarga
  const [isRechargeOpen, setIsRechargeOpen] = useState(false);
  const [rechargeKeysCount, setRechargeKeysCount] = useState(10);
  const [paymentMethod, setPaymentMethod] = useState("bizum");
  const [rechargeResponse, setRechargeResponse] = useState<any>(null);
  const [isRecharging, setIsRecharging] = useState(false);

  // Utilidades generales
  const [copiedId, setCopiedId] = useState<string | null>(null);
  // UX-01: estado de carga durante el submit inicial
  const [isSubmitting, setIsSubmitting] = useState(false);
  // BUG-05: error inline en modal de recarga (reemplaza alert)
  const [rechargeError, setRechargeError] = useState<string | null>(null);
  // BUG-06: error log expandido en historial (reemplaza alert)
  const [selectedErrorLog, setSelectedErrorLog] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

  // Cargar Perfil y Cuentas al iniciar
  useEffect(() => {
    fetchPartnerData();
    fetchAccountsHistory();
    fetchFinanceMetrics();
  }, []);

  // Auto-scroll en consola
  useEffect(() => {
    // Si la consola está activa, scrolleamos hasta el final para ver lo nuevo
    if (isConsoleActive && terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [consoleLogs, isConsoleActive]);

  // --- Helpers ---
  const now = new Date();
  const currentMonthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const currentMonthMetrics = financeMetrics.find(f => f.month === currentMonthKey) || {
    accountsSold: 0,
    revenue: 0,
    cost: 0,
    profit: 0
  };
  
  // Datos para el gráfico cronológico (del más antiguo al más reciente)
  const chartData = [...financeMetrics].sort((a, b) => a.month.localeCompare(b.month));

  // BUG-01: mantener clientPasswordRef sincronizado con el estado
  useEffect(() => {
    clientPasswordRef.current = clientPassword;
  }, [clientPassword]);

  // Validación de idiomas de Addons (múltiples separados por coma)
  useEffect(() => {
    if (!addonLanguages.trim()) {
      setAddonLanguagesError("Introduce al menos un idioma");
      return;
    }
    const langs = addonLanguages.split(',').map(l => l.trim()).filter(l => l);
    const invalidLangs = langs.filter(l => !findLanguage(l));
    
    if (invalidLangs.length > 0) {
      setAddonLanguagesError(`Idioma no soportado: ${invalidLangs.join(', ')}`);
    } else {
      setAddonLanguagesError("");
    }
  }, [addonLanguages]);

  // Resetear formulario de cliente tras una creación. Preserva la contraseña si keepPassword=true.
  const resetClientForm = (keepPassword = false) => {
    setClientName("");
    setClientEmail("");
    if (!keepPassword) setClientPassword("");
    setAddonsProfile("estandar");
    setAddonLanguages("Español");
    setAddonLanguagesError("");
    setSalePrice("");
  };

  // Polling para el proceso de creación en background
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (activeAccountId) {
      pollingAttemptsRef.current = 0; // BUG-03: reset contador

      interval = setInterval(async () => {
        pollingAttemptsRef.current += 1;

        // BUG-03: timeout máximo de 75 intentos (~5 minutos)
        if (pollingAttemptsRef.current > 75) {
          clearInterval(interval);
          addLog("⏰ Tiempo de espera agotado. El proceso sigue corriendo en el servidor. Recarga la página para ver el resultado.", "error");
          setActiveAccountId(null);
          setProcessResult('failed'); // UX-05
          return;
        }

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
                setProcessResult('success'); // UX-05
                // BUG-01: usar ref en lugar del estado clientPassword (evita stale closure)
                setLastCreatedPassword(clientPasswordRef.current);
                resetClientForm(false);
                fetchPartnerData();
                fetchAccountsHistory();
              } else if (currentAcc.status === "failed") {
                addLog(`❌ El proceso falló: ${currentAcc.error_log || "Error desconocido en Playwright"}`, "error");
                addLog("♻️ La llave de activación ha sido reembolsada automáticamente a tu saldo.", "info");
                setActiveAccountId(null);
                setProcessResult('failed'); // UX-05
                resetClientForm(false);
                fetchPartnerData();
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

  const fetchFinanceMetrics = async () => {
    setLoadingFinance(true);
    try {
      const token = await getToken();
      const res = await fetch(`${API_URL}/api/partner/finance`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setFinanceMetrics(data.finance || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingFinance(false);
    }
  };

  const addLog = (text: string, type: "system" | "success" | "error" | "info" = "system") => {
    const time = new Date().toLocaleTimeString();
    setConsoleLogs((prev) => [...prev, { text, type, time }]);
  };

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !clientPassword) return;

    if (addonLanguagesError) {
      alert("Por favor, corrige los errores de idioma antes de continuar.");
      return;
    }

    if (!salePrice || parseFloat(salePrice) < 20) {
      alert("El precio de venta debe ser igual o superior a 20€.");
      return;
    }

    if (partnerStatus && partnerStatus.keys_available < 1) {
      alert("No dispones de llaves de activación. Por favor, solicita una recarga.");
      return;
    }

    setIsSubmitting(true); // UX-01
    setProcessResult(null); // UX-05: resetear color de consola
    setIsConsoleActive(true);
    setConsoleLogs([]);
    addLog("🚀 Iniciando petición de creación de cuenta...", "info");
    addLog("🔒 Bloqueando 1 llave de activación de forma atómica...", "info");

    // Resolver los nombres de idiomas finales separados por comas
    const finalAddonLanguages = addonLanguages
      .split(',')
      .map(l => l.trim())
      .filter(l => l)
      .map(l => findLanguage(l)?.name || l)
      .join(', ');

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
          addonLanguages: finalAddonLanguages,
          salePrice
        })
      });

      const data = await res.json();

      if (res.status === 202) {
        setActiveAccountId(data.accountId);
        addLog(`✅ Llave bloqueada. Account ID: ${data.accountId}`, "success");
        addLog("⚙️ Lanzando motor de automatización Playwright en background...", "system");
        fetchPartnerData();
        simulatePlaywrightLogs();
      } else {
        addLog(`❌ Error del servidor: ${data.error || "Error desconocido"}`, "error");
        addLog("♻️ Llave liberada.", "info");
        setProcessResult('failed'); // UX-05
      }
    } catch (err: any) {
      addLog(`💥 Error de red: ${err.message}`, "error");
      setProcessResult('failed'); // UX-05
    } finally {
      setIsSubmitting(false); // UX-01
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
      { msg: "Descargando manifiestos del pack estándar de addons (9 addons)...", delay: 22000 },
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
    setRechargeError(null); // BUG-05: limpiar error anterior

    try {
      const token = await getToken();
      const res = await fetch(`${API_URL}/api/partner/request-keys`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          keysRequested: Math.max(1, rechargeKeysCount), // BUG-04
          paymentMethod
        })
      });

      const data = await res.json();
      if (res.ok) {
        setRechargeResponse(data);
        fetchPartnerData();
      } else {
        // BUG-05: reemplaza alert() por estado inline
        setRechargeError(data.error || "Ocurrió un error al crear la solicitud");
      }
    } catch (err) {
      console.error(err);
      // BUG-05: reemplaza alert() por estado inline
      setRechargeError("Error al conectar con la API de recargas. Comprueba tu conexión.");
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

          {/* Card de Beneficio Mes Actual */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-[#07070a]/75 backdrop-blur-xl border border-[#AD00FF]/20 p-6 rounded-3xl relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#AD00FF]/5 rounded-full blur-2xl pointer-events-none" />
            <h2 className="text-xs font-black uppercase tracking-widest text-white/40 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#AD00FF]" />
              Beneficio Mes Actual
            </h2>
            
            {loadingFinance ? (
              <div className="py-2 flex items-center justify-center">
                <RefreshCw size={20} className="animate-spin text-white/30" />
              </div>
            ) : (
              <div className="flex items-end justify-between">
                <div>
                  <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider block mb-1">Beneficio Neto</span>
                  <span className="text-4xl font-black text-[#AD00FF] tracking-tight">{currentMonthMetrics.profit.toFixed(2)}€</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider block mb-1">Ingresos brutos</span>
                  <span className="text-sm font-bold text-emerald-400">{currentMonthMetrics.revenue.toFixed(2)}€</span>
                </div>
              </div>
            )}
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

            {/* Banner de contraseña post-éxito */}
            {lastCreatedPassword && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mb-5 p-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 backdrop-blur-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] font-black uppercase tracking-widest text-emerald-400 mb-1.5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                      ✅ Cuenta creada — Contraseña del cliente
                    </p>
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-mono text-white tracking-wide bg-black/30 px-3 py-1.5 rounded-lg border border-white/10 flex-1 overflow-x-auto whitespace-nowrap">
                        {lastCreatedPassword}
                      </code>
                      <button
                        type="button"
                        onClick={() => handleCopy(lastCreatedPassword, "last-pass")}
                        className="shrink-0 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase bg-emerald-500/20 border border-emerald-500/30 hover:bg-emerald-500/30 text-emerald-300 transition-all cursor-pointer"
                      >
                        {copiedId === "last-pass" ? "✓ Copiada" : "Copiar"}
                      </button>
                    </div>
                    <p className="text-[9px] text-white/30 mt-1.5">El formulario ha sido limpiado y está listo para el siguiente cliente.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setLastCreatedPassword(null)}
                    className="shrink-0 text-white/20 hover:text-white/60 transition-colors cursor-pointer text-lg leading-none mt-0.5"
                    title="Descartar"
                  >
                    ×
                  </button>
                </div>
              </motion.div>
            )}

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
                    // BUG-02: generador criptográficamente seguro
                    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#";
                    const array = new Uint8Array(12);
                    crypto.getRandomValues(array);
                    const autoPass = Array.from(array)
                      .map(b => chars[b % chars.length])
                      .join("");
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
                  <label className="text-[10px] text-white/50 font-bold uppercase tracking-wider pl-1">Idiomas de Contenido (Addons)</label>
                  <p className="text-[9px] text-white/40 pl-1 mb-1">Puedes escribir varios idiomas separados por comas (Ej: Español, Inglés, Alemán)</p>
                  <input
                    type="text"
                    placeholder="Español, Inglés..."
                    value={addonLanguages}
                    onChange={(e) => setAddonLanguages(e.target.value)}
                    disabled={activeAccountId !== null}
                    className={`w-full bg-[#050508]/80 border ${addonLanguagesError ? 'border-red-500/50' : 'border-white/5'} pl-4 pr-4 py-3 rounded-xl text-white placeholder-white/20 text-xs focus:outline-none focus:border-[#AD00FF] transition-all`}
                  />
                  {addonLanguagesError ? (
                    <span className="text-[9px] text-red-400 font-bold block pl-1 mt-1">⚠️ {addonLanguagesError}</span>
                  ) : (
                    addonLanguages.trim() && (
                      <span className="text-[9px] text-emerald-400 font-bold block pl-1 mt-1">
                        ✓ Detectados: {addonLanguages.split(',').map(l => l.trim()).filter(l => l && findLanguage(l)).map(l => findLanguage(l)?.name).join(', ')}
                      </span>
                    )
                  )}
                </div>

                <div className="bg-[#050508]/40 border border-dashed border-white/10 p-3 rounded-xl flex items-center justify-between text-xs text-white/60">
                  <span className="font-bold uppercase text-[9px] tracking-wider text-white/40">Calidad de Video</span>
                  <span className="text-[#00F0FF] font-black uppercase text-[10px] tracking-widest bg-[#00F0FF]/10 px-2 py-0.5 rounded border border-[#00F0FF]/20">
                    1080p FULL HD
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-white/50 font-bold uppercase tracking-wider pl-1">Precio de Venta (€)</label>
                <input
                  type="number"
                  required
                  min="20"
                  step="0.01"
                  placeholder="Ej: 20"
                  value={salePrice}
                  onChange={(e) => setSalePrice(e.target.value)}
                  disabled={activeAccountId !== null}
                  className="w-full bg-[#050508]/80 border border-white/5 pl-4 pr-4 py-3 rounded-xl text-[#00F0FF] font-bold text-xs focus:outline-none focus:border-[#AD00FF] transition-all"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={isSubmitting || activeAccountId !== null || (partnerStatus && partnerStatus.keys_available < 1) || !!addonLanguagesError}
                className="w-full bg-gradient-to-r from-[#00F0FF] to-[#AD00FF] hover:shadow-[0_0_20px_rgba(0,240,255,0.25)] text-white text-[11px] font-black uppercase tracking-[0.15em] py-3.5 rounded-2xl transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Procesando...
                  </>
                ) : (
                  <>
                    <Send size={14} />
                    Crear Cuenta &amp; Consumir Llave
                  </>
                )}
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
              className={`backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl relative border ${
                processResult === 'success'
                  ? 'bg-emerald-950/30 border-emerald-500/40'
                  : processResult === 'failed'
                  ? 'bg-red-950/30 border-red-500/40'
                  : 'bg-[#020204] border-cyan-500/30'
              }`}
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
              <div 
                ref={consoleContainerRef}
                className="p-6 h-64 overflow-y-auto font-mono text-xs space-y-1.5 scrollbar-thin scrollbar-thumb-cyan-500"
              >
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

            {/* BUG-06: Error log inline expandido */}
            {selectedErrorLog && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-300">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold uppercase tracking-wider text-[10px] text-red-400">Log de error de automatización</span>
                  <button onClick={() => setSelectedErrorLog(null)} className="text-white/30 hover:text-white/60 cursor-pointer">×</button>
                </div>
                <pre className="font-mono whitespace-pre-wrap break-all text-[10px] text-red-300/80">{selectedErrorLog}</pre>
              </div>
            )}
            {loadingAccounts ? (
              <div className="py-12 flex items-center justify-center">
                <RefreshCw size={24} className="animate-spin text-white/30" />
              </div>
            ) : accounts.filter(a => a.status !== 'failed').length === 0 ? (
              <div className="py-12 text-center border border-dashed border-white/5 rounded-2xl bg-[#050508]/40">
                <p className="text-xs text-white/40 font-bold uppercase tracking-wider">No se han registrado cuentas aún.</p>
              </div>
            ) : (
              <div className="overflow-x-auto overflow-y-auto max-h-[400px] styled-scrollbar">
                <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 bg-[#07070a] z-10 shadow-sm">
                    <tr className="border-b border-white/5 text-[10px] font-black uppercase tracking-wider text-white/40">
                      <th className="py-3 pl-2">Cliente</th>
                      <th className="py-3">Email Stremio</th>
                      <th className="py-3">Fecha</th>
                      <th className="py-3 text-center">Estado</th>
                      <th className="py-3 text-right pr-2">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-xs">
                    {(() => {
                      // Agrupar por mes
                      const grouped = accounts.filter(a => a.status !== 'failed').reduce((groups, acc) => {
                        const date = acc.created_at?.toDate ? acc.created_at.toDate() : new Date();
                        const mKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
                        if (!groups[mKey]) groups[mKey] = [];
                        groups[mKey].push(acc);
                        return groups;
                      }, {} as Record<string, Account[]>);
                      
                      const mNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
                      const sortedKeys = Object.keys(grouped).sort((a, b) => b.localeCompare(a));
                      
                      return sortedKeys.map(monthKey => {
                        const [yyyy, mm] = monthKey.split('-');
                        const mName = mNames[parseInt(mm) - 1];
                        return (
                          <React.Fragment key={monthKey}>
                            <tr className="bg-[#050508]/80">
                              <td colSpan={5} className="py-2 pl-2 text-[9px] font-black uppercase tracking-widest text-[#00F0FF]/70">
                                {mName} {yyyy}
                              </td>
                            </tr>
                            {grouped[monthKey].map(acc => (
                              <tr key={acc.id} className="hover:bg-white/[0.02] transition-colors group">
                                <td className="py-4 pl-2 font-bold text-white/90">{acc.client_name}</td>
                                <td className="py-4 font-mono text-white/70">{acc.client_email}</td>
                                <td className="py-4 text-white/40 text-[10px]">
                                  {acc.created_at?.toDate ? acc.created_at.toDate().toLocaleDateString('es-ES', { day:'2-digit', month:'short', year:'2-digit' }) : '—'}
                                </td>
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
                                        title={`AuthKey: ...${acc.auth_key.slice(-8)}`}
                                      >
                                        {copiedId === acc.id ? <Check size={12} /> : <Copy size={12} />}
                                      </button>
                                    )}
                                    {acc.status === "failed" && acc.error_log && (
                                      <button
                                        onClick={() => setSelectedErrorLog(acc.error_log || "")}
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
                          </React.Fragment>
                        );
                      });
                    })()}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>

          {/* ================= TABLA DE BALANCE FINANCIERO MENSUAL ================= */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#07070a]/75 backdrop-blur-xl border border-white/10 p-6 rounded-3xl relative overflow-hidden shadow-2xl"
          >
            <h2 className="text-xs font-black uppercase tracking-widest text-white/40 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#AD00FF]" />
              Balance Financiero (Mensual)
            </h2>
            
            {loadingFinance ? (
              <div className="py-6 flex items-center justify-center">
                <RefreshCw size={24} className="animate-spin text-white/30" />
              </div>
            ) : financeMetrics.length === 0 ? (
              <div className="py-8 text-center border border-dashed border-white/5 rounded-2xl bg-[#050508]/40">
                <p className="text-[10px] text-white/30 uppercase tracking-wider font-bold">No hay registros financieros aún.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Gráfico de Ventas */}
                <div className="h-40 w-full bg-[#050508]/40 rounded-xl p-4 border border-white/5">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#AD00FF" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#AD00FF" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis dataKey="month" stroke="rgba(255,255,255,0.2)" fontSize={9} tickLine={false} axisLine={false} />
                      <YAxis stroke="rgba(255,255,255,0.2)" fontSize={9} tickLine={false} axisLine={false} tickFormatter={(value) => `€${value}`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#07070a', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '11px' }}
                        itemStyle={{ color: '#00F0FF' }}
                        formatter={(value: any) => [`${value}€`, 'Beneficio']}
                        labelStyle={{ color: 'rgba(255,255,255,0.5)', marginBottom: '4px' }}
                      />
                      <Area type="monotone" dataKey="profit" stroke="#AD00FF" strokeWidth={2} fillOpacity={1} fill="url(#colorProfit)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 text-[9px] font-black uppercase tracking-wider text-white/40">
                      <th className="pb-3 pl-2">Mes</th>
                      <th className="pb-3 text-center">Cuentas</th>
                      <th className="pb-3 text-right">Ingresos</th>
                      <th className="pb-3 text-right">Costos</th>
                      <th className="pb-3 text-right pr-2">Beneficio Net</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-xs">
                    {financeMetrics.map((metric) => (
                      <tr key={metric.month} className="hover:bg-white/[0.01] transition-colors">
                        <td className="py-3 pl-2 font-mono text-white/50 text-[10px]">{metric.month}</td>
                        <td className="py-3 text-center font-bold text-white/80">{metric.accountsSold}</td>
                        <td className="py-3 text-right text-emerald-400 font-bold">{metric.revenue.toFixed(2)}€</td>
                        <td className="py-3 text-right text-red-400 font-bold">{metric.cost.toFixed(2)}€</td>
                        <td className="py-3 text-right pr-2 text-[#00F0FF] font-black tracking-wider">{metric.profit.toFixed(2)}€</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            )}
          </motion.div>
        </div>
      </main>

      {/* ================= MODAL DE SOLICITUD DE RECARGA ================= */}
      <AnimatePresence>
        {isRechargeOpen && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50"
            onClick={(e) => { if (e.target === e.currentTarget) { setIsRechargeOpen(false); setRechargeError(null); } }}
          >
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
                  {/* BUG-05: Error inline en modal de recarga */}
                  {rechargeError && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400 flex items-center gap-2">
                      <XCircle size={14} className="shrink-0" />
                      <span>{rechargeError}</span>
                    </div>
                  )}
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

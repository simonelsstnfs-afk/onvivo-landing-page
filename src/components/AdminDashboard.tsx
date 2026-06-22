import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShieldAlert, 
  Users, 
  DollarSign, 
  Key, 
  Activity, 
  UserPlus, 
  Check, 
  X, 
  ChevronRight, 
  LogOut, 
  RefreshCw,
  Sliders,
  AlertTriangle,
  Plus,
  Loader2
} from "lucide-react";

interface Partner {
  id: string;
  name: string;
  email: string;
  keys_available: number;
  keys_used: number;
  cost_per_key: number;
  status: "active" | "inactive";
  total_paid: number;
}

interface Metrics {
  totalPartners: number;
  activePartners: number;
  totalAccounts: number;
  completedAccounts: number;
  totalRevenue: number;
}

interface GlobalAccount {
  id: string;
  client_email: string;
  client_name: string;
  partner_id: string;
  status: "pending" | "completed" | "failed";
  error_log?: string;
  created_at?: any;
}

export default function AdminDashboard() {
  const { logout, getToken, user } = useAuth();
  const navigate = useNavigate();

  // Estados de Admin
  const [metrics, setMetrics] = useState<Metrics>({
    totalPartners: 0,
    activePartners: 0,
    totalAccounts: 0,
    completedAccounts: 0,
    totalRevenue: 0,
  });
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loadingMetrics, setLoadingMetrics] = useState(true);
  const [loadingPartners, setLoadingPartners] = useState(true);
  
  // Historial global
  const [globalAccounts, setGlobalAccounts] = useState<GlobalAccount[]>([]);
  const [loadingGlobalAccounts, setLoadingGlobalAccounts] = useState(true);

  // Formulario de Nuevo Socio
  const [newPartnerName, setNewPartnerName] = useState("");
  const [newPartnerEmail, setNewPartnerEmail] = useState("");
  const [newPartnerPassword, setNewPartnerPassword] = useState("");
  const [newPartnerCost, setNewPartnerCost] = useState(5.00);
  const [isCreatingPartner, setIsCreatingPartner] = useState(false);

  // Modal de Recarga Manual para Socio
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [rechargeQuantity, setRechargeQuantity] = useState(20);
  const [rechargeRevenue, setRechargeRevenue] = useState(100);
  const [isRecharging, setIsRecharging] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

  useEffect(() => {
    fetchMetrics();
    fetchPartners();
    fetchGlobalAccounts();
  }, []);

  const fetchMetrics = async () => {
    setLoadingMetrics(true);
    try {
      const token = await getToken();
      const res = await fetch(`${API_URL}/api/admin/metrics`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setMetrics(data);
      }
    } catch (err) {
      console.error("Error al cargar métricas:", err);
    } finally {
      setLoadingMetrics(false);
    }
  };

  const fetchPartners = async () => {
    setLoadingPartners(true);
    try {
      const token = await getToken();
      const res = await fetch(`${API_URL}/api/admin/partners`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setPartners(data.partners || []);
      }
    } catch (err) {
      console.error("Error al cargar socios:", err);
    } finally {
      setLoadingPartners(false);
    }
  };

  const fetchGlobalAccounts = async () => {
    setLoadingGlobalAccounts(true);
    try {
      const token = await getToken();
      const res = await fetch(`${API_URL}/api/admin/accounts-history?limit=100`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setGlobalAccounts(data.accounts || []);
      }
    } catch (err) {
      console.error("Error al cargar historial global:", err);
    } finally {
      setLoadingGlobalAccounts(false);
    }
  };

  const handleCreatePartner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPartnerName || !newPartnerEmail || !newPartnerPassword) return;
    setIsCreatingPartner(true);

    try {
      const token = await getToken();
      const res = await fetch(`${API_URL}/api/admin/partners`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: newPartnerName,
          email: newPartnerEmail,
          password: newPartnerPassword,
          costPerKey: newPartnerCost
        })
      });

      const data = await res.json();
      if (res.ok) {
        alert(`Socio creado con éxito:\nID de Auth: ${data.uid}`);
        setNewPartnerName("");
        setNewPartnerEmail("");
        setNewPartnerPassword("");
        setNewPartnerCost(5.00);
        fetchPartners();
        fetchMetrics();
      } else {
        alert(data.error || "Ocurrió un error al crear el socio");
      }
    } catch (err) {
      console.error(err);
      alert("Error al conectar con la API de administración");
    } finally {
      setIsCreatingPartner(false);
    }
  };

  const handleTogglePartnerStatus = async (partner: Partner) => {
    const nextStatus = partner.status === "active" ? "inactive" : "active";
    if (!confirm(`¿Estás seguro de que quieres cambiar el estado de ${partner.name} a ${nextStatus.toUpperCase()}?`)) return;

    try {
      const token = await getToken();
      const res = await fetch(`${API_URL}/api/admin/partners/${encodeURIComponent(partner.email)}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: nextStatus })
      });

      if (res.ok) {
        fetchPartners();
        fetchMetrics();
      } else {
        const data = await res.json();
        alert(data.error || "Error al actualizar estado del socio");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateCost = async (email: string, currentCost: number) => {
    const newCostStr = prompt(`Ingrese el nuevo costo por llave para ${email}:`, currentCost.toString());
    if (newCostStr === null) return;
    const newCost = parseFloat(newCostStr);
    if (isNaN(newCost) || newCost < 0) {
      alert("Costo inválido.");
      return;
    }

    try {
      const token = await getToken();
      const res = await fetch(`${API_URL}/api/admin/partners/${encodeURIComponent(email)}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ costPerKey: newCost })
      });

      if (res.ok) {
        fetchPartners();
      } else {
        const data = await res.json();
        alert(data.error || "Error al actualizar costo por llave");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRechargeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPartner) return;
    setIsRecharging(true);

    try {
      const token = await getToken();
      const res = await fetch(`${API_URL}/api/admin/partners/${encodeURIComponent(selectedPartner.email)}/recharge`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          quantity: rechargeQuantity,
          revenue: rechargeRevenue
        })
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        setSelectedPartner(null);
        fetchPartners();
        fetchMetrics();
      } else {
        alert(data.error || "Ocurrió un error al recargar saldo");
      }
    } catch (err) {
      console.error(err);
      alert("Error al conectar con la API de recargas");
    } finally {
      setIsRecharging(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen w-full text-white pb-12 pt-20 px-4 md:px-8 relative">
      
      {/* 🔮 HEADER */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6 mb-8">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight flex items-center gap-2">
            Panel de <span className="text-[#AD00FF]">Administración</span>
            <span className="text-[10px] bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded-full font-bold">
              ROOT
            </span>
          </h1>
          <p className="text-xs text-white/50">
            Sesión: {user?.email} • Gestión global de la red onvivo B2B
          </p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => {
              fetchMetrics();
              fetchPartners();
              fetchGlobalAccounts();
            }}
            className="p-3 bg-[#07070a] border border-white/5 hover:border-white/10 hover:text-[#AD00FF] rounded-2xl transition-all cursor-pointer"
            title="Refrescar datos"
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

      <main className="max-w-7xl mx-auto space-y-8">
        
        {/* ================= FILA 1: MÉTRICAS GENERALES ================= */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Ingresos */}
          <div className="bg-[#07070a]/75 backdrop-blur-xl border border-white/10 p-5 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
            <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest block mb-2 flex items-center gap-1.5">
              <DollarSign size={12} className="text-emerald-400" />
              Ingresos Facturados
            </span>
            <span className="text-3xl font-black text-emerald-400 tracking-tight">
              {loadingMetrics ? "..." : `${metrics.totalRevenue.toFixed(2)}€`}
            </span>
          </div>

          {/* Socios Activos */}
          <div className="bg-[#07070a]/75 backdrop-blur-xl border border-white/10 p-5 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#AD00FF]/5 rounded-full blur-2xl pointer-events-none" />
            <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest block mb-2 flex items-center gap-1.5">
              <Users size={12} className="text-[#AD00FF]" />
              Socios Activos
            </span>
            <span className="text-3xl font-black text-white tracking-tight">
              {loadingMetrics ? "..." : `${metrics.activePartners} / ${metrics.totalPartners}`}
            </span>
          </div>

          {/* Cuentas Stremio */}
          <div className="bg-[#07070a]/75 backdrop-blur-xl border border-white/10 p-5 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#00F0FF]/5 rounded-full blur-2xl pointer-events-none" />
            <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest block mb-2 flex items-center gap-1.5">
              <Activity size={12} className="text-[#00F0FF]" />
              Cuentas Creadas
            </span>
            <span className="text-3xl font-black text-[#00F0FF] tracking-tight">
              {loadingMetrics ? "..." : metrics.completedAccounts}
            </span>
          </div>

          {/* Eficiencia transaccional */}
          <div className="bg-[#07070a]/75 backdrop-blur-xl border border-white/10 p-5 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF007A]/5 rounded-full blur-2xl pointer-events-none" />
            <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest block mb-2 flex items-center gap-1.5">
              <Key size={12} className="text-[#FF007A]" />
              Intentos Totales
            </span>
            <span className="text-3xl font-black text-white/80 tracking-tight">
              {loadingMetrics ? "..." : metrics.totalAccounts}
            </span>
          </div>
        </div>

        {/* ================= FILA 2: FORMULARIO Y TABLA DE SOCIOS ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Formulario de Alta de Socios */}
          <div className="lg:col-span-1 bg-[#07070a]/75 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl">
            <h2 className="text-xs font-black uppercase tracking-widest text-white/40 mb-5 flex items-center gap-2">
              <UserPlus size={14} className="text-[#AD00FF]" />
              Crear Nuevo Socio Revendedor
            </h2>

            <form onSubmit={handleCreatePartner} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] text-white/50 font-bold uppercase tracking-wider pl-1">Nombre Comercial</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Max Streaming"
                  value={newPartnerName}
                  onChange={(e) => setNewPartnerName(e.target.value)}
                  className="w-full bg-[#050508]/80 border border-white/5 pl-4 pr-4 py-3 rounded-xl text-white placeholder-white/20 text-xs focus:outline-none focus:border-[#AD00FF] transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-white/50 font-bold uppercase tracking-wider pl-1">Email Acceso</label>
                <input
                  type="email"
                  required
                  placeholder="socio@email.com"
                  value={newPartnerEmail}
                  onChange={(e) => setNewPartnerEmail(e.target.value)}
                  className="w-full bg-[#050508]/80 border border-white/5 pl-4 pr-4 py-3 rounded-xl text-white placeholder-white/20 text-xs focus:outline-none focus:border-[#AD00FF] transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-white/50 font-bold uppercase tracking-wider pl-1">Contraseña Temporal</label>
                <input
                  type="text"
                  required
                  placeholder="Mínimo 6 caracteres"
                  value={newPartnerPassword}
                  onChange={(e) => setNewPartnerPassword(e.target.value)}
                  className="w-full bg-[#050508]/80 border border-white/5 pl-4 pr-4 py-3 rounded-xl text-white placeholder-white/20 text-xs focus:outline-none focus:border-[#AD00FF] transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-white/50 font-bold uppercase tracking-wider pl-1">Coste por Llave (€)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  value={newPartnerCost}
                  onChange={(e) => setNewPartnerCost(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#050508]/80 border border-white/5 pl-4 pr-4 py-3 rounded-xl text-white font-bold text-xs focus:outline-none focus:border-[#AD00FF] transition-all"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={isCreatingPartner}
                className="w-full bg-gradient-to-r from-[#AD00FF] to-[#FF007A] hover:shadow-[0_0_20px_rgba(173,0,255,0.25)] text-white text-[11px] font-black uppercase tracking-[0.15em] py-3.5 rounded-2xl transition-all cursor-pointer disabled:opacity-40"
              >
                Crear Socio & Asignar claims B2B
              </motion.button>
            </form>
          </div>

          {/* Listado General de Socios */}
          <div className="lg:col-span-2 bg-[#07070a]/75 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl overflow-hidden">
            <h2 className="text-xs font-black uppercase tracking-widest text-white/40 mb-5 flex items-center gap-2">
              <Sliders size={14} className="text-[#00F0FF]" />
              Gestión y Monitoreo de Socios
            </h2>

            {loadingPartners ? (
              <div className="py-12 flex items-center justify-center">
                <RefreshCw size={24} className="animate-spin text-white/30" />
              </div>
            ) : partners.length === 0 ? (
              <div className="py-12 text-center border border-dashed border-white/5 rounded-2xl bg-[#050508]/40">
                <p className="text-xs text-white/40 font-bold uppercase tracking-wider">No se han registrado socios revendedores.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 text-[10px] font-black uppercase tracking-wider text-white/40">
                      <th className="pb-3 pl-2">Socio</th>
                      <th className="pb-3 text-center">Llaves</th>
                      <th className="pb-3 text-center">Coste/Llave</th>
                      <th className="pb-3 text-center">Estado</th>
                      <th className="pb-3 text-right pr-2">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-xs">
                    {partners.map((partner) => (
                      <tr key={partner.id} className="hover:bg-white/[0.01] transition-colors">
                        <td className="py-4 pl-2">
                          <div className="font-bold text-white">{partner.name}</div>
                          <div className="text-[10px] text-white/40 font-mono">{partner.email}</div>
                        </td>
                        <td className="py-4 text-center">
                          <span className="font-bold text-[#00F0FF]">{partner.keys_available}</span>
                          <span className="text-white/30 text-[10px] ml-1">/ {partner.keys_used} us.</span>
                        </td>
                        <td className="py-4 text-center">
                          <button
                            onClick={() => handleUpdateCost(partner.email, partner.cost_per_key)}
                            className="px-2 py-1 bg-white/5 hover:bg-white/10 rounded font-bold hover:text-[#00F0FF] transition-all cursor-pointer"
                          >
                            {partner.cost_per_key.toFixed(2)}€
                          </button>
                        </td>
                        <td className="py-4 text-center">
                          <button
                            onClick={() => handleTogglePartnerStatus(partner)}
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-all ${
                              partner.status === "active" 
                                ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20" 
                                : "bg-red-500/10 text-red-400 hover:bg-red-500/20"
                            }`}
                          >
                            {partner.status.toUpperCase()}
                          </button>
                        </td>
                        <td className="py-4 text-right pr-2">
                          <button
                            onClick={() => {
                              setSelectedPartner(partner);
                              setRechargeQuantity(10);
                              setRechargeRevenue(10 * partner.cost_per_key);
                            }}
                            className="bg-gradient-to-r from-[#00F0FF] to-[#AD00FF] hover:shadow-[0_0_15px_rgba(0,240,255,0.25)] text-white text-[10px] font-black uppercase tracking-wider px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1 inline-flex"
                          >
                            <Plus size={10} />
                            Recargar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* ================= FILA 3: HISTORIAL GLOBAL DE CUENTAS ================= */}
        <div className="bg-[#07070a]/75 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl overflow-hidden">
          <h2 className="text-xs font-black uppercase tracking-widest text-white/40 mb-5 flex items-center gap-2">
            <Activity size={14} className="text-[#00F0FF]" />
            Historial Global de Cuentas (Logs de Playwright)
          </h2>

          {loadingGlobalAccounts ? (
            <div className="py-12 flex items-center justify-center">
              <RefreshCw size={24} className="animate-spin text-white/30" />
            </div>
          ) : globalAccounts.length === 0 ? (
            <div className="py-12 text-center border border-dashed border-white/5 rounded-2xl bg-[#050508]/40">
              <p className="text-xs text-white/40 font-bold uppercase tracking-wider">No se han registrado cuentas a nivel global.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 text-[10px] font-black uppercase tracking-wider text-white/40">
                    <th className="pb-3 pl-2">Socio</th>
                    <th className="pb-3">Cliente</th>
                    <th className="pb-3 text-center">Estado</th>
                    <th className="pb-3">Detalle (Log)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-xs">
                  {globalAccounts.map((acc) => (
                    <tr key={acc.id} className="hover:bg-white/[0.01] transition-colors">
                      <td className="py-4 pl-2 font-mono text-white/50">{acc.partner_id}</td>
                      <td className="py-4">
                        <div className="font-bold text-white">{acc.client_name}</div>
                        <div className="text-[10px] text-white/40 font-mono">{acc.client_email}</div>
                      </td>
                      <td className="py-4 text-center">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold ${
                          acc.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' :
                          acc.status === 'failed' ? 'bg-red-500/10 text-red-400' :
                          'bg-[#00F0FF]/10 text-[#00F0FF]'
                        }`}>
                          {acc.status === 'completed' && <Check size={10} />}
                          {acc.status === 'failed' && <X size={10} />}
                          {acc.status === 'pending' && <RefreshCw size={10} className="animate-spin" />}
                          {acc.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-4 pr-2">
                        {acc.status === 'failed' && acc.error_log ? (
                          <div className="bg-red-500/5 border border-red-500/10 text-red-400/80 p-2 rounded text-[10px] max-w-sm whitespace-pre-wrap font-mono">
                            {acc.error_log}
                          </div>
                        ) : (
                          <span className="text-white/20 text-[10px]">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* ================= MODAL DE RECARGA MANUAL DE SOCIOS ================= */}
      <AnimatePresence>
        {selectedPartner && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-[#07070a] border border-white/10 w-full max-w-md p-6 rounded-3xl shadow-2xl relative"
            >
              <h2 className="text-lg font-black uppercase tracking-tight mb-2">Recargar Llaves a Socio</h2>
              <p className="text-xs text-white/50 mb-6">
                Añade llaves de activación manualmente al socio <strong>{selectedPartner.name}</strong> y registra los ingresos recibidos.
              </p>

              <form onSubmit={handleRechargeSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-white/50 font-bold uppercase tracking-wider pl-1">Cantidad de Llaves</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={rechargeQuantity}
                    onChange={(e) => {
                      const qty = parseInt(e.target.value) || 0;
                      setRechargeQuantity(qty);
                      setRechargeRevenue(qty * selectedPartner.cost_per_key);
                    }}
                    className="w-full bg-[#050508]/80 border border-white/5 px-4 py-3 rounded-xl text-white font-bold text-sm focus:outline-none focus:border-[#00F0FF] transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-white/50 font-bold uppercase tracking-wider pl-1">Ingresos Registrados (€)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={rechargeRevenue}
                    onChange={(e) => setRechargeRevenue(parseFloat(e.target.value) || 0)}
                    className="w-full bg-[#050508]/80 border border-white/5 px-4 py-3 rounded-xl text-white font-bold text-sm focus:outline-none focus:border-[#00F0FF] transition-all"
                  />
                </div>

                <div className="flex gap-3 pt-4 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => setSelectedPartner(null)}
                    className="flex-1 py-3.5 bg-white/5 border border-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider rounded-2xl transition-all cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isRecharging}
                    className="flex-1 py-3.5 bg-gradient-to-r from-[#AD00FF] to-[#FF007A] text-white text-xs font-black uppercase tracking-[0.15em] rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isRecharging ? (
                      <>
                        <Loader2 size={14} className="animate-spin text-white" />
                        Procesando...
                      </>
                    ) : (
                      "Confirmar Recarga"
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
    </div>
  );
}

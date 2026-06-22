import React from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Vistas
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import PartnerDashboard from "./components/PartnerDashboard";
import AdminDashboard from "./components/AdminDashboard";

// Componente para proteger rutas según rol
function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: ("partner" | "admin")[] }) {
  const { user, role, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#050508]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-t-[#00F0FF] border-white/10 rounded-full animate-spin" />
          <span className="text-xs uppercase font-mono tracking-widest text-white/50">Cargando Sistema...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && !allowedRoles.includes(role)) {
    return <Navigate to={role === "admin" ? "/admin" : "/dashboard"} replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <div className="relative min-h-screen">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />

            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute allowedRoles={["partner", "admin"]}>
                  <PartnerDashboard />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/admin" 
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </HashRouter>
    </AuthProvider>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { motion, useScroll, useSpring } from "motion/react";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Componentes y Vistas
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Pricing from "./components/Pricing";
import HowItWorks from "./components/HowItWorks";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import CheckoutWizard from "./components/CheckoutWizard";

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
    // Si es admin intentando entrar a partner, o socio intentando entrar a admin
    return <Navigate to={role === "admin" ? "/admin" : "/dashboard"} replace />;
  }

  return <>{children}</>;
}

// Vista de la Landing Page consolidada
function LandingPage() {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<string | undefined>(undefined);

  const handleOpenWizard = (movieTitle?: string) => {
    setSelectedMovie(movieTitle);
    setIsWizardOpen(true);
  };

  return (
    <>
      <Navbar />
      <main aria-label="Contenido principal de Onvivo">
        <Hero onOpenWizard={handleOpenWizard} />
        <Features />
        <Pricing onOpenWizard={handleOpenWizard} />
        <HowItWorks />
        <FAQ />
        <FinalCTA onOpenWizard={handleOpenWizard} />
      </main>
      <Footer />
      <CheckoutWizard 
        isOpen={isWizardOpen} 
        onClose={() => setIsWizardOpen(false)} 
        preSelectedMovie={selectedMovie}
      />
    </>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <AuthProvider>
      <HashRouter>
        <div className="relative min-h-screen">
          {/* Scroll Progress Bar */}
          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00F0FF] via-[#AD00FF] to-[#FF007A] z-[60] origin-left shadow-[0_0_15px_rgba(0,240,255,0.4)]"
            style={{ scaleX }}
          />

          <Routes>
            {/* Rutas Públicas */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />

            {/* Rutas de Socio */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute allowedRoles={["partner", "admin"]}>
                  <PartnerDashboard />
                </ProtectedRoute>
              } 
            />

            {/* Rutas de Administrador */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          {/* Sistema de Fondo Cósmico Espacial de Élite (Unificado & Multicapa) */}
          <div className="fixed inset-0 pointer-events-none z-[-20] overflow-hidden cosmic-background">
            {/* Auroras y Nebulosas Flotantes Dinámicas en Capas (Profundidad Cinemática Vibrante) */}
            <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-cyan-500/15 rounded-full blur-[110px] animate-pulse-slow" />
            <div className="absolute top-[25%] left-[-15%] w-[900px] h-[900px] bg-[#AD00FF]/12 rounded-full blur-[130px] animate-pulse-medium" />
            <div className="absolute bottom-[-5%] right-[-10%] w-[700px] h-[700px] bg-[#FF007A]/12 rounded-full blur-[100px] animate-pulse-slow" />

            {/* Polvo Estelar, Constelaciones y Destellos en Cruz (SVG Adaptativo de Alta Visibilidad) */}
            <svg 
              className="absolute inset-0 w-full h-full opacity-[0.75]" 
              viewBox="0 0 1920 1080" 
              preserveAspectRatio="xMidYMid slice" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Estrellas Brillantes del Espacio Profundo */}
              <circle cx="120" cy="150" r="2" className="fill-white animate-twinkle-slow" />
              <circle cx="1780" cy="120" r="2.5" className="fill-white animate-twinkle-fast" />
              <circle cx="920" cy="240" r="2.2" className="fill-white animate-twinkle-slow" />
              <circle cx="1380" cy="410" r="3" className="fill-cyan-300 animate-twinkle-medium" />
              <circle cx="540" cy="580" r="2" className="fill-white animate-twinkle-fast" />
              <circle cx="1180" cy="720" r="2.5" className="fill-purple-300 animate-twinkle-slow" />
              <circle cx="1750" cy="650" r="1.8" className="fill-white animate-twinkle-medium" />
              <circle cx="230" cy="850" r="2.5" className="fill-white animate-twinkle-fast" />
              <circle cx="720" cy="920" r="3" className="fill-[#FF007A] animate-twinkle-slow" />
              <circle cx="1580" cy="950" r="2" className="fill-white animate-twinkle-medium" />
              
              <circle cx="420" cy="310" r="2.2" className="fill-white animate-twinkle-medium" />
              <circle cx="1480" cy="620" r="2.5" className="fill-cyan-200 animate-twinkle-slow" />
              <circle cx="95" cy="520" r="1.8" className="fill-white animate-twinkle-fast" />
              <circle cx="1820" cy="880" r="2.2" className="fill-purple-200 animate-twinkle-medium" />
              
              {/* Destellos de Estrellas Supergigantes */}
              <g transform="translate(280, 240)" className="animate-twinkle-slow">
                <path d="M-12,0 L12,0 M0,-12 L0,12" className="stroke-cyan-400/60 stroke-[1.25]" />
                <circle cx="0" cy="0" r="3" className="fill-cyan-400" />
              </g>
              <g transform="translate(1620, 320)" className="animate-twinkle-medium">
                <path d="M-14,0 L14,0 M0,-14 L0,14" className="stroke-white/70 stroke-[1.25]" />
                <circle cx="0" cy="0" r="3.5" className="fill-white" />
              </g>
              <g transform="translate(480, 780)" className="animate-twinkle-slow">
                <path d="M-12,0 L12,0 M0,-12 L0,12" className="stroke-[#FF007A]/60 stroke-[1.25]" />
                <circle cx="0" cy="0" r="3" className="fill-[#FF007A]" />
              </g>
              <g transform="translate(1480, 850)" className="animate-twinkle-fast">
                <path d="M-14,0 L14,0 M0,-14 L0,14" className="stroke-cyan-300/60 stroke-[1.25]" />
                <circle cx="0" cy="0" r="3.5" className="fill-cyan-300" />
              </g>

              {/* Constelación del Fénix */}
              <path d="M 280,240 L 420,310 L 510,240 L 680,350" className="stroke-cyan-400/25 stroke-[1.25] fill-none" strokeDasharray="4 4" />
              <circle cx="420" cy="310" r="2.5" className="fill-cyan-400" />
              <circle cx="510" cy="240" r="3" className="fill-white animate-twinkle-fast" />

              {/* Constelación de Orión */}
              <path d="M 1380,120 L 1520,210 L 1620,320 L 1580,450" className="stroke-purple-400/25 stroke-[1.25] fill-none" strokeDasharray="4 4" />
              <circle cx="1520" cy="210" r="2.5" className="fill-purple-400 animate-twinkle-slow" />
              <circle cx="1580" cy="450" r="2.5" className="fill-white animate-twinkle-medium" />

              {/* Constelación de Lira */}
              <path d="M 120,620 L 230,710 L 320,580 M 230,710 L 480,780" className="stroke-[#FF007A]/25 stroke-[1.25] fill-none" strokeDasharray="4 4" />
              <circle cx="120" cy="620" r="2.5" className="fill-white" />
              <circle cx="230" cy="710" r="2.5" className="fill-[#FF007A] animate-twinkle-fast" />
              <circle cx="320" cy="580" r="3" className="fill-white animate-twinkle-slow" />
            </svg>
            
            {/* Rejilla de Datos Holográfica */}
            <div className="absolute inset-0 dot-grid opacity-[0.035]" />

            {/* Capa de Brillo de Interferencia Atmosférica Suave */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050508]/15 to-[#020204]/40" />
          </div>
        </div>
      </HashRouter>
    </AuthProvider>
  );
}

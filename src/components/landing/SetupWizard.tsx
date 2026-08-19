import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, ArrowRight, ArrowLeft, Shield, AlertCircle, Sparkles, Loader2, X
} from 'lucide-react';
import { findLanguage } from '../../utils/languages';

const STEP_CONFIG = [
  { number: 1, label: 'Paso 1 de 5: Dispositivos', percent: 20 },
  { number: 2, label: 'Paso 2 de 5: Idiomas de Reproducción', percent: 40 },
  { number: 3, label: 'Paso 3 de 5: Catálogo & Contenido', percent: 60 },
  { number: 4, label: 'Paso 4 de 5: Email de Entrega', percent: 80 },
  { number: 5, label: 'Paso 5 de 5: Resumen & Checkout', percent: 100 },
];

const QUICK_LANGUAGES = [
  { label: 'Castellano (España)', value: 'Español', flag: '🇪🇸' },
  { label: 'Español Latino', value: 'Español', flag: '🌎' },
  { label: 'Inglés', value: 'Inglés', flag: '🇬🇧' },
  { label: 'Francés', value: 'Francés', flag: '🇫🇷' },
  { label: 'Alemán', value: 'Alemán', flag: '🇩🇪' },
  { label: 'Italiano', value: 'Italiano', flag: '🇮🇹' },
  { label: 'Portugués', value: 'Portugués', flag: '🇵🇹' },
];

interface SetupWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SetupWizard: React.FC<SetupWizardProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [devices, setDevices] = useState<string[]>(['smart_tv', 'fire_stick']);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['Español']);
  const [customLangInput, setCustomLangInput] = useState('');
  const [customLangError, setCustomLangError] = useState('');
  const [genres, setGenres] = useState<string[]>(['cinema', 'series', 'anime']);
  const [email, setEmail] = useState('');
  const [orderId, setOrderId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Lock body scroll on modal open & Escape key listener
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose]);

  // Generar ID de Orden Alfanumérico Único una sola vez
  useEffect(() => {
    if (!orderId) {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let res = 'ONV-';
      for (let i = 0; i < 6; i++) {
        res += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setOrderId(res);
    }
  }, [orderId]);

  if (!isOpen) return null;

  const isValidEmail = (str: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str.trim());

  const toggleDevice = (dev: string) => {
    if (devices.includes(dev)) {
      if (devices.length > 1) {
        setDevices(devices.filter((d) => d !== dev));
      }
    } else {
      setDevices([...devices, dev]);
    }
  };

  const toggleLanguage = (lang: string) => {
    if (selectedLanguages.includes(lang)) {
      if (selectedLanguages.length > 1) {
        setSelectedLanguages(selectedLanguages.filter((l) => l !== lang));
      }
    } else {
      setSelectedLanguages([...selectedLanguages, lang]);
    }
  };

  const addCustomLanguage = () => {
    const trimmed = customLangInput.trim();
    if (!trimmed) return;
    const match = findLanguage(trimmed);
    if (!match) {
      setCustomLangError(`Idioma "${trimmed}" no disponible.`);
      return;
    }
    if (!selectedLanguages.includes(match.name)) {
      setSelectedLanguages([...selectedLanguages, match.name]);
    }
    setCustomLangInput('');
    setCustomLangError('');
  };

  const toggleGenre = (genre: string) => {
    if (genres.includes(genre)) {
      if (genres.length > 1) {
        setGenres(genres.filter((g) => g !== genre));
      }
    } else {
      setGenres([...genres, genre]);
    }
  };

  const nextStep = () => {
    if (step === 4 && !isValidEmail(email)) return;
    setStep((s) => Math.min(s + 1, 5));
  };

  const prevStep = () => {
    setStep((s) => Math.max(s - 1, 1));
  };

  // Guardar Orden en Firestore e ir a Polar.sh
  const handlePolarCheckout = async () => {
    setIsSubmitting(true);
    try {
      const url = `https://firestore.googleapis.com/v1/projects/propeller-hub-7/databases/(default)/documents/orders/${orderId}`;
      const payload = {
        fields: {
          orderId: { stringValue: orderId },
          customerEmail: { stringValue: email.trim().toLowerCase() },
          status: { stringValue: 'PENDING_PAYMENT' },
          devices: {
            arrayValue: {
              values: devices.map((d) => ({ stringValue: d })),
            },
          },
          addonLanguages: { stringValue: selectedLanguages.join(', ') },
          genres: {
            arrayValue: {
              values: genres.map((g) => ({ stringValue: g })),
            },
          },
          includeAnime: { booleanValue: genres.includes('anime') },
          gateway: { stringValue: 'polar.sh' },
          price: { stringValue: '65€' },
          created_at: { stringValue: new Date().toISOString() },
          updated_at: { stringValue: new Date().toISOString() },
        },
      };

      await fetch(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      // Redirigir a Polar.sh
      const baseUrl = import.meta.env.VITE_POLAR_CHECKOUT_URL || 'https://polar.sh/onvivo/setup-pack';
      const params = new URLSearchParams({
        customer_email: email.trim().toLowerCase(),
        order_id: orderId,
        addon_languages: selectedLanguages.join(','),
        devices: devices.join(','),
        ref: 'onvivo_wizard',
      });

      window.location.href = `${baseUrl}?${params.toString()}`;
    } catch (err) {
      console.error('Error al registrar la orden:', err);
      alert('Hubo un problema al preparar tu orden. Por favor intenta nuevamente.');
      setIsSubmitting(false);
    }
  };

  const currentCfg = STEP_CONFIG[step - 1];

  const deviceLabels: Record<string, string> = {
    smart_tv: 'Smart TV',
    fire_stick: 'Fire TV Stick',
    pc_mac: 'PC / Mac',
    mobile: 'Móvil / Tablet',
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-2xl">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-[#00F0FF]/15 via-[#A855F7]/15 to-[#EC4899]/15 blur-[160px] pointer-events-none rounded-full" />

      {/* Backdrop Click Dismiss */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-3xl my-auto">
        {/* Wizard Card Container */}
        <div className="relative rounded-3xl bg-[#070714]/98 backdrop-blur-2xl border border-cyan-500/30 shadow-[0_25px_80px_rgba(0,0,0,0.9)] p-6 sm:p-10">
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar asistente"
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all cursor-pointer z-20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center mb-8 flex flex-col items-center pr-8 sm:pr-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-[#A855F7] text-xs font-mono font-bold uppercase tracking-[0.2em] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CONFIGURADOR INTERACTIVO</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase leading-[0.98] font-display">
              CONFIGURA TU ECOSISTEMA <br />
              <span className="text-gradient-neon">ONVIVO</span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-white/60 max-w-lg mx-auto font-grotesk">
              Selecciona tus preferencias y generaremos tu perfil preconfigurado listo para despacho digital inmediato.
            </p>
          </div>

          {/* Progress Bar & Step Indicators */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3 font-mono">
              <span className="text-xs font-bold text-[#00F0FF] uppercase tracking-wider">
                {currentCfg.label}
              </span>
              <span className="text-xs text-white/50">
                {currentCfg.percent}% Completado
              </span>
            </div>

            {/* Bar Tracks */}
            <div className="w-full h-2 rounded-full bg-white/[0.08] overflow-hidden p-[1px]">
              <div
                className="h-full bg-gradient-to-r from-[#00F0FF] via-[#A855F7] to-[#00FF85] rounded-full transition-all duration-500 ease-out"
                style={{ width: `${currentCfg.percent}%` }}
              />
            </div>

            {/* Step Breadcrumbs */}
            <div className="grid grid-cols-5 gap-1.5 sm:gap-2 mt-3 text-center">
              {STEP_CONFIG.map((cfg) => {
                const isActive = cfg.number === step;
                const isPassed = cfg.number < step;
                return (
                  <button
                    key={cfg.number}
                    type="button"
                    onClick={() => {
                      if (cfg.number < step) setStep(cfg.number);
                    }}
                    disabled={cfg.number > step}
                    className={`text-[9px] sm:text-[10px] font-mono font-bold py-1.5 rounded-lg border transition-all duration-300 ${
                      isActive
                        ? 'bg-cyan-500/20 text-[#00F0FF] border-cyan-500/50 shadow-sm'
                        : isPassed
                        ? 'bg-white/5 text-[#00FF85] border-[#00FF85]/30 cursor-pointer hover:bg-white/10'
                        : 'text-white/30 border-white/5 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    {cfg.number}. {cfg.label.split(':')[1]?.trim() || ''}
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 1: Dispositivos */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-white mb-1 uppercase tracking-tight font-display">
                  ¿En qué dispositivo vas a utilizar Onvivo?
                </h3>
                <p className="text-xs sm:text-sm text-white/60 font-grotesk">
                  Selecciona los tipos de dispositivos donde disfrutarás tu configuración (puedes elegir varios).
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 font-grotesk">
                {[
                  { id: 'smart_tv', title: 'Smart TV', tag: 'Recomendado Salón', desc: 'Android TV, Google TV, Xiaomi TV, Sony, Philips y TV Box.' },
                  { id: 'fire_stick', title: 'Fire TV & TV Sticks', tag: 'Máxima Fluidez', desc: 'Amazon Fire TV Stick (todos los modelos), Chromecast con Google TV.' },
                  { id: 'pc_mac', title: 'PC & Mac', tag: 'Control Total', desc: 'Ordenadores Windows 10/11, Apple macOS y Linux.' },
                  { id: 'mobile', title: 'Móvil y Tablet', tag: 'Portabilidad', desc: 'Teléfonos y tablets Android, iPhone e iPad para ver fuera de casa.' },
                ].map((item) => {
                  const isChecked = devices.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleDevice(item.id)}
                      className={`group cursor-pointer relative p-4 rounded-2xl border transition-all duration-200 flex items-start gap-3.5 ${
                        isChecked
                          ? 'bg-cyan-500/[0.08] border-cyan-500/60 shadow-[0_0_20px_rgba(0,240,255,0.15)]'
                          : 'bg-white/[0.03] hover:bg-white/[0.06] border-white/[0.08]'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="mt-1 w-4 h-4 rounded border-white/20 text-[#00F0FF] focus:ring-[#00F0FF] bg-[#050510] cursor-pointer"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className={`text-sm font-bold ${isChecked ? 'text-white' : 'text-white/80'}`}>
                            {item.title}
                          </span>
                          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-cyan-500/15 text-[#00F0FF] font-bold">
                            {item.tag}
                          </span>
                        </div>
                        <p className="text-[11px] text-white/60 mt-1">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Idiomas de Reproducción */}
          {step === 2 && (
            <div className="space-y-5 font-grotesk">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-white mb-1 uppercase tracking-tight font-display">
                  Idiomas de Audio y Subtítulos Preferidos
                </h3>
                <p className="text-xs sm:text-sm text-white/60">
                  Ajustaremos tu cuenta para que busque prioritariamente pistas y subtítulos en estos idiomas.
                </p>
              </div>

              {/* Badges de selección rápida */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                {QUICK_LANGUAGES.map((lang) => {
                  const isSelected = selectedLanguages.includes(lang.value);
                  return (
                    <button
                      key={lang.label}
                      type="button"
                      onClick={() => toggleLanguage(lang.value)}
                      className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-purple-500/15 border-purple-500/60 text-white shadow-[0_0_20px_rgba(168,85,247,0.25)]'
                          : 'bg-white/[0.03] border-white/[0.08] text-white/60 hover:text-white hover:bg-white/[0.06]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base">{lang.flag}</span>
                        <span className="text-xs font-bold">{lang.label}</span>
                      </div>
                      <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${isSelected ? 'border-[#A855F7] bg-[#A855F7]' : 'border-white/20'}`}>
                        {isSelected && <CheckCircle className="w-3 h-3 text-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Entrada de idioma personalizado */}
              <div className="pt-3 border-t border-white/[0.06] space-y-2.5">
                <label className="block text-xs font-mono text-white/60">
                  ¿Deseas añadir otro idioma adicional? (Ej: Ruso, Japonés, Chino, Polaco, etc.)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customLangInput}
                    onChange={(e) => setCustomLangInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addCustomLanguage();
                      }
                    }}
                    placeholder="Escribe un idioma..."
                    className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-white text-xs font-mono focus:outline-none focus:border-[#00F0FF] transition-all"
                  />
                  <button
                    type="button"
                    onClick={addCustomLanguage}
                    className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase font-bold transition-all cursor-pointer"
                  >
                    + Añadir
                  </button>
                </div>
                {customLangError && (
                  <div className="text-xs text-[#EC4899] font-mono flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{customLangError}</span>
                  </div>
                )}
              </div>

              {/* Resumen de idiomas seleccionados */}
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-xs font-mono">
                <span className="text-white/50">Idiomas priorizados:</span>
                <span className="text-[#00F0FF] font-bold">{selectedLanguages.join(', ')}</span>
              </div>
            </div>
          )}

          {/* STEP 3: Catálogo & Contenido */}
          {step === 3 && (
            <div className="space-y-5 font-grotesk">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-white mb-1 uppercase tracking-tight font-display">
                  Preferencias de Catálogo y Categorías
                </h3>
                <p className="text-xs sm:text-sm text-white/60">
                  Selecciona los tipos de contenido que priorizaremos en tu muro de reproducción.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {[
                  { id: 'cinema', title: 'Cine & Estrenos', tag: '1080p Full HD', desc: 'Estrenos recientes, grandes producciones de cartelera y cine independiente.' },
                  { id: 'series', title: 'Series Completas', tag: 'Binge-Watching', desc: 'Temporadas completas, series en emisión y seguimiento de capítulos.' },
                  { id: 'anime', title: 'Anime & Animación', tag: 'Simulcasts HD', desc: 'Catálogos de animación japonesa, estrenos y series en emisión.' },
                  { id: 'docu_events', title: 'Documentales & Ciencia', tag: 'Alta Fidelidad', desc: 'Producciones documentales de ciencia, historia, naturaleza y tecnología.' },
                ].map((item) => {
                  const isChecked = genres.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleGenre(item.id)}
                      className={`group cursor-pointer relative p-4 rounded-2xl border transition-all duration-200 flex items-start gap-3.5 ${
                        isChecked
                          ? 'bg-emerald-500/[0.08] border-emerald-500/60 shadow-[0_0_20px_rgba(0,255,133,0.15)]'
                          : 'bg-white/[0.03] hover:bg-white/[0.06] border-white/[0.08]'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="mt-1 w-4 h-4 rounded border-white/20 text-[#00FF85] focus:ring-[#00FF85] bg-[#050510] cursor-pointer"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className={`text-sm font-bold ${isChecked ? 'text-white' : 'text-white/80'}`}>
                            {item.title}
                          </span>
                          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-[#00FF85] font-bold">
                            {item.tag}
                          </span>
                        </div>
                        <p className="text-[11px] text-white/60 mt-1">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: Email de Entrega */}
          {step === 4 && (
            <div className="space-y-5 font-grotesk">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-white mb-1 uppercase tracking-tight font-display">
                  ¿A qué email enviamos tu guía y credenciales?
                </h3>
                <p className="text-xs sm:text-sm text-white/60">
                  Tu cuenta preconfigurada y el manual en PDF se despacharán a este correo en menos de 2 minutos tras el pago.
                </p>
              </div>

              <div className="space-y-3.5">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && isValidEmail(email)) {
                        nextStep();
                      }
                    }}
                    placeholder="ejemplo@correo.com"
                    autoFocus
                    className="w-full bg-black/45 border border-white/10 rounded-2xl px-4 py-3.5 text-white text-sm font-mono tracking-wide placeholder:text-white/25 focus:outline-none focus:border-[#00FF85] focus:shadow-[0_0_25px_rgba(0,255,133,0.25)] transition-all"
                  />
                </div>

                {!isValidEmail(email) && email.length > 0 && (
                  <p className="text-xs text-[#EC4899] font-mono flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Por favor introduce un formato de email válido (ej: usuario@dominio.com)
                  </p>
                )}

                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-xs text-white/60 space-y-1">
                  <div className="text-white font-bold flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-[#00FF85]" />
                    Privacidad y Entrega Segura
                  </div>
                  <p className="text-[11px]">
                    No compartimos tus datos con terceros. Solo usamos tu email para generar tu acceso exclusivo y enviarte la guía de activación.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Resumen & Checkout Polar.sh */}
          {step === 5 && (
            <div className="space-y-5">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#00FF85]/15 text-[#00FF85] text-xs font-mono font-bold uppercase tracking-wider mb-1.5">
                  ✓ CONFIGURACIÓN LISTA PARA ACTIVAR
                </div>
                <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight font-display">
                  Tu Perfil Onvivo está Listo
                </h3>
                <p className="text-xs text-white/60 font-grotesk">
                  Revisa tu resumen y confirma el pago seguro mediante Polar.sh para recibir tu entrega digital inmediata.
                </p>
              </div>

              {/* Custom Summary Card */}
              <div className="rounded-2xl bg-[#030308]/90 border border-white/10 p-5 space-y-3.5 shadow-xl font-grotesk">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-white/[0.08] gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono uppercase text-[#00F0FF] font-bold tracking-wider">
                        Producto Seleccionado
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-[#00F0FF] border border-cyan-500/30">
                        {orderId}
                      </span>
                    </div>
                    <div className="text-base font-black text-white uppercase tracking-tight font-display">
                      Pack Setup Onvivo Lifetime
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="text-2xl font-black text-[#00FF85] font-display">
                      65€ <span className="text-xs text-white/40 font-normal">/ 75$</span>
                    </div>
                    <div className="text-[10px] text-white/50 font-mono">Pago único perpetuo</div>
                  </div>
                </div>

                {/* Dynamic Preferences Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 py-1 text-xs font-mono">
                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                    <span className="text-white/40 block text-[9px] uppercase">Dispositivos</span>
                    <span className="text-white font-bold truncate block">
                      {devices.map((d) => deviceLabels[d] || d).join(', ')}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                    <span className="text-white/40 block text-[9px] uppercase">Idiomas Preferidos</span>
                    <span className="text-white font-bold truncate block">{selectedLanguages.join(', ')}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                    <span className="text-white/40 block text-[9px] uppercase">Email Entrega</span>
                    <span className="text-[#00F0FF] font-bold truncate block">{email}</span>
                  </div>
                </div>

                {/* Checklist */}
                <div className="space-y-1.5 pt-2 border-t border-white/[0.06] text-xs text-white/60">
                  <div className="flex items-center gap-2 text-white/90">
                    <span className="text-[#00FF85] font-bold">✓</span>
                    <span>Entorno multimedia 100% configurado con tus idiomas seleccionados</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/90">
                    <span className="text-[#00FF85] font-bold">✓</span>
                    <span>Optimización de resolución 1080p Full HD garantizada</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/90">
                    <span className="text-[#00FF85] font-bold">✓</span>
                    <span>Guía Visual Interactiva en PDF paso a paso</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/90">
                    <span className="text-[#00FF85] font-bold">✓</span>
                    <span>Despacho automático por correo en menos de 60 segundos tras el pago</span>
                  </div>
                </div>
              </div>

              {/* Checkout Action Button */}
              <div className="pt-1 flex flex-col items-center gap-2.5">
                <button
                  type="button"
                  onClick={handlePolarCheckout}
                  disabled={isSubmitting}
                  className="btn-neon w-full py-3.5 px-6 rounded-2xl text-[#050510] font-black text-sm sm:text-base uppercase tracking-wider text-center font-display shadow-[0_0_35px_rgba(0,240,255,0.4)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Conectando con Pasarela Polar...</span>
                    </>
                  ) : (
                    <>
                      <span>Proceder al Pago Seguro — 65€</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
                <div className="flex flex-wrap items-center justify-center gap-3 text-[10px] text-white/50 font-mono">
                  <span className="flex items-center gap-1 text-[#00FF85]">🔒 Checkout Seguro Polar.sh</span>
                  <span>•</span>
                  <span>💳 Apple Pay, Google Pay y Tarjeta</span>
                  <span>•</span>
                  <span>⚡ Despacho automático digital</span>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Control Buttons */}
          <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between font-grotesk">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/10 text-xs font-bold uppercase tracking-wider text-white border border-white/10 transition-colors flex items-center gap-1 cursor-pointer font-mono"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Paso Anterior
              </button>
            ) : (
              <div />
            )}

            {step < 5 && (
              <button
                type="button"
                onClick={nextStep}
                disabled={step === 4 && !isValidEmail(email)}
                className="btn-neon px-5 py-2 rounded-xl text-[#050510] text-xs font-black uppercase tracking-wider font-mono shadow-lg flex items-center gap-1 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span>Siguiente Paso</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

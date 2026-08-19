import React, { useState, useEffect } from 'react';
import { 
  Tv, Smartphone, Monitor, Laptop, Globe, Film, Mail, 
  CheckCircle, ArrowRight, ArrowLeft, Shield, AlertCircle, Sparkles, Loader2
} from 'lucide-react';
import { SUPPORTED_LANGUAGES, findLanguage } from '../../utils/languages';

const STEP_CONFIG = [
  { number: 1, label: 'Paso 1 de 5: Dispositivos', percent: 20 },
  { number: 2, label: 'Paso 2 de 5: Idiomas de Addons', percent: 40 },
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

export const SetupWizard: React.FC = () => {
  const [step, setStep] = useState(1);
  const [devices, setDevices] = useState<string[]>(['smart_tv', 'fire_stick']);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['Español']);
  const [customLangInput, setCustomLangInput] = useState('');
  const [customLangError, setCustomLangError] = useState('');
  const [genres, setGenres] = useState<string[]>(['cinema', 'series', 'anime']);
  const [email, setEmail] = useState('');
  const [orderId, setOrderId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      setCustomLangError(`Idioma "${trimmed}" no reconocido por los addons.`);
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
    <section
      id="wizard"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0B0F19] via-[#0F172A] to-[#0B0F19] overflow-hidden"
    >
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-[#00F0FF]/10 via-[#A855F7]/10 to-[#EC4899]/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#A855F7]/10 border border-[#A855F7]/25 text-[#A855F7] text-xs font-mono font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Configurador Interactivo</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Configura tu Ecosistema Onvivo
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#8B8BA7] max-w-xl mx-auto">
            Selecciona tus preferencias técnicas y generaremos tu perfil preconfigurado listo para despacho digital inmediato.
          </p>
        </div>

        {/* Wizard Card Container */}
        <div className="relative rounded-3xl bg-[#0B0F19]/90 backdrop-blur-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] p-6 sm:p-10">
          {/* Progress Bar & Step Indicators */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-semibold text-[#00F0FF] uppercase tracking-wider">
                {currentCfg.label}
              </span>
              <span className="text-xs font-mono text-[#8B8BA7]">
                {currentCfg.percent}% Completado
              </span>
            </div>

            {/* Bar Tracks */}
            <div className="w-full h-2 rounded-full bg-white/[0.08] overflow-hidden p-[1px]">
              <div
                className="h-full bg-gradient-to-r from-[#00F0FF] via-[#A855F7] to-[#10B981] rounded-full transition-all duration-500 ease-out"
                style={{ width: `${currentCfg.percent}%` }}
              />
            </div>

            {/* Step Breadcrumbs */}
            <div className="grid grid-cols-5 gap-1.5 sm:gap-2 mt-4 text-center">
              {STEP_CONFIG.map((cfg) => {
                const isActive = cfg.number === step;
                const isPassed = cfg.number < step;
                return (
                  <button
                    key={cfg.number}
                    onClick={() => {
                      if (cfg.number < step) setStep(cfg.number);
                    }}
                    disabled={cfg.number > step}
                    className={`text-[10px] sm:text-[11px] font-mono font-semibold py-1.5 rounded-lg border transition-all duration-300 ${
                      isActive
                        ? 'bg-[#00F0FF]/15 text-[#00F0FF] border-[#00F0FF]/40 shadow-sm'
                        : isPassed
                        ? 'bg-white/5 text-[#10B981] border-[#10B981]/30 cursor-pointer hover:bg-white/10'
                        : 'text-[#8B8BA7] border-white/5 opacity-50 cursor-not-allowed'
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
            <div className="space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  ¿En qué dispositivos vas a disfrutar Onvivo?
                </h3>
                <p className="text-sm text-[#8B8BA7]">
                  Selecciona las pantallas donde deseas utilizar tu configuración (puedes elegir varias).
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      className={`group cursor-pointer relative p-5 rounded-2xl border transition-all duration-200 flex items-start gap-4 ${
                        isChecked
                          ? 'bg-[#00F0FF]/[0.06] border-[#00F0FF]/50 shadow-[0_0_20px_rgba(0,240,255,0.15)]'
                          : 'bg-white/[0.03] hover:bg-white/[0.06] border-white/[0.08]'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="mt-1 w-5 h-5 rounded border-white/20 text-[#00F0FF] focus:ring-[#00F0FF] bg-[#070A11] cursor-pointer"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className={`text-base font-bold ${isChecked ? 'text-white' : 'text-white/80'}`}>
                            {item.title}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00F0FF]/15 text-[#00F0FF]">
                            {item.tag}
                          </span>
                        </div>
                        <p className="text-xs text-[#8B8BA7] mt-1">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Idiomas para Addons */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  Idiomas de Fuentes y Subtítulos para Addons
                </h3>
                <p className="text-sm text-[#8B8BA7]">
                  Inyectaremos estos idiomas directamente en los manifiestos de Torrentio, Subsense y OpenSubtitles Pro.
                </p>
              </div>

              {/* Badges de selección rápida */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {QUICK_LANGUAGES.map((lang) => {
                  const isSelected = selectedLanguages.includes(lang.value);
                  return (
                    <button
                      key={lang.label}
                      type="button"
                      onClick={() => toggleLanguage(lang.value)}
                      className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#A855F7]/15 border-[#A855F7]/60 text-white shadow-[0_0_20px_rgba(168,85,247,0.2)]'
                          : 'bg-white/[0.03] border-white/[0.08] text-[#8B8BA7] hover:text-white hover:bg-white/[0.06]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{lang.flag}</span>
                        <span className="text-xs sm:text-sm font-semibold">{lang.label}</span>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-[#A855F7] bg-[#A855F7]' : 'border-white/20'}`}>
                        {isSelected && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Entrada de idioma personalizado */}
              <div className="pt-4 border-t border-white/[0.06] space-y-3">
                <label className="block text-xs font-mono text-[#8B8BA7]">
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
                    className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm font-mono focus:outline-none focus:border-[#00F0FF] transition-all"
                  />
                  <button
                    type="button"
                    onClick={addCustomLanguage}
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase font-bold transition-all cursor-pointer"
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
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-xs font-mono">
                <span className="text-[#8B8BA7]">Idiomas a inyectar:</span>
                <span className="text-[#00F0FF] font-bold">{selectedLanguages.join(', ')}</span>
              </div>
            </div>
          )}

          {/* STEP 3: Catálogo & Contenido */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  Prioridad de Catálogo y Addons Especializados
                </h3>
                <p className="text-sm text-[#8B8BA7]">
                  Selecciona los géneros que configuraremos en tu muro y los addons a inyectar.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: 'cinema', title: 'Cine & Estrenos', tag: '1080p Full HD', desc: 'Estrenos recientes, grandes producciones de cartelera y cine independiente.' },
                  { id: 'series', title: 'Series Completas', tag: 'Binge-Watching', desc: 'Temporadas completas, series en emisión y seguimiento de capítulos.' },
                  { id: 'anime', title: 'Anime & Animación (Kitsu)', tag: 'Simulcasts HD', desc: 'Addons Anime Kitsu y Anime Catalogs con estrenos y metadata japonesa.' },
                  { id: 'docu_events', title: 'Documentales & Ciencia', tag: 'Alta Fidelidad', desc: 'Producciones documentales de ciencia, historia, naturaleza y tecnología.' },
                ].map((item) => {
                  const isChecked = genres.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleGenre(item.id)}
                      className={`group cursor-pointer relative p-5 rounded-2xl border transition-all duration-200 flex items-start gap-4 ${
                        isChecked
                          ? 'bg-[#10B981]/[0.06] border-[#10B981]/50 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
                          : 'bg-white/[0.03] hover:bg-white/[0.06] border-white/[0.08]'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="mt-1 w-5 h-5 rounded border-white/20 text-[#10B981] focus:ring-[#10B981] bg-[#070A11] cursor-pointer"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className={`text-base font-bold ${isChecked ? 'text-white' : 'text-white/80'}`}>
                            {item.title}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#10B981]/15 text-[#10B981]">
                            {item.tag}
                          </span>
                        </div>
                        <p className="text-xs text-[#8B8BA7] mt-1">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: Email de Entrega */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  ¿A qué email enviamos tu guía y credenciales?
                </h3>
                <p className="text-sm text-[#8B8BA7]">
                  Tu cuenta preconfigurada y el manual en PDF se despacharán a este correo en menos de 2 minutos tras el pago.
                </p>
              </div>

              <div className="space-y-4">
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
                    className="w-full bg-black/45 border border-white/10 rounded-2xl px-5 py-4 text-white text-base font-mono tracking-wide placeholder:text-white/25 focus:outline-none focus:border-[#00FF85] focus:shadow-[0_0_25px_rgba(0,255,133,0.25)] transition-all"
                  />
                  <Mail className="absolute right-5 top-5 w-5 h-5 text-white/30" />
                </div>

                {!isValidEmail(email) && email.length > 0 && (
                  <p className="text-xs text-[#EC4899] font-mono flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Por favor introduce un formato de email válido (ej: usuario@dominio.com)
                  </p>
                )}

                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-xs text-[#8B8BA7] space-y-1.5">
                  <div className="text-white font-semibold flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-[#10B981]" />
                    Privacidad y Entrega Segura
                  </div>
                  <p>
                    No compartimos tus datos con terceros. Solo usamos tu email para generar tu acceso exclusivo y enviarte la guía de activación.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Resumen & Checkout Polar.sh */}
          {step === 5 && (
            <div className="space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/15 text-[#10B981] text-xs font-mono font-bold uppercase tracking-wider mb-2">
                  ✓ Configuración Lista para Activar
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Tu Arquitectura Onvivo está Lista
                </h3>
                <p className="text-sm text-[#8B8BA7] mt-1">
                  Revisa tu resumen y confirma el pago seguro mediante Polar.sh para recibir tu entrega digital inmediata.
                </p>
              </div>

              {/* Custom Summary Card */}
              <div className="rounded-2xl bg-[#070A11]/90 border border-white/10 p-6 space-y-4 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/[0.08] gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono uppercase text-[#00F0FF] font-semibold">
                        Producto Seleccionado
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30">
                        {orderId}
                      </span>
                    </div>
                    <div className="text-lg font-extrabold text-white">Pack Setup Onvivo Lifetime</div>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="text-2xl font-black text-[#10B981] font-mono">
                      65€ <span className="text-xs text-[#8B8BA7] font-normal">/ 75$</span>
                    </div>
                    <div className="text-[11px] text-[#8B8BA7]">Pago único perpetuo</div>
                  </div>
                </div>

                {/* Dynamic Preferences Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-2 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                    <span className="text-[#8B8BA7] block text-[10px] uppercase">Pantallas</span>
                    <span className="text-[#E2E8FF] font-bold">
                      {devices.map((d) => deviceLabels[d] || d).join(', ')}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                    <span className="text-[#8B8BA7] block text-[10px] uppercase">Idiomas Addons</span>
                    <span className="text-[#E2E8FF] font-bold">{selectedLanguages.join(', ')}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                    <span className="text-[#8B8BA7] block text-[10px] uppercase">Email Entrega</span>
                    <span className="text-[#00F0FF] font-bold truncate block">{email}</span>
                  </div>
                </div>

                {/* Checklist */}
                <div className="space-y-2 pt-2 border-t border-white/[0.06] text-xs text-[#8B8BA7]">
                  <div className="flex items-center gap-2 text-[#E2E8FF]">
                    <span className="text-[#10B981] font-bold">✓</span>
                    <span>7 Addons sincronizados con inyección de tus idiomas seleccionados</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#E2E8FF]">
                    <span className="text-[#10B981] font-bold">✓</span>
                    <span>Optimización Anti-Buffering 1080p Full HD garantizada</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#E2E8FF]">
                    <span className="text-[#10B981] font-bold">✓</span>
                    <span>Guía Visual Interactiva en PDF paso a paso</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#E2E8FF]">
                    <span className="text-[#10B981] font-bold">✓</span>
                    <span>Despacho automático por correo en menos de 60 segundos tras el pago</span>
                  </div>
                </div>
              </div>

              {/* Checkout Action Button */}
              <div className="pt-2 flex flex-col items-center gap-3">
                <button
                  type="button"
                  onClick={handlePolarCheckout}
                  disabled={isSubmitting}
                  className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-[#00F0FF] via-[#A855F7] to-[#EC4899] text-[#0B0F19] font-extrabold text-base sm:text-lg uppercase tracking-wider text-center shadow-[0_0_35px_rgba(0,240,255,0.4)] hover:shadow-[0_0_55px_rgba(0,240,255,0.7)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Conectando con Pasarela Polar...</span>
                    </>
                  ) : (
                    <>
                      <span>Proceder al Pago Seguro — 65€</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
                <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-[#8B8BA7]">
                  <span className="flex items-center gap-1">🔒 Checkout Seguro Polar.sh</span>
                  <span>•</span>
                  <span>💳 Apple Pay, Google Pay y Tarjeta</span>
                  <span>•</span>
                  <span>⚡ Despacho automático digital</span>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Control Buttons */}
          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="px-5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/10 text-xs sm:text-sm font-semibold text-white border border-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
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
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#A855F7] text-[#0B0F19] text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span>Siguiente Paso</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Globe, Mic, Tv, Mail, CheckCircle, ArrowRight, ArrowLeft, Type, 
  AlertTriangle, Terminal, ArrowUpRight, ShieldCheck 
} from 'lucide-react';

interface CheckoutWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

const LANGUAGE_OPTIONS = ['Inglés', 'Español', 'Francés', 'Italiano', 'Otro'];

export default function CheckoutWizard({ isOpen, onClose }: CheckoutWizardProps) {
  const [step, setStep] = useState(0);
  const [preferences, setPreferences] = useState({
    language: '',
    audio: '',
    audioCustom: '',
    subtitles: '',
    subtitlesCustom: '',
    anime: null as boolean | null,
    email: '',
  });

  const updatePreference = (key: keyof typeof preferences, value: any) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 6));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Configuración de Lemon Squeezy y estado de pasarela
  const productUrl = import.meta.env.VITE_LEMON_SQUEEZY_PRODUCT_URL || 'https://onvivo.lemonsqueezy.com/buy/tu-producto-id';
  // Si la URL tiene el ID por defecto o si está explícitamente inactivo, asumimos que no está activo
  const isLemonActive = import.meta.env.VITE_LEMON_SQUEEZY_ACTIVE === 'true' && !productUrl.includes('tu-producto-id');

  const finalAudio = preferences.audio === 'Otro' ? preferences.audioCustom : preferences.audio;
  const finalSubtitles = preferences.subtitles === 'Otro' ? preferences.subtitlesCustom : preferences.subtitles;

  // Generación de URL de fallback hacia Telegram con Deep Linking de preferencias
  const getTelegramFallbackUrl = () => {
    const langCode = preferences.language.substring(0, 3).toLowerCase();
    const audioCode = finalAudio.substring(0, 3).toLowerCase();
    const subCode = finalSubtitles.substring(0, 3).toLowerCase();
    const animeVal = preferences.anime ? '1' : '0';
    const emailSanitized = encodeURIComponent(preferences.email)
      .replace(/[@.]/g, '_')
      .substring(0, 15);
    
    // El payload no debe exceder los 64 caracteres permitidos por Telegram para start parameter
    const startParam = `web_${langCode}_${audioCode}_${subCode}_${animeVal}_${emailSanitized}`;
    return `https://t.me/onvivo_bot?start=${startParam}`;
  };

  const handleCheckout = () => {
    if (window.LemonSqueezy) {
      window.LemonSqueezy.Setup({
        checkoutData: {
          email: preferences.email,
          custom: {
            language: preferences.language,
            audio: finalAudio,
            subtitles: finalSubtitles,
            anime: preferences.anime ? 'yes' : 'no'
          }
        }
      });
      window.LemonSqueezy.Url.Open(productUrl);
    } else {
      window.open(productUrl, '_blank');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-xl"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative w-full max-w-lg bg-[#07070a] border border-white/10 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        >
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-white/5">
            <motion.div
              className="h-full bg-brand-primary"
              initial={{ width: '0%' }}
              animate={{ width: `${((step + 1) / 7) * 100}%` }}
              transition={{ ease: 'easeInOut' }}
            />
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors z-10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-8 pt-12">
            <AnimatePresence mode="wait">
              {/* STEP 0: LANGUAGE */}
              {step === 0 && (
                <motion.div
                  key="step0"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center space-y-2">
                    <Globe className="w-10 h-10 text-brand-primary mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-white">Idioma de la Interfaz</h2>
                    <p className="text-white/60">¿En qué idioma prefieres tu plataforma?</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {['Español', 'Inglés', 'Portugués', 'Francés'].map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          updatePreference('language', lang);
                          nextStep();
                        }}
                        className={`p-4 rounded-xl border transition-all cursor-pointer ${
                          preferences.language === lang
                            ? 'bg-brand-primary/20 border-brand-primary text-brand-primary'
                            : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 1: MOVIE AUDIO */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center space-y-2">
                    <Mic className="w-10 h-10 text-brand-primary mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-white">Audio de Película</h2>
                    <p className="text-white/60">¿En qué idioma prefieres escuchar por defecto?</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {LANGUAGE_OPTIONS.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          updatePreference('audio', lang);
                          if (lang !== 'Otro') {
                            updatePreference('audioCustom', '');
                            nextStep();
                          }
                        }}
                        className={`p-4 rounded-xl border transition-all cursor-pointer ${
                          preferences.audio === lang
                            ? 'bg-brand-primary/20 border-brand-primary text-brand-primary'
                            : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                  
                  {preferences.audio === 'Otro' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-4 pt-2"
                    >
                      <input
                        type="text"
                        value={preferences.audioCustom}
                        onChange={(e) => updatePreference('audioCustom', e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && preferences.audioCustom.trim() !== '') {
                            nextStep();
                          }
                        }}
                        placeholder="Escribe el idioma..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all"
                        autoFocus
                      />
                      <button
                        onClick={nextStep}
                        disabled={preferences.audioCustom.trim() === ''}
                        className="w-full bg-brand-primary/20 text-brand-primary border border-brand-primary/50 font-semibold py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-primary hover:text-black transition-all cursor-pointer"
                      >
                        Confirmar
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* STEP 2: SUBTITLES */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center space-y-2">
                    <Type className="w-10 h-10 text-brand-primary mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-white">Idioma de Subtítulos</h2>
                    <p className="text-white/60">¿En qué idioma quieres leer los subtítulos?</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {LANGUAGE_OPTIONS.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          updatePreference('subtitles', lang);
                          if (lang !== 'Otro') {
                            updatePreference('subtitlesCustom', '');
                            nextStep();
                          }
                        }}
                        className={`p-4 rounded-xl border transition-all cursor-pointer ${
                          preferences.subtitles === lang
                            ? 'bg-brand-primary/20 border-brand-primary text-brand-primary'
                            : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>

                  {preferences.subtitles === 'Otro' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-4 pt-2"
                    >
                      <input
                        type="text"
                        value={preferences.subtitlesCustom}
                        onChange={(e) => updatePreference('subtitlesCustom', e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && preferences.subtitlesCustom.trim() !== '') {
                            nextStep();
                          }
                        }}
                        placeholder="Escribe el idioma..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all"
                        autoFocus
                      />
                      <button
                        onClick={nextStep}
                        disabled={preferences.subtitlesCustom.trim() === ''}
                        className="w-full bg-brand-primary/20 text-brand-primary border border-brand-primary/50 font-semibold py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-primary hover:text-black transition-all cursor-pointer"
                      >
                        Confirmar
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* STEP 3: ANIME */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center space-y-2">
                    <Tv className="w-10 h-10 text-brand-primary mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-white">¿Eres fan del Anime?</h2>
                    <p className="text-white/60">Podemos incluir catálogos especializados de animación japonesa para ti.</p>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    <button
                      onClick={() => {
                        updatePreference('anime', true);
                        nextStep();
                      }}
                      className="p-4 rounded-xl border bg-white/5 border-white/10 text-white hover:bg-brand-primary/20 hover:border-brand-primary transition-all text-left cursor-pointer"
                    >
                      <div className="font-medium">Sí, incluir Anime</div>
                      <div className="text-sm text-white/50">Series, películas y novedades</div>
                    </button>
                    <button
                      onClick={() => {
                        updatePreference('anime', false);
                        nextStep();
                      }}
                      className="p-4 rounded-xl border bg-white/5 border-white/10 text-white hover:bg-white/10 transition-all text-left cursor-pointer"
                    >
                      <div className="font-medium">No, gracias</div>
                      <div className="text-sm text-white/50">Solo cine y series estándar</div>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: EMAIL */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center space-y-2">
                    <Mail className="w-10 h-10 text-brand-primary mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-white">Tu Email</h2>
                    <p className="text-white/60">¿A qué email enviamos tu guía y credenciales?</p>
                  </div>
                  <div className="space-y-4">
                    <input
                      type="email"
                      value={preferences.email}
                      onChange={(e) => updatePreference('email', e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && isValidEmail(preferences.email)) {
                          nextStep();
                        }
                      }}
                      placeholder="tu@email.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all"
                      autoFocus
                    />
                    <button
                      onClick={nextStep}
                      disabled={!isValidEmail(preferences.email)}
                      className="w-full bg-brand-primary text-black font-semibold py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-primary/90 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Continuar <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 5: SUMMARY & CHECKOUT */}
              {step === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center space-y-2">
                    <CheckCircle className="w-10 h-10 text-brand-primary mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-white">Todo Listo</h2>
                    <p className="text-white/60">Revisa tu configuración y procede al pago.</p>
                  </div>
                  
                  <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">Interfaz:</span>
                      <span className="text-white font-medium">{preferences.language || '-'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">Audio:</span>
                      <span className="text-white font-medium">
                        {finalAudio || '-'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">Subtítulos:</span>
                      <span className="text-white font-medium">
                        {finalSubtitles || '-'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">Anime:</span>
                      <span className="text-white font-medium">{preferences.anime ? 'Incluido' : 'No incluido'}</span>
                    </div>
                    <div className="flex justify-between text-sm pt-2 border-t border-white/10 mt-2">
                      <span className="text-white/50">Entrega:</span>
                      <span className="text-white font-medium text-right break-all">{preferences.email}</span>
                    </div>
                  </div>

                  {isLemonActive ? (
                    <button
                      onClick={handleCheckout}
                      className="w-full bg-brand-primary text-black font-bold py-4 rounded-xl hover:bg-brand-primary/90 transition-all flex items-center justify-center gap-2 text-lg shadow-[0_0_20px_rgba(0,240,255,0.3)] cursor-pointer"
                    >
                      Finalizar y Pagar
                    </button>
                  ) : (
                    <div className="space-y-4">
                      {/* Banner de Contingencia para Lemon Squeezy Inactivo */}
                      <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 backdrop-blur-lg flex gap-3 text-left">
                        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">Mantenimiento de Pasarela Directa</h4>
                          <p className="text-[11px] text-white/70 leading-normal">
                            Nuestra pasarela directa de tarjetas web está en mantenimiento por verificación. 
                            <strong> Puedes completar tu compra inmediatamente vía Telegram y obtener un 10% de descuento directo</strong>, preservando todas tus preferencias seleccionadas.
                          </p>
                        </div>
                      </div>

                      {/* Botón Principal: Fallback a Telegram */}
                      <a
                        href={getTelegramFallbackUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-[#0088cc] hover:bg-[#0077b5] text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-base shadow-[0_0_20px_rgba(0,136,204,0.3)]"
                      >
                        Comprar en Telegram con Preferencias
                        <ArrowUpRight className="w-4 h-4" />
                      </a>

                      {/* Botón de Simulación para Entorno de Desarrollo */}
                      {import.meta.env.DEV && (
                        <button
                          onClick={() => setStep(6)}
                          className="w-full bg-transparent hover:bg-brand-primary/10 border border-brand-primary/40 text-brand-primary font-mono text-xs py-2 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Terminal className="w-3.5 h-3.5" />
                          Simular Pago Exitoso (Dev Mode)
                        </button>
                      )}
                    </div>
                  )}
                </motion.div>
              )}

              {/* STEP 6: SIMULATED SUCCESS (Dev Mode Only) */}
              {step === 6 && (
                <motion.div
                  key="step6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="space-y-6 text-center"
                >
                  <div className="w-16 h-16 bg-brand-primary/20 text-brand-primary rounded-full flex items-center justify-center mx-auto animate-pulse">
                    <ShieldCheck className="w-10 h-10" />
                  </div>
                  
                  <div className="space-y-2">
                    <h2 className="text-2xl font-black text-brand-primary uppercase tracking-wider">¡Simulación Exitosa!</h2>
                    <p className="text-white/60 text-sm max-w-sm mx-auto">
                      Has completado el flujo de configuración. A continuación se detalla el payload que sería procesado por el webhook en producción:
                    </p>
                  </div>

                  {/* Terminal de visualización de datos */}
                  <div className="bg-black/80 border border-white/10 rounded-xl p-4 font-mono text-[11px] text-left text-cyan-400 overflow-x-auto max-h-48">
                    <div className="text-white/30 border-b border-white/5 pb-2 mb-2 flex justify-between items-center">
                      <span>onvivo-system-payload.json</span>
                      <span className="text-[9px] bg-brand-primary/10 text-brand-primary px-1.5 py-0.5 rounded">LOCAL_MOCK</span>
                    </div>
                    <pre>{JSON.stringify({
                      email: preferences.email,
                      language: preferences.language,
                      audio: finalAudio,
                      subtitles: finalSubtitles,
                      anime: preferences.anime ? "yes" : "no",
                      status: "PAID",
                      channel: "web_checkout_fallback",
                      createdAt: new Date().toISOString(),
                      metadata: {
                        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent.substring(0, 30) : 'unknown',
                        environment: 'development'
                      }
                    }, null, 2)}</pre>
                  </div>

                  <div className="p-3 bg-white/5 rounded-xl text-[10px] text-white/50 leading-relaxed text-left border border-white/5">
                    💡 **Próximo Paso Backend:** En producción, el webhook de Lemon Squeezy captura el evento `order_created` y escribe este JSON en la colección `orders` de Firestore, lo que activa el *Engineer Agent* de manera autónoma.
                  </div>

                  <button
                    onClick={onClose}
                    className="w-full bg-brand-primary text-black font-bold py-3 rounded-xl hover:bg-brand-primary/90 transition-all cursor-pointer"
                  >
                    Cerrar y Volver a la Landing
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Navigation */}
          {step > 0 && step < 6 && (
            <div className="px-8 pb-8 pt-4 border-t border-white/5">
              <button
                onClick={prevStep}
                className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Volver atrás
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

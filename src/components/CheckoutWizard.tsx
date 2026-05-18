import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Globe, Mic, Tv, Mail, CheckCircle, ArrowRight, ArrowLeft, Type } from 'lucide-react';

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

  const nextStep = () => setStep((s) => Math.min(s + 1, 5));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const handleCheckout = () => {
    // URL placeholder para Lemon Squeezy
    const productUrl = 'https://onvivo.lemonsqueezy.com/buy/tu-producto-id';
    
    // Resolve final values
    const finalAudio = preferences.audio === 'Otro' ? preferences.audioCustom : preferences.audio;
    const finalSubtitles = preferences.subtitles === 'Otro' ? preferences.subtitlesCustom : preferences.subtitles;

    // Configurar custom data de Lemon Squeezy
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
      // Fallback if SDK failed to load
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
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        >
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-white/5">
            <motion.div
              className="h-full bg-brand-primary"
              initial={{ width: '0%' }}
              animate={{ width: `${((step + 1) / 6) * 100}%` }}
              transition={{ ease: 'easeInOut' }}
            />
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors z-10"
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
                        className={`p-4 rounded-xl border transition-all ${
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
                        className={`p-4 rounded-xl border transition-all ${
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
                        placeholder="Escribe el idioma..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all"
                      />
                      <button
                        onClick={nextStep}
                        disabled={preferences.audioCustom.trim() === ''}
                        className="w-full bg-brand-primary/20 text-brand-primary border border-brand-primary/50 font-semibold py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-primary hover:text-black transition-all"
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
                        className={`p-4 rounded-xl border transition-all ${
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
                        placeholder="Escribe el idioma..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all"
                      />
                      <button
                        onClick={nextStep}
                        disabled={preferences.subtitlesCustom.trim() === ''}
                        className="w-full bg-brand-primary/20 text-brand-primary border border-brand-primary/50 font-semibold py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-primary hover:text-black transition-all"
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
                      className="p-4 rounded-xl border bg-white/5 border-white/10 text-white hover:bg-brand-primary/20 hover:border-brand-primary transition-all text-left"
                    >
                      <div className="font-medium">Sí, incluir Anime</div>
                      <div className="text-sm text-white/50">Series, películas y novedades</div>
                    </button>
                    <button
                      onClick={() => {
                        updatePreference('anime', false);
                        nextStep();
                      }}
                      className="p-4 rounded-xl border bg-white/5 border-white/10 text-white hover:bg-white/10 transition-all text-left"
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
                      placeholder="tu@email.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all"
                    />
                    <button
                      onClick={nextStep}
                      disabled={!preferences.email.includes('@')}
                      className="w-full bg-brand-primary text-black font-semibold py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-primary/90 transition-all flex items-center justify-center gap-2"
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
                        {preferences.audio === 'Otro' ? preferences.audioCustom : preferences.audio || '-'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">Subtítulos:</span>
                      <span className="text-white font-medium">
                        {preferences.subtitles === 'Otro' ? preferences.subtitlesCustom : preferences.subtitles || '-'}
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

                  <button
                    onClick={handleCheckout}
                    className="w-full bg-brand-primary text-black font-bold py-4 rounded-xl hover:bg-brand-primary/90 transition-all flex items-center justify-center gap-2 text-lg shadow-[0_0_20px_rgba(var(--brand-primary-rgb),0.3)]"
                  >
                    Finalizar y Pagar
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Navigation */}
          {step > 0 && (
            <div className="px-8 pb-8 pt-4 border-t border-white/5">
              <button
                onClick={prevStep}
                className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm"
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

# Onvivo Web Checkout & Configuration Wizard

## Objetivo
Mover el flujo de configuración de preferencias y pago desde el Bot de Telegram directamente a la landing page web de Onvivo. Se utilizará Lemon Squeezy como pasarela de pago principal mediante un Overlay Checkout.

## Arquitectura y Flujo de Usuario
1. **Punto de Entrada:** Se añadirá un nuevo Call-to-Action (CTA) en la web (ej. "Comprar ahora"). **Nota Importante:** El CTA existente que redirige al Bot de Telegram NO se eliminará; ambos coexistirán dando al usuario dos opciones.
2. **Modal Concierge:** Se abre un modal superpuesto (Glassmorphism) con un flujo de configuración de 5 pasos.
3. **Captura de Datos:** El frontend (React) guarda las opciones seleccionadas en un estado local.
4. **Checkout Overlay:** En el último paso, se invoca el SDK de Lemon Squeezy para abrir el overlay de pago.
5. **Transmisión de Metadatos:** Las preferencias seleccionadas y el email se enviarán a Lemon Squeezy a través del parámetro `checkout_data.custom` o pasándolo directamente en el enlace de checkout, para que queden registradas en el webhook de pago.

## Detalles del Componente (Modal Wizard)

### Estética Visual
- **Fondo:** Overlay oscuro con `backdrop-blur-xl`.
- **Contenedor:** Bordes redondeados (`rounded-3xl`), sombras suaves, y estilo glassmorphism.
- **Animaciones:** Transiciones suaves de deslizamiento lateral usando `framer-motion` (ej. `AnimatePresence` y animaciones de `slide/fade`).
- **Navegación:** Barra de progreso superior delgada. Botones "Siguiente", "Atrás" y "Cerrar".

### Pasos (Steps)
1. **Idioma de la Interfaz:**
   - Pregunta: "¿En qué idioma prefieres que configuremos tu plataforma?"
   - Opciones: Español, Inglés, Portugués, Francés.
2. **Preferencias de Audio y Subtítulos:**
   - Pregunta: "Prioridad de audio y subtítulos"
   - Opciones: "Audio Original + Subtítulos", "Doblaje al Español", "Personalizado".
3. **Catálogo de Anime:**
   - Pregunta: "¿Eres fan del Anime? Podemos incluir catálogos especializados."
   - Opciones: "Sí, incluir Anime", "No, solo cine y series estándar".
4. **Email de Entrega:**
   - Pregunta: "¿A qué email enviamos tu guía de acceso y credenciales?"
   - Input: Campo validado de texto electrónico.
5. **Resumen y Checkout:**
   - Vista: Muestra un listado con las preferencias elegidas (Idioma, Audio, Anime, Email).
   - Acción principal: Botón "Finalizar y Pagar". Al hacer clic, se ejecuta el script de Lemon Squeezy para abrir el overlay.

## Integración Lemon Squeezy
- Se añadirá el script global de Lemon Squeezy (`lemon.js`) en el `index.html`.
- El botón final del Modal llamará a la función de Lemon Squeezy para abrir el link del producto (el Product Link se proveerá en el archivo `.env`), pasando el email pre-rellenado y los custom data en la URL o mediante la configuración del SDK.

## Pendientes Fuera del Scope Actual (Fase 2)
- El manejo del Webhook en el backend (ej. Firebase Cloud Functions) que recibe la confirmación de pago de Lemon Squeezy y gatilla al *Engineer Agent* para crear la cuenta. Por ahora, nos enfocamos 100% en el frontend.

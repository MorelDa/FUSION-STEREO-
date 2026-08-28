# FUSIÓN STEREO — Emisora Virtual

Proyecto adaptado desde el ZIP original para:

**Fusión Stereo — Emisora Virtual**  
**Señal desde Medellín, Colombia**

## Configuración
- Logo: https://i.ibb.co/XZ9GtdfS/Proyecto-nuevo.webp
- Streaming: https://radios.voiparkas.com/listen/fusionstereo/radio.mp3
- Instagram: https://www.instagram.com/emisorafusionstereo
- WhatsApp: +57 311 767 9576

## Cambios realizados
- Se reemplazaron todos los textos, metadatos, manifest y referencias de la radio anterior.
- Favicon, iconos PWA, portada, avatar y metadatos sociales usan el logo de Fusión Stereo.
- Colores adaptados al morado del logo.
- Botón central Play/Pausa en el color de marca.
- Se restauró el vinilo giratorio del proyecto original: gira detrás de la portada al reproducir y se detiene al pausar.
- Onda visual en blanco.
- Solo botones sociales de Instagram y WhatsApp.
- Se eliminó el análisis Web Audio del proyecto original para evitar problemas de CORS que pueden afectar la reproducción.
- Se añadió reconexión automática ante `waiting`, `stalled`, `error` y `ended`.
- Se añadió un heartbeat que detecta cuando el stream deja de avanzar y fuerza una reconexión.
- El Service Worker ya NO cachea streams MP3 ni recursos externos, evitando que una caché pueda congelar la señal.
- Se mantiene la PWA instalable.

## Publicación
Sube `index.html`, `manifest.webmanifest` y `service-worker.js` a la raíz de GitHub Pages o a cualquier hosting HTTPS.

Después de actualizar el proyecto, si el navegador conserva una versión antigua, abre el sitio en una ventana privada o borra los datos del sitio una vez para que entre `fusion-stereo-v2`.

- Diseño visual ajustado fielmente a la referencia suministrada: vinilo, portada superpuesta, barra inferior, botones circulares y distribución.

- Botón Compartir añadido con Web Share API y copia de enlace como respaldo.
- La onda intenta analizar las frecuencias reales del stream para moverse al ritmo de la música; si el servidor no permite CORS, usa un modo visual de respaldo sin afectar el audio.

RADIO FUSIÓN STEREO — PWA

Archivos:
- index.html: aplicación principal
- manifest.json: manifiesto PWA
- service-worker.js: service worker
- favicon.svg: favicon local

IMPORTANTE:
1. Sube los cuatro archivos a la misma carpeta del servidor.
2. La PWA debe servirse por HTTPS (GitHub Pages, Netlify, Vercel, etc.).
3. El audio en vivo se conserva apuntando a:
   https://radios.voiparkas.com/listen/fusionstereo/radio.mp3
4. El Wave Audio y su lógica original no se han modificado.
5. El botón Compartir usa Web Share API cuando está disponible y copia el enlace como alternativa.
6. El botón Instalar App usa beforeinstallprompt en navegadores compatibles.

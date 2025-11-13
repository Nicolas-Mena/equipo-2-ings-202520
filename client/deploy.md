# Deploy del cliente (static site)

Este archivo explica cómo desplegar la parte cliente (frontend) de la aplicación.

Requisitos
- Node.js instalado (opcional si usas la CI)
- Tener acceso al servicio de hosting (p. ej. Render) y las credenciales necesarias.

1) Probar localmente

- Instalar dependencias (si `client/package.json` existe):

```powershell
cd client
npm install
```

- Probar en desarrollo (opcional):

```powershell
npx live-server --port=5000
# o, si está configurado en package.json
npm run dev
```

2) Construir para producción (si aplica)

Si tu cliente tiene un paso de build (por ejemplo React/Vite), ejecuta:

```powershell
cd client
npm run build
```

3) Desplegar en Render (GUI)

- Crear un nuevo servicio Static Site en Render apuntando al repositorio y al directorio `client`.
- Configura la ruta de build si usas `npm run build`.
- Si quieres que el cliente apunte al servidor desplegado en Render, añade en `client/index.html` o mediante la configuración del host la variable `window.__API_URL__ = 'https://<tu-backend>'` o deja la URL por defecto en `client/api.js`.

4) Desplegar desde CI (GitHub Actions)

Este repo tiene workflows de GitHub Actions que pueden disparar el redeploy en Render automáticamente cuando se hace push a las ramas configuradas (requieren secrets en GitHub):

- `RENDER_API_KEY` – API key desde Render (en Settings → API Keys).
- `RENDER_CLIENT_SERVICE_ID` – ID del servicio Render asociado al cliente (lo encuentras en la URL del servicio o en la dashboard).

Con esos secretos configurados, el workflow `deploy-main.yml` o `deploy-branches.yml` puede disparar un deploy automático.

5) Notas
- Si sirves el cliente como site estático, asegúrate de que `API_URL` en `client/api.js` apunte a tu backend desplegado.

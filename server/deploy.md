# Deploy del servidor (backend)

Guía paso a paso para desplegar la parte servidor del proyecto.

Requisitos
- Node.js 18+ (o la versión que uses en producción)
- Variables de entorno obligatorias en el entorno de despliegue:
  - SUPABASE_URL
  - SUPABASE_KEY

1) Probar localmente

```powershell
cd server
npm install
node app.js
```

2) Variables de entorno en producción

Añade en tu proveedor de hosting (Render/Heroku/VPS) las variables:

- SUPABASE_URL = https://xxx.supabase.co
- SUPABASE_KEY = <service-role-key-o-api-key>

3) Migrar contraseñas (opcional)

Si las contraseñas de `eps` no están hasheadas, corre el script de migración (si corresponde):

```powershell
# Establece las variables de entorno necesarias en tu shell o en la configuración del servicio
$env:SUPABASE_URL = 'https://...'
$env:SUPABASE_KEY = '...'
node migrarPasswords.js
```

4) Desplegar en Render (GUI)

- Crear un nuevo servicio Web Service en Render apuntando al `server` como Root Directory.
- Build & Start commands si tu servicio lo requiere:
  - Build: `cd server && npm install`
  - Start: `cd server && npm start` (o `node app.js`)

5) Desplegar desde CI (GitHub Actions)

- Secrets requeridos para la acción de deploy automática:
  - `RENDER_API_KEY`
  - `RENDER_SERVER_SERVICE_ID`

La GitHub Action en este repo usa la API de Render para forzar un deploy cuando hagas push a las ramas configuradas (main / stage / development) si los secrets están presentes.

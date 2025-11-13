
# Client deployment (static site)

This document explains how to deploy the client (frontend) of the application.

Prerequisites
- Node.js installed (optional if you use CI)
- Access to a hosting service (e.g. Render) and the required credentials

1) Test locally

- Install dependencies (if `client/package.json` exists):

```powershell
cd client
npm install
```

- Start a quick dev server (optional):

```powershell
npx live-server --port=5000
# or, if configured in package.json
npm run dev
```

2) Build for production (if applicable)

If your client requires a build step (React, Vite, etc.), run:

```powershell
cd client
npm run build
```

3) Deploy to Render (GUI)

- Create a new Static Site or Web Service in Render and point it to the repository's `client` directory.
- Configure the build command and publish directory if your project has a build step.
- To point the client at your deployed backend, set `window.__API_URL__ = 'https://<your-backend>'` in `client/index.html`, or ensure `client/api.js` contains the correct API URL.

4) Deploy from CI (GitHub Actions)

This repository includes GitHub Actions workflows that can trigger a redeploy on Render automatically when you push to configured branches. The workflows require GitHub Secrets:

- `RENDER_API_KEY` – Render API key (Settings → API Keys)
- `RENDER_CLIENT_SERVICE_ID` – Render service ID for the client site

With those secrets set, the `deploy-main.yml` or `deploy-branches.yml` workflows can trigger an automatic deploy.

5) Notes
- If you host the client as a static site, make sure the `API_URL` in `client/api.js` points to your deployed backend.

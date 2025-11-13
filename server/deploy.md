# Server deployment (backend)

Step-by-step guide to deploy the server part of the project.

Prerequisites
- Node.js 18+ (or the version you use in production)
- Required environment variables in the deployment environment:
  - SUPABASE_URL
  - SUPABASE_KEY

1) Test locally

```powershell
cd server
npm install
node app.js
```

2) Environment variables in production

Add the following variables in your hosting provider (Render/Heroku/VPS):

- SUPABASE_URL = https://xxx.supabase.co
- SUPABASE_KEY = <service-role-key-or-api-key>

3) Password migration (optional)

If `eps` passwords are not hashed, run the migration script (if applicable):

```powershell
# Set the required env vars in your shell or service configuration
$env:SUPABASE_URL = 'https://...'
$env:SUPABASE_KEY = '...'
node migrarPasswords.js
```

4) Deploy to Render (GUI)

- Create a new Web Service in Render and set the Root Directory to `server`.
- Build & Start commands (if required):
  - Build: `cd server && npm install`
  - Start: `cd server && npm start` (or `node app.js`)

5) Deploy from CI (GitHub Actions)

- Secrets required for the automated deploy action:
  - `RENDER_API_KEY`
  - `RENDER_SERVER_SERVICE_ID`

The GitHub Action in this repository uses the Render API to trigger a deploy when you push to configured branches (main / stage / development) if the secrets are present.

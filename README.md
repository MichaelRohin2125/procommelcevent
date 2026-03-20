# ProComm Literary Site

Frontend: React + Vite

Backend: Express + MySQL

Deployment target: Netlify (frontend + backend via Netlify Functions)

## Local Development

1. Install frontend dependencies:

```bash
npm install
```

2. Install backend dependencies (server folder):

```bash
cd server
npm install
```

3. Start backend:

```bash
cd server
npm run dev
```

4. Start frontend in another terminal:

```bash
npm run dev
```

By default, frontend uses `http://localhost:5000` in development.

## Netlify Full-Stack Deployment

This repository now includes:

- `netlify.toml` for build + redirects
- `netlify/functions/api.js` as the serverless backend entry point

### 1. Push to GitHub

Push this project to a GitHub repository.

### 2. Create Netlify Site

1. Netlify Dashboard -> Add new site -> Import from Git
2. Select this repository
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

These values are already present in `netlify.toml`, so Netlify can auto-detect them.

### 3. Set Environment Variables in Netlify

In Netlify -> Site settings -> Environment variables, add:

- `DB_HOST`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `JWT_SECRET`
- `ADMIN_PASSWORD`

Optional:

- `VITE_API_BASE_URL`

For Netlify full-stack deployment, keep `VITE_API_BASE_URL` empty or unset so frontend calls `/api/*` on the same domain.

### 4. Use a Cloud MySQL Database

Netlify Functions cannot access your local MySQL instance. Use a hosted MySQL DB (for example: Aiven, Railway MySQL, PlanetScale, or your cloud VM MySQL) and set its connection values in Netlify env vars.

### 5. Deploy

Trigger deploy from Netlify UI or by pushing commits. After deploy:

- Frontend served from Netlify static hosting
- Backend served from Netlify Function at `/api/*`

## API Routing

`netlify.toml` rewrites:

- `/api/*` -> `/.netlify/functions/api/:splat`
- `/*` -> `/index.html` (for React Router SPA routes)

## Notes

- `server/server.js` now starts the HTTP listener only when run directly, so it works both for local server mode and serverless import mode.
- Admin and registration pages now use environment-aware API base URLs.

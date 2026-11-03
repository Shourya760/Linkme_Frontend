# LinkMe frontend

React/Vite frontend for LinkMe. Authentication and profile data use the API through `src/api/axios.js` and the service modules.

## Local development

```sh
npm ci
npm run dev
```

Vite proxies `/api` requests to the local backend at `http://localhost:3000`.

## Production

Set `VITE_API_URL` to the deployed API origin with `/api` appended. Netlify builds this app with `npm run build` and publishes `dist`. After changing `VITE_API_URL`, trigger a new deployment because Vite embeds it at build time.

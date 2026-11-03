# LinkMe frontend

React and Vite client for LinkMe. Deployment instructions for the full application are in the repository [README](../README.md).

## Local development

From the repository root, install dependencies and start both client and API:

```sh
npm --prefix Backend install
npm --prefix Frontend install
npm run dev
```

The client runs at `http://localhost:5173` and proxies `/api` to the local API at `http://localhost:3000`.

## Production build

Set `VITE_API_BASE_URL` to the deployed API base URL, including `/api` (for example `https://linkme-api.onrender.com/api`). Optionally set `VITE_PUBLIC_URL` to the public frontend origin. These are build-time Vite variables, so rebuild and redeploy after changing them.

```sh
npm ci
npm run lint
npm run build
```

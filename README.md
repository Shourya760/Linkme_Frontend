# LinkMe

Static React and Vite portfolio editor. It uses browser `localStorage` for profile data and needs no backend or API environment variables.

## Run locally

```sh
npm ci
npm run dev
```

## Deploy

Deploy the `Frontend` directory as a static Vite app. Use `npm ci` to install dependencies and `npm run build` to create `dist`. Configure the host to rewrite app routes to `index.html` for React Router. No API URL or secrets are required.

Profiles and uploaded images are stored only in the current browser. Sharing a URL does not transfer the saved profile to another device or visitor.

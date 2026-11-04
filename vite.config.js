import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      ...Object.fromEntries(
        ['/login', '/register', '/logout', '/account', '/upload', '/me', '/public', '/health'].map((path) => [path, {
          target: 'http://localhost:3000',
          changeOrigin: true,
          bypass: (request) => request.headers.accept?.includes('text/html') ? request.url : undefined,
        }]),
      ),
    },
  },
});

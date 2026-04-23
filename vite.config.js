import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Load env vars from .env files — makes VITE_* vars available at build time
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    build: {
      outDir: 'dist',
      // Reduce bundle noise for production
      reportCompressedSize: false,
    },
    // Expose backend URL to the app at build time.
    // Set VITE_LIFEOS_API_URL in Vercel environment variables to point at your Railway backend.
    define: {
      'import.meta.env.VITE_LIFEOS_API_URL': JSON.stringify(env.VITE_LIFEOS_API_URL || ''),
    },
    server: {
      // Local dev: proxy /api/* to the backend so you don't need CORS during development
      proxy: env.VITE_LIFEOS_API_URL ? {} : {
        '/api': { target: 'http://localhost:3000', changeOrigin: true },
        '/health': { target: 'http://localhost:3000', changeOrigin: true },
      },
    },
  }
})

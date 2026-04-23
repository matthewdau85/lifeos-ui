import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './LifeOS_UI.jsx'

// Inject backend URL from Vite env var so the app knows where to send API calls.
// VITE_LIFEOS_API_URL is set in Vercel dashboard → Settings → Environment Variables.
// Falls back to localhost:3000 for local development.
if (import.meta.env.VITE_LIFEOS_API_URL) {
  window.LIFEOS_API_URL = import.meta.env.VITE_LIFEOS_API_URL
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)

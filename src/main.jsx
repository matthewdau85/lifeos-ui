import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './LifeOS_UI.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)

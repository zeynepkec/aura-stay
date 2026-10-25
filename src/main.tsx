import '@fontsource-variable/commissioner'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import './i18n'
import { startSync } from './lib/sync'

// Veritabanı bağlıysa kayıtları indir ve canlı değişiklikleri dinle
void startSync()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

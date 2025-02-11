import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Head from './components/head/index.jsx'
import Footer from './components/footer/index.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Head />
    <App />
    <Footer />
  </StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'

// Fix for WebGPU compatibility issue in Firefox/Linux
// Prevent WebGPU initialization errors by ensuring WebGPU is unavailable
// This forces Three.js to use WebGL renderer instead
if (typeof window !== 'undefined') {
  // Polyfill GPUShaderStage to prevent Three.js WebGPU errors
  if (typeof window.GPUShaderStage === 'undefined') {
    window.GPUShaderStage = {
      VERTEX: 1,
      FRAGMENT: 2,
      COMPUTE: 4
    };
  }
  
  // Force WebGL by making WebGPU unavailable
  if (typeof window.navigator !== 'undefined' && typeof window.navigator.gpu === 'undefined') {
    Object.defineProperty(window.navigator, 'gpu', {
      get: () => undefined,
      configurable: true
    });
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)


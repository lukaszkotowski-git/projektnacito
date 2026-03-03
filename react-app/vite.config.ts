import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  // Load .env from the repository root during development/build so react-app can pick up variables
  // placed in the project parent folder (e.g. ../.env).

  envDir: resolve(__dirname, '..'),
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    },
    // Allow Vite dev server to access files in parent dir (used for static asset resolution)
    fs: {
      allow: ['..']
    }
  }
})

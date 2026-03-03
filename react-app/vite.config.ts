import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    },
    // Allow loading env from parent directory during development by setting the root to the react-app folder
    // Vite will still pick up import.meta.env from process.env at build time; ensure .env at project root is included in CI/build env
    fs: {
      allow: ['..']
    }
  }
})

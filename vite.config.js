import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Auto-detect repo name from GitHub Actions, fallback to /Empanadas/ for local dev
const base = process.env.GITHUB_REPOSITORY
  ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/`
  : '/Empanadas/'

export default defineConfig({
  plugins: [react()],
  base,
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom']
        }
      }
    }
  }
})

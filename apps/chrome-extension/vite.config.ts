import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.json'  assert { type: 'json' }

// https://vitejs.dev/config/
export default defineConfig({
  build: { sourcemap: 'inline' },
  logLevel: 'error',
  plugins: [
    react(),
    crx({ manifest }),
  ],
})

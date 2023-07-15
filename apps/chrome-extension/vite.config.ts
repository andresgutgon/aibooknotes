import * as path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.json'  assert { type: 'json' }

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    crx({ manifest }),
  ],
  build: {
    sourcemap: 'inline'
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'kindle-online/src')
      },
      {
        find: '@base',
        replacement: path.resolve(__dirname, 'src')
      }
    ],
  },
})

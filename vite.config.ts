import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// `base` must match the GitHub repo name (with leading + trailing slash),
// otherwise assets 404 on GitHub Pages. Change this if the repo is renamed.
export default defineConfig({
  plugins: [react()],
  base: '/pub-key-cryptography/',
})

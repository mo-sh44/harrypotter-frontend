import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: './',
  preview: {
    port: 4173,
    allowedHosts: ['harrypotter-frontend.onrender.com']
  }
})

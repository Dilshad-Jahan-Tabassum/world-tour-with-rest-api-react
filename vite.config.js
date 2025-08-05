import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/world-tour-with-rest-api-react/',
  plugins: [react()],
})

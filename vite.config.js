import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite config - admin paneli root'tan ÇAalÄ±Åatmak iÃ§in
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~admin': '/Admin-Panel',
    },
  },
  server: {
    port: 5173,
  },
});

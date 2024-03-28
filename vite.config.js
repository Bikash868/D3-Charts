import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname,"src/"),
      "@data": path.resolve(__dirname,"src/data/"),
      "@views": path.resolve(__dirname,"src/views/"),
      "@utils": path.resolve(__dirname,"src/utils/"),
      "@assets": path.resolve(__dirname,"src/assets/"),
      "@charts": path.resolve(__dirname,"src/charts/"),
      "@router": path.resolve(__dirname,"src/router/"),
      "@layouts": path.resolve(__dirname,"src/layouts/"),
      "@components": path.resolve(__dirname,"src/components/"),
    }
  }
})

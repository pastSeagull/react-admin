import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import WindiCSS from 'vite-plugin-windicss';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), WindiCSS()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy:{
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true,
      },
    }
  },
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import mkcert from 'vite-plugin-mkcert';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslint({
      cache: false
    }),
    mkcert()
  ],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  server: {
    https: true,
    host: '0.0.0.0',
    proxy: {
      '/it-plugins': {
        target: 'https://waimao.cowork.netease.com/',
        changeOrigin: true,
        cookieDomainRewrite: {
          '*': ''
        }
        // rewrite: path => path.replace(/^\/sirius/, ''),
      }
    }
  }
});

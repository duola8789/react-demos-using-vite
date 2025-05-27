import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import mkcert from 'vite-plugin-mkcert';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [
    react(),
    eslint({
      cache: false
    }),
    mkcert(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  server: {
    https: true,
    host: true,
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
}));

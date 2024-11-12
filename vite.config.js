import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from '@svgr/rollup';
import { visualizer } from 'rollup-plugin-visualizer';
export default defineConfig({
  plugins: [react(),
     svgr(),
     visualizer({ open: true }),

  ],
  build: {
    minify: 'esbuild', // or 'terser'
    assetsInlineLimit: 4096, // Change this value to inline assets larger than 4kb
  },
  css: {
    modules: {
      localsConvention: 'camelCase', // Use camel case for easier compatibility with JS
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://climatenet.am', // Make sure this is correct
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
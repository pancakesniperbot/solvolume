import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-helmet'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-slot'],
          icons: ['lucide-react', 'react-icons'],
          motion: ['framer-motion'],
          utils: ['class-variance-authority', 'clsx', 'tailwind-merge']
        },
      },
    },
  },
  server: {
    port: 3000,
    host: true,
  },
}); 
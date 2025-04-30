import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@shared': path.resolve(__dirname, '../shared'),
      '@assets': path.resolve(__dirname, '../attached_assets'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    minify: true,
    cssMinify: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          'react-libs': ['react-helmet', 'wouter', 'framer-motion'],
          radix: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-slot'],
          utils: ['class-variance-authority', 'clsx', 'tailwind-merge', 'tailwindcss-animate'],
          icons: ['lucide-react', 'react-icons'],
          vendor: ['axios', 'date-fns']
        }
      },
    },
  },
  server: {
    port: 5173,
    host: '0.0.0.0',
  },
}); 
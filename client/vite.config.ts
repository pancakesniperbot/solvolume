import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  return {
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
      headers: {
        'Content-Security-Policy': "default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval'; connect-src 'self' https: wss: ws:;"
      }
    },
    define: {
      'import.meta.env.VITE_WEBSOCKET_HOST': JSON.stringify(env.VITE_WEBSOCKET_HOST)
    }
  };
}); 
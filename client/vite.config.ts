import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import terser from '@rollup/plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import url from '@rollup/plugin-url';
import virtual from '@rollup/plugin-virtual';
import compression from 'vite-plugin-compression';
import { VitePWA } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';
import { splitVendorChunkPlugin } from 'vite';
import { Plugin as importToCDN } from 'vite-plugin-cdn-import';
import legacy from '@vitejs/plugin-legacy';
import { imagetools } from 'vite-imagetools';
import { Plugin as critical } from 'vite-plugin-critical';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    legacy({
      targets: ['defaults', 'not IE 11'],
      modernPolyfills: true,
    }),
    compression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 10240,
      deleteOriginFile: false,
    }),
    critical({
      critical: {
        inline: true,
        dimensions: [
          {
            width: 375,
            height: 667,
          },
          {
            width: 1920,
            height: 1080,
          },
        ],
      },
    }),
    imagetools({
      defaultDirectives: new URLSearchParams([
        ['format', 'webp'],
        ['quality', '80'],
      ]),
    }),
    importToCDN({
      modules: [
        {
          name: 'react',
          var: 'React',
          path: 'https://unpkg.com/react@18/umd/react.production.min.js',
        },
        {
          name: 'react-dom',
          var: 'ReactDOM',
          path: 'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
        },
      ],
    }),
    visualizer({
      filename: 'stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
    splitVendorChunkPlugin(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'SolVolume',
        short_name: 'SolVolume',
        description: 'Solana Volume Bot Built to Boost Visibility',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/unpkg\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'unpkg-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.trace'],
      },
      format: {
        comments: false,
      },
      mangle: {
        safari10: true,
      },
    },
    cssMinify: 'lightningcss',
    cssCodeSplit: true,
    modulePreload: {
      polyfill: true,
    },
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      },
      plugins: [
        nodeResolve({
          preferBuiltins: true,
          browser: true,
        }),
        commonjs({
          requireReturnsDefault: 'auto',
        }),
        terser(),
        replace({
          preventAssignment: true,
          values: {
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'import.meta.env.VITE_APP_VERSION': JSON.stringify(process.env.npm_package_version),
          },
        }),
        url({
          limit: 0,
          include: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.gif', '**/*.webp'],
          fileName: '[name][extname]',
          publicPath: '/assets/',
        }),
        virtual({
          'virtual:config': `export default ${JSON.stringify({
            version: process.env.npm_package_version,
            buildTime: new Date().toISOString(),
          })}`,
        }),
      ],
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@radix-ui/react-*'],
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'utils-vendor': ['axios', 'zod', 'clsx', 'tailwind-merge'],
        },
        assetFileNames: (assetInfo) => {
          if (!assetInfo.name) return 'assets/[name]-[hash][extname]';
          
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/.test(assetInfo.name)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/\.(woff2?|eot|ttf|otf)$/.test(assetInfo.name)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          if (/\.css$/.test(assetInfo.name)) {
            return 'assets/css/[name]-[hash][extname]';
          }
          if (/\.json$/.test(assetInfo.name)) {
            return 'data/[name][extname]';
          }
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        compact: true,
        generatedCode: {
          arrowFunctions: true,
          constBindings: true,
          objectShorthand: true,
        },
      },
    },
    sourcemap: true,
    assetsInlineLimit: 4096,
    emptyOutDir: true,
    reportCompressedSize: true,
    dynamicImportVarsOptions: {
      warnOnError: true,
      exclude: [],
    },
  },
  preview: {
    port: 3000,
    host: true,
    strictPort: true,
    headers: {
      'Cache-Control': 'public, max-age=31536000, immutable',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'X-XSS-Protection': '1; mode=block',
      'X-Robots-Tag': 'index, follow, archive, snippet, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      'Permissions-Policy': 'interest-cohort=()',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Range',
      'Keep-Alive': 'timeout=60, max=1000',
      'Connection': 'keep-alive'
    }
  },
  server: {
    port: 3000,
    host: true,
    strictPort: true,
    headers: {
      'Cache-Control': 'public, max-age=31536000, immutable',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'X-XSS-Protection': '1; mode=block',
      'X-Robots-Tag': 'index, follow, archive, snippet, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      'Permissions-Policy': 'interest-cohort=()',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Range',
      'Keep-Alive': 'timeout=60, max=1000',
      'Connection': 'keep-alive'
    }
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@radix-ui/react-*',
      'three',
      '@react-three/fiber',
      '@react-three/drei',
    ],
    exclude: ['@solana/web3.js'],
    esbuildOptions: {
      target: 'esnext',
    },
  },
  json: {
    stringify: true,
  },
}); 
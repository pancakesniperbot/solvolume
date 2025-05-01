# Solvolume Backup Configuration

This backup contains essential configuration files and components for the Solvolume project.

## Important Files

### Configuration Files
- `vite.config.ts` - Vite build configuration with correct output directory and chunk splitting
- `wrangler.toml` - Cloudflare Pages deployment configuration
- `package.json` - Project dependencies and scripts
- `postcss.config.js` - PostCSS configuration with plugins
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.ts` - Tailwind CSS configuration

### Key Components
- `SEOMeta.tsx` - SEO component with react-helmet-async
- `App.tsx` - Main application with provider structure

## Deployment Notes
1. Build output must be in root `/dist` directory for Cloudflare Pages
2. React Helmet Async must be used instead of React Helmet
3. All chunk splitting configurations must be maintained

## Dependencies
Essential dependencies that must be maintained:
- react-helmet-async
- @radix-ui/* components
- framer-motion
- three.js related packages
- tailwind and styling utilities 
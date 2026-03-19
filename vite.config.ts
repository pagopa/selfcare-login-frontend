import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      createHtmlPlugin({
        inject: {
          data: {
            VITE_URL_CDN: env.VITE_URL_CDN,
            VITE_ONE_TRUST_BASE_URL: env.VITE_ONE_TRUST_BASE_URL,
            VITE_ONETRUST_DOMAIN_ID: env.VITE_ONETRUST_DOMAIN_ID,
          },
        },
      }),
    ],
    base: '/auth',
    server: {
      port: 3000,
    },
    preview: {
      port: 3000
    },
    build: {
      outDir: 'dist',
      sourcemap: true,
    },
    define: {
      'process.env': Object.fromEntries(
        Object.entries(env).filter(([key]) => key.startsWith('VITE_'))
      ),
    },
  };
});

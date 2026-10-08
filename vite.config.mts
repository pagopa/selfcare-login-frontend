import react from '@vitejs/plugin-react';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import env from 'env-var';
import { defineConfig, loadEnv, Plugin } from 'vite';
import { getOneTrustBaseUrl } from './config/htmlEnv';
import { readEnv } from './src/utils/readEnv';

const createReleaseHtmlPlugin = (mode: string): Plugin => {
  const values = loadEnv(mode, process.cwd(), ['VITE_', 'REACT_APP_ONE_TRUST_BASE_URL']);
  readEnv(values, '/auth/');
  const htmlEnv = env.from(values);
  ['VITE_URL_CDN', 'VITE_ONETRUST_DOMAIN_ID'].forEach((key) => {
    htmlEnv.get(key).required().asString();
  });
  const oneTrustBaseUrl = getOneTrustBaseUrl(values);

  return {
    name: 'release-onetrust-url',
    transformIndexHtml: {
      order: 'pre',
      // CI's PNPG DEV Vite URL differs from this release's existing consent endpoint.
      handler: (html) => html.replace('%VITE_ONE_TRUST_BASE_URL%', oneTrustBaseUrl),
    },
  };
};

export default defineConfig(({ mode, isPreview }) => ({
  plugins: [react(), ...(isPreview ? [] : [createReleaseHtmlPlugin(mode)])],
  base: '/auth/',
  server: {
    port: 3000,
  },
  preview: { port: 3000 },
  build: {
    outDir: 'dist',
    sourcemap: true,
    target: browserslistToEsbuild(),
  },
}));

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    pool: 'forks',
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    clearMocks: true,
    server: {
      deps: {
        inline: ['@pagopa/mui-italia', '@pagopa/selfcare-common-frontend'],
      },
    },
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/index.tsx',
        'src/setupTests.ts',
        'src/utils/constants.ts',
        'src/utils/IDPS.ts',
        'src/**/__tests__/**',
        'src/**/*.d.ts',
      ],
    },
  },
});

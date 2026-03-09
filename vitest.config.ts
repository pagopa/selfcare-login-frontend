import react from '@vitejs/plugin-react';
import { defineConfig as defineViteConfig, mergeConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig as defineVitestConfig } from 'vitest/config';

export default mergeConfig(
  // Vite's defineConfig handles plugins — no type conflict
  defineViteConfig({
    plugins: [react(), tsconfigPaths()],
  }),
  defineVitestConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/setupTests.ts'],
      pool: 'threads',
      maxWorkers: 3,
      fileParallelism: true,
      restoreMocks: true,
      clearMocks: true,
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        'coverage/*',
        'e2e/**',
        '**/*.spec.ts',
        '**/__mf__temp/**',
      ],
      coverage: {
        provider: 'v8',
        exclude: ['src/index.js', 'src/reportWebVitals.ts', 'src/api/generated/**'],
      },
    },
  })
);

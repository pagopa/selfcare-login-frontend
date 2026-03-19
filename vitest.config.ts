import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        clearMocks: true,
        mockReset: true,
        restoreMocks: true,
        environment: 'jsdom',
        pool: 'forks',
        server: {
            deps: {
                inline: ['@pagopa/mui-italia', '@pagopa/selfcare-common-frontend'],
            },
        },
        deps: {
            optimizer: {
                web: {
                    enabled: true,
                    include: ['@pagopa/mui-italia', '@pagopa/selfcare-common-frontend'],
                },
            },
        },
        setupFiles: ['./src/setupTests.ts'],
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
            exclude: [
                'src/index.tsx',
                'src/api/generated/**',
                'src/examples/**',
                'src/AppExample.tsx',
                'src/lib/utils/fixSwagger20ArraySchemaDef.js',
                'src/lib/common-polyfill.ts',
                'src/lib/index.ts',
                'src/lib/components/icons/**',
                'src/lib/model/**',
            ],
        },
    },
});

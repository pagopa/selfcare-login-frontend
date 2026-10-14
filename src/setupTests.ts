import { TextDecoder, TextEncoder } from 'node:util';
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { configureCommon } from './consentAndAnalyticsConfiguration';
import { ENV } from './utils/env';

vi.stubGlobal('TextDecoder', TextDecoder);
vi.stubGlobal('TextEncoder', TextEncoder);
configureCommon();

vi.stubGlobal(
  'fetch',
  vi.fn(async (input: RequestInfo | URL) => {
    const url = input instanceof Request ? input.url : String(input);
    if (url === ENV.JSON_URL.PRODUCTS) {
      return new Response('[]');
    }
    if (url === ENV.JSON_URL.ALERT) {
      return new Response('{}');
    }
    throw new Error(`Unexpected fetch in test: ${url}`);
  })
);

afterEach(() => {
  cleanup();
  localStorage.clear();
  sessionStorage.clear();
});

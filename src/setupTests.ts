import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import it from './locale/it';

beforeAll(async () => {
  if (!i18n.isInitialized) {
    await i18n.use(initReactI18next).init({
      resources: { it: { translation: it } },
      lng: 'it',
      fallbackLng: 'it',
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    });
  }
});

afterEach(() => {
  console.log('afterEachTest');
  cleanup();
  vi.clearAllMocks();
});

import { readEnv } from '../readEnv';
import { getOneTrustBaseUrl } from '../../../config/htmlEnv';

const values = {
  VITE_ENV: 'UAT',
  VITE_LOGIN_SPID_ENABLED: 'true',
  VITE_OT_SRC: 'https://consent.example.invalid/notice.js',
  VITE_OT_TOKEN: 'test-only',
  VITE_OT_TERMS_AND_CONDITION_RESOURCE: 'https://consent.example.invalid/terms.json',
  VITE_OT_TOS_RESOURCE: 'https://consent.example.invalid/privacy.json',
  VITE_ENABLE_ASSISTANCE: 'true',
  VITE_PAGOPA_HELP_EMAIL: 'support@example.invalid',
  VITE_PRODUCTS_ASSET: 'https://release.example.invalid/products.json',
  VITE_LOGIN_ALERT_BANNER: 'https://release.example.invalid/alerts.json',
  VITE_URL_FE_ONBOARDING: 'https://release.example.invalid/onboarding',
  VITE_URL_FE_DASHBOARD: 'https://release.example.invalid/dashboard',
  VITE_URL_FE_LANDING: 'https://release.example.invalid/',
  VITE_URL_FE_ASSISTANCE: 'https://release.example.invalid/assistenza',
  VITE_URL_API_LOGIN: 'https://api.example.invalid',
  VITE_URL_PRIVACY_DISCLAIMER: 'https://release.example.invalid/privacy',
  VITE_URL_TERMS_AND_CONDITIONS: 'https://release.example.invalid/terms',
  VITE_SPID_TEST_ENV_ENABLED: 'false',
  VITE_SPID_CIE_ENTITY_ID: 'test-cie',
  VITE_MIXPANEL_TOKEN: 'test-only',
};

test.each(['/auth', '/auth/', '/auth//'])('normalizes the route prefix %s', (baseUrl) => {
  const result = readEnv(values, baseUrl);
  expect(result.PUBLIC_URL).toBe('/auth');
  expect(result.URL_FE.LOGOUT).toBe('/auth/logout');
});

test('preserves root routing and domain-specific destinations', () => {
  const result = readEnv(values, '/');
  expect(result.PUBLIC_URL).toBe('');
  expect(result.URL_FE.LOGOUT).toBe('/logout');
  expect(result.URL_FE.DASHBOARD).toBe(values.VITE_URL_FE_DASHBOARD);
  expect(result.URL_FE.LANDING).toBe(values.VITE_URL_FE_LANDING);
  expect(result.URL_FOOTER.PRIVACY_DISCLAIMER).toBe(values.VITE_URL_PRIVACY_DISCLAIMER);
  expect(result.URL_FOOTER.TERMS_AND_CONDITIONS).toBe(values.VITE_URL_TERMS_AND_CONDITIONS);
});

test('preserves env-var boolean parsing and analytics defaults', () => {
  const result = readEnv({ ...values, VITE_LOGIN_SPID_ENABLED: 'TRUE' }, '/auth/');
  expect(result.ENABLED_SPID).toBe(true);
  expect(result.SPID_TEST_ENV_ENABLED).toBe(false);
  expect(result.ASSISTANCE.ENABLE).toBe(true);
  expect(result.ANALYTCS.ENABLE).toBe(false);
  expect(result.ANALYTCS.API_HOST).toBe('https://api-eu.mixpanel.com');
});

test('rejects missing required settings rather than building empty configuration', () => {
  expect(() => readEnv({ ...values, VITE_URL_FE_DASHBOARD: undefined }, '/auth/')).toThrow(
    /VITE_URL_FE_DASHBOARD/
  );
});

test('rejects invalid booleans rather than treating them as false', () => {
  expect(() => readEnv({ ...values, VITE_LOGIN_SPID_ENABLED: 'invalid' }, '/auth/')).toThrow(
    /VITE_LOGIN_SPID_ENABLED/
  );
});

test('uses Vite OneTrust configuration for local development', () => {
  expect(
    getOneTrustBaseUrl({ VITE_ONE_TRUST_BASE_URL: 'https://consent.example.invalid/onetrust' })
  ).toBe('https://consent.example.invalid/onetrust');
});

test('preserves the legacy CI consent endpoint when the shared Vite value differs', () => {
  expect(
    getOneTrustBaseUrl({
      REACT_APP_ONE_TRUST_BASE_URL: 'https://release.example.invalid/onetrust',
      VITE_ONE_TRUST_BASE_URL: 'https://release.example.invalid/ot/test',
    })
  ).toBe('https://release.example.invalid/onetrust');
});

test('rejects missing HTML consent configuration', () => {
  expect(() => getOneTrustBaseUrl({})).toThrow(/VITE_ONE_TRUST_BASE_URL/);
});

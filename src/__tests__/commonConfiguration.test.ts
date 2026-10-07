import { initAnalytics } from '@pagopa/selfcare-common-frontend/lib/services/analyticsService';

vi.mock('@pagopa/selfcare-common-frontend/lib/services/analyticsService', () => ({
  initAnalytics: vi.fn(),
}));

afterEach(() => {
  vi.unstubAllEnvs();
  document.cookie = 'OptanonConsent=; Max-Age=0; path=/';
});

test.each(['DEV', 'UAT', 'PROD'])('retains release destinations in %s', async (mode) => {
  vi.stubEnv('VITE_ENV', mode);
  vi.resetModules();
  const { configureCommon } = await import('../consentAndAnalyticsConfiguration');
  const { CONFIG } = await import('@pagopa/selfcare-common-frontend/lib/config/env');
  const { ENV } = await import('../utils/env');

  configureCommon();

  expect(CONFIG.URL_FE.LOGOUT).toBe(ENV.URL_FE.LOGOUT);
  expect(CONFIG.URL_FE.ASSISTANCE).toBe(ENV.URL_FE.ASSISTANCE);
  expect(CONFIG.FOOTER.LINK.PRIVACYPOLICY).toBe(ENV.URL_FOOTER.PRIVACY_DISCLAIMER);
  expect(CONFIG.FOOTER.LINK.TERMSANDCONDITIONS).toBe(ENV.URL_FOOTER.TERMS_AND_CONDITIONS);
});

test('applies release analytics settings before initializing an existing consent cookie', async () => {
  vi.resetModules();
  document.cookie = 'OptanonConsent=C0002%3A1; path=/';
  const { configureConsent } = await import('../consentAndAnalyticsConfiguration');
  const { CONFIG } = await import('@pagopa/selfcare-common-frontend/lib/config/env');
  const { ENV } = await import('../utils/env');
  vi.mocked(initAnalytics).mockImplementation(() => {
    expect(CONFIG.ANALYTCS.ENABLE).toBe(ENV.ANALYTCS.ENABLE);
    expect(CONFIG.ANALYTCS.MOCK).toBe(ENV.ANALYTCS.MOCK);
    expect(CONFIG.ANALYTCS.TOKEN).toBe(ENV.ANALYTCS.TOKEN);
    expect(CONFIG.ANALYTCS.API_HOST).toBe(ENV.ANALYTCS.API_HOST);
    expect(CONFIG.ANALYTCS.ADDITIONAL_PROPERTIES_IMPORTANT).toEqual({ env: ENV.ENV });
  });

  await configureConsent();

  expect(initAnalytics).toHaveBeenCalledTimes(1);
});

test('retains exact release route paths with a trailing-slash Vite base', async () => {
  vi.stubEnv('BASE_URL', '/auth/');
  vi.resetModules();
  const routes = await import('../utils/constants');
  expect(routes.ROUTE_LOGIN).toBe('/auth/login');
  expect(routes.ROUTE_LOGIN_SUCCESS).toBe('/auth/login/success');
  expect(routes.ROUTE_LOGIN_ERROR).toBe('/auth/login/error');
  expect(routes.ROUTE_LOGOUT).toBe('/auth/logout');
  expect(routes.ROUTE_TERMS_AND_CONDITION).toBe('/auth/termini-di-servizio');
  expect(routes.ROUTE_PRIVACY_DISCLAIMER).toBe('/auth/informativa-privacy');
});

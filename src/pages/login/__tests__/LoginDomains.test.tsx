import { createEvent, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

const originalLocation = window.location;
const assign = vi.fn();

afterEach(() => {
  Object.defineProperty(window, 'location', { value: originalLocation });
  vi.unstubAllEnvs();
});

test.each([
  ['DEV', 'release.example.invalid', '/auth', true],
  ['DEV', 'pnpg.dev.selfcare.pagopa.it', 'https://imprese.dev.notifichedigitali.it', false],
  ['DEV', 'imprese.dev.notifichedigitali.it', 'https://imprese.dev.notifichedigitali.it', false],
  ['UAT', 'pnpg.uat.selfcare.pagopa.it', 'https://imprese.uat.notifichedigitali.it', false],
  ['UAT', 'imprese.uat.notifichedigitali.it', 'https://imprese.uat.notifichedigitali.it', false],
  ['PROD', 'pnpg.selfcare.pagopa.it', 'https://imprese.notifichedigitali.it', false],
  ['PROD', 'imprese.notifichedigitali.it', 'https://imprese.notifichedigitali.it', false],
])(
  'uses the correct legal links in %s on %s',
  async (environment, hostname, legalPrefix, documentation) => {
    const configuredLegalPrefix =
      legalPrefix === '/auth' ? 'https://configured.example.invalid' : legalPrefix;
    vi.stubEnv('BASE_URL', '/auth/');
    vi.stubEnv('VITE_ENV', environment);
    vi.stubEnv('VITE_URL_PRIVACY_DISCLAIMER', `${configuredLegalPrefix}/informativa-privacy`);
    vi.stubEnv('VITE_URL_TERMS_AND_CONDITIONS', `${configuredLegalPrefix}/termini-di-servizio`);
    Object.defineProperty(window, 'location', {
      value: { ...originalLocation, hostname, assign, search: '' },
    });
    vi.resetModules();
    await import('../../../locale');
    const { default: i18n } = await import(
      '@pagopa/selfcare-common-frontend/lib/locale/locale-utils'
    );
    await i18n.changeLanguage('it');
    const { default: Login } = await import('../Login');
    const { ENV } = await import('../../../utils/env');

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    await waitFor(() => {
      const destinations = screen.getAllByRole('link').map((link) => link.getAttribute('href'));
      expect(destinations).toContain(`${legalPrefix}/termini-di-servizio`);
      expect(destinations).toContain(`${legalPrefix}/informativa-privacy`);
    });
    const termsLink = screen.getByText('Termini e condizioni d’uso');
    const privacyLink = screen.getAllByText(/Informativa Privacy/)[0];
    expect(termsLink).toHaveAttribute('href', `${legalPrefix}/termini-di-servizio`);
    expect(privacyLink).toHaveAttribute('href', `${legalPrefix}/informativa-privacy`);
    const termsClick = createEvent.click(termsLink);
    termsClick.preventDefault();
    fireEvent(termsLink, termsClick);
    expect(assign).toHaveBeenLastCalledWith(`${legalPrefix}/termini-di-servizio`);
    const privacyClick = createEvent.click(privacyLink);
    privacyClick.preventDefault();
    fireEvent(privacyLink, privacyClick);
    expect(assign).toHaveBeenLastCalledWith(`${legalPrefix}/informativa-privacy`);
    expect(screen.queryByRole('button', { name: 'Manuale operativo' }) !== null).toBe(
      documentation
    );
    fireEvent.click(screen.getByRole('button', { name: 'Entra con CIE' }));
    expect(assign).toHaveBeenCalledWith(
      `${ENV.URL_API.LOGIN}/login?entityID=${ENV.SPID_CIE_ENTITY_ID}&authLevel=SpidL2`
    );
  },
  20000
);

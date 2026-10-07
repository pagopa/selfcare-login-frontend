import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

const originalLocation = window.location;
const assign = vi.fn();

afterEach(() => {
  Object.defineProperty(window, 'location', { value: originalLocation });
  vi.unstubAllEnvs();
});

test.each([
  ['release.example.invalid', '/auth', true],
  ['pnpg.dev.example.invalid', '', false],
  ['imprese.example.invalid', '', false],
])(
  'retains login behavior for %s',
  async (hostname, legalPrefix, documentation) => {
    vi.stubEnv('BASE_URL', '/auth/');
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

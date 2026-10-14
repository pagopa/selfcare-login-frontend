import React from 'react';
import { cleanup, createEvent, render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../Login';
import { ENV } from '../../../utils/env';
import './../../../locale';
import { MemoryRouter } from 'react-router-dom';
import i18n from '@pagopa/selfcare-common-frontend/lib/locale/locale-utils';

const oldWindowLocation = global.window.location;
const mockedLocation = { ...oldWindowLocation, assign: vi.fn(), search: '' };

beforeAll(async () => {
  // eslint-disable-next-line functional/immutable-data
  Object.defineProperty(window, 'location', { value: mockedLocation });
  await i18n.changeLanguage('it');
});
afterAll(() => {
  // eslint-disable-next-line functional/immutable-data
  Object.defineProperty(window, 'location', { value: oldWindowLocation });
});

vi.spyOn(URLSearchParams.prototype, 'get');

global.window.open = vi.fn();

beforeEach(() => {
  mockedLocation.search = '';
});

test('Test: Session not found while trying to access dashboard: "Selfcare" Login is displayed', async () => {
  render(
    <MemoryRouter initialEntries={[{ pathname: '/', search: '?onSuccess=dashboard' }]}>
      <Login />
    </MemoryRouter>
  );
  await waitFor(() => screen.getByText('Accedi all’Area Riservata Enti'));
  expect(
    vi.mocked(URLSearchParams.prototype.get).mock.calls.filter(([key]) => key === 'onSuccess')
  ).toHaveLength(1);
});

test('Test: Session not found while trying to access at onboarding flow product: "Onboarding" Login is displayed', async () => {
  const productIds = [
    'prod-interop',
    'prod-io',
    'prod-io-premium',
    'prod-io-sign',
    'prod-pn',
    'prod-pagopa',
    'prod-cgn',
    'prod-ciban',
  ];

  for (const pid of productIds) {
    cleanup();
    vi.mocked(URLSearchParams.prototype.get).mockClear();
    const search =
      pid === 'prod-io-premium'
        ? `?onSuccess=onboarding/prod-io/${pid}`
        : `?onSuccess=onboarding/${pid}`;
    mockedLocation.search = search;
    await waitFor(() =>
      render(
        <MemoryRouter initialEntries={[{ pathname: '/', search }]}>
          <Login />
        </MemoryRouter>
      )
    );
    await waitFor(() => {
      screen.getByText('Come vuoi accedere?');
      expect(screen.getByRole('button', { name: 'Entra con CIE' })).toBeInTheDocument();
    });

    expect(
      vi.mocked(URLSearchParams.prototype.get).mock.calls.filter(([key]) => key === 'onSuccess')
    ).toHaveLength(1);
  }
});

test('Test: Session not found while trying to access at upload contract flow: "Selfcare" Login is displayed', async () => {
  const mockedJwt = 'mockJwt';
  render(
    <MemoryRouter
      initialEntries={[{ pathname: '/', search: `?onSuccess=onboarding/confirm?jwt=${mockedJwt}` }]}
    >
      <Login />
    </MemoryRouter>
  );
  await waitFor(() => screen.getByText('Accedi all’Area Riservata Enti'));

  expect(
    vi.mocked(URLSearchParams.prototype.get).mock.calls.filter(([key]) => key === 'onSuccess')
  ).toHaveLength(1);
});

test('Test: Trying to access the login with SPID', () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );
  const buttonSpid = document.getElementById('spidButton') as HTMLButtonElement;
  fireEvent.click(buttonSpid);
});

test('Test: Trying to access the login with CIE', () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );
  const buttonCIE = screen.getByRole('button', {
    name: 'Entra con CIE',
  });
  fireEvent.click(buttonCIE);
  expect(global.window.location.assign).toHaveBeenCalledWith(
    `${ENV.URL_API.LOGIN}/login?entityID=xx_servizicie_test&authLevel=SpidL2`
  );
});

test('Test: Access to operative manual', () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );
  const documentationButton = screen.getByRole('button', {
    name: 'Manuale operativo',
  });

  fireEvent.click(documentationButton);
  expect(global.window.open).toHaveBeenCalledWith(ENV.URL_DOCUMENTATION, '_blank');
});

test('Test: Click in the conditions and privacy links below the login methods', () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  const termsConditionLink = screen.getByText('Termini e condizioni d’uso');
  const privacyLink = screen.getAllByText(/Informativa Privacy/)[0];

  const event = createEvent.click(privacyLink);
  event.preventDefault();
  fireEvent(privacyLink, event);
});

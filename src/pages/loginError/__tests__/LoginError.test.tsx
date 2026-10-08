import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import i18n from '@pagopa/selfcare-common-frontend/lib/locale/locale-utils';
import LoginError from '../LoginError';
import './../../../locale';

const oldWindowLocation = global.window.location;
const mockedLocation = { ...oldWindowLocation, assign: vi.fn(), search: '' };

beforeAll(async () => {
  Object.defineProperty(window, 'location', { value: mockedLocation });
  await i18n.changeLanguage('it');
});
afterAll(() => {
  Object.defineProperty(window, 'location', { value: oldWindowLocation });
});

test.each([
  ['19', /Hai effettuato troppi tentativi di accesso/, true],
  ['20', /Non è stato possibile accedere/, false],
  ['21', /È passato troppo tempo/, true],
  ['22', /Non hai dato il consenso all’invio dei dati/, true],
  ['23', /Identità sospesa o revocata/, false],
  ['25', /Hai annullato l’accesso/, true],
  ['24', /Non è stato possibile accedere/, true],
])('retains the identity-provider error page for code %s', async (errorCode, title, retry) => {
  mockedLocation.search = `?errorCode=${errorCode}`;
  const log = vi.spyOn(console, 'error').mockImplementation(() => undefined);
  render(
    <MemoryRouter>
      <LoginError />
    </MemoryRouter>
  );

  expect(await screen.findByRole('heading', { level: 4 })).toHaveTextContent(title);
  expect(screen.getByRole('button', { name: 'Chiudi' })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Riprova' }) !== null).toBe(retry);
  expect(log).toHaveBeenCalledWith(
    `login unsuccessfull! error code obtained from idp: ${errorCode}`
  );
  log.mockRestore();
});

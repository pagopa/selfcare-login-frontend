import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ROUTE_LOGIN } from '../../../utils/constants';
import LoginError from '../LoginError';
import './../../../locale';
import { MemoryRouter } from 'react-router-dom';

beforeEach(() => {
  vi.stubGlobal('location', { assign: vi.fn() });
});

afterEach(() => {
  vi.unstubAllGlobals();
});

test('Test: Identity providers authentication errors and the relative error pages', async () => {
  render(
    <MemoryRouter>
      <LoginError />
    </MemoryRouter>
  );

  screen.getByText(/Non è stato possibile accedere/);
  screen.getByText(/Si è verificato un problema durante l’accesso. Riprova tra qualche minuto./);
  const tryAgainBtn = screen.getByText('Riprova');

  fireEvent.click(tryAgainBtn);
  await waitFor(() => expect(location.assign).toHaveBeenCalledWith(ROUTE_LOGIN));
});

test('Test: Identity providers authentication errors and the relative error pages', async () => {
  const queryParams = new URLSearchParams({ errorType: 'otpGeneric' });

  render(
    <MemoryRouter>
      <LoginError queryParams={queryParams} />
    </MemoryRouter>
  );

  screen.getByText(/Qualcosa è andato storto/);
  screen.getByText(/Riprova tra qualche minuto./);
  const tryAgainBtn = screen.getByText('Chiudi');

  fireEvent.click(tryAgainBtn);
  await waitFor(() => expect(location.assign).toHaveBeenCalledWith(ROUTE_LOGIN));
});

test('Test: Identity providers authentication errors and the relative error pages', async () => {
  const queryParams = new URLSearchParams({ errorType: 'otpToManyAttempts' });

  render(
    <MemoryRouter>
      <LoginError queryParams={queryParams} />
    </MemoryRouter>
  );

  screen.getByText(/Hai superato il numero massimo di tentativi/);
  screen.getByText(
    /Hai inserito il codice errato per più di 5 volte. Autenticati di nuovo con SPID o CIE per accedere./
  );
  const tryAgainBtn = screen.getByText('Esci');

  fireEvent.click(tryAgainBtn);
  await waitFor(() => expect(location.assign).toHaveBeenCalledWith(ROUTE_LOGIN));
});

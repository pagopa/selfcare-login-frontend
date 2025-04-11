import i18n from '@pagopa/selfcare-common-frontend/lib/locale/locale-utils';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { ROUTE_LOGIN, ROUTE_LOGIN_ERROR } from '../../../utils/constants';
import LoginError from '../LoginError';
import './../../../locale';

const oldWindowLocation = global.window.location;

beforeAll(() => {
  Object.defineProperty(window, 'location', { value: { assign: jest.fn() } });
  i18n.changeLanguage('it');
});
afterAll(() => {
  Object.defineProperty(window, 'location', { value: oldWindowLocation });
});

test('Test: Identity providers authentication errors and the relative error pages', async () => {
  window.location.assign(ROUTE_LOGIN_ERROR);
  render(<LoginError />);

  screen.getByText(/Non è stato possibile accedere/);
  screen.getByText(/Si è verificato un problema durante l’accesso. Riprova tra qualche minuto./);
  const tryAgainBtn = screen.getByText('Riprova');

  fireEvent.click(tryAgainBtn);
  await waitFor(() => expect(window.location.assign).toHaveBeenCalledWith(ROUTE_LOGIN));
});

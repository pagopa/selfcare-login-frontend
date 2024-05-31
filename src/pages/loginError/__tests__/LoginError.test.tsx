import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import LoginError from '../LoginError';
import { ROUTE_LOGIN_ERROR } from '../../../utils/constants';
import './../../../locale';

const oldWindowLocation = global.window.location;

beforeAll(() => {
  Object.defineProperty(window, 'location', { value: { assign: jest.fn() } });
});
afterAll(() => {
  Object.defineProperty(window, 'location', { value: oldWindowLocation });
});

// temporary skipped
test.skip('test login error', async () => {
  render(<LoginError />);

  window.location.assign(ROUTE_LOGIN_ERROR);

  screen.getByText('Spiacenti, qualcosa è andato storto.');
  screen.getByText('A causa di un errore del sistema non è possibile completare la procedura.', {
    exact: false,
  });
  screen.getByText('Ti chiediamo di riprovare più tardi.', {
    exact: false,
  });
});

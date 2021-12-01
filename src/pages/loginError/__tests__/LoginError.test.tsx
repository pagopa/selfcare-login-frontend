import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import LoginError from '../LoginError';
import { ROUTE_LOGIN } from '../../../utils/constants';

const oldWindowLocation = global.window.location;

beforeAll(() => {
  Object.defineProperty(window, 'location', { value: { assign: jest.fn() } });
});
afterAll(() => {
  Object.defineProperty(window, 'location', { value: oldWindowLocation });
});

test('test login error', async () => {
  render(<LoginError />);

  screen.getByText('Spiacenti, qualcosa è andato storto.');
  screen.getByText(
    'A causa di un errore del sistema non è possibile completare la procedura.\nTi chiediamo di riprovare più tardi.'
  );

  await waitFor(() => expect(global.window.location.assign).toBeCalledWith(ROUTE_LOGIN), {
    timeout: 3000,
  });
});

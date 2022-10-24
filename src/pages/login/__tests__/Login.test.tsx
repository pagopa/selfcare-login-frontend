import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { width } from '@mui/system';
import Login from '../Login';
import { ENV } from '../../../utils/env';
import './../../../locale';

const oldWindowLocation = global.window.location;
const mockedLocation = {
  assign: jest.fn(),
  pathname: '',
  origin: 'MOCKED_ORIGIN',
  search: '',
  hash: '',
};
jest.spyOn(URLSearchParams.prototype, 'get');


beforeAll(() => {
  // eslint-disable-next-line functional/immutable-data
  Object.defineProperty(window, 'location', { value: { assign: jest.fn() } });
});
afterAll(() => {
  // eslint-disable-next-line functional/immutable-data
  Object.defineProperty(window, 'location', { value: oldWindowLocation });
});

test('rendering test onboarding login', async () => {
  mockedLocation.search = '?onSuccess=dashboard';
  render(<Login />);
  await waitFor(() => screen.getByText('Accedi nell’Area Riservata'));
  expect(URLSearchParams.prototype.get).toBeCalledTimes(1);
});

test('renders button Entra con Spid', () => {  
  render(<Login />);
  const ButtonSpid = document.getElementById('spidButton');
  fireEvent.click(ButtonSpid);
  expect(screen.getAllByRole('img')[0]).toHaveAttribute('src', 'spid_big.svg');
});

test('renders button Entra con CIE', () => {
  render(<Login />);
  const ButtonCIE = screen.getByRole(/Button/i, {
    name: 'Entra con CIE',
  });

  fireEvent.click(ButtonCIE);
  expect(global.window.location.assign).toBeCalledWith(
    `${ENV.URL_API.LOGIN}/login?entityID=xx_servizicie_test&authLevel=SpidL2`
  );
});

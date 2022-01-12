import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { width } from '@mui/system';
import Login from '../Login';
import { ENV } from '../../../utils/env';

const oldWindowLocation = global.window.location;

beforeAll(() => {
  // eslint-disable-next-line functional/immutable-data
  Object.defineProperty(window, 'location', { value: { assign: jest.fn() } });
});
afterAll(() => {
  // eslint-disable-next-line functional/immutable-data
  Object.defineProperty(window, 'location', { value: oldWindowLocation });
});

test('rendering test', () => {
  render(<Login />);
  const LinkName = screen.getByText(/Scopri di più/i);
  expect(LinkName).toHaveAttribute(
    'href',
    'https://www.spid.gov.it/cos-e-spid/come-attivare-spid/'
  );
});

test('renders react link Informativa sulla Privacy', () => {
  render(<Login />);
  const LinkName = screen.getByText(/Informativa Privacy/i);
  expect(LinkName).toHaveAttribute(
    'href',
    'https://dev.selfcare.pagopa.it/assets/privacy-disclaimer.pdf'
  );
});

test('renders button Entra con Spid', () => {
  const login = render(<Login />);
  const ButtonSpid = screen.getByText(/Entra con SPID/i);
  fireEvent.click(ButtonSpid);
  expect(screen.getAllByRole('img')[0]).toHaveAttribute('src', 'spid_big.svg');
});

test('renders button Entra con CIE', () => {
  const login = render(<Login />);
  const ButtonCIE = screen.getByRole(/Button/i, {
    name: 'Entra con CIE',
  });

  fireEvent.click(ButtonCIE);
  expect(global.window.location.assign).toBeCalledWith(
    `${ENV.URL_API.LOGIN}/login?entityID=xx_servizicie_test`
  );
});

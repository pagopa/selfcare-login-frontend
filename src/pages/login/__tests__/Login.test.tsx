import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { width } from '@mui/system';
import Login from '../Login';
import { URL_API_LOGIN } from '../../../utils/constants';

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

// TODO dovrò mettere il link vero della normativa sulla privacy
test('renders react link Informativa sulla Privacy', () => {
  render(<Login />);
  const LinkName = screen.getByText(/Informativa sulla Privacy/i);
  expect(LinkName).toHaveAttribute('href', '#');
});

test('renders button Autenticati con Spid', () => {
  const login = render(<Login />);
  const ButtonSpid = screen.getByText(/Autenticati con SPID/i);
  fireEvent.click(ButtonSpid);
  expect(screen.getAllByRole('img')[0]).toHaveAttribute('src', 'spid_big.svg');
});

// TODO dovrò mettere il vero link della CIE

test('renders button Autenticati con CIE', () => {
  const login = render(<Login />);
  const ButtonCIE = screen.getByRole(/Button/i, {
    name: 'Autenticati con CIE',
  });

  fireEvent.click(ButtonCIE);
  expect(global.window.location.assign).toBeCalledWith(
    `${URL_API_LOGIN}/login?entityID=xx_servizicie_test`
  );
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { width } from '@mui/system';
import Login from '../pages/Login';

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
  const LinkName = screen.getByText(/Informativa sulla Privacy/i);
  expect(LinkName).toHaveAttribute('href', '#');
});

test('renders button Autenticati con Spid', () => {
  const login = render(<Login />);
  const ButtonSpid = screen.getByText(/Autenticati con SPID/i);
  fireEvent.click(ButtonSpid);
  expect(screen.getAllByRole('img')[0]).toHaveAttribute('src', 'spid_big.svg');
});

test('renders button Autenticati con CIE', () => {
  const login = render(<Login />);
  const ButtonSpid = screen.getByRole(/Button/i, {
    name: 'Autenticati con CIE',
  });

  fireEvent.click(ButtonSpid);
});

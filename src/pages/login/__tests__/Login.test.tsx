import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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

// Mock window.open
global.window.open = jest.fn();

test('Test rendering onboarding login', async () => {
  mockedLocation.search = '?onSuccess=dashboard';
  render(<Login />);
  await waitFor(() => screen.getByText('Accedi all’Area Riservata'));
  expect(URLSearchParams.prototype.get).toBeCalledTimes(1);
});

test('Test click SPID button', () => {
  render(<Login />);
  const buttonSpid = document.getElementById('spidButton');
  fireEvent.click(buttonSpid);
});

test('test click CIE button', () => {
  render(<Login />);
  const buttonCIE = screen.getByRole('button', {
    name: 'Entra con CIE',
  });
  fireEvent.click(buttonCIE);
  expect(global.window.location.assign).toBeCalledWith(
    `${ENV.URL_API.LOGIN_SPID}/login?entityID=xx_servizicie_test&authLevel=SpidL2`
  );
});

test('test click documentation button', () => {
  render(<Login />);
  const documentationButton = screen.getByRole('button', {
    name: 'Manuale operativo',
  });

  fireEvent.click(documentationButton);
  expect(global.window.open).toBeCalledWith(ENV.URL_DOCUMENTATION, '_blank');
});

test('test term conditions and privacy links', () => {
  render(<Login />);

  const termsConditionLink = screen.getByText('Termini e condizioni d’uso');
  const privacyLink = screen.getAllByText(/Informativa Privacy/)[0];

  fireEvent.click(termsConditionLink);
  expect(global.window.location.assign).toBeCalledWith(ENV.URL_FOOTER.TERMS_AND_CONDITIONS);

  fireEvent.click(privacyLink);
  expect(global.window.location.assign).toBeCalledWith(ENV.URL_FOOTER.PRIVACY_DISCLAIMER);
});

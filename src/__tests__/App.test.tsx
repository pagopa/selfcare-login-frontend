import { render, screen } from '@testing-library/react';
import App from '../App';
import { ROUTE_LOGIN } from '../utils/constants';
import { storageTokenOps } from '@pagopa/selfcare-common-frontend/lib/utils/storage';
import { storageOnSuccessOps } from '../utils/storage';
import React from 'react';

const oldWindowLocation = global.window.location;
const mockedLocation = {
  assign: jest.fn(),
  pathname: '',
  origin: 'MOCKED_ORIGIN',
  search: '',
  hash: '',
};

beforeAll(() => {
  Object.defineProperty(window, 'location', { value: mockedLocation });
});
afterAll(() => {
  Object.defineProperty(window, 'location', { value: oldWindowLocation });
});

// clean storage after each test
afterEach(() => {
  jest.requireActual('../pages/logout/Logout').default();
  mockedLocation.assign.mockReset();
});

jest.mock('../pages/logout/Logout', () => () => 'LOGOUT');
jest.mock('../pages/loginSuccess/LoginSuccess', () => () => 'LOGIN_SUCCESS');
jest.mock(
  '../pages/ValidateSession/ValidateSession',
  () =>
    ({ sessionToken }) =>
      'VALIDATE_SESSION:' + sessionToken
);

test('test not served path', () => {
  render(<App />);
  expect(mockedLocation.assign.mock.calls[0][0].startsWith('https://dev.oneid.pagopa.it/login')).toBe(true);
  checkRedirect(true);
});

test('test Logout', () => {
  mockedLocation.pathname = '/logout';
  render(<App />);
  screen.getByText('LOGOUT');
  checkRedirect(false);
});

test('test Logout even if in session', () => {
  mockedLocation.pathname = '/logout';
  storageTokenOps.write('token');
  render(<App />);
  screen.getByText('LOGOUT');
  checkRedirect(false);
});

test('test Login', () => {
  mockedLocation.pathname = '/login';
  render(<App />);
  expect(storageOnSuccessOps.read()).toBeUndefined();
  checkRedirect(true);
});

test('test Login with onSuccess', () => {
  mockedLocation.pathname = '/login';
  mockedLocation.search = 'onSuccess=prova';
  render(<App />);
  expect(storageOnSuccessOps.read()).toBe('prova');
  checkRedirect(true);
});

test('test ValidateSession', () => {
  mockedLocation.pathname = '/login';
  storageTokenOps.write('testToken');
  render(<App />);
  screen.getByText('VALIDATE_SESSION:testToken');
  checkRedirect(false);
});

test('test LoginSuccess', () => {
  mockedLocation.pathname = '/login/success';
  mockedLocation.hash = 'token=successToken';
  render(<App />);
  screen.getByText('LOGIN_SUCCESS');
  checkRedirect(false);
});

function checkRedirect(expected: boolean) {
  expect(mockedLocation.assign.mock.calls.length).toBe(expected ? 1 : 0);
}

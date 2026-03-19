import { storageTokenOps } from '@pagopa/selfcare-common-frontend/lib/utils/storage';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { storageOnSuccessOps } from '../utils/storage';
import {
  ROUTE_LOGOUT,
  ROUTE_LOGIN,
  ROUTE_LOGIN_SUCCESS,
  ROUTE_AUTH_CALLBACK,
  ROUTE_OTP,
} from '../utils/constants';

vi.mock('../pages/logout/Logout', () => ({ default: () => 'LOGOUT' }));
vi.mock('../pages/loginSuccess/LoginSuccess', () => ({ default: () => 'LOGIN_SUCCESS' }));
vi.mock('../pages/ValidateSession/ValidateSession', () => ({
  default: ({ sessionToken }: { sessionToken: string }) => 'VALIDATE_SESSION:' + sessionToken,
}));
vi.mock('../pages/oneIdentityAuthCallback/OneIdentityAuthCallback', () => ({
  default: () => 'ONE_IDENTITY_AUTH_CALLBACK',
}));
vi.mock('../pages/otp/OTPPage', () => ({ default: () => 'OTP_PAGE' }));

const mockedLocation = {
  assign: vi.fn(),
  pathname: '/',
  search: '',
  hash: '',
  href: '',
};

beforeEach(() => {
  mockedLocation.assign = vi.fn();
  mockedLocation.pathname = '/';
  mockedLocation.search = '';
  mockedLocation.hash = '';
  mockedLocation.href = '';
  vi.stubGlobal('location', mockedLocation);
});

afterEach(() => {
  vi.unstubAllGlobals();
  storageTokenOps.delete();
  storageOnSuccessOps.delete();
});

test('test not served path', () => {
  render(<App />);
  expect(
    mockedLocation.assign.mock.calls[0][0].startsWith('https://dev.oneid.pagopa.it/login')
  ).toBe(true);
  checkRedirect(true);
});

test('test Logout', () => {
  mockedLocation.pathname = ROUTE_LOGOUT;
  render(<App />);
  screen.getByText('LOGOUT');
  checkRedirect(false);
});

test('test Logout even if in session', () => {
  mockedLocation.pathname = ROUTE_LOGOUT;
  storageTokenOps.write('token');
  render(<App />);
  screen.getByText('LOGOUT');
  checkRedirect(false);
});

test('test Login', () => {
  mockedLocation.pathname = ROUTE_LOGIN;
  render(<App />);
  expect(storageOnSuccessOps.read()).toBeUndefined();
  checkRedirect(true);
});

test('test Login with onSuccess', () => {
  mockedLocation.pathname = ROUTE_LOGIN;
  mockedLocation.search = 'onSuccess=prova';
  render(<App />);
  expect(storageOnSuccessOps.read()).toBe('prova');
  checkRedirect(true);
});

test('test ValidateSession', () => {
  mockedLocation.pathname = ROUTE_LOGIN;
  storageTokenOps.write('testToken');
  render(<App />);
  screen.getByText('VALIDATE_SESSION:testToken');
  checkRedirect(false);
});

test('test LoginSuccess', () => {
  mockedLocation.pathname = ROUTE_LOGIN_SUCCESS;
  mockedLocation.hash = 'token=successToken';
  render(<App />);
  screen.getByText('LOGIN_SUCCESS');
  checkRedirect(false);
});

test('oneIdentityAuthCallback', () => {
  mockedLocation.pathname = ROUTE_AUTH_CALLBACK;
  mockedLocation.search = '?code=oneIdCode';
  render(<App />);
  screen.getByText('ONE_IDENTITY_AUTH_CALLBACK');
  checkRedirect(false);
});

test.skip('OTP confirmation page', () => {
  mockedLocation.pathname = ROUTE_OTP;
  render(<App />);
  screen.getByText('OTP_PAGE');
  checkRedirect(false);
});

function checkRedirect(expected: boolean) {
  expect(mockedLocation.assign.mock.calls.length).toBe(expected ? 1 : 0);
}

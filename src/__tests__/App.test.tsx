import { storageTokenOps } from '@pagopa/selfcare-common-frontend/lib/utils/storage';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { storageOnSuccessOps } from '../utils/storage';

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

test('oneIdentityAuthCallback', () => {
  mockedLocation.pathname = '/login/callback';
  mockedLocation.search = '?code=oneIdCode';
  render(<App />);
  screen.getByText('ONE_IDENTITY_AUTH_CALLBACK');
  checkRedirect(false);
});

test.skip('OTP confirmation page', () => {
  mockedLocation.pathname = '/login/otp';
  render(<App />);
  screen.getByText('OTP_PAGE');
  checkRedirect(false);
});

function checkRedirect(expected: boolean) {
  expect(mockedLocation.assign.mock.calls.length).toBe(expected ? 1 : 0);
}

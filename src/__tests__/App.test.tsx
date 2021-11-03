import { render, screen } from '@testing-library/react';
import App from '../App';
import { storageRead, storageWrite } from '../lib/storage-utils';
import { ROUTE_LOGIN, STORAGE_KEY_ON_SUCCESS, STORAGE_KEY_TOKEN } from '../utils/constants';

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
jest.mock('../pages/login/Login', () => () => 'LOGIN');
jest.mock('../pages/loginSuccess/LoginSuccess', () => () => 'LOGIN_SUCCESS');
jest.mock(
  '../pages/ValidateSession/ValidateSession',
  () =>
    ({ sessionToken }) =>
      'VALIDATE_SESSION:' + sessionToken
);

test('test not served path', () => {
  render(<App />);
  expect(global.window.location.assign).toBeCalledWith(ROUTE_LOGIN);
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
  storageWrite(STORAGE_KEY_TOKEN, 'token', 'string');
  render(<App />);
  screen.getByText('LOGOUT');
  checkRedirect(false);
});

test('test Login', () => {
  mockedLocation.pathname = '/login';
  render(<App />);
  screen.getByText('LOGIN');
  expect(storageRead(STORAGE_KEY_ON_SUCCESS, 'string')).toBeUndefined();
  checkRedirect(false);
});

test('test Login with onSuccess', () => {
  mockedLocation.pathname = '/login';
  mockedLocation.search = 'onSuccess=prova';
  render(<App />);
  screen.getByText('LOGIN');
  expect(storageRead(STORAGE_KEY_ON_SUCCESS, 'string')).toBe('prova');
  checkRedirect(false);
});

test('test ValidateSession', () => {
  mockedLocation.pathname = '/login';
  storageWrite(STORAGE_KEY_TOKEN, 'testToken', 'string');
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

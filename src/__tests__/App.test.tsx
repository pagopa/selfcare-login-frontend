import { render, screen } from '@testing-library/react';
import App from '../App';
import { ROUTE_LOGIN } from '../utils/constants';
import { storageTokenOps } from '@pagopa/selfcare-common-frontend/lib/utils/storage';
import { storageOnSuccessOps } from '../utils/storage';

const oldWindowLocation = global.window.location;
const mockedLocation = {
  assign: vi.fn(),
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
afterEach(async () => {
  const { default: Logout } = await vi.importActual<typeof import('../pages/logout/Logout')>(
    '../pages/logout/Logout'
  );
  Logout();
  mockedLocation.assign.mockReset();
  vi.unstubAllEnvs();
});

vi.mock('../pages/logout/Logout', () => ({ default: () => 'LOGOUT' }));
vi.mock('../pages/login/Login', () => ({ default: () => 'LOGIN' }));
vi.mock('../pages/loginSuccess/LoginSuccess', () => ({ default: () => 'LOGIN_SUCCESS' }));
vi.mock('../pages/ValidateSession/ValidateSession', () => ({
  default: ({ sessionToken }: { sessionToken: string }) => 'VALIDATE_SESSION:' + sessionToken,
}));

test.skip('test not served path', () => {
  render(<App />);
  expect(global.window.location.assign).toHaveBeenCalledWith(ROUTE_LOGIN);
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
  screen.getByText('LOGIN');
  expect(storageOnSuccessOps.read()).toBeUndefined();
  checkRedirect(false);
});

test('test Login with onSuccess', () => {
  mockedLocation.pathname = '/login';
  mockedLocation.search = 'onSuccess=prova';
  render(<App />);
  screen.getByText('LOGIN');
  expect(storageOnSuccessOps.read()).toBe('prova');
  checkRedirect(false);
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

test.each(['/auth', '/auth/', '/auth/login'])(
  'keeps the local login page visible at "%s" with a stored session',
  async (pathname) => {
    vi.stubEnv('DEV', true);
    vi.stubEnv('VITE_ENV', 'LOCAL_DEV');
    vi.stubEnv('BASE_URL', '/auth/');
    vi.resetModules();
    const { default: LocalApp } = await import('../App');
    mockedLocation.pathname = pathname;
    mockedLocation.search = '?onSuccess=onboarding/prod-io';
    storageTokenOps.write('testToken');

    render(<LocalApp />);

    expect(screen.getByText('LOGIN')).toBeInTheDocument();
    expect(storageTokenOps.read()).toBe('testToken');
    expect(storageOnSuccessOps.read()).toBe('onboarding/prod-io');
    checkRedirect(false);
  }
);

test.each([
  [false, 'LOCAL_DEV', '/auth/login'],
  [true, 'DEV', '/auth/login'],
  [true, 'LOCAL_DEV', '/auth/login/success'],
])(
  'retains session validation with DEV=%s, environment=%s and path=%s',
  async (development, environment, pathname) => {
    vi.stubEnv('DEV', development);
    vi.stubEnv('VITE_ENV', environment);
    vi.stubEnv('BASE_URL', '/auth/');
    vi.resetModules();
    const { default: LocalApp } = await import('../App');
    mockedLocation.pathname = pathname;
    storageTokenOps.write('testToken');

    render(<LocalApp />);

    expect(screen.getByText('VALIDATE_SESSION:testToken')).toBeInTheDocument();
    checkRedirect(false);
  }
);

test('retains the local successful-login callback without a stored session', async () => {
  vi.stubEnv('DEV', true);
  vi.stubEnv('VITE_ENV', 'LOCAL_DEV');
  vi.stubEnv('BASE_URL', '/auth/');
  vi.resetModules();
  const { default: LocalApp } = await import('../App');
  mockedLocation.pathname = '/auth/login/success';
  mockedLocation.hash = '#token=successToken';

  render(<LocalApp />);

  expect(screen.getByText('LOGIN_SUCCESS')).toBeInTheDocument();
  checkRedirect(false);
});

function checkRedirect(expected: boolean) {
  expect(mockedLocation.assign.mock.calls.length).toBe(expected ? 1 : 0);
}
